import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Prospecto } from '@data/prospectos';
import { EASE, Eyebrow, RevealText, words } from './ui';

interface AntesDespuesSectionProps {
  prospecto: Prospecto;
}

const cambios = [
  { antes: 'Consultas respondidas a destiempo', despues: 'Respuesta automática en <1 min' },
  { antes: 'Contenido sin plan ni frecuencia', despues: '4 reels de alto impacto por mes' },
  { antes: 'Ads sin optimizar', despues: 'Meta Ads gestionados y optimizados' },
  { antes: 'Sin métricas claras', despues: 'Reporte mensual de métricas' },
];

export default function AntesDespuesSection({ prospecto }: AntesDespuesSectionProps) {
  return (
    <section id="cambio" className="relative py-24 sm:py-32 compact:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Eyebrow index="04">Lo que cambia</Eyebrow>
        <RevealText
          items={[...words('En 30 días,'), ...words(prospecto.nombreNegocio, 'font-serif italic font-normal text-accent'), ...words('deja de perder consultas.')]}
          className="mt-4 max-w-4xl text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white"
        />

        <div className="mt-12 hidden grid-cols-[1fr_auto_1fr] gap-x-8 border-b border-white/10 pb-3 text-[11px] uppercase tracking-[0.25em] md:grid compact:mt-8" style={{ fontFamily: 'var(--font-mono)' }}>
          <span className="text-white/35">Antes</span>
          <span className="w-5" />
          <span className="text-accent">Después</span>
        </div>

        <ul className="mt-6 md:mt-0">
          {cambios.map((c, i) => (
            <motion.li
              key={c.antes}
              className="grid gap-2 border-b border-white/[0.07] py-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-8 md:py-7 compact:md:py-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ staggerChildren: 0.25, delayChildren: i * 0.08 }}
            >
              <motion.span
                className="relative w-fit text-base text-white/40 sm:text-xl"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
              >
                {c.antes}
                <motion.span
                  className="absolute left-0 top-1/2 h-px w-full origin-left bg-white/50"
                  variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE, delay: 0.3 } } }}
                />
              </motion.span>

              <motion.span
                className="hidden text-accent md:block"
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}
              >
                <ArrowRight size={20} />
              </motion.span>

              <motion.span
                className="text-xl font-semibold text-white sm:text-2xl"
                variants={{
                  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
                }}
              >
                {c.despues}
              </motion.span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          className="mt-14 text-center text-[clamp(1.8rem,4vw,3.4rem)] font-bold tracking-[-0.02em] text-white compact:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          No es magia.{' '}
          <span
            className="bg-clip-text font-serif font-normal italic text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 40%, white))' }}
          >
            Es sistema.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
