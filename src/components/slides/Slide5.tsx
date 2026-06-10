import { motion } from 'framer-motion';
import { Fragment } from 'react';

const AnimatedGrid = () => {
  const lineCount = 10;
  const variants = {
    hidden: { opacity: 0, x: -10, y: -10 },
    visible: (i: number) => ({
      opacity: [0, 0.4, 0.6, 0.4, 0],
      x: 0,
      y: 0,
      transition: {
        duration: 4,
        ease: 'easeOut',
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-full h-full">
        {Array.from({ length: lineCount }).map((_, i) => (
          <Fragment key={i}>
            <motion.div
              variants={variants}
              custom={i}
              initial="hidden"
              animate="visible"
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-white/10 to-white/30"
              style={{ top: `${(i * 100) / lineCount}%` }}
            />
            <motion.div
              variants={variants}
              custom={lineCount + i}
              initial="hidden"
              animate="visible"
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/10 to-white/30"
              style={{ left: `${(i * 100) / lineCount}%` }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const LogoKhorven = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 375 345" className={className}>
    <defs>
      <linearGradient id="logoSlide5" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="hsl(346,99%,62%)" />
        <stop offset="1" stopColor="hsl(81,85%,56%)" />
      </linearGradient>
    </defs>
    <g transform="translate(0,345) scale(0.1,-0.1)" fill="url(#logoSlide5)">
      <g>
        <path d="M320 2755 l0 -600 447 -295 c245 -162 501 -331 569 -375 143 -94 137 -81 127 -272 -5 -93 -9 -123 -19 -119 -41 16 -472 311 -550 378 l-94 79 2 -228 3 -228 120 -80 c66 -44 199 -132 295 -195 137 -89 197 -136 276 -215 101 -100 201 -236 250 -340 l24 -50 0 702 0 702 -240 158 c-132 87 -386 254 -565 372 l-325 213 0 337 0 336 -160 160 -160 160 0 -600z" />
      </g>
      <g>
        <path d="M3337 3192 l-157 -158 0 -336 0 -335 -302 -200 c-167 -110 -421 -278 -565 -373 l-263 -172 0 -702 1 -701 37 70 c80 149 177 273 291 373 42 37 203 150 359 252 l282 185 0 228 0 228 -96 -81 c-89 -75 -534 -380 -555 -380 -5 0 -9 68 -9 155 l0 156 488 322 c268 178 524 347 570 376 l82 53 0 599 c0 329 -1 599 -3 599 -2 0 -74 -71 -160 -158z" />
      </g>
    </g>
  </svg>
);

export default function Slide5() {
  const headline = '¿Empezamos mañana?';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-navy overflow-hidden">
      <AnimatedGrid />
      <div className="sm:flex hidden absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center opacity-[0.06] pointer-events-none select-none">
        {'KHORVEN'.split('').map((char, i) => (
          <span
            key={i}
            className="text-[100px] font-extrabold leading-[0.8]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center max-sm:-mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <LogoKhorven className="max-sm:w-10 max-sm:h-9 w-12 h-11 mb-4" />
          </motion.div>

          <motion.h2
            className="max-sm:text-2xl text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
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
            className="max-sm:text-base text-xl md:text-2xl text-white/50 max-sm:mb-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            Tu primer mes gratis, sin compromiso
          </motion.p>
        </div>

        <div className="max-sm:mt-12" />

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
            className="relative max-sm:px-6 max-sm:py-3 px-12 py-4 rounded-full bg-rosa text-white font-bold max-sm:text-base text-xl md:text-2xl overflow-hidden"
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