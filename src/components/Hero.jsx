import { COLORS, FONTS, TYPOGRAPHY } from '../data/tokens'
import { CONTENT } from '../data/tokens'

export default function Hero({ bp }) {
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  const handleScroll = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const containerStyle = {
    backgroundColor: COLORS.tealDeep,
    color: COLORS.surface,
    padding: isMobile ? '80px 24px 60px' : isTablet ? '100px 32px 80px' : '120px 64px 100px',
    minHeight: 'calc(100vh - 56px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: isMobile ? 'flex-start' : 'center',
    textAlign: isMobile ? 'left' : 'center',
    fontFamily: FONTS.sans,
  }

  const badgeStyle = {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: COLORS.neon,
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }

  const neonDotStyle = {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: COLORS.neon,
    display: 'inline-block',
  }

  const h1Style = {
    ...TYPOGRAPHY.h1,
    fontSize: isMobile ? 36 : isTablet ? 48 : 64,
    fontWeight: 300,
    marginBottom: 24,
    lineHeight: 1.1,
    maxWidth: isMobile ? '100%' : '900px',
  }

  const subStyle = {
    fontSize: isMobile ? 14 : isTablet ? 15 : 16,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 48,
    maxWidth: isMobile ? '100%' : '720px',
    fontFamily: FONTS.sans,
  }

  const ctaContainerStyle = {
    display: 'flex',
    gap: isMobile ? 12 : 16,
    flexDirection: isMobile ? 'column' : 'row',
    marginBottom: 80,
    width: isMobile ? '100%' : 'auto',
  }

  const primaryButtonStyle = {
    padding: isMobile ? '14px 20px' : '14px 28px',
    backgroundColor: COLORS.neon,
    color: COLORS.teal,
    border: 'none',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: FONTS.sans,
    width: isMobile ? '100%' : 'auto',
  }

  const secondaryButtonStyle = {
    padding: isMobile ? '14px 20px' : '14px 28px',
    backgroundColor: 'transparent',
    color: COLORS.neon,
    border: `2px solid ${COLORS.neon}`,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: FONTS.sans,
    width: isMobile ? '100%' : 'auto',
  }

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
    gap: isMobile ? 24 : 32,
    width: isMobile ? '100%' : 'auto',
    maxWidth: '800px',
  }

  const statCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'flex-start' : 'center',
    padding: isMobile ? '20px 0' : '24px',
    borderBottom: isMobile ? `1px solid ${COLORS.neonSoft}` : 'none',
    borderRight: !isMobile && true ? `1px solid ${COLORS.neonSoft}` : 'none',
  }

  const statValueStyle = {
    fontSize: isMobile ? 32 : isTablet ? 40 : 48,
    fontWeight: 300,
    color: COLORS.neon,
    marginBottom: 8,
  }

  const statLabelStyle = {
    fontSize: isMobile ? 12 : 13,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.4,
  }

  const diagramContainerStyle = {
    marginTop: 80,
    padding: isMobile ? '40px 0' : isTablet ? '60px 0' : '80px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }

  const diagramStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? 16 : 32,
    flexWrap: isMobile ? 'wrap' : 'nowrap',
    justifyContent: 'center',
  }

  const appNodeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    minWidth: isMobile ? '80px' : '100px',
  }

  const appCircleStyle = {
    width: isMobile ? 56 : 72,
    height: isMobile ? 56 : 72,
    borderRadius: '50%',
    backgroundColor: COLORS.neon,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? 20 : 28,
    position: 'relative',
    animation: 'pulse 2s ease-in-out infinite',
  }

  const appLabelStyle = {
    fontSize: isMobile ? 11 : 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontWeight: 500,
  }

  const arrowStyle = {
    fontSize: isMobile ? 16 : 20,
    color: COLORS.neon,
    opacity: 0.5,
    display: isMobile ? 'none' : 'block',
  }

  const mobileArrowStyle = {
    fontSize: 20,
    color: COLORS.neon,
    opacity: 0.5,
    display: isMobile ? 'block' : 'none',
    transform: 'rotate(90deg)',
  }

  // SVG Icon Components
  const SmartphoneIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: COLORS.teal }}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <path d="M12 17h.01"></path>
    </svg>
  )

  const MonitorIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: COLORS.teal }}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    </svg>
  )

  const BoltIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: COLORS.teal }}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  )

  return (
    <>
      <section style={containerStyle} id="hero">
        <div style={badgeStyle}>
          <span style={neonDotStyle}></span>
          Beta · Live at Torridon Estate · 23 beds
        </div>

        <h1 style={h1Style}>
          {CONTENT.hero.h1a}
          <br />
          so you can build the community you dream.
        </h1>

        <p style={subStyle}>{CONTENT.hero.sub}</p>

        <div style={ctaContainerStyle}>
          <button
            style={primaryButtonStyle}
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
            onClick={() => handleScroll('#founding-member')}
          >
            {CONTENT.hero.cta}
          </button>
          <button
            style={secondaryButtonStyle}
            onMouseEnter={(e) => (e.target.style.borderColor = 'rgba(74,248,212,0.8)')}
            onMouseLeave={(e) => (e.target.style.borderColor = COLORS.neon)}
            onClick={() => { window.location.href = '/demo?ref=site' }}
          >
            {CONTENT.hero.ctaSub}
          </button>
        </div>

      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(74, 248, 212, 0.7);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(74, 248, 212, 0);
          }
        }
      `}</style>
    </>
  )
}
