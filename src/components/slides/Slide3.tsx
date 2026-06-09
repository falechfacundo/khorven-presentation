import { motion } from 'framer-motion';
import { Fragment } from 'react';

const itemVariant = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  visible: (i: number) => ({
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 * i }
  })
};

function ConnectorLine({ index }: { index: number }) {
  return (
    <motion.div
      className="w-0.5 bg-gradient-to-b from-rosa/40 to-rosa/10"
      style={{ height: 18 }}
      initial={{ height: 0 }}
      animate={{ height: 18 }}
      transition={{ duration: 0.4, delay: 0.2 * (index + 1) }}
    />
  );
}

function Icon({ type }: { type: string }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'text-rosa drop-shadow-[0_0_8px_rgba(246,100,150,0.5)]'
  };

  switch (type) {
    case 'growth':
      return (
        <svg {...commonProps}>
          <path d="M12 2v20M2 12h20M7 7l10 10M7 17l10-10" />
          <path d="M12 2v6M12 18v4" />
        </svg>
      );
    case 'content':
      return (
        <svg {...commonProps}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M7 8h10M7 12h10M7 16h4" />
        </svg>
      );
    case 'visibility':
      return (
        <svg {...commonProps}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11z" />
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h2m13 0h2" />
        </svg>
      );
    case 'queries':
      return (
        <svg {...commonProps}>
          <path d="M12 2v20M2 12h20M7 7l10 10M7 17l10-10" />
          <path d="M12 2v6M12 18v4" />
        </svg>
      );
    case 'investment':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v6M12 18v4M7 7l10 10M7 17l10-10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
    default:
      return null;
  }
}

const steps = [
  {
    title: 'Querés crecer',
    subtitle: 'Pero sin estrategia y recursos limitados',
    icon: 'growth',
    bg: '#0f172a',
    border: '#ffffff',
    text: '#ffffff'
  },
  {
    title: 'Grabas contenido',
    subtitle: '3 videos/mes, sin calendario estratégico',
    icon: 'content',
    bg: '#0f172a',
    border: '#ffffff',
    text: '#ffffff'
  },
  {
    title: 'Pero nadie lo ve',
    subtitle: 'Promedio de 10 views por video',
    icon: 'visibility',
    bg: '#0f172a',
    border: '#ffffff',
    text: '#ffffff'
  },
  {
    title: 'Sin consultas',
    subtitle: 'Cero nuevos clientes',
    icon: 'queries',
    bg: '#0f172a',
    border: '#ffffff',
    text: '#ffffff'
  },
  {
    title: 'Inversión sin sistema',
    subtitle: 'USD 500 gastados en campañas',
    icon: 'investment',
    bg: '#7f1d1d',
    border: '#7f1d1d',
    text: '#ffffff'
  }
];

export default function Slide3() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-navy overflow-hidden px-8 py-4">
      <motion.h3
        className="text-base text-white/60 text-center mb-8"
        style={{ fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Esto probablemente te pasa
      </motion.h3>

      <div className="flex flex-col items-center w-full max-w-[800px]">
        {steps.map((step, i) => {
          const width = `${100 - i * 12}%`;
          return (
            <Fragment key={i}>
              <motion.div
                className="px-6 py-4 mb-2 rounded-xl border-2 backdrop-blur-sm"
                style={{ background: step.bg, borderColor: step.border, width }}
                variants={itemVariant}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-4 w-full">
                  <Icon type={step.icon} />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold" style={{ color: step.text, fontFamily: 'var(--font-body)' }}>
                      {step.title}
                    </span>
                    <span className="text-sm text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                      {step.subtitle}
                    </span>
                  </div>
                </div>
              </motion.div>
              {i < steps.length - 1 && <ConnectorLine index={i} />} 
            </Fragment>
          );
        })}
      </div>

      <motion.div
        className="mt-10 px-8 py-6 rounded-2xl text-center bg-gradient-to-r from-rosa via-[#f43f5e] to-rosa text-white"
        style={{ fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, boxShadow: '0 0 40px rgba(246,100,150,0.4)' }}
        transition={{ duration: 0.7, delay: 0.2 * 5 + 0.6 }}
      >
        <p className="text-xl font-black uppercase mb-1">El problema: FALTA SISTEMA</p>
        <p className="text-md italic text-white/90">No es el contenido. Es la estrategia.</p>
      </motion.div>
    </div>
  );
}
