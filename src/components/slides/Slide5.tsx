import { motion } from 'framer-motion';

export default function Slide5() {
  const headline = '¿Empezamos mañana?';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-navy overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.svg
          viewBox="0 0 60 60"
          className="w-16 h-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          <path d="M20,10 L20,50" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M20,30 L45,10" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M20,30 L45,50" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
        </motion.svg>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-12 h-16 rounded border border-white/20" />
          ))}
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="w-16 h-24 rounded border border-white/20" />
          <div className="w-16 h-24 rounded border border-white/20" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
        >
          {headline.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5 + i * 0.04,
                duration: 0.05,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-white/50 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          Tu primer mes gratis, sin compromiso
        </motion.p>

        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3.5,
          }}
        >
          <motion.button
            className="relative px-12 py-4 rounded-full bg-rosa text-white font-bold text-xl md:text-2xl overflow-hidden"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                '0 0 0px hsla(346, 99%, 62%, 0.4)',
                '0 0 40px hsla(346, 99%, 62%, 0.6)',
                '0 0 0px hsla(346, 99%, 62%, 0.4)',
              ],
            }}
            transition={{
              y: { delay: 2.6, duration: 0.6, ease: 'easeOut' },
              opacity: { delay: 2.6, duration: 0.6, ease: 'easeOut' },
              boxShadow: {
                delay: 3.2,
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 60px hsla(346, 99%, 62%, 0.5)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ['100%', '200%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 3.5,
              }}
            />

            <span className="relative z-10 block">
              ¡Quiero mi piloto gratis!
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
