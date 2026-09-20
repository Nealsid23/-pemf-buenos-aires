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
        amp: 5 + (i % 3) * 3,                        // flotación suave (público mayor)
        period: 5600 + i * 1100,                     // ms por ciclo, lento
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
        it.scatterX = (dx / len) * 200;
        it.scatterY = (dy / len) * 150 - 60;
        it.scatterR = (dx >= 0 ? 1 : -1) * (10 + it.depth * 8);
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
        it.mx += ((tx * 8 * it.depth) - it.mx) * 0.05;
        it.my += ((ty * 5 * it.depth) - it.my) * 0.05;
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
      var max = parseFloat(el.getAttribute('data-tilt')) || 4;
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
  var _fanTicking = false;
  function initEvidenceFan() {
    var fan = document.querySelector('.ev-fan');
    if (!fan) return;
    // re-consulta los .ev-paper en cada update -> funciona aunque el HTML del abanico se reemplace
    function update() {
      _fanTicking = false;
      var papers = fan.querySelectorAll('.ev-paper');
      var n = papers.length;
      if (!n) return;
      var spread = Math.min(120, 14 * (n - 1)); // abanico se ensancha con la cantidad
      var r = fan.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
      var e = p * p * (3 - 2 * p);
      for (var i = 0; i < n; i++) {
        var target = (i - (n - 1) / 2) * (spread / Math.max(1, n - 1));
        papers[i].style.setProperty('--rot', (target * e).toFixed(2) + 'deg');
        papers[i].style.setProperty('--ty', (-Math.abs(target) * 0.8 * e).toFixed(2) + 'px');
      }
    }
    if (!fan._fanBound) {
      fan._fanBound = 1;
      window.addEventListener('scroll', function () {
        if (!_fanTicking) { _fanTicking = true; requestAnimationFrame(update); }
      }, { passive: true });
    }
    update();
  }
  window.PEMF_initEvidenceFan = initEvidenceFan;

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
      { sel: '.how-bg-wrap',        f: 0.07 },
      { sel: '.nosotros-photo img', f: 0.05 },
      { sel: '.ev-fan',             f: 0.04 },
      { sel: '.hero-v2 .orb-sky',   f: -0.12 },
      { sel: '.hero-v2 .orb-blue',  f: 0.08 }
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
        goal = Math.max(-70, Math.min(70, goal));   // capado: secciones altas
        t.y += (goal - t.y) * 0.08;                 // inercia fluida
        t.el.style.transform = 'translate3d(0,' + (-t.y).toFixed(2) + 'px,0)';
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
    // aurora detrás del panel + borde de luz + barrido adentro
    host.insertAdjacentHTML('afterbegin', '<div class="mech-aura"></div>');
    panel.insertAdjacentHTML('beforeend', '<div class="mech-shine"></div><div class="mech-border"></div>');

    // cambio de tarjeta más dinámico: swing 3D + blur con overshoot,
    // y el producto entra con un pop. Va por WAAPI para no chocar con
    // las animaciones CSS card-in/out del script original.
    var prevGo = window.goMech;
    if (typeof prevGo === 'function') {
      window.goMech = function (idx, dir) {
        prevGo(idx, dir);
        var d = (dir === 'prev') ? -1 : 1;
        setTimeout(function () {
          var card = document.getElementById('mech-card');
          var img = document.getElementById('mech-img');
          if (card && card.animate) {
            card.animate([
              { transform: 'perspective(900px) rotateY(' + (d * 9) + 'deg) translateX(' + (d * 34) + 'px) scale(.96)', opacity: 0, filter: 'blur(6px)' },
              { transform: 'perspective(900px) rotateY(' + (d * -2) + 'deg) translateX(' + (d * -4) + 'px) scale(1.008)', opacity: 1, filter: 'blur(0px)', offset: 0.72 },
              { transform: 'perspective(900px) rotateY(0deg) translateX(0px) scale(1)', opacity: 1, filter: 'blur(0px)' }
            ], { duration: 640, easing: 'cubic-bezier(.3,.9,.32,1)' });
          }
          if (img && img.animate) {
            img.animate([
              { transform: 'scale(.74) rotate(' + (d * -6) + 'deg)', opacity: 0 },
              { transform: 'scale(1.05) rotate(' + (d * 1.5) + 'deg)', opacity: 1, offset: 0.72 },
              { transform: 'scale(1) rotate(0deg)', opacity: 1 }
            ], { duration: 720, delay: 80, easing: 'cubic-bezier(.34,1.3,.64,1)', fill: 'backwards' });
          }
        }, 255);
      };
    }

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
      var goal = Math.max(-4.5, Math.min(4.5, p * 8));
      sr += (goal - sr) * 0.06;
      // tilt de mouse con inercia
      mx += ((tx * 3) - mx) * 0.07;
      my += ((ty * -3) - my) * 0.07;
      panel.style.transform =
        'perspective(1200px) rotateX(' + (sr + my).toFixed(2) + 'deg) rotateY(' + mx.toFixed(2) + 'deg)';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ────────────────────────────────────────────
     11 · ENCONTRÁ TU PRODUCTO — escenario coreografiado
     Un solo motor escribe el transform de cada tarjeta:
     profundidad por scroll + tilt al mouse + lift al hover.
     ──────────────────────────────────────────── */
  function initQuizStage() {
    var section = document.querySelector('.quiz-section');
    if (!section) return;
    var cards = [].slice.call(section.querySelectorAll('.quiz-card'));
    if (!cards.length) return;
    section.classList.add('qs-prep');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        section.classList.add('qs-in');
        io.disconnect();
        // tras la entrada, el motor rAF toma el control del transform
        setTimeout(function () { section.classList.add('qs-ready'); }, 1500);
      });
    }, { threshold: 0.25 });
    io.observe(section);

    var state = cards.map(function (el, i) {
      return { el: el, h: 0, tx: 0, ty: 0, lift: 0, rx: 0, ry: 0,
               depth: (i % 2 ? -1 : 1) * (4 + i * 1.5) };
    });
    if (canHover) {
      state.forEach(function (s) {
        s.el.addEventListener('mouseenter', function () { s.h = 1; });
        s.el.addEventListener('mouseleave', function () { s.h = 0; s.tx = 0; s.ty = 0; });
        s.el.addEventListener('mousemove', function (e) {
          var r = s.el.getBoundingClientRect();
          s.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          s.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        });
      });
    }
    // pulso guía que recorre las tarjetas (se pausa con el mouse encima)
    var pi = 0, paused = false;
    section.addEventListener('mouseenter', function () {
      paused = true;
      cards.forEach(function (c) { c.classList.remove('qs-pulse'); });
    });
    section.addEventListener('mouseleave', function () { paused = false; });
    setInterval(function () {
      if (paused || !section.classList.contains('qs-ready')) return;
      cards.forEach(function (c) { c.classList.remove('qs-pulse'); });
      cards[pi % cards.length].classList.add('qs-pulse');
      pi++;
    }, 3800);

    function frame() {
      if (section.classList.contains('qs-ready')) {
        var r = section.getBoundingClientRect();
        var p = ((r.top + r.height / 2) - window.innerHeight / 2) / window.innerHeight;
        p = Math.max(-0.8, Math.min(0.8, p));
        state.forEach(function (s) {
          s.lift += ((s.h ? -6 : 0) - s.lift) * 0.1;
          s.rx += ((s.h ? s.ty * -3.5 : 0) - s.rx) * 0.12;
          s.ry += ((s.h ? s.tx * 3.5 : 0) - s.ry) * 0.12;
          var py = p * s.depth * 1.4;
          s.el.style.transform =
            'perspective(800px) translateY(' + (py + s.lift).toFixed(2) + 'px)' +
            ' rotateX(' + s.rx.toFixed(2) + 'deg) rotateY(' + s.ry.toFixed(2) + 'deg)';
        });
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ────────────────────────────────────────────
     12 · PROBLEMA — fotos vivas (Ken Burns ligado al scroll)
     ──────────────────────────────────────────── */
  function initProblemaLive() {
    var imgs = [].map.call(document.querySelectorAll('.problem-card .prob-photo img'), function (el, i) {
      return { el: el, dir: i % 2 ? 1 : -1, y: 0 };
    });
    if (!imgs.length) return;
    function frame() {
      var vc = window.innerHeight / 2;
      imgs.forEach(function (it) {
        var r = it.el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
        var goal = (((r.top + r.height / 2) - vc) / window.innerHeight) * 8 * it.dir;
        it.y += (goal - it.y) * 0.08;
        it.el.style.transform = 'scale(1.14) translateY(' + it.y.toFixed(2) + 'px)';
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ────────────────────────────────────────────
     12b · PROBLEMA — loop de foco: cada tarjeta toma el
     centro de atención, las demás se desenfocan, y vuelve
     fluidamente a su lugar antes de pasar a la siguiente.
     ──────────────────────────────────────────── */
  function initProblemaFocus() {
    var grid = document.querySelector('.problem-grid');
    var section = document.getElementById('problema');
    if (!grid || !section) return;
    var cards = [].slice.call(grid.querySelectorAll('.problem-card'));
    if (cards.length < 2) return;
    var idx = 0, visible = false, paused = false, started = false;

    // backdrop: la foto en foco llena la sección con zoom-out (más encuadre)
    section.classList.add('pb-host');
    section.insertAdjacentHTML('afterbegin',
      '<div class="pb-backdrop" aria-hidden="true"><img class="bda" alt=""/><img class="bdb" alt=""/><div class="pb-veil"></div></div>');
    var bdA = section.querySelector('.bda');
    var bdB = section.querySelector('.bdb');
    var useA = true;

    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible = en.isIntersecting; });
    }, { threshold: 0.3 }).observe(grid);

    function clear() {
      cards.forEach(function (c) { c.classList.remove('pb-focus', 'pb-dim'); });
      bdA.classList.remove('on');
      bdB.classList.remove('on');
    }
    // el mouse del usuario manda: el loop se corre a un costado
    grid.addEventListener('mouseenter', function () { paused = true; clear(); });
    grid.addEventListener('mouseleave', function () { paused = false; });

    setInterval(function () {
      if (!visible || paused) { if (!paused) clear(); return; }
      if (!started) {
        // arranca recién cuando la entrada de las tarjetas terminó
        if (!cards.every(function (c) { return c.classList.contains('in'); })) return;
        grid.classList.add('pb-stage');
        started = true;
      }
      var f = idx % cards.length;
      cards.forEach(function (c, i) {
        c.classList.toggle('pb-focus', i === f);
        c.classList.toggle('pb-dim', i !== f);
      });
      // crossfade del backdrop con la foto de la tarjeta en foco
      var photo = cards[f].querySelector('.prob-photo img');
      if (photo) {
        var show = useA ? bdA : bdB;
        var hide = useA ? bdB : bdA;
        useA = !useA;
        show.src = photo.currentSrc || photo.src;
        show.classList.remove('zooming');
        void show.offsetWidth;               // reinicia la animación de zoom
        show.classList.add('on', 'zooming');
        hide.classList.remove('on');
      }
      idx++;
    }, 4600);
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
    initMech3D();
    initQuizStage();
    initProblemaLive();
    initProblemaFocus();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
