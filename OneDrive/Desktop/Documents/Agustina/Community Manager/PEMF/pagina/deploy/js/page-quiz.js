// WA_NUMERO y construirLinkWhatsapp vienen de js/wa-utils.js

// ── COLORES DE FONDO POR OBJETIVO ──
const GOAL_BG = {
  energia:    '#fffbeb',
  sueno:      '#f5f3ff',
  foco:       '#f0f9ff',
  rendimiento:'#ecfdf5',
  dolor:      '#fff1f2',
  longevidad: '#f0fdfa',
};

// ── DATOS DE PRODUCTOS PARA RESULTADOS ──
const PRODS = {
  'x39':         {name:'X39',            brand:'LifeWave',  brandBg:'#ede9fe',brandC:'#6d28d9', img:'img/productos/lifewave/x39.png',         bg:'linear-gradient(135deg,#3b0764,#6d28d9)', price:'$235.000', note:'caja 30 parches', store:'https://pemf-buenos-aires.tiendup.com/p/lifewave-x39-activa-tus-celulas-madres-con-fototerapia-30-parches'},
  'x49':         {name:'X49',            brand:'LifeWave',  brandBg:'#ede9fe',brandC:'#6d28d9', img:'img/productos/lifewave/x49.png',         bg:'linear-gradient(135deg,#1e1b4b,#3730a3)', price:'$220.000', note:'caja 30 parches', store:'https://pemf-buenos-aires.tiendup.com/p/lifewave-x49'},
  'icewave':     {name:'IceWave',        brand:'LifeWave',  brandBg:'#ccfbf1',brandC:'#0f766e', img:'img/productos/lifewave/icewave.png',      bg:'linear-gradient(135deg,#134e4a,#0f766e)', price:'$165.000', note:'caja 30 parches', store:'https://pemf-buenos-aires.tiendup.com/p/icewave-alivio-natural-e-inmediato-del-dolor'},
  'silent-night':{name:'Silent Nights',  brand:'LifeWave',  brandBg:'#e0e7ff',brandC:'#4338ca', img:'img/productos/lifewave/silent-night.png', bg:'linear-gradient(135deg,#1e1b4b,#312e81)', price:'$150.000', note:'caja 30 parches', store:'https://pemf-buenos-aires.tiendup.com/p/silent-nights-sueno-natural-reparador-y-profundo'},
  'aeon':        {name:'Aeon',           brand:'LifeWave',  brandBg:'#f5f5f4',brandC:'#44403c', img:'img/productos/lifewave/aeon.png',         bg:'linear-gradient(135deg,#1c1917,#44403c)', price:'$150.000', note:'caja 30 parches', store:'https://pemf-buenos-aires.tiendup.com/p/aeon-regulacion-del-estres-y-bienestar-emocional-natural'},
  'glutathione': {name:'Glutathione',    brand:'LifeWave',  brandBg:'#d1fae5',brandC:'#15803d', img:'img/productos/lifewave/glutathione.png',  bg:'linear-gradient(135deg,#14532d,#15803d)', price:'$150.000', note:'caja 30 parches', store:'https://pemf-buenos-aires.tiendup.com/p/glutathione-detoxificacion-profunda-y-refuerzo-del-sistema-inmunologico'},
  'ee':          {name:'Energy Enhancer',brand:'LifeWave',  brandBg:'#fef3c7',brandC:'#b45309', img:'img/productos/lifewave/ee.png',           bg:'linear-gradient(135deg,#713f12,#a16207)', price:'$150.000', note:'caja 30 parches', store:'https://pemf-buenos-aires.tiendup.com/p/energy-enhancer-energia-natural-y-vitalidad-sostenida'},
  'neuro-focus': {name:'Energy & Focus', brand:'Neuro Gum', brandBg:'#d1fae5',brandC:'#047857', img:'img/productos/neuro/spearmint.png',       bg:'linear-gradient(135deg,#064e3b,#065f46)', price:'$18.000',  note:'9 chicles', store:'https://pemf-buenos-aires.tiendup.com/p/neuro-gum-revoluciona-tu-rendimiento-mental-or-la-nueva-era-del-enfoque'},
  'neuro-sleep': {name:'Sleep & Recharge',brand:'Neuro Gum',brandBg:'#e0e7ff',brandC:'#4338ca', img:'img/productos/neuro/sleep-recharge.png', bg:'linear-gradient(135deg,#1e3a5f,#1e40af)', price:'$18.000',  note:'12 mints', store:'https://pemf-buenos-aires.tiendup.com/p/sleep-and-recharge-tm-meltaway-mints-sueno-reparador-y-despertar-refrescado-or-1-mg-1-blister-12-mentas'},
  'calm-clarity':{name:'Calm & Clarity', brand:'Neuro Gum', brandBg:'#ede9fe',brandC:'#6d28d9', img:'img/productos/neuro/calma-claridad.png', bg:'linear-gradient(135deg,#4c1d95,#6d28d9)', price:'$18.000',  note:'12 mints', store:''},
  'ess60-prod':  {name:'ESS60',          brand:'MyVital C', brandBg:'#fef3c7',brandC:'#b45309', img:'img/productos/ess60.png',                 bg:'linear-gradient(135deg,#78350f,#b45309)', price:'$187.200', note:'100ml', store:'https://pemf-buenos-aires.tiendup.com/p/ess60-en-aceite-de-oliva-antioxidante-revolucionario-or-longevidad-y-energia'},
  'h2-tablets':  {name:'H2 Tablets',     brand:'Drink HRW', brandBg:'#e0f2fe',brandC:'#0369a1', img:'img/productos/h2-tablets.png',           bg:'linear-gradient(135deg,#0c4a6e,#0369a1)', price:'$170.000', note:'por frasco', store:'https://pemf-buenos-aires.tiendup.com/p/h2-tablets-la-nueva-frontera-en-bienestar-molecular'},
  'analemma':    {name:'Analemma Wand',  brand:'Analemma',  brandBg:'#e0f2fe',brandC:'#1b6ca8', img:'img/productos/analemma.png',             bg:'linear-gradient(135deg,#0f4c75,#1b6ca8)', price:'$352.800', note:'con funda de cuero', store:'https://pemf-buenos-aires.tiendup.com/p/analemma-water-wand-agua-coherente-y-estructurada-or-vitalidad-celular-y-rejuvenecimiento-natural'},
  'gamma-light': {name:'Gamma Light 40Hz',brand:'Gamma Light',brandBg:'#f3e8ff',brandC:'#7c3aed',img:'img/productos/gamma-light.png',         bg:'linear-gradient(135deg,#1a1a2e,#16213e)', price:'$200.000', note:'bulbo + adaptador', store:'https://pemf-buenos-aires.tiendup.com/p/gamma-clarity-40-hz-light-bulb-entrainamiento-gamma-para-el-cerebro-or-memoria-enfoque-y-desintoxicacion-neurologica'},
};

