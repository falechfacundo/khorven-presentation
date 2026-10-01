import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from 'lucide-react';
import type { Prospecto } from '@data/prospectos';
import { withAlpha } from '@lib/color';

interface PlanSectionProps {
  prospecto: Prospecto;
}

type Visual = 'videos' | 'calendar' | 'chart';

interface Semana {
  id: string;
  label: string;
  subtitle: string;
  accent: 'rosa' | 'verde';
  hacemos: string[];
  ves: string[];
  visual: Visual;
}

const semanas: Semana[] = [
  {
    id: 'w1',
    label: 'SEMANA 1',
    subtitle: 'Auditoría + primeros reels',
    accent: 'rosa',
    hacemos: [
      'Auditamos tus redes y tus ads actuales',
      'Grabamos y editamos los primeros reels',
      'Configuramos Meta Ads con objetivos claros',
    ],
    ves: ['Reels publicados en tus redes', 'Campañas activas', 'Primeras métricas de alcance'],
    visual: 'videos',
  },
  {
    id: 'w2',
    label: 'SEMANA 2',
    subtitle: 'Calendario + automatización',
    accent: 'verde',
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
    label: 'SEMANA 3-4',
    subtitle: 'Optimización + reporte',
    accent: 'rosa',
    hacemos: [
      'Optimizamos según lo que funciona',
      'Ajustamos campañas y creativos',
      '1 call de seguimiento',
    ],
    ves: ['Resultados consistentes', 'Reporte mensual de métricas', 'Plan claro para el mes 2'],
    visual: 'chart',
  },
];

const accentClasses = {
  rosa: { border: 'border-rosa', text: 'text-rosa' },
  verde: { border: 'border-verde', text: 'text-verde' },
} as const;

const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function VideoFrames({ delay, colorTema }: { delay: number; colorTema: string }) {
  return (
    <div className="flex gap-2 my-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="flex-1 h-14 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center"
          initial={{ opacity: 0, y: 12, scale: 0.85 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: [
              `0 0 0px ${withAlpha(colorTema, 0)}`,
              `0 0 12px ${withAlpha(colorTema, 0.3)}`,
              `0 0 0px ${withAlpha(colorTema, 0)}`,
            ],
          }}
          transition={{
            y: { delay: delay + i * 0.1, type: 'spring', stiffness: 300, damping: 12 },
            opacity: { delay: delay + i * 0.1, duration: 0.2 },
            scale: { delay: delay + i * 0.1, type: 'spring', stiffness: 300, damping: 12 },
            boxShadow: { delay: delay + 0.4 + i * 0.1, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Film size={20} className="text-white/50" />
        </motion.div>
      ))}
    </div>
  );
}

