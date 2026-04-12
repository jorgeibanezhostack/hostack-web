import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    icon: '👋',
    title: 'Guest App',
    colorClass: 'blue',
    features: [
      'Self check-in & checkout',
      'Activity & event booking',
      'Service requests',
      'Community feed & chat',
      'House rules & local info',
    ],
  },
  {
    icon: '⚡',
    title: 'Staff App',
    colorClass: 'emerald',
    features: [
      'Task management & tracking',
      'Real-time team communication',
      'Clock in / clock out',
      'Schedule visibility',
      'Incident & maintenance reports',
    ],
  },
  {
    icon: '🎛️',
    title: 'Owner Dashboard',
    colorClass: 'violet',
    features: [
      'Central control panel',
      'Team & role management',
      'Staff training modules',
      'Analytics & reporting',
      'Event calendars & automation',
    ],
  },
]

const COLORS = {
  blue: {
    border: 'rgba(59,130,246,0.25)',
    bg: 'rgba(59,130,246,0.04)',
    text: '#60a5fa',
    dot: '#3B82F6',
    glow: 'rgba(59,130,246,0.08)',
  },
  emerald: {
    border: 'rgba(16,185,129,0.25)',
    bg: 'rgba(16,185,129,0.04)',
    text: '#34d399',
    dot: '#10B981',
    glow: 'rgba(16,185,129,0.08)',
  },
  violet: {
    border: 'rgba(139,92,246,0.25)',
    bg: 'rgba(139,92,246,0.04)',
    text: '#a78bfa',
    dot: '#8B5CF6',
    glow: 'rgba(139,92,246,0.08)',
  },
}

function CentralDiagram() {
  return (
    <svg viewBox="0 0 720 240" fill="none" className="w-full max-w-3xl mx-auto" aria-hidden="true">
      {/* Guest App box */}
      <rect x="4" y="40" width="180" height="160" rx="14" fill="#1e293b" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect x="4" y="40" width="180" height="36" rx="14" fill="#3B82F6" fillOpacity="0.08" />
      <text x="94" y="64" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="600" fontFamily="DM Sans, sans-serif" letterSpacing="0.09em">GUEST APP</text>
      {['Self check-in', 'Activity booking', 'Service requests', 'Community feed', 'House rules'].map((t, i) => (
        <text key={t} x="94" y={96 + i * 20} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">{t}</text>
      ))}

      {/* Arrow: Guest → Dashboard */}
      <defs>
        <marker id="prod-arrow-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0.5 L6 3 L0 5.5Z" fill="#3B82F6" fillOpacity="0.5" />
        </marker>
        <marker id="prod-arrow-l" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
          <path d="M6 0.5 L0 3 L6 5.5Z" fill="#3B82F6" fillOpacity="0.5" />
        </marker>
        <linearGradient id="dashGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path d="M184 120 L264 120" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.5" markerEnd="url(#prod-arrow-r)" />
      <text x="224" y="113" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Inter">data</text>

      {/* Owner Dashboard (center, taller) */}
      <rect x="264" y="8" width="192" height="224" rx="16" fill="#0f172a" stroke="url(#dashGlow)" strokeWidth="2" />
      <rect x="264" y="8" width="192" height="224" rx="16" fill="#3B82F6" fillOpacity="0.05" />
      <text x="360" y="44" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700" fontFamily="DM Sans, sans-serif" letterSpacing="0.12em">OWNER DASHBOARD</text>
      {['Central control', 'Team management', 'Reporting & analytics', 'Automation', 'Event calendars', 'Staff training'].map((t, i) => (
        <text key={t} x="360" y={72 + i * 24} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">{t}</text>
      ))}

      {/* Arrow: Dashboard → Staff */}
      <path d="M456 120 L536 120" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.5" markerEnd="url(#prod-arrow-r)" />
      <text x="496" y="113" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Inter">tasks</text>

      {/* Staff App box */}
      <rect x="536" y="40" width="180" height="160" rx="14" fill="#1e293b" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect x="536" y="40" width="180" height="36" rx="14" fill="#3B82F6" fillOpacity="0.08" />
      <text x="626" y="64" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="600" fontFamily="DM Sans, sans-serif" letterSpacing="0.09em">STAFF APP</text>
      {['Task management', 'Real-time comms', 'Clock in / out', 'Schedule view', 'Incident reports'].map((t, i) => (
        <text key={t} x="626" y={96 + i * 20} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">{t}</text>
      ))}
    </svg>
  )
}

export default function Product() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="product" className="py-24 border-t" ref={ref} style={{ borderColor: 'rgba(30,41,59,1)', background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#60a5fa', letterSpacing: '0.16em' }}
          >
            The Product
          </span>
          <h2
            className="text-4xl md:text-5xl font-light text-white mt-3 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Early Stage / Beta
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            We're building Hostack in public. Your feedback shapes what we build next.
          </p>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-16 overflow-x-auto"
        >
          <CentralDiagram />
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => {
            const c = COLORS[card.colorClass]
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
                className="rounded-2xl p-6 border"
                style={{
                  background: c.bg,
                  borderColor: c.border,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{card.icon}</span>
                  <h3
                    className="text-base font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: c.text }}
                  >
                    {card.title}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {card.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: '#cbd5e1' }}>
                      <span
                        className="shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: c.dot }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
