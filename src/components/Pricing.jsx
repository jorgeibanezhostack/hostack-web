import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Check({ color = '#60a5fa' }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <path
        d="M2.5 7.5L5.5 10.5L12.5 3.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const FREE_FEATURES = [
  'Up to 5 staff members',
  'Manual setup & onboarding',
  'Guest App (basic)',
  'Staff App (basic)',
  'Community support',
]

const PRO_FEATURES = [
  'Unlimited staff members',
  'Full onboarding support',
  'Guest App (complete)',
  'Staff App (complete)',
  'Owner Dashboard access',
  'Analytics & reporting',
  'Event calendar & automation',
  'Priority email support',
]

const FOUNDER_FEATURES = [
  '12 months Pro included',
  'Direct WhatsApp access to Jorge',
  'Monthly strategy calls',
  'Custom onboarding session',
  'Feature request priority',
  'Forever discount on renewal',
]

export default function Pricing({ onWaitlist }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 border-t"
      style={{ background: '#080f1e', borderColor: 'rgba(15,23,42,1)' }}
    >
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
            Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl font-light text-white mt-3 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-lg" style={{ color: '#94a3b8' }}>
            Start free. Scale when you're ready.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {/* FREE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-6 border"
            style={{ background: 'rgba(30,41,59,0.4)', borderColor: 'rgba(51,65,85,0.5)' }}
          >
            <div className="mb-6">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#64748b', letterSpacing: '0.14em' }}
              >
                Free
              </span>
              <div className="flex items-end gap-1.5 mt-3 mb-1">
                <span className="text-4xl font-light text-white">€0</span>
                <span className="text-sm mb-1.5" style={{ color: '#64748b' }}>/month</span>
              </div>
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                5 staff max. Manual setup.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#94a3b8' }}>
                  <Check color="#475569" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onWaitlist('Free')}
              className="w-full py-3 rounded-xl text-sm font-medium border transition-all duration-200"
              style={{ borderColor: 'rgba(51,65,85,0.8)', color: '#94a3b8' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#3B82F6'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(51,65,85,0.8)'
                e.currentTarget.style.color = '#94a3b8'
              }}
            >
              Join the Waiting List
            </button>
          </motion.div>

          {/* PRO (highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl p-6 border-2"
            style={{
              background: 'rgba(59,130,246,0.06)',
              borderColor: '#3B82F6',
              boxShadow: '0 0 40px rgba(59,130,246,0.12)',
            }}
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ background: '#3B82F6' }}
              >
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#60a5fa', letterSpacing: '0.14em' }}
              >
                Pro
              </span>
              <div className="flex items-end gap-1.5 mt-3 mb-1">
                <span className="text-4xl font-light text-white">€99</span>
                <span className="text-sm mb-1.5" style={{ color: '#94a3b8' }}>/month</span>
              </div>
              <p className="text-sm mb-3" style={{ color: '#64748b' }}>
                + €300 one-time activation fee
              </p>
              {/* Special deal */}
              <div
                className="rounded-xl px-4 py-3 text-sm border"
                style={{
                  background: 'rgba(16,185,129,0.07)',
                  borderColor: 'rgba(16,185,129,0.2)',
                  color: '#34d399',
                }}
              >
                🎁 Pay 6 months → Get 12 months + free activation
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#e2e8f0' }}>
                  <Check color="#60a5fa" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <button
                onClick={() => onWaitlist('Pro')}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{ background: '#3B82F6' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#2563eb'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,130,246,0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#3B82F6'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Join the Waiting List
              </button>
              <a
                href="#founder-form"
                className="w-full block text-center py-3 rounded-xl text-sm font-medium border transition-all duration-200"
                style={{ borderColor: 'rgba(59,130,246,0.3)', color: '#60a5fa' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.7)'
                  e.currentTarget.style.color = '#93c5fd'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                  e.currentTarget.style.color = '#60a5fa'
                }}
              >
                Apply to Founder Program →
              </a>
            </div>
          </motion.div>

          {/* FOUNDER MEMBER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl p-6 border"
            style={{
              background: 'rgba(245,158,11,0.04)',
              borderColor: 'rgba(245,158,11,0.3)',
            }}
          >
            {/* Badge */}
            <div className="absolute -top-3.5 right-6">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  background: 'rgba(245,158,11,0.1)',
                  borderColor: 'rgba(245,158,11,0.3)',
                  color: '#fbbf24',
                }}
              >
                3 spots only
              </span>
            </div>

            <div className="mb-6">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#fbbf24', letterSpacing: '0.14em' }}
              >
                Founder Member
              </span>
              <div className="flex items-end gap-1.5 mt-3 mb-1">
                <span className="text-4xl font-light text-white">€300</span>
                <span className="text-sm mb-1.5" style={{ color: '#94a3b8' }}>one-time</span>
              </div>
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                12 months Pro included. Shape the product.
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {FOUNDER_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#e2e8f0' }}>
                  <Check color="#fbbf24" />
                  {f}
                </li>
              ))}
            </ul>

            <div
              className="rounded-xl p-3 mb-6 text-xs border"
              style={{
                background: 'rgba(30,41,59,0.6)',
                borderColor: 'rgba(51,65,85,0.4)',
                color: '#64748b',
                lineHeight: '1.6',
              }}
            >
              Direct WhatsApp access to Jorge. Monthly calls to co-create the product. For people who want to shape Hostack's future.
            </div>

            <a
              href="#founder-form"
              className="w-full block text-center py-3 rounded-xl text-sm font-semibold border transition-all duration-200"
              style={{
                background: 'rgba(245,158,11,0.08)',
                borderColor: 'rgba(245,158,11,0.3)',
                color: '#fbbf24',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(245,158,11,0.15)'
                e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(245,158,11,0.08)'
                e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)'
              }}
            >
              Apply Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
