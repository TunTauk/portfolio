import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { chromium } from 'playwright';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { paginateResume, renderResume } from './render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const normalized = text => text.normalize('NFKC').replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();

async function verifyPdf(buffer, layout) {
  const loadingTask = getDocument({ data: new Uint8Array(buffer), isEvalSupported: false });
  const pdf = await loadingTask.promise;
  try {
    if (pdf.numPages !== 2) throw new Error(`Export has ${pdf.numPages} pages; expected exactly 2.`);
    const pages = [];
    const links = new Set();
    for (let number = 1; number <= pdf.numPages; number++) {
      const page = await pdf.getPage(number);
      const text = await page.getTextContent();
      pages.push(text.items.filter(item => 'str' in item).map(item => item.str).join(' '));
      for (const annotation of await page.getAnnotations()) {
        if (annotation.url) links.add(annotation.url);
      }
    }
    const extracted = normalized(pages.join('\n'));
    for (const text of layout.expectedText) {
      if (text.trim() && !extracted.includes(normalized(text))) {
        throw new Error(`PDF text verification failed: ${text.trim().slice(0, 100)}`);
      }
    }
    for (const link of new Set(layout.links)) {
      if (!links.has(link)) throw new Error(`Missing PDF link: ${link}`);
    }
    return { pages: pdf.numPages, links: [...links], text: pages.join('\n\n--- Page break ---\n\n') };
  } finally {
    await loadingTask.destroy();
  }
}

async function main() {
  const { values } = parseArgs({ options: {
    source: { type: 'string', default: 'portfolio.md' },
    photo: { type: 'string', default: 'public/images/profile.jpg' },
    'out-dir': { type: 'string', default: 'generated/cv' },
  } });
  const source = await readFile(resolve(root, values.source), 'utf8');
  const photoBytes = await readFile(resolve(root, values.photo));
  const mime = photoBytes[0] === 0xff && photoBytes[1] === 0xd8 ? 'image/jpeg'
    : photoBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ? 'image/png' : null;
  if (!mime) throw new Error('Photo must be a JPEG or PNG file.');
  const photo = `data:${mime};base64,${photoBytes.toString('base64')}`;
  const css = await readFile(new URL('./resume.css', import.meta.url), 'utf8');
  let browser;
  try {
    browser = await chromium.launch();
  } catch (error) {
    throw new Error('Could not launch Chromium. Run pnpm cv:setup, then try again.', { cause: error });
  }

  const results = [];
  try {
    for (const withPhoto of [false, true]) {
      const { name, html } = renderResume(source, { css, photo: withPhoto ? photo : undefined });
      const page = await browser.newPage();
      // All assets are embedded. Never fetch external URLs while rendering the CV.
      await page.route('**/*', route => route.abort());
      await page.emulateMedia({ media: 'print' });
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(image => image.decode()));
      });
      const layout = await page.evaluate(paginateResume);
      if (layout.pages !== 2) {
        throw new Error(`${withPhoto ? 'Photo' : 'No-photo'} layout needs ${layout.pages} pages. Target is 2 at 10.5pt with 14mm margins. Edit ${values.source}; no text was hidden or fonts reduced.`);
      }
      const buffer = await page.pdf({ preferCSSPageSize: true, printBackground: true, tagged: true });
      const verification = await verifyPdf(buffer, layout);
      const filename = `${name.replace(/[^\p{L}\p{N}]+/gu, '_')}_Resume${withPhoto ? '_With_Photo' : ''}`;
      results.push({ filename, buffer, html: await page.content(), verification });
      await page.close();
    }
  } finally {
    await browser.close();
  }

  // Only write output once both variants have passed every check.
  const output = resolve(root, values['out-dir']);
  await mkdir(output, { recursive: true });
  for (const result of results) {
    const base = resolve(output, result.filename);
    await writeFile(`${base}.pdf`, result.buffer);
    await writeFile(`${base}.html`, result.html);
    await writeFile(`${base}.txt`, result.verification.text);
    console.log(`Created ${base}.pdf (2 pages; text and ${result.verification.links.length} links verified)`);
  }
  await writeFile(resolve(output, 'verification.json'), JSON.stringify(results.map(({ filename, verification }) => ({
    filename: `${filename}.pdf`, pages: verification.pages, links: verification.links,
  })), null, 2) + '\n');
}

main().catch(error => {
  console.error(`CV generation failed: ${error.message}`);
  process.exitCode = 1;
});
