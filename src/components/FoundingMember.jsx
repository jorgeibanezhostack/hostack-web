import { useState } from 'react'
import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

// SVG Icons
const GiftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
)
const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
)
const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
  </svg>
)
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const BENEFIT_ICONS = { gift: GiftIcon, users: UsersIcon, map: MapIcon, wallet: WalletIcon, star: StarIcon }

export default function FoundingMember({ bp }) {
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    propertyName: '',
    propertyType: 'hostel',
    rooms: '',
    teamSize: '',
    country: '',
    currentTools: '',
    biggestChallenge: '',
    howHeard: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePillSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/founder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerStyle = {
    backgroundColor: COLORS.tealDeep,
    color: COLORS.surface,
    padding: isMobile ? '60px 24px 80px' : isTablet ? '80px 48px' : '100px 80px',
    fontFamily: FONTS.sans,
  }

  const innerStyle = {
    maxWidth: 1100,
    margin: '0 auto',
  }

  const eyebrowStyle = {
    ...TYPOGRAPHY.eye,
    color: COLORS.neon,
    marginBottom: 16,
    textAlign: 'center',
  }

  const headlineStyle = {
    ...TYPOGRAPHY.h2,
    fontSize: isMobile ? 30 : isTablet ? 38 : 46,
    color: COLORS.surface,
    marginBottom: 20,
    textAlign: 'center',
  }

  const subStyle = {
    fontSize: isMobile ? 15 : 16,
    color: 'rgba(255,255,255,0.72)',
    marginBottom: 56,
    maxWidth: 720,
    lineHeight: 1.65,
    margin: '0 auto 56px',
    textAlign: 'center',
  }

  const benefitsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
    gap: isMobile ? 16 : 20,
    marginBottom: 48,
  }

  const benefitCardStyle = {
    padding: isMobile ? 20 : 24,
    background: 'rgba(4,78,89,0.40)',
    borderRadius: 14,
    border: `1px solid rgba(74,248,212,0.18)`,
    backdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }

  const iconCircleStyle = {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: COLORS.neonSoft,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.neon,
    flexShrink: 0,
  }

  const spotsRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 56,
  }

  const spotDotStyle = (filled) => ({
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: filled ? COLORS.neon : 'transparent',
    border: `2px solid ${filled ? COLORS.neon : COLORS.teal}`,
    transition: 'all 0.2s ease',
  })

  const ctaBlockStyle = {
    textAlign: 'center',
    marginBottom: 40,
  }

  const ctaTitleStyle = {
    fontSize: isMobile ? 20 : 24,
    fontWeight: 600,
    color: COLORS.surface,
    marginBottom: 8,
  }

  const ctaSubStyle = {
    fontSize: 14,
    color: 'rgba(255,255,255,0.60)',
    marginBottom: 28,
  }

  const applyBtnStyle = {
    padding: '16px 36px',
    backgroundColor: COLORS.neon,
    color: COLORS.tealDeep,
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: FONTS.sans,
    transition: 'all 0.2s ease',
    display: 'inline-block',
  }

  // Form styles
  const formWrapStyle = {
    maxWidth: 680,
    margin: '0 auto',
    background: 'rgba(4,78,89,0.35)',
    border: `1px solid rgba(74,248,212,0.20)`,
    borderRadius: 16,
    padding: isMobile ? 24 : 40,
    backdropFilter: 'blur(16px)',
    overflow: 'hidden',
    maxHeight: showForm ? '2000px' : '0px',
    transition: 'max-height 0.5s ease, padding 0.3s ease',
    paddingTop: showForm ? (isMobile ? 24 : 40) : 0,
    paddingBottom: showForm ? (isMobile ? 24 : 40) : 0,
  }

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
    color: COLORS.surface,
  }

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    backgroundColor: 'rgba(8,78,89,0.6)',
    border: `1px solid rgba(74,248,212,0.20)`,
    borderRadius: 6,
    color: COLORS.surface,
    fontSize: 14,
    fontFamily: FONTS.sans,
    transition: 'border-color 0.2s ease',
  }

  const textareaStyle = { ...inputStyle, minHeight: 90, resize: 'vertical' }

  const pillsRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  }

  const pillStyle = (selected) => ({
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    border: `1.5px solid ${selected ? COLORS.neon : 'rgba(74,248,212,0.25)'}`,
    backgroundColor: selected ? COLORS.neonSoft : 'transparent',
    color: selected ? COLORS.neon : 'rgba(255,255,255,0.65)',
    transition: 'all 0.15s ease',
    fontFamily: FONTS.sans,
  })

  const submitBtnStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: COLORS.neon,
    color: COLORS.tealDeep,
    border: 'none',
    borderRadius: 6,
    fontSize: 15,
    fontWeight: 700,
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
    fontFamily: FONTS.sans,
    marginTop: 8,
  }

  const rooms = ['2-4', '5-9', '10-15', '16-20', '+20']
  const teamSizes = ['3-5', '6-10', '11-20', '+20']

  return (
    <section style={containerStyle} id="founding-member">
      <div style={innerStyle}>
        <div style={eyebrowStyle}>{CONTENT.founder.eyebrow}</div>
        <h2 style={headlineStyle}>{CONTENT.founder.headline}</h2>
        <p style={subStyle}>{CONTENT.founder.sub}</p>

        {/* Benefits */}
        <div style={benefitsGridStyle}>
          {CONTENT.founder.benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[b.icon] || GiftIcon
            return (
              <div key={i} style={benefitCardStyle}>
                <div style={iconCircleStyle}><Icon /></div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.neon }}>{b.title}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{b.body}</div>
              </div>
            )
          })}
        </div>

        {/* Spots counter */}
        <div style={spotsRowStyle}>
          {Array.from({ length: CONTENT.founder.totalSpots }).map((_, i) => (
            <div key={i} style={spotDotStyle(i < CONTENT.founder.spotsLeft)} />
          ))}
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.neon, marginLeft: 8 }}>
            {CONTENT.founder.spotsLeft} of {CONTENT.founder.totalSpots} spots left
          </span>
        </div>

        {/* CTA block */}
        <div style={ctaBlockStyle}>
          <div style={ctaTitleStyle}>{CONTENT.founder.formTitle}</div>
          <div style={ctaSubStyle}>{CONTENT.founder.formSub}</div>
          <button
            style={applyBtnStyle}
            onClick={() => setShowForm(v => !v)}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {CONTENT.founder.formButtonLabel}
          </button>
        </div>

        {/* Collapsible form */}
        <div style={formWrapStyle}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.neon, marginBottom: 12 }}>Application received!</div>
              <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
                The founder team will reach out within 48 hours to schedule a discovery call and discuss next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
              {error && (
                <div style={{ gridColumn: '1/-1', padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444', borderRadius: 6, color: '#FCA5A5', fontSize: 13 }}>
                  {error}
                </div>
              )}

              <div>
                <label style={labelStyle}>Your Name *</label>
                <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required style={inputStyle} placeholder="Your full name"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'} />
              </div>

              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} placeholder="you@example.com"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'} />
              </div>

              <div>
                <label style={labelStyle}>Property Name *</label>
                <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} required style={inputStyle} placeholder="e.g., The Nest Hostel"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'} />
              </div>

              <div>
                <label style={labelStyle}>Property Type *</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'}>
                  <option value="hostel">Hostel</option>
                  <option value="coliving">Coliving</option>
                  <option value="bb">B&B</option>
                  <option value="hotel">Hotel</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Number of Rooms *</label>
                <div style={pillsRowStyle}>
                  {rooms.map(r => (
                    <button key={r} type="button" style={pillStyle(formData.rooms === r)} onClick={() => handlePillSelect('rooms', r)}>{r}</button>
                  ))}
                </div>
              </div>

              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Team size *</label>
                <div style={pillsRowStyle}>
                  {teamSizes.map(t => (
                    <button key={t} type="button" style={pillStyle(formData.teamSize === t)} onClick={() => handlePillSelect('teamSize', t)}>{t}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Country *</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} required style={inputStyle} placeholder="e.g., Scotland, UK"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'} />
              </div>

              <div>
                <label style={labelStyle}>How did you hear about Hostack?</label>
                <input type="text" name="howHeard" value={formData.howHeard} onChange={handleChange} style={inputStyle} placeholder="e.g., LinkedIn, a friend, Google"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'} />
              </div>

              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>What tools are you using now?</label>
                <input type="text" name="currentTools" value={formData.currentTools} onChange={handleChange} style={inputStyle} placeholder="e.g., Notion, Google Sheets, WhatsApp"
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'} />
              </div>

              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>What's your biggest operational challenge?</label>
                <textarea name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} style={textareaStyle} placeholder="Tell us what's eating your time every day..."
                  onFocus={e => e.target.style.borderColor = COLORS.neon}
                  onBlur={e => e.target.style.borderColor = 'rgba(74,248,212,0.20)'} />
              </div>

              <div style={{ gridColumn: '1/-1' }}>
                <button type="submit" style={submitBtnStyle} disabled={isLoading}
                  onMouseEnter={e => !isLoading && (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = isLoading ? '0.7' : '1')}>
                  {isLoading ? 'Sending...' : 'Send application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
