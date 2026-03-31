import { useState, useEffect, useRef } from 'react';

// ─── PALETTE ────────────────────────────────────────────────────────────────
const P = {
  ink: '#0d1f22', inkMid: '#1e3a3f', inkSoft: '#4a6e74', inkFaint: '#7a9ea4',
  surface: '#ffffff', surface2: '#f4f8f8', surface3: '#e6f0f1',
  accent: '#084e59', accentDark: '#052f36', accentDeep: '#031e23',
  neon: '#4af8d4', neonSoft: 'rgba(74,248,212,0.12)', neonMid: 'rgba(74,248,212,0.25)',
  accentSoft: 'rgba(8,78,89,0.07)', accentMid: 'rgba(8,78,89,0.15)',
  tealSoft: '#ddf4f1', tealMid: '#b0e8e2',
  border: 'rgba(8,78,89,0.10)', borderStrong: 'rgba(8,78,89,0.20)',
};

// ─── TYPOGRAPHY ──────────────────────────────────────────────────────────────
const T = {
  h1: { fontFamily: "'DM Sans',sans-serif", fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.08 },
  h2: { fontFamily: "'DM Sans',sans-serif", fontWeight: 300, letterSpacing: '0.06em', lineHeight: 1.1 },
  h3: { fontFamily: "'DM Sans',sans-serif", fontWeight: 400, letterSpacing: '0.07em' },
  h4: { fontFamily: "'DM Sans',sans-serif", fontWeight: 500, letterSpacing: '0.08em' },
  eye: { fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif" },
  mono: { fontFamily: "'DM Mono',monospace", letterSpacing: '0.05em' },
};

// ─── i18n ────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    navHow: 'How it works', navResults: 'Results', navPricing: 'Pricing',
    navCta: 'Get started →',
    heroBadge: 'Live at Torridonia · 23 beds',
    heroH1a: 'The system that runs ops —',
    heroH1b: 'so you can build community.',
    heroSub: 'Guest requests go to your team automatically. Your team logs everything. You see it all — from anywhere. No WhatsApp groups. No paper checklists.',
    heroCta: 'Get started free →', heroSee: 'See how it works',
    problemEye: 'The problem',
    problemH2: 'Managers spend 3+ hours a day on operational noise.',
    problemSub: "That's time you're not spending with your guests or growing your space.",
    solutionEye: 'The product',
    solutionH2: 'Three layers. One system.',
    solutionSub: 'How it works',
    resultsEye: 'Live since 2025',
    resultsH3: 'Torridonia',
    resultsSub: 'Loch Torridon, Scottish Highlands · 23 beds · 8–11 team members',
    quote: '"Before Hostack, I was forwarding messages and chasing updates all morning. Now I open the dashboard and I know exactly what\'s happening across every room before I\'ve had coffee."',
    quoteBy: '— Felix, Owner · Torridonia',
    before: 'Before:', beforeText: '3 WhatsApp groups, paper checklists, daily briefings.',
    after: 'After:', afterText: 'One dashboard. Automated task routing. Zero missed requests.',
    pricingEye: 'Start free. Upgrade when you\'re ready.',
    pricingH2: 'Simple tools. Real results.',
    pricingTag: 'What\'s included',
    foundingTitle: 'Founding Member Programme — 3 spots left',
    foundingTag: '2 of 5 taken',
    foundingSub: 'Skip the setup fee. Lock in the best price. Shape what we build next.',
    freePlan: 'Free', freeSub: 'No credit card. No time limit.', freeCta: 'Get started free →',
    freeTagline: 'Try everything for up to 20 beds. See if it works before you pay anything.',
    foundingPlan: 'Founding Member', foundingDeal: 'Founding Member deal',
    foundingPrice: '6 months × €99', foundingGet: 'You get 12 months',
    foundingDetail: 'Pay 6 months · Get 12 · Setup fee waived',
    foundingCta: 'Claim your spot →',
    fullPlan: 'Full Service', fullSub: 'Operator + add-ons', fullCta: 'Book a call →',
    trial: '30-day trial on all paid plans. Cancel any time.',
    ctaH2: 'Founding Member Programme — 3 spots left',
    ctaTag: '2 of 5 taken',
    ctaPlaceholder: 'your@email.com',
    ctaButton: 'Claim my spot →',
    ctaConfirm: 'Got it — we\'ll reach out within 24 hours. ✓',
    footerTagline: 'The system that runs ops — so the manager builds community.',
    footerAvailable: 'Available in Europe & UK',
    footerCopy: '© 2026 Hostack. Available in Europe & UK.',
    footerSub: 'Built for operators who care about the experience, not just the booking.',
    guestApp: 'Guest App', staffApp: 'Staff App', ownerDash: 'Owner Dashboard',
  },
  es: {
    navHow: 'Cómo funciona', navResults: 'Resultados', navPricing: 'Precios',
    navCta: 'Empezar →',
    heroBadge: 'En vivo en Torridonia · 23 camas',
    heroH1a: 'El sistema que gestiona operaciones —',
    heroH1b: 'para que construyas comunidad.',
    heroSub: 'Las solicitudes de huéspedes llegan a tu equipo automáticamente. Tu equipo registra todo. Tú lo ves todo — desde cualquier lugar. Sin grupos de WhatsApp. Sin listas en papel.',
    heroCta: 'Empezar gratis →', heroSee: 'Ver cómo funciona',
    problemEye: 'El problema',
    problemH2: 'Los managers pasan 3+ horas al día en ruido operacional.',
    problemSub: 'Ese es tiempo que no estás dedicando a tus huéspedes o al crecimiento de tu espacio.',
    solutionEye: 'El producto',
    solutionH2: 'Tres capas. Un sistema.',
    solutionSub: 'Cómo funciona',
    resultsEye: 'En vivo desde 2025',
    resultsH3: 'Torridonia',
    resultsSub: 'Loch Torridon, Highlands de Escocia · 23 camas · 8–11 personas',
    quote: '"Antes de Hostack, pasaba la mañana reenviando mensajes y persiguiendo actualizaciones. Ahora abro el dashboard y sé exactamente lo que pasa en cada habitación antes de tomar café."',
    quoteBy: '— Felix, Propietario · Torridonia',
    before: 'Antes:', beforeText: '3 grupos de WhatsApp, listas en papel, briefings diarios.',
    after: 'Después:', afterText: 'Un dashboard. Tareas automáticas. Cero solicitudes perdidas.',
    pricingEye: 'Empieza gratis. Mejora cuando estés listo.',
    pricingH2: 'Herramientas simples. Resultados reales.',
    pricingTag: 'Qué incluye',
    foundingTitle: 'Programa Founding Member — 3 plazas',
    foundingTag: '2 de 5 tomadas',
    foundingSub: 'Sin tarifa de configuración. Mejor precio bloqueado. Influye en lo que construimos.',
    freePlan: 'Gratis', freeSub: 'Sin tarjeta. Sin límite de tiempo.', freeCta: 'Empezar gratis →',
    freeTagline: 'Prueba todo hasta 20 camas. Comprueba si funciona antes de pagar.',
    foundingPlan: 'Founding Member', foundingDeal: 'Oferta Founding Member',
    foundingPrice: '6 meses × €99', foundingGet: 'Obtienes 12 meses',
    foundingDetail: 'Pagas 6 meses · Recibes 12 · Sin tarifa de configuración',
    foundingCta: 'Reserva tu plaza →',
    fullPlan: 'Full Service', fullSub: 'Operador + complementos', fullCta: 'Reservar llamada →',
    trial: 'Prueba de 30 días en todos los planes de pago. Cancela cuando quieras.',
    ctaH2: 'Programa Founding Member — 3 plazas',
    ctaTag: '2 de 5 tomadas',
    ctaPlaceholder: 'tu@email.com',
    ctaButton: 'Reservar mi plaza →',
    ctaConfirm: 'Recibido — te contactamos en 24 horas. ✓',
    footerTagline: 'El sistema que gestiona operaciones — para que el manager construya comunidad.',
    footerAvailable: 'Disponible en Europa & UK',
    footerCopy: '© 2026 Hostack. Disponible en Europa & UK.',
    footerSub: 'Hecho para operadores que cuidan la experiencia, no solo la reserva.',
    guestApp: 'App Huésped', staffApp: 'App Personal', ownerDash: 'Dashboard Propietario',
  }
};

