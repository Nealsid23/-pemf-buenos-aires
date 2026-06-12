# Rediseño premium del sitio PEMF Buenos Aires — Diseño

**Fecha:** 2026-06-11
**Alcance de esta fase:** `deploy/index.html` primero; al validarse, el sistema visual se propaga a `catalogo.html`, `estudios.html` y `quiz.html`.
**Objetivo:** que el sitio se perciba como diseñado por un estudio profesional con años de experiencia ("sitio de USD 10.000"), usando el framework de las 6 piezas: mensaje, scroll, paleta, copy, media y estructura.

---

## 1. Decisiones tomadas (con la dueña del sitio)

| Pieza | Decisión |
|---|---|
| Mensaje | Audiencia mixta: gente curiosa que busca soluciones no convencionales y personas a las que la medicina occidental no les dio respuesta. |
| Scroll | Nivel máximo: momento firma con productos flotando y girando ligados al scroll, tarjetas con flip 3D. |
| Paleta | "Amanecer en la costa": evolución refinada de la paleta actual (no ruptura). |
| Copy | Basado en pruebas reales, sin adjetivos vacíos ni números inventados. |
| Media | Mixto: PNGs actuales + efectos ahora; prompts de IA listos para reemplazo posterior. |
| Orden | Index primero → validar → propagar a las otras 3 páginas. |

**Pruebas reales disponibles (únicas afirmaciones permitidas en el copy):**
1. Distribuidor oficial LifeWave en Argentina.
2. Biblioteca de +70 estudios científicos descargables (sección Estudios).
3. Acompañamiento personalizado 1-a-1 por WhatsApp.

**Prohibido:** contadores de clientes inventados, testimonios no verificables como prueba central, claims médicos curativos.

---

## 2. Sistema visual

### 2.1 Paleta "Amanecer en la costa" (refinada)

```css
:root {
  --cream:    #faf8f4;  /* base de fondo */
  --sky:      #67CCE9;  /* protagonista claro */
  --blue:     #1a4fb6;  /* protagonista fuerte */
  --night:    #0a1838;  /* textos y secciones de contraste (reemplaza #0f2d6b) */
  --terra:    #c85c32;  /* SOLO acentos de calidez, nunca compite con el azul */
  --gold:     #b88a2e;  /* detalles premium: tags, subrayados, micro-acentos */
  --muted:    #5b6b80;  /* texto secundario */
  --wa:       #25D366;  /* WhatsApp, intocable */
  /* Sombras azuladas, nunca grises: */
  --shadow-soft:  0 8px 30px rgba(16, 29, 61, .10);
  --shadow-deep:  0 24px 80px rgba(16, 29, 61, .22);
  --shadow-float: 0 30px 60px -12px rgba(26, 79, 182, .35);
}
```

### 2.2 Tipografía

- **Figtree** (ya en uso) para títulos, con escala más dramática: hero 80–88px desktop / 40–44px mobile, `letter-spacing: -0.035em`, peso 800–900.
- **Serif display itálica** (Fraunces o Instrument Serif, vía Google Fonts) SOLO para 1–2 palabras clave por título: "*repararse*", "*evidencia*". Es el sello tipográfico premium.
- **Noto Sans** se mantiene para cuerpo de texto.

### 2.3 Profundidad (regla de las 3 capas)

Toda sección tiene: (a) fondo con gradiente suave u "orbes" de luz desenfocados (`filter: blur(80px)` sobre círculos de color), (b) capa de contenido, (c) capa frontal de productos/elementos flotantes con sombra larga. Nada queda plano sobre blanco.

---

## 3. Estructura del nuevo index (spine)

1. **Hero "Constelación"** *(momento firma)* — Pantalla completa, gradiente amanecer + orbes de luz. Titular gigante sans + serif itálica, revelado palabra por palabra al cargar. CTA primario WhatsApp + secundario "Hacé el test" (→ quiz.html). 5–6 productos (X39, Analemma, tabletas H2, Neuro Gum, shungita, Gamma light) orbitan flotando a distintas profundidades; parallax al mouse; al scrollear se dispersan girando con fade.
2. **Barra de pruebas** — Marquee continuo solo con las 3 pruebas reales + "Envíos a todo el país".
3. **"¿Qué te trajo hasta acá?"** — 4 tarjetas (dolor crónico · insomnio · fatiga · rendimiento) con foto, flip 3D al hover mostrando productos aplicables al dorso. Clic → catálogo filtrado o quiz.
4. **Recorrido por marcas** *(scroll-pinning)* — Sección clavada en viewport: producto fijo a la derecha flotando/girando, relato de cada marca pasando a la izquierda (LifeWave → Analemma → H2 → Gamma → Neuro). Cross-fade con rotateY al cambiar de marca.
5. **Biblioteca de evidencia** — Sección oscura (--night). Papers apilados en 3D que se abanican al scrollear. Copy: "+70 estudios publicados, descargables, organizados por producto." CTA → estudios.html.
6. **Acompañamiento humano** — 3 pasos con reveal escalonado: escribís por WhatsApp → armamos tu protocolo → seguimiento real.
7. **CTA final · Quiz** — Tarjeta grande con tilt 3D y glow especular que sigue el mouse. "2 minutos, 6 preguntas, tu protocolo sugerido."
8. **FAQ + Footer** — Acordeón de objeciones (¿es seguro?, ¿cómo compro?, ¿hace falta receta?) + footer azul noche con mini-constelación como cierre circular.

