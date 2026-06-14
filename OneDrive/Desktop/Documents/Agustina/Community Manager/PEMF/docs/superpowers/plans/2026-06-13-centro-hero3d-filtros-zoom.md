# Centro de Información: filtros, hero 3D, sync landing y zoom — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernizar el Centro de Información (estudios.html): filtros como barra compacta con menús, hero con escena 3D distinta por sección (60 fps, sutil), zoom+pan en la evidencia, y sincronizar la sección de evidencia del landing con la biblioteca real.

**Architecture:** Fuente única de papers en `js/papers-data.js` (`window.STUDIES_BASE`) que leen estudios y el landing. Tres módulos JS nuevos autocontenidos (`hero-scenes.js`, `img-zoom.js`, `evidence-sync.js`). El motor de filtros y el wiring viven en `page-estudios.js`. Todo el movimiento respeta `prefers-reduced-motion`.

**Tech Stack:** HTML estático + JS vanilla, CSS con transforms 3D. Verificación: `node --check`, Playwright (node) headless. Sin test runner unitario.

---

## Convención de verificación

Cada task cierra con verificación ejecutable: `node --check <archivo>` para JS, y/o un script Playwright que mide DOM/estado/consola. Servidor local: `python -m http.server 8787 --bind 127.0.0.1` desde `pagina/deploy`.

---

## FASE 1 — Fuente única de datos

### Task 1: Extraer los 43 papers base a `js/papers-data.js`

**Files:**
- Create: `pagina/deploy/js/papers-data.js`
- Modify: `pagina/deploy/js/page-estudios.js` (array `studies`)
- Modify: `pagina/deploy/estudios.html` (orden de `<script>`)

- [ ] **Step 1:** Crear `js/papers-data.js` con el contenido del array base actual, envuelto:

```js
/* Fuente única de los papers BASE (de marca). Lo leen estudios.html y el landing.
   Los papers de OPTIMIZE viven en papers-extra.json (se suman aparte). */
window.STUDIES_BASE = [
  /* …los 43 objetos actuales del array `studies` de page-estudios.js, tal cual… */
];
```

- [ ] **Step 2:** En `page-estudios.js`, reemplazar `const studies=[ …43 objetos… ];` por:

```js
const studies=[...(window.STUDIES_BASE||[])];
```

- [ ] **Step 3:** En `estudios.html`, cargar `papers-data.js` ANTES de `page-estudios.js`:

```html
<script src="js/papers-data.js"></script>
<script src="js/page-estudios.js" defer></script>
```
(papers-data.js sin `defer` para que `window.STUDIES_BASE` exista cuando corre page-estudios.js; page-estudios.js ya es `defer`, así que el script normal previo se ejecuta antes.)

- [ ] **Step 4:** Verificar sintaxis y que el set de ids base sigue completo.

Run:
```bash
cd "pagina/deploy"
node --check js/papers-data.js && node --check js/page-estudios.js && node -e "
global.window={};require('./js/papers-data.js');
const ids=window.STUDIES_BASE.map(p=>p.id);
console.log('base:',ids.length);
if(ids.length!==43)throw new Error('esperaba 43');
console.log('OK 43 base, ejemplo:',ids[0]);
"
```
Expected: `base: 43` y `OK 43 base`.

- [ ] **Step 5: Commit**
```bash
git add "pagina/deploy/js/papers-data.js" "pagina/deploy/js/page-estudios.js" "pagina/deploy/estudios.html"
git commit -m "refactor(centro): papers base a js/papers-data.js (fuente única)"
```

---

## FASE 2 — Filtros: barra compacta con menús

### Task 2: Markup + CSS de la barra de filtros

**Files:**
- Modify: `pagina/deploy/estudios.html` (bloque `.filter-wrap` y `<style>`)

- [ ] **Step 1:** Reemplazar el interior de `.filter-wrap` (los 4 bloques `#papers-filters/#biblioteca-filters/#guias-filters/#profesionales-filters` con sus pills) por la estructura compacta. El `view-toggle` se conserva. Para cada vista, un contenedor con:

```html
<div id="papers-filters" class="filterbar">
  <div class="filterbar-search">
    <span class="search-icon">⌕</span>
    <input class="search-input" id="search" type="text" placeholder="Buscar por título, autor, ingrediente…">
  </div>
  <div class="filterbar-menus" id="menus-estudios"></div>
  <div class="filterbar-chips" id="chips-estudios"></div>
</div>
```
Igual para `#biblioteca-filters` (`#menus-biblioteca`/`#chips-biblioteca`, search `#search-bib`), `#guias-filters` (`#menus-guias`/`#chips-guias`, `#search-guia`), `#profesionales-filters` (`#menus-profesionales`/`#chips-profesionales`, `#search-prof`). Los botones-menú y chips se generan por JS (Task 3), por eso los contenedores van vacíos.

