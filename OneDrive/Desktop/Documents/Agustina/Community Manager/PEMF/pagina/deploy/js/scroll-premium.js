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

  /* ──────────────────────────────────────────── */
  function init() {
    initReveals();
    initConstellation();
    initTilt();
    initEvidenceFan();
    initCounters();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
