import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, Check, Plus, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Prospecto } from '@data/prospectos';
import { cn } from '@lib/utils';
import { getWhatsappUrl, nombreEnMensaje } from '@lib/whatsapp';
import { CountUp, EASE, Eyebrow, RevealText, words } from './ui';

interface PaquetesSectionProps {
  prospecto: Prospecto;
}

interface Paquete {
  nombre: string;
  /** Precio mensual de lanzamiento en USD */
  precio: number;
  notaPrecio: string;
  items: string[];
  recomendado: boolean;
  cta: string;
  mensaje: (nombreNegocio: string) => string;
}

const NOTA_PAUTA = '*El presupuesto de pauta se paga directamente a Meta.';

const paquetes: Paquete[] = [
  {
    nombre: 'Paquete Validación',
    precio: 150,
    notaPrecio: 'Precio de lanzamiento (primeros 5 clientes). Luego $250/mes.',
    items: [
      '4 Reels mensuales de alto impacto.',
      'Gestión y optimización de campañas en Meta Ads.',
      'Reporte mensual de métricas.',
    ],
    recomendado: false,
    cta: 'Elegir Validación',
    mensaje: (nombreNegocio) =>
      `Hola Ezequiel, vi la propuesta para ${nombreNegocio}. Me interesa arrancar con el Paquete Validación para probar el impacto del contenido y las campañas.`,
  },
  {
    nombre: 'Paquete Sistema',
    precio: 250,
    notaPrecio: 'Precio de lanzamiento (primeros 5 clientes). Luego $450/mes.',
    items: [
      'Todo lo incluido en Validación.',
      '+ Landing Page de alta conversión (One-Page) incluida.',
      '+ Automatización (n8n/Python): Respuesta a leads en <1 min y derivación a WhatsApp/CRM.',
    ],
    recomendado: true,
    cta: 'Elegir Sistema',
    mensaje: (nombreNegocio) =>
      `Hola Ezequiel, vi la propuesta para ${nombreNegocio}. Me interesa el Paquete Sistema para implementar la landing page y la automatización de consultas.`,
  },
];

export default function PaquetesSection({ prospecto }: PaquetesSectionProps) {
  return (
    <section id="paquetes" className="relative py-24 sm:py-32 compact:py-16">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[50vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10">
        <div className="text-center">
          <Eyebrow index="05" className="justify-center">Inversión</Eyebrow>
          <RevealText
            items={[...words('Elegí cómo'), ...words('empezar.', 'font-serif italic font-normal text-accent')]}
            className="mt-4 text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white"
          />
          <motion.p
            className="mx-auto mt-4 max-w-xl text-base text-white/55 sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Dos formas de arrancar. Una sola meta: más clientes para {prospecto.nombreNegocio}.
          </motion.p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 md:gap-8 compact:mt-10" style={{ perspective: '1400px' }}>
          {paquetes.map((p, i) => (
            <motion.div
              key={p.nombre}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }}
            >
              <TiltCard>
                {p.recomendado ? (
                  <div className="border-spin h-full rounded-[1.75rem] p-px shadow-[0_30px_100px_-40px_var(--color-accent)]">
                    <CardBody paquete={p} href={getWhatsappUrl(prospecto, p.mensaje(nombreEnMensaje(prospecto)))} />
                  </div>
                ) : (
                  <div className="h-full rounded-[1.75rem] border border-white/10">
                    <CardBody paquete={p} href={getWhatsappUrl(prospecto, p.mensaje(nombreEnMensaje(prospecto)))} />
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Inclina la card en 3D siguiendo al mouse. */
function TiltCard({ children }: { children: ReactNode }) {
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        rx.set(((e.clientY - r.top) / r.height - 0.5) * -7);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

function CardBody({ paquete, href }: { paquete: Paquete; href: string }) {
  const { recomendado } = paquete;
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-[calc(1.75rem-1px)] p-7 sm:p-9 compact:p-7',
        recomendado ? 'bg-[#0c0c10]' : 'bg-white/[0.02]',
      )}
      style={recomendado ? { backgroundImage: 'linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 55%)' } : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn('text-xl font-semibold sm:text-2xl', recomendado ? 'text-white' : 'text-white/85')}>{paquete.nombre}</h3>
        {recomendado && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            <Sparkles size={12} aria-hidden /> Recomendado
          </span>
        )}
      </div>

      <p className="mt-6 flex items-baseline gap-2">
        <span className="text-6xl font-bold tracking-tight text-white sm:text-7xl compact:text-6xl">
          $<CountUp value={paquete.precio} />
        </span>
        <span className="text-white/45">USD / mes</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{paquete.notaPrecio}</p>

      <div className="my-6 h-px bg-white/10 compact:my-5" />

      <ul className="flex flex-1 flex-col gap-3.5">
        {paquete.items.map((item) => {
          const esExtra = item.startsWith('+ ');
          const Icon = esExtra ? Plus : Check;
          return (
            <li key={item} className="flex gap-3 text-sm leading-relaxed sm:text-[15px]">
              <span
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  esExtra ? 'bg-accent text-white' : 'bg-white/10 text-white/80',
                )}
              >
                <Icon size={12} strokeWidth={3} />
              </span>
              <span className={esExtra ? 'text-white' : 'text-white/75'}>{esExtra ? item.slice(2) : item}</span>
            </li>
          );
        })}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group mt-8 flex items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-colors sm:text-base compact:mt-6',
          recomendado ? 'bg-accent text-white' : 'border border-white/15 text-white hover:border-white/40',
        )}
      >
        {paquete.cta}
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45',
            recomendado ? 'bg-white text-black' : 'bg-white/10',
          )}
        >
          <ArrowUpRight size={18} />
        </span>
      </a>

      <p className="mt-4 text-xs text-gray-400">{NOTA_PAUTA}</p>
    </div>
  );
}
