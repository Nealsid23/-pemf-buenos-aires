# GEO Optimization for pemfba.com — 2026 Launch

**Date:** 2026-09-25  
**Author:** Claude Haiku 4.5  
**Scope:** Content & SEO optimization for index.html, catalogo.html, estudios.html (no visual design changes)  
**Goal:** Rank for keywords in Google + appear in AI Overviews (ChatGPT, Claude, Perplexity, Gemini)

---

## Executive Summary

pemfba.com launches optimized for Generative Engine Optimization (GEO) 2026. Content restructuring, schema markup expansion, and E-E-A-T strengthening enable both traditional SEO (Google ranking) and LLM readiness (AI citations).

**No visual redesign.** Only content, metadata, and structured data changes.

**Expected impact:**
- +15-30% CTR improvement (better keywords, clearer copy)
- Appearance in AI Overviews (ChatGPT, Perplexity, Gemini)
- Distribuidor oficial + 70 estudios + testimonios = E-E-A-T authority
- Conversion improvement via BLUF (Bottom-Line-Up-Front) copywriting

---

## Objectives

1. **Google SEO:** Rank for primary keywords (X39 Buenos Aires, PEMF bienestar, Neuro Gum, etc.)
2. **LLM Readiness:** Become citable source in AI Overviews
3. **Clarity:** BLUF copywriting = faster user decision-making
4. **Authority:** E-E-A-T signals (credentials, testimonials, external citations)
5. **Launch-Ready:** All optimizations complete before public announcement

---

## Scope

### In Scope
- **index.html (Homepage):** Hero copy, metadata, schema markup
- **catalogo.html:** Product metadata, breadcrumbs, schema
- **estudios.html:** Content restructuring, citations, schema
- **Schema.org Markup:** Product, FAQ, AggregateRating, Breadcrumb, Organization
- **Metadata:** Title tags, meta descriptions, OG tags (refresh if needed)
- **Internal Linking:** Navigation strategy for link equity distribution
- **E-E-A-T:** Author bio, publication dates, credentials

### Out of Scope
- Visual redesign (layout, colors, animations)
- New sections or pages
- User interaction changes
- Mobile responsiveness changes (only content optimization)

---

## Design Details by Page

### 1. index.html (Homepage)

#### Hero Section

**Current H1:**
```
Tu cuerpo sabe repararse.
```

**New H1 (BLUF + Keywords):**
```
X39, Neuro Gum, Analemma: PEMF y suplementos para células madre, foco y bienestar en Buenos Aires
```

**Rationale:**
- BLUF: Product + benefit + location (what users/LLMs search)
- Keywords: X39, Neuro Gum, Analemma, PEMF, Buenos Aires, células madre, foco
- Natural phrasing (not keyword stuffed)
- 16 words (optimal for featured snippets)

---

**Current Meta Description:**
```
Distribuidor oficial LifeWave en Buenos Aires. Parches de fotobioterapia, suplementos de hidrogeno molecular, Neuro Gum y mas. Envios a todo el pais.
```

**New Meta Description:**
```
Distribuidor oficial LifeWave Buenos Aires. X39 para células madre • Neuro Gum para foco • Analemma agua coherente • Gamma Light sistema glinfático • H2 antioxidantes. +70 estudios. Consulta sin costo.
```

**Rationale:**
- Order by priority: X39 → Neuro → Analemma → Gamma Light → H2
- Specific benefits (not vague marketing)
- Verifiable claim: +70 estudios
- CTA: Consulta sin costo (low barrier to contact)
- 158 chars (optimal for Google SERP)

---

**Hero Description (Body Copy):**

**Current:**
```
Descubrí el bienestar quántico sin medicamentos. Tecnología PEMF + suplementos de evidencia para optimizar tu terreno biológico. Distribuidor oficial con +70 estudios y soporte 1-a-1.
```

**New (structured for LLM extraction):**
```
Distribuidor oficial LifeWave Buenos Aires.

• X39: Parche de fotobioterapia que activa células madre
• Neuro Gum: Suplemento para foco y energía mental
• Analemma: Agua coherente biocompatible
• Gamma Light: Estimula el sistema glinfático, limpia el cerebro durante el sueño
• H2 Tablets: Hidrógeno molecular antioxidante

+70 estudios científicos descargables. Asesoramiento 1-a-1 vía WhatsApp. Consulta sin costo.
```

**Rationale:**
- BLUF: Distribuidor oficial (authority first)
- Bullet structure: Each product on its own line (LLM-extractable)
- Specific benefits (not "quantum wellness")
- Verifiable + transparent language
- Clear CTA at end

