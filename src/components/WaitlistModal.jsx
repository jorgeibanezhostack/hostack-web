import { useState } from 'react'
import { COLORS, FONTS } from '../data/tokens'

export default function WaitlistModal({ plan, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    property: '',
    location: '',
    plan: plan || 'pro',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/waitlist-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'rgba(4,78,89,0.5)',
    border: '1px solid rgba(74,248,212,0.20)',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.sans,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 6,
    fontFamily: FONTS.sans,
  }

  const pillStyle = (active) => ({
    padding: '8px 24px',
    borderRadius: 999,
    border: `1.5px solid ${active ? COLORS.neon : 'rgba(74,248,212,0.25)'}`,
    backgroundColor: active ? COLORS.neon : 'transparent',
    color: active ? COLORS.tealDeep : 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: FONTS.sans,
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  })

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(3,30,35,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto',
        backgroundColor: '#052a30',
        border: '1px solid rgba(74,248,212,0.2)',
        borderRadius: 16, padding: '36px 32px',
        fontFamily: FONTS.sans, color: '#fff',
        position: 'relative',
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.5)', fontSize: 22,
            cursor: 'pointer', lineHeight: 1, padding: 4,
          }}
          aria-label="Close"
        >✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 40, color: COLORS.neon, marginBottom: 16 }}>✓</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.neon, marginBottom: 12 }}>
              You're on the list!
            </div>
            <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
              We'll be in touch soon with next steps.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 24, padding: '10px 28px', borderRadius: 8,
                background: COLORS.neon, border: 'none',
                color: COLORS.tealDeep, fontWeight: 700, fontSize: 14,
                cursor: 'pointer', fontFamily: FONTS.sans,
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Join the waitlist</div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.5 }}>
              Tell us about your property and we'll reach out when your spot opens.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {error && (
                <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444', borderRadius: 6, color: '#FCA5A5', fontSize: 13 }}>
                  {error}
                </div>
              )}

              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} required style={inputStyle}
                  placeholder="Your full name"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} required style={inputStyle}
                  placeholder="you@example.com"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Property Name *</label>
                <input
                  type="text" name="property" value={formData.property}
                  onChange={handleChange} required style={inputStyle}
                  placeholder="e.g., The Nest Hostel"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Location *</label>
                <input
                  type="text" name="location" value={formData.location}
                  onChange={handleChange} required style={inputStyle}
                  placeholder="e.g., Barcelona, Spain"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Plan *</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" style={pillStyle(formData.plan === 'free')} onClick={() => setFormData(p => ({ ...p, plan: 'free' }))}>Free</button>
                  <button type="button" style={pillStyle(formData.plan === 'pro')} onClick={() => setFormData(p => ({ ...p, plan: 'pro' }))}>Pro</button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  marginTop: 8, padding: '14px', borderRadius: 10,
                  backgroundColor: COLORS.neon, border: 'none',
                  color: COLORS.tealDeep, fontSize: 15, fontWeight: 700,
                  fontFamily: FONTS.sans, cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1, transition: 'opacity 0.2s',
                }}
              >
                {isLoading ? 'Sending...' : 'Join the waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
