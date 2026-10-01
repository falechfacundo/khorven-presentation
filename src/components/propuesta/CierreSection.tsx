import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Prospecto } from '@data/prospectos';
import { FIRMA } from '@config/firma';
import { getWhatsappCtaUrl } from '@lib/whatsapp';
import { EASE, Eyebrow, FadeUp, MagneticLink, RevealText, words } from './ui';

interface CierreSectionProps {
  prospecto: Prospecto;
}

const pasos = [
  'Elegís el paquete y nos escribís.',
  'Coordinamos una llamada de 15 min para mapear tu flujo.',
  'Empezamos a construir y lanzar en 48-72 horas.',
];

export default function CierreSection({ prospecto }: CierreSectionProps) {
  const { nombreNegocio } = prospecto;
  const whatsappUrl = getWhatsappCtaUrl(prospecto);

  return (
    <section id="cierre" className="relative overflow-hidden pt-24 sm:pt-32 compact:pt-16">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[60vmax] w-[90vmax] -translate-x-1/2 translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10">
        <Eyebrow index="06">Cierre</Eyebrow>
        <RevealText
          items={words('Próximos pasos')}
          className="mt-4 text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[1] tracking-[-0.03em] text-white"
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3 compact:mt-8">
          {pasos.map((paso, i) => (
            <motion.li
              key={paso}
              className="relative bg-ink p-6 sm:p-8 compact:p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <motion.span
                className="block font-serif text-6xl italic leading-none text-accent sm:text-7xl compact:text-6xl"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.15 }}
              >
                0{i + 1}
              </motion.span>
              <p className="mt-6 text-lg leading-snug text-white/85 compact:mt-4">{paso}</p>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.15 }}
              />
            </motion.li>
          ))}
        </ol>

        <FadeUp className="mt-14 flex flex-col items-center text-center compact:mt-10">
          <p className="text-gray-400 text-sm mb-6 text-center max-w-md">
            Sin compromisos ni llamadas eternas. Si te hace sentido, respondé este mensaje y coordinamos 15 minutos esta
            semana para ver si encajamos.
          </p>

          <MagneticLink
            href={whatsappUrl}
            className="group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden rounded-full bg-accent py-3 pl-7 pr-3 text-center text-base font-semibold text-white shadow-[0_20px_80px_-20px_var(--color-accent)] sm:w-auto sm:text-lg md:w-auto"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: '-120%' }}
              animate={{ x: '220%' }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
            />
            <span className="relative">Me interesa ver cómo funciona en {nombreNegocio}</span>
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={20} />
            </span>
          </MagneticLink>
        </FadeUp>

        {/* Firma */}
        <FadeUp className="mx-auto mt-16 flex max-w-md items-center justify-center gap-4 compact:mt-10" delay={0.1}>
          {FIRMA.fotoUrl && (
            <img src={FIRMA.fotoUrl} alt={FIRMA.nombre} className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15" />
          )}
          <div className={FIRMA.fotoUrl ? 'text-left' : 'text-center'}>
            <p className="font-serif text-2xl italic text-white">{FIRMA.nombre}</p>
            <p className="text-xs text-white/45">{FIRMA.rol}</p>
          </div>
        </FadeUp>
      </div>

      {/* Marquesina con el nombre del cliente */}
      <div aria-hidden className="relative mt-16 overflow-hidden border-t border-white/[0.06] py-6 compact:mt-10">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, half) => (
            <div key={half} className="flex shrink-0">
              {Array.from({ length: 4 }).map((__, i) => (
                <span
                  key={i}
                  className="text-outline px-8 text-[clamp(3rem,9vw,8rem)] font-bold leading-none tracking-[-0.03em]"
                >
                  {nombreNegocio} <span className="font-serif font-normal italic">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="relative pb-8 text-center text-[11px] uppercase tracking-[0.25em] text-white/25" style={{ fontFamily: 'var(--font-mono)' }}>
        Propuesta preparada exclusivamente para {nombreNegocio}
      </p>
    </section>
  );
}
