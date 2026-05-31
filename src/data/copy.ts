export type ServiceId = 'landing' | 'ecommerce' | 'bot';
export type Lang = 'es' | 'en';
export type Platform = 'default' | 'workana';

export interface ServiceConfig {
  id: ServiceId;
  label: string;
  headline: string;
  subheadline: string;
  faqKey: ServiceId;
  ctaLabel: string;
}

export interface Deliverable {
  icon: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  duration: string;
}

interface HeroVariantCopy {
  studioLabel: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  portfolioLabel: string;
  clientPrefix: string;
}

interface HeroLangCopy {
  default: HeroVariantCopy;
  workana: HeroVariantCopy;
}

interface DeliverableInsight {
  problem: string;
  outcome: string;
  eta: string;
  before: string;
  after: string;
}

interface CommunicationPanelCopy {
  title: string;
  bullets: string[];
  meta: string[];
}

interface PortalMilestone {
  label: string;
  status: 'done' | 'active' | 'pending';
  date: string;
}

interface PortalPayment {
  label: string;
  amount: string;
  status: 'paid' | 'pending';
}

interface PortalMessage {
  from: string;
  text: string;
  time: string;
  isUs: boolean;
}

interface PortalFile {
  name: string;
  size: string;
  type: string;
}

export interface CopySchema {
  meta: {
    titlePrefix: string;
    ogImagePath: string;
  };
  services: Record<ServiceId, { label: string; faqKey: ServiceId }>;
  hero: Record<ServiceId, Record<Lang, HeroLangCopy>>;
  guarantees: {
    hero: string[];
    deliverables: Array<{ text: string; sub: string }>;
  };
  process: {
    section: {
      kicker: string;
      title: string;
      subtitle: string;
    };
    steps: ProcessStep[];
  };
  deliverables: {
    section: {
      kicker: string;
      title: string;
      subtitle: string;
      guaranteesTitle: string;
      deliverablePrefix: string;
      impactTitle: string;
      impactProblemLabel: string;
      impactOutcomeLabel: string;
      impactEtaLabel: string;
      impactHint: string;
    };
    byService: Record<ServiceId, Deliverable[]>;
    insights: Record<string, DeliverableInsight>;
  };
  communication: {
    section: {
      kicker: string;
      title: string;
      subtitle: string;
      hubKicker: string;
      hubTitle: string;
      hubBody: string;
      kpisKicker: string;
      interactiveLabel: string;
      resolvedProblemsLabel: string;
    };
    channels: {
      active: string[];
      // [LEGACY] 'Portal del proyecto',
    };
    rituals: string[];
    kpis: Array<{ label: string; value: string }>;
    cards: {
      sla: { kicker: string; title: string; description: string; tone: 'teal' };
      channels: { kicker: string; title: string; description: string; tone: 'accent' };
      rituals: { kicker: string; description: string; tone: 'accent' };
      ritualsTitleSuffix: string;
    };
    panels: Record<'sla' | 'channels' | 'rituals', CommunicationPanelCopy>;
    dead: {
      // [DEAD] Historical drafts preserved from component comments.
      channelsBulletsLegacy: string[];
    };
  };
  faq: {
    section: {
      kicker: string;
      title: string;
      subtitle: string;
    };
    universal: FAQItem[];
    byService: Record<ServiceId, FAQItem[]>;
    dead: {
      // [DEAD] Replaced answer kept for reference.
      universalAnswersLegacy: string[];
    };
  };
  cta: {
    default: {
      kicker: string;
      title: string;
      body: string;
      helper: string;
      label: string;
      labelSuffix: string;
      emailPrompt: string;
      emailLabel: string;
    };
    workana: {
      kicker: string;
      title: string;
      body: string;
      helper: string;
      label: string;
      labelSuffix: string;
    };
  };
  portal: {
    section: {
      kicker: string;
      title: string;
      subtitle: string;
      accessNote: string;
      linkLabel: string;
      browserPath: string;
      projectLabel: string;
    };
    tabs: Array<{ id: 'roadmap' | 'archivos' | 'pagos' | 'mensajes'; label: string }>;
    roadmapTitle: string;
    filesTitle: string;
    paymentsTitle: string;
    messagesTitle: string;
    statuses: {
      paid: string;
      pending: string;
    };
    milestones: PortalMilestone[];
    payments: PortalPayment[];
    messages: PortalMessage[];
    files: PortalFile[];
  };
}

