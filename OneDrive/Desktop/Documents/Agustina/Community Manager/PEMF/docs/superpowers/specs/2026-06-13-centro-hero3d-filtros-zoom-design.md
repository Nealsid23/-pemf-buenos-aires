# Diseño — Centro de Información: filtros compactos, hero 3D por sección, sync del landing y zoom

**Fecha:** 2026-06-13
**Páginas:** `pagina/deploy/estudios.html`, `pagina/deploy/index.html`
**JS:** `js/page-estudios.js` (mod) + nuevos `js/papers-data.js`, `js/hero-scenes.js`, `js/img-zoom.js`, `js/evidence-sync.js`

Mejoras al Centro de Información (estudios) en cuatro frentes independientes, más una sincronización del landing con la biblioteca. Restricción transversal del proyecto: **público mayoritariamente mayor** → todo el movimiento autónomo debe ser sutil, lento, 60 fps, y respetar `prefers-reduced-motion` (ver [[pemf-rediseno-premium]], "modo calmo").

---

## A. Filtros — barra compacta con menús desplegables

### Problema actual
La vista Evidencia tiene 3 filas de pills apiladas (Producto/Diseño/Tema) + buscador → alto y recargado, sobre todo en móvil. El pill "Todos N" se repite por fila (redundante). Cada vista (Evidencia/Biblioteca/Guías/Fuentes) tiene distinta cantidad de filas → inconsistente.

### Diseño
Estructura única para las 4 vistas:
1. **Buscador** a lo ancho (arriba).
2. **Fila de botones-menú**, uno por dimensión de la vista activa:
   - Evidencia: `Producto ▾` `Diseño ▾` `Tema ▾`
   - Biblioteca: `Tema ▾`
   - Guías: `Categoría ▾`
   - Fuentes: `Tipo ▾` `Campo ▾`
3. **Fila de chips activos** removibles (✕) + botón **"Limpiar todo"** (visible solo si hay ≥1 filtro activo o búsqueda).

Comportamiento del menú:
- El botón muestra la dimensión; si hay valor elegido distinto de "Todos", muestra `Dimensión: Valor` y queda resaltado.
- Al abrir, se despliega un **panel** (popover) anclado al botón con las opciones en lista vertical, **cada una con su conteo** (los `.pc` actuales). La opción activa va marcada.
- Cierra al elegir, al clic afuera, o con `Escape`. Solo un panel abierto a la vez.
- Móvil: panel a ancho cómodo (máx. ~92vw), con scroll interno si excede alto.

Implementación:
- **Motor genérico de dropdown** en `page-estudios.js`: una función `buildFilterMenu(dim)` que recibe `{stateKey, getOptions, colorFor, onChange}` y arma botón + panel + maneja apertura/cierre/teclado. Se instancia para cada dimensión de cada vista.
- Se eliminan del HTML las filas de pills y los pills "Todos N". El markup nuevo de cada vista: contenedor `.filterbar` con `.filterbar-search`, `.filterbar-menus` (botones) y `.filterbar-chips`.
- El estado y los conteos no cambian de semántica (mismos `aBrand/aType/aTemaPaper/aTema/aGuiaCat/aTipoFuente/aCampo`, mismo `getFiltered`, misma lógica de conteo — solo cambia cómo se eligen y se muestran).
- CSS nuevo en el `<style>` de estudios.html para `.filterbar*`, `.fb-btn`, `.fb-panel`, `.fb-chip`.

---

## B. Hero 3D con personalidad por sección

Controlador `js/hero-scenes.js` (nuevo) que monta una **escena distinta por vista** sobre los orbes ambientales existentes, dentro de un contenedor `#hero-scene` agregado al `.hero`. Un único loop `requestAnimationFrame` mueve todas las capas con: **scroll** (profundidad/parallax), **leve parallax de mouse** (tilt), y **deriva mínima** autónoma. Solo `transform` (GPU) + `will-change`. Guard de `prefers-reduced-motion` → escena estática.

La escena se cambia cuando cambia la vista (engancha con `transitionHero`/el view-toggle). Tinte de color del hero por vista: Evidencia azul, Biblioteca violeta, Guías ámbar, Fuentes verde.

### Escenas
1. **Evidencia** — inspirada en la sección "BIBLIOTECA DE EVIDENCIA" del landing (`.ev-fan`): **abanico de hojas-paper translúcidas** usando imágenes reales de portada (`portada` de los papers), ~6-8, a distintas profundidades (`translateZ`) con leve `rotateY`, parallax al scrollear. Más cantidad y más prolijo que el landing.
2. **Biblioteca** — **estante 3D** con las **tapas reales de los 13 libros** (`lecturas[].cover`, `img/libros/*-cover.jpg`). Al scrollear avanza **libro por libro**: el del foco viene al frente y centrado (`translateZ` mayor, escala 1), los vecinos retroceden y se atenúan. Mapeo scroll→índice de libro con suavizado.
3. **Guías** — **arco circadiano luminoso**: un sol recorre un arco de lado a lado según el scroll (posición angular = progreso), con degradé de fondo día→atardecer y rayos suaves; pequeños glifos de protocolo (gota, onda, pulmones, hoja) flotan a distintas profundidades. Representa el eje luz/circadiano de las guías.
4. **Fuentes** — **constelación de mentes**: discos flotando con las **personas mencionadas** (`profesionales[]`): monograma con iniciales (color por campo) o foto si `foto` existe; derivan y pasan al scrollear con profundidad, unidas por líneas tenues entre nodos cercanos.