- [ ] **Step 2:** Agregar el CSS (en el `<style>` de estudios.html, tras la sección FILTER BAR):

```css
.filterbar{display:flex;flex-direction:column;gap:10px}
.filterbar-search{display:flex;align-items:center;gap:10px;padding:9px 14px;background:#fff;border-radius:12px;border:1.5px solid var(--border);transition:border-color .2s,box-shadow .2s}
.filterbar-search:focus-within{border-color:var(--azure);box-shadow:0 0 0 3px rgba(26,79,182,.08)}
.filterbar-menus{display:flex;flex-wrap:wrap;gap:8px}
.fb-btn{display:inline-flex;align-items:center;gap:7px;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:600;color:var(--steel);background:#fff;border:1.5px solid var(--border);border-radius:100px;padding:8px 14px;cursor:pointer;transition:all .2s var(--out);white-space:nowrap}
.fb-btn:hover{border-color:rgba(26,79,182,.35);color:var(--azure);transform:translateY(-1px)}
.fb-btn.active{border-color:transparent;color:#fff}
.fb-btn .fb-caret{font-size:9px;opacity:.7;transition:transform .2s}
.fb-btn[aria-expanded="true"] .fb-caret{transform:rotate(180deg)}
.fb-panel{position:absolute;z-index:200;margin-top:6px;min-width:220px;max-width:92vw;max-height:340px;overflow-y:auto;background:#fff;border:1px solid var(--border);border-radius:14px;box-shadow:0 16px 48px rgba(11,31,74,.18);padding:6px;opacity:0;transform:translateY(-6px) scale(.98);pointer-events:none;transition:opacity .18s var(--out),transform .18s var(--out)}
.fb-panel.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
.fb-opt{display:flex;align-items:center;gap:9px;width:100%;text-align:left;font-size:13px;font-weight:500;color:var(--steel);background:none;border:none;border-radius:9px;padding:8px 10px;cursor:pointer;transition:background .15s}
.fb-opt:hover{background:var(--surface)}
.fb-opt.sel{background:var(--surface);font-weight:700}
.fb-opt-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;background:var(--mist)}
.fb-opt-n{margin-left:auto;font-size:10px;font-weight:800;color:var(--mist);background:var(--surface);border-radius:100px;padding:1px 7px}
.fb-opt.sel .fb-opt-n{background:#fff}
.filterbar-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center;min-height:0}
.fb-chip{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;color:#fff;border-radius:100px;padding:4px 6px 4px 11px;animation:fadeUp .25s var(--out)}
.fb-chip button{display:flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;border:none;background:rgba(255,255,255,.25);color:#fff;cursor:pointer;font-size:11px;line-height:1}
.fb-chip button:hover{background:rgba(255,255,255,.45)}
.fb-clear-all{font-size:11px;font-weight:700;color:var(--azure);background:none;border:none;cursor:pointer;padding:4px 8px}
.fb-clear-all:hover{text-decoration:underline}
```

- [ ] **Step 3:** Verificar estructura.

Run:
```bash
python -c "
s=open('estudios.html',encoding='utf-8').read()
for v in ['menus-estudios','chips-estudios','menus-biblioteca','menus-guias','menus-profesionales']:
    assert v in s, 'falta '+v
assert '.fb-panel' in s and '.fb-chip' in s
print('OK markup+css filtros')
"
```
Expected: `OK markup+css filtros`

- [ ] **Step 4: Commit**
```bash
git add "pagina/deploy/estudios.html"
git commit -m "feat(centro): markup y estilos de la barra de filtros compacta"
```

### Task 3: Motor de dropdowns + chips en page-estudios.js

**Files:**
- Modify: `pagina/deploy/js/page-estudios.js` (reemplaza el wiring de pills viejo)

- [ ] **Step 1:** Agregar un config declarativo de dimensiones por vista y el motor. Reemplaza los bloques `document.querySelectorAll('[data-brand]')…`, `[data-type]`, `[data-temapaper]`, `[data-tema]`, `[data-guiacat]`, `[data-campo]`, `[data-tipofuente]` y el init de pills por:

