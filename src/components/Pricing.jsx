import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

// SVG Icon Components
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GiftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6.667V12.667C2 13.404 2.596 14 3.333 14H12.667C13.404 14 14 13.404 14 12.667V6.667M8 2V6.667M2 6.667H14M5.333 2H10.667C11.404 2 12 2.596 12 3.333V6.667H4V3.333C4 2.596 4.596 2 5.333 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L11.333 6.667M11.333 6.667L6 1.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Pricing({ bp, onOpenWaitlist }) {
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const handleScroll = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavigate = (href) => {
    window.location.href = href
  }

  const containerStyle = {
    backgroundColor: COLORS.tealDeep,
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

  const plansGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: isMobile ? 20 : 24,
  }

  const planCardStyle = (highlight) => ({
    padding: isMobile ? 24 : 32,
    backgroundColor: COLORS.teal,
    borderRadius: 8,
    border: highlight ? `2px solid ${COLORS.neon}` : `1px solid rgba(255,255,255,0.1)`,
    transition: 'all 0.3s ease',
    transform: highlight ? 'scale(1.02)' : 'scale(1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  })

  const planBadgeStyle = {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: COLORS.neon,
    color: COLORS.teal,
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
  }

  const planNameStyle = {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 12,
    marginTop: highlight => highlight ? 20 : 0,
  }

  const planPriceStyle = {
    fontSize: isMobile ? 28 : 36,
    fontWeight: 300,
    color: COLORS.neon,
    marginBottom: 4,
  }

  const planPeriodStyle = {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  }

  const planSetupStyle = {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  }

  const planPromoStyle = {
    fontSize: 12,
    color: COLORS.neon,
    marginBottom: 20,
    padding: '8px 12px',
    backgroundColor: 'rgba(74,248,212,0.1)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }

  const planTaglineStyle = {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    fontWeight: 500,
  }

  const planFeatureStyle = {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
  }

  const planFeaturesContainerStyle = {
    flex: 1,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }

  const planCTAStyle = (ctaStyle) => ({
    padding: '12px 16px',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: ctaStyle === 'outline' ? `2px solid ${COLORS.neon}` : 'none',
    backgroundColor: ctaStyle === 'primary' ? COLORS.neon : 'transparent',
    color: ctaStyle === 'primary' ? COLORS.teal : COLORS.neon,
    fontFamily: FONTS.sans,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  })

  const secondaryLinkStyle = {
    display: 'block',
    width: '100%',
    padding: '14px 24px',
    marginTop: 12,
    background: COLORS.neon,
    border: 'none',
    borderRadius: 10,
    color: COLORS.tealDeep,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: FONTS.sans,
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'opacity 0.2s ease',
    boxSizing: 'border-box',
  }

  return (
    <section style={containerStyle} id="pricing">
      <div style={eyebrowStyle}>{CONTENT.pricing.eyebrow}</div>
      <h2 style={headlineStyle}>{CONTENT.pricing.headline}</h2>
      <p style={subStyle}>{CONTENT.pricing.sub}</p>

      <div style={plansGridStyle}>
        {CONTENT.pricing.plans.map((plan) => (
          <div key={plan.id} style={planCardStyle(plan.highlight)}>
            {plan.highlight && <div style={planBadgeStyle}>MOST POPULAR</div>}
            <h3 style={{ ...planNameStyle, marginTop: plan.highlight ? 20 : 0 }}>
              {plan.name}
            </h3>
            <div style={planPriceStyle}>{plan.price}</div>
            {plan.period && <div style={planPeriodStyle}>{plan.period}</div>}
            {plan.setup && <div style={planSetupStyle}>{plan.setup}</div>}
            {plan.promo && (
              <div style={planPromoStyle}>
                <GiftIcon />
                <span>{plan.promo}</span>
              </div>
            )}
            <div style={planTaglineStyle}>{plan.tagline}</div>
            <div style={planFeaturesContainerStyle}>
              {plan.features.map((feature, idx) => (
                <div key={idx} style={planFeatureStyle}>
                  <span style={{ color: COLORS.neon, marginTop: 2 }}>
                    <CheckIcon />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button
              style={planCTAStyle(plan.ctaStyle)}
              onMouseEnter={(e) => (e.target.opacity = '0.9')}
              onMouseLeave={(e) => (e.target.opacity = '1')}
              onClick={() => {
                if (plan.id === 'free' || plan.id === 'pro') {
                  onOpenWaitlist(plan.id)
                } else if (plan.href) {
                  handleNavigate(plan.href)
                } else if (plan.anchor) {
                  handleScroll(plan.anchor)
                }
              }}
            >
              {plan.cta}
              {plan.id === 'pro' && <ArrowIcon />}
            </button>
            {plan.id === 'pro' && (
              <button
                style={secondaryLinkStyle}
                onMouseEnter={(e) => (e.target.opacity = '0.8')}
                onMouseLeave={(e) => (e.target.opacity = '1')}
                onClick={() => handleScroll('#founding-member')}
              >
                Apply to Founding Member Program
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
