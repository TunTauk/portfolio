export const prerender = false;

import type { APIRoute } from 'astro';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: import.meta.env.AWS_REGION,
  credentials: {
    accessKeyId:     import.meta.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ── Rate limiting (in-memory, resets on cold start) ──────────────────────────
const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT   = 3;           // max submissions per window
const WINDOW_MS    = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── Basic sanitiser ───────────────────────────────────────────────────────────
function sanitise(str: unknown, max = 500): string {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, max).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  // ── Rate limit ──
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
           ?? request.headers.get('cf-connecting-ip')
           ?? 'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers },
    );
  }

  // ── Parse body ──
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), { status: 400, headers });
  }

  const name    = sanitise(body.name,    100);
  const email   = sanitise(body.email,   200);
  const subject = sanitise(body.subject, 200);
  const message = sanitise(body.message, 2000);

  // ── Validate ──
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'Name, email, and message are required.' }),
      { status: 400, headers },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email address.' }),
      { status: 400, headers },
    );
  }

  // ── Send via SES (both emails in parallel) ───────────────────────────────
  try {
    await Promise.all([

      // 1. Notification to Tun Tauk
      ses.send(new SendEmailCommand({
        Source:           import.meta.env.SES_FROM_EMAIL,
        Destination:      { ToAddresses: [import.meta.env.SES_TO_EMAIL] },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: `[Portfolio] ${subject || 'New message'} — from ${name}`,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: [
                `Name:    ${name}`,
                `Email:   ${email}`,
                `Subject: ${subject || '—'}`,
                ``,
                `Message:`,
                message,
              ].join('\n'),
            },
            Html: {
              Charset: 'UTF-8',
              Data: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
                  <h2 style="color:#f97316;margin-bottom:16px;">New portfolio message</h2>
                  <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tr><td style="padding:8px 0;color:#64748b;width:80px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
                    <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#f97316;">${email}</a></td></tr>
                    <tr><td style="padding:8px 0;color:#64748b;">Subject</td><td style="padding:8px 0;">${subject || '—'}</td></tr>
                  </table>
                  <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
                  <p style="font-size:14px;color:#374151;white-space:pre-wrap;">${message}</p>
                </div>
              `,
            },
          },
        },
      })),

      // 2. Confirmation to the sender
      ses.send(new SendEmailCommand({
        Source:      import.meta.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: {
            Data: `Thanks for reaching out, ${name}!`,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: [
                `Hi ${name},`,
                ``,
                `Thanks for your message! I've received it and will get back to you as soon as possible.`,
                ``,
                `Here's a copy of what you sent:`,
                `──────────────────────────`,
                `Subject: ${subject || '—'}`,
                ``,
                message,
                `──────────────────────────`,
                ``,
                `Best regards,`,
                `Tun Tauk`,
                `tauktun628@gmail.com`,
              ].join('\n'),
            },
            Html: {
              Charset: 'UTF-8',
              Data: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;">
                  <!-- Header -->
                  <div style="margin-bottom:28px;">
                    <span style="font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Tun Tauk</span>
                    <span style="font-size:13px;color:#f97316;margin-left:8px;">Full-Stack Engineer</span>
                  </div>

                  <p style="font-size:15px;color:#1e293b;margin:0 0 12px;">Hi <strong>${name}</strong>,</p>
                  <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 24px;">
                    Thanks for reaching out! I've received your message and will get back to you as soon as possible — usually within 1–2 business days.
                  </p>

                  <!-- Message recap -->
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:28px;">
                    <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:0 0 12px;">Your message</p>
                    ${subject ? `<p style="font-size:13px;font-weight:600;color:#1e293b;margin:0 0 8px;">${subject}</p>` : ''}
                    <p style="font-size:13px;color:#475569;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
                  </div>

                  <!-- Footer -->
                  <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 20px;">
                  <p style="font-size:12px;color:#94a3b8;margin:0;">
                    Tun Tauk &nbsp;·&nbsp;
                    <a href="mailto:tauktun628@gmail.com" style="color:#f97316;text-decoration:none;">tauktun628@gmail.com</a> &nbsp;·&nbsp;
                    Bangkok, Thailand
                  </p>
                </div>
              `,
            },
          },
        },
      })),

    ]);

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });

  } catch (err) {
    console.error('[contact] SES error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to send message. Please try again.' }),
      { status: 500, headers },
    );
  }
};
