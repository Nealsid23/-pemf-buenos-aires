/* ══ BRAND / TYPE CONFIG ══════════════════════════════ */
const B={
  lifewave:{l:'LifeWave',      c:'#7c3aed',lg:'linear-gradient(135deg,#7c3aed,#a78bfa)',bg:'#f5f3ff',tc:'#5b21b6'},
  drinkhrw:{l:'DrinkHRW · H₂', c:'#0369a1',lg:'linear-gradient(135deg,#0369a1,#38bdf8)',bg:'#f0f9ff',tc:'#0c4a6e'},
  gamma:   {l:'Gamma 40Hz',    c:'#4338ca',lg:'linear-gradient(135deg,#4338ca,#818cf8)',bg:'#eef2ff',tc:'#312e81'},
  neurogum:{l:'Neuro Gum',     c:'#059669',lg:'linear-gradient(135deg,#059669,#34d399)',bg:'#ecfdf5',tc:'#064e3b'},
  myvitalc:{l:'MyVital C',     c:'#b45309',lg:'linear-gradient(135deg,#b45309,#fbbf24)',bg:'#fffbeb',tc:'#78350f'},
  analemma:{l:'Analemma',      c:'#0e7490',lg:'linear-gradient(135deg,#0e7490,#22d3ee)',bg:'#ecfeff',tc:'#164e63'},
  all:     {l:'Ciencia de base',c:'#475569',lg:'linear-gradient(135deg,#475569,#94a3b8)',bg:'#f1f5f9',tc:'#334155'},
};
const T={
  rct:         {l:'RCT',           sc:'RCT',         ev:4,el:'Alta',       tc:'#166534',bg:'#dcfce7'},
  piloto:      {l:'Piloto',        sc:'Piloto',       ev:2,el:'Preliminar', tc:'#92400e',bg:'#fef3c7'},
  revision:    {l:'Revisión',      sc:'Revisión',     ev:3,el:'Moderada',   tc:'#1e40af',bg:'#dbeafe'},
  meta:        {l:'Meta-análisis', sc:'Meta',         ev:5,el:'Muy alta',   tc:'#6b21a8',bg:'#f3e8ff'},
  animal:      {l:'Preclínico',    sc:'Animal',       ev:1,el:'Preclínica', tc:'#9a3412',bg:'#ffedd5'},
  vitro:       {l:'In vitro',      sc:'In vitro',     ev:1,el:'Explorat.',  tc:'#9d174d',bg:'#fce7f3'},
  factibilidad:{l:'Factibilidad',  sc:'Factibilidad', ev:2,el:'Preliminar', tc:'#164e63',bg:'#cffafe'},
  seguridad:   {l:'Seguridad',     sc:'Seguridad',    ev:2,el:'Preliminar', tc:'#374151',bg:'#f3f4f6'},
};

