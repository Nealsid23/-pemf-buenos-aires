# Subcategorías temáticas + títulos en español (estudios) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar a la vista "Evidencia Científica" de `estudios.html` un filtro por tema (13 subcategorías, multi-tema) y mostrar los títulos de los papers en español de Argentina, conservando el original en inglés en la cita del modal.

**Architecture:** Se agregan dos campos (`titulo_es`, `temas[]`) a cada paper en las dos fuentes vivas (array base inline en `page-estudios.js` y `papers-extra.json`). La ruta legacy `optimizeDataLoaded`/`centro-data.json` está confirmada como NO cargada por `estudios.html`, así que se ignora. Se agrega un config `TemasPapers`, una fila de filtro "Tema" en el HTML, y la lógica de filtro/conteo/búsqueda/render correspondiente. Render con fallback (`s.titulo_es || s.title`) para no romper durante la carga async.

**Tech Stack:** HTML estático + JS vanilla (sin framework ni bundler). Verificación: `node`/`python` para parsear JSON y validar sintaxis, navegador (Playwright/servidor local) para render. Sin framework de tests unitarios.

---

## Convención de verificación (en lugar de TDD)

No hay test runner. Cada task termina con un paso de verificación ejecutable:
- JSON: `python -c "import json; json.load(open(...))"` debe pasar sin excepción.
- JS: `node --check js/page-estudios.js` debe pasar sin error de sintaxis.
- Render: servir `deploy/` y abrir `estudios.html`; verificar consola sin errores y comportamiento.

---

## Task 1: Datos generados — titulo_es + temas para los 101 papers

**Files:**
- Create: `pagina/deploy/js/_temas-titulos.generated.json` (artefacto intermedio de trabajo, no se sirve)

Mapa `id → {titulo_es, temas[]}` para los 101 papers (43 base + 58 extra). Generado por agentes en paralelo (skill `dispatching-parallel-agents`), lotes de ~17 papers. Cada entrada:

```json
{ "extra-binhi-2023": { "titulo_es": "Amplificación estadística de los efectos de los campos magnéticos débiles en la traducción celular", "temas": ["campos-em","quantum"] } }
```

**Reglas para los agentes:**
- `titulo_es`: español rioplatense, claro, fiel al sentido; mantener el término técnico (no inventar). Sin traducir nombres propios de técnicas si no tienen equivalente claro.
- `temas`: 1-3 slugs SOLO de esta lista: `campos-em, agua-h2, mitocondria, luz, quantum, fascia, biocampo, longevidad, neuro, sueno, dolor, antioxidantes, microbioma`.

- [ ] **Step 1:** Extraer la lista de los 101 papers (id, title, method, results) a un archivo de entrada para los agentes.

Run:
```bash
cd "pagina/deploy"
python -c "
import json,re
base=open('js/page-estudios.js',encoding='utf-8').read()
extra=json.load(open('js/papers-extra.json',encoding='utf-8'))['papers']
print('extra:',len(extra))
"
```
Expected: `extra: 58` (más los 43 base que se extraen leyendo el array `studies`).

- [ ] **Step 2:** Despachar agentes en paralelo (lotes de ~17). Cada uno devuelve un fragmento JSON `{id:{titulo_es,temas}}`.

- [ ] **Step 3:** Consolidar las respuestas en `js/_temas-titulos.generated.json`. Revisar coherencia: cada `temas` usa solo slugs válidos; cada `titulo_es` no vacío.

Run:
```bash
python -c "
import json
m=json.load(open('js/_temas-titulos.generated.json',encoding='utf-8'))
valid={'campos-em','agua-h2','mitocondria','luz','quantum','fascia','biocampo','longevidad','neuro','sueno','dolor','antioxidantes','microbioma'}
assert len(m)==101, f'esperaba 101, hay {len(m)}'
for k,v in m.items():
    assert v['titulo_es'].strip(), f'titulo vacío en {k}'
    assert 1<=len(v['temas'])<=3, f'temas fuera de rango en {k}'
    assert all(t in valid for t in v['temas']), f'slug inválido en {k}: {v[\"temas\"]}'
print('OK 101 papers, temas válidos')
"
```
Expected: `OK 101 papers, temas válidos`

- [ ] **Step 4: Commit** (artefacto de trabajo)
```bash
git add "pagina/deploy/js/_temas-titulos.generated.json"
git commit -m "chore(estudios): mapa generado titulo_es + temas para 101 papers"
```

---

