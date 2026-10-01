import { useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@lib/utils';

interface ScrollRevealProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Monta la sección recién cuando entra en pantalla, así sus animaciones
 * (pensadas para el formato slide) arrancan con el scroll y con los mismos delays.
 */
export default function ScrollReveal({ id, children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id={id} ref={ref} className={cn('relative w-full min-h-dvh', className)}>
      {inView ? children : null}
    </section>
  );
}
