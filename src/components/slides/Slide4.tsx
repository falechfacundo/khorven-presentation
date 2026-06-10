import { motion } from 'framer-motion';
import { X, Check, Film } from 'lucide-react';

const antesItems = [
  'Videos sin edición',
  'Posteo sin plan',
  'Sin distribución pagada',
  'Sin tracking de resultados',
];

const despuesItems = [
  'Videos editados premium',
  'Calendario estratégico',
  'Meta Ads + distribución',
  'Dashboard de métricas',
];

function PanelItem({
  icon,
  text,
  delay,
  isBefore,
}: {
  icon: 'x' | 'check';
  text: string;
  delay: number;
  isBefore: boolean;
}) {
  const Icon = icon === 'x' ? X : Check;
  return (
    <motion.div
      className="flex items-start max-sm:gap-2 gap-3 max-sm:text-sm text-base"
      initial={{ opacity: 0, x: isBefore ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
    >
      <span className="shrink-0 mt-0.5">
        <Icon
          size={18}
          className={
            isBefore
              ? 'text-rosa'
              : 'text-verde'
          }
        />
      </span>
      <span className={isBefore ? 'text-white/60' : 'text-white/85'}>
        {text}
      </span>
    </motion.div>
  );
}

export default function Slide4() { // Renamed from Slide3 to Slide4
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-navy max-sm:px-4 max-sm:py-4 px-[60px] py-8 overflow-hidden">
      <motion.h2
        className="max-sm:text-[28px] text-[48px] font-bold text-white leading-none mb-1"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Esto es lo que cambia
      </motion.h2>

      <motion.p
        className="max-sm:text-sm text-lg text-white/60 max-sm:mb-6 mb-10"
        style={{ fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        En 30 días tu contenido no es lo mismo
      </motion.p>

      <div className="max-sm:grid-cols-1 grid-cols-2 max-sm:gap-4 gap-8 grid w-full max-w-[1200px]">
        <motion.div
          className="rounded-2xl border border-white/10 max-sm:p-4 p-10 flex flex-col relative overflow-hidden max-sm:!h-auto"
          style={{
            height: '500px',
            filter: 'grayscale(80%) brightness(0.85)', // Static filter for 'before' state
            transition: 'filter 0.5s ease',
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateY: -45, opacity: 0, x: -50 }}
          animate={{
            rotateY: 0,
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
          }}
        >
          <motion.p
            className="max-sm:text-2xl text-[32px] font-bold text-white/40 max-sm:mb-2 mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            ANTES
          </motion.p>

          <motion.div
            className="h-px bg-rosa/20 max-sm:mb-4 mb-8 w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />

          <div className="flex flex-col max-sm:gap-3 gap-5 flex-1">
            {antesItems.map((item, i) => (
              <PanelItem
                key={i}
                icon="x"
                text={item}
                delay={0.4 + i * 0.1}
                isBefore
              />
            ))}
          </div>

          <motion.p
            className="max-sm:text-sm text-base text-white/50 italic mt-auto pt-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.4 }}
          >
            "Tu contenido existe,<br />pero nadie lo ve"
          </motion.p>
        </motion.div>

        <motion.div
          className="rounded-2xl border-2 border-verde max-sm:p-4 p-10 flex flex-col relative overflow-hidden max-sm:!h-auto"
          style={{
            height: '500px',
            background:
              'linear-gradient(180deg, hsla(81,85%,56%,0.06) 0%, #0a0e27 100%)',
            boxShadow: 'inset 0 0 60px hsla(81,85%,56%,0.08)',
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateY: 45, opacity: 0, x: 50 }}
          animate={{
            rotateY: 0,
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 },
          }}
        >
          <motion.p
            className="max-sm:text-2xl text-[32px] font-bold text-verde max-sm:mb-2 mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            DESPUÉS
          </motion.p>

          <motion.div
            className="h-0.5 bg-verde max-sm:mb-4 mb-8 w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            style={{ transformOrigin: 'left' }}
          />

          <div className="flex flex-col max-sm:gap-3 gap-5 flex-1">
            {despuesItems.map((item, i) => (
              <PanelItem
                key={i}
                icon="check"
                text={item}
                delay={0.8 + i * 0.1}
                isBefore={false}
              />
            ))}
          </div>

          <motion.p
            className="max-sm:text-sm text-base text-verde/70 italic mt-auto pt-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.4 }}
          >
            "Tu contenido + sistema =<br />3x más alcance en 30 días"
          </motion.p>
        </motion.div>
      </div>

      <motion.p
        className="max-sm:text-lg text-2xl font-bold text-white text-center max-sm:mt-6 mt-10"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        No es magia. Es sistema.
      </motion.p>
    </div>
  );
}