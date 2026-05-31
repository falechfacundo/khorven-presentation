'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SITE } from '@config/site';
import type { HubParams } from '@lib/params';
import copy, { type ServiceConfig } from '@/data/copy';

interface Props {
  params: HubParams;
  service: ServiceConfig;
}

export default function CTASection({ params, service }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const isWorkana = params.platform === 'workana';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1.2]);
  const ctaContent = isWorkana ? copy.cta.workana : copy.cta.default;
  const primaryCtaLabel = isWorkana ? ctaContent.label : copy.hero[service.id].es.default.ctaLabel;

  return (
    <section id="cta" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', padding: '6rem 0' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale: bgScale,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(174,53,255,0.08) 0%, transparent 62%)',
        }}
      />

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
        <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
          {ctaContent.kicker}
        </span>
        <h2 style={{ margin: '1rem 0 0.8rem', fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1.05 }}>{ctaContent.title}</h2>
        <p style={{ margin: '0 auto', maxWidth: '40rem', color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7 }}>
          {ctaContent.body}
        </p>

        {isWorkana ? (
          <motion.span
            animate={
              isInView
                ? {
                    boxShadow: [
                      '0 0 0 rgba(174,53,255,0.0)',
                      '0 0 26px rgba(174,53,255,0.35)',
                      '0 0 0 rgba(174,53,255,0.0)',
                    ],
                  }
                : { boxShadow: '0 0 0 rgba(174,53,255,0.0)' }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: '2rem',
              padding: '1rem 2.2rem',
              borderRadius: '10px',
              textDecoration: 'none',
              background: 'var(--accent)',
              color: '#080808',
              fontWeight: 700,
              fontSize: '1.05rem',
            }}
          >
            {primaryCtaLabel}
          </motion.span>
        ) : (
          <motion.a
            href={SITE.workanaCta}
            target="_blank"
            rel="noopener noreferrer"
            animate={
              isInView
                ? {
                    boxShadow: [
                      '0 0 0 rgba(174,53,255,0.0)',
                      '0 0 26px rgba(174,53,255,0.35)',
                      '0 0 0 rgba(174,53,255,0.0)',
                    ],
                  }
                : { boxShadow: '0 0 0 rgba(174,53,255,0.0)' }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: '2rem',
              padding: '1rem 2.2rem',
              borderRadius: '10px',
              textDecoration: 'none',
              background: 'var(--accent)',
              color: '#080808',
              fontWeight: 700,
              fontSize: '1.05rem',
            }}
          >
            {primaryCtaLabel}{copy.cta.default.labelSuffix}
          </motion.a>
        )}

        {!isWorkana && (
          <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {copy.cta.default.emailPrompt}{' '}
            <a href={`mailto:${SITE.contactEmail}`} style={{ color: 'var(--accent)' }}>
              {copy.cta.default.emailLabel}
            </a>
          </p>
        )}

        <p className="mono" style={{ marginTop: '1.2rem', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
          {ctaContent.helper}
        </p>
      </div>
    </section>
  );
}
