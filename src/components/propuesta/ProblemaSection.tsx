import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Prospecto } from '@data/prospectos';
import { cn } from '@lib/utils';
import { EASE, Eyebrow, RevealText, words } from './ui';

interface ProblemaSectionProps {
  prospecto: Prospecto;
}

/** Recorrido de 100 consultas. `vivas` es ilustrativo. */
const pasos = [
  { title: 'Llegan consultas', subtitle: 'Por Instagram, WhatsApp y Google', vivas: 100 },
  { title: 'Se responden tarde', subtitle: 'Horas después o al día siguiente', vivas: 64 },
  { title: 'El cliente se enfría', subtitle: 'Ya le escribió a la competencia', vivas: 38 },
  { title: 'Se pierde la venta', subtitle: 'Sin seguimiento ni registro', vivas: 21 },
  { title: 'Inversión sin sistema', subtitle: 'Contenido y ads sin medir retorno', vivas: 12 },
];
const LAST = pasos.length - 1;

/** Orden "aleatorio" fijo en que se apagan los puntos (determinístico para no romper la hidratación). */
const RANK = Array.from({ length: 100 }, (_, i) => (i * 37 + 11) % 100);

export default function ProblemaSection({ prospecto }: ProblemaSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);
  const [cierre, setCierre] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStep(Math.min(LAST, Math.max(0, Math.floor(v * (pasos.length + 0.8)))));
    setCierre(v > 0.9);
  });

  const vivas = pasos[step].vivas;
  const count = useSpring(100, { stiffness: 60, damping: 18 });
  const countText = useTransform(count, (v) => Math.round(v).toString());
  useEffect(() => count.set(vivas), [vivas, count]);

  const barra = useTransform(scrollYProgress, [0, 0.9], ['0%', '100%']);

  return (
    <section ref={ref} id="problema" className="relative h-[330svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 sm:gap-6 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Columna izquierda: relato */}
          <div className="flex flex-col justify-center">
            <Eyebrow index="01">El problema</Eyebrow>
            <RevealText
              items={[...words('Esto probablemente'), ...words('te pasa.', 'font-serif italic font-normal')]}
              className="mt-3 text-[1.7rem] sm:mt-4 sm:text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white compact:text-[clamp(1.9rem,3.8vw,3.2rem)]"
            />

            {/* Desktop: lista completa con el paso activo resaltado */}
            <ol className="relative mt-10 hidden flex-col lg:flex compact:mt-6">
              <span className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
              <motion.span className="absolute left-[11px] top-2 w-px bg-accent" style={{ height: barra }} />
              {pasos.map((p, i) => (
                <li
                  key={p.title}
                  className={cn(
                    'relative flex items-baseline gap-5 py-3 pl-10 transition-all duration-500 compact:py-2',
                    i === step ? 'opacity-100' : i < step ? 'opacity-35' : 'opacity-20',
                  )}
                >
                  <span
                    className={cn(
                      'absolute left-[7px] top-[1.35rem] h-[9px] w-[9px] rounded-full border transition-colors duration-500 compact:top-[1.1rem]',
                      i <= step ? 'border-accent bg-accent' : 'border-white/30 bg-ink',
                    )}
                  />
                  <span className="w-6 shrink-0 text-xs text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
                    0{i + 1}
                  </span>
                  <span>
                    <span className="block text-xl font-semibold text-white compact:text-lg">{p.title}</span>
                    <span className="block text-sm text-white/55">{p.subtitle}</span>
                  </span>
                </li>
              ))}
            </ol>

            {/* Mobile: solo el paso activo (o la conclusión al final) */}
            <div className="relative mt-4 min-h-[96px] lg:hidden [@media(max-height:600px)]:mt-3 [@media(max-height:600px)]:min-h-[84px]">
              <AnimatePresence mode="wait">
                {cierre ? (
                  <Conclusion key="cierre" dolor={prospecto.dolorPrincipal} />
                ) : (
                  <motion.div
                    key={step}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <span className="text-xs text-accent" style={{ fontFamily: 'var(--font-mono)' }}>
                      0{step + 1} / 0{pasos.length}
                    </span>
                    <p className="mt-1 text-lg font-semibold text-white">{pasos[step].title}</p>
                    <p className="text-sm text-white/55">{pasos[step].subtitle}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Columna derecha: visualización */}
          <div className="flex flex-col justify-center">
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-7 compact:p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
                    De cada 100 consultas
                  </p>
                  <p className="mt-1 text-sm text-white/60 [@media(max-height:600px)]:hidden">siguen con chances de comprar</p>
                </div>
                <motion.span className="text-5xl font-bold tabular-nums text-white sm:text-7xl compact:text-6xl">
                  {countText}
                </motion.span>
              </div>

              <div className="mx-auto mt-4 grid max-w-[210px] grid-cols-10 gap-[6px] [@media(max-height:600px)]:mt-2 [@media(max-height:600px)]:max-w-[150px] [@media(max-height:600px)]:gap-1 sm:mt-7 sm:max-w-[340px] sm:gap-3 compact:mt-5 compact:max-w-[280px] compact:gap-2.5">
                {RANK.map((rank, i) => {
                  const alive = rank < vivas;
                  return (
                    <span
                      key={i}
                      className={cn(
                        'aspect-square rounded-full transition-all duration-700',
                        alive ? 'scale-100 bg-accent' : 'scale-50 bg-white/10',
                      )}
                      style={{
                        transitionDelay: `${(rank % 20) * 15}ms`,
                        boxShadow: alive ? '0 0 12px color-mix(in srgb, var(--color-accent) 55%, transparent)' : 'none',
                      }}
                    />
                  );
                })}
              </div>

              <p className="mt-3 text-[10px] uppercase sm:mt-5 [@media(max-height:600px)]:hidden tracking-[0.2em] text-white/25" style={{ fontFamily: 'var(--font-mono)' }}>
                * Ejemplo ilustrativo
              </p>
            </div>

            <div className="hidden lg:block">
              <AnimatePresence>{cierre && <Conclusion dolor={prospecto.dolorPrincipal} className="mt-5" />}</AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Conclusion({ dolor, className }: { dolor: string; className?: string }) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl border border-accent/40 p-4 sm:p-6',
        className,
      )}
      style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <p className="text-base font-semibold text-white sm:text-xl">
        El problema no es el contenido. <span className="font-serif text-xl font-normal italic text-accent sm:text-[1.7rem]">Es que falta un sistema.</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{dolor}</p>
    </motion.div>
  );
}
