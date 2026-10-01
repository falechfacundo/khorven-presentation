import { motion, type Variants } from 'framer-motion';
import { Fragment } from 'react';
import { MessageCircle } from 'lucide-react';
import type { Prospecto } from '@data/prospectos';
import { withAlpha } from '@lib/color';

interface CierreSectionProps {
  prospecto: Prospecto;
}

const pasos = [
  'Elegís el paquete por WhatsApp.',
  'Llamada de 15 min para mapear el flujo.',
  'Empezamos a construir en 48hs.',
];

function AnimatedGrid() {
  const lineCount = 10;
  const variants: Variants = {
    hidden: { opacity: 0, x: -10, y: -10 },
    visible: (i: number) => ({
      opacity: [0, 0.4, 0.6, 0.4, 0],
      x: 0,
      y: 0,
      transition: { duration: 4, ease: 'easeOut', delay: i * 0.1 },
    }),
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {Array.from({ length: lineCount }).map((_, i) => (
        <Fragment key={i}>
          <motion.div
            variants={variants}
            custom={i}
            initial="hidden"
            animate="visible"
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-white/10 to-white/30"
            style={{ top: `${(i * 100) / lineCount}%` }}
          />
          <motion.div
            variants={variants}
            custom={lineCount + i}
            initial="hidden"
            animate="visible"
            className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/10 to-white/30"
            style={{ left: `${(i * 100) / lineCount}%` }}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default function CierreSection({ prospecto }: CierreSectionProps) {
  const { nombreNegocio, colorTema, logoUrl, whatsappLink } = prospecto;
  const headline = 'Próximos pasos';
  const pasosStart = 0.5 + headline.length * 0.04 + 0.3;
  const ctaDelay = pasosStart + pasos.length * 0.3 + 0.4;

  return (
    <div className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden max-sm:px-4 px-6 py-20">
      <AnimatedGrid />

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <motion.img
          src={logoUrl}
          alt={`Logo de ${nombreNegocio}`}
          className="max-sm:h-10 h-12 w-auto object-contain mb-5"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        <h2
          className="max-sm:text-3xl text-4xl md:text-5xl lg:text-6xl font-bold text-white max-sm:mb-8 mb-10 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {headline.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.04, duration: 0.05 }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </h2>

        <ol className="flex flex-col items-stretch w-full">
          {pasos.map((paso, i) => {
            const delay = pasosStart + i * 0.3;
            return (
              <Fragment key={paso}>
                <motion.li
                  className="flex items-center max-sm:gap-3 gap-4 rounded-xl border border-white/15 bg-navy/80 backdrop-blur-sm max-sm:p-4 p-5"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay, duration: 0.5, ease: 'easeOut' }}
                >
                  <motion.span
                    className="flex max-sm:h-9 max-sm:w-9 h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rosa font-bold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.15, type: 'spring', stiffness: 300, damping: 12 }}
                  >
                    {i + 1}
                  </motion.span>
                  <span className="max-sm:text-base text-lg text-white/85">{paso}</span>
                </motion.li>
                {i < pasos.length - 1 && (
                  <motion.div
                    className="w-0.5 ml-[2.56rem] max-sm:ml-[2.06rem] bg-gradient-to-b from-rosa/50 to-rosa/10"
                    initial={{ height: 0 }}
                    animate={{ height: 20 }}
                    transition={{ delay: delay + 0.3, duration: 0.3 }}
                  />
                )}
              </Fragment>
            );
          })}
        </ol>

        <motion.div
          className="max-sm:mt-10 mt-12 max-sm:w-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: ctaDelay + 0.9 }}
        >
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-3 max-sm:px-6 max-sm:py-4 px-12 py-5 rounded-full bg-rosa text-white font-bold max-sm:text-lg text-xl md:text-2xl overflow-hidden"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                `0 0 0px ${withAlpha(colorTema, 0.4)}`,
                `0 0 40px ${withAlpha(colorTema, 0.6)}`,
                `0 0 0px ${withAlpha(colorTema, 0.4)}`,
              ],
            }}
            transition={{
              y: { delay: ctaDelay, duration: 0.6, ease: 'easeOut' },
              opacity: { delay: ctaDelay, duration: 0.6, ease: 'easeOut' },
              boxShadow: { delay: ctaDelay + 0.6, duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: ctaDelay + 0.9, repeatDelay: 1 }}
            />
            <MessageCircle className="relative z-10 shrink-0" size={24} aria-hidden />
            <span className="relative z-10">Hablar con Facundo ahora</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
