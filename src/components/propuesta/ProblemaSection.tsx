import { motion } from 'framer-motion';
import { Fragment, useMemo } from 'react';
import type { Prospecto } from '@data/prospectos';
import { withAlpha } from '@lib/color';

interface ProblemaSectionProps {
  prospecto: Prospecto;
}

const pasos = [
  { title: 'Llegan consultas', subtitle: 'Por Instagram, WhatsApp y Google' },
  { title: 'Se responden tarde', subtitle: 'Horas después o al día siguiente' },
  { title: 'El cliente se enfría', subtitle: 'Ya le escribió a la competencia' },
  { title: 'Se pierde la venta', subtitle: 'Sin seguimiento ni registro' },
  { title: 'Inversión sin sistema', subtitle: 'Contenido y ads sin medir retorno', alert: true },
];

function Sparkles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        size: Math.random() * 6 + 3,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 0.5,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/70"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            opacity: dot.opacity,
          }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
        />
      ))}
    </div>
  );
}

export default function ProblemaSection({ prospecto }: ProblemaSectionProps) {
  const { dolorPrincipal, colorTema } = prospecto;

  return (
    <div className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden max-sm:px-3 px-8 py-20">
      <Sparkles />

      <motion.h2
        className="text-base text-white/60 text-center mb-8 relative z-10"
        style={{ fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        Esto probablemente te pasa
      </motion.h2>

      <div className="flex flex-col items-center w-full max-w-[800px] relative z-10">
        {pasos.map((paso, i) => (
          <Fragment key={paso.title}>
            <motion.div
              className="max-sm:px-4 max-sm:py-3 px-6 py-4 mb-2 rounded-xl border-2 backdrop-blur-sm"
              style={{
                background: paso.alert ? withAlpha(colorTema, 0.35) : '#0f172a',
                borderColor: paso.alert ? colorTema : '#ffffff',
                width: `${100 - i * 12}%`,
              }}
              initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 * i }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex max-sm:flex-col max-sm:items-start items-center max-sm:gap-0.5 gap-4 w-full">
                <span className="max-sm:text-sm text-lg font-bold text-white">{paso.title}</span>
                <span className="max-sm:text-xs text-sm text-white/60">{paso.subtitle}</span>
              </div>
            </motion.div>
            {i < pasos.length - 1 && (
              <motion.div
                className="w-0.5 bg-gradient-to-b from-rosa/40 to-rosa/10"
                initial={{ height: 0 }}
                animate={{ height: 18 }}
                transition={{ duration: 0.4, delay: 0.2 * (i + 1) }}
              />
            )}
          </Fragment>
        ))}
      </div>

      <motion.div
        className="max-sm:mt-6 mt-10 max-sm:px-4 max-sm:py-4 px-8 py-6 rounded-2xl text-center bg-gradient-to-r from-rosa via-rosa/80 to-rosa text-white relative z-10 max-w-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, boxShadow: `0 0 40px ${withAlpha(colorTema, 0.4)}` }}
        transition={{ duration: 0.7, delay: 0.2 * pasos.length + 0.6 }}
      >
        <p className="max-sm:text-base text-xl font-black uppercase mb-1">El problema: falta sistema</p>
        <p className="max-sm:text-sm text-base italic text-white/90">{dolorPrincipal}</p>
      </motion.div>
    </div>
  );
}
