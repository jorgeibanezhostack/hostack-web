import { useState, useEffect } from 'react'
import { COLORS, FONTS } from '../data/tokens'

const NavLogo = () => (
  <svg width="32" height="32" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#004F59" />
        <stop offset="100%" stopColor="#00BFB3" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="256" height="256" rx="51.2" ry="51.2" fill="url(#navLogoGrad)"/>
    <text x="128" y="185" textAnchor="middle" fontSize="180" fontWeight="700" fill="white" fontFamily="Arial, sans-serif">H</text>
  </svg>
)

export default function Nav({ bp }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = bp === 'mobile'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnchorClick = (id) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    backgroundColor: scrolled ? COLORS.teal : 'transparent',
    backdropFilter: scrolled ? 'none' : 'none',
    transition: 'background-color 0.3s ease',
    zIndex: 1000,
    fontFamily: FONTS.sans,
    borderBottom: scrolled ? `1px solid ${COLORS.border}` : 'none',
  }

  const logoStyle = {
    fontSize: '18px',
    fontWeight: 600,
    color: scrolled ? COLORS.surface : COLORS.teal,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  }

  const navLinksStyle = {
    display: isMobile ? 'none' : 'flex',
    gap: 32,
    alignItems: 'center',
  }

  const navLinkStyle = {
    fontSize: 14,
    color: scrolled ? COLORS.surface : COLORS.ink,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    fontWeight: 500,
  }

  const ctaButtonStyle = {
    padding: '8px 16px',
    backgroundColor: scrolled ? COLORS.neon : COLORS.neon,
    color: COLORS.teal,
    border: 'none',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }

  const hamburgerStyle = {
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column',
    gap: 5,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  }

  const hamburgerLineStyle = {
    width: 24,
    height: 2,
    backgroundColor: scrolled ? COLORS.surface : COLORS.ink,
    transition: 'all 0.3s ease',
  }

  const mobileMenuStyle = {
    position: 'fixed',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: COLORS.teal,
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    padding: 24,
    gap: 16,
    zIndex: 999,
  }

  const mobileLinkStyle = {
    color: COLORS.surface,
    fontSize: 14,
    cursor: 'pointer',
    fontWeight: 500,
    padding: '8px 0',
    transition: 'color 0.2s ease',
  }

  const mobileCTAButtonStyle = {
    padding: '12px 16px',
    backgroundColor: COLORS.neon,
    color: COLORS.teal,
    border: 'none',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
  }

  return (
    <>
      <nav style={navStyle}>
        <div style={logoStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <NavLogo />
          <span>hostack</span>
        </div>

        <div style={navLinksStyle}>
          <a
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = COLORS.neon)}
            onMouseLeave={(e) => (e.target.style.color = scrolled ? COLORS.surface : COLORS.ink)}
            onClick={() => handleAnchorClick('#product')}
          >
            How it works
          </a>
          <a
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = COLORS.neon)}
            onMouseLeave={(e) => (e.target.style.color = scrolled ? COLORS.surface : COLORS.ink)}
            onClick={() => handleAnchorClick('#results')}
          >
            Results
          </a>
          <a
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = COLORS.neon)}
            onMouseLeave={(e) => (e.target.style.color = scrolled ? COLORS.surface : COLORS.ink)}
            onClick={() => handleAnchorClick('#pricing')}
          >
            Pricing
          </a>
          <button
            style={ctaButtonStyle}
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
            onClick={() => handleAnchorClick('#founding-member')}
          >
            Join Founder Program
          </button>
        </div>

        <button style={hamburgerStyle} onClick={() => setIsOpen(!isOpen)}>
          <div
            style={{
              ...hamburgerLineStyle,
              transform: isOpen ? 'rotate(45deg) translateY(12px)' : 'rotate(0)',
            }}
          />
          <div
            style={{
              ...hamburgerLineStyle,
              opacity: isOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              ...hamburgerLineStyle,
              transform: isOpen ? 'rotate(-45deg) translateY(-12px)' : 'rotate(0)',
            }}
          />
        </button>
      </nav>

      {isOpen && (
        <div style={mobileMenuStyle}>
          <a style={mobileLinkStyle} onClick={() => handleAnchorClick('#product')}>
            How it works
          </a>
          <a style={mobileLinkStyle} onClick={() => handleAnchorClick('#results')}>
            Results
          </a>
          <a style={mobileLinkStyle} onClick={() => handleAnchorClick('#pricing')}>
            Pricing
          </a>
          <button style={mobileCTAButtonStyle} onClick={() => handleAnchorClick('#founding-member')}>
            Join Founder Program
          </button>
        </div>
      )}
    </>
  )
}
