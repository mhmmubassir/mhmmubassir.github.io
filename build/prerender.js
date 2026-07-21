#!/usr/bin/env node
/**
 * Pre-renders assets/js/content.js into index.html as static markup.
 *
 * Why: the publication list, projects, news, conferences and link grids used to be
 * injected client-side. Crawlers that do not execute JavaScript (Bing, LinkedIn,
 * most LLM crawlers) saw empty <div>s. This bakes them into the HTML at build time.
 *
 * Usage:  node build/prerender.js
 * No dependencies. Safe to run repeatedly.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { escapeHTML, iconMarkup, projectVisual, foundationVisual, emphasizeName } = require('./helpers.js');

const ROOT = path.join(__dirname, '..');
const HTML = path.join(ROOT, 'index.html');
const CONTENT = path.join(ROOT, 'assets', 'js', 'content.js');

/* ---------- load content.js without a browser ---------- */
function loadContent() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(CONTENT, 'utf8'), sandbox, { filename: 'content.js' });
  const data = sandbox.window.MHM_CONTENT;
  if (!data) throw new Error('content.js did not define window.MHM_CONTENT');
  return data;
}

/* ---------- renderers (string-returning versions of the old DOM writers) ---------- */

const renderProjects = (projects = []) => projects.map(project => {
  const metrics = (project.metrics || []).map(m => `<span>${escapeHTML(m)}</span>`).join('');
  const tags = (project.tags || []).map(t => `<li>${escapeHTML(t)}</li>`).join('');
  const status = project.status
    ? `<div class="project-status"><i></i><span>${escapeHTML(project.status)}</span></div>`
    : '';
  return `<article class="program-item project-${escapeHTML(project.visual)}">` +
    `<div class="program-number">${escapeHTML(project.number)}</div>` +
    `<div class="program-copy"><p class="program-label">${escapeHTML(project.eyebrow)}</p><h3>${escapeHTML(project.title)}</h3>` +
    `<p class="project-question">${escapeHTML(project.question)}</p><p class="project-summary">${escapeHTML(project.summary)}</p>${status}` +
    `<div class="project-metrics">${metrics}</div><ul>${tags}</ul></div>` +
    `<div class="program-visual visual-${escapeHTML(project.visual)}">${projectVisual(project.visual)}</div></article>`;
}).join('');

const renderFoundations = (items = []) => items.map(item => {
  const tags = (item.tags || []).map(t => `<span>${escapeHTML(t)}</span>`).join('');
  return `<article class="foundation-card"><div class="foundation-top"><span>${escapeHTML(item.number)}</span><small>${escapeHTML(item.label)}</small></div>` +
    `<div class="foundation-visual visual-${escapeHTML(item.visual)}" aria-hidden="true">${foundationVisual(item.visual)}</div>` +
    `<h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p><div class="foundation-tags">${tags}</div></article>`;
}).join('');

const renderLinkList = (items = [], extraClass, icon) => items.map((item, i) =>
  `<a class="compact-resource-link ${extraClass}" href="${escapeHTML(item.link)}" target="_blank" rel="noopener">` +
  `<span class="compact-link-index">${String(i + 1).padStart(2, '0')}</span>` +
  `<span class="compact-link-copy"><small>${escapeHTML(item.category)}</small><strong>${escapeHTML(item.title)}</strong><em>${escapeHTML(item.source)}</em></span>` +
  `<i aria-hidden="true" class="compact-link-icon">${iconMarkup(icon)}</i></a>`
).join('');

/**
 * Every publication is rendered. Filtering is done client-side by toggling a class,
 * so no-JS visitors and crawlers get the complete list instead of one filtered slice.
 */