```js
/* ══ MOTOR DE FILTROS (dropdown + chips) ═══════════════ */
const FB_DIMS = {
  estudios: [
    {key:'brand', label:'Producto', cfg:B,         get:()=>aBrand,     set:v=>aBrand=v,     extra:s=>true},
    {key:'type',  label:'Diseño',   cfg:T,         get:()=>aType,      set:v=>aType=v,      extra:s=>true},
    {key:'tema',  label:'Tema',     cfg:TemasPapers,get:()=>aTemaPaper, set:v=>aTemaPaper=v, arr:true},
  ],
  biblioteca: [
    {key:'tema',  label:'Tema',     cfg:Temas,     get:()=>aTema,      set:v=>aTema=v},
  ],
  guias: [
    {key:'cat',   label:'Categoría',cfg:CatGuias,  get:()=>aGuiaCat,   set:v=>aGuiaCat=v},
  ],
  profesionales: [
    {key:'tipo',  label:'Tipo',     cfg:TipoFuente,get:()=>aTipoFuente,set:v=>aTipoFuente=v},
    {key:'campo', label:'Campo',    cfg:CampoProf, get:()=>aCampo,     set:v=>aCampo=v},
  ],
};
// dataset de cada vista para contar opciones (cross-filter)
function fbDataset(view){
  if(view==='estudios')return studies;
  if(view==='biblioteca')return lecturas;
  if(view==='guias')return guias;
  return profesionales;
}
// ¿el item s pasa el filtro de dim d con valor val? (val 'all' => true)
function fbItemMatches(view,d,s,val){
  if(val==='all')return true;
  if(view==='estudios'){
    if(d.key==='brand')return s.brand===val;
    if(d.key==='type')return s.type===val;
    if(d.key==='tema')return Array.isArray(s.temas)&&s.temas.includes(val);
  }
  if(view==='biblioteca')return s.tema===val;
  if(view==='guias')return s.categoria===val;
  if(d.key==='tipo')return s.tipo===val;
  if(d.key==='campo')return s.campo===val;
  return true;
}
// cuenta items que pasan TODAS las dims de la vista salvo la dim 'skip', con 'skip'=optKey
function fbCount(view,dims,skipDim,optKey){
  return fbDataset(view).filter(s=>dims.every(d=>{
    const val = d===skipDim ? optKey : d.get();
    return fbItemMatches(view,d,s,val);
  })).length;
}
let fbOpenPanel=null;
function fbClosePanel(){ if(fbOpenPanel){fbOpenPanel.panel.classList.remove('open');fbOpenPanel.btn.setAttribute('aria-expanded','false');fbOpenPanel=null;} }
document.addEventListener('click',e=>{ if(fbOpenPanel && !fbOpenPanel.wrap.contains(e.target)) fbClosePanel(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') fbClosePanel(); });

function buildFilterbar(view){
  const dims=FB_DIMS[view]; if(!dims)return;
  const menus=document.getElementById('menus-'+view);
  if(!menus||menus.dataset.built)return; // construir una sola vez
  menus.dataset.built='1';
  dims.forEach(d=>{
    const wrap=document.createElement('div'); wrap.style.position='relative';
    const btn=document.createElement('button'); btn.className='fb-btn'; btn.setAttribute('aria-expanded','false');
    btn.innerHTML=`<span class="fb-btn-label">${d.label}</span><span class="fb-caret">▾</span>`;
    const panel=document.createElement('div'); panel.className='fb-panel';
    wrap.appendChild(btn); wrap.appendChild(panel); menus.appendChild(wrap);
    d._btn=btn; d._panel=panel; d._wrap=wrap;
    btn.addEventListener('click',ev=>{
      ev.stopPropagation();
      const isOpen=fbOpenPanel&&fbOpenPanel.panel===panel;
      fbClosePanel();
      if(!isOpen){ renderPanel(view,dims,d); panel.classList.add('open'); btn.setAttribute('aria-expanded','true'); fbOpenPanel={panel,btn,wrap}; }
    });
  });
  refreshFilterbar(view);
}
function renderPanel(view,dims,d){
  const panel=d._panel; const cur=d.get();
  const opts=[{key:'all',label:'Todos'}].concat(
    Object.keys(d.cfg).filter(k=>k!=='all').map(k=>({key:k,label:d.cfg[k].l}))
  );
  panel.innerHTML='';
  opts.forEach(o=>{
    const n=fbCount(view,dims,d,o.key);
    const color=o.key==='all'?null:(d.cfg[o.key].c||d.cfg[o.key].tc||null);
    const b=document.createElement('button');
    b.className='fb-opt'+(cur===o.key?' sel':'');
    b.innerHTML=`<span class="fb-opt-dot"${color?` style="background:${color}"`:''}></span><span>${o.label}</span><span class="fb-opt-n">${n}</span>`;
    b.addEventListener('click',()=>{ d.set(o.key); fbClosePanel(); refreshFilterbar(view); render(); });
    panel.appendChild(b);
  });
}
function refreshFilterbar(view){
  const dims=FB_DIMS[view]; if(!dims)return;
  // estado visual de cada botón
  dims.forEach(d=>{
    const v=d.get(); const lbl=d._btn.querySelector('.fb-btn-label');
    if(v==='all'){ d._btn.classList.remove('active'); d._btn.style.cssText='position:relative'; lbl.textContent=d.label; }
    else{ const c=d.cfg[v].c||d.cfg[v].tc||'var(--navy)'; d._btn.classList.add('active'); d._btn.style.background=c; d._btn.style.borderColor='transparent'; lbl.textContent=`${d.label}: ${d.cfg[v].l}`; }
  });
  // chips
  const chips=document.getElementById('chips-'+view); chips.innerHTML='';
  const active=dims.filter(d=>d.get()!=='all');
  active.forEach(d=>{
    const v=d.get(); const c=d.cfg[v].c||d.cfg[v].tc||'var(--navy)';
    const chip=document.createElement('span'); chip.className='fb-chip'; chip.style.background=c;
    chip.innerHTML=`${d.cfg[v].l}<button aria-label="Quitar">✕</button>`;
    chip.querySelector('button').addEventListener('click',()=>{ d.set('all'); refreshFilterbar(view); render(); });
    chips.appendChild(chip);
  });
  if(active.length){
    const clr=document.createElement('button'); clr.className='fb-clear-all'; clr.textContent='Limpiar todo';
    clr.addEventListener('click',()=>{ dims.forEach(d=>d.set('all')); refreshFilterbar(view); render(); });
    chips.appendChild(clr);
  }
}
```

