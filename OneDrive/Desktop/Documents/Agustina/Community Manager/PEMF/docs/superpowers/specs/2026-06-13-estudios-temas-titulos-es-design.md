# Diseño — Subcategorías temáticas + títulos en español (Argentina) para la vista de Evidencia Científica

**Fecha:** 2026-06-13
**Página:** `pagina/deploy/estudios.html` + `pagina/deploy/js/page-estudios.js` + `pagina/deploy/js/papers-extra.json`
**Objetivo:** permitir filtrar los papers de la vista "Evidencia Científica" por tema, y mostrar los títulos en español de Argentina (conservando el original en inglés en la cita).

## Contexto

La página de estudios ya tiene diseño premium completo (hero con orbes, ticker de journals, barra de filtros con pills, grilla de tarjetas animadas, modal). Hoy la vista "Evidencia Científica" filtra los papers solo por **Producto** (`brand`) y **Diseño de estudio** (`type`), más una búsqueda de texto. No hay filtro temático, y los títulos se muestran en inglés.

### Fuentes de datos de los papers (se fusionan en el array `studies`)
1. **Array base inline** — `js/page-estudios.js:416` (`const studies=[…]`), 43 papers (LifeWave 14, MyVitalC 2, DrinkHRW 6, Analemma 3, Gamma 8, Neuro Gum 10).
2. **`js/papers-extra.json`** — 58 papers de OPTIMIZE, fetch + `studies.push(...)` en `:1688`.
3. **Ruta legacy** — evento `optimizeDataLoaded` → `studies.push(...optimizePapers)` en `:1637` (vía `centro-data-loader.js`). **A verificar si sigue activa**; si carga papers, también deben recibir los nuevos campos para evitar inconsistencias/duplicados.

Total estimado: ~101 papers.

### Puntos de render relevantes
- Tarjeta de paper: título en `:846` (`<h3 class="card-title">${s.title}</h3>`), cita en `:847`.
- Modal: título en `:1419` (`m-title = s.title`), cita en `:1420` (`m-cite = s.cite`).
- Filtro: `getFiltered()` en `:733`, estado `aBrand/aType/q` en `:722`.
- Búsqueda: `match()` en `:729`.
- Config de marca/tipo: `B` (`:2`) y `T` (`:11`).

## Taxonomía de temas (13, multi-tema)

Cada paper lleva **1-3 temas**. Filtro de "un tema a la vez" (clic en un tema muestra los papers que lo incluyen).

| Slug | Label | Cubre |
|---|---|---|
| `campos-em` | Campos EM y PEMF | bioelectricidad, magnetismo, geomagnetismo, ELF, Schumann |
| `agua-h2` | Agua estructurada e hidrógeno | EZ water/Pollack, Analemma, H₂ molecular |
| `mitocondria` | Mitocondria y energía celular | ATP, biogénesis, transferencia mitocondrial, C60 |
| `luz` | Luz y fotobiomodulación | luz roja/NIR, óxido nítrico, espectro lumínico |
| `quantum` | Biología cuántica | túnel cuántico, coherencia, pares de radicales, spin |
| `fascia` | Fascia y tejido conectivo | colágeno, mecanotransducción, semiconductor líquido |
| `biocampo` | Biocampo, consciencia y coherencia | Reiki, toque terapéutico, HeartMath, sincronía, sonido |
| `longevidad` | Longevidad y epigenética | telómeros, sirtuinas, NAD+, GHK-Cu |
| `neuro` | Neurociencia y cognición | gamma 40 Hz, Alzheimer, cafeína, L-teanina, vitaminas B/D |
| `sueno` | Sueño y sistema nervioso | insomnio, VFC, tono parasimpático, GABA |
| `dolor` | Dolor y regeneración | IceWave, cicatrización, regeneración tisular |
| `antioxidantes` | Antioxidantes y estrés oxidativo | glutatión, ROS, capacidad antioxidante |
| `microbioma` | Microbioma y metabolismo | disbiosis, síndrome metabólico |

## Modelo de datos

Se agregan dos campos a cada paper, en las tres fuentes:

```js
titulo_es: "…",        // título en español de Argentina (rioplatense, claro, término técnico intacto)
temas: ["campos-em"],  // array de 1-3 slugs de la taxonomía
```

- El `title` original en inglés **se conserva** (se muestra en la cita del modal).
- Nuevo config `TemasPapers` en `page-estudios.js` (label + color `c` + fondo `bg` + texto `tc`), siguiendo el patrón de `B`/`T`. Reutiliza la paleta existente.
- **Retrocompatibilidad:**
  - Render de título: `s.titulo_es || s.title` (cae al inglés si falta).
  - Filtro temático: paper sin `temas` solo aparece bajo "Todos".

## UI / comportamiento

1. **Nueva fila de filtro "Tema"** en `#papers-filters` de `estudios.html`, debajo de Producto y Diseño, con la misma estructura de pills (`.filter-group` + `.pills-scroll#tema-papers-pills`). Pill "Todos" + 13 temas.
2. **Filtro** (`getFiltered`): añadir condición `(aTema==='all' || (s.temas && s.temas.includes(aTema)))`, combinada con AND a los filtros existentes.
3. **Estado**: nueva variable `aTemaPaper='all'` y su handler de clic (siguiendo el patrón de `aBrand`/`aType`).
4. **Conteos dinámicos** (`.pc`): cada pill de tema muestra cuántos papers lo incluyen, recalculado como marca/tipo.
5. **Búsqueda** (`match`): sumar los labels de `s.temas` al array buscable.
6. **Tarjeta** (`:846`): `${s.titulo_es || s.title}` como título (mantiene cursiva Lora).
7. **Modal** (`:1419-1420`): `m-title = s.titulo_es || s.title`; `m-cite` antepone el título original en inglés en estilo tenue, seguido de la cita de autores/journal.

## Ejecución del contenido (~101 papers)

- **Agentes en paralelo** (skill `dispatching-parallel-agents`): lotes de ~15-20 papers. Cada agente recibe título inglés + método + resultados y devuelve `titulo_es` (español rioplatense) + `temas`.
- Consolidación y revisión de coherencia de temas y tono antes de escribir.
- Aplicar a `papers-extra.json`, array base y ruta legacy + código de UI.

## Verificación

- Levantar la página; confirmar que renderiza sin errores de consola.
- Filtro por cada tema muestra el subconjunto correcto; conteos cuadran.
- Títulos en español en tarjeta y modal; inglés visible en la cita del modal.
- Filtros de marca/tipo/búsqueda siguen funcionando combinados con tema.
- Sin duplicados por la ruta legacy.

## Fuera de alcance

- Rediseño visual de la página (ya está premium).
- Otras vistas (Biblioteca, Guías, Fuentes) — la Biblioteca ya tiene su propio filtro `tema`.
- Las otras páginas del sitio (catálogo, quiz) — trabajo posterior de propagación premium.
