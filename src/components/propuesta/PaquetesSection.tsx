import { motion } from 'framer-motion';
import { Check, MessageCircle, Sparkles } from 'lucide-react';
import type { Prospecto } from '@data/prospectos';
import { withAlpha } from '@lib/color';
import { cn } from '@lib/utils';

interface PaquetesSectionProps {
  prospecto: Prospecto;
}

interface Paquete {
  nombre: string;
  precio: number;
  items: string[];
  recomendado: boolean;
}

const paquetes: Paquete[] = [
  {
    nombre: 'Paquete Tracción',
    precio: 250,
    items: [
      '4 Reels mensuales de alto impacto',
      'Gestión y optimización de Meta Ads',
      'Reporte mensual de métricas',
    ],
    recomendado: false,
  },
  {
    nombre: 'Paquete Sistema',
    precio: 350,
    items: [
      'Todo lo del Paquete Tracción',
      'Automatización (n8n/Python): respuesta a leads en <1 min y derivación a WhatsApp/CRM',
    ],
    recomendado: true,
  },
];

export default function PaquetesSection({ prospecto }: PaquetesSectionProps) {
  const { nombreNegocio, colorTema, whatsappLink } = prospecto;

  return (
    <div
      className="relative w-full min-h-dvh flex flex-col items-center justify-center max-sm:px-4 px-[60px] py-20 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <motion.h2
        className="max-sm:text-[28px] text-[48px] font-bold text-white leading-none mb-2 text-center"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Elegí tu paquete
      </motion.h2>

      <motion.p
        className="max-sm:text-sm text-lg text-white/60 max-sm:mb-8 mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Dos formas de empezar. Una sola meta: más clientes para {nombreNegocio}.
      </motion.p>

      <div className="grid max-sm:grid-cols-1 grid-cols-2 max-sm:gap-8 gap-8 w-full max-w-[1000px]">
        {paquetes.map((paquete, i) => {
          const baseDelay = 0.3 * i;
          return (
            <motion.div
              key={paquete.nombre}
              className={cn(
                'relative rounded-2xl max-sm:p-6 p-10 flex flex-col bg-navy',
                paquete.recomendado ? 'border-2 border-rosa' : 'border border-white/15',
              )}
              style={{
                transformStyle: 'preserve-3d',
                background: paquete.recomendado
                  ? `linear-gradient(180deg, ${withAlpha(colorTema, 0.08)} 0%, #0a0e27 100%)`
                  : undefined,
              }}
              initial={{ rotateY: i === 0 ? -45 : 45, opacity: 0, x: i === 0 ? -50 : 50 }}
              animate={{
                rotateY: 0,
                opacity: 1,
                x: 0,
                boxShadow: paquete.recomendado
                  ? [`0 0 0px ${withAlpha(colorTema, 0)}`, `0 0 40px ${withAlpha(colorTema, 0.35)}`, `0 0 0px ${withAlpha(colorTema, 0)}`]
                  : 'none',
              }}
              transition={{
                rotateY: { duration: 0.7, ease: 'easeOut', delay: baseDelay },
                opacity: { duration: 0.7, ease: 'easeOut', delay: baseDelay },
                x: { duration: 0.7, ease: 'easeOut', delay: baseDelay },
                boxShadow: { delay: 1.4, duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.02 }}
            >
              {paquete.recomendado && (
                <motion.span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-rosa px-4 py-1 text-xs font-bold tracking-widest text-white uppercase whitespace-nowrap"
                  initial={{ opacity: 0, y: 8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: baseDelay + 0.7, type: 'spring', stiffness: 300, damping: 14 }}
                >
                  <Sparkles size={14} aria-hidden />
                  Recomendado
                </motion.span>
              )}

              <motion.p
                className={cn(
                  'max-sm:text-xl text-2xl font-bold mb-2',
                  paquete.recomendado ? 'text-rosa' : 'text-white/80',
                )}
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: baseDelay + 0.3 }}
              >
                {paquete.nombre}
              </motion.p>

              <motion.p
                className="flex items-baseline gap-1 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: baseDelay + 0.4 }}
              >
                <span className="max-sm:text-4xl text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  ${paquete.precio}
                </span>
                <span className="text-white/40">/mes</span>
              </motion.p>

              <motion.div
                className={cn('h-px max-sm:mb-4 mb-6 w-full origin-left', paquete.recomendado ? 'bg-rosa' : 'bg-white/15')}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: baseDelay + 0.5 }}
              />

              <div className="flex flex-col max-sm:gap-3 gap-4 flex-1">
                {paquete.items.map((item, j) => (
                  <motion.div
                    key={item}
                    className="flex items-start max-sm:gap-2 gap-3 max-sm:text-sm text-base"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: baseDelay + 0.6 + j * 0.1, duration: 0.35, ease: 'easeOut' }}
                  >
                    <Check size={18} className="shrink-0 mt-0.5 text-verde" />
                    <span className="text-white/85">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition-colors',
                  paquete.recomendado
                    ? 'bg-rosa text-white'
                    : 'border border-white/30 text-white hover:border-rosa hover:text-rosa',
                )}
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: baseDelay + 1, duration: 0.4 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={18} aria-hidden />
                Quiero el {paquete.nombre}
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
