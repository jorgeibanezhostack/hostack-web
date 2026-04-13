import { COLORS, FONTS, CONTENT } from '../data/tokens';

export default function Footer({ bp }) {
  const logoSvg = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#004F59" />
          <stop offset="100%" stopColor="#00BFB3" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="9" fill="url(#footerLogoGrad)" />
      <rect x="7"  y="7"  width="11" height="11" rx="2.5" fill="white" fillOpacity="0.9" />
      <rect x="22" y="7"  width="11" height="11" rx="2.5" fill="white" fillOpacity="0.55" />
      <rect x="7"  y="22" width="11" height="11" rx="2.5" fill="white" fillOpacity="0.35" />
      <rect x="22" y="22" width="11" height="11" rx="2.5" fill="white" fillOpacity="0.7" />
    </svg>
  );

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      style={{
        width: '100%',
        backgroundColor: COLORS.tealDeep,
        color: '#ffffff',
        padding: bp === 'mobile' ? '48px 20px' : '64px 40px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Logo + Tagline */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            {logoSvg}
            <span style={{ fontSize: '24px', fontWeight: '700', fontFamily: FONTS.sans, letterSpacing: '-0.01em' }}>
              hostack
            </span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', fontFamily: FONTS.sans, margin: '8px 0 0 0' }}>
            {CONTENT.footer.tagline}
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', fontFamily: FONTS.sans, margin: '4px 0 0 0' }}>
            {CONTENT.footer.sub}
          </p>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: bp === 'mobile' ? '16px 24px' : '32px', marginBottom: '32px', fontSize: '14px', fontFamily: FONTS.sans }}>
          {CONTENT.footer.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.neon)}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.8)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(74,248,212,0.2)', marginBottom: '32px' }} />

        {/* Copyright */}
        <div style={{ display: 'flex', flexDirection: bp === 'mobile' ? 'column' : 'row', justifyContent: 'space-between', alignItems: bp === 'mobile' ? 'flex-start' : 'center', gap: bp === 'mobile' ? '16px' : '0' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: FONTS.sans, margin: 0 }}>
            {CONTENT.footer.copyright}
          </p>
          <p style={{ fontSize: '13px', color: COLORS.neon, fontFamily: FONTS.sans, margin: 0, fontWeight: '500' }}>
            {CONTENT.footer.available}
          </p>
        </div>
      </div>
    </footer>
  );
}