/* ══ TEMAS (papers / evidencia) ═══════════════════════ */
const TemasPapers={
  'campos-em':    {l:'Campos EM y PEMF',          c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af'},
  'agua-h2':      {l:'Agua e hidrógeno',           c:'#0369a1',bg:'#f0f9ff',tc:'#0c4a6e'},
  'mitocondria':  {l:'Mitocondria y energía',      c:'#b45309',bg:'#fffbeb',tc:'#78350f'},
  'luz':          {l:'Luz y fotobiomodulación',    c:'#d97706',bg:'#fff7ed',tc:'#9a3412'},
  'quantum':      {l:'Biología cuántica',          c:'#059669',bg:'#ecfdf5',tc:'#064e3b'},
  'fascia':       {l:'Fascia y tejido conectivo',  c:'#0d9488',bg:'#f0fdfa',tc:'#115e59'},
  'biocampo':     {l:'Biocampo y consciencia',     c:'#7c3aed',bg:'#f5f3ff',tc:'#5b21b6'},
  'longevidad':   {l:'Longevidad y epigenética',   c:'#9333ea',bg:'#faf5ff',tc:'#6b21a8'},
  'neuro':        {l:'Neurociencia y cognición',   c:'#4338ca',bg:'#eef2ff',tc:'#312e81'},
  'sueno':        {l:'Sueño y sistema nervioso',   c:'#0891b2',bg:'#ecfeff',tc:'#155e75'},
  'dolor':        {l:'Dolor y regeneración',       c:'#dc2626',bg:'#fef2f2',tc:'#991b1b'},
  'antioxidantes':{l:'Antioxidantes y estrés ox.', c:'#65a30d',bg:'#f7fee7',tc:'#3f6212'},
  'microbioma':   {l:'Microbioma y metabolismo',   c:'#ea580c',bg:'#fff7ed',tc:'#9a3412'},
};

/* ══ RIGOR (nivel de evidencia) + FINANCIAMIENTO (modo pro) ══ */
const RigorCfg={
  alta:      {l:'Alta evidencia',         c:'#15803d'},
  moderada:  {l:'Evidencia moderada',     c:'#1e40af'},
  preliminar:{l:'Preliminar',             c:'#b45309'},
  preclinica:{l:'Preclínica/exploratoria',c:'#9d174d'},
};
function tierOf(s){ const e=(T[s.type]||{}).ev||1; return e>=4?'alta':e===3?'moderada':e===2?'preliminar':'preclinica'; }
function fundingFlag(s){
  const note=(s.note||'').toLowerCase();
  if(/fabricante|financiad/.test(note)) return {l:'Financiado por fabricante',c:'#92400e',bg:'#fef3c7'};
  if(/no publicad|preprint|sin revisi/.test(note)) return {l:'No revisado por pares',c:'#9a3412',bg:'#ffedd5'};
  return {l:'Independiente',c:'#15803d',bg:'#dcfce7'};
}

/* ══ TEMAS (biblioteca) ═══════════════════════════════ */
const Temas={
  bioelectricidad:{l:'Bioelectricidad',  c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af'},
  longevidad:     {l:'Longevidad',       c:'#7c3aed',bg:'#f5f3ff',tc:'#5b21b6'},
  agua:           {l:'Agua y estructura',c:'#0369a1',bg:'#f0f9ff',tc:'#0c4a6e'},
  neurociencia:   {l:'Neurociencia',     c:'#4338ca',bg:'#eef2ff',tc:'#312e81'},
  mitocondrias:   {l:'Mitocondrias',     c:'#b45309',bg:'#fffbeb',tc:'#78350f'},
  quantum:        {l:'Biología cuántica',c:'#059669',bg:'#ecfdf5',tc:'#064e3b'},
};

/* ══ GUÍAS CONFIG ══════════════════════════════════════ */
const CatGuias={
  luz:        {l:'Luz & Circadiano',    c:'#b45309',bg:'#fffbeb',tc:'#78350f'},
  agua:       {l:'Agua & Hidratación',  c:'#0369a1',bg:'#f0f9ff',tc:'#0c4a6e'},
  campo:      {l:'Campos EM',           c:'#7c3aed',bg:'#f5f3ff',tc:'#5b21b6'},
  nutricion:  {l:'Nutrición',           c:'#059669',bg:'#ecfdf5',tc:'#064e3b'},
  respiracion:{l:'Respiración',         c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af'},
};

/* ══ GUÍAS ════════════════════════════════════════════ */
const guias=[
  {id:'g-01',categoria:'luz',
   titulo:'Exposición Solar Inteligente',
   subtitulo:'Protocolo para optimizar vitamina D, mitocondrias y ritmo circadiano',
   descripcion:'La luz solar es el estímulo biológico más potente disponible sin costo. Esta guía cubre los protocolos de exposición para maximizar la síntesis de vitamina D, activar la fotobiomodulación natural y sincronizar el reloj circadiano — con los tiempos exactos según latitud y estación.',
   nivel:'intermedio',duracion:'14 min',estado:'disponible',
   tags:['Vitamina D','Circadiano','Fotobiomodulación','UV Index'],
   puntos:['Exposición ocular al amanecer sin lentes para disparar el cortisol matutino','15-20 min de piel expuesta al mediodía solar para síntesis de vitamina D','Por qué la hora solar importa más que la hora del reloj','Evitar luz azul artificial después del atardecer para no suprimir melatonina'],
  },
  {id:'g-02',categoria:'campo',
   titulo:'Reducción de nEMF en el Hogar',
   subtitulo:'Protocolo para minimizar campos electromagnéticos artificiales',
   descripcion:'Los campos EM no naturales (nEMF) del WiFi, celulares y electrodomésticos activan canales de calcio voltaje-dependientes (VGCC), generando estrés oxidativo crónico según el trabajo de Martin Pall. Este protocolo prioriza los cambios de mayor impacto con menor esfuerzo.',
   nivel:'basico',duracion:'10 min',estado:'disponible',
   tags:['nEMF','VGCC','WiFi','Dormitorio','Estrés oxidativo'],
   puntos:['Celular fuera del dormitorio o en modo avión al dormir','WiFi en timer: apagado automático de 23 a 7 hs','Distancia mínima de 1.5 m a routers activos','Priorizar ethernet sobre WiFi en escritorios fijos'],
  },
  {id:'g-03',categoria:'agua',
   titulo:'Hidratación Celular Real',
   subtitulo:'Por qué el agua que tomás puede no estar hidratando tus células',
   descripcion:'No toda el agua hidrata igual. La estructura molecular del agua determina con qué eficiencia penetra en las células. Esta guía cubre la calidad del agua, el timing de ingesta y cómo el H₂ molecular y el agua Analemma cambian la ecuación de la hidratación celular.',
   nivel:'intermedio',duracion:'12 min',estado:'disponible',
   tags:['EZ Water','H₂','Analemma','Hidratación celular','Pollack'],
   puntos:['EZ water: la cuarta fase del agua que ocurre dentro de tus células','Por qué el agua a temperatura ambiente hidrata mejor que la fría','H₂ molecular: el antioxidante más pequeño que existe, penetra mitocondrias','Timing: cuándo tomar agua para máxima absorción celular'],
  },
  {id:'g-04',categoria:'luz',
   titulo:'Ciclo Circadiano: Protocolo de 24 hs',
   subtitulo:'Optimizá tu reloj biológico de amanecer a amanecer',
   descripcion:'El reloj circadiano regula hormonas, metabolismo, sistema inmune y reparación celular. Un circadiano desincronizado es el factor común de la mayoría de las enfermedades crónicas modernas. Esta guía cubre luz, temperatura, alimentación y movimiento en un protocolo completo.',
   nivel:'avanzado',duracion:'20 min',estado:'disponible',
   tags:['Melatonina','Cortisol','Circadiano','Sueño','Cronobiología'],
   puntos:['Cortisol matutino: luz solar antes del café para no aplastarlo con adenosina','Feeding window alineado con el arco solar (10 hs desde desayuno)','Temperatura corporal como señal zeitgeber: ducha fría matutina','Protocolo nocturno: temperatura del cuarto, lentes ámbar y suplementos'],
  },
  {id:'g-05',categoria:'nutricion',
   titulo:'Suplementación con Criterio',
   subtitulo:'Lo que tiene evidencia real y sinergia con protocolos PEMF',
   descripcion:'El mercado de suplementos tiene mucho ruido. Esta guía filtra los que tienen evidencia sólida y sinergia directa con los protocolos PEMF: lo que potencia los efectos de parches LifeWave, optimiza el H₂ y apoya el sistema circadiano.',
   nivel:'intermedio',duracion:'16 min',estado:'proximamente',
   tags:['NAD+','Magnesio','Vitamina D3+K2','CoQ10','Astaxantina'],
   puntos:[],
  },
  {id:'g-06',categoria:'respiracion',
   titulo:'Respiración Nasal y CO₂',
   subtitulo:'Por qué la mayoría respira mal y cómo corregirlo',
   descripcion:'La respiración nasal activa el sistema parasimpático, produce óxido nítrico y optimiza el efecto Bohr — el mecanismo por el que el O₂ llega realmente a los tejidos. Principios de James Nestor aplicados a un protocolo diario de mínimo esfuerzo y máximo impacto.',
   nivel:'basico',duracion:'11 min',estado:'proximamente',
   tags:['CO₂','Efecto Bohr','Óxido nítrico','HRV','Nariz'],
   puntos:[],
  },
];


/* ══ STUDIES ══════════════════════════════════════════ */
const studies=[...(window.STUDIES_BASE||[])];

/* ══ STATE ════════════════════════════════════════════ */
let aBrand='all', aType='all', aTemaPaper='all', aRigor='all', q='';
let proMode=false;
let aGuiaCat='all', qGuia='';
let currentView='estudios';
let ioObserver;

function match(s, sq){
  if(!sq) return true;
  const temaLabels=(s.temas||[]).map(t=>TemasPapers[t]?TemasPapers[t].l:'').join(' ');
  return [s.title,s.titulo_es||'',s.cite,s.method,...s.results,B[s.brand].l,temaLabels]
    .some(x=>String(x).toLowerCase().includes(sq));
}
function getFiltered(){
  const sq=q.toLowerCase();
  return studies.filter(s=>{
    if(aBrand!=='all'&&s.brand!==aBrand)return false;
    if(aType!=='all'&&s.type!==aType)return false;
    if(aTemaPaper!=='all'&&!(Array.isArray(s.temas)&&s.temas.includes(aTemaPaper)))return false;
    if(aRigor!=='all'&&tierOf(s)!==aRigor)return false;
    return match(s,sq);
  });
}

/* ══ PILL COUNTS ══════════════════════════════════════ */
function updatePillCounts(){
  const sq=q.toLowerCase();
  // brand pills: count matching type+search for each brand
  const hasTema=s=>aTemaPaper==='all'||(Array.isArray(s.temas)&&s.temas.includes(aTemaPaper));
  document.querySelectorAll('[data-brand]:not([data-brand="all"])').forEach(btn=>{
    const key=btn.dataset.brand;
    const c=studies.filter(s=>{
      if(s.brand!==key)return false;
      if(aType!=='all'&&s.type!==aType)return false;
      if(!hasTema(s))return false;
      return match(s,sq);
    }).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc)}
    btn.style.opacity=(c===0&&aBrand!==key)?'.35':'1';
  });
  // type pills: count matching brand+tema+search for each type
  document.querySelectorAll('[data-type]:not([data-type="all"])').forEach(btn=>{
    const key=btn.dataset.type;
    const c=studies.filter(s=>{
      if(aBrand!=='all'&&s.brand!==aBrand)return false;
      if(s.type!==key)return false;
      if(!hasTema(s))return false;
      return match(s,sq);
    }).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc)}
    btn.style.opacity=(c===0&&aType!==key)?'.35':'1';
  });
  // tema pills: count matching brand+type+search for each tema
  document.querySelectorAll('#tema-papers-pills .pill:not([data-temapaper="all"])').forEach(btn=>{
    const key=btn.dataset.temapaper;
    const c=studies.filter(s=>{
      if(aBrand!=='all'&&s.brand!==aBrand)return false;
      if(aType!=='all'&&s.type!==aType)return false;
      if(!(Array.isArray(s.temas)&&s.temas.includes(key)))return false;
      return match(s,sq);
    }).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc)}
    btn.style.opacity=(c===0&&aTemaPaper!==key)?'.35':'1';
  });
  // "all" pills show current total
  const list=getFiltered();
  const abpc=document.querySelector('[data-brand="all"] .pc');
  if(abpc){abpc.textContent=list.length;animatePc(abpc)}
  const atpc=document.querySelector('[data-type="all"] .pc');
  if(atpc){atpc.textContent=list.length;animatePc(atpc)}
  const atmpc=document.querySelector('[data-temapaper="all"] .pc');
  if(atmpc){atmpc.textContent=list.length;animatePc(atmpc)}
}
function animatePc(el){
  el.style.transform='scale(1.4)';
  setTimeout(()=>el.style.transform='',200);
}

