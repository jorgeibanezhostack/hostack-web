import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#pricing', label: 'Pricing' },
  { href: 'https://cal.com/jorge-ibanez-hostack/discovery-call', label: 'Book a Call', external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-white font-semibold text-xl tracking-tight hover:opacity-90 transition-opacity"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.9" />
            <rect x="13" y="1" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.5" />
            <rect x="1" y="13" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.5" />
            <rect x="13" y="13" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.9" />
          </svg>
          Hostack
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`text-sm font-medium transition-colors ${
                link.external
                  ? 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden text-white p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <span
              className={`block h-0.5 bg-current transition-all duration-200 origin-center ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-200 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-200 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-800"
          >
            {LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-6 py-4 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors text-sm font-medium border-b border-slate-800/50 last:border-b-0"
              >
                {link.label}
                {link.external && (
                  <svg className="ml-auto w-3.5 h-3.5 opacity-50" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H6M11 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
