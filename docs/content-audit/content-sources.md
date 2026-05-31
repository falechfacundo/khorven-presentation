# Content Sources - Ad Astra

## Scope and evidence policy
- Objective: separate and trace two distinct content systems in showcase, then map onboarding param-driven content mutation.
- Evidence standard: every assertion points to concrete source files and line anchors.
- Labels used: [IMPLEMENTADO], [DEAD], [LEGACY], [INFERIDO], [MARKETEADO].

## 1) Showcase Type A - Marketing hardcoded copy

### A.1 Active hardcoded marketing components

| File | Component | Exact copy extracted | Active/commented | Classification | Confidence |
|---|---|---|---|---|---|
| [../client-showcase-overview/src/components/HowItWorks.tsx](../client-showcase-overview/src/components/HowItWorks.tsx#L34) | HowItWorks | "Cada sistema que ves es una solución probada y funcionando... personalizar en 3 a 7 días." | Active | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/HowItWorks.tsx](../client-showcase-overview/src/components/HowItWorks.tsx#L52) | HowItWorks | "Reunión (30 min)", "Desarrollo (3 a 7 días)", "Capacitación y Lanzamiento" | Active | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L6) | UseCases | Cases hardcoded by industry: "Salud", "Restaurantes", "Fitness" with before/after arrays and testimonial quotes | Active | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L78) | UseCases | "Casos demostrativos basados en necesidades reales del sector" | Active | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L157) | UseCases | "¿Querés ser nuestro próximo caso de éxito?" + production-validation claim | Active | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/WhyChooseUs.tsx](../client-showcase-overview/src/components/WhyChooseUs.tsx#L13) | WhyChooseUs | "Experiencia con negocios locales", "Soluciones probadas y funcionando", "Soporte en español", "Implementación rápida" | Active | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L11) | FAQ | Pricing claim: "pago único desde $137.000 ARS" and monthly maintenance "desde $35.000 ARS" | Active | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L16) | FAQ | Infra claim: "hosting en servidores rápidos y seguros (Vercel, Hostinger)" | Active | [MARKETEADO] visible claim, infra not evidenced in same component | MEDIUM |
| [../client-showcase-overview/src/components/FloatingCTA.tsx](../client-showcase-overview/src/components/FloatingCTA.tsx#L5) | FloatingCTA | Hardcoded WhatsApp number: 5491151086187 and message copy | Active outside workana mode | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L20) | Footer | Hardcoded contact object: email info@ad-astra.me, whatsapp 5491112345678, calendly falechfacundo/30min | Active in default mode | [IMPLEMENTADO] | HIGH |
| [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L30) | Footer | Safe-mode footer copy: "Muestra de capacidades" with commercial CTA removed | Active in mode=workana | [IMPLEMENTADO] | HIGH |

### A.2 Commented or dead marketing copy

| File | Component | Dead/commented content | Classification | Confidence |
|---|---|---|---|---|
| [../client-showcase-overview/src/components/Navbar.tsx](../client-showcase-overview/src/components/Navbar.tsx#L42) | Navbar | Logo, full nav links, CTA "Hablemos", mobile menu all commented | [DEAD] [LEGACY] | HIGH |
| [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L35) | FAQ | Commented Q/A: "¿Qué pasa si quiero hacer cambios más adelante?" | [DEAD] | HIGH |
| [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L415) | Index | Alternate projects rendering block with ProjectImageCard commented | [DEAD] | HIGH |
| [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L340) | Index | FeaturedBentoGrid render commented | [DEAD] | HIGH |

## 2) Showcase Type B - Catalog JSON and taxonomy

### B.1 Source inventory
- Catalog root: [../client-showcase-overview/src/data/data/projects](../client-showcase-overview/src/data/data/projects)
- File count: 38 JSON files (command-based count).
- Loader/normalizer: [../client-showcase-overview/src/data/templates.tsx](../client-showcase-overview/src/data/templates.tsx#L16)
- Taxonomy and client-friendly naming: [../client-showcase-overview/src/data/industry-config.ts](../client-showcase-overview/src/data/industry-config.ts#L1)

Classification: [IMPLEMENTADO]. Confidence: HIGH.

### B.2 Representative JSON structure (sample)
- Sample file: [../client-showcase-overview/src/data/data/projects/health-appointment-hub.json](../client-showcase-overview/src/data/data/projects/health-appointment-hub.json#L1)
- Sample contains top-level keys:
- id
- proyecto: url, nombre, tipo, estado, industria
- descripcion: corta, larga, problema_que_resuelve
- caracteristicas
- tecnologias: frontend, backend, hosting, otras
- tags
- visual
- funcionalidad: requiere_auth, tiene_dashboard, funcionalidades_destacadas
- showcase_data: thumbnail_sugerido, demo_url, categoria_showcase, orden_prioridad, mostrar_en_home
- seo
- notas_adicionales
- timestamp

Classification: [IMPLEMENTADO]. Confidence: HIGH.

### B.3 Field mapping: JSON -> normalized template -> UI consumption

| JSON source field | Template field in loader | UI usage |
|---|---|---|
| proyecto.nombre | name, clientName | Card title in [../client-showcase-overview/src/components/CardTemplate.tsx](../client-showcase-overview/src/components/CardTemplate.tsx#L97), modal heading in [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1) |
| descripcion.corta | description | Card description in [../client-showcase-overview/src/components/CardTemplate.tsx](../client-showcase-overview/src/components/CardTemplate.tsx#L98), modal fallback text |
| descripcion.larga | longDescription | Modal long copy path in [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1) |
| descripcion.problema_que_resuelve | problemSolved | Card problem badge in [../client-showcase-overview/src/components/CardTemplate.tsx](../client-showcase-overview/src/components/CardTemplate.tsx#L101), modal benefit block |
| showcase_data.thumbnail_sugerido | image/thumbnail/video | Card image in [../client-showcase-overview/src/components/CardTemplate.tsx](../client-showcase-overview/src/components/CardTemplate.tsx#L67), modal media block in [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1100) |
| proyecto.url or showcase_data.demo_url | demoUrl | Card demo CTA in [../client-showcase-overview/src/components/CardTemplate.tsx](../client-showcase-overview/src/components/CardTemplate.tsx#L78), modal demo CTA in [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L996) |
| tags | tags | Card tags and modal tags, plus tagLabels mapping in [../client-showcase-overview/src/data/templates.tsx](../client-showcase-overview/src/data/templates.tsx#L123) |
| funcionalidad.funcionalidades_destacadas | featuresHighlighted | Card feature bullets in [../client-showcase-overview/src/components/CardTemplate.tsx](../client-showcase-overview/src/components/CardTemplate.tsx#L111) |
| caracteristicas | features | Modal feature list in [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L960) |
| proyecto.industria | industryOriginal + normalized industry | Filtering/grouping in [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L138) |
| proyecto.tipo | category + projectType | Project filter tabs all/saas/landing/portfolio in [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L175) |

Classification: [IMPLEMENTADO]. Confidence: HIGH.

### B.4 Completeness check on critical UI fields
- Method: parsed all 38 JSON files and checked thumbnail, demo URL fallback chain, tags array.
- Result:
- missing thumbnail_sugerido: 0
- missing demo URL (proyecto.url or showcase_data.demo_url): 0
- missing tags: 0

Classification: [IMPLEMENTADO]. Confidence: HIGH.

## 3) Onboarding content sources and param mutation map

### 3.1 Declared source and actual source split
- Declared data source exists: [src/data/deliverables.ts](src/data/deliverables.ts#L10), [src/data/faq.ts](src/data/faq.ts#L9), [src/data/process.ts](src/data/process.ts#L1)
- Additional source for core service messaging: [src/config/services.ts](src/config/services.ts#L12)
- Additional hardcoded copy in islands: [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L14), [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L39), [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L8)

Conclusion: source of truth is split. Classification: [IMPLEMENTADO] split architecture. Confidence: HIGH.

### 3.2 Param -> processor -> altered content

| Param | Processor | Content altered |
|---|---|---|
| service | [src/lib/params.ts](src/lib/params.ts#L21) then [src/pages/index.astro](src/pages/index.astro#L17) | Hero headline/subheadline/ctaLabel from [src/config/services.ts](src/config/services.ts#L12); Deliverables set from [src/data/deliverables.ts](src/data/deliverables.ts#L10); FAQ append set from [src/data/faq.ts](src/data/faq.ts#L30) |
| industry | [src/lib/params.ts](src/lib/params.ts#L22) | Parsed and defaulted only; no direct audited copy mutation in rendered blocks |
| client | [src/lib/params.ts](src/lib/params.ts#L28) | Appended hero personalization "para {client}." in [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L106) |
| lang | [src/lib/params.ts](src/lib/params.ts#L23) | html lang attribute only in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro#L17); copy stays Spanish in audited components |
| platform / plataforma | [src/lib/params.ts](src/lib/params.ts#L24) | Hero and final CTA mode switch (link vs non-link and helper copy visibility) in [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L160) and [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L48) |

Classification: service/client/platform [IMPLEMENTADO], lang partial [IMPLEMENTADO], industry UI impact [INFERIDO]. Confidence: HIGH.

## 4) Exact onboarding variant copy extraction

### 4.1 Service variants (from config)
- landing headline: "Tu presencia online que convierte." in [src/config/services.ts](src/config/services.ts#L16)
- ecommerce headline: "Tu tienda lista para vender desde el dia uno." in [src/config/services.ts](src/config/services.ts#L24)
- bot headline: "Automatiza tu negocio con IA real." in [src/config/services.ts](src/config/services.ts#L32)
- shared ctaLabel across all services: "Aceptar propuesta en Workana" in [src/config/services.ts](src/config/services.ts#L19)

Classification: [IMPLEMENTADO]. Confidence: HIGH.

### 4.2 Workana vs default copy
- Hero primary CTA label resolved as:
- workana: "ACEPTAR PROPUESTA"
- default: service.ctaLabel
- Source: [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L23)
- Final CTA label and behavior similarly resolved in [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L25)
- workana helper copy: "Acepta la propuesta desde Workana para avanzar" in [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L121)
- default helper copy: "Respuesta en menos de 2hs - Sin compromiso" in [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L121)

Classification: [IMPLEMENTADO]. Confidence: HIGH.

### 4.3 lang=en vs lang=es
- Source behavior: [src/lib/params.ts](src/lib/params.ts#L29) + [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro#L17)
- Observed effect: document language attribute changes, visible proposal copy in audited islands does not branch by lang.

Classification: [IMPLEMENTADO] metadata-level only, [INFERIDO] semantic translation gap. Confidence: HIGH.

## 5) Copy present in both projects (cross-site overlap inventory)

| Theme / phrase family | Showcase source | Onboarding source | Notes |
|---|---|---|---|
| Rapid delivery window | "3 a 7 días" in [../client-showcase-overview/src/components/HowItWorks.tsx](../client-showcase-overview/src/components/HowItWorks.tsx#L37) and [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L23) | Service FAQ timing ranges in [src/data/faq.ts](src/data/faq.ts#L12) | Same promise family, different granularity |
| Support period | FAQ/maintenance framing in showcase footer+FAQ [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L80) | "30 dias de soporte" in [src/data/deliverables.ts](src/data/deliverables.ts#L17) and hero badges [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L16) | Repeated value proposition across both surfaces |
| Workana acceptance intent | Mode-adapted non-commercial safe mode in showcase [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L77) | Explicit "ACEPTAR PROPUESTA" and Workana URL in [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L25) and [src/config/site.ts](src/config/site.ts#L9) | Same funnel intent, implemented differently |
| WhatsApp contact path | Floating button and footer in [../client-showcase-overview/src/components/FloatingCTA.tsx](../client-showcase-overview/src/components/FloatingCTA.tsx#L5), [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L99) | Communication copy explicitly references WhatsApp dependency risks in [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L204) | Overlap is conceptual, not same CTA structure |

Classification: [INFERIDO] as semantic overlap map. Confidence: MEDIUM.

## 6) Extra source-risk findings captured during extraction
- Contact data is fragmented in showcase:
- Footer WhatsApp: 5491112345678 in [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L22)
- Floating CTA WhatsApp: 5491151086187 in [../client-showcase-overview/src/components/FloatingCTA.tsx](../client-showcase-overview/src/components/FloatingCTA.tsx#L5)
- Modal WhatsApp hardcoded placeholder number: 5491234567890 in [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1016)
- Modal calendly placeholder: tu-usuario in [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1041)

Classification: [IMPLEMENTADO] drift risk, [LEGACY] placeholder remnants. Confidence: HIGH.

- Onboarding has commented operational copy that indicates prior portal-centric narrative:
- In FAQ: old portal proof text commented in [src/data/faq.ts](src/data/faq.ts#L20)
- In communication section: commented portal channel in [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L9)

Classification: [DEAD] [LEGACY]. Confidence: HIGH.