// ── TEXTO "POR QUÉ" POR COMBO OBJETIVO + PRODUCTO ──
const WHY = {
  'x39_energia':      'El X39 activa tus células madre propias, disparando la producción natural de energía desde la base celular. Resultados en la primera semana.',
  'x39_sueno':        'Además de regeneración celular, el X39 normaliza el ciclo de sueño y activa la reparación nocturna profunda sin ninguna sustancia.',
  'x39_foco':         'La regeneración celular que activa el X39 incluye el cerebro: más claridad, menos niebla mental, mejor respuesta cognitiva.',
  'x39_rendimiento':  'Más energía, recuperación acelerada y fuerza aumentada. El X39 es el favorito de atletas que no pueden usar sustancias.',
  'x39_dolor':        'El X39 reduce inflamación y activa la regeneración en tejidos dañados, atacando el dolor desde la causa celular.',
  'x39_longevidad':   'El parche más estudiado para longevidad: activa GHK-Cu, el péptido clave de la regeneración y el anti-aging.',
  'ee_energia':       'Activa los sistemas naturales de producción de energía sin cafeína ni estimulantes. Vitalidad sostenida todo el día, sin picos ni caídas.',
  'ee_rendimiento':   'Energía natural que potencia el entrenamiento sin ingredientes prohibidos. Más resistencia, más rendimiento.',
  'x49_rendimiento':  'Diseñado para atletas: aumenta fuerza, resistencia y masa muscular con el péptido AHK. Sin sustancias prohibidas.',
  'x49_energia':      'El X49 optimiza el metabolismo energético muscular y cardiovascular. Sentís la diferencia en la primera semana.',
  'silent-night_sueno':   'El único parche de sueño sin melatonina ni fármacos. Regula tu ritmo circadiano natural. Sin dependencia, sin resaca.',
  'aeon_foco':        'El Aeon reduce el ruido del estrés y libera claridad mental. Menos cortisol, más concentración. Sin somnolencia.',
  'aeon_sueno':       'Al regular el sistema nervioso autónomo, el Aeon mejora la calidad del sueño atacando el estrés que te mantiene despierto.',
  'icewave_dolor':    'El único parche diseñado específicamente para el dolor. Bloquea la señal nerviosa con tecnología dual desde el primer uso.',
  'glutathione_longevidad': 'Eleva el antioxidante maestro del cuerpo hasta un 300% en 24h. Detox profundo, inmunidad reforzada y protección celular.',
  'neuro-focus_foco': 'Cafeína + L-teanina + vitaminas B en formato masticable. +21% de velocidad cognitiva. Foco sin nerviosismo, sin crash.',
  'neuro-focus_rendimiento': 'Energía mental y física para entrenar y rendir al máximo. Sin sustancias prohibidas, con tecnología cold-compression.',
  'neuro-focus_energia': 'Energía limpia y sostenida durante horas. La L-teanina previene la tolerancia y el crash típico del café solo.',
  'neuro-sleep_sueno': 'Melatonina + elderberry + pasiflora en mints de disolución instantánea. Sueño profundo sin resaca, sin agua.',
  'calm-clarity_foco': 'GABA + L-teanina: calma mental profunda sin sedación. Para momentos de alta exigencia que requieren mente clara.',
  'calm-clarity_sueno': 'Reduce la activación mental que impide dormir. Calma sin somnolencia, ideal antes de acostarte.',
  'ess60-prod_longevidad': 'C60 purificado en aceite de oliva orgánico: el antioxidante más potente estudiado. Energía mitocondrial y longevidad celular.',
  'ess60-prod_energia':    'ESS60 mejora la función mitocondrial, la fuente real de tu energía celular. Claridad mental y vitalidad sostenida.',
  'h2-tablets_rendimiento': 'El hidrógeno molecular mejora VO2 max, reduce el daño oxidativo del ejercicio y acelera la recuperación. +140 ensayos clínicos.',
  'h2-tablets_longevidad': 'Regulador maestro del metabolismo celular. Neutraliza radicales libres dañinos y optimiza 18 de 20 marcadores metabólicos.',
  'h2-tablets_dolor':      'El H2 actúa como antiinflamatorio selectivo a nivel celular, reduciendo el daño oxidativo que genera y mantiene la inflamación crónica.',
  'gamma-light_foco':      'Luz gamma 40Hz del MIT que activa el cerebro a la frecuencia de máxima cognición. Memoria, concentración y neuroprotección.',
  'gamma-light_longevidad':'Estimulación cerebral que activa los mecanismos de limpieza neuronal. El protocolo más innovador para salud cerebral a largo plazo.',
  'gamma-light_tecnologia': 'La tecnología más avanzada para el cerebro: luz gamma 40Hz desarrollada en el MIT. No invasiva, segura, con protocolo validado.',
  'analemma_longevidad':   'Agua estructurada de alta coherencia que mejora la hidratación celular, el microbioma y la energía biológica disponible.',
};

