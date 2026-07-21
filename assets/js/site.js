(function () {
  'use strict';
  const d = document;
  const body = d.body;
  body.classList.add('js-ready');

  const root = d.documentElement;
  const themeToggle = d.getElementById('theme-toggle');
  const themeMeta = d.querySelector('meta[name="theme-color"]');
  const THEME_KEY = 'mhm-theme'; // 404.html reads the same key.

  function setTheme(theme, persist) {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    if (themeMeta) themeMeta.setAttribute('content', next === 'light' ? '#f7f8f5' : '#111517');
    if (themeToggle) {
      const dark = next === 'dark';
      // aria-pressed tracks "dark mode on" so the state agrees with the label.
      themeToggle.setAttribute('aria-pressed', String(dark));
      themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      const text = themeToggle.querySelector('.theme-toggle-text');
      if (text) text.textContent = dark ? 'Light' : 'Dark';
    }
    if (persist) { try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode */ } }
    d.dispatchEvent(new CustomEvent('mhm-theme-change', { detail: { theme: next } }));
  }

  // The inline <head> script already applied the stored/system theme to avoid a flash;
  // this only syncs the button's label and ARIA state to it.
  setTheme(root.getAttribute('data-theme'), false);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
    });
  }

  // Follow the OS setting until the visitor makes an explicit choice.
  if (window.matchMedia) {
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    const onSchemeChange = function (event) {
      let stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
      if (stored !== 'light' && stored !== 'dark') setTheme(event.matches ? 'dark' : 'light', false);
    };
    if (scheme.addEventListener) scheme.addEventListener('change', onSchemeChange);
    else if (scheme.addListener) scheme.addListener(onSchemeChange);
  }

  /* Projects, earlier platforms, tool and resource grids, publications, conferences and news
     are pre-rendered into index.html by build/prerender.js, so they exist for crawlers and
     no-JS visitors. Edit assets/js/content.js, then run: node build/prerender.js */


  // Dismiss the intro overlay as soon as the document is usable. It used to wait for
  // window.load, which meant it also waited on every third-party asset; the failsafe
  // guarantees the page is never held hostage by a slow or blocked network.
  let loaderCleared = false;
  function clearLoader() {
    if (loaderCleared) return;
    loaderCleared = true;
    body.classList.add('loaded');
  }
  setTimeout(clearLoader, 900);
  window.addEventListener('load', function () { setTimeout(clearLoader, 120); });

  const header = d.querySelector('.site-header');
  function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 24); }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menuButton = d.querySelector('.menu-button');
  const mobileMenu = d.querySelector('.mobile-menu');
  if (menuButton && mobileMenu) {
    const menuIsOpen = function () { return body.classList.contains('menu-open'); };

    function setMenu(open) {
      body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      if (open) {
        const first = mobileMenu.querySelector('a, button');
        if (first) first.focus();
      } else {
        menuButton.focus();
      }
    }
    const closeMenu = function () { if (menuIsOpen()) setMenu(false); };

    menuButton.addEventListener('click', function () { setMenu(!menuIsOpen()); });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    d.addEventListener('keydown', function (event) {
      if (!menuIsOpen()) return;
      if (event.key === 'Escape') { closeMenu(); return; }
      if (event.key !== 'Tab') return;
      // Keep keyboard focus inside the overlay while it covers the page.
      const focusable = mobileMenu.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && d.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && d.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 }) : null;
  d.querySelectorAll('.vision-flow, .program-item, .foundation-card, .tool-card, .resource-card, .publication-feature, .about-grid, .news-grid, .conference-stage').forEach(function (el) {
    el.classList.add('reveal');
    if (io) io.observe(el); else el.classList.add('in-view');
  });

  // Every publication is already in the HTML. Filtering just hides rows, so the full
  // list stays available to crawlers and to visitors without JavaScript.
  const publicationRows = d.querySelectorAll('.publication-row');
  const publicationTabs = d.querySelectorAll('.publication-tabs button');
  if (publicationRows.length && publicationTabs.length) {
    function applyFilter(filter) {
      let shown = 0;
      publicationRows.forEach(function (row) {
        const match = filter === 'all'
          ? true
          : filter === 'selected'
            ? row.dataset.pubSelected === 'true'
            : row.dataset.pubType === filter;
        row.classList.toggle('is-filtered', !match);
        if (match) row.style.setProperty('--delay', Math.min(shown++ * 45, 400) + 'ms');
      });
    }
    publicationTabs.forEach(function (button) {
      button.addEventListener('click', function () {
        publicationTabs.forEach(function (item) {
          item.classList.remove('active');
          item.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        applyFilter(button.dataset.filter);
      });
    });
  }


  const counters = d.querySelectorAll('[data-count]');
  function animateCounter(el) {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const duration = 1100;
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); } });
    }, { threshold: .7 });
    counters.forEach(function (counter) { counterObserver.observe(counter); });
  }

  // Subtle parallax around the dedicated structure section.
  const art = d.querySelector('.structure-stage');
  const structureSection = d.querySelector('.structure-section');
  if (art && structureSection && window.matchMedia('(pointer:fine)').matches) {
    structureSection.addEventListener('mousemove', function (event) {
      const rect = structureSection.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      art.style.transform = 'perspective(1200px) rotateY(' + (x * 2.8) + 'deg) rotateX(' + (-y * 2.8) + 'deg) translate3d(0,0,0)';
    });
    structureSection.addEventListener('mouseleave', function () { art.style.transform = ''; });
  }

  function particleField(canvas, options) {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, ratio = Math.min(window.devicePixelRatio || 1, 2);
    let points = [];
    const count = options.count || 70;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: Math.max(20, Math.min(count, Math.floor(width / 18))) }, function () {
        return { x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16, r: Math.random() * 1.3 + .35 };
      });
    }
    function resolveOption(value, fallback) {
      if (typeof value === 'function') return value();
      return value || fallback;
    }
    let frameId = 0;
    let running = false;

    function draw() {
      // Resolved once per frame rather than once per point and once per line.
      const pointColor = resolveOption(options.pointColor, 'rgba(145, 239, 218, .42)');
      const lineRGB = resolveOption(options.lineRGB, '103, 184, 171');
      const maxDist = options.distance || 115;
      const lineAlpha = options.lineAlpha || .095;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = pointColor;
      ctx.lineWidth = .6;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const sq = dx * dx + dy * dy;
          if (sq >= maxDist * maxDist) continue; // compare squared, skip the sqrt
          const dist = Math.sqrt(sq);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(' + lineRGB + ',' + ((1 - dist / maxDist) * lineAlpha) + ')';
          ctx.stroke();
        }
      }
      frameId = requestAnimationFrame(draw);
    }

    let inView = true;

    function sync() {
      const shouldRun = inView && !d.hidden;
      if (shouldRun && !running) { running = true; frameId = requestAnimationFrame(draw); }
      else if (!shouldRun && running) { running = false; cancelAnimationFrame(frameId); }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Only animate while the canvas is actually on screen and the tab is in front.
    if ('IntersectionObserver' in window) {
      inView = false;
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { inView = entry.isIntersecting; });
        sync();
      }, { threshold: 0 }).observe(canvas);
    }
    d.addEventListener('visibilitychange', sync);
    sync();
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const isLightTheme = function () { return root.getAttribute('data-theme') === 'light'; };
    particleField(d.getElementById('vision-field'), { count: 54, distance: 122, lineAlpha: .065, pointColor: function () { return root.getAttribute('data-theme') === 'light' ? 'rgba(38,113,95,.24)' : 'rgba(121,233,205,.3)'; }, lineRGB: function () { return root.getAttribute('data-theme') === 'light' ? '38,113,95' : '121,233,205'; } });

  particleField(d.getElementById('field'), {
      count: 82, distance: 118,
      pointColor: function () { return isLightTheme() ? 'rgba(30, 101, 84, .38)' : 'rgba(145, 239, 218, .42)'; },
      lineRGB: function () { return isLightTheme() ? '35, 104, 88' : '103, 184, 171'; },
      lineAlpha: .095
    });
    particleField(d.getElementById('contact-field'), {
      count: 48, distance: 105,
      pointColor: function () { return isLightTheme() ? 'rgba(35, 103, 87, .34)' : 'rgba(145, 239, 218, .42)'; },
      lineRGB: function () { return isLightTheme() ? '42, 109, 93' : '103, 184, 171'; },
      lineAlpha: .09
    });
    particleField(d.getElementById('learning-field'), {
      count: 58, distance: 112,
      pointColor: function () { return isLightTheme() ? 'rgba(91, 61, 145, .35)' : 'rgba(185, 164, 255, .46)'; },
      lineRGB: function () { return isLightTheme() ? '91, 67, 143' : '132, 113, 207'; },
      lineAlpha: .105
    });
    particleField(d.getElementById('tree-field'), {
      count: 66, distance: 124,
      pointColor: function () { return isLightTheme() ? 'rgba(74, 55, 139, .36)' : 'rgba(142, 126, 255, .34)'; },
      lineRGB: function () { return isLightTheme() ? '77, 58, 143' : '115, 102, 203'; },
      lineAlpha: .085
    });
  }

  // A cinematic local evolution reveal; the full interactive Nextstrain view opens separately.
  function initEvolutionPlayer() {
    const player = d.getElementById('evolution-player');
    const playButton = d.getElementById('evolution-play');
    const playLabel = d.getElementById('evolution-play-label');
    const yearLabel = d.getElementById('evolution-year');
    const progressBar = d.getElementById('evolution-progress');
    const knob = d.getElementById('evolution-knob');
    const treeImage = d.getElementById('evolution-tree-image');
    const sweep = player && player.querySelector('.evolution-sweep');
    if (!player || !playButton || !playLabel || !yearLabel || !progressBar || !knob || !treeImage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let progress = reduceMotion ? 1 : .025;
    let playing = false;
    let frameId = 0;
    let startedAt = 0;
    let startProgress = progress;
    const duration = 7200;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const totalMonths = 60; // Jan 2021 through Dec 2025

    function render(value) {
      progress = Math.max(0, Math.min(1, value));
      const clipped = Math.max(0, 100 - progress * 100);
      treeImage.style.clipPath = 'inset(0 ' + clipped.toFixed(2) + '% 0 0)';
      progressBar.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
      knob.style.left = (progress * 100).toFixed(2) + '%';
      player.style.setProperty('--tree-pan', '0%');
      if (sweep) sweep.style.left = (6 + progress * 88).toFixed(2) + '%';
      const monthIndex = Math.min(totalMonths - 1, Math.floor(progress * totalMonths));
      const year = 2021 + Math.floor(monthIndex / 12);
      const month = monthNames[monthIndex % 12];
      yearLabel.textContent = month + ' ' + year;
      player.classList.toggle('is-complete', progress >= .999);
      if (!playing) playLabel.textContent = progress >= .999 ? 'Replay evolution' : 'Play evolution';
    }

    function stop() {
      playing = false;
      cancelAnimationFrame(frameId);
      player.classList.remove('is-playing');
      playButton.setAttribute('aria-label', progress >= .999 ? 'Replay evolution animation' : 'Play evolution animation');
      playLabel.textContent = progress >= .999 ? 'Replay evolution' : 'Play evolution';
    }

    function tick(now) {
      if (!playing) return;
      const elapsed = now - startedAt;
      const next = startProgress + elapsed / duration;
      render(next);
      if (next >= 1) stop();
      else frameId = requestAnimationFrame(tick);
    }

    function play() {
      if (reduceMotion) { render(1); return; }
      if (playing) { stop(); return; }
      if (progress >= .999) render(0);
      playing = true;
      startProgress = progress;
      startedAt = performance.now();
      player.classList.add('is-playing');
      playButton.setAttribute('aria-label', 'Pause evolution animation');
      playLabel.textContent = 'Pause';
      frameId = requestAnimationFrame(tick);
    }

    playButton.addEventListener('click', play);
    render(progress);

    if (!reduceMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            observer.disconnect();
            window.setTimeout(function () { if (!playing && progress < .2) play(); }, 350);
          }
        });
      }, { threshold: .48 });
      observer.observe(player);
    }
  }
  initEvolutionPlayer();

  // Experimental H5 HA structure (PDB 9DIP) rendered with Mol*.
  let structureCanvas3d = null;

  function structureBackgroundColor() {
    return root.getAttribute('data-theme') === 'light' ? 0xf7f8f5 : 0x050708;
  }

  function styleStructureViewer() {
    if (!structureCanvas3d) return;
    try {
      const current = structureCanvas3d.props || {};
      structureCanvas3d.setProps({
        renderer: Object.assign({}, current.renderer || {}, { backgroundColor: structureBackgroundColor() }),
        trackball: Object.assign({}, current.trackball || {}, {
          animate: { name: 'spin', params: { speed: 0.055, axis: [0, 1, 0] } }
        })
      });
    } catch (styleError) {
      console.warn('9DIP loaded; optional viewer styling was not applied.', styleError);
    }
  }

  // Mol* is ~4.8 MB (1.4 MB gzipped). It used to be a blocking <script> in the document,
  // which delayed every other script and held the intro overlay open. It is now fetched
  // on demand, with Subresource Integrity, only for visitors who reach this section.
  const MOLSTAR = {
    js: 'https://cdn.jsdelivr.net/npm/molstar@5.10.1/build/viewer/molstar.js',
    jsHash: 'sha384-A7AzJS3wWUGFfOgUxj+NMW6sOujbL01gqs/4l1zlprZM0csgVHBGWFMh4CZBqFv+',
    css: 'https://cdn.jsdelivr.net/npm/molstar@5.10.1/build/viewer/molstar.css',
    cssHash: 'sha384-RIontCdJN53gEl2fmiHN+4bscIBvaUaOiCeeGktXqmFqdEBF+COnSdt9O4IKFSvq'
  };

  let molstarPromise = null;
  function loadMolstar() {
    if (molstarPromise) return molstarPromise;
    molstarPromise = new Promise(function (resolve, reject) {
      if (window.molstar && window.molstar.Viewer) return resolve();

      const style = d.createElement('link');
      style.rel = 'stylesheet';
      style.href = MOLSTAR.css;
      style.integrity = MOLSTAR.cssHash;
      style.crossOrigin = 'anonymous';
      d.head.appendChild(style);

      const script = d.createElement('script');
      script.src = MOLSTAR.js;
      script.integrity = MOLSTAR.jsHash;
      script.crossOrigin = 'anonymous';
      script.onload = function () {
        (window.molstar && window.molstar.Viewer) ? resolve() : reject(new Error('Mol* loaded but exposed no Viewer'));
      };
      script.onerror = function () { reject(new Error('Mol* could not be fetched')); };
      d.head.appendChild(script);
    });
    return molstarPromise;
  }

  async function initStructureViewer() {
    const target = d.getElementById('molstar-viewer');
    const layer = d.querySelector('.structure-layer');
    if (!target || !layer) return;

    const status = d.querySelector('#structure-fallback span');
    if (status) status.textContent = 'Loading experimental structure 9DIP';

    try {
      await loadMolstar();
    } catch (loadError) {
      layer.classList.add('structure-error');
      if (status) status.textContent = 'Structure viewer unavailable — open PDB 9DIP at RCSB';
      console.warn('Mol* did not load; the static fallback is shown instead.', loadError);
      return;
    }

    try {
      const viewer = await window.molstar.Viewer.create('molstar-viewer', {
        layoutIsExpanded: false,
        layoutShowControls: false,
        layoutShowRemoteState: false,
        layoutShowSequence: false,
        layoutShowLog: false,
        layoutShowLeftPanel: false,
        collapseLeftPanel: true,
        viewportShowExpand: false,
        viewportShowSelectionMode: false,
        viewportShowAnimation: false,
        viewportShowSettings: false,
        pdbProvider: 'rcsb',
        emdbProvider: 'rcsb'
      });
      await viewer.loadPdb('9dip');
      layer.classList.add('structure-ready');
      structureCanvas3d = viewer.plugin && viewer.plugin.canvas3d;
      styleStructureViewer();
    } catch (error) {
      layer.classList.add('structure-error');
      console.warn('9DIP viewer could not initialize.', error);
    }
  }
  d.addEventListener('mhm-theme-change', styleStructureViewer);

  // Start fetching a little before the section scrolls into view so it feels instant,
  // but never for visitors who don't get that far.
  (function watchStructureSection() {
    const section = d.getElementById('structure');
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      window.addEventListener('load', function () { setTimeout(initStructureViewer, 520); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        initStructureViewer();
      });
    }, { rootMargin: '400px 0px' });
    observer.observe(section);
  })();

  const backToTop = d.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      function jumpToTop() {
        if (d.scrollingElement) d.scrollingElement.scrollTop = 0;
        body.scrollTop = 0;
        window.scrollTo(0, 0);
      }
      jumpToTop();
      window.setTimeout(jumpToTop, 0);
      window.setTimeout(function () {
        jumpToTop();
        root.style.scrollBehavior = previousBehavior;
      }, 120);
    });
  }

  // Responsive viral cursor: exact core + softly lagged capsid shell.
  function initVirusCursor() {
    if (!window.matchMedia('(pointer:fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const core = d.createElement('div');
    const shell = d.createElement('div');
    core.className = 'virus-cursor-core';
    shell.className = 'virus-cursor-shell';
    shell.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="9.5"></circle><circle cx="24" cy="24" r="3.4"></circle><path d="M17 22c3-5 10-5 14 0M17 27c4 4 10 4 14 0" class="cursor-genome"></path><g><line x1="24" y1="14.5" x2="24" y2="5"></line><line x1="24" y1="33.5" x2="24" y2="43"></line><line x1="14.5" y1="24" x2="5" y2="24"></line><line x1="33.5" y1="24" x2="43" y2="24"></line><line x1="17.3" y1="17.3" x2="10.4" y2="10.4"></line><line x1="30.7" y1="30.7" x2="37.6" y2="37.6"></line><line x1="30.7" y1="17.3" x2="37.6" y2="10.4"></line><line x1="17.3" y1="30.7" x2="10.4" y2="37.6"></line><line x1="20.2" y1="15.3" x2="16.4" y2="6.6"></line><line x1="27.8" y1="32.7" x2="31.6" y2="41.4"></line><line x1="32.7" y1="20.2" x2="41.4" y2="16.4"></line><line x1="15.3" y1="27.8" x2="6.6" y2="31.6"></line><circle class="cursor-node" cx="24" cy="5" r="1.6"></circle><circle class="cursor-node" cx="24" cy="43" r="1.6"></circle><circle class="cursor-node" cx="5" cy="24" r="1.6"></circle><circle class="cursor-node" cx="43" cy="24" r="1.6"></circle><circle class="cursor-node" cx="10.4" cy="10.4" r="1.6"></circle><circle class="cursor-node" cx="37.6" cy="37.6" r="1.6"></circle><circle class="cursor-node" cx="37.6" cy="10.4" r="1.6"></circle><circle class="cursor-node" cx="10.4" cy="37.6" r="1.6"></circle><circle class="cursor-node" cx="16.4" cy="6.6" r="1.45"></circle><circle class="cursor-node" cx="31.6" cy="41.4" r="1.45"></circle><circle class="cursor-node" cx="41.4" cy="16.4" r="1.45"></circle><circle class="cursor-node" cx="6.6" cy="31.6" r="1.45"></circle></g></svg><b></b>';
    body.append(core, shell);
    body.classList.add('cursor-on');
    let tx = innerWidth / 2, ty = innerHeight / 2, sx = tx, sy = ty;
    const label = shell.querySelector('b');
    function move(event) {
      tx = event.clientX; ty = event.clientY;
      core.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0) translate(-50%,-50%)';
      body.classList.add('cursor-visible');
    }
    // The shell eases toward the pointer; once it has caught up there is nothing left
    // to animate, so the loop idles instead of running at 60fps forever.
    let cursorRunning = false;
    function animate() {
      const dx = tx - sx, dy = ty - sy;
      sx += dx * .18; sy += dy * .18;
      shell.style.transform = 'translate3d(' + sx + 'px,' + sy + 'px,0) translate(-50%,-50%)';
      if (Math.abs(dx) < .1 && Math.abs(dy) < .1) { cursorRunning = false; return; }
      requestAnimationFrame(animate);
    }
    function wake() { if (!cursorRunning) { cursorRunning = true; requestAnimationFrame(animate); } }
    d.addEventListener('pointermove', function (event) { move(event); wake(); }, { passive: true });
    d.addEventListener('pointerover', function (event) {
      const interactive = event.target && event.target.closest ? event.target.closest('a, button, [data-cursor-label], #molstar-viewer') : null;
      body.classList.toggle('cursor-active', !!interactive);
      label.textContent = interactive ? (interactive.getAttribute('data-cursor-label') || (interactive.closest('[data-cursor-label]') && interactive.closest('[data-cursor-label]').getAttribute('data-cursor-label')) || 'OPEN') : '';
    });
    d.addEventListener('pointerdown', function () { body.classList.add('cursor-down'); });
    d.addEventListener('pointerup', function () { body.classList.remove('cursor-down'); });
    d.addEventListener('pointerleave', function () { body.classList.remove('cursor-visible'); });
    wake();
  }
  initVirusCursor();

})();
