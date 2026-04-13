import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

export default function Problem({ bp }) {
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const containerStyle = {
    backgroundColor: COLORS.surface2,
    padding: isMobile ? '60px 24px' : isTablet ? '80px 32px' : '100px 64px',
    fontFamily: FONTS.sans,
  }

  const eyebrowStyle = {
    ...TYPOGRAPHY.eye,
    color: COLORS.inkSoft,
    marginBottom: 16,
  }

  const headlineStyle = {
    ...TYPOGRAPHY.h2,
    fontSize: isMobile ? 32 : isTablet ? 40 : 48,
    color: COLORS.ink,
    marginBottom: 16,
    maxWidth: isMobile ? '100%' : '800px',
  }

  const subStyle = {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.inkSoft,
    marginBottom: 60,
    maxWidth: isMobile ? '100%' : '800px',
    lineHeight: 1.6,
  }

  const painsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
    gap: isMobile ? 24 : 32,
    marginBottom: 80,
  }

  const painCardStyle = {
    padding: isMobile ? 20 : 24,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    border: `1px solid ${COLORS.border}`,
    transition: 'all 0.2s ease',
  }

  const painIconStyle = {
    fontSize: 32,
    marginBottom: 16,
  }

  const painTitleStyle = {
    ...TYPOGRAPHY.h3,
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.ink,
    marginBottom: 12,
  }

  const painBodyStyle = {
    fontSize: 14,
    color: COLORS.inkSoft,
    lineHeight: 1.6,
  }

  const differentiatorStyle = {
    backgroundColor: COLORS.teal,
    color: COLORS.surface,
    padding: isMobile ? 24 : 32,
    borderRadius: 8,
    borderLeft: `4px solid ${COLORS.neon}`,
  }

  const diffHeadlineStyle = {
    ...TYPOGRAPHY.h3,
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.neon,
    marginBottom: 12,
  }

  const diffBodyStyle = {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.6,
  }

  return (
    <section style={containerStyle} id="problem">
      <div style={eyebrowStyle}>{CONTENT.problem.eyebrow}</div>
      <h2 style={headlineStyle}>{CONTENT.problem.headline}</h2>
      <p style={subStyle}>{CONTENT.problem.sub}</p>

      <div style={painsGridStyle}>
        {CONTENT.problem.pains.map((pain, idx) => (
          <div key={idx} style={painCardStyle}>
            <div style={painIconStyle}>{pain.icon}</div>
            <h3 style={painTitleStyle}>{pain.title}</h3>
            <p style={painBodyStyle}>{pain.body}</p>
          </div>
        ))}
      </div>

      <div style={differentiatorStyle}>
        <h3 style={diffHeadlineStyle}>{CONTENT.problem.differentiator.headline}</h3>
        <p style={diffBodyStyle}>{CONTENT.problem.differentiator.body}</p>
      </div>
    </section>
  )
}
