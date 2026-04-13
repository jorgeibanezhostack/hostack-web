import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

export default function Product({ bp }) {
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

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
    marginBottom: 32,
    maxWidth: isMobile ? '100%' : '700px',
    lineHeight: 1.6,
  }

  const phaseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 60,
    fontSize: 13,
    color: COLORS.neon,
    fontWeight: 500,
  }

  const phaseBadgeStyle = {
    padding: '6px 12px',
    backgroundColor: COLORS.neonSoft,
    color: COLORS.neon,
    borderRadius: 3,
  }

  const appsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: isMobile ? 20 : 24,
    marginBottom: 80,
  }

  const appCardStyle = (highlight) => ({
    padding: isMobile ? 24 : 32,
    backgroundColor: COLORS.teal,
    borderRadius: 8,
    border: highlight ? `2px solid ${COLORS.neon}` : `1px solid rgba(255,255,255,0.1)`,
    transition: 'all 0.3s ease',
    transform: highlight ? 'scale(1.02)' : 'scale(1)',
    boxShadow: highlight ? `0 20px 40px rgba(74,248,212,0.2)` : 'none',
    position: 'relative',
  })

  const appBadgeStyle = {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: COLORS.neon,
    color: COLORS.teal,
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
  }

  const appEmojiStyle = {
    fontSize: 32,
    marginBottom: 12,
  }

  const appNameStyle = {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 4,
  }

  const appTaglineStyle = {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 24,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  }

  const featuresListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }

  const featureItemStyle = {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
  }

  const roadmapStyle = {
    marginTop: 80,
    paddingTop: 60,
    borderTop: `1px solid rgba(255,255,255,0.1)`,
  }

  const roadmapHeadlineStyle = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 40,
    color: COLORS.neon,
  }

  const roadmapGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: isMobile ? 20 : 24,
  }

  const roadmapPhaseStyle = (status) => ({
    padding: isMobile ? 20 : 24,
    backgroundColor: COLORS.surface === '#ffffff' ? COLORS.surface : COLORS.teal,
    borderRadius: 8,
    border: `1px solid rgba(255,255,255,0.1)`,
    opacity: status === 'now' ? 1 : status === 'next' ? 0.7 : 0.5,
  })

  const roadmapStatusStyle = (status) => ({
    fontSize: 32,
    marginBottom: 12,
    opacity: status === 'now' ? 1 : 0.6,
  })

  const roadmapPhaseNameStyle = {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
  }

  const roadmapNoteStyle = {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.5,
  }

  return (
    <section style={containerStyle} id="product">
      <div style={eyebrowStyle}>{CONTENT.product.eyebrow}</div>
      <h2 style={headlineStyle}>{CONTENT.product.headline}</h2>
      <p style={subStyle}>{CONTENT.product.sub}</p>

      <div style={phaseStyle}>
        <div style={phaseBadgeStyle}>{CONTENT.product.phase.label}</div>
        <span>{CONTENT.product.phase.status}</span>
        <span>·</span>
        <span>{CONTENT.product.phase.note}</span>
      </div>

      <div style={appsContainerStyle}>
        {CONTENT.product.apps.map((app) => (
          <div key={app.id} style={appCardStyle(app.highlight)}>
            {app.highlight && <div style={appBadgeStyle}>Your Command Center</div>}
            <div style={appEmojiStyle}>{app.emoji}</div>
            <h3 style={appNameStyle}>{app.name}</h3>
            <div style={appTaglineStyle}>{app.tagline}</div>
            <ul style={featuresListStyle}>
              {app.features.map((feature, idx) => (
                <li key={idx} style={featureItemStyle}>
                  <span style={{ marginTop: 2 }}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={roadmapStyle}>
        <h3 style={roadmapHeadlineStyle}>Roadmap</h3>
        <div style={roadmapGridStyle}>
          {CONTENT.product.roadmap.map((rm, idx) => (
            <div key={idx} style={roadmapPhaseStyle(rm.status)}>
              <div style={roadmapStatusStyle(rm.status)}>
                {rm.status === 'now' ? '●' : '○'}
              </div>
              <div style={roadmapPhaseNameStyle}>{rm.label}</div>
              <div style={roadmapNoteStyle}>{rm.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