- [ ] **Step 2:** Construir la barra al iniciar y al cambiar de vista. En el init (donde antes estaba `setPill(...all)`), poner:

```js
['estudios','biblioteca','guias','profesionales'].forEach(buildFilterbar);
```
Y en el handler del `view-toggle` (donde se setea `currentView`/`cView`), tras mostrar el bloque de filtros de la vista, llamar `refreshFilterbar(currentView)` (los botones ya están construidos).

- [ ] **Step 3:** Búsquedas: conservar los listeners de `#search/#search-bib/#search-guia/#search-prof` (no cambian).

- [ ] **Step 4:** Eliminar la función vieja `updatePillCounts` y sus llamadas (los conteos ahora se calculan al abrir cada panel con `fbCount`). Si `render()`/otra parte llama `updatePillCounts()`, reemplazar esas llamadas por nada (o por `refreshFilterbar(currentView)` para mantener chips/labels al día tras re-render).

- [ ] **Step 5:** Verificar sintaxis.

Run: `node --check pagina/deploy/js/page-estudios.js`
Expected: exit 0.

- [ ] **Step 6:** Verificación funcional con Playwright (`tools/_v_filtros.mjs`): cargar estudios, abrir el menú "Tema", elegir "Mitocondria", comprobar que aparece chip y que la grilla baja a 21; "Limpiar todo" vuelve a 101; 0 errores de consola.

```bash
node tools/_v_filtros.mjs
```
Expected: JSON con `temaMitocondria:21`, `afterClear:101`, `chip:true`, `consoleErrors:[]`.

- [ ] **Step 7: Commit**
```bash
git add "pagina/deploy/js/page-estudios.js" "pagina/deploy/tools/_v_filtros.mjs"
git commit -m "feat(centro): motor de filtros dropdown + chips (todas las vistas)"
```

---

## FASE 3 — Zoom + pan en la evidencia

### Task 4: Módulo img-zoom.js + wiring en el modal

**Files:**
- Create: `pagina/deploy/js/img-zoom.js`
- Modify: `pagina/deploy/estudios.html` (`<script>` + `touch-action` en contenedores)
- Modify: `pagina/deploy/js/page-estudios.js` (adjuntar/reset al abrir/cerrar modal)

- [ ] **Step 1:** Crear `js/img-zoom.js`:

