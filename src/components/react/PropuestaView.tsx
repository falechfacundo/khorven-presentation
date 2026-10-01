import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { Prospecto } from '@data/prospectos';
import HeroSection from '@/components/propuesta/HeroSection';
import ProblemaSection from '@/components/propuesta/ProblemaSection';
import DemoSection from '@/components/propuesta/DemoSection';
import PlanSection from '@/components/propuesta/PlanSection';
import AntesDespuesSection from '@/components/propuesta/AntesDespuesSection';
import PaquetesSection from '@/components/propuesta/PaquetesSection';
import CierreSection from '@/components/propuesta/CierreSection';
import { CursorGlow, Grain } from '@/components/propuesta/ui';

interface PropuestaViewProps {
  prospecto: Prospecto;
}

export default function PropuestaView({ prospecto }: PropuestaViewProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Todas las utilidades `*-accent` toman el color del prospecto.
  const themeVars = { '--color-accent': prospecto.colorTema } as CSSProperties;

  return (
    <MotionConfig reducedMotion="user">
      <div
        style={themeVars}
        className="relative w-full overflow-x-clip bg-ink text-white antialiased selection:bg-accent selection:text-white"
      >
        <motion.div className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent" style={{ scaleX: progress }} />
        <CursorGlow />
        <Grain />

        <main className="relative z-10">
          <HeroSection prospecto={prospecto} />
          <ProblemaSection prospecto={prospecto} />
          <DemoSection prospecto={prospecto} />
          <PlanSection prospecto={prospecto} />
          <AntesDespuesSection prospecto={prospecto} />
          <PaquetesSection prospecto={prospecto} />
          <CierreSection prospecto={prospecto} />
        </main>
      </div>
    </MotionConfig>
  );
}
