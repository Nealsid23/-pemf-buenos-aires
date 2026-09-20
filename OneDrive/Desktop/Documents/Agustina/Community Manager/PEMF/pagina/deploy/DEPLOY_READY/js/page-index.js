let rmStarVal=0;
function rmSetStar(n){rmStarVal=n;document.querySelectorAll('.rm-star').forEach((s,i)=>s.classList.toggle('on',i<n));}
function openReviewModal(){document.getElementById('review-modal').classList.add('open');}
function closeReviewModal(){document.getElementById('review-modal').classList.remove('open');}
document.querySelectorAll('.js-open-review').forEach(el => el.addEventListener('click', openReviewModal));
document.getElementById('review-modal').addEventListener('click', e => { if(e.target===e.currentTarget) closeReviewModal(); });
document.getElementById('rm-close-btn').addEventListener('click', closeReviewModal);
document.querySelectorAll('.rm-star').forEach(btn => btn.addEventListener('click', () => rmSetStar(Number(btn.dataset.star))));
document.getElementById('rm-submit-btn').addEventListener('click', rmSubmit);
function rmSubmit(){
  const name=document.getElementById('rm-name').value||'Anonimo';
  const prod=document.getElementById('rm-prod').value||'';
  const text=document.getElementById('rm-text').value||'';
  const stars='★'.repeat(rmStarVal)+'☆'.repeat(5-rmStarVal);
  const msg='Hola! Quiero dejar una reseña:\n\n'+stars+'\nNombre: '+name+'\nProducto: '+prod+'\nExperiencia: '+text;
  window.open(construirLinkWhatsapp(msg), '_blank', 'noopener,noreferrer');
  closeReviewModal();
}

// ── FAQ ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

// ── CATEGORY FILTERS ──
// ── QUIZ → CATALOG FILTER ──
function quizGo(cat, el) {
  document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  document.getElementById('productos').scrollIntoView({ behavior:'smooth' });
  setTimeout(() => {
    const btn = [...document.querySelectorAll('.cat-btn')].find(b => b.textContent.trim() === cat);
    if (btn) btn.click();
  }, 700);
}
document.querySelectorAll('.quiz-card[data-quiz-goal]').forEach(card => {
  card.addEventListener('click', function() { quizGo(this.dataset.quizGoal, this); });
});

// ── PROBLEM CARD → CATALOG FILTER ──
function goToFilter(card) {
  const filter = card.dataset.filter;
  document.getElementById('productos').scrollIntoView({ behavior:'smooth' });
  setTimeout(() => {
    const btn = [...document.querySelectorAll('.cat-btn')].find(b => b.textContent.trim() === filter);
    if (btn) btn.click();
  }, 600);
}
document.querySelectorAll('.problem-card[data-filter]').forEach(card => {
  card.addEventListener('click', () => goToFilter(card));
});

// ── CATALOG FILTERS ──
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.textContent.trim();
    document.querySelectorAll('.prod-grid .prod-card').forEach(card => {
      const catEl = card.querySelector('.prod-cat');
      const multiCats = (card.dataset.cats || '').split(' ');
      const match = filter === 'Todos'
        || multiCats.includes(filter)
        || (catEl && catEl.textContent.trim() === filter);
      card.style.display = match ? '' : 'none';
    });
  });
});

// ── PRODUCT IMAGE MOUSE TRACKING + TAG COLLISION PHYSICS ──
document.querySelectorAll('.prod-card').forEach(card => {
  const imgArea = card.querySelector('.prod-card-img');
  const img = imgArea?.querySelector('img');
  if (!img) return;

  // Gather tags that can be "pushed"
  const tagEls = [...imgArea.querySelectorAll('.prod-cat,.prod-price-badge,.prod-sale-badge,.prod-badge')];
  const tagStates = tagEls.map(el => ({ el, x:0, y:0, vx:0, vy:0, ox:0, oy:0 }));

  // Measure tag positions relative to imgArea center once on first hover
  let tagsMeasured = false;
  function measureTags() {
    if (tagsMeasured) return;
    tagsMeasured = true;
    const aRect = imgArea.getBoundingClientRect();
    const aCx = aRect.width / 2, aCy = aRect.height / 2;
    tagStates.forEach(s => {
      const r = s.el.getBoundingClientRect();
      s.ox = (r.left - aRect.left + r.width  / 2) - aCx;
      s.oy = (r.top  - aRect.top  + r.height / 2) - aCy;
    });
  }

  let raf, physRaf, isHovering = false, curImgX = 0, curImgY = 0;
  const IMG_RADIUS = 85; // virtual collision radius

  function tickPhysics() {
    let anyActive = false;
    tagStates.forEach(s => {
      // Vector from img center to tag anchor
      const tx = s.ox, ty = s.oy;
      // Current img offset
      const distX = (curImgX) - tx, distY = (curImgY) - ty;
      const dist = Math.sqrt(distX*distX + distY*distY);
      if (isHovering && dist < IMG_RADIUS) {
        const strength = ((IMG_RADIUS - dist) / IMG_RADIUS) * 5.5;
        // Push tag away from image
        const nx = dist > 0 ? distX / dist : 0;
        const ny = dist > 0 ? distY / dist : 0;
        s.vx -= nx * strength;
        s.vy -= ny * strength;
      }
      // Spring back to 0,0 (original position)
      s.vx += (-s.x) * 0.22;
      s.vy += (-s.y) * 0.22;
      // Damping with slight bounce
      s.vx *= 0.68;
      s.vy *= 0.68;
      s.x += s.vx;
      s.y += s.vy;
      s.el.style.transform = `translate(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px)`;
      if (Math.abs(s.vx)>0.015||Math.abs(s.vy)>0.015||Math.abs(s.x)>0.05||Math.abs(s.y)>0.05) anyActive=true;
    });
    if (anyActive) physRaf = requestAnimationFrame(tickPhysics);
    else tagStates.forEach(s => { s.el.style.transform=''; });
  }

  let raf2;
  card.addEventListener('mouseenter', () => {
    isHovering = true;
    measureTags();
  });
  card.addEventListener('mousemove', e => {
    cancelAnimationFrame(raf2);
    raf2 = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const aRect = imgArea.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
      curImgX = dx * 100;
      curImgY = dy * 78;
      img.classList.remove('returning');
      img.style.transform = `translate(${curImgX}px,${curImgY}px) scale(1.18)`;
      // Glow trail
      const gx = e.clientX - aRect.left, gy = e.clientY - aRect.top;
      imgArea.style.setProperty('--glow-x', gx + 'px');
      imgArea.style.setProperty('--glow-y', gy + 'px');
      cancelAnimationFrame(physRaf);
      physRaf = requestAnimationFrame(tickPhysics);
    });
  });
  card.addEventListener('mouseleave', () => {
    isHovering = false;
    cancelAnimationFrame(raf2);
    img.classList.add('returning');
    img.style.transform = 'translate(0,0) scale(1)';
    setTimeout(() => img.classList.remove('returning'), 8000);
    cancelAnimationFrame(physRaf);
    physRaf = requestAnimationFrame(tickPhysics);
  });
});

// ── SCROLL PROGRESS BAR ──
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if (scrollBar) scrollBar.style.width = pct + '%';
}, { passive: true });

