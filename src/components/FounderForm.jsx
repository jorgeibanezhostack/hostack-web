import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useInView } from 'framer-motion'

const schema = z.object({
  contact_name: z.string().min(1, 'Contact name is required'),
  property_name: z.string().min(1, 'Property name is required'),
  property_website: z.string().optional(),
  whatsapp: z.string().min(5, 'WhatsApp number is required'),
  email: z.string().email('Please enter a valid email'),
  staff_size: z.string().min(1, 'Please select staff size'),
  room_count: z.string().min(1, 'Please select room count'),
  has_manuals: z.string().min(1, 'Please select an option'),
  message: z.string().min(10, 'Please tell us more (at least 10 characters)'),
})

const inputBase = [
  'w-full rounded-xl px-4 py-3 text-sm transition-colors border focus:outline-none',
  'bg-white border-gray-200 text-slate-900 placeholder-slate-400',
  'focus:border-blue-500',
].join(' ')

function Field({ label, optional, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {optional && <span className="text-slate-400 font-normal ml-1">(optional)</span>}
        {!optional && <span className="text-blue-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default function FounderForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setServerError('')
    const payload = {
      ...data,
      has_manuals: data.has_manuals === 'yes',
    }
    try {
      const res = await fetch('/api/founder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setSubmitted(true)
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <section
      id="founder-form"
      ref={ref}
      className="py-24 border-t"
      style={{ background: '#F8FAFC', borderColor: '#e2e8f0' }}
    >
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#3B82F6', letterSpacing: '0.16em' }}
          >
            Apply
          </span>
          <h2
            className="text-4xl font-light mt-3 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", color: '#0f172a' }}
          >
            Founder Member Application
          </h2>
          <p style={{ color: '#64748b' }}>
            Only 3 spots available. We review every application personally within 48 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white rounded-3xl border shadow-sm overflow-hidden"
          style={{ borderColor: '#e2e8f0' }}
        >
          {/* Top accent */}
          <div className="h-1" style={{ background: 'linear-gradient(90deg, #f59e0b, #f97316)' }} />

          <div className="p-8 md:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                  style={{ background: '#f0fdf4', border: '2px solid #bbf7d0' }}
                >
                  ✓
                </div>
                <h3
                  className="text-2xl font-light mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: '#0f172a' }}
                >
                  Application received!
                </h3>
                <p style={{ color: '#64748b' }}>
                  Thanks! We'll review your application and get back to you within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Contact Name" error={errors.contact_name?.message}>
                    <input {...register('contact_name')} placeholder="Your full name" className={inputBase} />
                  </Field>
                  <Field label="Property Name" error={errors.property_name?.message}>
                    <input {...register('property_name')} placeholder="Your hostel / coliving name" className={inputBase} />
                  </Field>
                </div>

                <Field label="Website" optional>
                  <input {...register('property_website')} placeholder="https://" className={inputBase} />
                </Field>

                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="WhatsApp" error={errors.whatsapp?.message}>
                    <input {...register('whatsapp')} placeholder="+34 600 000 000" className={inputBase} />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input {...register('email')} type="email" placeholder="you@hostel.com" className={inputBase} />
                  </Field>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Staff Size" error={errors.staff_size?.message}>
                    <select {...register('staff_size')} className={inputBase}>
                      <option value="">Select…</option>
                      <option value="1-3">1–3 people</option>
                      <option value="4-10">4–10 people</option>
                      <option value="11-20">11–20 people</option>
                      <option value="20+">20+ people</option>
                    </select>
                  </Field>
                  <Field label="Room Count" error={errors.room_count?.message}>
                    <select {...register('room_count')} className={inputBase}>
                      <option value="">Select…</option>
                      <option value="1-20">1–20 rooms</option>
                      <option value="21-50">21–50 rooms</option>
                      <option value="51-100">51–100 rooms</option>
                      <option value="100+">100+ rooms</option>
                    </select>
                  </Field>
                </div>

                <Field label="Do you have operations manuals?" error={errors.has_manuals?.message}>
                  <div className="grid grid-cols-2 gap-3 mt-0.5">
                    {[
                      { value: 'yes', label: 'Yes, we do' },
                      { value: 'no', label: 'No, not yet' },
                    ].map(({ value, label }) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer border transition-colors hover:border-blue-300"
                        style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}
                      >
                        <input
                          {...register('has_manuals')}
                          type="radio"
                          value={value}
                          className="accent-blue-500 w-4 h-4"
                        />
                        <span className="text-sm text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </Field>

                <Field
                  label="Tell us about your biggest operational challenge"
                  error={errors.message?.message}
                >
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="What's the main problem you're trying to solve? What does your current workflow look like?"
                    className={`${inputBase} resize-none`}
                  />
                </Field>

                {serverError && (
                  <div
                    className="text-sm rounded-xl px-4 py-3 border"
                    style={{
                      color: '#dc2626',
                      background: '#fef2f2',
                      borderColor: '#fecaca',
                    }}
                  >
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: '#0f172a' }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = '#1e293b' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#0f172a' }}
                >
                  {isSubmitting ? 'Submitting application…' : 'Submit Application →'}
                </button>

                <p className="text-center text-xs" style={{ color: '#94a3b8' }}>
                  We review every application personally and respond within 48 hours.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