## Task 2: Config TemasPapers en page-estudios.js

**Files:**
- Modify: `pagina/deploy/js/page-estudios.js` (después del bloque `const T={…}`, ~`:20`)

- [ ] **Step 1:** Insertar el config (paleta reutilizada de la existente):

```js
/* ══ TEMAS (papers / evidencia) ═══════════════════════ */
const TemasPapers={
  'campos-em':    {l:'Campos EM y PEMF',         c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af'},
  'agua-h2':      {l:'Agua e hidrógeno',          c:'#0369a1',bg:'#f0f9ff',tc:'#0c4a6e'},
  'mitocondria':  {l:'Mitocondria y energía',     c:'#b45309',bg:'#fffbeb',tc:'#78350f'},
  'luz':          {l:'Luz y fotobiomodulación',   c:'#d97706',bg:'#fff7ed',tc:'#9a3412'},
  'quantum':      {l:'Biología cuántica',         c:'#059669',bg:'#ecfdf5',tc:'#064e3b'},
  'fascia':       {l:'Fascia y tejido conectivo', c:'#0d9488',bg:'#f0fdfa',tc:'#115e59'},
  'biocampo':     {l:'Biocampo y consciencia',    c:'#7c3aed',bg:'#f5f3ff',tc:'#5b21b6'},
  'longevidad':   {l:'Longevidad y epigenética',  c:'#9333ea',bg:'#faf5ff',tc:'#6b21a8'},
  'neuro':        {l:'Neurociencia y cognición',  c:'#4338ca',bg:'#eef2ff',tc:'#312e81'},
  'sueno':        {l:'Sueño y sistema nervioso',  c:'#0891b2',bg:'#ecfeff',tc:'#155e75'},
  'dolor':        {l:'Dolor y regeneración',      c:'#dc2626',bg:'#fef2f2',tc:'#991b1b'},
  'antioxidantes':{l:'Antioxidantes y estrés ox.',c:'#65a30d',bg:'#f7fee7',tc:'#3f6212'},
  'microbioma':   {l:'Microbioma y metabolismo',  c:'#ea580c',bg:'#fff7ed',tc:'#9a3412'},
};
```

- [ ] **Step 2:** Verificar sintaxis.

Run: `node --check pagina/deploy/js/page-estudios.js`
Expected: sin salida (exit 0).

- [ ] **Step 3: Commit**
```bash
git add "pagina/deploy/js/page-estudios.js"
git commit -m "feat(estudios): config TemasPapers (13 subcategorías de evidencia)"
```

---

## Task 3: Aplicar titulo_es + temas al array base (43 papers)

**Files:**
- Modify: `pagina/deploy/js/page-estudios.js` (array `studies`, `:416`-`:719`)

- [ ] **Step 1:** Script que inyecta `titulo_es` y `temas` en cada objeto del array base, leyendo `_temas-titulos.generated.json` y matcheando por `id`. Inserta los campos justo después de `title:` de cada paper base.

```bash
cd "pagina/deploy"
python tools/_inject_temas.py --target base
```
(El script `tools/_inject_temas.py` se crea en este step: parsea el bloque `const studies=[…]`, y para cada `id:'…'` agrega `titulo_es` y `temas` desde el mapa. Idempotente: si ya existe `titulo_es`, lo reemplaza.)

- [ ] **Step 2:** Verificar que los 43 ids base recibieron campos y que el JS sigue siendo válido.

Run:
```bash
node --check js/page-estudios.js && python -c "
import re
s=open('js/page-estudios.js',encoding='utf-8').read()
base=s[s.index('const studies=['):s.index('/* ══ STATE')]
ids=re.findall(r\"id:'(lw-|mvc-|drh-|ana-|gam-|ng-)\", base)
tit=base.count('titulo_es:')
print('papers base:',len(ids),'titulo_es:',tit)
assert tit>=43, 'faltan titulo_es en base'
"
```
Expected: `papers base: 43 titulo_es: 43`

- [ ] **Step 3: Commit**
```bash
git add "pagina/deploy/js/page-estudios.js" "pagina/deploy/tools/_inject_temas.py"
git commit -m "content(estudios): titulo_es + temas en los 43 papers base"
```

---

## Task 4: Aplicar titulo_es + temas a papers-extra.json (58 papers)

**Files:**
- Modify: `pagina/deploy/js/papers-extra.json`

- [ ] **Step 1:** Inyectar campos por `id` en cada objeto de `papers[]`.

