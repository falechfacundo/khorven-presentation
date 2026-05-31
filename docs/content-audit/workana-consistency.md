# Workana Consistency - Cross-Surface Audit

## Executive verdict
- Estado general: INCONSISTENTE
- Confidence: HIGH
- Motivo principal: ambos proyectos detectan un modo Workana, pero implementan objetivos distintos.
- showcase modo workana reduce comercialidad y deriva a exploración de portfolio.
- onboarding platform=workana empuja aceptación de propuesta sin salida explícita en CTA principal (render no clickeable).

## Scope audited for Workana behavior
- Showcase mode toggle: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L77)
- Showcase footer safe mode branch: [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L30)
- Showcase floating CTA behavior: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L476)
- Showcase modal safeMode branch: [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1013)
- Onboarding platform parse/default: [src/lib/params.ts](src/lib/params.ts#L24)
- Onboarding hero platform branch: [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L160)
- Onboarding final CTA platform branch: [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L48)
- Workana destination config: [src/config/site.ts](src/config/site.ts#L9)

## 1) What changes exactly in Workana mode?

### 1.1 showcase.ad-astra.me with ?mode=workana

Changed:
- Hero secondary CTA text changes from "Agendar Reunión" to "Ver Proyectos", and target changes from #contacto to #all-projects.
- Evidence: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L279), [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L285)
- Floating WhatsApp CTA is hidden in workana mode.
- Evidence: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L476)
- Footer switches to safe mode version and removes commercial CTA block (meeting + WhatsApp contact actions).
- Evidence: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L472), [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L30)
- Modal suppresses extra commercial CTA actions when safeMode is true.
- Evidence: [../client-showcase-overview/src/components/ModalTemplate.tsx](../client-showcase-overview/src/components/ModalTemplate.tsx#L1013)

Unchanged:
- Full project grid, cards, modal demo CTA, and marketing sections remain visible.
- Evidence: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L344), [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L447)

Classification: [IMPLEMENTADO]
Confidence: HIGH

### 1.2 onboarding.ad-astra.me with &platform=workana

