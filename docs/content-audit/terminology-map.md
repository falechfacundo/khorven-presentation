# Terminology Map

## Objective
- Normalize naming across showcase and onboarding.
- Detect aliases that refer to the same concept.
- Flag terminology drift that can confuse prospects.

## Canonical dictionary (proposed)

| Domain | Canonical term | Current aliases found | Surfaces | Drift status | Confidence |
|---|---|---|---|---|---|
| Service type | landing | Landing Page, Landing Pages, Web Profesional | showcase + onboarding | PARCIAL | HIGH |
| Service type | ecommerce | eCommerce, Tienda completa, Store, Shop | onboarding (+ legacy modal generator in showcase) | ALTO drift | HIGH |
| Service type | bot-automation | Bot & Automatizacion, IA real, NLP avanzado | onboarding | ALTO drift vs showcase | HIGH |
| Product class | saas-product | SaaS Products, Dashboards, Webapp | showcase | PARCIAL mapping to onboarding | HIGH |
| Contact intent | contact | Agendar Reunion, Agendar Reunión Gratuita, Agendar llamada, Consulta por WhatsApp, Escribinos aca | showcase + onboarding | ALTO drift | HIGH |
| Conversion intent | accept-proposal | ACEPTAR PROPUESTA, Aceptar propuesta en Workana | onboarding | BAJO drift (internal), ALTO cross-site | HIGH |
| Trust proof | support-30d | 30 dias de soporte, Soporte 30 dias, post-entrega sin costo | onboarding + showcase support language | PARCIAL | HIGH |
| Delivery speed | delivery-window | 3 a 7 dias, 5-10 dias, 2-4 semanas, 1-3 semanas, empezamos en 24hs | showcase + onboarding | CRITICO drift | HIGH |
| Industry taxonomy | industry-vertical | salud-bienestar, restaurantes-gastronomia, ... | showcase | CRITICO mismatch with onboarding | HIGH |
| Industry taxonomy | industry-profile | retail, startup, local, saas, default | onboarding | CRITICO mismatch with showcase | HIGH |
| Workana mode | workana-mode | mode=workana, platform=workana, plataforma=workana | showcase + onboarding | PARCIAL (same intent, different behavior) | HIGH |
| Proof system | project-visibility | Todo documentado, trazabilidad 100%, alcance documentado | onboarding | PARCIAL due to commented portal narrative | HIGH |

## Evidence matrix by domain

## 1) Services

