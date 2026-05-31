'use client';

import { motion } from 'framer-motion';
import PortalPreviewMock from '@components/react/PortalPreviewMock';
import { SITE } from '@config/site';
import copy from '@/data/copy';

export default function PortalSection() {
  return (
    <section id="portal" style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
            {copy.portal.section.kicker}
          </span>
          <h2 style={{ margin: '0.7rem 0 0.75rem', fontSize: '2.2rem' }}>{copy.portal.section.title}</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '42rem' }}>
            {copy.portal.section.subtitle}
          </p>
        </motion.header>

        <PortalPreviewMock />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
        >
          <p className="mono" style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {copy.portal.section.accessNote}
          </p>
          <a href={SITE.portalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            {copy.portal.section.linkLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