const renderPublications = (pubs = []) => pubs.map((pub, index) => {
  const external = pub.link
    ? `<a class="pub-arrow" href="${escapeHTML(pub.link)}" target="_blank" rel="noopener" aria-label="Open publication">${iconMarkup('external')}</a>`
    : '<span class="pub-arrow muted" aria-hidden="true">·</span>';
  const hidden = pub.selected ? '' : ' is-filtered';
  return `<article class="publication-row${hidden}" data-pub-type="${escapeHTML(pub.type)}" data-pub-selected="${pub.selected ? 'true' : 'false'}" style="--delay:${Math.min(index * 45, 400)}ms">` +
    `<div class="pub-year">${escapeHTML(pub.year)}</div>` +
    `<div class="pub-main"><div class="pub-status">${escapeHTML(pub.status)}</div><h3>${escapeHTML(pub.title)}</h3>` +
    `<p class="pub-authors">${emphasizeName(pub.authors)}</p><p class="pub-venue">${escapeHTML(pub.venue)}</p></div>${external}</article>`;
}).join('');

const renderConferences = (items = []) => items.map(item =>
  `<article><div><span>${escapeHTML(item.year)}</span><small>${escapeHTML(item.type)}</small></div>` +
  `<div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.event)}</p></div></article>`
).join('');

const renderNews = (items = []) => items.map(item => {
  const tag = item.link ? 'a' : 'article';
  const href = item.link ? ` href="${escapeHTML(item.link)}" target="_blank" rel="noopener"` : '';
  return `<${tag} class="news-card"${href}><div class="news-meta"><span>${escapeHTML(item.date)}</span>` +
    `<span>${escapeHTML(item.category)}</span></div><h3>${escapeHTML(item.title)}</h3>` +
    `<div class="news-arrow">${item.link ? iconMarkup('external') : '<span class="news-dot"></span>'}</div></${tag}>`;
}).join('');

/* ---------- injection ---------- */

function inject(html, name, markup) {
  const open = `<!--build:${name}-->`;
  const close = `<!--/build:${name}-->`;
  const start = html.indexOf(open);
  const end = html.indexOf(close);
  if (start === -1 || end === -1) throw new Error(`Missing build markers for "${name}" in index.html`);
  return html.slice(0, start + open.length) + markup + html.slice(end);
}

function main() {
  const data = loadContent();
  let html = fs.readFileSync(HTML, 'utf8');

  const sections = {
    projects: renderProjects(data.projects),
    foundations: renderFoundations(data.foundations),
    tools: renderLinkList(data.tools, 'compact-tool-link', 'external'),
    resources: renderLinkList(data.resources, 'compact-learning-link', 'play'),
    publications: renderPublications(data.publications),
    conferences: renderConferences(data.conferences),
    news: renderNews(data.news)
  };

  for (const [name, markup] of Object.entries(sections)) html = inject(html, name, markup);

  // Keep the copyright year static so it is correct without JavaScript.
  html = html.replace(
    /(<span id="year">)[^<]*(<\/span>)/,
    `$1${new Date().getFullYear()}$2`
  );

  fs.writeFileSync(HTML, html);

  // Keep sitemap.xml's lastmod honest without having to remember to edit it.
  const SITEMAP = path.join(ROOT, 'sitemap.xml');
  if (fs.existsSync(SITEMAP)) {
    const today = new Date().toISOString().slice(0, 10);
    const xml = fs.readFileSync(SITEMAP, 'utf8');
    const updated = xml.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`);
    if (updated !== xml) {
      fs.writeFileSync(SITEMAP, updated);
      console.log(`  sitemap.xml lastmod set to ${today}`);
    }
  }

  const counts = Object.keys(sections)
    .map(k => `${k}: ${(data[k] || []).length}`)
    .join('  ');
  const selected = (data.publications || []).filter(p => p.selected).length;
  console.log('Pre-rendered into index.html');
  console.log('  ' + counts);
  console.log(`  publications: ${selected} shown by default, ${(data.publications || []).length} total in the HTML`);
  console.log('  index.html is now ' + (fs.statSync(HTML).size / 1024).toFixed(0) + ' KB');
}

main();
