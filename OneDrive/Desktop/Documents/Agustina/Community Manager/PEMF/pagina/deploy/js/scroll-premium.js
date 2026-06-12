/* ═══════════════════════════════════════════════════════════════
   PEMF Buenos Aires — scroll-premium.js
   Motor de animación premium (spec 2026-06-11)
   Sistemas: constelación del hero · reveals · tilt 3D · abanico
   de papers · contadores. Vanilla JS, sin dependencias.
   Degradación: sin JS o con prefers-reduced-motion todo el
   contenido queda visible y estático.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (reduced) return; // contenido visible, cero movimiento

  // Activa los estados iniciales de animación (CSS .anim-ready)
  document.documentElement.classList.add('anim-ready');

  /* ────────────────────────────────────────────
     1 · REVEALS — fade-up escalonado
     ──────────────────────────────────────────── */
  function initReveals() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('revealed');
        io.unobserve(en.target);
        // terminada la entrada, se quita la transición para que
        // el tilt y los hovers respondan al instante
        setTimeout(function () { en.target.classList.add('reveal-done'); }, 1400);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el, i) {
      // stagger automático entre hermanos directos con data-reveal
      var sibs = el.parentElement
        ? [].filter.call(el.parentElement.children, function (c) { return c.hasAttribute('data-reveal'); })
        : [];
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.setProperty('--rd', (idx * 0.1).toFixed(2) + 's');
      io.observe(el);
    });
  }

  /* ────────────────────────────────────────────
     2 · CONSTELACIÓN — flotación + parallax + dispersión
     ──────────────────────────────────────────── */
  function initConstellation() {
    var stage = document.querySelector('.constellation');
    if (!stage) return;
    var hero = document.querySelector('.hero-v2') || stage;
    var items = [].map.call(stage.querySelectorAll('.const-item'), function (el, i) {
      var rect = null;
      return {
        el: el,
        shadow: el.querySelector('.const-shadow'),
        amp: 8 + (i % 3) * 5,                       // amplitud de flotación
        period: 3800 + i * 900,                      // ms por ciclo
        phase: i * 1.7,
        depth: parseFloat(el.getAttribute('data-depth') || '1'), // 0.5 lejos … 1.4 cerca
        scatterX: 0, scatterY: 0, scatterR: 0,
        mx: 0, my: 0,                                // parallax actual (lerp)
        rect: rect
      };
    });
    if (!items.length) return;

    // vector de dispersión: desde el centro del escenario hacia afuera
    function computeScatter() {
      var sRect = stage.getBoundingClientRect();
      var cx = sRect.width / 2, cy = sRect.height / 2;
      items.forEach(function (it) {
        var r = it.el.getBoundingClientRect();
        var ix = (r.left - sRect.left) + r.width / 2;
        var iy = (r.top - sRect.top) + r.height / 2;
        var dx = ix - cx, dy = iy - cy;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        it.scatterX = (dx / len) * 260;
        it.scatterY = (dy / len) * 200 - 80;
        it.scatterR = (dx >= 0 ? 1 : -1) * (18 + it.depth * 14);
      });
    }
    computeScatter();
    window.addEventListener('resize', computeScatter);

    // parallax de mouse (solo desktop)
    var tx = 0, ty = 0;
    if (canHover) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1 … 1
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      });
      hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; });
    }

    // progreso de scroll del hero: 0 arriba → 1 cuando salió de pantalla
    var prog = 0;
    function onScroll() {
      var h = hero.offsetHeight || 1;
      var y = window.scrollY || document.documentElement.scrollTop;
      prog = Math.min(1, Math.max(0, y / (h * 0.85)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var start = performance.now();
    function frame(now) {
      var t = now - start;
      items.forEach(function (it) {
        // flotación idle
        var fy = Math.sin((t / it.period) * Math.PI * 2 + it.phase) * it.amp;
        // parallax con inercia
        it.mx += ((tx * 18 * it.depth) - it.mx) * 0.06;
        it.my += ((ty * 12 * it.depth) - it.my) * 0.06;
        // dispersión por scroll
        var sx = it.scatterX * prog;
        var sy = it.scatterY * prog;
        var rot = it.scatterR * prog;
        var op = Math.max(0, 1 - prog * 1.25);
        it.el.style.transform =
          'translate3d(' + (it.mx + sx).toFixed(2) + 'px,' + (fy + it.my + sy).toFixed(2) + 'px,0)' +
          ' rotate(' + rot.toFixed(2) + 'deg)';
        it.el.style.opacity = op.toFixed(3);
        if (it.shadow) {
          var k = 1 - (fy / (it.amp * 2 + 0.01)); // sube → sombra chica
          it.shadow.style.transform = 'scaleX(' + (0.75 + k * 0.25).toFixed(3) + ')';
          it.shadow.style.opacity = (0.45 + k * 0.3).toFixed(3);
        }
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ────────────────────────────────────────────
     3 · TILT 3D + glow especular
     ──────────────────────────────────────────── */
  function initTilt() {
    if (!canHover) return;
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt')) || 7;
      var raf = null;
      el.addEventListener('mousemove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width;
          var py = (e.clientY - r.top) / r.height;
          var rx = (0.5 - py) * max;
          var ry = (px - 0.5) * max;
          el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
          el.style.setProperty('--glow-x', (px * 100).toFixed(1) + '%');
          el.style.setProperty('--glow-y', (py * 100).toFixed(1) + '%');
        });
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
        setTimeout(function () { el.style.transition = ''; }, 500);
      });
    });
  }

  /* ────────────────────────────────────────────
     4 · ABANICO DE PAPERS — ligado al scroll
     ──────────────────────────────────────────── */
  function initEvidenceFan() {
    var fan = document.querySelector('.ev-fan');
    if (!fan) return;
    var papers = [].map.call(fan.querySelectorAll('.ev-paper'), function (el, i, all) {
      var n = all.length;
      var spread = 56; // grados totales del abanico
      var target = (i - (n - 1) / 2) * (spread / Math.max(1, n - 1));
      return { el: el, target: target, ty: -Math.abs(target) * 0.8 };
    });
    var ticking = false;
    function update() {
      ticking = false;
      var r = fan.getBoundingClientRect();
      var vh = window.innerHeight;
      // progreso: 0 cuando el abanico entra, 1 cuando su centro pasa el centro del viewport
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
      // easing suave
      var e = p * p * (3 - 2 * p);
      papers.forEach(function (pa) {
        pa.el.style.setProperty('--rot', (pa.target * e).toFixed(2) + 'deg');
        pa.el.style.setProperty('--ty', (pa.ty * e).toFixed(2) + 'px');
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ────────────────────────────────────────────
     5 · CONTADORES — números que suben al aparecer
     ──────────────────────────────────────────── */
  function initCounters() {
    var els = document.querySelectorAll('[data-countup]');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target;
        var end = parseInt(el.getAttribute('data-countup'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400;
        var t0 = performance.now();
        (function tick(now) {
          var p = Math.min(1, (now - t0) / dur);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ────────────────────────────────────────────
     6 · AUTO-TAG — entradas premium para secciones existentes
     ──────────────────────────────────────────── */
  function initAutoTag() {
    // stagger en grillas que ya usan .reveal (page-index les pone .in)
    ['.problem-grid', '.prod-grid', '.como-grid'].forEach(function (sel) {
      var grid = document.querySelector(sel);
      if (!grid) return;
      [].forEach.call(grid.querySelectorAll('.reveal'), function (el, i) {
        el.style.setProperty('--rd', ((i % 4) * 0.09).toFixed(2) + 's');
      });
    });
    // FAQ: entrada escalonada
    [].forEach.call(document.querySelectorAll('.faq-item'), function (el, i) {
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--rd', (Math.min(i, 5) * 0.07).toFixed(2) + 's');
    });
    // Nosotros: foto con máscara, texto desde la derecha
    var photo = document.querySelector('.nosotros-photo');
    if (photo) {
      photo.classList.remove('reveal');
      photo.setAttribute('data-reveal', 'mask');
    }
    // Footer: zoom sutil
    var footer = document.querySelector('.footer-inner');
    if (footer) footer.setAttribute('data-reveal', 'zoom');
    // Orbes de ambiente en secciones claras
    ['.quiz-section', '.wa-form-section'].forEach(function (sel) {
      var s = document.querySelector(sel);
      if (!s) return;
      s.insertAdjacentHTML('afterbegin',
        '<div class="bg-orb orb-sky" style="opacity:.5"></div><div class="bg-orb orb-gold" style="opacity:.6"></div>');
    });
  }

  /* ────────────────────────────────────────────
     7 · TÍTULOS — palabra por palabra al entrar
     ──────────────────────────────────────────── */
  function initTitleReveals() {
    var titles = [].filter.call(
      document.querySelectorAll('.section-title, .quiz-title'),
      function (el) { return !el.id && el.children.length === 0 && el.textContent.trim(); }
    );
    if (!titles.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('t-on');
        io.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    titles.forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      words.forEach(function (w, i) {
        var line = document.createElement('span');
        line.className = 't-line';
        var inner = document.createElement('span');
        inner.textContent = w;
        inner.style.setProperty('--td', (i * 0.07).toFixed(2) + 's');
        line.appendChild(inner);
        el.appendChild(line);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
      io.observe(el);
    });
  }

  /* ────────────────────────────────────────────
     8 · PARALLAX — capas a distinta velocidad
     ──────────────────────────────────────────── */
  function initParallax() {
    var conf = [
      { sel: '.how-bg-wrap',        f: 0.12 },
      { sel: '.nosotros-photo img', f: 0.09 },
      { sel: '.ev-fan',             f: 0.05 },
      { sel: '.hero-v2 .orb-sky',   f: -0.22 },
      { sel: '.hero-v2 .orb-blue',  f: 0.14 }
    ];
    var mobile = window.matchMedia('(max-width: 768px)').matches;
    var targets = [];
    conf.forEach(function (c) {
      var el = document.querySelector(c.sel);
      if (el) targets.push({ el: el, f: mobile ? c.f * 0.4 : c.f, y: 0 });
    });
    if (!targets.length) return;
    function frame() {
      var vc = window.innerHeight / 2;
      targets.forEach(function (t) {
        var r = t.el.getBoundingClientRect();
        var goal = ((r.top + r.height / 2) - vc) * t.f;
        goal = Math.max(-110, Math.min(110, goal)); // capado: secciones altas
        t.y += (goal - t.y) * 0.08;                 // inercia fluida
        t.el.style.transform = 'translate3d(0,' + (-t.y).toFixed(2) + 'px,0)';
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ────────────────────────────────────────────
     9 · VELOCIDAD DE SCROLL — ticker y skew de grillas
     ──────────────────────────────────────────── */
  function initVelocity() {
    var lastY = window.scrollY, v = 0;
    var grids = [];
    if (canHover) {
      ['.prod-grid', '.problem-grid'].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (el) grids.push(el);
      });
    }
    var tickers = [].slice.call(document.querySelectorAll('.ticker-row, .ig-col'));
    function frame() {
      var y = window.scrollY;
      v += ((y - lastY) - v) * 0.12;                // velocidad con inercia
      lastY = y;
      // las grillas se inclinan apenas con el envión del scroll
      var skew = Math.max(-1.4, Math.min(1.4, v * 0.05));
      grids.forEach(function (g) {
        g.style.transform = 'skewY(' + skew.toFixed(3) + 'deg)';
      });
      // los testimonios aceleran cuando scrolleás rápido
      var rate = 1 + Math.min(2.5, Math.abs(v) * 0.06);
      tickers.forEach(function (t) {
        var anims = t.getAnimations ? t.getAnimations() : [];
        anims.forEach(function (a) { a.playbackRate = rate; });
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ────────────────────────────────────────────
     10 · CÓMO FUNCIONA — panel de vidrio 3D interactivo
     El tilt va sobre .mech-carousel (no sobre .mech-card,
     cuyas animaciones card-in/out usan fill:forwards).
     ──────────────────────────────────────────── */
  function initMech3D() {
    var panel = document.querySelector('.mech-carousel');
    if (!panel) return;
    var section = document.getElementById('tecnologia') || panel;
    var host = panel.parentElement;
    host.classList.add('mech-stage-host');
    // anillos de energía detrás del panel + barrido de luz adentro
    host.insertAdjacentHTML('afterbegin', '<div class="mech-rings"><i></i><i></i><i></i></div>');
    panel.insertAdjacentHTML('beforeend', '<div class="mech-shine"></div>');

    var tx = 0, ty = 0, mx = 0, my = 0, sr = 0;
    if (canHover) {
      panel.addEventListener('mousemove', function (e) {
        var r = panel.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        tx = (px - 0.5) * 2;
        ty = (py - 0.5) * 2;
        panel.style.setProperty('--glow-x', (px * 100).toFixed(1) + '%');
        panel.style.setProperty('--glow-y', (py * 100).toFixed(1) + '%');
      });
      panel.addEventListener('mouseleave', function () { tx = 0; ty = 0; });
    }
    function frame() {
      // rotación base ligada al scroll: el panel "mira" al centro del viewport
      var r = section.getBoundingClientRect();
      var p = ((r.top + r.height / 2) - window.innerHeight / 2) / window.innerHeight;
      var goal = Math.max(-9, Math.min(9, p * 16));
      sr += (goal - sr) * 0.07;
      // tilt de mouse con inercia
      mx += ((tx * 6) - mx) * 0.08;
      my += ((ty * -6) - my) * 0.08;
      panel.style.transform =
        'perspective(1200px) rotateX(' + (sr + my).toFixed(2) + 'deg) rotateY(' + mx.toFixed(2) + 'deg)';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ──────────────────────────────────────────── */
  function init() {
    initAutoTag();        // debe correr antes que initReveals
    initReveals();
    initConstellation();
    initTilt();
    initEvidenceFan();
    initCounters();
    initTitleReveals();
    initParallax();
    initVelocity();
    initMech3D();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
