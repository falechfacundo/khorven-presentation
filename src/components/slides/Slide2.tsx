import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, usePresence } from 'framer-motion';
import { Film } from 'lucide-react';

const weeks = [
  {
    label: 'SEMANA 1',
    subtitle: 'Auditoría + 3 test videos',
    borderColor: 'border-rosa',
    badgeColor: 'text-rosa',
    id: 'w1',
    hacemos: [
      'Revisamos tu contenido actual',
      'Grabamos + editamos 3 videos',
      'Testeamos 3 ángulos diferentes',
    ],
    ves: [
      '3 videos editados premium',
      'Posted en tus redes',
      'Primeras métricas (views)',
    ],
    visual: 'videos' as const,
  },
  {
    label: 'SEMANA 2',
    subtitle: 'Plan de contenido + 4 videos',
    borderColor: 'border-verde',
    badgeColor: 'text-verde',
    id: 'w2',
    hacemos: [
      'Armamos calendario estratégico',
      'Editamos 4 videos más',
      'Setup de ads (si paga)',
    ],
    ves: [
      '4 nuevos videos publicados',
      'Alcance empezando a crecer',
      'Primeros comentarios/consultas',
    ],
    visual: 'calendar' as const,
  },
  {
    label: 'SEMANA 3-4',
    subtitle: 'Edición premium + optimización',
    borderColor: 'border-rosa',
    badgeColor: 'text-rosa',
    id: 'w3-4',
    hacemos: [
      'Intensificamos la edición',
      'Optimizamos según lo que funciona',
      'Ajustamos strategy en vivo',
      '1 call de seguimiento',
    ],
    ves: [
      'Resultados consistentes',
      'Crecimiento visible en 30 días',
      'Un plan claro para después',
    ],
    visual: 'chart' as const,
  },
];

const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function VideoFrames({ delay }: { delay: number }) {
  return (
    <div className="flex gap-2 my-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="flex-1 h-14 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-lg"
          initial={{ opacity: 0, y: 12, scale: 0.85 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: [
              '0 0 0px hsla(346,99%,62%,0)',
              '0 0 12px hsla(346,99%,62%,0.25)',
              '0 0 0px hsla(346,99%,62%,0)',
            ],
          }}
          transition={{
            y: {
              delay: delay + i * 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 12,
            },
            opacity: {
              delay: delay + i * 0.1,
              duration: 0.2,
            },
            scale: {
              delay: delay + i * 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 12,
            },
            boxShadow: {
              delay: delay + 0.4 + i * 0.1,
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <Film size={20} className="text-white/50" />
        </motion.div>
      ))}
    </div>
  );
}