/* ══ RENDER ═══════════════════════════════════════════ */
const grid=document.getElementById('grid');
const countLine=document.getElementById('count-line');
const clearBtn=document.getElementById('clear-btn');

function attachCardClick(){
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click',e=>{
      if(e.target.closest('.pdf-btn'))return;
      e.stopPropagation();
      const s={
        id:card.dataset.paperId,
        titulo_es:card.dataset.paperTitle,
        cite:card.dataset.paperCite,
        portada:card.dataset.paperPortada,
        method:card.dataset.paperMethod,
        results:JSON.parse(card.dataset.paperResults.replace(/&quot;/g,'"')),
        n:card.dataset.paperN,
        dur:card.dataset.paperDur,
        loc:card.dataset.paperLoc,
        pdf:card.dataset.paperPdf,
        c:card.dataset.paperBrandColor,
        el:card.dataset.paperTypeLevel
      };
      openPaperModal(s,card);
    });
  });
}

function openPaperModal(s,card){
  const modal=document.getElementById('paper-modal');
  const overlay=document.getElementById('paper-overlay');
  const modalTitle=document.querySelector('.modal-title');
  const modalCite=document.querySelector('.modal-cite');
  const modalPortada=document.getElementById('m-paper-portada');
  const modalMethod=document.getElementById('m-paper-method');
  const modalResults=document.getElementById('m-paper-results');
  const modalChips=document.getElementById('m-paper-chips');
  const modalEvidence=document.getElementById('m-paper-evidence');
  const modalPdf=document.getElementById('m-paper-pdf');

  modalTitle.textContent=s.titulo_es;
  modalCite.textContent=s.cite;

  if(s.portada){
    modalPortada.style.display='block';
    modalPortada.innerHTML=`<img src="${s.portada}" alt="${s.titulo_es}" class="paper-portada-img" style="max-width:100%;max-height:500px;object-fit:contain;border-radius:10px;cursor:zoom-in;transition:transform .2s;display:block;margin:0 auto">`;
    const img=modalPortada.querySelector('img');
    img.addEventListener('click',()=>showPortadaZoom(s.portada,s.titulo_es));
    img.addEventListener('mouseenter',()=>img.style.transform='scale(1.02)');
    img.addEventListener('mouseleave',()=>img.style.transform='');
  }else{
    modalPortada.style.display='none';
  }

  modalMethod.innerHTML=s.method?`<strong>Método:</strong> ${s.method}`:'';
  modalResults.innerHTML=`<strong>Resultados:</strong><ul style="margin:10px 0;padding-left:20px;list-style:none">${(s.results||[]).map(r=>`<li style="margin:8px 0;padding-left:20px;position:relative"><span style="position:absolute;left:0;color:${s.c};font-weight:700">→</span>${r}</li>`).join('')}</ul>`;

  modalChips.innerHTML=`<strong>Datos:</strong> <span class="meta-chip">${s.n}</span> ${s.dur&&s.dur!=='—'?`<span class="meta-chip">${s.dur}</span>`:''}  <span class="meta-chip">${s.loc}</span>`;

  const segs=[1,2,3,4,5].map((i,idx)=>idx<parseInt(Object.entries(T).find(([k,v])=>v.el===s.el)?.[1]?.ev||1)?`<span class="ev-seg on" style="background:${s.c}"></span>`:`<span class="ev-seg"></span>`).join('');
  modalEvidence.innerHTML=`<strong>Evidencia:</strong> <div style="display:flex;gap:3px;align-items:center">${segs} <span style="font-size:12px;color:var(--mist)">${s.el}</span></div>`;

  modalPdf.href=s.pdf;

  overlay.classList.add('open');

  if(card){
    const rect=card.getBoundingClientRect();
    modal.style.transformOrigin=`${rect.left+rect.width/2}px ${rect.top+rect.height/2}px`;
    modal.style.animation='none';
    setTimeout(()=>{
      modal.style.animation='modalEnter .4s var(--spring) forwards';
    },10);
  }
}

function showPortadaZoom(src,alt){
  const zoom=document.createElement('div');
  zoom.style.cssText=`
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;
    cursor:zoom-out;padding:20px;
  `;
  const img=document.createElement('img');
  img.src=src;
  img.alt=alt;
  img.style.cssText=`
    max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px;
    box-shadow:0 0 60px rgba(0,0,0,.8);
  `;
  zoom.appendChild(img);
  document.body.appendChild(zoom);
  zoom.addEventListener('click',()=>zoom.remove());
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape')zoom.remove();},{once:true});
}

document.getElementById('paper-modal-close').addEventListener('click',()=>{
  document.getElementById('paper-overlay').classList.remove('open');
});

document.getElementById('paper-overlay').addEventListener('click',e=>{
  if(e.target.id==='paper-overlay'){
    document.getElementById('paper-overlay').classList.remove('open');
  }
});

function setupObserver(){
  if(ioObserver)ioObserver.disconnect();
  ioObserver=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        const card=e.target;
        setTimeout(()=>{
          card.classList.add('visible');
          setTimeout(()=>attachTilt(card),680);
        },i*40);
        ioObserver.unobserve(card);
      }
    });
  },{threshold:.06,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.card:not(.visible)').forEach(c=>ioObserver.observe(c));
}