### 1.1 Showcase service naming
- Filters expose product classes, not proposal services:
- "Todos los Proyectos"
- "SaaS Products"
- "Landing Pages"
- "Portfolios"
- Source: [../client-showcase-overview/src/components/ProjectFilterTabs.tsx](../client-showcase-overview/src/components/ProjectFilterTabs.tsx#L23)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 1.2 Onboarding service naming
- Canonical service ids:
- landing
- ecommerce
- bot
- User-facing labels:
- "Landing Page"
- "eCommerce"
- "Bot & Automatizacion"
- Source: [src/config/services.ts](src/config/services.ts#L1)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 1.3 Service terminology drift
- Drift finding:
- showcase organizes by artifact class (saas/landing/portfolio).
- onboarding organizes by commercial service proposition (landing/ecommerce/bot).
- Severity: ALTA (semantic drift affecting funnel continuity).
- Classification: [INFERIDO]
- Confidence: HIGH

## 2) CTA terminology

### 2.1 Showcase CTA verbs
- "Ver Soluciones"
- "Agendar Reunión"
- "Ver Proyectos" (workana mode)
- "Ver Demo"
- "Consulta por WhatsApp"
- "Agendar Llamada"
- Sources:
- [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L270)
- [../client-showcase-overview/src/components/CardTemplate.tsx](../client-showcase-overview/src/components/CardTemplate.tsx#L89)
- [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L91)
- [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1057)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 2.2 Onboarding CTA verbs
- "ACEPTAR PROPUESTA"
- "Aceptar propuesta en Workana"
- "Ver portfolio ->"
- "Escribinos aca"
- Sources:
- [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L23)
- [src/config/services.ts](src/config/services.ts#L19)
- [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L241)
- [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L114)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 2.3 CTA terminology drift
- Drift finding:
- showcase emphasizes discovery and contact language.
- onboarding emphasizes acceptance/closure language.
- Severity: CRITICA on Workana-origin flow.
- Classification: [INFERIDO]
- Confidence: HIGH

## 3) Workana terminology

### 3.1 Parameter naming
- showcase uses mode=workana.
- onboarding uses platform=workana and accepts plataforma alias.
- Sources:
- [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L77)
- [src/lib/params.ts](src/lib/params.ts#L24)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 3.2 Messaging naming
- showcase workana: "Ver Proyectos" (exploration term)
- onboarding workana: "ACEPTAR PROPUESTA" (closure term)
- Sources:
- [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L285)
- [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L75)
- Drift status: CRITICO mismatch.
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

## 4) Industry terminology

### 4.1 Showcase vertical vocabulary
- salud-bienestar
- restaurantes-gastronomia
- gimnasios-fitness
- servicios-profesionales
- inmobiliarias
- servicios-hogar
- automotriz
- entretenimiento
- educacion
- Source: [../client-showcase-overview/src/data/industry-config.ts](../client-showcase-overview/src/data/industry-config.ts#L6)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 4.2 Onboarding profile vocabulary
- retail
- startup
- local
- saas
- default
- Source: [src/lib/params.ts](src/lib/params.ts#L4)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 4.3 Taxonomy naming drift
- Same conceptual axis named differently (vertical domain vs client profile archetype) without mapping table.
- Severity: MEDIA/ALTA depending flow context.
- Classification: [INFERIDO]
- Confidence: HIGH

## 5) Proof and trust terminology

### 5.1 Showcase trust terms
- "Soluciones probadas y funcionando"
- "Implementación rápida"
- "Soporte en español"
- Source: [../client-showcase-overview/src/components/WhyChooseUs.tsx](../client-showcase-overview/src/components/WhyChooseUs.tsx#L19)

### 5.2 Onboarding trust terms
- "Entrega garantizada"
- "30 dias de soporte"
- "Todo documentado. Nada se pierde."
- "Trazabilidad 100%"
- Sources:
- [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L14)
- [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L202)
- [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L25)

### 5.3 Trust naming drift
- Different lexical families for similar promises (support, visibility, reliability) without shared canonical glossary.
- Severity: MEDIA.
- Classification: [INFERIDO]
- Confidence: HIGH

## 6) Internal fragmentation hotspots

### 6.1 Contact channel naming fragmentation (showcase)
- Variants:
- "Consulta por WhatsApp"
- "Consultar por WhatsApp"
- "Consulta rápida"
- "Agendar Llamada"
- "Agendar Reunión Gratuita"
- Sources:
- [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L99)
- [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1033)
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### 6.2 Legacy vocabulary remnants
- Commented/legacy terms still present in code:
- "Portal del proyecto"
- commented FAQ portal proof text
- navbar legacy nav taxonomy (#wordpress, #custom)
- Sources:
- [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L9)
- [src/data/faq.ts](src/data/faq.ts#L20)
- [../client-showcase-overview/src/components/Navbar.tsx](../client-showcase-overview/src/components/Navbar.tsx#L6)
- Classification: [DEAD] [LEGACY]
- Confidence: HIGH

## Canonical naming recommendations

1. Services canonical set:
- landing
- ecommerce
- bot-automation
- saas-product (if retained as catalog class, not service)

2. CTA intent vocabulary:
- discover
- demo
- contact
- accept-proposal

3. Industry model strategy:
- Keep vertical taxonomy in showcase.
- Keep profile taxonomy in onboarding only if mapped explicitly.
- Add deterministic mapper vertical -> profile.

4. Workana terminology contract:
- parameter key: platform
- value: workana
- stage labels:
- stage 1 validate capability
- stage 2 accept proposal

5. Trust terms style guide:
- support duration format fixed: "30 dias de soporte"
- timeline format fixed per service range
- avoid unlabeled KPI claims without evidence descriptor.

## Quick drift score (terminology only)
- Service naming coherence: 45/100
- CTA naming coherence: 40/100
- Industry naming coherence: 30/100
- Workana naming coherence: 55/100
- Overall terminology coherence: 43/100
- Confidence: HIGH