function CalendarGrid({ delay }: { delay: number }) {
  const week1 = [true, true, false, true, false, false, false];
  const week2 = [false, true, false, true, true, false, false];
  const dotColors = ['bg-verde', 'bg-rosa'];

  return (
    <div className="my-2">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map((d, i) => (
          <span
            key={i}
            className="text-[10px] text-white/30 text-center font-medium"
          >
            {d}
          </span>
        ))}
      </div>
      {[week1, week2].map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
          {week.map((hasDot, di) => {
            const dotIndex = wi * 7 + di;
            return (
              <motion.div
                key={di}
                className="h-4 rounded flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: delay + 0.05 + dotIndex * 0.035,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
              >
                {hasDot && (
                  <motion.div
                    className={`w-1.5 h-1.5 rounded-full ${
                      dotColors[dotIndex % 2]
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7] }}
                    transition={{
                      delay: delay + 0.05 + dotIndex * 0.035,
                      duration: 0.3,
                    }}
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
        {points.map((pt, i) => {
          const progress = (pt.x - 5) / totalX;
          const dotDelay = delay + progress * lineDuration + 0.05;

          return (
            <g key={i}>
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="3"
                className="fill-verde"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: dotDelay,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
              />
              <motion.text
                x={pt.x}
                y={pt.y - 7}
                className="fill-white/30 text-[6px]"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: dotDelay + 0.05,
                  duration: 0.2,
                }}
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

export default function Slide2() {
  const [isPresent, safeToRemove] = usePresence();
  const [exiting, setExiting] = useState(false);
  const [activeWeek, setActiveWeek] = useState(0);
  const [swipeDir, setSwipeDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const touchStart = useRef<{ x: number } | null>(null);

  useEffect(() => {
    if (!isPresent) {
      setExiting(true);
      timerRef.current = setTimeout(() => safeToRemove(), 800);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [isPresent, safeToRemove]);

  const cardsExitDelay = 0.35;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-navy max-sm:px-4 max-sm:py-8 px-10 py-8 overflow-hidden">
      <motion.h2
        className="max-sm:text-[28px] text-[56px] font-bold text-white leading-none max-sm:mb-2 mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tu mes con Khorven
      </motion.h2>

      <motion.p
        className="max-sm:text-sm text-[20px] text-white/50 max-sm:mb-4 mb-8"
        style={{ fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        En 30 días ves resultados reales
      </motion.p>

      <div className="max-sm:hidden grid grid-cols-3 gap-6 w-full max-w-[1200px]">
        {weeks.map((week, i) => {
          const cardDelay = i * 0.15;
          const isRosa = i % 2 === 0;

          return (
            <motion.div
              key={week.id}
              className={`flex flex-col rounded-2xl border-2 ${week.borderColor} bg-navy`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={
                exiting
                  ? {
                      rotateY: -90,
                      opacity: 0,
                      y: 20,
                      transition: {
                        duration: 0.35,
                        delay: cardsExitDelay + (2 - i) * 0.05,
                      },
                    }
                  : {
                      rotateY: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        ease: 'easeOut',
                        delay: cardDelay,
                      },
                    }
              }
              whileHover={{
                boxShadow: isRosa
                  ? '0 0 30px hsla(346, 99%, 62%, 0.3)'
                  : '0 0 30px hsla(81, 85%, 56%, 0.3)',
              }}
              style={{ transformStyle: 'preserve-3d', height: '420px' }}
            >
              <div className="flex flex-col h-full p-5">
                <div className="flex items-start justify-between mb-2">
                  <motion.span
                    className="text-xs font-bold text-white/50 tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + cardDelay, duration: 0.3 }}
                  >
                    {week.label}
                  </motion.span>
                </div>

                <motion.p
                  className={`text-sm md:text-base font-bold ${week.badgeColor} mb-3`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + cardDelay, duration: 0.3 }}
                >
                  {week.subtitle}
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

                  {week.hacemos.map((item, j) => (
                    <motion.div
                      key={j}
                      className="flex items-start gap-2 text-[12px] text-white/70"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.48 + cardDelay + j * 0.06,
                        duration: 0.3,
                      }}
                    >
                      <span className="text-white/30 mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                {week.visual === 'videos' && (
                  <VideoFrames delay={0.72 + cardDelay} />
                )}
                {week.visual === 'calendar' && (
                  <CalendarGrid delay={0.72 + cardDelay} />
                )}
                {week.visual === 'chart' && (
                  <GrowthChart delay={0.72 + cardDelay} />
                )}

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
                    Qué ves tú
                  </motion.span>

                  {week.ves.map((item, j) => (
                    <motion.div
                      key={j}
                      className="flex items-start gap-2 text-[12px] text-white/80"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.98 + cardDelay + j * 0.06,
                        duration: 0.3,
                      }}
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
          className="relative w-full"
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX };
          }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            touchStart.current = null;
            if (Math.abs(dx) > 40) {
              e.stopPropagation();
              if (dx < 0 && activeWeek < 2) {
                setSwipeDir(1);
                setActiveWeek((prev) => prev + 1);
              } else if (dx > 0 && activeWeek > 0) {
                setSwipeDir(-1);
                setActiveWeek((prev) => prev - 1);
              }
            }
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
              className={`flex flex-col w-full rounded-2xl border-2 ${weeks[activeWeek].borderColor} bg-navy p-6`}
            >
              <span className="text-[10px] font-bold text-white/50 tracking-wider mb-1">
                {weeks[activeWeek].label}
              </span>
              <p className={`text-xs font-bold ${weeks[activeWeek].badgeColor} mb-2`}>
                {weeks[activeWeek].subtitle}
              </p>

              <div className="flex flex-col gap-1 mb-2">
                <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                  Qué hacemos
                </span>
                {weeks[activeWeek].hacemos.map((item, j) => (
                  <div key={j} className="flex items-start gap-1.5 text-[11px] text-white/70">
                    <span className="text-white/30 mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {weeks[activeWeek].visual === 'videos' && <VideoFrames delay={0} />}
              {weeks[activeWeek].visual === 'calendar' && <CalendarGrid delay={0} />}
              {weeks[activeWeek].visual === 'chart' && <GrowthChart delay={0} />}

              <div className="my-2.5 h-px bg-white/10" />

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-verde uppercase tracking-wider">
                  Qué ves tú
                </span>
                {weeks[activeWeek].ves.map((item, j) => (
                  <div key={j} className="flex items-start gap-1.5 text-[11px] text-white/80">
                    <span className="text-verde mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-2 py-2">
          {weeks.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setSwipeDir(i > activeWeek ? 1 : -1);
                setActiveWeek(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeWeek
                  ? 'bg-rosa scale-125'
                  : 'bg-white/30'
              }`}
              aria-label={`Semana ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="max-sm:mt-3 mt-6 text-center max-sm:max-w-full max-w-[800px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <p
          className="max-sm:text-[11px] text-sm md:text-base text-white/40 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Sabemos si esto funciona para tu negocio.
          <br />
          Si funciona → pasamos a un plan de crecimiento.
          <br />
          Si no → revisamos qué ajustar.
        </p>
      </motion.div>
    </div>
  );
}