// ── MATRIZ DE RECOMENDACIONES [objetivo + tipo → [prod1, prod2]] ──
const RECS = {
  'energia_sin-sustancias':    ['x39',          'ee'],
  'energia_natural':           ['ess60-prod',   'h2-tablets'],
  'energia_tecnologia':        ['gamma-light',  'h2-tablets'],
  'energia_cualquiera':        ['x39',          'neuro-focus'],

  'sueno_sin-sustancias':      ['silent-night', 'aeon'],
  'sueno_natural':             ['neuro-sleep',  'calm-clarity'],
  'sueno_tecnologia':          ['silent-night', 'gamma-light'],
  'sueno_cualquiera':          ['silent-night', 'neuro-sleep'],

  'foco_sin-sustancias':       ['aeon',         'x39'],
  'foco_natural':              ['neuro-focus',  'calm-clarity'],
  'foco_tecnologia':           ['gamma-light',  'neuro-focus'],
  'foco_cualquiera':           ['neuro-focus',  'gamma-light'],

  'rendimiento_sin-sustancias':['x49',          'ee'],
  'rendimiento_natural':       ['h2-tablets',   'neuro-focus'],
  'rendimiento_tecnologia':    ['gamma-light',  'h2-tablets'],
  'rendimiento_cualquiera':    ['x49',          'h2-tablets'],

  'dolor_sin-sustancias':      ['icewave',      'x39'],
  'dolor_natural':             ['h2-tablets',   'icewave'],
  'dolor_tecnologia':          ['icewave',      'gamma-light'],
  'dolor_cualquiera':          ['icewave',      'x39'],

  'longevidad_sin-sustancias': ['x39',          'glutathione'],
  'longevidad_natural':        ['ess60-prod',   'h2-tablets'],
  'longevidad_tecnologia':     ['gamma-light',  'analemma'],
  'longevidad_cualquiera':     ['x39',          'ess60-prod'],
};

