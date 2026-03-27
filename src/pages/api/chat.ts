export const prerender = false;

import type { APIRoute } from 'astro';
import Groq from 'groq-sdk';
import { experience } from '../../data/experience';
import { projects } from '../../data/projects';
import { skillCategories } from '../../data/skills';
import { awards } from '../../data/awards';

function buildSystemPrompt(): string {
  const expText = experience.map(e => {
    const proj = e.projects?.map(p => p.title).join(', ');
    return `- ${e.role} @ ${e.company} (${e.period}, ${e.type}): ${e.description}${proj ? ` | Projects: ${proj}` : ''}${e.tags?.length ? ` | Tech: ${e.tags.join(', ')}` : ''}`;
  }).join('\n');

  const projText = projects.map(p =>
    `- ${p.title} (${p.category}, ${p.date}${p.company ? `, ${p.company}` : ''}): ${p.shortDesc} [Tech: ${p.tech.join(', ')}]`
  ).join('\n');

  const skillText = skillCategories.map(cat =>
    `${cat.label}: ${cat.skills.map(s => s.name).join(', ')}`
  ).join(' | ');

  const awardText = awards.map(a => `- ${a.title}: ${a.subtitle}`).join('\n');

  return `You are an AI assistant on Tun Tauk's personal portfolio website. Answer questions about him only.

PERSONAL: Full Stack Engineer, Bangkok Thailand. ~6 years experience. Competitive programmer. Previously at One Terrace (Tokyo, full-time, ended Apr 2026). Currently open to new job opportunities. Contact: tauktun628@gmail.com | GitHub: github.com/tuntauk | LinkedIn: linkedin.com/in/tun-tauk

EDUCATION:
- Bachelor of Computer Science, Computer Science — Rangsit University, Bangkok, Thailand (06/2024 - Present)
- Bachelor of Knowledge Engineering, Computer Science (Final Year Student) — University of Computer Studies, Mandalay, Myanmar (12/2015 - 04/2020)

EXPERIENCE:
${expText}

PROJECTS:
${projText}

SKILLS: ${skillText}

AWARDS & ACHIEVEMENTS (earned during academic period):
${awardText}

RULES:
- Stay on-topic about Tun Tauk only.
- Keep replies concise (2-4 sentences). No filler phrases.
- Do NOT end responses with generic contact/portfolio suggestions. Only mention contact info (tauktun628@gmail.com) if the user explicitly asks how to reach or hire Tun Tauk.
- Never fabricate info not listed above.`;
}

const groq = new Groq({ apiKey: import.meta.env.GROQ_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  let body: { message: string; history?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400 });
  }

  const { message, history = [] } = body;
  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: 'empty_message' }), { status: 400 });
  }

  const messages: { role: 'user' | 'assistant'; content: string }[] = [
    ...history.slice(-5).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: message.trim() },
  ];

  try {
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      stream: true,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        ...messages,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? '';
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    if (status === 429) {
      return new Response(JSON.stringify({ error: 'rate_limit' }), { status: 429 });
    }
    return new Response(JSON.stringify({ error: 'server_error' }), { status: 500 });
  }
};