function render(animate=true){
  if(currentView==='guias'){renderGuias();return;}
  const list=getFiltered();
  if(proMode) list.sort((a,b)=>((T[b.type]||{}).ev||0)-((T[a.type]||{}).ev||0));
  updatePillCounts();
  clearBtn.classList.toggle('visible',(aBrand!=='all'||aType!=='all'||aTemaPaper!=='all'||aRigor!=='all'||q.length>0));
  countLine.textContent='';
  const _cn1=document.createElement('strong');
  _cn1.textContent=list.length===studies.length?studies.length:list.length;
  countLine.appendChild(_cn1);
  countLine.appendChild(document.createTextNode(list.length===studies.length?' publicaciones':' de '+studies.length+' publicaciones'));

  if(!list.length){
    grid.style.opacity='1';grid.style.transform='none';
    grid.innerHTML=`<div class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      <h3>Sin resultados</h3>
      <p>Probá con otro producto o cambiá el tipo de estudio.</p>
    </div>`;
    return;
  }

  const doInsert=()=>{
    grid.innerHTML=list.map(s=>{
      const b=B[s.brand],t=T[s.type]||T.piloto;
      const hook=s.results[0].length>110?s.results[0].slice(0,110)+'…':s.results[0];
      const segs=[1,2,3,4,5].map(i=>
        `<span class="ev-seg${i<=t.ev?' on':''}"`+(i<=t.ev?` style="background:${b.c}"`:'')+'></span>'
      ).join('');
      return `<div class="card" data-bc="${b.c}" data-paper-id="${s.id}" data-paper-title="${(s.titulo_es || s.title).replace(/"/g,'&quot;')}" data-paper-cite="${s.cite.replace(/"/g,'&quot;')}" data-paper-portada="${s.portada || ''}" data-paper-method="${(s.method || '').replace(/"/g,'&quot;')}" data-paper-results="${JSON.stringify(s.results || []).replace(/"/g,'&quot;')}" data-paper-n="${s.n}" data-paper-dur="${s.dur}" data-paper-loc="${s.loc}" data-paper-pdf="${s.pdf}" data-paper-promode="${proMode}" data-paper-funding='${proMode?JSON.stringify(fundingFlag(s)):''}'data-paper-brand-color="${b.c}" data-paper-type-level="${t.el}">
  <div class="card-top" style="background:${b.lg}"></div>
  <div class="card-head" style="background:${b.bg}">
    <span class="brand-tag" style="color:${b.c};background:${b.c}1c">
      <span class="brand-dot" style="background:${b.c}"></span>${b.l}
    </span>
    <span class="type-badge" style="color:${t.tc};background:${t.bg}">${t.sc}</span>
  </div>
  ${s.portada
    ? `<div class="paper-portada"><img src="${s.portada}" alt="${s.title}" loading="lazy"><div class="paper-portada-bar">Primera página</div></div>`
    : `<div class="card-hook" style="background:${b.bg}"><div class="hook-kf" style="color:${b.c}">Hallazgo clave</div><p class="hook-text" style="color:${b.tc}">${hook}</p></div>`
  }
  <div class="card-info">
    <h3 class="card-title">${s.titulo_es || s.title}</h3>
    <p class="card-cite">${s.cite}</p>
    ${s.method?`<p class="card-method">${s.method}</p>`:''}
    <div class="meta-chips">
      ${proMode?`<span class="fund-chip" style="color:${fundingFlag(s).c};background:${fundingFlag(s).bg}">${fundingFlag(s).l}</span>`:''}
      <span class="meta-chip">${s.n}</span>
      ${s.dur&&s.dur!=='—'?`<span class="meta-chip">${s.dur}</span>`:''}
      <span class="meta-chip">${s.loc}</span>
    </div>
  </div>
  <div class="card-foot">
    <div class="ev-row">
      <div class="ev-bar">${segs}</div>
      <span class="ev-lbl">Evidencia ${t.el}</span>
    </div>
    <a href="${s.pdf}" target="_blank" class="pdf-btn" style="color:${b.c};border-color:${b.c}55">PDF ↓</a>
  </div>
</div>`;
    }).join('');
    attachCardClick();
    setupObserver();
  };

  if(animate&&grid.children.length){
    grid.style.transition='opacity .18s ease,transform .18s ease';
    grid.style.opacity='0';grid.style.transform='translateY(6px)';
    setTimeout(()=>{
      doInsert();
      grid.style.transform='translateY(-4px)';
      requestAnimationFrame(()=>{
        grid.style.transition='opacity .28s var(--out),transform .32s var(--spring)';
        grid.style.opacity='1';grid.style.transform='none';
      });
    },190);
  } else {
    doInsert();
  }
}

/* ══ 3D CARD TILT ═════════════════════════════════════ */
function attachTilt(card){
  let rafId=null, on=false;
  const bc=card.dataset.bc||'#1a4fb6';

  card.addEventListener('mouseenter',()=>{
    on=true;
    card.style.transition='box-shadow .25s ease,border-color .25s ease';
    card.style.boxShadow=`var(--card-hover-shadow),0 0 0 2px ${bc}28`;
    card.style.setProperty('--card-ring',`linear-gradient(135deg,${bc}55,transparent,${bc}33)`);
  });
  card.addEventListener('mousemove',e=>{
    cancelAnimationFrame(rafId);
    rafId=requestAnimationFrame(()=>{
      if(!on)return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width;
      const y=(e.clientY-r.top)/r.height;
      card.style.transform=`perspective(1200px) rotateX(${(y-.5)*-4}deg) rotateY(${(x-.5)*4}deg) scale(1.012) translateZ(4px)`;
      card.style.setProperty('--sx',`${x*100}%`);
      card.style.setProperty('--sy',`${y*100}%`);
    });
  });
  card.addEventListener('mouseleave',()=>{
    on=false;
    cancelAnimationFrame(rafId);
    card.style.transition='transform .55s var(--spring),box-shadow .35s ease,border-color .25s ease';
    card.style.transform='';
    card.style.boxShadow='';
    setTimeout(()=>{if(!on)card.style.transition=''},580);
  });
}

/* ══ CLICK RIPPLE ════════════════════════════════════ */
document.addEventListener('click',e=>{
  const card=e.target.closest('.card');
  if(!card||e.target.closest('.pdf-btn'))return;
  const r=card.getBoundingClientRect();
  const rp=document.createElement('span');
  rp.className='ripple';
  rp.style.cssText=`left:${e.clientX-r.left}px;top:${e.clientY-r.top}px`;
  card.appendChild(rp);
  setTimeout(()=>rp.remove(),700);
},{passive:true});


/* ══ HERO CONTENT DATA ════════════════════════════════ */
const HERO={
  estudios:{
    eyebrow:'Centro de Información · Evidencia Científica',
    h1:'El hub de conocimiento<br><em>para mentes que cuestionan</em>',
    sub:'43 publicaciones verificadas con metodología, participantes y PDF original. Seleccionadas por rigor, no por resultado favorable.',
    stats:[{n:43,l:'Publicaciones'},{n:26,l:'Ensayos humanos'},{n:13,l:'RCT controlados'},{n:12,l:'Revisiones'}],
    ticker:['Harvard Medical School','MIT CSAIL','PLOS ONE','Frontiers in Neurology','Nutrients (MDPI)','Medical Gas Research','Brain Sciences','Oncotarget','Psychopharmacology','eNeuro','Current Psychology','U. Nagoya · U. Keio','U. Melbourne'],
  },
  guias:{
    eyebrow:'Centro de Información · Guías Prácticas',
    h1:'Vivir mejor,<br><em>con criterio propio</em>',
    sub:'Protocolos sobre luz, agua, respiración y campos EM. Lo que integramos en nuestra práctica y compartimos sin costo porque creemos en la autonomía informada.',
    stats:[{n:6,l:'Guías'},{n:5,l:'Categorías'},{n:4,l:'Disponibles hoy'},{n:0,l:'Productos requeridos'}],
    ticker:['Exposición solar','Ciclo circadiano','Reducción de nEMF','Hidratación celular','Suplementación estratégica','Respiración nasal','EZ Water','Vitamina D','VGCC','Efecto Bohr'],
  },
};

