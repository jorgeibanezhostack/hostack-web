import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

export default function Pricing({ bp }) {
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
  })

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
            {plan.promo && <div style={planPromoStyle}>{plan.promo}</div>}
            <div style={planTaglineStyle}>{plan.tagline}</div>
            <div style={planFeaturesContainerStyle}>
              {plan.features.map((feature, idx) => (
                <div key={idx} style={planFeatureStyle}>
                  <span>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button
              style={planCTAStyle(plan.ctaStyle)}
              onMouseEnter={(e) => (e.target.opacity = '0.9')}
              onMouseLeave={(e) => (e.target.opacity = '1')}
              onClick={() => {
                if (plan.href) {
                  handleNavigate(plan.href)
                } else if (plan.anchor) {
                  handleScroll(plan.anchor)
                }
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