const GOAL_LABELS = {
  energia:'energía y vitalidad', sueno:'mejorar tu sueño', foco:'foco mental',
  rendimiento:'rendimiento deportivo', dolor:'alivio del dolor', longevidad:'longevidad y anti-aging'
};

// ── STATE ──
let selectedGoal = null;
let selectedType = null;

function selectGoal(card){
  document.querySelectorAll('#step1 .opt-card').forEach(c=>c.classList.remove('selected'));
  card.classList.add('selected');
  selectedGoal = card.dataset.goal;
  document.getElementById('quizShell').style.background = GOAL_BG[selectedGoal] || '#faf8f4';
  setTimeout(()=>{
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    document.getElementById('dot1').classList.remove('active');
    document.getElementById('dot1').classList.add('done');
    document.getElementById('dot2').classList.add('active');
    document.getElementById('progressLabel').textContent = 'Paso 2 de 2';
  }, 380);
}
document.querySelectorAll('#step1 .opt-card').forEach(card => {
  card.addEventListener('click', () => selectGoal(card));
});

function selectType(card){
  document.querySelectorAll('#step2 .opt-card').forEach(c=>c.classList.remove('selected'));
  card.classList.add('selected');
  selectedType = card.dataset.type;
  setTimeout(()=>showResult(), 380);
}
document.querySelectorAll('#step2 .opt-card').forEach(card => {
  card.addEventListener('click', () => selectType(card));
});
document.getElementById('js-restart-btn').addEventListener('click', restart);