function useLang() {
  const [lang, setLang] = useState(() => {
    const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
    return nav.toLowerCase().startsWith('es') ? 'es' : 'en';
  });
  return [lang, setLang];
}

// ─── RESPONSIVE ──────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < 640) return 'mobile';
    if (window.innerWidth < 900) return 'tablet';
    return 'desktop';
  });
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth < 640) setBp('mobile');
      else if (window.innerWidth < 900) setBp('tablet');
      else setBp('desktop');
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return bp;
}

// ─── LAYOUT HELPERS ───────────────────────────────────────────────────────────
const section = { padding: '88px 0' };
const container = (bp) => ({
  maxWidth: 1080,
  margin: '0 auto',
  padding: bp === 'mobile' ? '0 20px' : bp === 'tablet' ? '0 32px' : '0 40px',
});

// ─── FADE-IN ──────────────────────────────────────────────────────────────────
function useFade(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Fade({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFade();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(18px)',
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icons = {
  Logo: ({ light }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" rx="1.5" fill={light ? 'white' : P.accent} />
      <rect x="10" y="1" width="7" height="7" rx="1.5" fill={light ? 'white' : P.accent} opacity=".55" />
      <rect x="1" y="10" width="7" height="7" rx="1.5" fill={light ? 'white' : P.accent} opacity=".55" />
      <rect x="10" y="10" width="7" height="7" rx="1.5" fill={light ? 'white' : P.accent} opacity=".22" />
    </svg>
  ),
  Chk: ({ color = P.accent }) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M2 6.5L5.2 9.5L11 3.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Arr: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Ham: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="5" width="16" height="2" rx="1" fill={P.inkMid} />
      <rect x="3" y="10" width="16" height="2" rx="1" fill={P.inkMid} />
      <rect x="3" y="15" width="16" height="2" rx="1" fill={P.inkMid} />
    </svg>
  ),
  Close: () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M5 5L17 17M17 5L5 17" stroke={P.inkMid} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ bp, lang, setLang, i }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = bp === 'mobile';
  const isTablet = bp === 'tablet';

  const links = [
    [i.navHow, '#solution'],
    [i.navResults, '#results'],
    [i.navPricing, '#pricing'],
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${P.border}`,
    }}>
      <div style={{ ...container(bp), display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: P.accent, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Logo light />
          </div>
          <span style={{ ...T.h4, fontSize: 15, color: P.ink }}>hostack</span>
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {links.map(([label, href]) => (
              <a key={label} href={href} style={{ padding: '6px 14px', fontSize: 13, color: P.inkSoft, textDecoration: 'none', borderRadius: 7, letterSpacing: '0.03em', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = P.ink}
                onMouseLeave={e => e.currentTarget.style.color = P.inkSoft}>
                {label}
              </a>
            ))}
          </div>
        )}

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Lang toggle */}
          <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 6, border: `1px solid ${P.border}`, background: 'transparent', color: P.inkSoft, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          {!isMobile && (
            <a href="#cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: P.accent, color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = P.accentDeep; e.currentTarget.style.boxShadow = `0 0 0 2px ${P.neon}`; }}
              onMouseLeave={e => { e.currentTarget.style.background = P.accent; e.currentTarget.style.boxShadow = 'none'; }}>
              {i.navCta}
            </a>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              {menuOpen ? <Icons.Close /> : <Icons.Ham />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ background: '#fff', borderTop: `1px solid ${P.border}`, padding: '12px 20px 16px' }}>
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '10px 0', fontSize: 15, color: P.inkMid, textDecoration: 'none', borderBottom: `1px solid ${P.border}` }}>
              {label}
            </a>
          ))}
          <a href="#cta" onClick={() => setMenuOpen(false)}
            style={{ display: 'block', marginTop: 14, background: P.accent, color: '#fff', padding: '11px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none', textAlign: 'center', letterSpacing: '0.04em' }}>
            {i.navCta}
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ bp, i }) {
  const isMobile = bp === 'mobile';
  const isTablet = bp === 'tablet';

  return (
    <section style={{ ...section, paddingTop: 120, background: P.surface, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: P.neon, opacity: 0.7 }} />
      <div style={{ position: 'absolute', right: '8%', top: '10%', width: 420, height: 420, background: `radial-gradient(ellipse,${P.neonSoft} 0%,transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ ...container(bp), display: 'grid', gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '5rem', alignItems: 'center' }}>
        <div>
          <Fade>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: P.tealSoft, border: `1px solid ${P.tealMid}`, borderRadius: 999, padding: '5px 14px', marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: P.neon }} />
              <span style={{ ...T.eye, fontSize: 11, color: P.accent }}>{i.heroBadge}</span>
            </div>
          </Fade>

          <Fade delay={80}>
            <h1 style={{ ...T.h1, fontSize: isMobile ? 'clamp(2rem,8vw,2.6rem)' : 'clamp(2.4rem,4.5vw,3.6rem)', color: P.ink, marginBottom: 20 }}>
              {i.heroH1a}<br />
              <span style={{ color: P.accent }}>{i.heroH1b}</span>
            </h1>
          </Fade>

          <Fade delay={160}>
            <p style={{ fontSize: isMobile ? 15 : 17, color: P.inkSoft, lineHeight: 1.78, marginBottom: 32, maxWidth: 430 }}>
              {i.heroSub}
            </p>
          </Fade>

          <Fade delay={240}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 30 }}>
              <a href="#cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: P.accent, color: '#fff', padding: isMobile ? '12px 20px' : '12px 24px', borderRadius: 9, fontSize: 14, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em', width: isMobile ? '100%' : 'auto', justifyContent: 'center', transition: 'background 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                onMouseEnter={e => { e.currentTarget.style.background = P.accentDeep; e.currentTarget.style.boxShadow = `0 0 0 3px ${P.neon}`; }}
                onMouseLeave={e => { e.currentTarget.style.background = P.accent; e.currentTarget.style.boxShadow = 'none'; }}>
                {i.heroCta} <Icons.Arr />
              </a>
              <a href="#solution" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent', color: P.inkMid, padding: isMobile ? '12px 20px' : '12px 20px', borderRadius: 9, fontSize: 14, textDecoration: 'none', border: `1px solid ${P.border}`, width: isMobile ? '100%' : 'auto', justifyContent: 'center', boxSizing: 'border-box' }}>
                {i.heroSee}
              </a>
            </div>
          </Fade>
        </div>

        {/* Live data flow visual */}
        {!isMobile && (
          <Fade delay={300}>
            <div style={{ background: P.surface2, borderRadius: 16, border: `1px solid ${P.border}`, padding: '28px 24px', maxWidth: 380 }}>
              <div style={{ ...T.eye, fontSize: 10, color: P.accent, marginBottom: 16 }}>Live data flow</div>
              {[
                { label: 'Guest App', sub: 'Request sent', dot: P.neon },
                { label: 'Staff App', sub: 'Task assigned → in progress', dot: '#4af8d4' },
                { label: 'Owner Dashboard', sub: 'Visible in real time', dot: P.accentDark },
              ].map((item, idx) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: idx < 2 ? 20 : 0, position: 'relative' }}>
                  {idx < 2 && <div style={{ position: 'absolute', left: 7, top: 20, width: 2, height: 22, background: P.border }} />}
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: item.dot, flexShrink: 0, marginTop: 2, boxShadow: `0 0 0 3px ${P.neonSoft}` }} />
                  <div>
                    <div style={{ ...T.h4, fontSize: 13, color: P.ink }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: P.inkSoft, marginTop: 2 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        )}
      </div>
    </section>
  );
}