```js
/* Zoom + pan reutilizable. attachZoom(container) -> controlador con reset().
   Desktop: rueda (zoom al cursor), arrastre (pan si scale>1), doble clic (reset).
   Móvil: pellizco (zoom), 1 dedo (pan si scale>1), doble tap (reset). */
(function(){
  function attachZoom(container){
    const img=container.querySelector('img'); if(!img)return null;
    let scale=1,tx=0,ty=0;
    const MIN=1,MAX=5;
    const pts=new Map(); let startDist=0,startScale=1,lastX=0,lastY=0,panning=false,lastTap=0;
    function apply(){ img.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`; img.style.cursor=scale>1?'grab':''; }
    function clamp(){ const r=container.getBoundingClientRect(); const mx=(scale-1)*r.width/2, my=(scale-1)*r.height/2; tx=Math.max(-mx,Math.min(mx,tx)); ty=Math.max(-my,Math.min(my,ty)); }
    function reset(){ scale=1;tx=0;ty=0;apply(); }
    function zoomAt(cx,cy,factor){
      const r=container.getBoundingClientRect();
      const ox=cx-r.left-r.width/2, oy=cy-r.top-r.height/2;
      const ns=Math.max(MIN,Math.min(MAX,scale*factor));
      const k=ns/scale; tx=(tx-ox)*k+ox; ty=(ty-oy)*k+oy; scale=ns; clamp(); apply();
    }
    container.addEventListener('wheel',e=>{ e.preventDefault(); zoomAt(e.clientX,e.clientY, e.deltaY<0?1.12:1/1.12); },{passive:false});
    container.addEventListener('dblclick',e=>{ e.preventDefault(); reset(); });
    container.addEventListener('pointerdown',e=>{
      container.setPointerCapture(e.pointerId); pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pts.size===1){ const now=Date.now(); if(now-lastTap<300){reset();lastTap=0;return;} lastTap=now; lastX=e.clientX;lastY=e.clientY; panning=scale>1; }
      else if(pts.size===2){ const p=[...pts.values()]; startDist=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y); startScale=scale; }
    });
    container.addEventListener('pointermove',e=>{
      if(!pts.has(e.pointerId))return; pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pts.size===2){ const p=[...pts.values()]; const d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y); const cx=(p[0].x+p[1].x)/2,cy=(p[0].y+p[1].y)/2; const ns=Math.max(MIN,Math.min(MAX,startScale*(d/startDist))); zoomAt(cx,cy,ns/scale); }
      else if(panning&&scale>1){ tx+=e.clientX-lastX; ty+=e.clientY-lastY; lastX=e.clientX;lastY=e.clientY; clamp(); apply(); }
    });
    function up(e){ pts.delete(e.pointerId); if(pts.size<2)startDist=0; if(pts.size===0)panning=false; }
    container.addEventListener('pointerup',up); container.addEventListener('pointercancel',up);
    reset();
    return { reset };
  }
  window.attachZoom=attachZoom;
})();
```

- [ ] **Step 2:** En `estudios.html`, cargar el módulo (antes de page-estudios.js) y dar `touch-action:none` a los contenedores zoomables vía CSS:

```html
<script src="js/img-zoom.js"></script>
```
```css
#m-paper-portada,#m-book-gallery .mbg-slide{touch-action:none;overflow:hidden}
#m-paper-portada img,#m-book-gallery .mbg-slide img{will-change:transform;transition:transform .05s linear}
```

- [ ] **Step 3:** En `page-estudios.js`, al abrir un paper (función que llena `#m-paper-portada`), tras setear la imagen: crear/guardar el controlador y resetear. Mantener un controlador por contenedor:

```js
// cerca del open de modal de paper:
if(window.attachZoom){
  const cont=document.getElementById('m-paper-portada');
  if(cont._zoom) cont._zoom.reset(); else cont._zoom=window.attachZoom(cont);
}
```
Y para la galería de libros, adjuntar a cada `.mbg-slide` cuando se arma la galería (mismo patrón, `slide._zoom`). En el cierre del modal (handler `#modal-close`/overlay), llamar `reset()` de los controladores activos.

- [ ] **Step 4:** Verificar sintaxis.

Run: `node --check pagina/deploy/js/img-zoom.js && node --check pagina/deploy/js/page-estudios.js`
Expected: exit 0.

- [ ] **Step 5:** Playwright `tools/_v_zoom.mjs`: abrir un paper, despachar un evento `wheel` (deltaY<0) sobre `#m-paper-portada`, leer `img.style.transform` → `scale` > 1; doble clic → vuelve a `scale(1)` (o sin transform). 0 errores.

```bash
node tools/_v_zoom.mjs
```
Expected: `zoomedScaleGT1:true`, `resetOk:true`, `consoleErrors:[]`.

- [ ] **Step 6: Commit**
```bash
git add "pagina/deploy/js/img-zoom.js" "pagina/deploy/estudios.html" "pagina/deploy/js/page-estudios.js" "pagina/deploy/tools/_v_zoom.mjs"
git commit -m "feat(centro): zoom + pan (rueda/pellizco) en la evidencia y la biblioteca"
```

---

## FASE 4 — Hero 3D por sección

### Task 5: hero-scenes.js (motor 60fps + escenas) e integración

**Files:**
- Create: `pagina/deploy/js/hero-scenes.js`
- Modify: `pagina/deploy/estudios.html` (`#hero-scene` + CSS de escenas + `<script>`)
- Modify: `pagina/deploy/js/page-estudios.js` (llamar `HeroScenes.setScene(view)` al cambiar de vista)

- [ ] **Step 1:** En `estudios.html`, dentro de `.hero` (después de `.hero-orbs`), agregar el contenedor de escena:

