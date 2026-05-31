'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  Clock,
  Circle,
  ChevronRight,
} from 'lucide-react';
import copy from '@/data/copy';

type TabId = 'roadmap' | 'archivos' | 'pagos' | 'mensajes';

interface Milestone {
  label: string;
  status: 'done' | 'active' | 'pending';
  date: string;
}

interface Payment {
  label: string;
  amount: string;
  status: 'paid' | 'pending';
}

interface Message {
  from: string;
  text: string;
  time: string;
  isUs: boolean;
}

const MILESTONES: Milestone[] = copy.portal.milestones;
const PAYMENTS: Payment[] = copy.portal.payments;
const MESSAGES: Message[] = copy.portal.messages;
const FILES = copy.portal.files;
const TAB_LABELS = Object.fromEntries(copy.portal.tabs.map((tab) => [tab.id, tab.label])) as Record<TabId, string>;

const TABS: { id: TabId; label: string; icon: ElementType }[] = [
  { id: 'roadmap', label: TAB_LABELS.roadmap, icon: LayoutDashboard },
  { id: 'archivos', label: TAB_LABELS.archivos, icon: FileText },
  { id: 'pagos', label: TAB_LABELS.pagos, icon: CreditCard },
  { id: 'mensajes', label: TAB_LABELS.mensajes, icon: MessageSquare },
];

export default function PortalPreviewMock() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<TabId>('roadmap');
  const [isManual, setIsManual] = useState(false);

  const TAB_ORDER: TabId[] = ['roadmap', 'archivos', 'pagos', 'mensajes'];

  useEffect(() => {
    if (!isInView || isManual) {
      return;
    }

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TAB_ORDER.indexOf(prev);
        return TAB_ORDER[(currentIndex + 1) % TAB_ORDER.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isManual]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        maxWidth: '860px',
        margin: '48px auto 0',
        boxShadow: '0 32px 64px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(174,53,255,0.1)',
      }}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--bg-border)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: 'var(--bg-primary)',
            borderRadius: '6px',
            padding: '4px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginLeft: '8px',
          }}
        >
          {copy.portal.section.browserPath}
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: '360px' }}>
        <div
          style={{
            width: '200px',
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--bg-border)',
            padding: '20px 12px',
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
              paddingLeft: '8px',
            }}
          >
            {copy.portal.section.projectLabel}
          </p>

          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsManual(true);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(174,53,255,0.12)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  marginBottom: '2px',
                }}
              >
                <Icon size={15} />
                {tab.label}
                {isActive && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {activeTab === 'roadmap' && (
            <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                {copy.portal.roadmapTitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MILESTONES.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {m.status === 'done' && <CheckCircle2 size={18} color="var(--turquesa-500)" />}
                    {m.status === 'active' && <Clock size={18} color="var(--accent)" />}
                    {m.status === 'pending' && <Circle size={18} color="var(--text-muted)" />}
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color:
                          m.status === 'pending'
                            ? 'var(--text-muted)'
                            : m.status === 'active'
                              ? 'var(--text-primary)'
                              : 'var(--text-secondary)',
                      }}
                    >
                      {m.label}
                    </span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {m.date}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'archivos' && (
            <motion.div key="archivos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                {copy.portal.filesTitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FILES.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--bg-border)',
                      borderRadius: '8px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {f.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {f.size}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'pagos' && (
            <motion.div key="pagos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                {copy.portal.paymentsTitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PAYMENTS.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: 'var(--bg-primary)',
                      border: `1px solid ${p.status === 'paid' ? 'rgba(0,209,191,0.2)' : 'var(--bg-border)'}`,
                      borderRadius: '10px',
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-primary)', margin: 0 }}>
                        {p.label}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)' }}>
                        {p.amount}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          padding: '3px 8px',
                          borderRadius: '20px',
                          background: p.status === 'paid' ? 'rgba(0,209,191,0.12)' : 'rgba(255,255,255,0.05)',
                          color: p.status === 'paid' ? 'var(--turquesa-500)' : 'var(--text-muted)',
                          border:
                            p.status === 'paid'
                              ? '1px solid rgba(0,209,191,0.2)'
                              : '1px solid var(--bg-border)',
                        }}
                      >
                        {p.status === 'paid' ? copy.portal.statuses.paid : copy.portal.statuses.pending}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'mensajes' && (
            <motion.div key="mensajes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                {copy.portal.messagesTitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MESSAGES.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: m.isUs ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: m.isUs ? 'rgba(174,53,255,0.1)' : 'var(--bg-primary)',
                        border: `1px solid ${m.isUs ? 'rgba(174,53,255,0.2)' : 'var(--bg-border)'}`,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: m.isUs ? 'var(--accent)' : 'var(--text-muted)',
                          margin: '0 0 4px',
                        }}
                      >
                        {m.from}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          color: 'var(--text-secondary)',
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {m.text}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        marginTop: '4px',
                        padding: '0 4px',
                      }}
                    >
                      {m.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