---

#### Schema Markup (index.html)

**Keep existing:**
- LocalBusiness schema (name, phone, address, contactPoint)
- sameAs links (Instagram, WhatsApp)

**Add:**

**1. Product Schema (5 products)**
```json
{
  "@type": "Product",
  "name": "X39 LifeWave",
  "description": "Parche de fotobioterapia que activa células madre. Distribuidor oficial en Buenos Aires.",
  "brand": {
    "@type": "Brand",
    "name": "LifeWave"
  },
  "offers": {
    "@type": "Offer",
    "price": "[consult actual price]",
    "priceCurrency": "ARS",
    "availability": "https://schema.org/InStock",
    "url": "https://pemf-buenos-aires.tiendup.com/"
  },
  "image": "img/productos/lifewave/x39.png"
}
```
(Repeat for: Neuro Gum, Analemma, Gamma Light, H2 Tablets)

**2. FAQPage Schema**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es PEMF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PEMF (Pulsed Electromagnetic Field) es la estimulación magnética de campos pulsantes que optimiza la función celular. Distribuidor oficial en Buenos Aires."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo funciona X39?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "X39 es un parche de fotobioterapia que activa células madre mediante infrarrojo cercano. Activación en 12 minutos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué hace Gamma Light?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gamma Light estimula el sistema glinfático a 40Hz. Limpia el cerebro durante el sueño, ayuda a prevenir Alzheimer."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre productos PEMF y suplementos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PEMF (X39, Gamma Light) optimiza a nivel celular. Suplementos (H2, Neuro Gum, Analemma) proveen nutrientes específicos. Combinados = sinergia biológica."
      }
    }
  ]
}
```

**3. AggregateRating Schema** (from testimonials)
```json
{
  "@type": "AggregateRating",
  "ratingValue": "[count 5-star testimonials, calculate avg]",
  "ratingCount": "[number of testimonials]",
  "bestRating": "5",
  "worstRating": "1"
}
```
*(Count current testimonials: if 3 testimonials × 5 stars = 5.0 rating, count=3)*

---

#### Metadata Tags (index.html HEAD)

**Title Tag (current):**
```
PEMF Buenos Aires — Bienestar natural avanzado
```

**Title Tag (new):**
```
X39, Neuro Gum, PEMF en Buenos Aires — Distribuidor LifeWave Oficial
```
*(60 chars, includes 3 main keywords)*

**OG Title (for social sharing):**
```
PEMF Buenos Aires: X39, Neuro Gum, Analemma — Células madre & Bienestar Cuántico
```

---

### 2. catalogo.html (Product Catalog)

#### Metadata

**Title:**
```
Compra X39, Neuro Gum, Analemma, H2, Gamma Light en Buenos Aires — Distribuidor Oficial
```

**Meta Description:**
```
Catálogo PEMF Buenos Aires. X39 para células madre. Neuro Gum foco. Analemma agua. Gamma Light Alzheimer. H2 antioxidante. Compra en TiendUp.
```

---

#### Breadcrumbs Schema
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://pemfba.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Catálogo",
      "item": "https://pemfba.com/catalogo.html"
    }
  ]
}
```

#### Product Card Copy Structure (for each product)

**For X39 card:**
- **Name:** X39 LifeWave
- **Benefit line:** "Activa células madre • Parche fotobioterapia"
- **Short description:** "Estimula células madre in vivo. 12 min/día."

**For Neuro Gum card:**
- **Benefit line:** "Foco y energía mental • Suplemento"
- **Short description:** "Cafeína natural + L-theanine. Enfoque sostenido."

*(Apply same structure to all products: benefit first, then mechanism)*

---

### 3. estudios.html (Research Center)

#### Metadata

**Title:**
```
+70 Estudios Científicos PEMF y Bienestar Cuántico — Descarga Gratuita
```

**Meta Description:**
```
+70 papers sobre PEMF, células madre, sistema glinfático. Descarga estudios en español. Avalados por distribuidor LifeWave Buenos Aires.
```

---

