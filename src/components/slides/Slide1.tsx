import { motion } from 'framer-motion';

const words = 'Hacemos que tu contenido no se vea como contenido'.split(' ');

export default function Slide1() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, hsla(346,99%,62%,0.12) 0%, hsla(81,85%,56%,0.06) 50%, transparent 70%)',
            'radial-gradient(ellipse at 50% 50%, hsla(346,99%,62%,0.2) 0%, hsla(81,85%,56%,0.12) 50%, transparent 70%)',
            'radial-gradient(ellipse at 50% 50%, hsla(346,99%,62%,0.12) 0%, hsla(81,85%,56%,0.06) 50%, transparent 70%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.svg
          viewBox="0 0 375 345"
          className="w-48 h-44 md:w-56 md:h-52"
        >
          <defs>
            <linearGradient id="logoFill" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="hsl(346,99%,62%)" />
              <stop offset="1" stopColor="hsl(81,85%,56%)" />
            </linearGradient>
          </defs>

          <g transform="translate(0,345) scale(0.1,-0.1)" fill="url(#logoFill)">
            <motion.g
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <path d="M320 2755 l0 -600 447 -295 c245 -162 501 -331 569 -375 143 -94 137 -81 127 -272 -5 -93 -9 -123 -19 -119 -41 16 -472 311 -550 378 l-94 79 2 -228 3 -228 120 -80 c66 -44 199 -132 295 -195 137 -89 197 -136 276 -215 101 -100 201 -236 250 -340 l24 -50 0 702 0 702 -240 158 c-132 87 -386 254 -565 372 l-325 213 0 337 0 336 -160 160 -160 160 0 -600z" />
            </motion.g>

            <motion.g
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
            >
              <path d="M3337 3192 l-157 -158 0 -336 0 -335 -302 -200 c-167 -110 -421 -278 -565 -373 l-263 -172 0 -702 1 -701 37 70 c80 149 177 273 291 373 l282 185 0 228 0 228 -96 -81 c-89 -75 -534 -380 -555 -380 -5 0 -9 68 -9 155 l0 156 488 322 c268 178 524 347 570 376 l82 53 0 599 c0 329 -1 599 -3 599 -2 0 -74 -71 -160 -158z" />
            </motion.g>
          </g>
        </motion.svg>

        <motion.p
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.25em] mt-4 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
        >
          KHORVEN
        </motion.p>
      </div>

      <motion.h1
        className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-3xl px-6 mt-8 md:mt-10 leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 2.5 + i * 0.1,
              duration: 0.45,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <span
              className={
                i === words.length - 1
                  ? 'bg-gradient-to-r from-rosa to-verde bg-clip-text text-transparent'
                  : 'text-white/90'
              }
            >
              {word}
            </span>
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.7, duration: 0.6 }}
      >
        <motion.span
          className="text-white/30 text-sm md:text-base tracking-widest flex items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-6 h-px bg-white/20" />
          SIGUIENTE
          <span className="w-6 h-px bg-white/20" />
        </motion.span>
      </motion.div>
    </div>
  );
}