Cada escena se define en un config `HERO_SCENES` (datos + cómo se construye el DOM de sus capas), y el controlador expone `setScene(view)`.

Rendimiento: límite de capas por escena (≤10), `transform` cacheado, sin reflow en el loop. En móvil, reducir cantidad de capas (~60%) por performance.

---

## C. Sincronización del landing con la biblioteca

### Problema
`index.html` sección `#evidencia` tiene datos hardcodeados: `70+ estudios` (`data-countup="70"`), `7 marcas`, y 5 imágenes fijas en `.ev-fan`. No refleja la biblioteca real (hoy 101 papers).

### Fuente única de datos
- Mover el array base de 43 papers desde `page-estudios.js` a **`js/papers-data.js`** (nuevo) como `window.STUDIES_BASE = [...]`. `page-estudios.js` arranca con `const studies=[...(window.STUDIES_BASE||[])]` y mantiene el resto igual (incluido el fetch de `papers-extra.json`). Es un script síncrono cargado **antes** de `page-estudios.js` → sin cambio de timing.
- `papers-extra.json` queda como está (58, ya con `titulo_es`/`temas`).

### Landing
- `index.html` incluye `js/papers-data.js` + un nuevo `js/evidence-sync.js` que: lee `window.STUDIES_BASE`, hace `fetch('js/papers-extra.json')`, y al resolver:
  - **Total** = base.length + extra.length → setea el número de "estudios descargables" (con sufijo "+", redondeado hacia abajo a la decena: p. ej. 101 → "100+").
  - **Marcas** = cantidad de `brand` distintos (excluyendo `all`) → "marcas con respaldo".
  - **Abanico** `.ev-fan`: reemplaza las 5 imágenes fijas por una **selección representativa** de portadas reales (papers con `portada`, repartidos entre marcas; cantidad configurable, default 6).
- Fallback: si el fetch falla o no hay datos, se conserva el contenido HTML actual (no romper el landing).

> Nota de alcance: extraer el array base a `papers-data.js` es un movimiento de datos (cortar/pegar) sin cambio de lógica; se verifica que estudios siga mostrando 101 y filtrando bien.

---

## D. Zoom + arrastre en la evidencia abierta

Módulo `js/img-zoom.js` (nuevo): controlador reutilizable que se adjunta a un contenedor de imagen y maneja zoom/pan.

- **Desktop**: rueda = zoom centrado en el cursor; arrastrar (mouse down + move) = pan cuando `scale>1`; doble clic = reset.
- **Móvil**: pellizco (2 dedos) = zoom; 1 dedo = pan cuando `scale>1`; doble tap = reset. Cuando `scale===1` en la biblioteca, el swipe horizontal del carrusel sigue funcionando.
- Estado por instancia: `scale` (límite 1–5), `tx/ty` (clampeados a los bordes). Aplica `transform: translate() scale()` a la `<img>`.
- Se adjunta a `#m-paper-portada img` (portada del paper) y a las imágenes del carrusel `#m-book-gallery`.
- **Reset** de zoom al cerrar el modal y al abrir otra evidencia.
- Pointer Events + `wheel`; `touch-action:none` en el contenedor para controlar gestos.

---

## Archivos

| Archivo | Cambio |
|---|---|
| `js/papers-data.js` | **nuevo** — `window.STUDIES_BASE` (43 base movidos desde page-estudios.js) |
| `js/page-estudios.js` | usa `STUDIES_BASE`; reemplaza wiring de pills por motor de dropdowns + chips; engancha hero-scenes y img-zoom |
| `estudios.html` | markup de filtros nuevo; `#hero-scene`; `<script>` de papers-data, hero-scenes, img-zoom; CSS de filtros y escenas |
| `js/hero-scenes.js` | **nuevo** — escenas 3D por vista + controlador 60 fps |
| `js/img-zoom.js` | **nuevo** — zoom/pan reutilizable |
| `js/evidence-sync.js` | **nuevo** — sincroniza la sección #evidencia del landing con la biblioteca |
| `index.html` | incluye papers-data.js + evidence-sync.js; la sección #evidencia se hidrata dinámicamente |

## Verificación
- Playwright (node) headless sobre ambas páginas:
  - estudios: filtros nuevos abren/cierran, eligen, muestran chips, "Limpiar todo" resetea; conteos correctos; sigue habiendo 101 papers; 0 errores de consola.
  - hero: las 4 escenas montan sus capas al cambiar de vista; sin errores; con `prefers-reduced-motion` quedan estáticas.
  - modal: zoom con rueda cambia `scale`; pan cuando ampliado; reset al cerrar.
  - index: la sección #evidencia muestra el total real (≥100+), marcas reales y abanico de portadas reales.
- Revisión visual por capturas (desktop + móvil).

## Fuera de alcance
- Rediseño del resto del landing.
- Otras páginas (catálogo, quiz).
- Cambios en el contenido/datos de los papers (ya hechos en la feature previa).
