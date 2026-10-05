import { Marked } from 'marked';

export function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

const markdown = new Marked({
  breaks: true,
  renderer: {
    html({ text }) { return escapeHtml(text); },
    image({ text }) { return escapeHtml(text); },
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      return /^(https?:|mailto:|tel:)/i.test(href)
        ? `<a href="${escapeHtml(href)}">${text}</a>`
        : text;
    },
  },
});

export function renderResume(source, { css, photo } = {}) {
  const tokens = markdown.lexer(source);
  const name = tokens.find(token => token.type === 'heading' && token.depth === 1);
  const firstSection = tokens.findIndex(token => token.type === 'heading' && token.depth === 2);
  if (!name || firstSection < 0) {
    throw new Error('CV needs a # Name heading and ## section headings.');
  }
  const intro = tokens.slice(tokens.indexOf(name) + 1, firstSection)
    .filter(token => token.type !== 'hr' && token.type !== 'space');
  const headline = intro.shift();
  if (headline?.type !== 'paragraph') throw new Error('Add a job-title paragraph below # Name.');

  return {
    name: name.text,
    html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(name.text)} - Resume</title>
  <style>${css ?? ''}</style>
</head>
<body>
  <div id="source">
    <header class="resume-header">
      <div class="identity">
        <h1>${markdown.parseInline(name.text)}</h1>
        <div class="headline">${markdown.parser([headline])}</div>
        <div class="contacts">${markdown.parser(intro)}</div>
      </div>
      ${photo ? `<div class="portrait"><img src="${escapeHtml(photo)}" alt="${escapeHtml(name.text)}"></div>` : ''}
    </header>
    ${markdown.parser(tokens.slice(firstSection).filter(token => token.type !== 'hr'))}
  </div>
</body>
</html>`,
  };
}

// Runs inside Chromium. Measure fixed-size A4 pages at the final print font size.
// Move entire paragraph/list groups together; never truncate or shrink to fit.
export function paginateResume() {
  const source = document.querySelector('#source');
  const children = [...source.children];
  const expectedText = children.map(child => child.textContent);

  // Make bare public domains, email addresses, and the international phone clickable.
  const walker = document.createTreeWalker(source, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const pattern = /https?:\/\/[^\s|<>]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}|\+\d[\d -]{7,}\d|\b(?:[a-z\d-]+\.)+(?:com|dev|net|org|io|jp|app|co|me|edu|mm)\b(?:\/[\w./-]*)?/gi;
  for (const node of nodes) {
    if (node.parentElement.closest('a, code')) continue;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of node.textContent.matchAll(pattern)) {
      fragment.append(node.textContent.slice(cursor, match.index));
      const link = document.createElement('a');
      link.textContent = match[0];
      link.href = match[0].includes('@') ? `mailto:${match[0]}`
        : match[0].startsWith('+') ? `tel:${match[0].replace(/[^+\d]/g, '')}`
        : /^https?:\/\//i.test(match[0]) ? match[0] : `https://${match[0]}`;
      fragment.append(link);
      cursor = match.index + match[0].length;
    }
    fragment.append(node.textContent.slice(cursor));
    node.replaceWith(fragment);
  }

  const units = [];
  let pending = [];
  let section = null;
  let role = null;
  for (let index = 0; index < children.length; index++) {
    const element = children[index];
    if (element.tagName === 'H2') {
      section = element;
      role = null;
      pending.push(element);
      continue;
    }
    if (element.tagName === 'H3') {
      const dates = children[index + 1]?.tagName === 'P' ? children[++index] : null;
      if (dates) dates.classList.add('role-dates');
      role = { heading: element, dates };
      pending.push(element);
      if (dates) pending.push(dates);
      continue;
    }
    const block = document.createElement('div');
    block.className = 'block';
    const startsSection = pending.some(node => node.tagName === 'H2');
    const startsRole = pending.some(node => node.tagName === 'H3');
    block.append(...pending, element);
    pending = [];
    if (element.tagName === 'P' && children[index + 1]?.tagName === 'UL') {
      block.append(children[++index]);
    }
    units.push({ block, section, role, startsSection, startsRole });
  }
  if (pending.length) throw new Error('CV ends with a heading without content.');

  const pages = [];
  const addPage = () => {
    const page = document.createElement('article');
    page.className = 'page';
    const content = document.createElement('div');
    content.className = 'page-content';
    page.append(content);
    document.body.append(page);
    pages.push(content);
    return content;
  };
  source.remove();
  let content = addPage();
  for (const unit of units) {
    content.append(unit.block);
    if (content.scrollHeight <= content.clientHeight + 1) continue;
    unit.block.remove();
    if (!content.children.length) throw new Error('A CV block is taller than one page. Shorten it.');
    content = addPage();
    if (!unit.startsSection && unit.section) {
      const continuation = document.createElement('div');
      continuation.className = 'continuation';
      const sectionHeading = unit.section.cloneNode(true);
      sectionHeading.append(' (continued)');
      continuation.append(sectionHeading);
      if (unit.role && !unit.startsRole) {
        const roleHeading = unit.role.heading.cloneNode(true);
        roleHeading.append(' (continued)');
        continuation.append(roleHeading);
        if (unit.role.dates) continuation.append(unit.role.dates.cloneNode(true));
      }
      content.append(continuation);
    }
    content.append(unit.block);
    if (content.scrollHeight > content.clientHeight + 1) {
      throw new Error('A CV block plus its continuation heading is too tall. Shorten it.');
    }
  }

  // Catch horizontal overflow as well, e.g. a long unbroken URL.
  if (pages.some(page => page.scrollWidth > page.clientWidth + 1)) {
    throw new Error('CV has horizontal overflow. Shorten a long line or URL.');
  }
  return {
    pages: pages.length,
    expectedText,
    links: [...document.querySelectorAll('a')].map(link => link.href),
  };
}
