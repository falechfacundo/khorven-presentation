import { motion, useScroll, useSpring } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { Prospecto } from '@data/prospectos';
import ScrollReveal from '@/components/propuesta/ScrollReveal';
import HeroSection from '@/components/propuesta/HeroSection';
import ProblemaSection from '@/components/propuesta/ProblemaSection';
import PlanSection from '@/components/propuesta/PlanSection';
import AntesDespuesSection from '@/components/propuesta/AntesDespuesSection';
import PaquetesSection from '@/components/propuesta/PaquetesSection';
import CierreSection from '@/components/propuesta/CierreSection';

interface PropuestaViewProps {
  prospecto: Prospecto;
}

export default function PropuestaView({ prospecto }: PropuestaViewProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Re-tematiza todas las utilidades `*-rosa` de Tailwind con el color del prospecto.
  const themeVars = { '--color-rosa': prospecto.colorTema } as CSSProperties;

  return (
    <div style={themeVars} className="relative w-full bg-navy text-white overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-rosa origin-left z-50"
        style={{ scaleX: progress }}
      />

      <section id="inicio">
        <HeroSection prospecto={prospecto} />
      </section>
      <ScrollReveal id="problema">
        <ProblemaSection prospecto={prospecto} />
      </ScrollReveal>
      <ScrollReveal id="plan">
        <PlanSection prospecto={prospecto} />
      </ScrollReveal>
      <ScrollReveal id="cambio">
        <AntesDespuesSection prospecto={prospecto} />
      </ScrollReveal>
      <ScrollReveal id="paquetes">
        <PaquetesSection prospecto={prospecto} />
      </ScrollReveal>
      <ScrollReveal id="cierre">
        <CierreSection prospecto={prospecto} />
      </ScrollReveal>
    </div>
  );
}