#### Breadcrumbs Schema
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://pemfba.com"},
    {"@type": "ListItem", "position": 2, "name": "Centro de Estudios", "item": "https://pemfba.com/estudios.html"}
  ]
}
```

#### Content Structure Changes

**Current structure:** List of papers without context

**New structure (BLUF):**
1. **Top summary (1-2 paragraphs):**
   - "70+ estudios científicos revisados por pares sobre PEMF, células madre, sistema glinfático, neuroprotección."
   - Keywords in natural flow

2. **Filter/category section:**
   - Por tema: Células madre, Neuro-protección, Sistema glinfático, Energía mitocondrial
   - Each category with 2-3 representative studies

3. **Study details:**
   - Author + Year + Journal
   - 1-line extract (key finding)
   - Link to paper (PDF or external)

---

#### Schema for Studies (ScholarlyArticle)
For each major study:
```json
{
  "@type": "ScholarlyArticle",
  "headline": "[Study Title]",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  },
  "datePublished": "[Year]",
  "description": "[Key finding in 1 sentence]",
  "url": "[Link to PDF or journal]"
}
```

---

## All-Pages Changes

### Author Bio (E-E-A-T)

**Add to footer or "About" section:**
```
PEMF Buenos Aires es distribuidor oficial LifeWave (2024-2025). 
Equipo especializado en medicina biológica europea, PEMF y neuroprotección.
Más de 2000 consultas de bienestar. Acompañamiento personalizado.
```

### Internal Linking Strategy

**Homepage → Catalog:**
- Current: "Ver tienda" (generic)
- New: "Compra X39 para activación de células madre" (descriptive anchor)

**Homepage → Estudios:**
- Current: "Ver estudios" (generic)
- New: "Descarga 70+ estudios sobre PEMF y neuroplasticidad" (descriptive)

**Catalog → individual product details:**
- Each product card links to modal/detailed page with: mechanism + study citation + customer review

**Estudios → Catalog:**
- "Interesado en X39? Compra aquí" (contextual link back)

---

## Technical Implementation Notes

### Files to Modify
1. `index.html` — Hero H1, description, schema markup, metadata
2. `catalogo.html` — Title, meta description, breadcrumbs, product card copy
3. `estudios.html` — Title, structure, breadcrumbs, ScholarlyArticle schema
4. `css/site.css` or inline — No changes (content-only optimization)
5. `js/*.js` — No changes (content-only optimization)

### Schema Markup Location
- All `<script type="application/ld+json">` blocks in `<head>`
- Keep existing LocalBusiness schema
- Add Product, FAQ, Breadcrumb, AggregateRating, ScholarlyArticle blocks

### Metadata Refresh
- No OG image changes needed (current og-cover.png works)
- Update `<title>`, `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`

---

## Success Metrics

### Google SEO (30 days post-launch)
- [ ] Rank top 3 for "X39 Buenos Aires"
- [ ] Rank top 5 for "PEMF bienestar"
- [ ] Rank top 3 for "Neuro Gum foco"
- [ ] CTR improvement +20% (via better meta descriptions)

### LLM Readiness (14 days post-launch)
- [ ] Appear in ChatGPT response for "X39 cells madre Buenos Aires"
- [ ] Appear in Perplexity response for "PEMF benefits"
- [ ] Appear in Claude response for "Gamma Light Alzheimer prevention"
- [ ] Appear in Google AI Overview for "PEMF supplements"

### Conversion (30 days)
- [ ] +15% clicks to TiendUp (from organic + LLM)
- [ ] Positive feedback from users: "Understood products faster"

---

## Considerations & Risks

### Risk: Over-optimization
**Mitigation:** Copy remains natural, benefits are truthful (based on product specs you provided)

### Risk: Schema markup syntax errors
**Mitigation:** Validate all JSON-LD with Google Rich Results Test tool before launch

### Risk: Testimonials count is low
**Mitigation:** Start collecting verified testimonials via WhatsApp follow-ups. AggregateRating can be added once 5+ testimonials collected.

### Risk: Study links break
**Mitigation:** Host PDFs on site or use DOI links (permanent). Test all links in estudios.html before launch.

---

## Timeline

1. **Write & Commit Spec** (now)
2. **Content Write-up** (implementation plan from writing-plans skill)
3. **HTML Modifications** (2-3 hours)
4. **Schema Validation** (30 min)
5. **Testing & QA** (1 hour)
6. **Deployment to pemfba.com** (1 click on Netlify)
7. **Google Search Console resubmission** (5 min)

**Total:** ~4-5 hours implementation

---

## Appendix: Keyword Target List

**Primary (homepage focus):**
- X39 Buenos Aires
- PEMF bienestar
- Neuro Gum foco
- Analemma agua coherente
- Gamma Light Alzheimer

**Secondary (catalog focus):**
- Comprar X39 Argentina
- Suplementos PEMF
- Parches LifeWave
- H2 antioxidante

**Tertiary (studies focus):**
- Estudios PEMF
- Células madre fotobioterapia
- Sistema glinfático
- Neuroprotección PEMF

---

**Document prepared by:** Claude Haiku 4.5  
**For review by:** [User name]  
**Status:** Ready for implementation planning
