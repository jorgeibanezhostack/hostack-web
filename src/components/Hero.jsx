import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

const APPS = [
  {
    icon: '👋',
    label: 'Guest App',
    desc: 'Self check-in, activity booking, service requests, community feed',
  },
  {
    icon: '⚡',
    label: 'Staff App',
    desc: 'Task automation, real-time communication, schedule visibility',
  },
  {
    icon: '🎛️',
    label: 'Owner Dashboard',
    desc: 'Central control, team management, training, reporting, event calendars',
  },
]

function AppFlowSVG() {
  return (
    <svg
      viewBox="0 0 680 200"
      fill="none"
      className="w-full max-w-2xl mx-auto opacity-80"
      aria-hidden="true"
    >
      {/* Guest App */}
      <rect x="4" y="40" width="160" height="120" rx="12" fill="#1e293b" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.5" />
      <text x="84" y="70" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="600" fontFamily="DM Sans, sans-serif" letterSpacing="0.08em">GUEST APP</text>
      <text x="84" y="92" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Self check-in</text>
      <text x="84" y="110" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Activity booking</text>
      <text x="84" y="128" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Service requests</text>
      <text x="84" y="146" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Community feed</text>

      {/* Arrow left to center */}
      <path d="M164 100 L240 100" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" markerEnd="url(#a1)" />

      {/* Owner Dashboard (center) */}
      <rect x="240" y="16" width="200" height="168" rx="14" fill="#0f172a" stroke="#3B82F6" strokeWidth="2" />
      <rect x="240" y="16" width="200" height="168" rx="14" fill="url(#dashGrad)" fillOpacity="0.12" />
      <text x="340" y="50" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="700" fontFamily="DM Sans, sans-serif" letterSpacing="0.1em">OWNER DASHBOARD</text>
      <text x="340" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Central control</text>
      <text x="340" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Team management</text>
      <text x="340" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Reporting & analytics</text>
      <text x="340" y="138" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Automation</text>
      <text x="340" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Event calendars</text>

      {/* Arrow center to right */}
      <path d="M440 100 L516 100" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" markerEnd="url(#a2)" />

      {/* Staff App */}
      <rect x="516" y="40" width="160" height="120" rx="12" fill="#1e293b" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.5" />
      <text x="596" y="70" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="600" fontFamily="DM Sans, sans-serif" letterSpacing="0.08em">STAFF APP</text>
      <text x="596" y="92" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Task automation</text>
      <text x="596" y="110" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Real-time comms</text>
      <text x="596" y="128" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Schedule visibility</text>
      <text x="596" y="146" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Clock in / out</text>

      <defs>
        <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0.5 L6 3 L0 5.5 Z" fill="#3B82F6" fillOpacity="0.7" />
        </marker>
        <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0.5 L6 3 L0 5.5 Z" fill="#3B82F6" fillOpacity="0.7" />
        </marker>
        <linearGradient id="dashGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            top: '-10%',
            right: '-5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            bottom: '-10%',
            left: '-5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8 border"
          style={{
            background: 'rgba(59,130,246,0.08)',
            borderColor: 'rgba(59,130,246,0.25)',
            color: '#93c5fd',
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-blue-400"
            style={{ animation: 'pulse 2s infinite' }}
          />
          Early Stage · Beta · Building in Public
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-none tracking-tight"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Reclaim{' '}
          <span className="text-blue-400 font-normal">70%</span>{' '}
          of Your Time.<br />
          Build the Community{' '}
          <span className="text-blue-400 font-normal">You Love.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-slate-300 text-lg leading-relaxed mb-2">
            Hostack is the operating system built for hostel and coliving managers.
          </p>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            You manage guests, staff, and experiences. We manage the busywork—so you don't.
          </p>

          {/* Three apps */}
          <div
            className="text-left rounded-2xl p-5 border"
            style={{
              background: 'rgba(30,41,59,0.6)',
              borderColor: 'rgba(71,85,105,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#60a5fa', letterSpacing: '0.15em' }}
            >
              One platform. Three connected apps:
            </p>
            <div className="space-y-3">
              {APPS.map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">{icon}</span>
                  <p className="text-sm text-slate-300">
                    <span className="text-white font-medium">{label}:</span>{' '}
                    <span className="text-slate-400">{desc}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <a
            href="#product"
            className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: '#3B82F6',
              boxShadow: '0 0 0 0 rgba(59,130,246,0)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2563eb'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#3B82F6'
              e.currentTarget.style.boxShadow = '0 0 0 0 rgba(59,130,246,0)'
            }}
          >
            See How It Works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3L8 13M8 13L3 8.5M8 13L13 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 font-medium px-8 py-3.5 rounded-xl text-base transition-all duration-200 border"
            style={{
              background: 'rgba(30,41,59,0.5)',
              borderColor: 'rgba(71,85,105,0.5)',
              color: '#cbd5e1',
            }}
          >
            View Pricing
          </a>
        </motion.div>

        {/* SVG diagram */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <AppFlowSVG />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-10 text-xs uppercase tracking-widest"
          style={{ color: '#475569', letterSpacing: '0.15em' }}
        >
          No WhatsApp chaos · No paper checklists · No OTA integration nightmares
        </motion.p>
      </div>
    </section>
  )
}
