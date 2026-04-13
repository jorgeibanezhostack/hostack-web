import { COLORS, FONTS } from '../data/tokens'
import { CONTENT } from '../data/tokens'

export default function Footer({ bp }) {
  const isMobile = bp === 'mobile'

  const containerStyle = {
    backgroundColor: COLORS.tealDeep,
    color: COLORS.surface,
    padding: isMobile ? '40px 24px' : '60px 64px',
    fontFamily: FONTS.sans,
    borderTop: `1px solid rgba(255,255,255,0.1)`,
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: isMobile ? 32 : 48,
    marginBottom: 40,
  }

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }

  const logoStyle = {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
    color: COLORS.neon,
  }

  const taglineStyle = {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6,
  }

  const headingStyle = {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: COLORS.neon,
    marginBottom: 16,
  }

  const linkStyle = {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
  }

  const dividerStyle = {
    borderTop: `1px solid rgba(255,255,255,0.1)`,
    paddingTop: 20,
    marginTop: 20,
  }

  const footerBottomStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? 16 : 0,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  }

  const handleScroll = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavigate = (href) => {
    if (href.startsWith('#')) {
      handleScroll(href)
    } else if (href.startsWith('mailto:')) {
      window.location.href = href
    } else {
      window.location.href = href
    }
  }

  return (
    <footer style={containerStyle}>
      <div style={gridStyle}>
        <div style={sectionStyle}>
          <div style={logoStyle}>hostack</div>
          <p style={taglineStyle}>{CONTENT.footer.tagline}</p>
          <p style={taglineStyle}>{CONTENT.footer.sub}</p>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>Product</div>
          {CONTENT.footer.links.slice(0, 2).map((link, idx) => (
            <a
              key={idx}
              style={linkStyle}
              onClick={() => handleNavigate(link.href)}
              onMouseEnter={(e) => (e.target.style.color = COLORS.neon)}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.7)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>Company</div>
          {CONTENT.footer.links.slice(2).map((link, idx) => (
            <a
              key={idx}
              style={linkStyle}
              onClick={() => handleNavigate(link.href)}
              onMouseEnter={(e) => (e.target.style.color = COLORS.neon)}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.7)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div style={dividerStyle}>
        <div style={footerBottomStyle}>
          <div>{CONTENT.footer.copyright}</div>
          <div>{CONTENT.footer.available}</div>
        </div>
      </div>
    </footer>
  )
}
