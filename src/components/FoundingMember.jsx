import { useState } from 'react'
import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

export default function FoundingMember({ bp }) {
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    propertyName: '',
    propertyType: 'hostel',
    beds: '10-20',
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
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        setFormData({
          contactName: '',
          email: '',
          propertyName: '',
          propertyType: 'hostel',
          beds: '10-20',
          country: '',
          currentTools: '',
          biggestChallenge: '',
          howHeard: '',
        })
      } else {
        setError('Failed to submit application. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerStyle = {
    backgroundColor: COLORS.teal,
    color: COLORS.surface,
    padding: isMobile ? '60px 24px' : isTablet ? '80px 32px' : '100px 64px',
    fontFamily: FONTS.sans,
  }

  const eyebrowStyle = {
    ...TYPOGRAPHY.eye,
    color: COLORS.neon,
    marginBottom: 16,
  }

  const headlineStyle = {
    ...TYPOGRAPHY.h2,
    fontSize: isMobile ? 32 : isTablet ? 40 : 48,
    color: COLORS.surface,
    marginBottom: 16,
  }

  const subStyle = {
    fontSize: isMobile ? 14 : 16,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 60,
    maxWidth: isMobile ? '100%' : '800px',
    lineHeight: 1.6,
  }

  const benefitsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
    gap: isMobile ? 16 : 20,
    marginBottom: 60,
  }

  const benefitCardStyle = {
    padding: isMobile ? 16 : 20,
    backgroundColor: COLORS.tealMid,
    borderRadius: 6,
    border: `1px solid rgba(74,248,212,0.2)`,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }

  const benefitIconStyle = {
    fontSize: 24,
  }

  const benefitTitleStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.neon,
  }

  const benefitBodyStyle = {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.4,
  }

  const spotsStyle = {
    padding: '12px 16px',
    backgroundColor: 'rgba(74,248,212,0.1)',
    borderRadius: 4,
    marginBottom: 40,
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.neon,
    textAlign: 'center',
  }

  const formTitleStyle = {
    ...TYPOGRAPHY.h3,
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 8,
    color: COLORS.neon,
  }

  const formSubStyle = {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 32,
  }

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: isMobile ? 16 : 20,
    maxWidth: '600px',
  }

  const formGroupStyle = (fullWidth) => ({
    gridColumn: fullWidth ? '1 / -1' : 'auto',
  })

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
    color: COLORS.surface,
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: COLORS.tealMid,
    border: `1px solid rgba(255,255,255,0.2)`,
    borderRadius: 4,
    color: COLORS.surface,
    fontSize: 14,
    fontFamily: FONTS.sans,
    transition: 'all 0.2s ease',
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: 100,
    resize: 'vertical',
  }

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: COLORS.neon,
    color: COLORS.teal,
    border: 'none',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 600,
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: isLoading ? 0.7 : 1,
    fontFamily: FONTS.sans,
    gridColumn: '1 / -1',
    marginTop: 16,
  }

  const successStyle = {
    padding: '24px',
    backgroundColor: 'rgba(16,185,129,0.2)',
    border: `2px solid #10B981`,
    borderRadius: 6,
    color: COLORS.surface,
    textAlign: 'center',
    maxWidth: '600px',
  }

  const successTitleStyle = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
    color: COLORS.neon,
  }

  const errorStyle = {
    padding: '12px 16px',
    backgroundColor: 'rgba(239,68,68,0.2)',
    border: `1px solid #EF4444`,
    borderRadius: 4,
    color: '#FCA5A5',
    fontSize: 13,
    marginBottom: 16,
  }

  return (
    <section style={containerStyle} id="founding-member">
      <div style={eyebrowStyle}>{CONTENT.founder.eyebrow}</div>
      <h2 style={headlineStyle}>{CONTENT.founder.headline}</h2>
      <p style={subStyle}>{CONTENT.founder.sub}</p>

      <div style={benefitsGridStyle}>
        {CONTENT.founder.benefits.map((benefit, idx) => (
          <div key={idx} style={benefitCardStyle}>
            <div style={benefitIconStyle}>{benefit.icon}</div>
            <div style={benefitTitleStyle}>{benefit.title}</div>
            <div style={benefitBodyStyle}>{benefit.body}</div>
          </div>
        ))}
      </div>

      <div style={spotsStyle}>
        {CONTENT.founder.spotsLeft} of {CONTENT.founder.totalSpots} spots remaining
      </div>

      <div style={formTitleStyle}>{CONTENT.founder.formTitle}</div>
      <p style={formSubStyle}>{CONTENT.founder.formSub}</p>

      {submitted ? (
        <div style={successStyle}>
          <div style={successTitleStyle}>Application received!</div>
          <p>Jorge will reach out within 48 hours to discuss the program and next steps.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={formGridStyle}>
          {error && <div style={errorStyle}>{error}</div>}

          <div style={formGroupStyle(false)}>
            <label style={labelStyle}>Your Name *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Your full name"
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          <div style={formGroupStyle(false)}>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="your@email.com"
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          <div style={formGroupStyle(false)}>
            <label style={labelStyle}>Property Name *</label>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g., Torridonia Madrid"
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          <div style={formGroupStyle(false)}>
            <label style={labelStyle}>Property Type *</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              <option value="hostel">Hostel</option>
              <option value="coliving">Coliving</option>
              <option value="hotel">Hotel</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={formGroupStyle(false)}>
            <label style={labelStyle}>Number of Beds *</label>
            <select
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              <option value="5-10">5-10</option>
              <option value="10-20">10-20</option>
              <option value="20-30">20-30</option>
              <option value="30+">30+</option>
            </select>
          </div>

          <div style={formGroupStyle(false)}>
            <label style={labelStyle}>Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g., Spain"
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          <div style={formGroupStyle(true)}>
            <label style={labelStyle}>What tools are you using now?</label>
            <input
              type="text"
              name="currentTools"
              value={formData.currentTools}
              onChange={handleChange}
              style={inputStyle}
              placeholder="e.g., Notion, Google Sheets, Asana"
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          <div style={formGroupStyle(true)}>
            <label style={labelStyle}>What's your biggest operational challenge?</label>
            <textarea
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              style={textareaStyle}
              placeholder="Tell us what keeps you up at night..."
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          <div style={formGroupStyle(true)}>
            <label style={labelStyle}>How did you hear about Hostack?</label>
            <input
              type="text"
              name="howHeard"
              value={formData.howHeard}
              onChange={handleChange}
              style={inputStyle}
              placeholder="e.g., Friend, Twitter, Google"
              onFocus={(e) => (e.target.style.borderColor = COLORS.neon)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Apply to Founder Program'}
          </button>
        </form>
      )}
    </section>
  )
}
