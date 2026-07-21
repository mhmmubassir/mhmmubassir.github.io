# M H M Mubassir

**Academic website and research portfolio**

This repository hosts my academic website, highlighting research in computational
virology, viral evolution, phylodynamics, structural biology, receptor biology, and
pandemic risk assessment.

**Website:** https://mhmmubassir.github.io

---

## Editing content

All the listed content — projects, earlier platforms, web tools, learning resources,
publications, conferences, and news — lives in **one file**:

```
assets/js/content.js
```

That file is *build-time data*. It is no longer sent to the browser. After editing it,
regenerate the HTML:

```bash
node build/prerender.js
```

Then commit both `assets/js/content.js` and `index.html`.

**If you skip the build step, your changes will not appear on the site.** This is the one
thing to remember about this repo.

### Why it works this way

Those sections used to be injected by JavaScript into empty `<div>`s. Crawlers that don't
execute JavaScript — Bing, LinkedIn's link preview bot, most LLM crawlers — saw nothing.
For an academic site whose main job is "search my name, find my papers," that was the
wrong trade. Pre-rendering bakes all 26 publications into the HTML while keeping a single
file to edit.

The build script has **no dependencies**. Any recent Node works.

## Repository layout

```
index.html               Generated. Edit the template parts by hand; the sections
                         between <!--build:name--> markers are overwritten by the build.
404.html                 Standalone, no build step.
build/prerender.js       The build script.
build/helpers.js         Render helpers, extracted verbatim from the original site.js.
assets/js/content.js     ← edit this, then run the build
assets/js/site.js        Behaviour only: theme, menu, filters, animation, Mol* loading.
assets/js/methods-network.js   The interactive research ecosystem map.
assets/css/site.css      All styling.
```

Anything between `<!--build:something-->` and `<!--/build:something-->` in `index.html`
is generated. Don't hand-edit inside those markers; it gets overwritten. Everything else
in `index.html` is yours to edit freely.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Use a server rather than opening `index.html` directly — `file://` breaks the Mol* viewer
and the fonts.

## Adding your CV

The About section links to `assets/cv/mubassir-cv.pdf`. Drop the PDF at that path and the
link goes live. If you'd rather not publish one, delete the CV `<a>` from the
`.about-links` block in `index.html` (it's marked with a comment).

## Notes on the third-party structure viewer

The 3D structure of PDB 9DIP is rendered with [Mol*](https://molstar.org/), loaded from
jsDelivr. The bundle is ~4.8 MB, so it is fetched **lazily** — only when the structure
section approaches the viewport — and verified with Subresource Integrity hashes.

If you ever bump the Mol* version, regenerate both hashes:

```bash
curl -sL https://registry.npmjs.org/molstar/-/molstar-<VERSION>.tgz | tar -xzO \
  package/build/viewer/molstar.js | openssl dgst -sha384 -binary | openssl base64 -A
```

Then update `MOLSTAR` in `assets/js/site.js`. If a hash is wrong the viewer silently falls
back to a static panel linking to RCSB, so the page still works — but the 3D view won't.

Structure source: PDB 9DIP, Lin et al., *Science* **386**, 1128–1134 (2024).

© 2026 M H M Mubassir

## Optional: regression test

`build/smoke-test.js` runs the real scripts against the real `index.html` in a headless
DOM and asserts 23 behaviours — theme persistence, publication filtering, the mobile
menu, and that Mol* is *not* fetched on load. Useful after editing `site.js`.

```bash
npm install jsdom     # one-time, only needed for the test
node build/smoke-test.js
```

The build script itself needs nothing installed.