Changed:
- platform parser resolves to workana variant.
- Evidence: [src/lib/params.ts](src/lib/params.ts#L30)
- Hero primary CTA becomes non-link visual button (motion span) labeled ACEPTAR PROPUESTA.
- Evidence: [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L160)
- Hero secondary CTA Ver portfolio -> is removed in workana mode.
- Evidence: [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L224)
- Final CTA also becomes non-link visual button in workana mode, with helper text focused on acceptance in Workana.
- Evidence: [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L48), [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L121)
- Default-mode email reassurance text is removed in workana mode.
- Evidence: [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L111)

Unchanged:
- Core narrative blocks (process, deliverables, communication, FAQ) remain.
- Evidence: [src/pages/index.astro](src/pages/index.astro#L22)

Classification: [IMPLEMENTADO]
Confidence: HIGH

## 2) What remains the same between modes?

### showcase
- Core portfolio browsing experience and demo access persist.
- Hero title/body copy remains unchanged.
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### onboarding
- Service-specific content remains driven by service param regardless of platform.
- Process and FAQ structure remains unchanged.
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

## 3) Tone and claim alignment across Workana variants

### Alignment check
- showcase workana tone: de-escalates direct selling and pivots to capability showcase.
- onboarding workana tone: high-intent closure language (accept proposal now).

Assessment:
- Narrative intent mismatch exists.
- A user in Workana journey receives exploration cues in showcase and decision/closure cues in onboarding.
- No explicit bridge copy in showcase saying "continue in onboarding with platform=workana".

Classification: [INFERIDO]
Confidence: HIGH

## 4) Features/services mentioned in one surface but absent in the other (Workana path)

Findings:
- Onboarding workana explicitly frames proposal acceptance flow; showcase workana does not mention proposal acceptance mechanics.
- Showcase workana keeps project demos as primary action; onboarding workana emphasizes acceptance action.
- Onboarding service variants include ecommerce and bot as first-class narrative options; showcase filters are all/saas/landing/portfolio and do not expose bot/ecommerce as service-level CTA categories.

References:
- [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L45)
- [../client-showcase-overview/src/components/ProjectFilterTabs.tsx](../client-showcase-overview/src/components/ProjectFilterTabs.tsx#L23)

Classification: [IMPLEMENTADO] for observed surfaces, [INFERIDO] for funnel effect
Confidence: HIGH

## 5) Does showcase workana CTA lead to onboarding workana?

Result:
- No explicit CTA or URL handoff found from showcase workana to onboarding with platform=workana.
- In workana mode showcase hero CTA goes to #all-projects (in-page), not to onboarding.

Evidence:
- [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L279)
- [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L285)

Classification: [IMPLEMENTADO] (absence of bridge in audited code)
Confidence: HIGH

## Consistency score for Workana behavior (qualitative)
- showcase local consistency (inside project): PARTIAL
- onboarding local consistency (inside project): PARTIAL
- cross-site consistency (showcase -> onboarding): LOW
- Overall status: INCONSISTENTE

## Inconsistencies and conversion impact (Workana-origin leads)

### Critical 1
- Type: Workana Mismatch
- Surface A -> B: showcase workana hero -> onboarding workana hero/cta
- Text A: "Ver Proyectos"
- Text B: "ACEPTAR PROPUESTA"
- Refs: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L285), [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L23)
- Impact: Users may stay in exploration mode longer and miss acceptance action timing.
- Business effect: lower conversion velocity from Workana warm leads.
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### Critical 2
- Type: CTA Destination Drift
- Surface A -> B: showcase workana CTA path -> onboarding expected acceptance flow
- A destination: #all-projects (in-page)
- B expected destination: Workana proposal acceptance context
- Refs: [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L279), [src/config/site.ts](src/config/site.ts#L9)
- Impact: no deterministic bridge from capability browsing to proposal acceptance.
- Business effect: drop-offs before contract decision.
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### High 1
- Type: Interaction inconsistency in workana CTA rendering
- Surface A -> B: onboarding default vs onboarding workana
- A default: clickable link to workanaCta
- B workana: non-clickable span styled as CTA
- Refs: [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L78), [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L48)
- Impact: ambiguous affordance in workana mode.
- Business effect: preventable friction at final conversion step.
- Classification: [IMPLEMENTADO]
- Confidence: HIGH

### High 2
- Type: Commercial suppression asymmetry
- Surface A -> B: showcase workana removes contact channels while onboarding workana removes alternate reassurance text
- Refs: [../client-showcase-overview/src/components/Footer.tsx](../client-showcase-overview/src/components/Footer.tsx#L30), [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L111)
- Impact: reduced fallback options if user is not ready to accept immediately.
- Business effect: higher abandonment among hesitant-but-qualified leads.
- Classification: [IMPLEMENTADO]
- Confidence: MEDIUM

## Recommended fixes for Workana alignment

1. Add deterministic handoff from showcase workana to onboarding workana.
- Add explicit CTA with platform=workana and service preselection options.
- Priority: Critical

2. Normalize workana CTA interaction semantics in onboarding.
- In workana mode, primary CTA should remain actionable (link/button) unless intentionally disabled with explanatory copy.
- Priority: Critical

3. Align narrative progression.
- showcase workana: add short copy block that reframes portfolio exploration as step before acceptance.
- onboarding workana: keep closure intent but include one lightweight fallback action.
- Priority: High

4. Create shared Workana messaging contract.
- Define canonical wording for stage labels: discovery, validation, acceptance.
- Store in a shared config entity to avoid drift.
- Priority: High

## Final status
- CONSISTENTE | PARCIAL | INCONSISTENTE: INCONSISTENTE
- Confidence: HIGH
- Main conversion risk from Workana: warm leads face mixed intent signals and weak cross-site handoff before final acceptance.