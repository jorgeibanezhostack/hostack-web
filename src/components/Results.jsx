import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

export default function Results({ bp }) {
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const containerStyle = {
    backgroundColor: COLORS.surface,
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
  }

  const subStyle = {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.inkSoft,
    marginBottom: 60,
    maxWidth: isMobile ? '100%' : '800px',
    lineHeight: 1.6,
  }

  const metricsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? 20 : 24,
    marginBottom: 80,
  }

  const metricCardStyle = {
    padding: isMobile ? 20 : 28,
    backgroundColor: COLORS.surface2,
    borderRadius: 8,
    border: `1px solid ${COLORS.border}`,
    textAlign: 'center',
  }

  const metricIconStyle = {
    fontSize: 32,
    marginBottom: 12,
  }

  const metricValueStyle = {
    fontSize: isMobile ? 32 : isTablet ? 40 : 48,
    fontWeight: 300,
    color: COLORS.teal,
    marginBottom: 8,
    fontFamily: FONTS.sans,
  }

  const metricLabelStyle = {
    fontSize: isMobile ? 12 : 13,
    color: COLORS.inkSoft,
    lineHeight: 1.5,
  }

  const quoteContainerStyle = {
    backgroundColor: COLORS.surface2,
    padding: isMobile ? 24 : 32,
    borderRadius: 8,
    borderLeft: `4px solid ${COLORS.teal}`,
    maxWidth: isMobile ? '100%' : '800px',
  }

  const quoteTextStyle = {
    fontSize: isMobile ? 14 : 16,
    fontStyle: 'italic',
    color: COLORS.ink,
    marginBottom: 20,
    lineHeight: 1.8,
  }

  const quoteAuthorStyle = {
    fontWeight: 600,
    color: COLORS.ink,
    fontSize: 14,
    marginBottom: 4,
  }

  const quoteRoleStyle = {
    fontSize: 13,
    color: COLORS.inkSoft,
  }

  return (
    <section style={containerStyle} id="results">
      <div style={eyebrowStyle}>{CONTENT.results.eyebrow}</div>
      <h2 style={headlineStyle}>{CONTENT.results.headline}</h2>
      <p style={subStyle}>{CONTENT.results.sub}</p>

      <div style={metricsGridStyle}>
        {CONTENT.results.metrics.map((metric, idx) => (
          <div key={idx} style={metricCardStyle}>
            <div style={metricIconStyle}>{metric.icon}</div>
            <div style={metricValueStyle}>{metric.value}</div>
            <div style={metricLabelStyle}>{metric.label}</div>
          </div>
        ))}
      </div>

      <div style={quoteContainerStyle}>
        <p style={quoteTextStyle}>{CONTENT.results.quote.text}</p>
        <div style={quoteAuthorStyle}>{CONTENT.results.quote.author}</div>
        <div style={quoteRoleStyle}>{CONTENT.results.quote.role}</div>
      </div>
    </section>
  )
}