// ── HERO PARTICLES ──
(function(){
  const container = document.getElementById('hero-particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = 4 + Math.random() * 10;
    const x = Math.random() * 100, y = Math.random() * 100;
    const dur = 6 + Math.random() * 10;
    const delay = -Math.random() * 10;
    p.style.cssText = `width:${size}px;height:${size}px;left:${x}%;top:${y}%;opacity:${0.15+Math.random()*0.3};animation-duration:${dur}s;animation-delay:${delay}s;`;
    container.appendChild(p);
  }
})();

// ── RIPPLE EFFECT ──
document.addEventListener('click', e => {
  const btn = e.target.closest('.ripple-host,.btn-wa-hero,.btn-nav-wa,.prod-btn,.cat-btn,.quiz-card,.como-card,.wa-form-btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const r = document.createElement('div');
  r.className = 'ripple-wave';
  const size = Math.max(rect.width, rect.height) * 1.2;
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
  btn.style.position = btn.style.position || 'relative';
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
});

// ── MAGNETIC EFFECT en hero CTA ──
document.querySelectorAll('.btn-wa-hero,.btn-outline-hero').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width/2)) * 0.22;
    const dy = (e.clientY - (rect.top  + rect.height/2)) * 0.22;
    btn.style.transform = `translate(${dx}px,${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ── COUNTER ANIMATION para stats en trust bar ──
function animateCounter(el, target, suffix) {
  const dur = 1400, start = performance.now();
  const from = 0;
  function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (target - from) * ease) + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    counterObs.unobserve(e.target);
    const raw = e.target.dataset.count || '';
    const num = parseInt(raw);
    const suffix = raw.replace(num.toString(), '');
    animateCounter(e.target, num, suffix);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ── WA FORM ──
function sendWaForm() {
  const name = (document.getElementById('wf-name')?.value || '').trim();
  const msg  = (document.getElementById('wf-msg')?.value  || '').trim();
  if (!msg) { document.getElementById('wf-msg')?.focus(); return; }
  const text = name
    ? `Hola, soy ${name}. ${msg}`
    : `Hola! ${msg}`;
  window.open(construirLinkWhatsapp(text), '_blank', 'noopener,noreferrer');
}

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.classList.add('in'); obs.unobserve(e.target); }, i * 60);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

// ── MECHANISM CAROUSEL ──
const PATCH_LEFT = {
  groupColor: '#67CCE9',
  leftTitle: 'Fotobioterapia no invasiva',
  leftDesc: 'Los parches de LifeWave no contienen farmacos. Funcionan reflejando la luz infrarroja de tu propio cuerpo para activar procesos regenerativos naturales.',
  steps: [
    {title:'Aplicas el parche', desc:'Se adhiere a la piel en el punto indicado. Sin dolor, sin inyecciones. Como poner un adhesivo.'},
    {title:'El parche se activa con tu calor', desc:'La luz infrarroja corporal activa los cristales del parche de forma continua durante 12 horas.'},
    {title:'Tu cuerpo responde de forma natural', desc:'Cada parche activa procesos propios del organismo — regeneracion, energia, alivio del dolor o sueno — segun su objetivo especifico.'}
  ]
};

const MECHS = [
  { product:'Parche X39', cat:'Regeneracion', catColor:'#67CCE9', img:'img/productos/lifewave/x39.png',
    mech:'GHK-Cu', sub:'Activacion de celulas madre',
    desc:'Refleja longitudes de onda infrarrojas para elevar el peptido GHK-Cu, activando mas de 20 genes de regeneracion y la produccion natural de celulas madre.',
    source:'LifeWave Clinical Study 2021 — 20+ genes activados verificados',
    tags:['GHK-Cu','20+ genes activos','Stem cells'], ...PATCH_LEFT },
  { product:'Parche X49', cat:'Deporte', catColor:'#f59e0b', img:'img/productos/lifewave/x49.png',
    mech:'AHK', sub:'Activacion del peptido AHK',
    desc:'Eleva el peptido AHK para potenciar la fuerza y resistencia muscular. Mejora el rendimiento deportivo y acelera la recuperacion post-entrenamiento de forma natural.',
    tags:['AHK','Fuerza muscular','Recuperacion deportiva'], ...PATCH_LEFT },
  { product:'IceWave', cat:'Alivio dolor', catColor:'#6366f1', img:'img/productos/lifewave/icewave.png',
    mech:'Balance bioelectrico', sub:'Bloqueo de la senal de dolor',
    desc:'Dos parches que trabajan en tandem interrumpiendo la senal bioelectrica del dolor en los canales de acetilcolina, sin ninguna sustancia ni farmaco.',
    tags:['Acetilcolina','Sin farmacos','Localizacion exacta'], ...PATCH_LEFT },
  { product:'Silent Night', cat:'Sueno', catColor:'#a855f7', img:'img/productos/lifewave/silent-night.png',
    mech:'DSIP', sub:'Sueno profundo y reparador',
    desc:'Estimula el peptido DSIP (Delta Sleep-Inducing Peptide), favoreciendo la transicion a fases REM profundas sin crear habituacion ni dependencia.',
    tags:['DSIP','Fase REM','Sin melatonina externa'], ...PATCH_LEFT },
  { product:'Glutathione', cat:'Inmunidad', catColor:'#10b981', img:'img/productos/lifewave/glutathione.png',
    mech:'GSH — Glutatión', sub:'El antioxidante maestro del cuerpo',
    desc:'Eleva el glutatión endogeno hasta un 300% en 24 horas segun estudios clinicos. Neutraliza radicales libres, apoya la funcion hepatica y refuerza el sistema inmune.',
    source:'LifeWave Double-Blind Study 2014 — GSH +300% en 24 hs verificado',
    tags:['GSH +300%','Detox celular','Proteccion inmune'], ...PATCH_LEFT },
  { product:'Carnosine', cat:'Longevidad', catColor:'#c85c32', img:'img/productos/lifewave/carnosine.png',
    mech:'Beta-Alanina / Carnosina', sub:'Anti-envejecimiento celular',
    desc:'Incrementa la carnosina intracelular, inhibiendo la glicosilacion de proteinas, el principal mecanismo de dano celular asociado al envejecimiento prematuro.',
    tags:['Beta-Alanina','Anti-AGE','Neuroproteccion'], ...PATCH_LEFT },
  { product:'Energy Enhancer', cat:'Energia', catColor:'#e8530a', img:'img/productos/lifewave/ee.png',
    mech:'Fototerapia bioelectrica', sub:'Activacion natural del sistema energetico',
    desc:'Refleja la luz infrarroja corporal para estimular puntos de acupuntura relacionados con la energia. Activa el sistema bioelectrico del cuerpo sin introducir sustancias, promoviendo un metabolismo mas eficiente y vitalidad sostenida durante el dia.',
    tags:['Fototerapia patentada','Puntos de acupuntura','Sin estimulantes'], ...PATCH_LEFT },
  { product:'Aeon', cat:'Estres', catColor:'#a78bfa', img:'img/productos/lifewave/aeon.png',
    mech:'SOD-1 / PCR', sub:'Reduccion de inflamacion sistemica',
    desc:'Incrementa la SOD-1 (Superoxido Dismutasa) y reduce la proteina C-reactiva (PCR), marcador clinico de inflamacion sistemica. Regula el sistema nervioso autonomo y el estres cronico.',
    tags:['SOD-1','PCR reducida','Anti-inflamatorio'], ...PATCH_LEFT },
  { product:'SP6 Complete', cat:'Metabolismo', catColor:'#f43f5e', img:'img/productos/lifewave/sp6.png',
    mech:'Meridiano Bazo-Pancreas', sub:'Control natural del apetito',
    desc:'Estimula el punto SP6 del meridiano del bazo-pancreas, regulando las senales hormonales de saciedad y optimizando el metabolismo lipidico de forma natural.',
    tags:['Meridiano SP6','Saciedad','Metabolismo'], ...PATCH_LEFT },
  { product:'Alavida', cat:'Belleza', catColor:'#ec4899', img:'img/productos/lifewave/alavida.png',
    mech:'GHK-Cu nocturno', sub:'Regeneracion cutanea durante el sueno',
    desc:'Eleva el peptido GHK-Cu para estimular la produccion de colageno y reparar la piel durante las fases de sueno profundo. Sin retinol, sin quimicos, sin irritacion. El parche se usa de noche para aprovechar los ciclos naturales de regeneracion celular.',
    tags:['GHK-Cu','Colageno natural','Anti-envejecimiento'], ...PATCH_LEFT },
  { product:'ESS60 — MyVitalC', cat:'Antioxidante', catColor:'#6366f1', groupColor:'#f59e0b', img:'img/productos/ess60.png',
    mech:'C60 — Fullereno molecular', sub:'Antioxidante celular de ultima generacion',
    desc:'Molecula C60 purificada disuelta en aceite de oliva organico premium. Optimiza la funcion mitocondrial, protege las celulas del estres oxidativo y promueve la longevidad celular con mas de 2000 publicaciones cientificas que respaldan sus beneficios.',
    source:'Baati et al., Biomaterials 2012 — longevidad +90% en modelo animal; 2000+ pub. ScienceDirect',
    tags:['C60 purificado','Funcion mitocondrial','Longevidad celular'],
    leftTitle:'Antioxidante molecular C60',
    leftDesc:'El ESS60 combina fullereno C60 purificado con aceite de oliva organico premium para maxima biodisponibilidad. Una cucharadita diaria aporta proteccion celular avanzada sin farmacos.',
    steps:[
      {title:'Se ingiere diariamente', desc:'Unas gotas o cucharadita de aceite de oliva con C60. Simple y de facil incorporacion a la rutina diaria.'},
      {title:'El C60 llega a las mitocondrias', desc:'La molecula penetra en las celulas y se concentra en las mitocondrias, el centro de produccion energetica celular.'},
      {title:'Proteccion y longevidad celular', desc:'Neutraliza radicales libres, reduce el estres oxidativo y mejora la eficiencia energetica de cada celula.'}
    ]},
  { product:'Stickers de Shungita', cat:'Proteccion EMF', catColor:'#64748b', groupColor:'#f59e0b', img:'img/productos/shungita.png',
    mech:'Blindaje EMF mineral', sub:'Proteccion contra campos electromagneticos',
    desc:'Adhesivos de piedra shungita elite natural con propiedades de blindaje contra radiacion electromagnetica (EMF). Proteccion continua para dispositivos electronicos sin alterar su funcionamiento.',
    tags:['EMF shielding','Shungita elite','Proteccion 5G'],
    leftTitle:'Proteccion EMF con shungita elite',
    leftDesc:'Los stickers de shungita elite natural actuan como escudo pasivo contra la radiacion electromagnetica emitida por celulares, laptops, tablets y routers.',
    steps:[
      {title:'Se adhiere al dispositivo', desc:'El sticker se pega directamente sobre el celular, laptop o router. Sin afectar senales ni funcionamiento.'},
      {title:'La shungita absorbe y neutraliza EMF', desc:'El mineral actua de forma continua y pasiva, sin necesidad de recarga ni mantenimiento de ningun tipo.'},
      {title:'Proteccion constante las 24 horas', desc:'Sin baterias, sin cables, sin configuracion. Proteccion continuada mientras se use el dispositivo.'}
    ]},
  { product:'H2 Tablets', cat:'Hidrogeno molecular', catColor:'#0ea5e9', groupColor:'#f59e0b', img:'img/productos/h2-tablets.png',
    mech:'H2 — Hidrogeno molecular', sub:'Regulador maestro del metabolismo celular',
    desc:'Al disolverse en agua liberan hidrogeno molecular, considerado por investigadores un regulador maestro del cuerpo humano. Respaldado por 140+ ensayos clinicos: mejora 18 de 20 marcadores metabolicos y optimiza el metabolismo cerebral.',
    source:'140+ ensayos clinicos publicados en PubMed — Ohta 2011, Nakao 2014 y otros',
    tags:['140+ ensayos clinicos','H2 molecular','18/20 marcadores'],
    leftTitle:'Hidrogeno molecular en agua',
    leftDesc:'Las H2 Tablets disuelven hidrogeno molecular en el agua, creando una bebida terapeutica respaldada por mas de 140 ensayos clinicos internacionales publicados.',
    steps:[
      {title:'Se disuelve en agua', desc:'Una tableta en un vaso de agua genera hidrogeno molecular en minutos. Sin sabor ni color, lista para tomar.'},
      {title:'El H2 actua como regulador maestro', desc:'El hidrogeno molecular penetra todas las membranas celulares y actua como antioxidante selectivo de alta biodisponibilidad.'},
      {title:'Mejora 18 de 20 marcadores metabolicos', desc:'Estudios clinicos documentan mejoras en metabolismo, cognitivo, inflamacion, energia celular y sensibilidad a la insulina.'}
    ]},
  { product:'Analemma', cat:'Agua estructurada', catColor:'#14b8a6', groupColor:'#14b8a6', img:'img/productos/analemma.png',
    mech:'Coherencia molecular del agua', sub:'Agua de alta coherencia biologica',
    desc:'Transforma el agua corriente en agua de alta coherencia, mejorando la absorcion celular y la hidratacion profunda. El agua estructurada optimiza la comunicacion celular y los procesos bioquimicos naturales del organismo.',
    tags:['Agua coherente','Absorcion celular','Hidratacion profunda'],
    leftTitle:'Agua de alta coherencia molecular',
    leftDesc:'El Analemma reorganiza la estructura molecular del agua corriente, transformandola en agua de alta coherencia para una hidratacion celular superior y mas eficiente.',
    steps:[
      {title:'Se gira en el agua', desc:'Se introduce el dispositivo en el vaso y se gira durante unos segundos. Sin electricidad, sin filtros, sin consumibles.'},
      {title:'La estructura molecular se reorganiza', desc:'Las moleculas de agua se alinean en un estado de alta coherencia, mejorando significativamente su biodisponibilidad biologica.'},
      {title:'Hidratacion celular profunda', desc:'El agua estructurada mejora la absorcion celular, la comunicacion biologica y los procesos metabolicos naturales del organismo.'}
    ]},
  { product:'Gamma Light', cat:'Neurologia 40 Hz', catColor:'#a855f7', groupColor:'#8b5cf6', img:'img/productos/gamma-light.png',
    mech:'Frecuencia Gamma 40 Hz', sub:'Estimulacion neuronal mediante luz pulsada',
    desc:'La luz LED pulsada a 40 Hz estimula la actividad de las ondas cerebrales gamma, asociadas a mayor claridad cognitiva y concentracion. Apoyo al rendimiento neuronal sin farmacos ni dispositivos invasivos.',
    source:'Iaccarino et al., Nature 2016 — MIT Tsai Lab; estimulacion gamma 40 Hz y neuroproteccion',
    tags:['40 Hz gamma','Neuroproteccion','Claridad cognitiva'],
    leftTitle:'Estimulacion cerebral a 40 Hz',
    leftDesc:'La lampara Gamma Light emite luz LED pulsada a 40 Hz — la frecuencia de las ondas cerebrales gamma — para estimular el rendimiento cognitivo de forma natural y no invasiva.',
    steps:[
      {title:'Se enciende en el ambiente', desc:'Se usa como iluminacion en el espacio habitual de trabajo, lectura o descanso. Sin cables adicionales ni configuraciones complejas.'},
      {title:'La luz pulsa a frecuencia gamma', desc:'El parpadeo imperceptible al ojo estimula las ondas cerebrales gamma a traves de fotoneuromodulacion no invasiva.'},
      {title:'Mayor claridad y foco cognitivo', desc:'Las ondas gamma sincronizadas mejoran la concentracion, la memoria de trabajo y la claridad mental sostenida.'}
    ]},
  { product:'Sleep Recharge', cat:'Sueno profundo', catColor:'#8b5cf6', groupColor:'#8b5cf6', img:'img/productos/neuro/sleep-recharge.png',
    mech:'Melatonina + Botanicos', sub:'Sueno profundo y restaurador sin habituacion',
    desc:'Formula completa con melatonina natural, extracto de sauco, manzanilla, pasiflora y balsamo de limon. Induce y mantiene el sueno profundo sin crear habituacion ni dependencia.',
    tags:['Melatonina natural','Sin habituacion','Sueno REM profundo'],
    leftTitle:'Sueno profundo por botanica avanzada',
    leftDesc:'Sleep Recharge combina melatonina natural con una sinergia de plantas adaptogenas para inducir y mantener fases REM profundas sin efectos residuales al despertar.',
    steps:[
      {title:'Se toma 30 min antes de dormir', desc:'Comprimido masticable de absorcion rapida. Sin agua necesaria, facil de incorporar a la rutina nocturna.'},
      {title:'Los botanicos calman el sistema nervioso', desc:'Manzanilla, pasiflora y balsamo de limon reducen la actividad nerviosa y facilitan la transicion al sueno profundo.'},
      {title:'La melatonina sincroniza el ritmo circadiano', desc:'Regula el ciclo sueno-vigilia sin crear dependencia, permitiendo un despertar natural y descansado.'}
    ]},
  { product:'Calma & Claridad', cat:'Bienestar cognitivo', catColor:'#d97706', groupColor:'#8b5cf6', img:'img/productos/neuro/calma-claridad.png',
    mech:'GABA + L-Teanina + Vitamina D3', sub:'Calma mental activa sin somnolencia',
    desc:'65 mg de GABA y 65 mg de L-teanina con vitamina D3 actuan en sinergia para reducir la ansiedad y el ruido mental, manteniendo claridad cognitiva plena durante el dia. Formato menta masticable de absorcion sublingual.',
    tags:['GABA 65 mg','L-Teanina 65 mg','Vitamina D3'],
    leftTitle:'Ecuanimidad cognitiva con GABA y L-Teanina',
    leftDesc:'Calma & Claridad combina GABA con L-Teanina y Vitamina D3 en formato menta, para una calma mental activa que no adormece ni nubla el pensamiento.',
    steps:[
      {title:'Se mastica la menta', desc:'Comprimido masticable de absorcion sublingual rapida. Sin agua, ideal para cualquier momento del dia.'},
      {title:'GABA reduce el ruido mental', desc:'El acido gamma-aminobutirico inhibe la actividad neuronal excesiva, reduciendo la ansiedad sin sedacion.'},
      {title:'L-Teanina mantiene el foco activo', desc:'Contrabalancea el GABA manteniendo la claridad mental y la concentracion sostenida sin somnolencia.'}
    ]},
  { product:'Neuro Gum', cat:'Suplemento cognitivo', catColor:'#00B4CC', groupColor:'#8b5cf6', img:'img/productos/neuro/neurogum.png',
    mech:'Cafeina + L-teanina sublingual', sub:'Foco y energia con absorcion 5x superior',
    desc:'40mg de cafeina natural + 60mg de L-teanina + vitaminas B6 y B12. Tecnologia de compresion en frio que preserva los activos para una absorcion sublingual 5 veces superior a capsulas. Energia sin picos ni bajones.',
    tags:['Absorcion sublingual 5x','L-teanina 60mg','Vitaminas B6/B12'],
    leftTitle:'Nutricion cognitiva sublingual',
    leftDesc:'El Neuro Gum entrega cafeina natural, L-teanina y vitaminas B con una absorcion sublingual 5 veces superior a capsulas convencionales, sin pasar por el sistema digestivo.',
    steps:[
      {title:'Se mastica el chicle', desc:'La formulacion de compresion en frio preserva todos los activos hasta el momento exacto del consumo.'},
      {title:'Absorcion sublingual inmediata', desc:'Los activos pasan directamente al torrente sanguineo bajo la lengua, sin esperar la digestion. Efecto en minutos.'},
      {title:'Foco y energia sin nerviosismo', desc:'La L-teanina equilibra el efecto de la cafeina eliminando la ansiedad y los picos bruscos tipicos del cafe.'}
    ]}
];

let mechIdx = 0, mechTimer, mechProgress = 0, mechProgressTimer;
const MECH_INTERVAL = 5000;

function renderMech() {
  const m = MECHS[mechIdx];
  // Lado derecho — tarjeta de producto
  document.getElementById('mech-img').src = m.img;
  document.getElementById('mech-name').textContent = m.product;
  const catEl = document.getElementById('mech-cat');
  catEl.textContent = m.cat;
  catEl.style.background = m.catColor + '22';
  catEl.style.color = m.catColor;
  document.getElementById('mech-mech').textContent = m.mech;
  document.getElementById('mech-sub').textContent = m.sub;
  document.getElementById('mech-desc').textContent = m.desc;
  const srcEl = document.getElementById('mech-source');
  if (srcEl) { srcEl.textContent = m.source ? 'Fuente: ' + m.source : ''; srcEl.style.display = m.source ? '' : 'none'; }
  const tagsEl = document.getElementById('mech-tags');
  tagsEl.textContent = '';
  m.tags.forEach(t => { const s = document.createElement('span'); s.className = 'mech-tag'; s.textContent = t; tagsEl.appendChild(s); });
  document.querySelectorAll('.mech-dot').forEach((d,i) => d.classList.toggle('active', i === mechIdx));
  // Tint de fondo de sección y color de tarjeta según categoría
  const tint = document.getElementById('how-bg-tint');
  if (tint) tint.style.background = `radial-gradient(ellipse 65% 75% at 35% 50%, ${m.catColor}2e 0%, transparent 68%)`;
  const card = document.getElementById('mech-card');
  if (card) card.style.background = `linear-gradient(145deg, ${m.groupColor}28 0%, ${m.groupColor}0d 100%)`;
  // Lado izquierdo — titulo, descripcion y pasos
  document.getElementById('how-title').textContent = m.leftTitle;
  document.getElementById('how-desc').textContent = m.leftDesc;
  const howStepsEl = document.getElementById('how-steps');
  howStepsEl.textContent = '';
  m.steps.forEach((s, i) => {
    const step = document.createElement('div'); step.className = 'step';
    const num = document.createElement('div'); num.className = 'step-num'; num.textContent = i + 1; step.appendChild(num);
    const cnt = document.createElement('div'); cnt.className = 'step-content';
    const h4 = document.createElement('h4'); h4.textContent = s.title; cnt.appendChild(h4);
    const p = document.createElement('p'); p.textContent = s.desc; cnt.appendChild(p);
    step.appendChild(cnt); howStepsEl.appendChild(step);
  });
}

function buildMechDots() {
  const el = document.getElementById('mech-dots');
  el.textContent = '';
  MECHS.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'mech-dot' + (i === 0 ? ' active' : '');
    btn.addEventListener('click', () => goMech(i, i > mechIdx ? 'next' : 'prev'));
    el.appendChild(btn);
  });
}

function goMech(idx, dir) {
  const card = document.getElementById('mech-card');
  const left = document.getElementById('how-left');
  const bgImg = document.getElementById('how-bg-img');
  // Fade out: tarjeta, texto izquierdo y producto de fondo — todo a la vez
  card.classList.add('card-out');
  left.classList.add('how-fade-out');
  if (bgImg) bgImg.classList.add('bg-fade');
  setTimeout(() => {
    card.classList.remove('card-out');
    left.classList.remove('how-fade-out');
    mechIdx = (idx + MECHS.length) % MECHS.length;
    renderMech();
    // Actualizar y revelar producto de fondo
    if (bgImg) { bgImg.src = MECHS[mechIdx].img; bgImg.classList.remove('bg-fade'); }
    card.classList.add('card-in');
    setTimeout(() => card.classList.remove('card-in'), 260);
  }, 240);
  resetMechProgress();
}

function resetMechProgress() {
  clearInterval(mechProgressTimer); clearTimeout(mechTimer);
  mechProgress = 0;
  document.getElementById('mech-bar').style.width = '0%';
  mechProgressTimer = setInterval(() => {
    mechProgress += 100 / (MECH_INTERVAL / 100);
    document.getElementById('mech-bar').style.width = Math.min(mechProgress, 100) + '%';
    if (mechProgress >= 100) {
      clearInterval(mechProgressTimer);
      goMech(mechIdx + 1, 'next');
    }
  }, 100);
}

document.getElementById('mech-next').addEventListener('click', () => goMech(mechIdx + 1, 'next'));
document.getElementById('mech-prev').addEventListener('click', () => goMech(mechIdx - 1, 'prev'));
buildMechDots();
renderMech();
// Inicializar imagen de fondo con el primer producto
(function(){ const b=document.getElementById('how-bg-img'); if(b) b.src=MECHS[0].img; })();
resetMechProgress();

// ── NEURO CAROUSEL ──
const NEURO = [
  { name:'Neuro Gum',
    tagline:'Foco y energia en formato masticable',
    desc:'40 mg de cafeina natural + 60 mg de L-teanina + vitaminas B6 y B12. Absorcion sublingual 5 veces superior a capsulas. Estudio BrainCo: +21% velocidad en tareas cognitivas vs. placebo.',
    benefits:['Foco mental sostenido 2-3 hs','+21% velocidad cognitiva (BrainCo)','Absorcion sublingual 5x'],
    variants:[
      { label:'Energy', img:'img/productos/neuro/neurogum.png', bg:'rgba(0,180,204,.12)', dot:'#00B4CC', price:18000, url:'https://pemf-buenos-aires.tiendup.com/p/neuro-gum-revoluciona-tu-rendimiento-mental-or-la-nueva-era-del-enfoque' },
      { label:'Spearmint', img:'img/productos/neuro/spearmint.png', bg:'rgba(34,197,94,.12)', dot:'#22c55e', price:18000, url:'https://pemf-buenos-aires.tiendup.com/p/neuro-gum-revoluciona-tu-rendimiento-mental-or-la-nueva-era-del-enfoque' },
      { label:'Spearmint Extra', img:'img/productos/neuro/spearmint-extra.png', bg:'rgba(21,128,61,.12)', dot:'#15803d', price:18000, url:'https://pemf-buenos-aires.tiendup.com/p/neuro-gum-revoluciona-tu-rendimiento-mental-or-la-nueva-era-del-enfoque' },
      { label:'Extra Strength', img:'img/productos/neuro/extra-strength.png', bg:'rgba(26,79,182,.12)', dot:'#1a4fb6', note:'100mg cafeina', price:19550, url:'https://pemf-buenos-aires.tiendup.com/p/extra-strength-neuro-energy-and-focus-gum-potencia-y-claridad-mental-or-100-mg-de-cafeina-natural' }
    ]
  },
  { name:'Neuro Mints',
    tagline:'La misma formula del Neuro Gum en formato menta',
    desc:'Cafeina natural + L-teanina + vitaminas B6 y B12 en comprimido masticable disuelto bajo la lengua. Igual absorcion sublingual en un formato discreto y practico. La version Extra Strength lleva 100 mg de cafeina para mayor intensidad.',
    benefits:['Absorcion sublingual igual al gum','Formato discreto sin ruido al masticar','Extra Strength: 100 mg de cafeina'],
    variants:[
      { label:'Energy & Focus', img:'img/productos/neuro/mints-energy.png', bg:'rgba(14,165,233,.12)', dot:'#0ea5e9', price:15300, url:'https://pemf-buenos-aires.tiendup.com/p/neuro-energy-and-focus-mints-energia-y-enfoque-instantaneo-or-40-mg-cafeina-1-lana-12-mentas' },
      { label:'Extra Strength', img:'img/productos/neuro/mints-extra.png', bg:'rgba(22,163,74,.12)', dot:'#16a34a', note:'100mg cafeina', price:15300, url:'https://pemf-buenos-aires.tiendup.com/p/extra-strength-neuro-energy-and-focus-gum-potencia-y-claridad-mental-or-100-mg-de-cafeina-natural' }
    ]
  },
  { name:'Sleep Recharge',
    tagline:'Sueno profundo y restaurador',
    desc:'Melatonina natural (1-5 mg) + extracto de sauco + manzanilla + pasiflora + balsamo de limon. Formula completa para inducir y mantener el sueno profundo sin crear habituacion.',
    benefits:['Sueno profundo y continuo','Sin habituacion ni dependencia','Despertar natural y descansado'],
    variants:[
      { label:'Original', img:'img/productos/neuro/sleep-recharge.png', bg:'rgba(139,92,246,.12)', dot:'#8b5cf6', price:18000, url:'https://pemf-buenos-aires.tiendup.com/p/sleep-and-recharge-tm-meltaway-mints-sueno-reparador-y-despertar-refrescado-or-1-mg-1-blister-12-mentas' }
    ]
  },
  { name:'Calma & Claridad',
    tagline:'Tranquilidad sin somnolencia',
    desc:'65 mg de GABA + 65 mg de L-teanina + vitamina D3. Combinacion para reducir la ansiedad y mantener la claridad mental activa sin generar somnolencia durante el dia.',
    benefits:['GABA 65 mg + L-teanina 65 mg','Calma sin somnolencia','Claridad mental sostenida'],
    variants:[
      { label:'Miel & Limon', img:'img/productos/neuro/calma-claridad.png', bg:'rgba(245,158,11,.12)', dot:'#d97706', price:15300, url:'https://pemf-buenos-aires.tiendup.com/p/calm-and-clarity-tm-mints-calma-mental-y-claridad-enfocada-or-gaba-l-teanina-vitamina-d3' }
    ]
  }
];

let neuroIdx = 0, neuroVariantIdx = 0;

function renderNeuroLeft() {
  const p = NEURO[neuroIdx];
  document.getElementById('neuro-name').textContent = p.name;
  document.getElementById('neuro-tagline').textContent = p.tagline;
  document.getElementById('neuro-desc').textContent = p.desc;
  const neuroBenEl = document.getElementById('neuro-benefits');
  neuroBenEl.textContent = '';
  p.benefits.forEach(b => {
    const li = document.createElement('li');
    li.style.cssText = 'display:flex;align-items:center;gap:10px;font-size:14px;color:rgba(255,255,255,.7);';
    const icon = document.createElement('span');
    icon.style.cssText = 'width:18px;height:18px;border-radius:50%;background:rgba(103,204,233,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;';
    icon.innerHTML = '<svg viewBox="0 0 10 10" width="10" fill="none" stroke="#67CCE9" stroke-width="2"><polyline points="2,5 4,7 8,3"/></svg>';
    li.appendChild(icon);
    li.appendChild(document.createTextNode(b));
    neuroBenEl.appendChild(li);
  });
  document.querySelectorAll('.neuro-prog-dot').forEach((d,i) => d.classList.toggle('active', i === neuroIdx));
}

function renderNeuroCard(vIdx, animate) {
  const p = NEURO[neuroIdx];
  const v = p.variants[vIdx];
  const card = document.getElementById('neuro-card');
  const img = document.getElementById('neuro-img');
  card.style.background = v.bg;
  document.getElementById('neuro-card-name').textContent = p.name;
  document.getElementById('neuro-card-desc').textContent = v.label;
  if (animate) {
    img.classList.add('fading');
    setTimeout(() => { img.src = v.img; img.classList.remove('fading'); }, 250);
  } else {
    img.src = v.img;
  }
  // label de variante actual
  document.getElementById('neuro-variant-label').textContent = v.label + (v.note ? ' — ' + v.note : '');
  // precio
  const nPriceEl = document.getElementById('neuro-card-price');
  if (nPriceEl) nPriceEl.textContent = v.price ? fmtPrice(v.price) : '';
  // link tienda
  const tiendaBtn = document.getElementById('neuro-tienda-btn');
  if (tiendaBtn && v.url) tiendaBtn.href = v.url;
  // dots
  const dotsEl = document.getElementById('neuro-variants');
  dotsEl.textContent = '';
  p.variants.forEach((vv, i) => {
    const btn = document.createElement('button');
    btn.className = 'var-dot' + (i === vIdx ? ' active' : '');
    btn.style.background = vv.dot;
    btn.title = vv.label;
    btn.addEventListener('click', () => { neuroVariantIdx = i; renderNeuroCard(i, true); });
    dotsEl.appendChild(btn);
  });
}

function buildNeuroProgDots() {
  const el = document.getElementById('neuro-prog-dots');
  el.textContent = '';
  NEURO.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'neuro-prog-dot' + (i === 0 ? ' active' : '');
    btn.addEventListener('click', () => goNeuro(i));
    el.appendChild(btn);
  });
}

function goNeuro(idx) {
  const card = document.getElementById('neuro-card');
  card.classList.add('slide-out');
  setTimeout(() => {
    card.classList.remove('slide-out');
    neuroIdx = (idx + NEURO.length) % NEURO.length;
    neuroVariantIdx = 0;
    renderNeuroLeft();
    renderNeuroCard(0, false);
    card.classList.add('slide-in');
    setTimeout(() => card.classList.remove('slide-in'), 280);
  }, 280);
}

document.getElementById('neuro-next').addEventListener('click', () => goNeuro(neuroIdx + 1));
document.getElementById('neuro-prev').addEventListener('click', () => goNeuro(neuroIdx - 1));
buildNeuroProgDots();
renderNeuroLeft();
renderNeuroCard(0, false);
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── MOTION ONE — animaciones premium ──
(function initMotion() {
  if (typeof Motion === 'undefined') return;
  const { animate, inView, scroll } = Motion;

  // Polyfill: hover y press fueron removidos en Motion v11
  function hover(el, cb) {
    el.addEventListener('mouseenter', () => {
      const cleanup = cb();
      if (cleanup) el.addEventListener('mouseleave', cleanup, { once: true });
    });
  }
  function press(el, cb) {
    const run = () => {
      const cleanup = cb();
      if (cleanup) {
        document.addEventListener('mouseup',   cleanup, { once: true });
        document.addEventListener('touchend',  cleanup, { once: true });
      }
    };
    el.addEventListener('mousedown', run);
    el.addEventListener('touchstart', run, { passive: true });
  }

  // ── Nav shadow al hacer scroll ──
  const nav = document.querySelector('.nav');
  let lastShadow = false;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 48;
    if (scrolled === lastShadow) return;
    lastShadow = scrolled;
    animate(nav,
      { boxShadow: scrolled ? '0 4px 40px rgba(26,35,50,.13)' : '0 0 0 rgba(26,35,50,0)' },
      { duration: 0.4, easing: [0.22, 1, 0.36, 1] }
    );
  }, { passive: true });

  // ── Hero entrance stagger ──
  const heroChildren = document.querySelectorAll('.hero-section .reveal > *');
  heroChildren.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    animate(el,
      { opacity: 1, y: 0 },
      { duration: 0.7, delay: 0.1 + i * 0.12, easing: [0.22, 1, 0.36, 1] }
    );
  });

  // ── Producto cards — spring lift en hover ──
  document.querySelectorAll('.prod-card').forEach(card => {
    hover(card, () => {
      animate(card, { y: -10, scale: 1.02 },
        { type: 'spring', stiffness: 320, damping: 22 });
      return () => animate(card, { y: 0, scale: 1 },
        { type: 'spring', stiffness: 380, damping: 28 });
    });
  });

  // ── Problema cards — spring lift en hover ──
  document.querySelectorAll('.problem-card').forEach(card => {
    hover(card, () => {
      animate(card, { y: -8, scale: 1.015 },
        { type: 'spring', stiffness: 350, damping: 24 });
      return () => animate(card, { y: 0, scale: 1 },
        { type: 'spring', stiffness: 400, damping: 30 });
    });
  });

  // ── Botones — press feedback táctil ──
  document.querySelectorAll('.btn-wa-hero, .btn-outline-hero, .btn-nav-wa, .btn-ghost, .prod-btn, .cat-btn').forEach(btn => {
    press(btn, () => {
      animate(btn, { scale: 0.93 }, { duration: 0.08 });
      return () => animate(btn, { scale: 1 },
        { type: 'spring', stiffness: 500, damping: 30 });
    });
  });

  // ── Flechas del carousel — spring scale ──
  document.querySelectorAll('.mech-arrow, .neuro-nav-btn').forEach(btn => {
    hover(btn, () => {
      animate(btn, { scale: 1.18 }, { type: 'spring', stiffness: 450, damping: 22 });
      return () => animate(btn, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 28 });
    });
    press(btn, () => {
      animate(btn, { scale: 0.88 }, { duration: 0.08 });
      return () => animate(btn, { scale: 1 }, { type: 'spring', stiffness: 600, damping: 25 });
    });
  });

  // ── FAQ rows — deslizamiento sutil al hover ──
  document.querySelectorAll('.faq-q').forEach(btn => {
    hover(btn, () => {
      animate(btn, { x: 5 }, { type: 'spring', stiffness: 400, damping: 28 });
      return () => animate(btn, { x: 0 }, { type: 'spring', stiffness: 500, damping: 35 });
    });
  });

  // ── Trust signals — hover scale ──
  document.querySelectorAll('.trust-signal').forEach(sig => {
    hover(sig, () => {
      animate(sig, { scale: 1.06 }, { type: 'spring', stiffness: 400, damping: 22 });
      return () => animate(sig, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 28 });
    });
  });

  // ── Mech carousel card — entrada con spring al cambiar ──
  const origGoMech = window.goMech;
  if (origGoMech) {
    window.goMech = function(idx, dir) {
      origGoMech(idx, dir);
      const card = document.getElementById('mech-card');
      if (card) {
        setTimeout(() => {
          animate(card, { opacity: [0, 1], y: [16, 0], scale: [0.96, 1] },
            { duration: 0.4, easing: [0.22, 1, 0.36, 1] });
        }, 245);
      }
    };
  }

  // ── Step numbers — pulse al entrar en viewport ──
  document.querySelectorAll('.step-num').forEach((num, i) => {
    inView(num, () => {
      animate(num, { scale: [0.6, 1.15, 1] },
        { duration: 0.5, delay: i * 0.08, easing: [0.22, 1, 0.36, 1] });
    }, { margin: '0px 0px -40px 0px' });
  });

  // ── Dots de carousels — spring scale ──
  document.querySelectorAll('.mech-dot, .neuro-dot, .neuro-prog-dot').forEach(dot => {
    hover(dot, () => {
      animate(dot, { scale: 1.5 }, { type: 'spring', stiffness: 500, damping: 25 });
      return () => animate(dot, { scale: 1 }, { type: 'spring', stiffness: 600, damping: 30 });
    });
  });

  // ── Logo — entrada suave ──
  const logoImg = document.querySelector('.logo img');
  if (logoImg) {
    animate(logoImg, { opacity: [0, 1], scale: [0.85, 1] },
      { duration: 0.6, delay: 0.05, easing: [0.22, 1, 0.36, 1] });
  }
})();

// ── PRODUCT MODAL ──
// WA_NUMERO y construirLinkWhatsapp vienen de js/wa-utils.js

const PRICE_DATA = {
  'Parche X39':           { price: 235000, orig: 285000 },
  'Parche X49':           { price: 220000, orig: 285000, soldOut: true },
  'Alavida':              { price: 165000, orig: 195000 },
  'IceWave':              { price: 165000, orig: 190000 },
  'Silent Night':         { price: 150000, orig: 175000 },
  'Glutathione':          { price: 150000, orig: 175000 },
  'Carnosine':            { price: 140400, orig: 175000 },
  'Energy Enhancer':      { price: 150000, orig: 175000 },
  'Aeon':                 { price: 150000, orig: 175000 },
  'SP6 Complete':         { price: 160000, orig: 190000 },
  'H2 Tablets':           { price: 170000, orig: 200000 },
  'Gamma Light':          { price: 200000, orig: 256000 },
  'Stickers de Shungita': { price: 13685,  orig: 15230 },
  'ESS60 — MyVitalC':     { price: 187200, orig: 423000 },
  'Analemma':             { price: 352800, orig: 490000 },
};

function fmtPrice(n) {
  return '$' + n.toLocaleString('es-AR');
}

const PRODUCT_URLS = {
  'Parche X39':           'https://pemf-buenos-aires.tiendup.com/p/lifewave-x39-activa-tus-celulas-madres-con-fototerapia-30-parches',
  'Parche X49':           'https://pemf-buenos-aires.tiendup.com/p/lifewave-x49',
  'IceWave':              'https://pemf-buenos-aires.tiendup.com/p/icewave-alivio-natural-e-inmediato-del-dolor',
  'Silent Night':         'https://pemf-buenos-aires.tiendup.com/p/silent-nights-sueno-natural-reparador-y-profundo',
  'Glutathione':          'https://pemf-buenos-aires.tiendup.com/p/glutathione-detoxificacion-profunda-y-refuerzo-del-sistema-inmunologico',
  'Carnosine':            'https://pemf-buenos-aires.tiendup.com/p/carnosine-proteccion-celular-cognicion-y-rendimiento-fisico',
  'Energy Enhancer':      'https://pemf-buenos-aires.tiendup.com/p/energy-enhancer-energia-natural-y-vitalidad-sostenida',
  'Aeon':                 'https://pemf-buenos-aires.tiendup.com/p/aeon-regulacion-del-estres-y-bienestar-emocional-natural',
  'SP6 Complete':         'https://pemf-buenos-aires.tiendup.com/p/sp6-complete-control-natural-del-apetito-y-apoyo-metabolico',
  'ESS60 — MyVitalC':     'https://pemf-buenos-aires.tiendup.com/p/ess60-en-aceite-de-oliva-antioxidante-revolucionario-or-longevidad-y-energia',
  'H2 Tablets':           'https://pemf-buenos-aires.tiendup.com/p/h2-tablets-la-nueva-frontera-en-bienestar-molecular',
  'Stickers de Shungita': 'https://pemf-buenos-aires.tiendup.com/p/stickers-de-shungita-proteccion-emf-natural-or-stickers-anti-radiacion',
  'Analemma':             'https://pemf-buenos-aires.tiendup.com/p/analemma-water-wand-agua-coherente-y-estructurada-or-vitalidad-celular-y-rejuvenecimiento-natural',
  'Gamma Light':          'https://pemf-buenos-aires.tiendup.com/p/gamma-clarity-40-hz-light-bulb-entrainamiento-gamma-para-el-cerebro-or-memoria-enfoque-y-desintoxicacion-neurologica',
  'Sleep Recharge':       'https://pemf-buenos-aires.tiendup.com/p/sleep-and-recharge-tm-meltaway-mints-sueno-reparador-y-despertar-refrescado-or-1-mg-1-blister-12-mentas',
  'Calma & Claridad':     'https://pemf-buenos-aires.tiendup.com/p/calm-and-clarity-tm-mints-calma-mental-y-claridad-enfocada-or-gaba-l-teanina-vitamina-d3',
  'Neuro Gum':            'https://pemf-buenos-aires.tiendup.com/p/neuro-gum-revoluciona-tu-rendimiento-mental-or-la-nueva-era-del-enfoque'
};

function openProdModal(productName) {
  const m = MECHS.find(x => x.product === productName);
  if (!m) return;
  const modal = document.getElementById('prod-modal');
  // Image & category
  document.getElementById('pm-img').src = m.img;
  document.getElementById('pm-img').alt = m.product;
  const catEl = document.getElementById('pm-cat');
  catEl.textContent = m.cat;
  catEl.style.background = m.catColor + '22';
  catEl.style.color = m.catColor;
  // Name & tagline
  document.getElementById('pm-name').textContent = m.product;
  document.getElementById('pm-tagline').textContent = m.sub;
  // Mechanism
  document.getElementById('pm-mech').textContent = m.mech;
  document.getElementById('pm-mech-sub').textContent = '— ' + m.sub;
  // Description
  document.getElementById('pm-desc').textContent = m.desc;
  // Steps
  const stepsEl = document.getElementById('pm-steps');
  if (m.steps && m.steps.length) {
    stepsEl.textContent = '';
    m.steps.forEach((s, i) => {
      const step = document.createElement('div'); step.className = 'pm-step';
      const num = document.createElement('div'); num.className = 'pm-step-num'; num.textContent = i + 1; step.appendChild(num);
      const cnt = document.createElement('div'); cnt.className = 'pm-step-content';
      const h5 = document.createElement('h5'); h5.textContent = s.title; cnt.appendChild(h5);
      const p = document.createElement('p'); p.textContent = s.desc; cnt.appendChild(p);
      step.appendChild(cnt); stepsEl.appendChild(step);
    });
    stepsEl.style.display = '';
  } else {
    stepsEl.style.display = 'none';
  }
  // Tags
  const pmTagsEl = document.getElementById('pm-tags');
  pmTagsEl.textContent = '';
  (m.tags || []).forEach(t => { const s = document.createElement('span'); s.className = 'pm-tag'; s.textContent = t; pmTagsEl.appendChild(s); });
  // Source
  const srcEl = document.getElementById('pm-source');
  if (m.source) {
    srcEl.textContent = 'Fuente: ' + m.source;
    srcEl.style.display = '';
  } else {
    srcEl.style.display = 'none';
  }
  // Price
  const priceEl = document.getElementById('pm-price');
  const d = PRICE_DATA[productName];
  if (d) {
    if (d.soldOut) {
      priceEl.textContent = ''; priceEl.className = 'pm-price-tag';
      const s1 = document.createElement('span'); s1.style.cssText = 'text-decoration:line-through;color:var(--muted);font-size:13px;font-weight:400;'; s1.textContent = fmtPrice(d.orig); priceEl.appendChild(s1);
      priceEl.appendChild(document.createTextNode(' '));
      const s2 = document.createElement('span'); s2.style.cssText = 'color:#ef4444;font-size:15px;font-weight:800;'; s2.textContent = 'Sin Stock'; priceEl.appendChild(s2);
    } else if (d.orig) {
      const pct = Math.round((1 - d.price / d.orig) * 100);
      priceEl.textContent = ''; priceEl.className = 'pm-price-tag';
      const s1 = document.createElement('span'); s1.style.cssText = 'text-decoration:line-through;color:var(--muted);font-size:13px;font-weight:400;margin-right:6px;'; s1.textContent = fmtPrice(d.orig); priceEl.appendChild(s1);
      priceEl.appendChild(document.createTextNode(fmtPrice(d.price)));
      const s2 = document.createElement('span'); s2.style.cssText = 'font-size:12px;color:#16a34a;font-weight:800;margin-left:8px;'; s2.textContent = '-' + pct + '%'; priceEl.appendChild(s2);
    } else {
      priceEl.textContent = fmtPrice(d.price);
      priceEl.className = 'pm-price-tag';
    }
  } else {
    priceEl.textContent = 'Precio a consultar';
    priceEl.className = 'pm-price-tag consultar';
  }
  // WA link
  document.getElementById('pm-wa').href = construirLinkWhatsapp('Hola, me interesa el ' + m.product + '. ¿Me pueden dar más información y el precio?');
  // Store link
  const storeBtn = document.getElementById('pm-store');
  const storeUrl = PRODUCT_URLS[productName];
  if (storeUrl && esUrlPermitida(storeUrl)) {
    storeBtn.href = storeUrl;
    storeBtn.classList.remove('hidden');
  } else {
    storeBtn.classList.add('hidden');
  }
  // Open
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProdModal() {
  document.getElementById('prod-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalOverlayClick(e) {
  if (e.target === document.getElementById('prod-modal')) closeProdModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProdModal();
});

// ── PRICE BADGES — populate from PRICE_DATA ──
function initPriceBadges() {
  document.querySelectorAll('.prod-card[data-product]').forEach(card => {
    const name = card.dataset.product;
    if (!name) return;
    const d = PRICE_DATA[name];
    const imgCol = card.querySelector('.prod-card-img');
    const badge = card.querySelector('.prod-price-badge');
    const footerPrice = card.querySelector('.prod-price');

    if (badge) {
      if (!d) {
        badge.textContent = 'Consultar precio';
        badge.classList.add('consultar');
      } else if (d.soldOut) {
        badge.textContent = 'Sin Stock';
        badge.classList.add('sin-stock');
        badge.classList.remove('consultar');
        // Overlay on image
        if (imgCol && !imgCol.querySelector('.prod-stock-overlay')) {
          const ov = document.createElement('div');
          ov.className = 'prod-stock-overlay';
          const ovSpan = document.createElement('span'); ovSpan.textContent = 'Sin Stock'; ov.appendChild(ovSpan);
          imgCol.appendChild(ov);
        }
      } else {
        badge.textContent = fmtPrice(d.price);
        badge.classList.remove('consultar');
      }
    }

    // Sale badge upper-right
    if (d && d.orig && !d.soldOut && imgCol) {
      const pct = Math.round((1 - d.price / d.orig) * 100);
      if (pct > 0) {
        let sb = imgCol.querySelector('.prod-sale-badge');
        if (!sb) {
          sb = document.createElement('span');
          sb.className = 'prod-sale-badge';
          imgCol.appendChild(sb);
        }
        sb.textContent = `-${pct}% OFF`;
      }
    }

    // Footer price
    if (footerPrice && d) {
      if (d.soldOut) {
        footerPrice.textContent = ''; const fpSpan = document.createElement('span'); fpSpan.style.color = '#ef4444'; fpSpan.style.fontWeight = '800'; fpSpan.textContent = 'Sin Stock'; footerPrice.appendChild(fpSpan);
      } else {
        footerPrice.textContent = fmtPrice(d.price);
      }
    }
  });
}
initPriceBadges();

// ── EVENT BINDINGS (reemplazos de inline onclick) ──
document.getElementById('js-hero-scroll-btn')?.addEventListener('click', () => {
  document.getElementById('productos').scrollIntoView({ behavior:'smooth' });
});

// Prod-cards: abrir modal al hacer clic (delegado)
document.querySelectorAll('.prod-grid .prod-card[data-product]').forEach(card => {
  card.addEventListener('click', e => {
    if (!e.target.closest('.prod-btn')) openProdModal(card.dataset.product);
  });
});
// Botón "Ver producto" de Alavida (button con data-product)
document.querySelectorAll('.prod-card button[data-product]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    openProdModal(btn.dataset.product);
  });
});
// Links .prod-btn dentro de cards: no propagar para no disparar el modal
document.querySelectorAll('.prod-card a.prod-btn').forEach(link => {
  link.addEventListener('click', e => e.stopPropagation());
});

// Modal de producto
document.getElementById('prod-modal').addEventListener('click', handleModalOverlayClick);
document.querySelector('.prod-modal-close').addEventListener('click', closeProdModal);

// WA form
document.getElementById('js-wa-form-btn')?.addEventListener('click', sendWaForm);

// onerror fix - testimonial images
document.querySelectorAll('.tk-av-img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const next = this.nextElementSibling;
    if (next) next.style.display = 'flex';
  });
});
