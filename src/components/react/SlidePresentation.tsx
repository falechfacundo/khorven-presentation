import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Slide1 from '@/components/slides/Slide1';
import Slide2 from '@/components/slides/Slide2';
import Slide3 from '@/components/slides/Slide3';
import Slide4 from '@/components/slides/Slide4';
import Slide5 from '@/components/slides/Slide5';

const TOTAL_SLIDES = 5;

const slideVariants = {
  enter: (dir: number) => ({
    y: dir >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    y: dir >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function SlidePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goNext = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goNext();
        else goPrev();
      } else if (Math.abs(dy) > 50) {
        if (dy < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <Slide1 />;
      case 1:
        return <Slide2 />;
      case 2:
        return <Slide3 />;
      case 3:
        return <Slide4 />;
      case 4:
        return <Slide5 />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative w-full h-dvh overflow-hidden bg-navy"
      style={{ perspective: '1200px' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: 'tween',
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>

      <nav className="absolute max-sm:bottom-4 bottom-6 left-1/2 -translate-x-1/2 flex items-center max-sm:gap-3 gap-6 z-50">
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xl font-bold max-sm:px-2 px-3 py-1"
          aria-label="Anterior"
        >
          <span className="max-sm:hidden">← Prev</span>
          <span className="hidden max-sm:inline">←</span>
        </button>

        <div className="flex items-center max-sm:gap-2 gap-3">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={`max-sm:w-4 max-sm:h-4 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'bg-rosa scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          className="text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xl font-bold max-sm:px-2 px-3 py-1"
          aria-label="Siguiente"
        >
          <span className="max-sm:hidden">Next →</span>
          <span className="hidden max-sm:inline">→</span>
        </button>
      </nav>
    </div>
  );
}
