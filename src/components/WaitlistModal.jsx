import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  manager_name: z.string().min(1, 'Your name is required'),
  property_name: z.string().min(1, 'Property name is required'),
  tier_interest: z.string(),
})

const inputClass = [
  'w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500',
  'border transition-colors focus:outline-none',
  'bg-slate-800/80 border-slate-700 focus:border-blue-500',
].join(' ')

export default function WaitlistModal({ tier = 'Not Sure', onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { tier_interest: tier },
  })

  const onSubmit = async (data) => {
    setServerError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setSubmitted(true)
    } catch (err) {
      setServerError(err.message)
    }
  }

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden"
          style={{ background: '#0f172a', borderColor: 'rgba(51,65,85,0.8)' }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #3B82F6, #6366f1)' }} />

          <div className="p-8">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.3)' }}
                >
                  ✓
                </div>
                <h3
                  className="text-2xl font-light text-white mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  You're in!
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  We'll reach out soon with updates on the{' '}
                  <span className="text-blue-400 font-medium">{tier}</span> plan.
                </p>
                <button
                  onClick={onClose}
                  className="text-sm font-medium transition-colors"
                  style={{ color: '#60a5fa' }}
                >
                  Close window →
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: '#60a5fa', letterSpacing: '0.14em' }}
                  >
                    Waiting List
                  </span>
                  <h3
                    className="text-2xl font-light text-white mt-1.5 mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Join the{' '}
                    <span style={{ color: '#60a5fa' }}>{tier}</span> plan list
                  </h3>
                  <p className="text-slate-400 text-sm">
                    We'll notify you when your spot opens up.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Email address *"
                      className={inputClass}
                      autoFocus
                    />
                    {errors.email && (
                      <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register('manager_name')}
                      placeholder="Your name *"
                      className={inputClass}
                    />
                    {errors.manager_name && (
                      <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>
                        {errors.manager_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register('property_name')}
                      placeholder="Property name *"
                      className={inputClass}
                    />
                    {errors.property_name && (
                      <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>
                        {errors.property_name.message}
                      </p>
                    )}
                  </div>

                  <select
                    {...register('tier_interest')}
                    className={inputClass}
                    style={{ color: '#cbd5e1' }}
                  >
                    <option value="Free">Free plan</option>
                    <option value="Pro">Pro plan</option>
                    <option value="Not Sure">Not sure yet</option>
                  </select>

                  {serverError && (
                    <div
                      className="text-sm rounded-xl px-4 py-3 border"
                      style={{
                        color: '#f87171',
                        background: 'rgba(239,68,68,0.08)',
                        borderColor: 'rgba(239,68,68,0.2)',
                      }}
                    >
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-semibold py-3.5 rounded-xl text-white text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: '#3B82F6' }}
                    onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = '#2563eb' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#3B82F6' }}
                  >
                    {isSubmitting ? 'Submitting…' : 'Join the Waiting List'}
                  </button>

                  <p className="text-center text-xs" style={{ color: '#475569' }}>
                    No spam. No credit card. Just updates.
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