Se conservan del index actual: navegación, integración WhatsApp (`wa-utils.js`), auth/carrito si aplica, SEO meta tags y datos estructurados.

---

## 4. Sistema de animación

**Stack:** librería Motion (ya cargada vía CDN) + IntersectionObserver nativo. Sin dependencias nuevas (no GSAP, no Tailwind).

| # | Sistema | Detalle |
|---|---|---|
| 1 | Constelación hero | Cada producto: flotación idle con ritmo propio (translateY senoidal, períodos 4–7s), parallax al mouse proporcional a su profundidad, dispersión con rotación y fade ligada a scroll progress. Sombra elíptica proyectada debajo que se achica al "subir". |
| 2 | Scroll-pinning marcas | `position: sticky` + scroll progress de la sección. Cross-fade + rotateY del producto al cambiar de marca. |
| 3 | Tilt 3D | Tarjetas de síntomas y CTA quiz: `perspective` + rotateX/Y siguiendo el mouse (máx ~8°), glow radial que sigue el cursor. |
| 4 | Reveals | Fade-up escalonado (stagger 80–120ms) en todo lo demás; titulares del hero palabra por palabra. |

**Degradación obligatoria:**
- `prefers-reduced-motion: reduce` → todas las animaciones se desactivan, contenido visible de entrada.
- Mobile (<768px): el pinning se reemplaza por secciones apiladas con reveals simples; la constelación se reduce a 3 productos con flotación leve, sin parallax de mouse.
- Sin JS: todo el contenido visible y legible (las animaciones solo agregan, nunca bloquean).

---

## 5. Copy (tono y muestras)

Regla: cada afirmación es una prueba verificable o una invitación concreta. Nada de "el mejor", "revolucionario", "milagroso".

- **Hero H1:** "Tu cuerpo sabe *repararse*. Nosotros traemos la *evidencia*."
- **Hero sub:** "Distribuidor oficial LifeWave en Buenos Aires, con más de 70 estudios científicos descargables y acompañamiento real por WhatsApp."
- **CTA primario:** "Empezá tu consulta — respondemos hoy"
- **CTA secundario:** "Hacé el test de 2 minutos"
- **Biblioteca:** "No te pedimos que nos creas. Te damos los papers."
- **Acompañamiento:** "Una persona real arma tu protocolo y te sigue de cerca. Sin bots, sin call centers."

El copy final de cada sección se escribe durante la implementación siguiendo esta regla.

---

## 6. Media — plan mixto

**Fase 1 (ahora):** PNGs existentes en `deploy/img/productos/` con tratamiento CSS: drop-shadow profunda azulada, glow de borde sutil, reflejo inferior con gradiente, `filter: saturate(1.05)`.

**Fase 2 (cuando la dueña genere los renders):** reemplazo directo de archivos, sin tocar código. Prompts a entregar en el plan de implementación (6 piezas):
1. Hero render: constelación de los productos reales suspendidos sobre agua al amanecer, luz celeste-dorada, fondo limpio.
2. Close-up parche X39 con textura de tela y luz rasante.
3. Close-up Analemma con cáusticas de agua.
4. Close-up tabletas H2 burbujeando en vaso, mármol blanco.
5. Close-up Neuro Gum con superficie mate y luz dura.
6. Clip 5–8s: barrido de luz sobre el parche X39 girando lento (Veo/Runway), para el hero o sección LifeWave.

---

## 7. Arquitectura técnica

**Enfoque: sistema de diseño compartido.**

```
deploy/
├── css/
│   ├── site.css          (existente, intacto hasta la propagación)
│   └── premium.css       (NUEVO: tokens, tipografía, sombras, secciones, tarjetas)
├── js/
│   ├── scroll-premium.js (NUEVO: constelación, pinning, tilt, reveals — un solo motor)
│   └── ...existentes
└── index.html            (reescrito sobre premium.css; se preserva SEO, WhatsApp, nav)
```

- `index.html` deja de llevar CSS inline masivo: estilos al `premium.css`, quedando solo overrides puntuales.
- `scroll-premium.js` expone inicializadores por data-attributes (`data-float`, `data-pin`, `data-tilt`, `data-reveal`) para que las otras 3 páginas hereden el sistema solo enlazando los dos archivos y marcando su HTML.
- El index actual se respalda como `index-backup-2026-06-11.html` fuera de `deploy/` (en `REstructuracion febrero 2026/` o carpeta de respaldos) antes de reemplazar.

**Manejo de errores:** si Motion no carga (CDN caído), `scroll-premium.js` detecta la ausencia y deja todo el contenido visible sin animación. Las imágenes llevan `loading="lazy"` salvo el hero, y dimensiones explícitas para evitar saltos de layout.

**Testing / verificación:**
- Visual: servir `deploy/` localmente y verificar hero, pinning, tilt y reveals en desktop + viewport mobile (DevTools).
- `prefers-reduced-motion` emulado en DevTools → cero movimiento.
- Lighthouse: performance ≥ 85 mobile, accesibilidad ≥ 90 (contraste de la paleta ya verificado: --night sobre --cream pasa AAA).
- Verificar que los flujos existentes no se rompan: links de WhatsApp, navegación a catálogo/estudios/quiz, meta tags OG intactos.

---

## 8. Fuera de alcance (esta fase)

- Catálogo, estudios y quiz (fase siguiente, heredan `premium.css` + `scroll-premium.js`).
- Generación de renders IA (la hace la dueña con los prompts entregados).
- Cambios de contenido comercial (precios, productos, flujo de pago Mercado Pago).
- Backend/funciones Netlify.