```bash
cd "pagina/deploy"
python tools/_inject_temas.py --target extra
```

- [ ] **Step 2:** Verificar JSON válido y cobertura.

Run:
```bash
python -c "
import json
d=json.load(open('js/papers-extra.json',encoding='utf-8'))
ps=d['papers']
con=[p for p in ps if p.get('titulo_es') and p.get('temas')]
print('extra:',len(ps),'con campos:',len(con))
assert len(con)==len(ps), 'faltan campos en algún paper extra'
"
```
Expected: `extra: 58 con campos: 58`

- [ ] **Step 3: Commit**
```bash
git add "pagina/deploy/js/papers-extra.json"
git commit -m "content(estudios): titulo_es + temas en los 58 papers de OPTIMIZE"
```

---

## Task 5: Fila de filtro "Tema" en estudios.html

**Files:**
- Modify: `pagina/deploy/estudios.html` (dentro de `#papers-filters` > `.filter-scroll`, después del `.filter-group` de "Diseño", `:835`)

- [ ] **Step 1:** Insertar el nuevo grupo de filtro antes del `.search-wrap` de papers:

```html
        <div class="filter-group">
          <span class="filter-row-label">Tema</span>
          <div class="pills-scroll" id="tema-papers-pills">
            <button class="pill on" data-temapaper="all">Todos <span class="pc"></span></button>
            <button class="pill" data-temapaper="campos-em">Campos EM y PEMF <span class="pc"></span></button>
            <button class="pill" data-temapaper="agua-h2">Agua e hidrógeno <span class="pc"></span></button>
            <button class="pill" data-temapaper="mitocondria">Mitocondria <span class="pc"></span></button>
            <button class="pill" data-temapaper="luz">Luz y fotobiomod. <span class="pc"></span></button>
            <button class="pill" data-temapaper="quantum">Biología cuántica <span class="pc"></span></button>
            <button class="pill" data-temapaper="fascia">Fascia <span class="pc"></span></button>
            <button class="pill" data-temapaper="biocampo">Biocampo y consciencia <span class="pc"></span></button>
            <button class="pill" data-temapaper="longevidad">Longevidad <span class="pc"></span></button>
            <button class="pill" data-temapaper="neuro">Neurociencia <span class="pc"></span></button>
            <button class="pill" data-temapaper="sueno">Sueño y SN <span class="pc"></span></button>
            <button class="pill" data-temapaper="dolor">Dolor y regeneración <span class="pc"></span></button>
            <button class="pill" data-temapaper="antioxidantes">Antioxidantes <span class="pc"></span></button>
            <button class="pill" data-temapaper="microbioma">Microbioma <span class="pc"></span></button>
          </div>
        </div>
```

- [ ] **Step 2:** Verificar que el grupo quedó dentro de `#papers-filters` y que el HTML está balanceado.

Run:
```bash
python -c "
s=open('estudios.html',encoding='utf-8').read()
i=s.index('id=\"papers-filters\"'); j=s.index('id=\"biblioteca-filters\"')
blk=s[i:j]
assert 'tema-papers-pills' in blk, 'el grupo Tema no quedó en papers-filters'
assert blk.count('data-temapaper')==14, 'esperaba 14 pills de tema'
print('OK fila Tema en papers-filters, 14 pills')
"
```
Expected: `OK fila Tema en papers-filters, 14 pills`

- [ ] **Step 3: Commit**
```bash
git add "pagina/deploy/estudios.html"
git commit -m "feat(estudios): fila de filtro Tema en la vista de evidencia"
```

---

## Task 6: Lógica JS — estado, filtro, conteos, búsqueda, render

**Files:**
- Modify: `pagina/deploy/js/page-estudios.js` (estado `:722`, `match` `:729`, `getFiltered` `:733`, render tarjeta `:846`, modal `:1419-1420`, y la sección de wiring de pills/conteos)

- [ ] **Step 1: Estado.** En el bloque de estado (`:722`), agregar:

```js
let aTemaPaper='all';
```

- [ ] **Step 2: getFiltered.** Añadir la condición de tema al `.filter()` de papers. La condición combinada queda:

```js
return studies.filter(s=>{
    const okBrand = aBrand==='all' || s.brand===aBrand;
    const okType  = aType==='all'  || s.type===aType;
    const okTema  = aTemaPaper==='all' || (Array.isArray(s.temas) && s.temas.includes(aTemaPaper));
    const okQ     = match(s, sq);
    return okBrand && okType && okTema && okQ;
});
```
(Reemplaza el cuerpo del filter existente en `:735`, preservando cómo se calcula `sq`.)

