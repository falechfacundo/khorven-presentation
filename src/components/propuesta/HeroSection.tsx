import { motion } from 'framer-motion';
import type { Prospecto } from '@data/prospectos';
import { withAlpha } from '@lib/color';

interface HeroSectionProps {
  prospecto: Prospecto;
}

export default function HeroSection({ prospecto }: HeroSectionProps) {
  const { nombreNegocio, dolorPrincipal, colorTema, logoUrl } = prospecto;
  const intro = 'Sistema de crecimiento digital para'.split(' ');
  const nombre = nombreNegocio.split(' ');
  const wordsStart = 1.6;
  const dolorDelay = wordsStart + (intro.length + nombre.length) * 0.1 + 0.3;

  return (
    <div className="relative w-full min-h-svh flex flex-col items-center justify-center overflow-hidden max-sm:px-4 px-6 py-20">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse at 50% 50%, ${withAlpha(colorTema, 0.12)} 0%, hsla(81,85%,56%,0.05) 50%, transparent 70%)`,
            `radial-gradient(ellipse at 50% 50%, ${withAlpha(colorTema, 0.22)} 0%, hsla(81,85%,56%,0.1) 50%, transparent 70%)`,
            `radial-gradient(ellipse at 50% 50%, ${withAlpha(colorTema, 0.12)} 0%, hsla(81,85%,56%,0.05) 50%, transparent 70%)`,
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {logoUrl && (
          <motion.img
            src={logoUrl}
            alt={`Logo de ${nombreNegocio}`}
            className="max-sm:h-16 h-20 md:h-24 w-auto object-contain"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        <motion.p
          className="max-sm:text-[11px] text-xs md:text-sm font-medium tracking-[0.3em] uppercase mt-6 text-white/50 text-center"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
        >
          Propuesta comercial
        </motion.p>
      </div>

      <motion.h1
        className="relative z-10 max-sm:text-2xl text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-4xl max-sm:mt-6 mt-8 md:mt-10 leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {[...intro, ...nombre].map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: wordsStart + i * 0.1,
              duration: 0.45,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <span
              className={i >= intro.length ? 'text-rosa' : 'text-white/90'}
              style={i >= intro.length ? { textShadow: `0 0 30px ${withAlpha(colorTema, 0.45)}` } : undefined}
            >
              {word}
            </span>
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="relative z-10 max-sm:text-base text-lg md:text-xl text-white/60 text-center max-w-2xl max-sm:mt-5 mt-8 leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: dolorDelay, duration: 0.6, ease: 'easeOut' }}
      >
        {dolorPrincipal}
      </motion.p>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: dolorDelay + 0.6, duration: 0.6 }}
      >
        <motion.span
          className="text-white/30 text-sm md:text-base tracking-widest flex items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-6 h-px bg-white/20" />
          SCROLL
          <span className="w-6 h-px bg-white/20" />
        </motion.span>
      </motion.div>
    </div>
  );
}
