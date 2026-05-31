# Claims Registry - Ad Astra

## Methodology
- Scope: claims extracted from showcase and onboarding user-facing copy.
- A claim is any statement implying outcome, capability, speed, trust, pricing, support, integration, or delivery certainty.
- Evidence visible means code-level evidence of implementation behavior in audited repos, not business truth outside code.
- Labels:
- [IMPLEMENTADO]: claim has direct supporting implementation signal in audited code.
- [MARKETEADO]: claim present in copy without sufficient technical support in audited code.
- [INFERIDO]: semantic relation inferred from multiple surfaces.

## Full claims inventory

| ID | Claim text (exact or normalized exact) | Type | Aggressiveness | Surface | Source | Evidence visible | Label | Confidence |
|---|---|---|---|---|---|---|---|---|
| CLM-001 | Agendas online, inventarios... te hacen ganar tiempo y clientes | ahorro de tiempo | moderado | showcase hero | [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L251) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-002 | Soluciones probadas listos para personalizar | velocidad | moderado | showcase hero | [../client-showcase-overview/src/pages/Index.tsx](../client-showcase-overview/src/pages/Index.tsx#L252) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-003 | No son solo prototipos, son herramientas completas | precisión | moderado | showcase how-it-works | [../client-showcase-overview/src/components/HowItWorks.tsx](../client-showcase-overview/src/components/HowItWorks.tsx#L35) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-004 | Personalizamos en 3 a 7 dias | velocidad | moderado | showcase how-it-works | [../client-showcase-overview/src/components/HowItWorks.tsx](../client-showcase-overview/src/components/HowItWorks.tsx#L37) | NO | [MARKETEADO] | HIGH |
| CLM-005 | Tu equipo aprende en 1 hora | soporte | descriptivo | showcase how-it-works | [../client-showcase-overview/src/components/HowItWorks.tsx](../client-showcase-overview/src/components/HowItWorks.tsx#L81) | NO | [MARKETEADO] | HIGH |
| CLM-006 | Sistema online capta turnos 24/7 | automatización | moderado | showcase use-cases | [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L15) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-007 | 30% mas de reservas mensuales | revenue | agresivo | showcase use-cases | [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L16) | NO | [MARKETEADO] | HIGH |
| CLM-008 | Redujimos desperdicio 40% | revenue | agresivo | showcase use-cases | [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L38) | NO | [MARKETEADO] | HIGH |
| CLM-009 | Recuperamos 5 horas semanales | ahorro de tiempo | moderado | showcase use-cases | [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L56) | NO | [MARKETEADO] | HIGH |
| CLM-010 | Casos demostrativos basados en necesidades reales | precisión | descriptivo | showcase use-cases | [../client-showcase-overview/src/components/UseCases.tsx](../client-showcase-overview/src/components/UseCases.tsx#L79) | PARCIAL | [INFERIDO] | HIGH |
| CLM-011 | Soluciones probadas y funcionando | precisión | moderado | showcase why-choose-us | [../client-showcase-overview/src/components/WhyChooseUs.tsx](../client-showcase-overview/src/components/WhyChooseUs.tsx#L19) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-012 | Soporte en español y capacitacion al equipo | soporte | descriptivo | showcase why-choose-us | [../client-showcase-overview/src/components/WhyChooseUs.tsx](../client-showcase-overview/src/components/WhyChooseUs.tsx#L25) | NO | [MARKETEADO] | HIGH |
| CLM-013 | Implementacion rapida 3 a 7 dias | velocidad | moderado | showcase why-choose-us | [../client-showcase-overview/src/components/WhyChooseUs.tsx](../client-showcase-overview/src/components/WhyChooseUs.tsx#L31) | NO | [MARKETEADO] | HIGH |
| CLM-014 | Pago unico desde 137.000 ARS | revenue | descriptivo | showcase faq | [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L11) | NO | [MARKETEADO] | HIGH |
| CLM-015 | Mantenimiento mensual desde 35.000 ARS | revenue | descriptivo | showcase faq | [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L13) | NO | [MARKETEADO] | HIGH |
| CLM-016 | Hosting rapido y seguro (Vercel, Hostinger) | soporte | moderado | showcase faq | [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L18) | PARCIAL | [MARKETEADO] | MEDIUM |
| CLM-017 | Proceso completo entre 3 y 7 dias habiles | velocidad | moderado | showcase faq | [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L23) | NO | [MARKETEADO] | HIGH |
| CLM-018 | Incluimos capacitacion personalizada | soporte | descriptivo | showcase faq | [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L28) | NO | [MARKETEADO] | HIGH |
| CLM-019 | 100% responsive optimizado para celulares | velocidad | descriptivo | showcase faq | [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L33) | PARCIAL | [IMPLEMENTADO] | HIGH |
| CLM-020 | Demo personalizada por rubro antes de decidir | precisión | moderado | showcase faq | [../client-showcase-overview/src/components/FAQ.tsx](../client-showcase-overview/src/components/FAQ.tsx#L48) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-021 | Tu presencia online que convierte | revenue | moderado | onboarding landing service | [src/config/services.ts](src/config/services.ts#L16) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-022 | Transformar visitas en clientes desde el primer dia | revenue | agresivo | onboarding landing service | [src/config/services.ts](src/config/services.ts#L17) | NO | [MARKETEADO] | HIGH |
| CLM-023 | Tu tienda lista para vender desde el dia uno | revenue | moderado | onboarding ecommerce service | [src/config/services.ts](src/config/services.ts#L24) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-024 | Setup completo, integrado y testeado | precisión | descriptivo | onboarding ecommerce service | [src/config/services.ts](src/config/services.ts#L25) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-025 | Automatiza tu negocio con IA real | IA | moderado | onboarding bot service | [src/config/services.ts](src/config/services.ts#L32) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-026 | Un sistema que trabaja mientras vos no | automatización | moderado | onboarding bot service | [src/config/services.ts](src/config/services.ts#L33) | NO | [MARKETEADO] | HIGH |
| CLM-027 | Sin hype, con resultados medibles | precisión | moderado | onboarding bot service | [src/config/services.ts](src/config/services.ts#L33) | NO | [MARKETEADO] | HIGH |
| CLM-028 | Entrega garantizada | soporte | agresivo | onboarding hero | [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L14) | NO | [MARKETEADO] | HIGH |
| CLM-029 | 30 dias de soporte | soporte | descriptivo | onboarding hero/deliverables | [src/components/react/HeroSection.tsx](src/components/react/HeroSection.tsx#L16), [src/data/deliverables.ts](src/data/deliverables.ts#L17) | PARCIAL | [IMPLEMENTADO] | HIGH |
| CLM-030 | SEO on-page y metadatos correctos | precisión | descriptivo | onboarding deliverables | [src/data/deliverables.ts](src/data/deliverables.ts#L14) | PARCIAL | [IMPLEMENTADO] | HIGH |
| CLM-031 | Core Web Vitals en verde desde el inicio | velocidad | moderado | onboarding deliverables | [src/data/deliverables.ts](src/data/deliverables.ts#L13) | NO | [MARKETEADO] | HIGH |
| CLM-032 | NLP avanzado con GPT-4o o equivalente | IA | moderado | onboarding deliverables bot | [src/data/deliverables.ts](src/data/deliverables.ts#L28) | NO | [MARKETEADO] | HIGH |
| CLM-033 | Integracion con CRM, tickets, WhatsApp, APIs existentes | automatización | moderado | onboarding deliverables bot | [src/data/deliverables.ts](src/data/deliverables.ts#L32) | NO | [MARKETEADO] | HIGH |
| CLM-034 | Respuesta inicial en menos de 2hs | soporte | moderado | onboarding communication | [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L33) | NO | [MARKETEADO] | HIGH |
| CLM-035 | Trazabilidad 100% | precisión | agresivo | onboarding communication | [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L25) | NO | [MARKETEADO] | HIGH |
| CLM-036 | Todo documentado. Nada se pierde | precisión | moderado | onboarding communication | [src/components/react/CommunicationBentoSection.tsx](src/components/react/CommunicationBentoSection.tsx#L202) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-037 | Vendemos sistemas funcionando, no horas | precisión | moderado | onboarding faq universal | [src/data/faq.ts](src/data/faq.ts#L25) | PARCIAL | [MARKETEADO] | HIGH |
| CLM-038 | Dos rondas de feedback incluidas | soporte | descriptivo | onboarding process+faq | [src/data/process.ts](src/data/process.ts#L23), [src/data/faq.ts](src/data/faq.ts#L16) | PARCIAL | [IMPLEMENTADO] | HIGH |
| CLM-039 | Empezamos en 24hs tras respuesta | velocidad | moderado | onboarding final cta | [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L45) | NO | [MARKETEADO] | HIGH |
| CLM-040 | Respuesta en menos de 2hs - sin compromiso | soporte | moderado | onboarding final cta | [src/components/react/CTASection.tsx](src/components/react/CTASection.tsx#L121) | NO | [MARKETEADO] | HIGH |

## Contradictions and cross-surface tension

| ID | Contradiction | Surface A | Surface B | Business impact | Confidence |
|---|---|---|---|---|---|
| CDR-001 | Exploration vs closure narrative for Workana leads | showcase workana promotes Ver Proyectos and suppresses contact CTAs | onboarding workana emphasizes ACEPTAR PROPUESTA | Mixed intent signal in hottest funnel stage, lowers close rate | HIGH |
| CDR-002 | Service taxonomy mismatch | showcase primary taxonomy all/saas/landing/portfolio | onboarding offers landing/ecommerce/bot | Prospect can infer different product offering between surfaces | HIGH |
| CDR-003 | Speed promise fragmentation | showcase states 3-7 days | onboarding FAQ states landing 5-10 days, ecommerce 2-4 weeks, bot 1-3 weeks | Trust erosion due to conflicting time expectations | HIGH |
| CDR-004 | Contact authority fragmentation | showcase uses multiple WhatsApp numbers and calendly values | onboarding centralizes contact/workana at site config level | Support noise and perceived unprofessionalism | HIGH |

## Claims marked [MARKETEADO] without visible technical support

### High commercial risk
- CLM-007 30% mas de reservas mensuales
- CLM-008 Redujimos desperdicio 40%
- CLM-022 Transformar visitas en clientes desde el primer dia
- CLM-025 Automatiza tu negocio con IA real
- CLM-032 NLP avanzado con GPT-4o o equivalente
- CLM-034 Respuesta inicial en menos de 2hs
- CLM-035 Trazabilidad 100%
- CLM-039 Empezamos en 24hs

### Medium commercial risk
- CLM-004 Personalizacion en 3 a 7 dias
- CLM-013 Implementacion rapida 3 a 7 dias
- CLM-017 Desarrollo en 3 a 7 dias habiles
- CLM-031 Core Web Vitals en verde desde el inicio
- CLM-033 Integracion con CRM, tickets, WhatsApp, APIs existentes
- CLM-040 Respuesta en menos de 2hs - sin compromiso

## Registry summary metrics
- Total claims inventoried: 40
- Claims [IMPLEMENTADO]: 6
- Claims [MARKETEADO]: 32
- Claims [INFERIDO]: 2
- Claims with evidence visible NO: 22
- Claims with evidence visible PARCIAL: 18
- Confidence distribution:
- HIGH: 39
- MEDIUM: 1

## Notes for next reports
- This registry will be the numeric base for Trust Risk Score and inconsistencies ordering.
- Priority verification targets for operational fixes:
- speed promises
- IA/integration promises
- SLA/response promises
- revenue uplift claims