function showResult(){
  const key = selectedGoal + '_' + selectedType;
  const ids = RECS[key] || ['x39', 'neuro-focus'];

  document.getElementById('step2').classList.remove('active');
  document.getElementById('dot2').classList.remove('active');
  document.getElementById('dot2').classList.add('done');
  document.getElementById('progressLabel').textContent = 'Tu resultado';

  const resultEl = document.getElementById('stepResult');
  resultEl.style.display = 'block';
  setTimeout(()=>resultEl.classList.add('active'), 10);

  // GOAL_LABELS son strings fijos del código (no input de usuario) → innerHTML seguro
  document.getElementById('resultTitle').innerHTML =
    'Tu <em>match</em> para ' + (GOAL_LABELS[selectedGoal] || 'tu objetivo');

  const container = document.getElementById('resultCards');
  container.className = 'result-cards' + (ids.length===1?' single':'');

  container.textContent = '';
  ids.forEach((id, i) => {
    const p = PRODS[id];
    if (!p) return;
    const isPrimary = i === 0;
    const whyKey = id + '_' + selectedGoal;
    const whyText = WHY[whyKey] || WHY[id + '_longevidad'] || 'Una de las soluciones más efectivas para tu objetivo según nuestros clientes.';
    const waMsg = 'Hola! El quiz me recomendó el ' + p.name + ' para mi objetivo de ' + (GOAL_LABELS[selectedGoal] || 'bienestar') + '. ¿Podés darme más información?';
    const buyHref = (p.store && esUrlPermitida(p.store)) ? p.store : construirLinkWhatsapp(waMsg);
    const buyLabel = p.store ? 'Comprar ahora' : 'Consultar precio';

    const card = document.createElement('div');
    card.className = 'res-card' + (isPrimary ? ' primary' : '');

    const imgArea = document.createElement('div');
    imgArea.className = 'res-img-area';
    imgArea.style.background = p.bg;
    const badge = document.createElement('div');
    badge.className = 'res-primary-badge';
    if (isPrimary) {
      badge.textContent = '⭐ Recomendación principal';
    } else {
      badge.style.cssText = 'background:rgba(255,255,255,.7);color:#475569;';
      badge.textContent = 'También te puede interesar';
    }
    imgArea.appendChild(badge);
    const img = document.createElement('img');
    img.src = p.img; img.alt = p.name;
    imgArea.appendChild(img);
    card.appendChild(imgArea);

    const body = document.createElement('div');
    body.className = 'res-body';

    const brandEl = document.createElement('div');
    brandEl.className = 'res-brand';
    brandEl.style.background = p.brandBg; brandEl.style.color = p.brandC;
    brandEl.textContent = p.brand;
    body.appendChild(brandEl);

    const nameEl = document.createElement('div');
    nameEl.className = 'res-name'; nameEl.textContent = p.name;
    body.appendChild(nameEl);

    const whyEl = document.createElement('div');
    whyEl.className = 'res-why'; whyEl.textContent = whyText;
    body.appendChild(whyEl);

    const priceEl = document.createElement('div');
    priceEl.className = 'res-price';
    priceEl.textContent = p.price + ' ';
    const noteSpan = document.createElement('span'); noteSpan.textContent = p.note;
    priceEl.appendChild(noteSpan);
    body.appendChild(priceEl);

    const btns = document.createElement('div'); btns.className = 'res-btns';
    const buyLink = document.createElement('a');
    buyLink.href = buyHref; buyLink.className = 'res-btn-buy';
    buyLink.target = '_blank'; buyLink.rel = 'noopener'; buyLink.textContent = buyLabel;
    btns.appendChild(buyLink);

    const waLink = document.createElement('a');
    waLink.href = construirLinkWhatsapp(waMsg); waLink.className = 'res-btn-wa';
    waLink.target = '_blank'; waLink.rel = 'noopener';
    // El SVG del ícono WA es estático — se inserta una sola vez con innerHTML
    waLink.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M11.999 2C6.477 2 2 6.478 2 12.001c0 1.77.461 3.435 1.27 4.886L2 22l5.273-1.225A9.957 9.957 0 0011.999 22c5.523 0 10-4.478 10-10.001C21.999 6.478 17.522 2 11.999 2z"/></svg>';
    waLink.appendChild(document.createTextNode(' Consultar por WhatsApp'));
    btns.appendChild(waLink);

    const catLink = document.createElement('a');
    catLink.href = 'catalogo.html'; catLink.className = 'res-btn-cat';
    catLink.textContent = 'Ver en catálogo completo';
    btns.appendChild(catLink);

    body.appendChild(btns);
    card.appendChild(body);
    container.appendChild(card);
  });

  // scroll suave al resultado
  setTimeout(()=>resultEl.scrollIntoView({behavior:'smooth', block:'start'}), 100);
}

function restart(){
  selectedGoal = null;
  selectedType = null;
  document.getElementById('quizShell').style.background = '#faf8f4';
  document.querySelectorAll('.opt-card').forEach(c=>c.classList.remove('selected'));
  document.getElementById('stepResult').style.display = 'none';
  document.getElementById('stepResult').classList.remove('active');
  document.getElementById('step2').classList.remove('active');
  document.getElementById('step1').classList.add('active');
  document.getElementById('dot1').className = 'progress-dot active';
  document.getElementById('dot2').className = 'progress-dot';
  document.getElementById('progressLabel').textContent = 'Paso 1 de 2';
  window.scrollTo({top:0, behavior:'smooth'});
}

