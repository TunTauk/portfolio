import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { escapeHtml, paginateResume, renderResume } from './render.mjs';

const sample = '# Jane Doe\n\n**Full Stack Engineer**\n\njane@example.com | +66 63 548 2175\nPortfolio: example.com\n\n---\n\n## Skills\n\n**Languages:** TypeScript\n**Frontend:** Next.js\n\n## Professional Experience\n\n### Engineer | Example\n**Jan 2024 - Present**\n\n**Project** | Next.js\n- Built customer features.\n';

test('renders shared content with an optional photo', () => {
  const plain = renderResume(sample);
  const photo = renderResume(sample, { photo: 'data:image/jpeg;base64,example' });
  assert.equal(plain.name, 'Jane Doe');
  assert.ok(!plain.html.includes('class="portrait"'));
  assert.ok(photo.html.includes('class="portrait"'));
  for (const html of [plain.html, photo.html]) {
    assert.ok(html.includes('Built customer features.'));
    assert.ok(html.includes('TypeScript<br>'));
    assert.ok(!html.includes('<hr'));
  }
});

test('rejects malformed sources and escapes HTML/unsafe links', () => {
  assert.throws(() => renderResume('missing headings'), /heading/);
  assert.throws(() => renderResume('# Jane\n\n## Skills\nText'), /job-title/);
  assert.equal(escapeHtml('<&"'), '&lt;&amp;&quot;');
  const html = renderResume(sample + '\n<script>alert(1)</script>\n\n[bad](javascript:alert)\n\n[good](https://example.com)\n').html;
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(html.includes('href="https://example.com"'));
});

test('paginates without loss, groups headings, and repeats employer context', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const css = await readFile(new URL('./resume.css', import.meta.url), 'utf8');
    const large = sample + Array.from({ length: 30 }, (_, i) => `\n**Project ${i}** | React\n- ${'Built an application feature. '.repeat(8)}\n`).join('');
    await page.setContent(renderResume(large, { css }).html);
    const layout = await page.evaluate(paginateResume);
    assert.ok(layout.pages > 2);
    assert.ok(layout.links.includes('https://example.com/'));
    assert.ok(layout.links.includes('mailto:jane@example.com'));
    assert.ok(layout.links.includes('tel:+66635482175'));
    assert.ok(!layout.links.some(link => link.includes('next.js')));
    const result = await page.evaluate(() => ({
      projects: document.querySelectorAll('li').length,
      continuation: [...document.querySelectorAll('.continuation h3')].every(h => h.textContent.includes('Engineer | Example')),
      missingContext: [...document.querySelectorAll('.page')].slice(1).some(p => !p.querySelector('.continuation h3')),
      overflow: [...document.querySelectorAll('.page-content')].some(p => p.scrollHeight > p.clientHeight + 1),
    }));
    assert.equal(result.projects, 31);
    assert.equal(result.continuation, true);
    assert.equal(result.missingContext, false);
    assert.equal(result.overflow, false);
  } finally {
    await browser.close();
  }
});

test('fails rather than clipping an oversized block', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const css = await readFile(new URL('./resume.css', import.meta.url), 'utf8');
    await page.setContent(renderResume(sample + '\n' + 'A long paragraph. '.repeat(3000), { css }).html);
    await assert.rejects(page.evaluate(paginateResume), /too tall|taller/);
  } finally {
    await browser.close();
  }
});

test('new sections do not inherit a previous employer continuation', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const css = await readFile(new URL('./resume.css', import.meta.url), 'utf8');
    const source = sample + '\n## Education\n\n' + Array.from({ length: 35 }, (_, i) => `**Course ${i}** | University\n\n`).join('');
    await page.setContent(renderResume(source, { css }).html);
    const layout = await page.evaluate(paginateResume);
    assert.ok(layout.pages > 1);
    const context = await page.evaluate(() => [...document.querySelectorAll('.continuation')].map(node => node.textContent));
    assert.ok(context.every(text => text.includes('Education') && !text.includes('Engineer | Example')));
  } finally {
    await browser.close();
  }
});
