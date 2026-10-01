import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { useRef } from 'react';
import type { Prospecto } from '@data/prospectos';
import { EASE, Eyebrow, FadeUp, RevealText, SpotlightCard, words } from './ui';

interface PlanSectionProps {
  prospecto: Prospecto;
}

type Visual = 'reels' | 'calendar' | 'chart';

interface Semana {
  id: string;
  label: string;
  title: string;
  hacemos: string[];
  ves: string[];
  visual: Visual;
}

const semanas: Semana[] = [
  {
    id: 'w1',
    label: 'Semana 1',
    title: 'Auditoría + primeros reels',
    hacemos: [
      'Auditamos tus redes y tus ads actuales',
      'Grabamos y editamos los primeros reels',
      'Configuramos Meta Ads con objetivos claros',
    ],
    ves: ['Reels publicados en tus redes', 'Campañas activas', 'Primeras métricas de alcance'],
    visual: 'reels',
  },
  {
    id: 'w2',
    label: 'Semana 2',
    title: 'Calendario + automatización',
    hacemos: [
      'Armamos el calendario estratégico',
      'Mapeamos cómo te llegan las consultas',
      'Conectamos la respuesta automática (Paquete Sistema)',
    ],
    ves: ['Leads respondidos en <1 min', 'Consultas derivadas a WhatsApp/CRM', 'Alcance empezando a crecer'],
    visual: 'calendar',
  },
  {
    id: 'w3-4',
    label: 'Semanas 3 – 4',
    title: 'Optimización + reporte',
    hacemos: ['Optimizamos según lo que funciona', 'Ajustamos campañas y creativos', '1 call de seguimiento'],
    ves: ['Resultados consistentes', 'Reporte mensual de métricas', 'Plan claro para el mes 2'],
    visual: 'chart',
  },
];

export default function PlanSection({ prospecto }: PlanSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="plan" className="relative py-24 sm:py-32 compact:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow index="03">Tu primer mes</Eyebrow>
            <RevealText
              items={[...words('30 días para'), ...words('ver resultados.', 'font-serif italic font-normal text-accent')]}
              className="mt-4 text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white"
            />
          </div>
          <FadeUp delay={0.15}>
            <p className="max-w-sm text-base leading-relaxed text-white/55 lg:text-right">
              Así trabajamos con {prospecto.nombreNegocio} desde el día uno. Al final del mes sabés qué funcionó y cuánto
              te costó cada consulta.
            </p>
          </FadeUp>
        </div>

        {/* Línea de tiempo que se llena con el scroll */}
        <div ref={ref} className="relative mt-14 hidden h-px bg-white/10 md:block compact:mt-10">
          <motion.div className="absolute inset-y-0 left-0 bg-accent" style={{ width: lineWidth }} />
          {semanas.map((s, i) => (
            <span
              key={s.id}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-accent bg-ink"
              style={{ left: `calc(${(i * 100) / 3}% + 1.5rem)` }}
            />
          ))}
        </div>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 compact:mt-6">
          {semanas.map((s, i) => (
            <motion.div
              key={s.id}
              className="w-[82%] shrink-0 snap-center md:w-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            >
              <SpotlightCard className="h-full p-6 compact:p-5">
                <div className="relative flex h-full flex-col">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-accent" style={{ fontFamily: 'var(--font-mono)' }}>
                    {s.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{s.title}</h3>

                  <div className="my-5 compact:my-4">
                    <SemanaVisual visual={s.visual} />
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/35" style={{ fontFamily: 'var(--font-mono)' }}>
                    Qué hacemos
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {s.hacemos.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-white/65">
                        <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-white/30" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="my-4 h-px bg-white/[0.07]" />

                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/35" style={{ fontFamily: 'var(--font-mono)' }}>
                    Qué ves vos
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {s.ves.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-white/85">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SemanaVisual({ visual }: { visual: Visual }) {
  if (visual === 'reels') return <Reels />;
  if (visual === 'calendar') return <Calendar />;
  return <Chart />;
}

function Reels() {
  return (
    <div className="flex h-28 gap-2.5 compact:h-24">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative flex-1 overflow-hidden rounded-xl border border-white/10"
          style={{
            background: `linear-gradient(${160 + i * 20}deg, color-mix(in srgb, var(--color-accent) ${30 - i * 8}%, transparent), rgb(255 255 255 / 0.03))`,
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE }}
        >
          <Play size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-white/80 text-white/80" />
          <div className="absolute inset-x-2 bottom-2 h-0.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full bg-white/80"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: false }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Calendar() {
  const posts = new Set([1, 3, 8, 10, 11, 15, 17, 19]);
  return (
    <div className="grid h-28 grid-cols-7 content-center gap-x-1.5 gap-y-1 compact:h-24">
      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
        <span key={i} className="text-center text-[10px] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
          {d}
        </span>
      ))}
      {Array.from({ length: 21 }, (_, i) => (
        <motion.span
          key={i}
          className="flex h-6 items-center justify-center rounded-md border border-white/[0.06] compact:h-5"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.025, duration: 0.3 }}
        >
          {posts.has(i) && <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />}
        </motion.span>
      ))}
    </div>
  );
}

function Chart() {
  const d = 'M4,58 C30,54 40,46 60,42 S95,30 115,24 S150,10 176,6';
  return (
    <svg viewBox="0 0 180 64" className="h-28 w-full overflow-visible compact:h-24" preserveAspectRatio="none">
      <defs>
        <linearGradient id="plan-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[16, 32, 48].map((y) => (
        <line key={y} x1="0" x2="180" y1={y} y2={y} stroke="white" strokeOpacity="0.05" />
      ))}
      <motion.path
        d={`${d} L176,64 L4,64 Z`}
        fill="url(#plan-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1.4, ease: 'easeInOut' }}
      />
    </svg>
  );
}