function updateHeroContent(data){
  const eyebrow=document.querySelector('.hero-eyebrow');
  eyebrow.textContent='';
  const dot=document.createElement('span');dot.className='hero-eyebrow-dot';
  eyebrow.appendChild(dot);eyebrow.appendChild(document.createTextNode(data.eyebrow));
  document.querySelector('.hero h1').innerHTML=data.h1;
  document.querySelector('.hero-sub').textContent=data.sub;
  const statNs=document.querySelectorAll('.stat-n[data-target]');
  const statLs=document.querySelectorAll('.stat-l');
  data.stats.forEach((s,i)=>{
    if(statNs[i]){statNs[i].dataset.target=s.n;countUp(statNs[i],s.n,900);}
    if(statLs[i])statLs[i].textContent=s.l;
  });
}

function swapTicker(items){
  const ticker=document.querySelector('.ticker');
  const track=document.querySelector('.ticker-track');
  ticker.classList.add('is-swapping');
  setTimeout(()=>{
    const doubled=[...items,...items];
    track.textContent='';
    doubled.forEach(item=>{
      const s=document.createElement('span');s.textContent=item;track.appendChild(s);
      const d=document.createElement('span');d.className='dot';d.textContent='·';track.appendChild(d);
    });
    track.style.animation='none';
    track.offsetHeight;
    track.style.animation='';
    ticker.classList.remove('is-swapping');
  },280);
}

function transitionHero(toView){
  const hc=document.querySelector('.hero-content');
  const data=HERO[toView];
  hc.classList.add('is-exiting');
  swapTicker(data.ticker);
  setTimeout(()=>{
    updateHeroContent(data);
    hc.classList.remove('is-exiting');
    hc.classList.add('is-entering');
    requestAnimationFrame(()=>requestAnimationFrame(()=>hc.classList.remove('is-entering')));
  },340);
}

/* ══ VIEW TOGGLE ══════════════════════════════════════ */
const filterMap={estudios:'papers-filters',guias:'guias-filters'};
document.querySelectorAll('.view-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.dataset.view===currentView)return;
    currentView=btn.dataset.view;
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    Object.values(filterMap).forEach(id=>document.getElementById(id).style.display='none');
    document.getElementById(filterMap[currentView]).style.display='';
    clearBtn.classList.remove('visible');
    if(typeof refreshFilterbar==='function') refreshFilterbar(currentView);
    { const pt=document.getElementById('pro-toggle'); if(pt) pt.style.display=currentView==='estudios'?'':'none'; }
    if(window.HeroScenes) HeroScenes.setScene(currentView);
    transitionHero(currentView);
    render();
  });
});

