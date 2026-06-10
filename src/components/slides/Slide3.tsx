import { motion } from 'framer-motion';
import { Fragment } from 'react';

// Component for animated sparkles/lens flares
const Sparkles = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/70"
        style={{
          width: Math.random() * 6 + 3,
          height: Math.random() * 6 + 3,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.2,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.2, 0.8],
          x: 0, // Reset x to ensure animation starts correctly
          y: 0, // Reset y to ensure animation starts correctly
        }}
        transition={{
          duration: Math.random() * 2 + 1,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 0.5, // Stagger the animations
        }}
      />
    ))}
  </div>
);

export default function Slide3() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden max-sm:px-3 max-sm:py-2 px-8 py-4">
      <Sparkles /> {/* Add the sparkles effect */}

      <motion.h3
        className="text-base text-white/60 text-center mb-8 relative z-10"
        style={{ fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        Esto probablemente te pasa
      </motion.h3>

      <div className="flex flex-col items-center w-full max-w-[800px] relative z-10">
        {/* Content from the original Slide3 */}
        {[
          {
            title: 'Querés crecer',
            subtitle: 'Pero sin estrategia y recursos limitados',
            icon: 'growth',
            bg: '#0f172a',
            border: '#ffffff',
            text: '#ffffff'
          },
          {
            title: 'Grabas contenido',
            subtitle: '3 videos/mes, sin calendario estratégico',
            icon: 'content',
            bg: '#0f172a',
            border: '#ffffff',
            text: '#ffffff'
          },
          {
            title: 'Pero nadie lo ve',
            subtitle: 'Promedio de 10 views por video',
            icon: 'visibility',
            bg: '#0f172a',
            border: '#ffffff',
            text: '#ffffff'
          },
          {
            title: 'Sin consultas',
            subtitle: 'Cero nuevos clientes',
            icon: 'queries',
            bg: '#0f172a',
            border: '#ffffff',
            text: '#ffffff'
          },
          {
            title: 'Inversión sin sistema',
            subtitle: 'USD 500 gastados en campañas',
            icon: 'investment',
            bg: '#7f1d1d',
            border: '#7f1d1d',
            text: '#ffffff'
          }
        ].map((step, i) => {
          const width = `${100 - i * 12}%`;
          return (
            <Fragment key={i}>
              <motion.div
                className="max-sm:px-4 max-sm:py-3 px-6 py-4 mb-2 rounded-xl border-2 backdrop-blur-sm"
                style={{ background: step.bg, borderColor: step.border, width }}
                variants={{
                  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
                  visible: (idx: number) => ({
                    clipPath: 'inset(0% 0 0 0)',
                    opacity: 1,
                    transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 * idx }
                  })
                }}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center max-sm:gap-2 gap-4 w-full">
                  {/* Icon component would go here, assuming it's defined elsewhere */}
                  <span className="max-sm:text-sm text-lg font-bold" style={{ color: step.text, fontFamily: 'var(--font-body)' }}>
                    {step.title}
                  </span>
                  <span className="max-sm:text-xs text-sm text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                    {step.subtitle}
                  </span>
                </div>
              </motion.div>
              {i < 5 - 1 && ( // Assuming 5 steps, adjust if the actual number is different
                <motion.div
                  className="w-0.5 bg-gradient-to-b from-rosa/40 to-rosa/10 max-sm:!h-2"
                  style={{ height: 18 }}
                  initial={{ height: 0 }}
                  animate={{ height: 18 }}
                  transition={{ duration: 0.4, delay: 0.2 * (i + 1) }}
                />
              )}
            </Fragment>
          );
        })}
      </div>

      <motion.div
        className="max-sm:mt-6 mt-10 max-sm:px-4 max-sm:py-4 px-8 py-6 rounded-2xl text-center bg-gradient-to-r from-rosa via-[#f43f5e] to-rosa text-white relative z-10"
        style={{ fontFamily: 'var(--font-body)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, boxShadow: '0 0 40px rgba(246,100,150,0.4)' }}
        transition={{ duration: 0.7, delay: 0.2 * 5 + 0.6 }}
      >
        <p className="max-sm:text-base text-xl font-black uppercase mb-1">El problema: FALTA SISTEMA</p>
        <p className="max-sm:text-sm text-md italic text-white/90">No es el contenido. Es la estrategia.</p>
      </motion.div>
    </div>
  );
}