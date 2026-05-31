# Inconsistencies Report

## Ordering rule
- This report is sorted by business severity: CRITICA -> ALTA -> MEDIA -> BAJA.
- Each inconsistency includes exact text evidence, source locations, estimated impact, and recommended fix.

## CRITICA

### INC-CR-001 - Funnel Break (service model mismatch)
- Type: Funnel Break
- Surface A -> B: showcase taxonomy -> onboarding service variants
- Exact text A:
- "SaaS Products"
- "Landing Pages"
- "Portfolios"
- Source A: [../client-showcase-overview/src/components/ProjectFilterTabs.tsx](../client-showcase-overview/src/components/ProjectFilterTabs.tsx#L29)
- Exact text B:
- "Landing Page"
- "eCommerce"
- "Bot & Automatizacion"
- Source B: [src/config/services.ts](src/config/services.ts#L15)
- Impact estimate:
- Prospect can understand two different product catalogs depending on entry surface.
- Increases clarification friction and support load before purchase decision.
- Recommended fix:
- Define canonical service dictionary shared across both repos.
- Map showcase filters to service-intent labels (or expose service CTA bridge per filter).
- Confidence: HIGH

### INC-CR-002 - Workana Mismatch (intent shift exploration -> closure)
- Type: Workana Mismatch
- Surface A -> B: showcase workana hero -> onboarding workana hero/final CTA
- Exact text A:
- "Ver Proyectos"
- Source A: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L285)
- Exact text B:
- "ACEPTAR PROPUESTA"
- "La propuesta esta esperando tu respuesta en Workana. Responde y empezamos en 24hs."
- Source B: [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L23), [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L45)
- Impact estimate:
- Warm leads from Workana receive conflicting stage signal (browse vs accept now).
- Conversion delay and abandonment risk at decision stage.
- Recommended fix:
- Align step intent: showcase workana should include explicit "continuar a propuesta" handoff CTA.
- Add shared microcopy for stage transition.
- Confidence: HIGH

### INC-CR-003 - CTA Destination Drift (missing deterministic handoff)
- Type: CTA Destination Drift
- Surface A -> B: showcase workana CTA destination -> onboarding workana acceptance destination
- Exact text A:
- CTA target is in-page #all-projects when mode=workana.
- Source A: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L279)
- Exact text B:
- workana destination configured as https://www.workana.com/freelancer/ad-astra
- Source B: [src/config/site.ts](src/config/site.ts#L9)
- Impact estimate:
- No explicit URL bridge from showcase workana to onboarding workana or direct acceptance flow.
- Leads may remain in showcase loop without progressing to acceptance.
- Recommended fix:
- Add direct CTA in showcase workana to onboarding URL with platform=workana and service preset.
- Confidence: HIGH

### INC-CR-004 - Scope Ambiguity (AI capability framing)
- Type: Scope Ambiguity
- Surface A -> B: onboarding bot claims vs showcase capability signaling
- Exact text A:
- "Automatiza tu negocio con IA real."
- "NLP avanzado", "GPT-4o o modelo equivalente integrado"
- Source A: [src/config/services.ts](src/config/services.ts#L32), [src/data/deliverables.ts](src/data/deliverables.ts#L28)
- Exact text B:
- Hero technology icons imply broad stack capability (OpenAI/Gemini/Claude/etc.)
- Source B: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L293)
- Impact estimate:
- Unclear boundary of what is included by default vs custom integration scope.
- Can produce pre-sale expectation mismatch and post-sale renegotiation.
- Recommended fix:
- Add explicit scope matrix (included vs optional vs out-of-scope) for bot/IA deliverables across both surfaces.
- Confidence: MEDIUM

## ALTA

### INC-AL-001 - Semantic Drift in delivery times
- Type: Semantic Drift
- Surface A -> B: showcase speed promises -> onboarding FAQ timings
- Exact text A:
- "personalizar en 3 a 7 dias"
- "De la reunion inicial al lanzamiento en 3 a 7 dias"
- Source A: [../client-showcase-overview/src/components/HowItWorks.tsx](../client-showcase-overview/src/components/HowItWorks.tsx#L37), [../client-showcase-overview/src/components/WhyChooseUs.tsx](../client-showcase-overview/src/components/WhyChooseUs.tsx#L33)
- Exact text B:
- "Una landing: 5-10 dias. Un ecommerce completo: 2-4 semanas. Un bot: 1-3 semanas."
- Source B: [src/data/faq.ts](src/data/faq.ts#L12)
- Impact estimate:
- Conflicting timeline expectations reduce trust and force manual clarification.
- Recommended fix:
- Standardize timeline schema by service and use same ranges in both surfaces.
- Confidence: HIGH

### INC-AL-002 - Contact Data Inconsistency
- Type: Contact Data Inconsistency
- Surface A -> B: showcase contact surfaces internal mismatch (cross-component)
- Exact text A:
- WhatsApp 5491112345678 in footer
- Source A: [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L22)
- Exact text B:
- WhatsApp 5491151086187 in floating CTA
- WhatsApp 5491234567890 in modal CTA URL
- Source B: [../client-showcase-overview/src/components/FloatingCTA.tsx](../client-showcase-overview/src/components/FloatingCTA.tsx#L5), [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1016)
- Impact estimate:
- Perceived unprofessionalism and failed contact attempts.
- Higher support burden due to misrouted inquiries.
- Recommended fix:
- Centralize contact values in one config module and consume everywhere.
- Confidence: HIGH

### INC-AL-003 - Dead Copy Active Risk (Navbar)
- Type: Dead Copy Active
- Surface A -> B: navbar commented blocks vs active page sections
- Exact text A:
- commented nav links include "#wordpress", "#custom", "#landing", "Contacto", CTA "Hablemos"
- Source A: [../client-showcase-overview/src/components/Navbar.tsx](../client-showcase-overview/src/components/Navbar.tsx#L5)
- Exact text B:
- active sections include "#all-projects", "#como-funciona", etc.
- Source B: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L344)
- Impact estimate:
- Re-activating old nav can instantly introduce broken or misleading IA.
- Recommended fix:
- Remove legacy nav blocks or replace with validated navigation contract.
- Confidence: HIGH

### INC-AL-004 - Integration Misrepresentation
- Type: Integration Misrepresentation
- Surface A -> B: integration mentions vs implementation evidence
- Exact text A:
- "Integracion con tu stack: CRM, tickets, WhatsApp, APIs existentes"
- Source A: [src/data/deliverables.ts](src/data/deliverables.ts#L32)
- Exact text B:
- no implementation path/components for integration connectors in audited code
- Source B: audited rendering and config files
- Impact estimate:
- Overpromising integrations without visible proof can reduce trust in technical due diligence.
- Recommended fix:
- Attach integration capability states per service (supported/demoed/planned) with evidence links.
- Confidence: MEDIUM

## MEDIA

### INC-MD-001 - Translation Drift (lang=en does not localize content)
- Type: Translation Drift
- Surface A -> B: lang parser/layout vs content components
- Exact text A:
- lang parsed as es|en
- Source A: [src/lib/params.ts](src/lib/params.ts#L5)
- Exact text B:
- hero and CTA copy remain Spanish, while only html lang changes
- Source B: [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro#L17), [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L91), [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L45)
- Impact estimate:
- English-language prospects can perceive lower maturity and clarity.
- Recommended fix:
- Introduce i18n dictionaries for all user-facing copy and wire to lang param.
- Confidence: HIGH

### INC-MD-002 - Industry Taxonomy Mismatch
- Type: Industry Taxonomy Mismatch
- Surface A -> B: showcase industry config -> onboarding industry params
- Exact text A:
- "salud-bienestar", "restaurantes-gastronomia", ... (9 verticals)
- Source A: [../client-showcase-overview/src/data/industry-config.ts](../client-showcase-overview/src/data/industry-config.ts#L6)
- Exact text B:
- "retail", "startup", "local", "saas", "default"
- Source B: [src/lib/params.ts](src/lib/params.ts#L4)
- Impact estimate:
- Weak continuity from project vertical context to proposal personalization.
- Recommended fix:
- Create mapping layer vertical -> onboarding industry profile and expose in CTA bridge.
- Confidence: HIGH

### INC-MD-003 - Missing Continuity (portal narrative)
- Type: Missing Continuity
- Surface A -> B: onboarding communication/faq portal narrative vs page composition
- Exact text A:
- communication has commented "Portal del proyecto"
- faq has commented portal-proof answer
- Source A: [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L9), [src/data/faq.ts](src/data/faq.ts#L20)
- Exact text B:
- PortalPreview block is commented out in page composition
- Source B: [src/pages/index.astro](src/pages/index.astro#L24)
- Impact estimate:
- Narrative promises around project visibility are partially withdrawn but still present in nearby messaging.
- Recommended fix:
- Decide portal positioning and remove all residual references if not active.
- Confidence: HIGH

## BAJA

### INC-BJ-001 - Phrasing variance on support framing
- Type: Phrasing Variance
- Surface A -> B: showcase support language -> onboarding support language
- Exact text A:
- "Soporte en español", "mantenimiento mensual"
- Source A: [../client-showcase-overview/src/components/WhyChooseUs.tsx](../client-showcase-overview/src/components/WhyChooseUs.tsx#L25), [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L16)
- Exact text B:
- "30 dias de soporte", "handoff y soporte"
- Source B: [src/data/deliverables.ts](src/data/deliverables.ts#L17), [src/data/process.ts](src/data/process.ts#L30)
- Impact estimate:
- Low semantic damage but contributes to fragmented voice.
- Recommended fix:
- Define canonical support nomenclature by lifecycle stage.
- Confidence: HIGH

### INC-BJ-002 - Naming/capitalization style drift
- Type: Capitalization/Naming conventions
- Surface A -> B: service naming and typography
- Exact text A:
- "SaaS Products", "Landing Pages", "Portfolios"
- Source A: [../client-showcase-overview/src/components/ProjectFilterTabs.tsx](../client-showcase-overview/src/components/ProjectFilterTabs.tsx#L29)
- Exact text B:
- "Landing Page", "eCommerce", "Bot & Automatizacion"
- Source B: [src/config/services.ts](src/config/services.ts#L15)
- Impact estimate:
- Cosmetic inconsistency; slight brand coherence cost.
- Recommended fix:
- Add naming style guide and lintable content dictionary.
- Confidence: HIGH

## Severity distribution summary
- CRITICA: 4
- ALTA: 4
- MEDIA: 3
- BAJA: 2

## Fastest high-impact fixes
1. Add explicit showcase workana -> onboarding workana bridge CTA with service and industry propagation.
2. Unify timeline claims across surfaces by service.
3. Centralize contact info and remove placeholders from modal/footer/floating CTA.
4. Keep workana CTAs actionable (link/button parity) while preserving mode-specific tone.