const copy: CopySchema = {
  meta: {
    titlePrefix: 'Ad Astra -',
    ogImagePath: '/og-image.png',
  },
  services: {
    landing: { label: 'Landing Page', faqKey: 'landing' },
    ecommerce: { label: 'eCommerce', faqKey: 'ecommerce' },
    bot: { label: 'Bot & Automatizacion', faqKey: 'bot' },
  },
  hero: {
    landing: {
      es: {
        default: {
          studioLabel: 'Ad Astra - Digital Studio',
          title: 'Tu presencia online que convierte.',
          subtitle: 'Diseno, velocidad y estructura pensados para transformar visitas en clientes desde el primer dia.',
          ctaLabel: 'Aceptar propuesta en Workana',
          portfolioLabel: 'Ver portfolio ->',
          clientPrefix: ' para ',
        },
        workana: {
          studioLabel: 'Ad Astra - Digital Studio',
          title: 'Tu presencia online que convierte.',
          subtitle: 'Diseno, velocidad y estructura pensados para transformar visitas en clientes desde el primer dia.',
          ctaLabel: 'ACEPTAR PROPUESTA',
          portfolioLabel: 'Ver portfolio ->',
          clientPrefix: ' para ',
        },
      },
      en: {
        default: {
          // TODO: traducir
          studioLabel: '',
          // TODO: traducir
          title: '',
          // TODO: traducir
          subtitle: '',
          // TODO: traducir
          ctaLabel: '',
          // TODO: traducir
          portfolioLabel: '',
          clientPrefix: '',
        },
        workana: {
          // TODO: traducir
          studioLabel: '',
          // TODO: traducir
          title: '',
          // TODO: traducir
          subtitle: '',
          // TODO: traducir
          ctaLabel: '',
          // TODO: traducir
          portfolioLabel: '',
          clientPrefix: '',
        },
      },
    },
    ecommerce: {
      es: {
        default: {
          studioLabel: 'Ad Astra - Digital Studio',
          title: 'Tu tienda lista para vender desde el dia uno.',
          subtitle: 'Setup completo, integrado y testeado. Sin excusas para no empezar a vender.',
          ctaLabel: 'Aceptar propuesta en Workana',
          portfolioLabel: 'Ver portfolio ->',
          clientPrefix: ' para ',
        },
        workana: {
          studioLabel: 'Ad Astra - Digital Studio',
          title: 'Tu tienda lista para vender desde el dia uno.',
          subtitle: 'Setup completo, integrado y testeado. Sin excusas para no empezar a vender.',
          ctaLabel: 'ACEPTAR PROPUESTA',
          portfolioLabel: 'Ver portfolio ->',
          clientPrefix: ' para ',
        },
      },
      en: {
        default: {
          // TODO: traducir
          studioLabel: '',
          // TODO: traducir
          title: '',
          // TODO: traducir
          subtitle: '',
          // TODO: traducir
          ctaLabel: '',
          // TODO: traducir
          portfolioLabel: '',
          clientPrefix: '',
        },
        workana: {
          // TODO: traducir
          studioLabel: '',
          // TODO: traducir
          title: '',
          // TODO: traducir
          subtitle: '',
          // TODO: traducir
          ctaLabel: '',
          // TODO: traducir
          portfolioLabel: '',
          clientPrefix: '',
        },
      },
    },
    bot: {
      es: {
        default: {
          studioLabel: 'Ad Astra - Digital Studio',
          title: 'Automatiza tu negocio con IA real.',
          subtitle: 'Un sistema que trabaja mientras vos no. Sin hype, con resultados medibles.',
          ctaLabel: 'Aceptar propuesta en Workana',
          portfolioLabel: 'Ver portfolio ->',
          clientPrefix: ' para ',
        },
        workana: {
          studioLabel: 'Ad Astra - Digital Studio',
          title: 'Automatiza tu negocio con IA real.',
          subtitle: 'Un sistema que trabaja mientras vos no. Sin hype, con resultados medibles.',
          ctaLabel: 'ACEPTAR PROPUESTA',
          portfolioLabel: 'Ver portfolio ->',
          clientPrefix: ' para ',
        },
      },
      en: {
        default: {
          // TODO: traducir
          studioLabel: '',
          // TODO: traducir
          title: '',
          // TODO: traducir
          subtitle: '',
          // TODO: traducir
          ctaLabel: '',
          // TODO: traducir
          portfolioLabel: '',
          clientPrefix: '',
        },
        workana: {
          // TODO: traducir
          studioLabel: '',
          // TODO: traducir
          title: '',
          // TODO: traducir
          subtitle: '',
          // TODO: traducir
          ctaLabel: '',
          // TODO: traducir
          portfolioLabel: '',
          clientPrefix: '',
        },
      },
    },
  },
  guarantees: {
    hero: ['Entrega garantizada', '30 dias de soporte'],
    deliverables: [
      { text: 'Testeado antes de entrega', sub: 'Revisamos todo antes de cerrar el proyecto' },
      { text: 'Revisiones incluidas', sub: 'Minimo 2 rondas de feedback sin cargo' },
      {
        text: 'Soporte 30 dias incluido',
        sub: 'Cualquier problema post-entrega lo resolvemos sin cargo. A partir del dia 31, el mantenimiento continuo tiene costo mensual.',
      },
    ],
  },
  process: {
    section: {
      kicker: 'Proceso',
      title: 'Como trabajamos',
      subtitle: 'Estructura clara de inicio a fin. Sin sorpresas.',
    },
    steps: [
      {
        number: '01',
        title: 'Brief inicial',
        desc: 'Definimos el alcance exacto, objetivos y entregables. Nada queda en el aire.',
        duration: '24hs',
      },
      {
        number: '02',
        title: 'Propuesta tecnica',
        desc: 'Recibis un documento de scope detallado con tecnologias, plazos y entregables.',
        duration: '24-48hs',
      },
      {
        number: '03',
        title: 'Desarrollo iterativo',
        desc: 'Avance visible con updates regulares y entregables documentados en cada iteracion.',
        duration: 'segun proyecto',
      },
      {
        number: '04',
        title: 'Revisiones',
        desc: 'Dos rondas de feedback incluidas. El proyecto no cierra hasta que estes conforme.',
        duration: '48-72hs c/u',
      },
      {
        number: '05',
        title: 'Entrega + soporte',
        desc: 'Deploy completo, documentacion de uso y 30 dias de soporte post-entrega.',
        duration: '30 dias',
      },
    ],
  },
  deliverables: {
    section: {
      kicker: 'Entregables',
      title: 'Que recibis exactamente',
      subtitle: 'Sin letra chica. Todo lo que forma parte del proyecto.',
      guaranteesTitle: 'Garantias incluidas',
      deliverablePrefix: 'Entregable',
      impactTitle: 'Impacto del entregable',
      impactProblemLabel: 'Problema:',
      impactOutcomeLabel: 'Resultado:',
      impactEtaLabel: 'Tiempo:',
      impactHint: 'Hover o tap para ver impacto',
    },
    byService: {
      landing: [
        { icon: 'Monitor', title: 'Diseno responsive', desc: 'Adaptado a todos los dispositivos y pantallas' },
        { icon: 'Zap', title: 'Performance optimizada', desc: 'Core Web Vitals en verde desde el inicio' },
        { icon: 'Search', title: 'SEO on-page', desc: 'Estructura y metadatos configurados correctamente' },
        { icon: 'FormInput', title: 'Captacion de leads', desc: 'Formularios conectados directo a tu flujo de trabajo' },
        { icon: 'Code2', title: 'Codigo limpio', desc: 'Facil de mantener, escalar e integrar' },
        { icon: 'GraduationCap', title: 'Capacitacion incluida', desc: 'Una sesion de handoff para que vos y tu equipo usen el sistema desde el primer dia' },
        { icon: 'ShieldCheck', title: '30 dias de soporte', desc: 'Post-entrega sin costo adicional' },
      ],
      ecommerce: [
        { icon: 'ShoppingCart', title: 'Tienda completa', desc: 'Catalogo, carrito y checkout integrados' },
        { icon: 'CreditCard', title: 'Pasarelas de pago', desc: 'Locales e internacionales configuradas' },
        { icon: 'Truck', title: 'Gestion de envios', desc: 'Zonas y reglas de despacho configuradas' },
        { icon: 'Users', title: 'Cuentas de cliente', desc: 'Historial de pedidos y perfil incluidos' },
        { icon: 'BarChart2', title: 'Analytics integrado', desc: 'Metricas de ventas desde el dia uno' },
        { icon: 'GraduationCap', title: 'Capacitacion incluida', desc: 'Una sesion de handoff para que vos y tu equipo usen el sistema desde el primer dia' },
        { icon: 'ShieldCheck', title: '30 dias de soporte', desc: 'Post-entrega sin costo adicional' },
      ],
      bot: [
        { icon: 'MessageSquare', title: 'NLP avanzado', desc: 'GPT-4o o modelo equivalente integrado' },
        { icon: 'GitBranch', title: 'Flujos configurables', desc: 'Editables sin tocar una linea de codigo' },
        { icon: 'UserCheck', title: 'Escalado a humano', desc: 'Automatico cuando el bot detecta complejidad' },
        { icon: 'Settings2', title: 'Panel de administracion', desc: 'Control total sin conocimiento tecnico' },
        { icon: 'Plug', title: 'Integracion con tu stack', desc: 'CRM, tickets, WhatsApp, APIs existentes' },
        { icon: 'GraduationCap', title: 'Capacitacion incluida', desc: 'Una sesion de handoff para que vos y tu equipo usen el sistema desde el primer dia' },
        { icon: 'ShieldCheck', title: '30 dias de soporte', desc: 'Post-entrega sin costo adicional' },
      ],
    },
    insights: {
      'Performance optimizada': {
        problem: 'El sitio tarda en cargar y se pierde atencion en los primeros segundos.',
        outcome: 'Mejor retencion inicial y navegacion mas fluida desde la primera vista.',
        eta: 'Checklist tecnico desde la primera iteracion.',
        before: 'Carga lenta, rebote alto y paginas pesadas.',
        after: 'Carga agil, experiencia estable y recorrido continuo.',
      },
      'SEO on-page': {
        problem: 'Paginas sin estructura semantica ni metadata consistente.',
        outcome: 'Arquitectura clara para indexacion y mejor lectura por buscadores.',
        eta: 'Implementado durante desarrollo + verificacion en entrega.',
        before: 'Contenido sin contexto SEO y headings desordenados.',
        after: 'Metadatos, headings y jerarquia listos para indexar.',
      },
      'Captacion de leads': {
        problem: 'Consultas sin trazabilidad y formularios desconectados.',
        outcome: 'Leads ordenados y conectados al flujo comercial en tiempo real.',
        eta: 'Configurado en etapa de integraciones.',
        before: 'Leads dispersos en correo y mensajes sin seguimiento.',
        after: 'Leads centralizados con origen y estado visible.',
      },
    },
  },
  communication: {
    section: {
      kicker: 'Comunicacion',
      title: 'Todo documentado. Nada se pierde.',
      subtitle: 'La comunicacion del proyecto tiene estructura. Sin depender de que alguien responda un WhatsApp.',
      hubKicker: 'Hub de comunicacion',
      hubTitle: 'Un solo lugar para decidir, seguir y cerrar.',
      hubBody: 'Nada queda suelto: decisiones, bloqueos y avances se registran en el mismo flujo. Evitamos perdida de contexto y tiempos muertos.',
      kpisKicker: 'KPIs operativos',
      interactiveLabel: 'Interactivo',
      resolvedProblemsLabel: 'Problemas resueltos',
    },
    channels: {
      active: ['Email', 'Chat interno', 'Videocall'],
      // [LEGACY] 'Portal del proyecto',
    },
    rituals: [
      'Kickoff inicial con alcance y riesgos',
      'Update async cada 48-72hs',
      'Revision de hitos con feedback',
      'Cierre con handoff y soporte',
    ],
    kpis: [
      { label: 'SLA respuesta', value: '<2hs' },
      { label: 'Frecuencia update', value: '48-72hs' },
      { label: 'Trazabilidad', value: '100%' },
      { label: 'Canales activos', value: '3' },
    ],
    cards: {
      sla: {
        kicker: 'SLA',
        title: '< 2hs',
        description: 'Tiempo objetivo de primera respuesta durante horario operativo.',
        tone: 'teal',
      },
      channels: {
        kicker: 'Canales',
        title: '4 canales activos',
        description: 'Cada canal tiene un uso claro para evitar ruido y perdida de contexto.',
        tone: 'accent',
      },
      rituals: {
        kicker: 'Rituales',
        description: 'Ritmo de trabajo con outputs concretos en cada fase.',
        tone: 'accent',
      },
      ritualsTitleSuffix: ' hitos de comunicacion',
    },
    panels: {
      sla: {
        title: 'Regla operativa SLA',
        bullets: [
          'Respuesta inicial en menos de 2hs en horario operativo.',
          'Bloqueos criticos se escalan el mismo dia.',
          'Si hay dependencia externa, se informa ETA y plan alterno.',
        ],
        meta: ['Tiempos de respuesta inciertos', 'Bloqueos criticos sin priorizacion'],
      },
      channels: {
        title: 'Uso recomendado por canal',
        bullets: [
          'Email: resumenes ejecutivos y aprobaciones.',
          'Chat interno: bloqueos cortos y coordinacion rapida.',
        ],
        meta: ['Mensajes dispersos entre canales', 'Decisiones sin trazabilidad'],
      },
      rituals: {
        title: 'Cadencia de trabajo',
        bullets: [
          'Cada ritual deja un output concreto y verificable.',
          'El avance se mide por hitos, no por mensajes enviados.',
          'El cierre incluye handoff y plan de soporte.',
        ],
        meta: ['Reuniones sin entregable claro', 'Avance medido por percepcion'],
      },
    },
    dead: {
      channelsBulletsLegacy: [
        // [DEAD] 'Portal: decisiones y entregables versionados.',
      ],
    },
  },
  faq: {
    section: {
      kicker: 'FAQ',
      title: 'Preguntas frecuentes',
      subtitle: 'Las dudas mas comunes, respondidas antes de que las hagas.',
    },
    universal: [
      {
        q: 'Cuanto tarda el proyecto?',
        a: 'Depende del alcance. Una landing: 3-7 dias. Un ecommerce: 3-7 dias. Un bot: 3-7 dias. Siempre recibis una estimacion precisa antes de arrancar.',
      },
      {
        q: 'Que pasa si no me gusta el resultado?',
        a: 'Trabajamos con revisiones incluidas en el scope. Antes de cerrar el proyecto pasamos por al menos dos rondas de feedback. No entregamos hasta que estes conforme.',
      },
      {
        q: 'Como se que entregas lo que prometes?',
        a: 'Trabajamos con alcance documentado, hitos claros y actualizaciones regulares para que siempre tengas visibilidad real del avance.',
      },
      {
        q: 'Por que elegirte a vos y no a otro?',
        a: 'No vendemos horas. Vendemos sistemas funcionando con documentacion, soporte y estructura. La diferencia es visible cuando lo comparas con cualquier otra propuesta.',
      },
      {
        q: 'Que pasa despues de los 30 dias de soporte?',
        a: 'Los 30 dias de soporte post-entrega estan incluidos en el proyecto sin costo adicional. Si despues necesitas mantenimiento continuo, actualizaciones o mejoras, lo gestionamos con un plan mensual. Lo definimos juntos segun tus necesidades reales.',
      },
    ],
    byService: {
      landing: [
        {
          q: 'Incluye hosting y dominio?',
          a: 'El hosting puede ser el tuyo o lo configuramos nosotros. El dominio tambien. Lo definimos en el brief inicial sin costo adicional.',
        },
        {
          q: 'Puedo actualizar el contenido despues?',
          a: 'Si. Si lo necesitas, el sitio puede incluir un CMS simple para que lo gestiones vos. Se define en el scope inicial.',
        },
      ],
      ecommerce: [
        {
          q: 'Puedo cargar mis propios productos?',
          a: 'Si. Al final del proyecto tenes acceso total al backend y una guia de uso. Tu tienda, tu control.',
        },
        {
          q: 'Que plataforma usan?',
          a: 'WooCommerce, PrestaShop o Shopify segun tu volumen, presupuesto y necesidades. Lo definimos en el brief inicial.',
        },
      ],
      bot: [
        {
          q: 'Funciona con mis sistemas actuales?',
          a: 'Si. Integramos con WhatsApp, web, CRM o cualquier API estandar. Evaluamos tu stack en el brief inicial.',
        },
        {
          q: 'Necesito saber programar para administrarlo?',
          a: 'No. El panel de administracion esta disenado para que cualquier persona del equipo edite respuestas y flujos sin tocar codigo.',
        },
      ],
    },
    dead: {
      universalAnswersLegacy: [
        // [DEAD] 'Todo vive en el portal del proyecto: roadmap, milestones, pagos y archivos. Podes ver el estado real en cualquier momento. No hay actualizaciones por WhatsApp que se pierden.',
      ],
    },
  },
  cta: {
    default: {
      kicker: 'Todo claro?',
      title: 'Listo para arrancar.',
      body: 'La propuesta esta esperando tu respuesta en Workana. Responde y empezamos en 24hs.',
      helper: 'Respuesta en menos de 2hs - Sin compromiso',
      label: 'Aceptar propuesta en Workana',
      labelSuffix: ' ->',
      emailPrompt: 'Tenes alguna pregunta antes?',
      emailLabel: 'Escribinos aca.',
    },
    workana: {
      kicker: 'Todo claro?',
      title: 'Listo para arrancar.',
      body: 'La propuesta esta esperando tu respuesta en Workana. Responde y empezamos en 24hs.',
      helper: 'Acepta la propuesta desde Workana para avanzar',
      label: 'ACEPTAR PROPUESTA',
      labelSuffix: '',
    },
  },
  portal: {
    section: {
      kicker: 'Sistema de gestion',
      title: 'Tu proyecto, organizado desde el dia uno',
      subtitle: 'No mas actualizaciones perdidas en WhatsApp. Todo en un portal dedicado: roadmap, archivos, pagos y comunicacion centralizada.',
      accessNote: 'Acceso disponible en portal.ad-astra.me al confirmar el proyecto',
      linkLabel: 'Ver el portal ->',
      browserPath: 'portal.ad-astra.me / proyectos / landing-ecommer...',
      projectLabel: 'Mi proyecto',
    },
    tabs: [
      { id: 'roadmap', label: 'Roadmap' },
      { id: 'archivos', label: 'Archivos' },
      { id: 'pagos', label: 'Pagos' },
      { id: 'mensajes', label: 'Mensajes' },
    ],
    roadmapTitle: 'Progreso del proyecto',
    filesTitle: 'Archivos del proyecto',
    paymentsTitle: 'Estado de pagos',
    messagesTitle: 'Conversacion del proyecto',
    statuses: {
      paid: 'Pagado',
      pending: 'Pendiente',
    },
    milestones: [
      { label: 'Brief y scope aprobado', status: 'done', date: 'Dia 1' },
      { label: 'Diseno aprobado', status: 'done', date: 'Dia 4' },
      { label: 'Desarrollo completado', status: 'active', date: 'Dia 9' },
      { label: 'Revision y ajustes', status: 'pending', date: 'Dia 12' },
      { label: 'Entrega final + deploy', status: 'pending', date: 'Dia 14' },
    ],
    payments: [
      { label: 'Adelanto 50% - Inicio', amount: '$250', status: 'paid' },
      { label: 'Saldo 50% - Entrega', amount: '$250', status: 'pending' },
    ],
    messages: [
      {
        from: 'Ad Astra',
        text: 'El diseno esta listo para revision. Podes verlo en el link compartido.',
        time: 'Hace 2hs',
        isUs: true,
      },
      {
        from: 'Vos',
        text: 'Perfecto, lo reviso hoy. Se puede cambiar el color del header?',
        time: 'Hace 1hs',
        isUs: false,
      },
      {
        from: 'Ad Astra',
        text: 'Si, sin problema. Hacemos el ajuste y subimos una nueva version.',
        time: 'Hace 45m',
        isUs: true,
      },
    ],
    files: [
      { name: 'Brief_Proyecto.pdf', size: '84 KB', type: 'pdf' },
      { name: 'Diseno_v2_aprobado.fig', size: '2.1 MB', type: 'fig' },
      { name: 'Contrato_firmado.pdf', size: '120 KB', type: 'pdf' },
      { name: 'Assets_logos.zip', size: '4.3 MB', type: 'zip' },
    ],
  },
};

export const DEFAULT_SERVICE: ServiceId = 'landing';

export const SERVICES: Record<ServiceId, ServiceConfig> = {
  landing: {
    id: 'landing',
    label: copy.services.landing.label,
    headline: copy.hero.landing.es.default.title,
    subheadline: copy.hero.landing.es.default.subtitle,
    faqKey: copy.services.landing.faqKey,
    ctaLabel: copy.hero.landing.es.default.ctaLabel,
  },
  ecommerce: {
    id: 'ecommerce',
    label: copy.services.ecommerce.label,
    headline: copy.hero.ecommerce.es.default.title,
    subheadline: copy.hero.ecommerce.es.default.subtitle,
    faqKey: copy.services.ecommerce.faqKey,
    ctaLabel: copy.hero.ecommerce.es.default.ctaLabel,
  },
  bot: {
    id: 'bot',
    label: copy.services.bot.label,
    headline: copy.hero.bot.es.default.title,
    subheadline: copy.hero.bot.es.default.subtitle,
    faqKey: copy.services.bot.faqKey,
    ctaLabel: copy.hero.bot.es.default.ctaLabel,
  },
};

export default copy;