```html
<div id="hero-scene" class="hero-scene" aria-hidden="true"></div>
```
Y CSS base (en el `<style>`):

```css
.hero-scene{position:absolute;inset:0;z-index:0;pointer-events:none;perspective:1100px;overflow:hidden}
.hs-layer{position:absolute;will-change:transform;transform-style:preserve-3d;backface-visibility:hidden}
/* Evidencia: hojas-paper */
.hs-paper{width:120px;height:155px;border-radius:8px;overflow:hidden;background:#fff;box-shadow:0 18px 50px rgba(0,0,0,.4);opacity:.9}
.hs-paper img{width:100%;height:100%;object-fit:cover;object-position:top center}
/* Biblioteca: tapas de libros */
.hs-book{width:120px;height:180px;border-radius:4px 7px 7px 4px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.45)}
.hs-book img{width:100%;height:100%;object-fit:cover}
/* Guías: arco circadiano */
.hs-sun{width:90px;height:90px;border-radius:50%;background:radial-gradient(circle at 50% 50%,#fff,#ffd27a 45%,rgba(255,180,80,0) 72%);box-shadow:0 0 80px 30px rgba(255,200,110,.45)}
.hs-glyph{font-size:26px;filter:drop-shadow(0 6px 14px rgba(0,0,0,.4));opacity:.85}
/* Fuentes: nodos */
.hs-node{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Figtree',sans-serif;font-weight:900;font-size:18px;color:#fff;box-shadow:0 14px 40px rgba(0,0,0,.4);overflow:hidden}
.hs-node img{width:100%;height:100%;object-fit:cover}
.hs-link{position:absolute;height:1px;transform-origin:left center;background:linear-gradient(90deg,rgba(255,255,255,.28),rgba(255,255,255,0))}
@media(prefers-reduced-motion:reduce){.hs-layer{transition:none!important}}
```

- [ ] **Step 2:** Crear `js/hero-scenes.js`. Estructura: un único `requestAnimationFrame` lee `scrollY` y mouse, y mueve cada capa según su `depth`. `setScene(view)` limpia y reconstruye las capas. Datos: papers (portadas) desde `studies`/`STUDIES_BASE`, libros desde `lecturas`, personas desde `profesionales` (pasados por `HeroScenes.init({papers,books,people})`).