/* ══ GUÍAS RENDER ═════════════════════════════════════ */
function getFilteredGuias(){
  const sq=qGuia.toLowerCase();
  return guias.filter(g=>{
    if(aGuiaCat!=='all'&&g.categoria!==aGuiaCat)return false;
    if(!sq)return true;
    return [g.titulo,g.subtitulo,g.descripcion,...g.tags].some(x=>x.toLowerCase().includes(sq));
  });
}
function updateGuiaCatCounts(){
  document.querySelectorAll('[data-guiacat]:not([data-guiacat="all"])').forEach(btn=>{
    const k=btn.dataset.guiacat;
    const c=guias.filter(g=>g.categoria===k&&(qGuia===''||[g.titulo,g.subtitulo,...g.tags].some(x=>x.toLowerCase().includes(qGuia.toLowerCase())))).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc);}
    btn.style.opacity=c===0&&aGuiaCat!==k?'.35':'1';
  });
  const tot=getFilteredGuias().length;
  const apc=document.querySelector('[data-guiacat="all"] .pc');
  if(apc){apc.textContent=tot;animatePc(apc);}
}
function renderGuias(){
  const list=getFilteredGuias();
  updateGuiaCatCounts();
  countLine.textContent='';
  const _cn3=document.createElement('strong');
  _cn3.textContent=list.length===guias.length?guias.length:list.length;
  countLine.appendChild(_cn3);
  countLine.appendChild(document.createTextNode(list.length===guias.length?' guías prácticas':' de '+guias.length+' guías'));
  if(!list.length){
    grid.innerHTML=`<div class="empty-state"><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><h3>Sin resultados</h3><p>Probá con otra categoría.</p></div>`;
    return;
  }
  grid.innerHTML=list.map(g=>{
    const cg=CatGuias[g.categoria]||{c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af',l:'Guía'};
    const tags=g.tags.slice(0,3).map(t=>`<span class="meta-chip">${t}</span>`).join('');
    const nColor=g.nivel==='basico'?'#059669':g.nivel==='intermedio'?'#b45309':'#7c3aed';
    const nBg=g.nivel==='basico'?'#dcfce7':g.nivel==='intermedio'?'#fef3c7':'#ede9fe';
    const locked=g.estado==='proximamente';
    return `<div class="card" data-bc="${cg.c}" ${!locked?`data-guia-id="${g.id}"`:'data-locked="1"'} style="${locked?'cursor:default':''}">
  ${locked?'<div class="guide-card-locked"><span class="guide-lock-label">Próximamente</span></div>':''}
  <div class="card-top" style="background:linear-gradient(90deg,${cg.c},${cg.c}aa)"></div>
  <div class="guide-header" style="background:linear-gradient(155deg,${cg.c} 0%,${cg.c}cc 100%)">
    <div class="guide-badge-row">
      <span class="brand-tag" style="color:#fff;background:rgba(255,255,255,.18)">${cg.l}</span>
      <span class="guide-status ${g.estado}">${g.estado==='disponible'?'Disponible':'Próximamente'}</span>
    </div>
    <div class="guide-title-overlay">${g.titulo}</div>
  </div>
  <div class="card-info">
    <p class="card-cite" style="padding:10px 15px 0">${g.subtitulo}</p>
    <div class="guide-meta-row">
      <span class="guide-level" style="background:${nBg};color:${nColor}">${g.nivel.charAt(0).toUpperCase()+g.nivel.slice(1)}</span>
      <span class="guide-time"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${g.duracion}</span>
    </div>
    <p class="guide-desc">${g.descripcion}</p>
    <div class="meta-chips" style="margin:8px 15px 0">${tags}</div>
  </div>
  <div class="card-foot">
    <span class="ev-lbl">${cg.l}</span>
    ${!locked?`<button class="pdf-btn" style="color:${cg.c};border-color:${cg.c}55" data-guia-id="${g.id}">Leer →</button>`:''}
  </div>
</div>`;
  }).join('');
  setupObserver();
}

/* ══ LIBRO MODAL ══════════════════════════════════════ */
let mbgCurrent=0;
function mbgGoto(i){
  mbgCurrent=i;
  document.getElementById('mbg-track').style.transform=`translateX(${i===0?'0':'-100%'})`;
  document.querySelectorAll('.mbg-dot').forEach((d,idx)=>d.classList.toggle('on',idx===i));
  document.getElementById('mbg-prev').disabled=i===0;
  document.getElementById('mbg-next').disabled=i===1;
}
document.getElementById('mbg-prev').addEventListener('click', ()=>mbgGoto(0));
document.getElementById('mbg-next').addEventListener('click', ()=>mbgGoto(1));
document.querySelectorAll('.mbg-dot').forEach(d=>d.addEventListener('click',()=>mbgGoto(+d.dataset.mi)));
/* ══ GUÍA MODAL ═══════════════════════════════════════ */
function openGuiaModal(id){
  const g=guias.find(x=>x.id===id);if(!g||g.estado==='proximamente')return;
  document.getElementById('m-book-gallery').style.display='none';
  document.getElementById('m-paper-portada').style.display='none';
  const cg=CatGuias[g.categoria]||{c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af',l:'Guía'};
  const nColor=g.nivel==='basico'?'#059669':g.nivel==='intermedio'?'#b45309':'#7c3aed';
  const nBg=g.nivel==='basico'?'#dcfce7':g.nivel==='intermedio'?'#fef3c7':'#ede9fe';
  document.getElementById('m-badges').innerHTML=
    `<span class="type-badge" style="color:#374151;background:#f3f4f6">Guía práctica</span>
     <span class="brand-tag" style="color:${cg.c};background:${cg.c}1c"><span class="brand-dot" style="background:${cg.c}"></span>${cg.l}</span>
     <span class="guide-level" style="background:${nBg};color:${nColor}">${g.nivel.charAt(0).toUpperCase()+g.nivel.slice(1)}</span>`;
  document.getElementById('m-title').textContent=g.titulo;
  document.getElementById('m-cite').textContent=`${g.subtitulo} · ${g.duracion} de lectura`;
  document.getElementById('modal-header').style.background=`linear-gradient(145deg,${cg.bg} 0%,#fff 60%)`;
  document.getElementById('m-meta').innerHTML=`
    <div class="mbox"><span class="mbox-n" style="color:${cg.c}">${g.duracion}</span><span class="mbox-l">Lectura</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${nColor};font-size:12px">${g.nivel.charAt(0).toUpperCase()+g.nivel.slice(1)}</span><span class="mbox-l">Nivel</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${cg.c};font-size:12px">${cg.l}</span><span class="mbox-l">Categoría</span></div>`;
  document.getElementById('m-sec1-label').textContent='De qué trata';
  document.getElementById('m-sec2-label').textContent='Puntos clave';
  document.getElementById('m-method').textContent=g.descripcion;
  document.getElementById('m-findings').innerHTML=g.puntos.map(p=>
    `<div class="modal-fitem" style="border-left-color:${cg.c};background:${cg.bg}">${p}</div>`
  ).join('');
  document.getElementById('m-note').style.cssText='';
  document.getElementById('m-note-wrap').style.display='none';
  document.getElementById('m-catalog-wrap').style.display='none';
  document.getElementById('m-doi').innerHTML=g.tags.map(t=>
    `<span style="background:${cg.bg};color:${cg.tc};font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-right:4px;display:inline-block;margin-bottom:4px">${t}</span>`
  ).join('');
  const pdf=document.getElementById('m-pdf');
  pdf.removeAttribute('href');pdf.style.cursor='default';
  pdf.style.background=`linear-gradient(135deg,${cg.c},${cg.c}cc)`;
  pdf.innerHTML='Guía completa — próximamente';
  document.querySelector('.library').style.cssText='transform:scale(.985);filter:blur(.5px);transition:transform .4s ease,filter .4s ease';
  const ov=document.getElementById('overlay');
  ov.style.display='flex';requestAnimationFrame(()=>ov.style.opacity='1');
  document.body.style.overflow='hidden';
}

/* ══ MODAL ════════════════════════════════════════════ */
function openModal(id){
  const s=studies.find(x=>x.id===id);if(!s)return;
  document.getElementById('m-book-gallery').style.display='none';
  const pp=document.getElementById('m-paper-portada');
  if(s.portada){
    document.getElementById('m-paper-portada-img').src=s.portada;
    pp.style.display='block';
    if(window.attachZoom){ const z=window.attachZoom(pp); if(z)z.reset(); }
  } else { pp.style.display='none'; }
  const b=B[s.brand],t=T[s.type]||T.piloto;
  document.getElementById('m-badges').innerHTML=
    `<span class="type-badge" style="color:${t.tc};background:${t.bg}">${t.l}</span>
     <span class="brand-tag" style="color:${b.c};background:${b.c}1c">
       <span class="brand-dot" style="background:${b.c}"></span>${b.l}
     </span>`;
  const escHtml=x=>String(x||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  document.getElementById('m-title').textContent=s.titulo_es || s.title;
  document.getElementById('m-cite').innerHTML=
    (s.titulo_es && s.title ? `<span style="font-style:italic;color:var(--mist)">${escHtml(s.title)}</span><br>` : '')
    + escHtml(s.cite);
  document.getElementById('modal-header').style.background=`linear-gradient(145deg,${b.bg} 0%,#fff 60%)`;
  document.getElementById('m-meta').innerHTML=`
    <div class="mbox"><span class="mbox-n" style="color:${b.c}">${s.n}</span><span class="mbox-l">Participantes</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${b.c};font-size:13px;line-height:1.4">${s.loc}</span><span class="mbox-l">Lugar</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${b.c}">${s.dur||'—'}</span><span class="mbox-l">Duración</span></div>`;
  document.getElementById('m-method').textContent=s.method;
  document.getElementById('m-findings').innerHTML=s.results.map(r=>
    `<div class="modal-fitem" style="border-left-color:${b.c};background:${b.bg}">${r}</div>`
  ).join('');
  const nw=document.getElementById('m-note-wrap');
  const mn=document.getElementById('m-note');
  mn.style.cssText='';
  if(s.note){nw.style.display='block';mn.textContent='Nota: '+s.note}
  else nw.style.display='none';
  const doiEl=document.getElementById('m-doi');
  doiEl.textContent='';
  if(s.doi){
    doiEl.appendChild(document.createTextNode('DOI: '));
    const doiLink=document.createElement('a');
    doiLink.href='https://doi.org/'+s.doi;
    doiLink.target='_blank';
    doiLink.textContent=s.doi;
    doiEl.appendChild(doiLink);
  }
  const pdf=document.getElementById('m-pdf');
  pdf.href=s.pdf;pdf.style.background=b.lg;
  document.getElementById('m-sec1-label').textContent='Metodología';
  document.getElementById('m-sec2-label').textContent='Hallazgos principales';
  // Catalog link
  const cw=document.getElementById('m-catalog-wrap');
  const cd=document.getElementById('m-catalog-dot');
  const cl=document.getElementById('m-catalog-label');
  cw.style.display='block';
  cd.style.cssText=`background:${b.bg};color:${b.c};`;
  cd.textContent=b.l.charAt(0);
  cl.textContent=`Ver ${b.l} en el catálogo`;
  document.querySelector('.library').style.cssText='transform:scale(.985);filter:blur(.5px);transition:transform .4s ease,filter .4s ease';
  const ov=document.getElementById('overlay');
  ov.style.display='flex';
  requestAnimationFrame(()=>ov.style.opacity='1');
  document.body.style.overflow='hidden';
}
function closeModal(){
  const ov=document.getElementById('overlay');
  ['m-paper-portada','mbg-slide-0','mbg-slide-1'].forEach(id=>{const el=document.getElementById(id); if(el&&el._zoom)el._zoom.reset();});
  ov.style.opacity='0';
  document.querySelector('.library').style.cssText='transition:transform .4s ease,filter .4s ease';
  setTimeout(()=>{ov.style.display='none';document.body.style.overflow='';document.querySelector('.library').style.cssText=''},320);
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('overlay').addEventListener('click', e=>{if(e.target===e.currentTarget)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// Event delegation — reemplaza todos los onclick embebidos en templates de grids
grid.addEventListener('click', e => {
  if (e.target.closest('.pdf-btn')) return; // links externos no abren modal

  const modalCard = e.target.closest('[data-modal-id]');
  if (modalCard) { openModal(modalCard.dataset.modalId); return; }

  const guiaCard = e.target.closest('[data-guia-id]');
  if (guiaCard) { openGuiaModal(guiaCard.dataset.guiaId); return; }
});

/* ══ FILTER HANDLERS ══════════════════════════════════ */
function setPill(btn,on,bc){
  if(on){
    if(bc)btn.style.cssText=`background:${bc};border-color:transparent;color:#fff;transform:translateY(-1px);box-shadow:0 4px 16px ${bc}44`;
    else btn.style.cssText='background:var(--navy);border-color:transparent;color:#fff;transform:translateY(-1px);box-shadow:0 4px 14px rgba(11,31,74,.28)';
  } else { btn.style.cssText=''; }
}
/* ══ MOTOR DE FILTROS (dropdown + chips) ═══════════════ */
const FB_DIMS = {
  estudios: [
    {key:'brand', label:'Producto', cfg:B,          get:()=>aBrand,     set:v=>{aBrand=v;setBrandTint(aBrand);}},
    {key:'type',  label:'Diseño',   cfg:T,          get:()=>aType,      set:v=>aType=v},
    {key:'tema',  label:'Tema',     cfg:TemasPapers,get:()=>aTemaPaper, set:v=>aTemaPaper=v},
    {key:'rigor', label:'Rigor',    cfg:RigorCfg,   get:()=>aRigor,     set:v=>aRigor=v},
  ],
  guias: [ {key:'cat', label:'Categoría', cfg:CatGuias, get:()=>aGuiaCat, set:v=>aGuiaCat=v} ],
};
function fbDataset(view){ if(view==='estudios')return studies; if(view==='guias')return guias; return []; }
function fbItemMatches(view,d,s,val){
  if(val==='all')return true;
  if(view==='estudios'){
    if(d.key==='brand')return s.brand===val;
    if(d.key==='type')return s.type===val;
    if(d.key==='tema')return Array.isArray(s.temas)&&s.temas.includes(val);
    if(d.key==='rigor')return tierOf(s)===val;
  }
  if(view==='guias')return s.categoria===val;
  if(d.key==='tipo')return s.tipo===val;
  if(d.key==='campo')return s.campo===val;
  return true;
}
function fbCount(view,dims,skipDim,optKey){
  return fbDataset(view).filter(s=>dims.every(d=>fbItemMatches(view,d,s,d===skipDim?optKey:d.get()))).length;
}
let fbOpen=null;
function fbClose(){ if(fbOpen){fbOpen.panel.classList.remove('open');fbOpen.btn.setAttribute('aria-expanded','false');fbOpen=null;} }
document.addEventListener('click',e=>{ if(fbOpen&&!fbOpen.wrap.contains(e.target))fbClose(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape')fbClose(); });
function buildFilterbar(view){
  const dims=FB_DIMS[view]; if(!dims)return;
  const menus=document.getElementById('menus-'+view);
  if(!menus||menus.dataset.built)return;
  menus.dataset.built='1';
  dims.forEach(d=>{
    const wrap=document.createElement('div'); wrap.style.position='relative';
    const btn=document.createElement('button'); btn.className='fb-btn'; btn.type='button'; btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span class="fb-btn-label">'+d.label+'</span><span class="fb-caret">▾</span>';
    const panel=document.createElement('div'); panel.className='fb-panel';
    wrap.appendChild(btn); wrap.appendChild(panel); menus.appendChild(wrap);
    d._btn=btn; d._panel=panel; d._wrap=wrap;
    btn.addEventListener('click',ev=>{ ev.stopPropagation(); const open=fbOpen&&fbOpen.panel===panel; fbClose(); if(!open){ renderPanel(view,dims,d); panel.style.left='0'; panel.style.right='auto'; panel.classList.add('open'); btn.setAttribute('aria-expanded','true'); fbOpen={panel,btn,wrap}; const r=panel.getBoundingClientRect(); if(r.right>window.innerWidth-8){ panel.style.left='auto'; panel.style.right='0'; } } });
  });
  refreshFilterbar(view);
}
function renderPanel(view,dims,d){
  const cur=d.get();
  const opts=[{key:'all',label:'Todos'}].concat(Object.keys(d.cfg).filter(k=>k!=='all').map(k=>({key:k,label:d.cfg[k].l})));
  d._panel.innerHTML='';
  opts.forEach(o=>{
    const n=fbCount(view,dims,d,o.key);
    const color=o.key==='all'?null:(d.cfg[o.key].c||d.cfg[o.key].tc||null);
    const b=document.createElement('button'); b.type='button'; b.className='fb-opt'+(cur===o.key?' sel':'');
    b.innerHTML='<span class="fb-opt-dot"'+(color?(' style="background:'+color+'"'):'')+'></span><span>'+o.label+'</span><span class="fb-opt-n">'+n+'</span>';
    b.addEventListener('click',()=>{ d.set(o.key); fbClose(); refreshFilterbar(view); render(); });
    d._panel.appendChild(b);
  });
}
function refreshFilterbar(view){
  const dims=FB_DIMS[view]; if(!dims)return;
  dims.forEach(d=>{
    if(!d._btn)return;
    const v=d.get(); const lbl=d._btn.querySelector('.fb-btn-label');
    if(v==='all'){ d._btn.classList.remove('active'); d._btn.style.background=''; d._btn.style.borderColor=''; lbl.textContent=d.label; }
    else{ const c=d.cfg[v].c||d.cfg[v].tc||'var(--navy)'; d._btn.classList.add('active'); d._btn.style.background=c; d._btn.style.borderColor='transparent'; lbl.textContent=d.label+': '+d.cfg[v].l; }
  });
  const chips=document.getElementById('chips-'+view); if(!chips)return; chips.innerHTML='';
  const active=dims.filter(d=>d.get()!=='all');
  active.forEach(d=>{
    const v=d.get(); const c=d.cfg[v].c||d.cfg[v].tc||'var(--navy)';
    const chip=document.createElement('span'); chip.className='fb-chip'; chip.style.background=c;
    chip.innerHTML=d.cfg[v].l+'<button type="button" aria-label="Quitar">✕</button>';
    chip.querySelector('button').addEventListener('click',()=>{ d.set('all'); refreshFilterbar(view); render(); });
    chips.appendChild(chip);
  });
  if(active.length){ const clr=document.createElement('button'); clr.type='button'; clr.className='fb-clear-all'; clr.textContent='Limpiar todo'; clr.addEventListener('click',()=>{ dims.forEach(d=>d.set('all')); refreshFilterbar(view); render(); }); chips.appendChild(clr); }
}
document.getElementById('search').addEventListener('input',e=>{q=e.target.value;render()});
document.getElementById('search-guia').addEventListener('input',e=>{qGuia=e.target.value;render()});
clearBtn.addEventListener('click',()=>{
  (FB_DIMS[currentView]||[]).forEach(d=>d.set('all'));
  q=qGuia='';
  ['search','search-guia'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  refreshFilterbar(currentView); render();
});
['estudios','guias'].forEach(buildFilterbar);

/* ══ MODO PROFESIONAL ═════════════════════════════════ */
const proToggle=document.getElementById('pro-toggle');
if(proToggle){
  proToggle.addEventListener('click',()=>{
    proMode=!proMode;
    proToggle.classList.toggle('on',proMode);
    render();
  });
}

/* ══ PAGE BRAND TINT ══════════════════════════════════ */
const pageTint=document.getElementById('page-tint');
function setBrandTint(key){
  if(key==='all'){pageTint.style.opacity='0';return}
  const c=B[key]?.c||'#1a4fb6';
  pageTint.style.background=`radial-gradient(ellipse 65% 55% at 60% 40%,${c}0d,transparent)`;
  pageTint.style.opacity='1';
}

/* ══ NAV SCROLL ═══════════════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>40);
  const p=scrollY/(document.documentElement.scrollHeight-innerHeight)||0;
  document.getElementById('scroll-bar').style.transform=`scaleX(${Math.min(p,1)})`;
},{passive:true});

/* ══ HERO PARALLAX ════════════════════════════════════ */
let heroVisible=true;
new IntersectionObserver(e=>{heroVisible=e[0].isIntersecting}).observe(document.querySelector('.hero'));
let prafId=null;
document.addEventListener('mousemove',e=>{
  if(!heroVisible)return;
  cancelAnimationFrame(prafId);
  prafId=requestAnimationFrame(()=>{
    const mx=(e.clientX/innerWidth-.5),my=(e.clientY/innerHeight-.5);
    document.querySelectorAll('.orb-wrap').forEach((w,i)=>{
      const d=(i+1)*14;
      w.style.transform=`translate(${mx*d}px,${my*d}px)`;
    });
  });
},{passive:true});

/* ══ STAT COUNTERS ════════════════════════════════════ */
function countUp(el,target,dur=1600){
  let s=null;
  const step=ts=>{
    if(!s)s=ts;
    const p=Math.min((ts-s)/dur,1);
    el.textContent=Math.round((1-Math.pow(1-p,4))*target);
    if(p<1)requestAnimationFrame(step);
    else el.textContent=target;
  };
  requestAnimationFrame(step);
}
new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.stat-n[data-target]').forEach(el=>countUp(el,+el.dataset.target));
      e.target.__statObs?.disconnect();
    }
  });
},{threshold:.5}).observe(document.querySelector('.stats-row'));

/* ══ CONTADOR DINÁMICO DEL HERO (refleja el array real de papers) ══ */
function recomputeEstudiosStats(){
  const n=studies.length;
  const rct=studies.filter(s=>s.type==='rct').length;
  const rev=studies.filter(s=>s.type==='revision'||s.type==='meta').length;
  const hum=studies.filter(s=>['rct','piloto','factibilidad','seguridad'].includes(s.type)).length;
  const vals=[n,hum,rct,rev], labels=['Publicaciones','Ensayos humanos','RCT controlados','Revisiones'];
  HERO.estudios.stats=vals.map((v,i)=>({n:v,l:labels[i]}));
  HERO.estudios.sub=n+' publicaciones verificadas con metodología, participantes y PDF original. Seleccionadas por rigor, no por resultado favorable.';
  if(currentView==='estudios'){
    // escribe el número final directamente (robusto, sin depender del timing del count-up)
    const ns=document.querySelectorAll('.stat-n'), ls=document.querySelectorAll('.stat-l');
    vals.forEach((v,i)=>{ if(ns[i]){ns[i].dataset.target=v;ns[i].textContent=v;} if(ls[i])ls[i].textContent=labels[i]; });
    const sub=document.querySelector('.hero-sub'); if(sub) sub.textContent=HERO.estudios.sub;
  }
}

/* ══ INIT ═════════════════════════════════════════════ */
recomputeEstudiosStats();
render(false);
if(window.HeroScenes) HeroScenes.init({papers:studies});

/* ══ OPTIMIZE CENTRO DE INFORMACIÓN INTEGRATION ════════ */
window.addEventListener('optimizeDataLoaded', (event) => {
  const { papers: optimizePapers, references: optimizeReferences } = event.detail;

  if (optimizePapers && Array.isArray(optimizePapers)) {
    // Agregar papers OPTIMIZE al array studies
    studies.push(...optimizePapers);
    console.log(`[OPTIMIZE] ${optimizePapers.length} papers agregados a estudios`);
  }

  // Re-renderizar con los nuevos datos
  if (cView === 'estudios') {
    // Actualizar contador de pills
    const allBrandPill = document.querySelector('[data-brand="all"]');
    if (allBrandPill && optimizePapers) {
      const pc = allBrandPill.querySelector('.pc');
      if (pc) {
        const totalCount = studies.length;
        pc.textContent = totalCount;
      }
    }

    const allTypePill = document.querySelector('[data-type="all"]');
    if (allTypePill && optimizePapers) {
      const pc = allTypePill.querySelector('.pc');
      if (pc) {
        const totalCount = studies.length;
        pc.textContent = totalCount;
      }
    }

    render(false);
  }

  // refrescar contador del hero con el total real tras la carga async
  if (typeof recomputeEstudiosStats === 'function') recomputeEstudiosStats();

  console.log('[OPTIMIZE Centro de Información] Datos integrados exitosamente');
});

/* ══ PAPERS EXTRA — índice editable (js/papers-extra.json) ════════════
   Permite agregar/sacar papers desde un archivo de datos, sin tocar código.
   Ver el campo _README dentro del JSON para las instrucciones. */
fetch('js/papers-extra.json')
  .then(r => r.ok ? r.json() : null)
  .then(d => {
    if (!d || !Array.isArray(d.papers) || !d.papers.length) return;
    const validos = d.papers.filter(p => p && p.id && p.title);
    if (!validos.length) return;
    studies.push(...validos);
    if (currentView === 'estudios') render(false);
    if (window.HeroScenes && currentView === 'estudios') HeroScenes.setScene('estudios'); // reabanico con la cantidad real
    // espera a que el count-up inicial del hero (≈1.6s) termine, para que el
    // recálculo sea la última escritura y el número refleje el total real
    setTimeout(() => {
      if (typeof recomputeEstudiosStats === 'function') recomputeEstudiosStats();
    }, 1800);
    console.log('[Papers extra] ' + validos.length + ' agregados desde papers-extra.json');
  })
  .catch(() => {/* sin índice extra: la página funciona con los papers base */});

