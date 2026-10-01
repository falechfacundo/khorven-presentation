import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, CheckCheck, ChevronLeft, Phone, Store, Video, Zap } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Prospecto } from '@data/prospectos';
import { cn } from '@lib/utils';
import { EASE, Eyebrow, FadeUp, RevealText, words } from './ui';

interface DemoSectionProps {
  prospecto: Prospecto;
}

const flujo = [
  { title: 'Entra la consulta', text: 'Por Instagram, WhatsApp o la landing, a cualquier hora.' },
  { title: 'Respuesta automática', text: 'n8n procesa el mensaje y responde en menos de 1 minuto.' },
  { title: 'Calificación', text: 'Se detecta qué necesita el cliente y cuándo.' },
  { title: 'Derivación a WhatsApp o CRM', text: 'Tu equipo recibe el lead listo para cerrar.' },
];

/** Momentos (ms) en que avanza cada etapa del chat; al final se reinicia. */
const TIMELINE = [600, 1700, 3300, 5400, 6300, 7600, 9000];
const LOOP_MS = 13500;
const FINAL = TIMELINE.length - 1;

function flujoActivo(stage: number) {
  if (stage <= 0) return 0;
  if (stage <= 2) return 1;
  if (stage <= 5) return 2;
  return 3;
}

export default function DemoSection({ prospecto }: DemoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(-1);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStage(FINAL);
      return;
    }
    setStage(-1);
    const timers = TIMELINE.map((t, i) => setTimeout(() => setStage(i), t));
    timers.push(setTimeout(() => setLoop((l) => l + 1), LOOP_MS));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, loop]);

  const activo = stage < 0 ? -1 : flujoActivo(stage);

  return (
    <section id="demo" className="relative overflow-hidden py-24 sm:py-32 compact:py-16">
      <div
        aria-hidden
        className="absolute right-0 top-1/2 h-[60vmax] w-[60vmax] -translate-y-1/2 translate-x-1/3 rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 60%)' }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-10 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <Eyebrow index="02">El sistema en acción</Eyebrow>
          <RevealText
            items={[...words('Mientras dormís,'), ...words('el sistema responde.', 'font-serif italic font-normal text-accent')]}
            className="mt-4 max-w-2xl text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white"
          />
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Así funciona la automatización del Paquete Sistema: cada consulta recibe respuesta en menos de un minuto
              y llega a tu WhatsApp o CRM lista para cerrar.
            </p>
          </FadeUp>

          <ol className="mt-10 grid gap-2 compact:mt-6">
            {flujo.map((f, i) => (
              <li
                key={f.title}
                className={cn(
                  'flex gap-4 rounded-2xl border p-4 transition-all duration-500 compact:p-3',
                  i === activo ? 'border-accent/40 bg-accent/[0.07]' : 'border-transparent',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors duration-500',
                    i <= activo ? 'border-accent bg-accent text-white' : 'border-white/15 text-white/40',
                  )}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {i < activo ? <Check size={14} /> : i + 1}
                </span>
                <span>
                  <span className={cn('block font-semibold transition-colors duration-500', i <= activo ? 'text-white' : 'text-white/45')}>
                    {f.title}
                  </span>
                  <span className="block text-sm text-white/45">{f.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div ref={ref} className="relative mx-auto">
          <FloatingChip className="-left-24 top-28 hidden lg:flex" delay={0.4}>
            <Zap size={14} className="text-accent" /> Respuesta &lt; 1 min
          </FloatingChip>
          <FloatingChip className="-right-20 bottom-36 hidden xl:flex" delay={0.6}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Activo 24/7
          </FloatingChip>
          <PhoneChat nombre={prospecto.nombreNegocio} stage={stage} />
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ children, className, delay }: { children: ReactNode; className?: string; delay: number }) {
  return (
    <motion.div
      className={cn(
        'absolute z-20 items-center gap-2 rounded-full border border-white/10 bg-ink/80 px-4 py-2 text-sm text-white/80 backdrop-blur-md',
        className,
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: [0, -6, 0] }}
      viewport={{ once: true }}
      transition={{ opacity: { delay, duration: 0.6 }, y: { delay, duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
    >
      {children}
    </motion.div>
  );
}

/* ── Mockup del celular ─────────────────────────────────── */

function PhoneChat({ nombre, stage }: { nombre: string; stage: number }) {
  return (
    <motion.div
      className="relative w-[290px] rounded-[2.8rem] border border-white/15 bg-[#0b0b0d] p-2.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:w-[320px]"
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[2.2rem] bg-[#0b141a] compact:h-[500px]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* Notificación del CRM */}
        <AnimatePresence>
          {stage >= 6 && (
            <motion.div
              className="absolute inset-x-2.5 top-10 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1c1c1f]/95 p-3 backdrop-blur-md"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                <Check size={18} strokeWidth={3} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-white">Nuevo lead en el CRM</span>
                <span className="block truncate text-xs text-white/55">Jueves a la tarde · vía WhatsApp · 23:48</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header estilo WhatsApp */}
        <div className="flex items-center gap-2 bg-[#1f2c34] px-3 pb-2.5 pt-10 text-white">
          <ChevronLeft size={20} className="text-white/70" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/90">
            <Store size={16} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">{nombre}</span>
            <span className="block text-[11px] text-white/55">{stage === 1 || stage === 4 ? 'escribiendo…' : 'en línea'}</span>
          </span>
          <Video size={18} className="text-white/60" />
          <Phone size={16} className="ml-3 text-white/60" />
        </div>

        {/* Conversación */}
        <div
          className="flex flex-1 flex-col justify-end gap-1.5 px-3 pb-3"
          style={{
            backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        >
          <span className="mx-auto mb-2 rounded-md bg-[#182229] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/50">Hoy</span>
          <AnimatePresence initial={false}>
            {stage >= 0 && <Bubble key="m1" side="in" time="23:47">Hola! ¿Tienen disponibilidad para esta semana?</Bubble>}
            {stage === 1 && <Typing key="t1" />}
            {stage >= 2 && (
              <Bubble key="m2" side="out" time="23:47" badge>
                ¡Hola! 👋 Gracias por escribir a {nombre}. Sí, tenemos disponibilidad. ¿Qué día y horario te queda mejor?
              </Bubble>
            )}
            {stage >= 3 && <Bubble key="m3" side="in" time="23:48">El jueves a la tarde</Bubble>}
            {stage === 4 && <Typing key="t2" />}
            {stage >= 5 && (
              <Bubble key="m4" side="out" time="23:48">
                Perfecto 🙌 Ya le paso tus datos al equipo para confirmarlo. ¡Te escribimos en breve!
              </Bubble>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 bg-[#0b141a] px-2.5 pb-4 pt-1">
          <span className="flex-1 rounded-full bg-[#1f2c34] px-4 py-2 text-xs text-white/35">Mensaje</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden>
              <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Bubble({ side, time, badge, children }: { side: 'in' | 'out'; time: string; badge?: boolean; children: ReactNode }) {
  const out = side === 'out';
  return (
    <motion.div
      layout
      className={cn('flex max-w-[82%] flex-col', out ? 'self-end items-end' : 'self-start items-start')}
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{ transformOrigin: out ? 'bottom right' : 'bottom left' }}
    >
      <div
        className={cn(
          'rounded-xl px-2.5 pb-1 pt-1.5 text-[13px] leading-snug text-white',
          out ? 'rounded-tr-sm bg-[#005c4b]' : 'rounded-tl-sm bg-[#202c33]',
        )}
      >
        {children}
        <span className="float-right ml-2 mt-1.5 flex items-center gap-0.5 text-[10px] text-white/50">
          {time}
          {out && <CheckCheck size={13} className="text-[#53bdeb]" />}
        </span>
      </div>
      {badge && (
        <motion.span
          className="mt-1 flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Zap size={10} /> Respuesta automática · 38 s
        </motion.span>
      )}
    </motion.div>
  );
}

function Typing() {
  return (
    <motion.div
      layout
      className="flex gap-1 self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-2.5"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}