```js
(function(){
  const root=()=>document.getElementById('hero-scene');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let layers=[],view='estudios',mx=0,my=0,data={papers:[],books:[],people:[]},mobile=matchMedia('(max-width:640px)').matches;
  function el(cls,html){const d=document.createElement('div');d.className='hs-layer '+cls;if(html)d.innerHTML=html;return d;}
  function clear(){const r=root();if(r)r.innerHTML='';layers=[];}
  function add(node,opt){ node._d=opt; root().appendChild(node); layers.push(node); }
  function rnd(a,b){return a+Math.random()*(b-a);}

  function sceneEvidencia(){
    const imgs=data.papers.filter(p=>p.portada).slice(0,mobile?5:8);
    imgs.forEach((p,i)=>{
      const n=el('hs-paper',`<img src="${p.portada}" alt="" loading="lazy">`);
      const depth=rnd(.3,1); n.style.left=rnd(5,80)+'%'; n.style.top=rnd(8,70)+'%';
      add(n,{depth,baseRot:rnd(-12,12),drift:rnd(.2,.6),ph:Math.random()*6.28});
    });
  }
  function sceneBiblioteca(){
    const bks=data.books.slice(0,mobile?6:10);
    bks.forEach((b,i)=>{
      const n=el('hs-book',`<img src="${b.cover}" alt="" loading="lazy">`);
      n.style.left='50%'; n.style.top='42%';
      add(n,{shelf:true,index:i,total:bks.length});
    });
  }
  function sceneGuias(){
    const sun=el('hs-sun'); sun.style.left='10%'; sun.style.top='60%'; add(sun,{sun:true});
    ['💧','〜','🫁','🍃'].forEach((g)=>{ const n=el('hs-glyph',g); n.style.left=rnd(15,80)+'%'; n.style.top=rnd(15,65)+'%'; add(n,{depth:rnd(.4,1),drift:rnd(.3,.7),ph:Math.random()*6.28}); });
  }
  function sceneFuentes(){
    const ppl=data.people.slice(0,mobile?5:8);
    ppl.forEach((p)=>{
      const ini=(p.nombre||'?').split(' ').map(w=>w[0]).slice(0,2).join('');
      const col=(p.campo&&window.CampoProf&&CampoProf[p.campo])?CampoProf[p.campo].c:'#1a4fb6';
      const n=el('hs-node', p.foto?`<img src="${p.foto}" alt="">`:ini);
      if(!p.foto)n.style.background=`linear-gradient(135deg,${col},${col}aa)`;
      n.style.left=rnd(8,82)+'%'; n.style.top=rnd(10,70)+'%';
      add(n,{depth:rnd(.3,1),drift:rnd(.25,.6),ph:Math.random()*6.28});
    });
  }
  const SCENES={estudios:sceneEvidencia,biblioteca:sceneBiblioteca,guias:sceneGuias,profesionales:sceneFuentes};

  function setScene(v){ if(!root())return; view=v; clear(); (SCENES[v]||sceneEvidencia)(); }
  function frame(){
    const sc=window.scrollY||0, t=performance.now()/1000;
    const heroH=(document.querySelector('.hero')||{offsetHeight:600}).offsetHeight;
    const p=Math.min(1,sc/(heroH||600)); // progreso de scroll en el hero
    layers.forEach((n,i)=>{
      const d=n._d||{};
      if(d.shelf){ // biblioteca: avanza libro por libro
        const focus=p*(d.total-1); const rel=d.index-focus;
        const x=rel*(mobile?120:150), z=-Math.abs(rel)*220, ry=rel*-18;
        const op=Math.max(.15,1-Math.abs(rel)*.45);
        n.style.transform=`translate(-50%,-50%) translate3d(${x}px,0,${z}px) rotateY(${ry}deg)`; n.style.opacity=op; n.style.zIndex=String(100-Math.round(Math.abs(rel)*10));
      } else if(d.sun){ // guías: sol recorre arco
        const ang=Math.PI*(1-p); const cx=10+p*80, cy=60-Math.sin(Math.PI*p)*42;
        n.style.left=cx+'%'; n.style.top=cy+'%';
      } else { // flotantes con profundidad (evidencia/guías-glifos/fuentes)
        const dep=d.depth||.6; const drift=reduce?0:Math.sin(t*(d.drift||.4)+(d.ph||0))*8;
        const px=reduce?0:mx*22*dep, py=(reduce?0:my*22*dep) - sc*0.12*dep + drift;
        const rot=(d.baseRot||0)+(reduce?0:mx*6*dep);
        n.style.transform=`translate3d(${px}px,${py}px,${(dep-1)*200}px) rotateY(${rot}deg)`;
        n.style.opacity=String(.55+dep*.4);
      }
    });
    requestAnimationFrame(frame);
  }
  function init(d){ data=d||data; if(!root())return; window.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2;},{passive:true}); setScene('estudios'); requestAnimationFrame(frame); }
  window.HeroScenes={init,setScene};
})();
```

- [ ] **Step 3:** En `estudios.html`, cargar el script (después de page-estudios.js, o antes con init diferido). Cargar tras page-estudios.js NO sirve porque necesita datos; mejor inicializar desde page-estudios.js. Agregar `<script src="js/hero-scenes.js"></script>` antes de page-estudios.js, y en page-estudios.js (al final del init) llamar:

```js
if(window.HeroScenes) HeroScenes.init({papers:studies, books:lecturas, people:profesionales});
```
Y en el handler del view-toggle: `if(window.HeroScenes) HeroScenes.setScene(currentView);`

- [ ] **Step 4:** Verificar sintaxis.

Run: `node --check pagina/deploy/js/hero-scenes.js && node --check pagina/deploy/js/page-estudios.js`
Expected: exit 0.

- [ ] **Step 5:** Playwright `tools/_v_hero.mjs`: cargar estudios; comprobar que `#hero-scene` tiene `.hs-paper` (>0). Cambiar a Biblioteca → tiene `.hs-book` (>0); Guías → `.hs-sun`; Fuentes → `.hs-node`. 0 errores de consola. Captura `tools/shot_hero_*.png` por vista para revisión visual.

```bash
node tools/_v_hero.mjs
```
Expected: `evidencia>0, biblioteca>0, guias>=1, fuentes>0, consoleErrors:[]`.

- [ ] **Step 6:** Revisar las capturas (Read) — ajustar opacidades/posiciones si algo tapa el texto del hero. (El texto del hero está en `z-index:1`; la escena en `z-index:0`, así que queda detrás.)

- [ ] **Step 7: Commit**
```bash
git add "pagina/deploy/js/hero-scenes.js" "pagina/deploy/estudios.html" "pagina/deploy/js/page-estudios.js" "pagina/deploy/tools/_v_hero.mjs"
git commit -m "feat(centro): hero 3D con escena por sección (evidencia/biblioteca/guías/fuentes)"
```

---

## FASE 5 — Sincronización del landing

### Task 6: evidence-sync.js + hidratar #evidencia en index.html

