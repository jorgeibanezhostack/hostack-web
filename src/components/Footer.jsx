import { COLORS, FONTS, CONTENT } from '../data/tokens';

export default function Footer({ bp }) {
  const logoSvg = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor={COLORS.teal} />
          <stop offset="100%" stopColor={COLORS.neon} />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#logoGradient)" />
      <text x="20" y="26" textAnchor="middle" fill="white" fontSize="24" fontWeight="700" fontFamily={FONTS.heading}>
        H
      </text>
    </svg>
  );

  const navLinks = ['How it works', 'Results', 'Pricing', 'Founder Program', 'Contact'];

  return (
    <footer
      id="footer"
      style={{
        width: '100%',
        backgroundColor: COLORS.deep,
        color: COLORS.white,
        padding: bp === 'mobile' ? '48px 20px' : '64px 40px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Logo + Tagline */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            {logoSvg}
            <span
              style={{
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: FONTS.heading,
                letterSpacing: '-0.01em',
              }}
            >
              hostack
            </span>
          </div>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: FONTS.body,
              margin: '8px 0 0 0',
            }}
          >
            Operations OS for hostels & colivings.
          </p>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: FONTS.body,
              margin: '4px 0 0 0',
            }}
          >
            Made by operators, for operators.
          </p>
        </div>

        {/* Nav Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: bp === 'mobile' ? '16px 24px' : '32px',
            marginBottom: '32px',
            fontSize: '14px',
            fontFamily: FONTS.body,
          }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.neon)}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: `rgba(74, 248, 212, 0.2)`,
            marginBottom: '32px',
          }}
        />

        {/* Copyright + Small Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: bp === 'mobile' ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: bp === 'mobile' ? 'flex-start' : 'center',
            gap: bp === 'mobile' ? '16px' : '0',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: FONTS.body,
              margin: 0,
            }}
          >
            © 2025 Hostack. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '13px',
              color: COLORS.neon,
              fontFamily: FONTS.body,
              margin: 0,
              fontWeight: '500',
            }}
          >
            Currently accepting Founding Members
          </p>
        </div>
      </div>
    </footer>
  );
}