// ─── PROBLEM ─────────────────────────────────────────────────────────────────
function Problem({ bp, i }) {
  const isMobile = bp === 'mobile';
  const issues = [
    ['Guest requests lost in WhatsApp', 'No central record. No accountability.'],
    ['Staff don\'t know what\'s urgent', 'Everything feels equal. Nothing gets prioritised.'],
    ['Owner can\'t see what\'s happening', 'No visibility without calling someone.'],
    ['Handovers fail', 'Night shift doesn\'t know what day shift left unresolved.'],
  ];
  return (
    <section style={{ ...section, background: P.surface }}>
      <div style={container(bp)}>
        <Fade>
          <span style={{ display: 'inline-block', background: P.tealSoft, color: P.accent, ...T.eye, fontSize: 10, padding: '3px 10px', borderRadius: 5, marginBottom: 14 }}>{i.problemEye}</span>
        </Fade>
        <Fade delay={60}>
          <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.8rem,6vw,2.4rem)' : 'clamp(2.85rem,5.25vw,3.9rem)', color: P.ink, maxWidth: 620, marginBottom: 12 }}>{i.problemH2}</h2>
        </Fade>
        <Fade delay={100}>
          <p style={{ fontSize: 16, color: P.inkSoft, marginBottom: 40 }}>{i.problemSub}</p>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
          {issues.map(([title, sub], idx) => (
            <Fade key={title} delay={idx * 60}>
              <div style={{ background: P.surface2, border: `1px solid ${P.border}`, borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ ...T.h4, fontSize: 14, color: P.ink, marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 13, color: P.inkSoft, lineHeight: 1.6 }}>{sub}</div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTION ────────────────────────────────────────────────────────────────
function Solution({ bp, i }) {
  const isMobile = bp === 'mobile';
  const layers = [
    {
      label: i.guestApp, color: P.neon,
      features: [
        ['QR code access — no app download', 'Guests scan and submit requests in seconds'],
        ['Request tracking', 'Guests see status. Staff get notified.'],
        ['Community feed', 'Local tips and property updates in one place'],
      ],
    },
    {
      label: i.staffApp, color: P.accentDark,
      features: [
        ['Shift checklists', 'Room-by-room, role-specific. Auto-generated each shift.'],
        ['Incident reporting', 'Log issues with photo + location. Routed instantly.'],
        ['Real-time notifications', 'New request? Staff knows in seconds.'],
      ],
    },
    {
      label: i.ownerDash, color: P.accentDeep,
      features: [
        ['Live activity stream', 'Every request, every task — in one view.'],
        ['Automated monthly reports', 'Incidents, completions, trends — no effort needed'],
        ['White-label ready', 'Your brand. Your colours. Hostack stays invisible'],
      ],
    },
  ];
  return (
    <section id="solution" style={{ ...section, background: P.surface2 }}>
      <div style={container(bp)}>
        <Fade>
          <span style={{ display: 'inline-block', background: P.tealSoft, color: P.accent, ...T.eye, fontSize: 10, padding: '3px 10px', borderRadius: 5, marginBottom: 14 }}>{i.solutionEye}</span>
        </Fade>
        <Fade delay={60}>
          <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.8rem,6vw,2.4rem)' : 'clamp(2.85rem,5.25vw,3.9rem)', color: P.ink, marginBottom: 8 }}>{i.solutionH2}</h2>
        </Fade>
        <Fade delay={100}>
          <p style={{ fontSize: 15, color: P.inkSoft, marginBottom: 44 }}>{i.solutionSub}</p>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
          {layers.map((layer, li) => (
            <Fade key={layer.label} delay={li * 80}>
              <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 14, padding: '26px 24px', borderTop: `3px solid ${layer.color}` }}>
                <div style={{ ...T.eye, fontSize: 10, color: P.accent, marginBottom: 16 }}>{layer.label}</div>
                {layer.features.map(([title, sub]) => (
                  <div key={title} style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                    <Icons.Chk />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: P.ink, marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: 12, color: P.inkSoft, lineHeight: 1.6 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESULTS ──────────────────────────────────────────────────────────────────
function Results({ bp, i }) {
  const isMobile = bp === 'mobile';
  const stats = [
    ['70%', isMobile ? 'less time on\noperational tasks' : 'less time on operational tasks'],
    ['100%', 'requests tracked\nsince launch'],
  ];
  return (
    <section id="results" style={{ ...section, background: P.surface2 }}>
      <div style={container(bp)}>
        <Fade>
          <span style={{ display: 'inline-block', background: P.tealSoft, color: P.accent, ...T.eye, fontSize: 10, padding: '3px 10px', borderRadius: 5, marginBottom: 14 }}>{i.resultsEye}</span>
        </Fade>
        <div style={{ background: P.surface, borderRadius: 16, border: `1px solid ${P.border}`, padding: isMobile ? '28px 20px' : 38, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '2.5rem' }}>
          <Fade delay={60}>
            <div>
              <h3 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.5rem,5vw,1.9rem)' : 'clamp(1.5rem,2.5vw,1.9rem)', color: P.ink, marginBottom: 3 }}>{i.resultsH3}</h3>
              <p style={{ fontSize: 13, color: P.inkSoft, marginBottom: 18 }}>{i.resultsSub}</p>
              <blockquote style={{ fontSize: 14, fontStyle: 'italic', color: P.inkMid, lineHeight: 1.82, borderLeft: `2px solid ${P.neon}`, paddingLeft: 16, marginBottom: 12 }}>
                {i.quote}
              </blockquote>
              <p style={{ fontSize: 12, color: P.inkFaint, ...T.mono }}>{i.quoteBy}</p>
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${P.border}`, fontSize: 13, color: P.inkSoft, lineHeight: 1.78 }}>
                <strong style={{ color: P.ink, fontWeight: 500 }}>{i.before}</strong> {i.beforeText}<br />
                <strong style={{ color: P.ink, fontWeight: 500 }}>{i.after}</strong> {i.afterText}
              </div>
            </div>
          </Fade>
          <Fade delay={120}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
              {stats.map(([num, label]) => (
                <div key={num} style={{ background: P.surface2, borderRadius: 12, padding: '22px 24px', border: `1px solid ${P.border}` }}>
                  <div style={{ ...T.h1, fontSize: isMobile ? '2.6rem' : '3.2rem', color: P.accent, lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 13, color: P.inkSoft, marginTop: 6, lineHeight: 1.5 }}>{label}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function Pricing({ bp, i }) {
  const isMobile = bp === 'mobile';
  const features = [
    'Guest request system', 'Staff shift checklists', 'Incident reporting',
    'Owner real-time dashboard', 'WhatsApp notifications', 'Monthly reports',
    'QR onboarding — live in < 1 hour', 'Dedicated onboarding call',
  ];
  return (
    <section id="pricing" style={{ ...section, background: P.surface }}>
      <div style={container(bp)}>
        {/* Founding banner */}
        <Fade>
          <div style={{ background: P.accentDeep, borderRadius: 14, padding: isMobile ? '22px 18px' : '26px 32px', marginBottom: 52, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ ...T.h4, fontSize: 15, color: '#fff' }}>{i.foundingTitle}</span>
                <span style={{ background: P.neon, color: P.accentDeep, ...T.eye, fontSize: 9, padding: '2px 8px', borderRadius: 4 }}>{i.foundingTag}</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{i.foundingSub}</p>
            </div>
            <a href="#cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: P.neon, color: P.accentDeep, padding: '9px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
              {i.foundingCta} <Icons.Arr />
            </a>
          </div>
        </Fade>

        <Fade delay={40}>
          <span style={{ display: 'inline-block', background: P.tealSoft, color: P.accent, ...T.eye, fontSize: 10, padding: '3px 10px', borderRadius: 5, marginBottom: 14 }}>{i.pricingTag}</span>
        </Fade>
        <Fade delay={80}>
          <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.8rem,6vw,2.4rem)' : 'clamp(2.85rem,5.25vw,3.9rem)', color: P.ink, marginBottom: 8 }}>{i.pricingH2}</h2>
        </Fade>
        <Fade delay={100}>
          <p style={{ fontSize: 15, color: P.inkSoft, marginBottom: 44 }}>{i.pricingEye}</p>
        </Fade>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 20, marginBottom: 28 }}>
          {/* Free */}
          <Fade delay={120}>
            <div style={{ background: P.surface2, border: `1px solid ${P.border}`, borderRadius: 14, padding: '28px 24px' }}>
              <div style={{ ...T.eye, fontSize: 10, color: P.inkSoft, marginBottom: 10 }}>{i.freePlan}</div>
              <div style={{ ...T.h1, fontSize: '2.6rem', lineHeight: 1, marginBottom: 3 }}>€0<span style={{ fontSize: 14, fontWeight: 400, color: P.inkSoft }}>/mo</span></div>
              <div style={{ ...T.mono, fontSize: 12, color: P.inkSoft, paddingBottom: 14, borderBottom: `1px solid ${P.border}`, marginBottom: 16 }}>{i.freeSub}</div>
              <p style={{ fontSize: 13, color: P.inkSoft, lineHeight: 1.65, marginBottom: 20 }}>{i.freeTagline}</p>
              {features.slice(0, 4).map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <Icons.Chk color={P.inkFaint} />
                  <span style={{ fontSize: 13, color: P.inkSoft }}>{f}</span>
                </div>
              ))}
              <a href="#cta" style={{ display: 'block', marginTop: 22, textAlign: 'center', background: P.accent, color: '#fff', padding: '10px 0', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em' }}>
                {i.freeCta}
              </a>
            </div>
          </Fade>

          {/* Founding Member */}
          <Fade delay={160}>
            <div style={{ background: P.accentDeep, border: `2px solid ${P.neon}`, borderRadius: 14, padding: '28px 24px', position: 'relative', boxShadow: `0 0 0 4px ${P.neonSoft}` }}>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: P.neon, color: P.accentDeep, ...T.eye, fontSize: 9, padding: '3px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>{i.foundingDeal}</div>
              <div style={{ ...T.eye, fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 10, marginTop: 8 }}>{i.foundingPlan}</div>
              <div style={{ ...T.h1, fontSize: '1.5rem', lineHeight: 1, color: '#fff', marginBottom: 2 }}>{i.foundingPrice}</div>
              <div style={{ fontSize: 13, color: P.neon, marginBottom: 4 }}>{i.foundingGet}</div>
              <div style={{ ...T.mono, fontSize: 12, color: 'rgba(255,255,255,0.45)', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 16 }}>{i.foundingDetail}</div>
              {features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <Icons.Chk color={P.neon} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                </div>
              ))}
              <a href="#cta" style={{ display: 'block', marginTop: 22, textAlign: 'center', background: P.neon, color: P.accentDeep, padding: '10px 0', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em' }}>
                {i.foundingCta}
              </a>
            </div>
          </Fade>

          {/* Full Service */}
          <Fade delay={200}>
            <div style={{ background: P.surface2, border: `1px solid ${P.border}`, borderRadius: 14, padding: '28px 24px' }}>
              <div style={{ ...T.eye, fontSize: 10, color: P.inkSoft, marginBottom: 10 }}>{i.fullPlan}</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: P.ink, marginBottom: 4 }}>Custom</div>
              <div style={{ ...T.mono, fontSize: 12, color: P.inkSoft, paddingBottom: 14, borderBottom: `1px solid ${P.border}`, marginBottom: 16 }}>{i.fullSub}</div>
              {features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <Icons.Chk />
                  <span style={{ fontSize: 13, color: P.inkSoft }}>{f}</span>
                </div>
              ))}
              <a href="#cta" style={{ display: 'block', marginTop: 22, textAlign: 'center', background: 'transparent', color: P.accent, padding: '10px 0', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none', border: `1px solid ${P.border}`, letterSpacing: '0.04em' }}>
                {i.fullCta}
              </a>
            </div>
          </Fade>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: P.inkFaint }}>{i.trial}</p>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA({ bp, i }) {
  const isMobile = bp === 'mobile';
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section id="cta" style={{ ...section, background: P.accentDeep }}>
      <div style={{ ...container(bp), textAlign: 'center' }}>
        <Fade>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(74,248,212,0.15)', border: '1px solid rgba(74,248,212,0.3)', borderRadius: 999, padding: '4px 14px', marginBottom: 24 }}>
            <span style={{ ...T.eye, fontSize: 9, color: P.neon }}>{i.ctaTag}</span>
          </div>
        </Fade>
        <Fade delay={60}>
          <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.8rem,6vw,2.4rem)' : 'clamp(2.85rem,5.25vw,3.9rem)', color: '#fff', maxWidth: 600, margin: '0 auto 16px' }}>{i.ctaH2}</h2>
        </Fade>
        <Fade delay={140}>
          {sent ? (
            <p style={{ fontSize: 16, color: P.neon, marginTop: 20 }}>{i.ctaConfirm}</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }}
              style={{ display: 'flex', gap: 10, justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row', maxWidth: 460, margin: '0 auto' }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder={i.ctaPlaceholder}
                style={{ flex: 1, padding: '11px 16px', borderRadius: 8, border: 'none', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none', color: P.ink }} />
              <button type="submit"
                style={{ background: P.neon, color: P.accentDeep, padding: '11px 22px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", letterSpacing: '0.04em', whiteSpace: 'nowrap', width: isMobile ? '100%' : 'auto' }}>
                {i.ctaButton}
              </button>
            </form>
          )}
        </Fade>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ bp, i }) {
  const isMobile = bp === 'mobile';
  return (
    <footer style={{ background: P.accentDeep, borderTop: '1px solid rgba(255,255,255,0.07)', padding: isMobile ? '32px 0 24px' : '44px 0 32px' }}>
      <div style={{ ...container(bp), display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, background: 'rgba(255,255,255,0.12)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Logo light />
          </div>
          <span style={{ ...T.h4, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>hostack</span>
        </div>
        <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '0 0 4px' }}>{i.footerCopy}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>{i.footerSub}</p>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{i.footerAvailable}</div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const bp = useBreakpoint();
  const [lang, setLang] = useLang();
  const i = TRANSLATIONS[lang];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: ${P.surface}; color: ${P.ink}; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${P.neonMid}; }
      `}</style>
      <Nav bp={bp} lang={lang} setLang={setLang} i={i} />
      <main style={{ paddingTop: 56 }}>
        <Hero bp={bp} i={i} />
        <Problem bp={bp} i={i} />
        <Solution bp={bp} i={i} />
        <Results bp={bp} i={i} />
        <Pricing bp={bp} i={i} />
        <CTA bp={bp} i={i} />
      </main>
      <Footer bp={bp} i={i} />
    </>
  );
}
