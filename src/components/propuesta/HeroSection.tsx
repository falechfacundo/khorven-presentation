import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Prospecto } from '@data/prospectos';
import { EASE, RevealText, words } from './ui';

interface HeroSectionProps {
  prospecto: Prospecto;
}

const servicios = ['Contenido', 'Meta Ads', 'Landing', 'Automatización'];

export default function HeroSection({ prospecto }: HeroSectionProps) {
  const { nombreNegocio, dolorPrincipal, logoUrl } = prospecto;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const titulo = [
    ...words('Sistema de crecimiento digital para'),
    ...words(nombreNegocio, 'font-serif italic font-normal text-accent tracking-normal'),
  ];

  return (
    <section ref={ref} className="relative min-h-svh w-full overflow-hidden">
      {/* Aurora + grilla */}
      <motion.div aria-hidden className="absolute inset-0" style={{ scale: auroraScale }}>
        <motion.div
          className="absolute -top-1/4 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 32%, transparent), transparent 60%)' }}
          animate={{ x: ['-8%', '6%', '-8%'], y: ['0%', '6%', '0%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 h-[50vmax] w-[50vmax] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 60%)' }}
          animate={{ x: ['0%', '-10%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="bg-grid absolute inset-0"
          style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)' }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pt-24 pb-28 sm:px-10 compact:pt-16 compact:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {logoUrl && (
          <motion.img
            src={logoUrl}
            alt={`Logo de ${nombreNegocio}`}
            className="mb-8 h-12 w-auto self-start object-contain sm:h-14"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        )}

        <motion.p
          className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.28em] text-white/45 sm:text-xs compact:mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <span className="text-accent">Propuesta comercial</span>
          <span className="h-px w-8 bg-white/20" />
          Preparada para {nombreNegocio}
        </motion.p>

        <RevealText
          as="h1"
          items={titulo}
          delay={0.25}
          stagger={0.06}
          className="max-w-6xl text-[clamp(2.6rem,7.4vw,7rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white compact:text-[clamp(2.4rem,6vw,5.2rem)]"
        />

        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end compact:mt-8">
          <motion.div
            className="max-w-xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
          >
            <p
              className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Diagnóstico
            </p>
            <p className="text-base leading-relaxed text-white/80 sm:text-lg">{dolorPrincipal}</p>
          </motion.div>

          <motion.ul
            className="flex flex-wrap gap-2 md:justify-end"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 1.3 }}
          >
            {servicios.map((s) => (
              <motion.li
                key={s}
                className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/60 sm:text-sm"
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-8 z-10 mx-auto hidden max-w-7xl sm:flex items-center gap-3 px-5 text-[11px] uppercase tracking-[0.28em] text-white/35 sm:px-10 compact:bottom-5"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="relative block h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        Scrolleá para ver la propuesta
      </motion.div>
    </section>
  );
}
