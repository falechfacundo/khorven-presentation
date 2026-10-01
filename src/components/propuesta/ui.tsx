import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { cn } from '@lib/utils';

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Tipografía ─────────────────────────────────────────── */

export function Eyebrow({ index, children, className }: { index: string; children: ReactNode; className?: string }) {
  return (
    <motion.p
      className={cn(
        'flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-white/45',
        className,
      )}
      style={{ fontFamily: 'var(--font-mono)' }}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-white/20" />
      {children}
    </motion.p>
  );
}

export interface Word {
  text: string;
  className?: string;
}

/** Convierte un texto en palabras con una clase opcional (para mezclar estilos en un titular). */
export function words(text: string, className?: string): Word[] {
  return text.split(' ').map((t) => ({ text: t, className }));
}

/** Titular con revelado enmascarado palabra por palabra. */
export function RevealText({
  items,
  className,
  delay = 0,
  stagger = 0.05,
  as = 'h2',
}: {
  items: Word[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'p';
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {items.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn('inline-block', w.className)}
            variants={{
              hidden: { y: '110%' },
              visible: { y: '0%', transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {w.text}
          </motion.span>
          {i < items.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}

export function FadeUp({ children, delay = 0, className, ...rest }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ── Superficies ────────────────────────────────────────── */

/** Card con una luz del color de acento que sigue al puntero. */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025]',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 45%)',
        }}
      />
      {children}
    </div>
  );
}

/* ── Interacción ────────────────────────────────────────── */

/** Link que se "atrae" hacia el puntero. */
export function MagneticLink({ children, className, href, strength = 0.25 }: {
  children: ReactNode;
  className?: string;
  href: string;
  strength?: number;
}) {
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

/* ── Atmósfera global ───────────────────────────────────── */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.045] mix-blend-overlay"
      style={{ backgroundImage: NOISE }}
    />
  );
}

/** Luz suave que sigue al cursor (solo con mouse). */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const x = useSpring(mx, { stiffness: 80, damping: 20 });
  const y = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const onMove = (e: globalThis.PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 65%)',
      }}
    />
  );
}

/** Contador numérico que anima de 0 al valor cuando entra en pantalla. */
export function CountUp({ value, className, duration = 1.4 }: { value: number; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    setDisplay(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000));
          setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