**Files:**
- Create: `pagina/deploy/js/evidence-sync.js`
- Modify: `pagina/deploy/index.html` (incluir scripts; marcar nodos para hidratar)

- [ ] **Step 1:** Crear `js/evidence-sync.js`:

```js
/* Sincroniza la sección #evidencia del landing con la biblioteca real. */
(function(){
  function pick(papers,n){
    const withImg=papers.filter(p=>p.portada);
    const byBrand={}; withImg.forEach(p=>{(byBrand[p.brand]=byBrand[p.brand]||[]).push(p);});
    const out=[],brands=Object.keys(byBrand); let i=0;
    while(out.length<n && i<100){ brands.forEach(b=>{ if(byBrand[b][i]&&out.length<n)out.push(byBrand[b][i]); }); i++; }
    return out;
  }
  function hydrate(papers){
    const total=papers.length;
    const brands=new Set(papers.map(p=>p.brand).filter(b=>b&&b!=='all')).size;
    const floor=Math.floor(total/10)*10;
    const numEl=document.querySelector('#evidencia [data-countup]');
    if(numEl){ numEl.setAttribute('data-countup',String(floor)); numEl.setAttribute('data-suffix','+'); numEl.textContent=floor+'+'; }
    const brandEls=document.querySelectorAll('#evidencia [data-countup]');
    if(brandEls[1]){ brandEls[1].setAttribute('data-countup',String(brands)); brandEls[1].textContent=String(brands); }
    const fan=document.querySelector('#evidencia .ev-fan');
    if(fan){ const sel=pick(papers,6); if(sel.length) fan.innerHTML=sel.map(p=>`<div class="ev-paper"><img src="${p.portada}" alt="" loading="lazy"></div>`).join(''); }
  }
  function run(){
    const base=Array.isArray(window.STUDIES_BASE)?window.STUDIES_BASE.slice():[];
    fetch('js/papers-extra.json').then(r=>r.ok?r.json():null).then(d=>{
      const extra=(d&&Array.isArray(d.papers))?d.papers.filter(p=>p&&p.id&&p.title):[];
      hydrate(base.concat(extra));
    }).catch(()=>{ if(base.length) hydrate(base); });
  }
  if(document.readyState!=='loading') run(); else document.addEventListener('DOMContentLoaded',run);
})();
```

- [ ] **Step 2:** En `index.html`, incluir los scripts antes de `</body>` (papers-data primero):

```html
<script src="js/papers-data.js"></script>
<script src="js/evidence-sync.js"></script>
```

- [ ] **Step 3:** Verificar sintaxis.

Run: `node --check pagina/deploy/js/evidence-sync.js`
Expected: exit 0.

- [ ] **Step 4:** Playwright `tools/_v_landing.mjs`: cargar index.html; leer el primer `[data-countup]` de `#evidencia` → texto contiene un número ≥ 100 con "+"; `.ev-fan .ev-paper` count == 6; `<img>` con `src` que existe (status 200). 0 errores de consola.

```bash
node tools/_v_landing.mjs
```
Expected: `total>=100:true`, `fanCount:6`, `consoleErrors:[]`.

- [ ] **Step 5: Commit**
```bash
git add "pagina/deploy/js/evidence-sync.js" "pagina/deploy/index.html" "pagina/deploy/tools/_v_landing.mjs"
git commit -m "feat(landing): sección de evidencia sincronizada con la biblioteca real"
```

---

## FASE 6 — Verificación integral

### Task 7: Smoke test final + capturas

**Files:** `pagina/deploy/tools/_v_full.mjs` (verificación), capturas para revisión.

- [ ] **Step 1:** Script que recorre estudios (las 4 vistas, filtros, modal+zoom) e index, junta errores de consola de ambas y saca capturas desktop+móvil de la barra de filtros y de cada escena de hero.

- [ ] **Step 2:** Correr y revisar (Read de las capturas). Cualquier ajuste fino → commit `fix(centro): …`.

- [ ] **Step 3:** Limpiar artefactos de prueba no deseados (los `_v_*.mjs` y `shot_*.png` se pueden borrar del disco; no se commitean salvo que querramos conservarlos como smoke-tests).

---

## Self-review (cobertura del spec)

- A. Filtros compactos (menús+chips, todas las vistas, sin "Todos" redundante) → Task 2-3. ✓
- B. Hero 3D por sección (4 escenas, 60fps, reduced-motion, tinte) → Task 5. ✓
- C. Sync del landing (fuente única papers-data.js, total/marcas/abanico dinámicos) → Task 1 + Task 6. ✓
- D. Zoom+pan (rueda/pellizco, drag, doble clic/tap, reset, paper+biblioteca) → Task 4. ✓
- Verificación (Playwright ambas páginas + capturas) → cada task + Task 7. ✓