function CalendarGrid({ delay }: { delay: number }) {
  const weeks = [
    [true, true, false, true, false, false, false],
    [false, true, false, true, true, false, false],
  ];
  const dotColors = ['bg-verde', 'bg-rosa'];

  return (
    <div className="my-2">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map((d, i) => (
          <span key={i} className="text-[10px] text-white/30 text-center font-medium">
            {d}
          </span>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
          {week.map((hasDot, di) => {
            const dotIndex = wi * 7 + di;
            return (
              <motion.div
                key={di}
                className="h-4 rounded flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.05 + dotIndex * 0.035, duration: 0.25, ease: 'easeOut' }}
              >
                {hasDot && (
                  <motion.div
                    className={`w-1.5 h-1.5 rounded-full ${dotColors[dotIndex % 2]}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7] }}
                    transition={{ delay: delay + 0.05 + dotIndex * 0.035, duration: 0.3 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function GrowthChart({ delay }: { delay: number }) {
  const points = [
    { x: 5, y: 45, label: 'S1' },
    { x: 30, y: 38, label: 'S2' },
    { x: 55, y: 28, label: 'S3' },
    { x: 80, y: 18, label: 'S4' },
    { x: 105, y: 10, label: 'S5' },
    { x: 115, y: 7, label: 'S6' },
  ];
  const lineDuration = 1.2;
  const totalX = 110;

  return (
    <div className="my-2 h-16">
      <svg viewBox="0 0 120 50" className="w-full h-full">
        <motion.path
          d="M5,45 L30,38 L55,28 L80,18 L105,10 L115,7"
          stroke="currentColor"
          className="text-verde"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay, duration: lineDuration, ease: 'easeOut' }}
        />
        {points.map((pt) => {
          const dotDelay = delay + ((pt.x - 5) / totalX) * lineDuration + 0.05;
          return (
            <g key={pt.label}>
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="3"
                className="fill-verde"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: dotDelay, duration: 0.25, ease: 'easeOut' }}
              />
              <motion.text
                x={pt.x}
                y={pt.y - 7}
                className="fill-white/30 text-[6px]"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: dotDelay + 0.05, duration: 0.2 }}
              >
                {pt.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function SemanaVisual({ visual, delay, colorTema }: { visual: Visual; delay: number; colorTema: string }) {
  if (visual === 'videos') return <VideoFrames delay={delay} colorTema={colorTema} />;
  if (visual === 'calendar') return <CalendarGrid delay={delay} />;
  return <GrowthChart delay={delay} />;
}

export default function PlanSection({ prospecto }: PlanSectionProps) {
  const { nombreNegocio, colorTema } = prospecto;
  const [activeWeek, setActiveWeek] = useState(0);
  const [swipeDir, setSwipeDir] = useState(1);
  const touchStart = useRef<{ x: number } | null>(null);
  const active = semanas[activeWeek];

  const goTo = (i: number) => {
    setSwipeDir(i > activeWeek ? 1 : -1);
    setActiveWeek(i);
  };

  return (
    <div
      className="relative w-full min-h-dvh flex flex-col items-center justify-center max-sm:px-4 px-10 py-20 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <motion.h2
        className="max-sm:text-[28px] text-[56px] font-bold text-white leading-none mb-2 text-center"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tu primer mes
      </motion.h2>

      <motion.p
        className="max-sm:text-sm text-[20px] text-white/50 max-sm:mb-4 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Así trabajamos con {nombreNegocio} en los primeros 30 días
      </motion.p>

      <div className="max-sm:hidden grid grid-cols-3 gap-6 w-full max-w-[1200px]">
        {semanas.map((semana, i) => {
          const cardDelay = i * 0.15;
          const accent = accentClasses[semana.accent];

          return (
            <motion.div
              key={semana.id}
              className={`flex flex-col rounded-2xl border-2 ${accent.border} bg-navy`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: cardDelay } }}
              whileHover={{
                boxShadow:
                  semana.accent === 'rosa'
                    ? `0 0 30px ${withAlpha(colorTema, 0.3)}`
                    : '0 0 30px hsla(81, 85%, 56%, 0.3)',
              }}
              style={{ transformStyle: 'preserve-3d', minHeight: '420px' }}
            >
              <div className="flex flex-col h-full p-5">
                <motion.span
                  className="text-xs font-bold text-white/50 tracking-wider mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + cardDelay, duration: 0.3 }}
                >
                  {semana.label}
                </motion.span>

                <motion.p
                  className={`text-sm md:text-base font-bold ${accent.text} mb-3`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + cardDelay, duration: 0.3 }}
                >
                  {semana.subtitle}
                </motion.p>

                <div className="flex flex-col gap-2 mb-2">
                  <motion.span
                    className="text-[11px] text-white/40 font-medium uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + cardDelay, duration: 0.3 }}
                  >
                    Qué hacemos
                  </motion.span>
                  {semana.hacemos.map((item, j) => (
                    <motion.div
                      key={item}
                      className="flex items-start gap-2 text-[12px] text-white/70"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.48 + cardDelay + j * 0.06, duration: 0.3 }}
                    >
                      <span className="text-white/30 mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <SemanaVisual visual={semana.visual} delay={0.72 + cardDelay} colorTema={colorTema} />

                <motion.div
                  className="my-2 h-px bg-white/10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.85 + cardDelay, duration: 0.4 }}
                />

                <div className="flex flex-col gap-1">
                  <motion.span
                    className="text-[11px] font-bold text-verde uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + cardDelay, duration: 0.3 }}
                  >
                    Qué ves vos
                  </motion.span>
                  {semana.ves.map((item, j) => (
                    <motion.div
                      key={item}
                      className="flex items-start gap-2 text-[12px] text-white/80"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.98 + cardDelay + j * 0.06, duration: 0.3 }}
                    >
                      <span className="text-verde mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="sm:hidden flex flex-col w-full max-w-[400px]">
        <div
          className="relative w-full touch-pan-y"
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX };
          }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            touchStart.current = null;
            if (dx < -40 && activeWeek < semanas.length - 1) goTo(activeWeek + 1);
            else if (dx > 40 && activeWeek > 0) goTo(activeWeek - 1);
          }}
        >
          <AnimatePresence mode="wait" custom={swipeDir}>
            <motion.div
              key={activeWeek}
              custom={swipeDir}
              variants={{
                enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className={`flex flex-col w-full rounded-2xl border-2 ${accentClasses[active.accent].border} bg-navy p-6`}
            >
              <span className="text-[10px] font-bold text-white/50 tracking-wider mb-1">{active.label}</span>
              <p className={`text-xs font-bold ${accentClasses[active.accent].text} mb-2`}>{active.subtitle}</p>

              <div className="flex flex-col gap-1 mb-2">
                <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Qué hacemos</span>
                {active.hacemos.map((item) => (
                  <div key={item} className="flex items-start gap-1.5 text-[11px] text-white/70">
                    <span className="text-white/30 mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <SemanaVisual visual={active.visual} delay={0} colorTema={colorTema} />

              <div className="my-2.5 h-px bg-white/10" />

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-verde uppercase tracking-wider">Qué ves vos</span>
                {active.ves.map((item) => (
                  <div key={item} className="flex items-start gap-1.5 text-[11px] text-white/80">
                    <span className="text-verde mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-2 py-3">
          {semanas.map((semana, i) => (
            <button
              key={semana.id}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeWeek ? 'bg-rosa scale-125' : 'bg-white/30'
              }`}
              aria-label={`Ver ${semana.label.toLowerCase()}`}
            />
          ))}
        </div>
      </div>

      <motion.p
        className="max-sm:mt-3 mt-8 text-center max-w-[800px] max-sm:text-xs text-sm md:text-base text-white/40 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        Al final del mes sabés qué funcionó, cuánto te costó cada consulta
        <br className="max-sm:hidden" /> y cuál es el próximo paso para seguir creciendo.
      </motion.p>
    </div>
  );
}
