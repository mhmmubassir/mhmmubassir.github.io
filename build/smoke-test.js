/* Executes the site's scripts against the real index.html in jsdom and asserts behaviour. */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');

const errors = [];
const warnings = [];

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  url: 'https://mhmmubassir.github.io/',
  beforeParse(win) {
    // jsdom lacks these; stub just enough for the scripts to run.
    win.matchMedia = q => ({
      matches: /prefers-color-scheme: dark/.test(q) ? false : /pointer:fine/.test(q),
      media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}
    });
    win.HTMLCanvasElement.prototype.getContext = () => ({
      setTransform() {}, clearRect() {}, beginPath() {}, arc() {}, fill() {},
      moveTo() {}, lineTo() {}, stroke() {}, createLinearGradient: () => ({ addColorStop() {} })
    });
    const store = {};
    Object.defineProperty(win, 'localStorage', {
      value: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } }
    });
    win.__store = store;
    win.addEventListener('error', e => errors.push('window error: ' + e.message));
    win.console.error = (...a) => errors.push('console.error: ' + a.join(' '));
    win.console.warn = (...a) => warnings.push('console.warn: ' + a.join(' '));
  }
});

// Load the deferred scripts manually, in document order, as a browser would.
const win = dom.window;
for (const el of win.document.querySelectorAll('script[src]')) {
  const src = el.getAttribute('src').split('?')[0];
  if (src.startsWith('http')) continue;
  const code = fs.readFileSync(path.join(SITE, src), 'utf8');
  try {
    win.eval(code);
  } catch (e) {
    errors.push(`${src} threw: ${e.message}`);
  }
}
win.document.dispatchEvent(new win.Event('DOMContentLoaded'));

/* ---------------- assertions ---------------- */
const d = win.document;
const results = [];
const check = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail });

check('js-ready class applied', d.body.classList.contains('js-ready'));
check('html.js applied by head script (no-flash filter gate)', d.documentElement.classList.contains('js'));

// Theme
const toggle = d.getElementById('theme-toggle');
const themeBefore = d.documentElement.getAttribute('data-theme');
check('initial theme resolved', themeBefore === 'light' || themeBefore === 'dark', themeBefore);
check('aria-pressed agrees with label',
  toggle.getAttribute('aria-pressed') === String(themeBefore === 'dark'),
  `pressed=${toggle.getAttribute('aria-pressed')} label="${toggle.getAttribute('aria-label')}"`);
toggle.dispatchEvent(new win.Event('click', { bubbles: true }));
const themeAfter = d.documentElement.getAttribute('data-theme');
check('toggle flips theme', themeAfter !== themeBefore, `${themeBefore} -> ${themeAfter}`);
check('theme persisted to localStorage', win.__store['mhm-theme'] === themeAfter, JSON.stringify(win.__store));
check('theme-color meta follows theme',
  d.querySelector('meta[name="theme-color"]').getAttribute('content') === (themeAfter === 'dark' ? '#111517' : '#f7f8f5'));

// Publications
const rows = d.querySelectorAll('.publication-row');
const visible = () => [...rows].filter(r => !r.classList.contains('is-filtered')).length;
check('all publications present in DOM', rows.length === 26, `${rows.length} rows`);
const defaultVisible = visible();
check('default view shows the selected subset', defaultVisible === 7, `${defaultVisible} visible`);
const tabs = [...d.querySelectorAll('.publication-tabs button')];
tabs.find(b => b.dataset.filter === 'all').dispatchEvent(new win.Event('click', { bubbles: true }));
check('"All" tab reveals every publication', visible() === 26, `${visible()} visible`);
tabs.find(b => b.dataset.filter === 'journal').dispatchEvent(new win.Event('click', { bubbles: true }));
const journals = visible();
check('"Journal articles" tab filters', journals > 0 && journals < 26, `${journals} visible`);
tabs.find(b => b.dataset.filter === 'selected').dispatchEvent(new win.Event('click', { bubbles: true }));
check('returning to "Selected" restores default', visible() === 7, `${visible()} visible`);

// Mobile menu
const menuBtn = d.querySelector('.menu-button');
menuBtn.dispatchEvent(new win.Event('click', { bubbles: true }));
check('menu opens', d.body.classList.contains('menu-open'));
check('aria-expanded true when open', menuBtn.getAttribute('aria-expanded') === 'true');
const esc = new win.KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
d.dispatchEvent(esc);
check('Escape closes the menu', !d.body.classList.contains('menu-open'));
check('aria-expanded false when closed', menuBtn.getAttribute('aria-expanded') === 'false');

// Mol* must NOT have been requested on load
const molstarTags = [...d.querySelectorAll('script[src*="molstar"], link[href*="molstar"]')];
check('Mol* not fetched on initial load', molstarTags.length === 0, `${molstarTags.length} tags found`);

// Content presence (SEO)
check('projects pre-rendered', d.querySelectorAll('.program-item').length === 3);
check('news pre-rendered', d.querySelectorAll('.news-card').length === 4);
check('conferences pre-rendered', d.getElementById('conference-list').children.length === 6);
check('tools pre-rendered', d.querySelectorAll('.compact-tool-link').length === 6);
check('resources pre-rendered', d.querySelectorAll('.compact-learning-link').length === 6);
check('copyright year is static', /^\d{4}$/.test(d.getElementById('year').textContent.trim()),
  d.getElementById('year').textContent);

/* ---------------- report ---------------- */
let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? ' PASS' : '*FAIL'}  ${r.name}${r.detail ? '  (' + r.detail + ')' : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} assertions passed`);
if (errors.length) { console.log('\nRuntime errors:'); errors.forEach(e => console.log('  ' + e)); }
if (warnings.length) { console.log('\nWarnings:'); warnings.forEach(w => console.log('  ' + w)); }
process.exit(failed || errors.length ? 1 : 0);