- [ ] **Step 3: match.** Incluir los labels de temas en el texto buscable (`:731`):

```js
function match(s, sq){
  if(!sq) return true;
  const temaLabels=(s.temas||[]).map(t=>TemasPapers[t]?TemasPapers[t].l:'' ).join(' ');
  return [s.title,s.titulo_es||'',s.cite,s.method,...s.results,B[s.brand].l,temaLabels]
    .some(x=>String(x).toLowerCase().includes(sq));
}
```

- [ ] **Step 4: Render de tarjeta** (`:846`): usar título en español con fallback:

```js
    <h3 class="card-title">${s.titulo_es || s.title}</h3>
```

- [ ] **Step 5: Modal** (`:1419-1420`): título en español; original inglés en la cita:

```js
  document.getElementById('m-title').textContent = s.titulo_es || s.title;
  document.getElementById('m-cite').innerHTML =
    (s.titulo_es && s.title ? `<span style="font-style:italic;color:var(--mist)">${s.title}</span><br>` : '')
    + s.cite;
```

- [ ] **Step 6: Wiring de pills de tema + conteos.** Localizar dónde se cablean las pills de marca/tipo (handlers de clic) y el recálculo de `.pc`. Replicar para `#tema-papers-pills`:

```js
// Click handler (junto a los de brand/type)
document.querySelectorAll('#tema-papers-pills .pill').forEach(p=>{
  p.addEventListener('click',()=>{
    document.querySelectorAll('#tema-papers-pills .pill').forEach(x=>x.classList.remove('on'));
    p.classList.add('on');
    aTemaPaper=p.dataset.temapaper;
    render();
    updateClearBtn();
  });
});
```

```js
// Conteos por tema (en la función que recalcula los .pc de las pills)
document.querySelectorAll('#tema-papers-pills .pill').forEach(p=>{
  const k=p.dataset.temapaper;
  const n = k==='all' ? studies.length
          : studies.filter(s=>Array.isArray(s.temas)&&s.temas.includes(k)).length;
  const pc=p.querySelector('.pc'); if(pc) pc.textContent=n;
});
```
(Si `updateClearBtn`/el reset de "Limpiar filtros" existe, incluir `aTemaPaper='all'` + restaurar pill "Todos" en el reset.)

- [ ] **Step 7:** Verificar sintaxis.

Run: `node --check pagina/deploy/js/page-estudios.js`
Expected: exit 0, sin salida.

- [ ] **Step 8: Commit**
```bash
git add "pagina/deploy/js/page-estudios.js"
git commit -m "feat(estudios): filtro por tema, conteos, búsqueda y título en español"
```

---

## Task 7: Verificación en navegador

**Files:** ninguno (solo verificación)

- [ ] **Step 1:** Servir el directorio y abrir la página.
```bash
cd "pagina/deploy" && python -m http.server 8765
```
Abrir `http://localhost:8765/estudios.html`.

- [ ] **Step 2:** Con Playwright (o manual) verificar:
  - Consola sin errores.
  - La fila "Tema" aparece con 14 pills y conteos numéricos > 0.
  - Clic en "Campos EM y PEMF" reduce la grilla a los papers de ese tema; el conteo de resultados cuadra.
  - Combinar Tema + Producto + búsqueda filtra por AND.
  - Las tarjetas muestran títulos en español.
  - Abrir un paper: el modal muestra el título en español y, debajo, el título original en inglés (tenue) seguido de la cita.
  - "Limpiar filtros" resetea también el tema.

- [ ] **Step 3:** Si todo pasa, no hay commit (sin cambios). Si surgen fixes, commitearlos con `fix(estudios): …`.

---

## Self-review (cobertura del spec)

- Taxonomía 13 temas → Task 2 (config) + Task 5 (pills). ✓
- Campos `titulo_es`+`temas` en fuentes vivas → Task 3 (base) + Task 4 (extra); ruta legacy descartada (no cargada). ✓
- Filtro Tema + AND con marca/tipo/búsqueda → Task 6 Step 2. ✓
- Conteos dinámicos → Task 6 Step 6. ✓
- Búsqueda por tema → Task 6 Step 3. ✓
- Título español protagonista + inglés en cita → Task 6 Steps 4-5. ✓
- Retrocompatibilidad (fallback) → Task 6 Steps 4-5 (`|| s.title`). ✓
- Verificación render → Task 7. ✓
