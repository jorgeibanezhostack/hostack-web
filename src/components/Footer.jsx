const PRODUCT_LINKS = [
  { href: '#product', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#founder-form', label: 'Founder Program' },
]

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function HostackLogo({ size = 'normal' }) {
  return (
    <div
      className="flex items-center gap-2 font-semibold tracking-tight text-white"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: size === 'sm' ? '16px' : '20px',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.9" />
        <rect x="13" y="1" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.5" />
        <rect x="1" y="13" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.5" />
        <rect x="13" y="13" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.9" />
      </svg>
      Hostack
    </div>
  )
}

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: '#060d1a', borderColor: 'rgba(15,23,42,1)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <HostackLogo />
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: '#64748b' }}>
              The operating system for hostel and coliving managers.
              Manage operations, guests, and staff — all in one place.
            </p>
            <p className="mt-3 text-xs italic" style={{ color: '#475569' }}>
              Built for humans. Built for community. Built for managers like you.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="transition-colors p-2 rounded-lg"
                style={{ color: '#475569' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569' }}
                aria-label="Twitter / X"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="transition-colors p-2 rounded-lg"
                style={{ color: '#475569' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569' }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#94a3b8', letterSpacing: '0.14em' }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: '#64748b' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#94a3b8', letterSpacing: '0.14em' }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: '#64748b' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'rgba(30,41,59,0.6)' }}
        >
          <p className="text-xs" style={{ color: '#334155' }}>
            © 2026 Hostack. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#1e293b' }}>
            volunteer-managed · building in public · early stage
          </p>
        </div>
      </div>
    </footer>
  )
}
