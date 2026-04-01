import { useState, useEffect, useRef } from 'react';

const P = {
    ink: '#0d1f22',
    inkMid: '#1e3a3f',
    inkSoft: '#4a6e74',
    inkFaint: '#7a9ea4',
    surface: '#ffffff',
    surface2: '#f4f8f8',
    surface3: '#e6f0f1',
    accent: '#084e59',
    accentDark: '#052f36',
    accentDeep: '#031e23',
    neon: '#4af8d4',
    neonSoft: 'rgba(74,248,212,0.12)',
    neonMid: 'rgba(74,248,212,0.25)',
    accentSoft: 'rgba(8,78,89,0.07)',
    accentMid: 'rgba(8,78,89,0.15)',
    tealSoft: '#ddf4f1',
    tealMid: '#b0e8e2',
    border: 'rgba(8,78,89,0.10)',
    borderStrong: 'rgba(8,78,89,0.20)',
};

const T = {
    h1: { fontFamily: "'DM Sans',sans-serif", fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.08 },
    h2: { fontFamily: "'DM Sans',sans-serif", fontWeight: 300, letterSpacing: '0.06em', lineHeight: 1.1 },
    h3: { fontFamily: "'DM Sans',sans-serif", fontWeight: 400, letterSpacing: '0.07em' },
    h4: { fontFamily: "'DM Sans',sans-serif", fontWeight: 500, letterSpacing: '0.08em' },
    eye: { fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif" },
    mono: { fontFamily: "'DM Mono',monospace", letterSpacing: '0.05em' },
};

const TRANSLATIONS = {
    en: {
        navHow: 'How it works',
        navResults: 'Results',
        navPricing: 'Pricing',
        navCta: 'Get started →',
        heroBadge: 'Live at Torridonia · 23 beds',
        heroH1a: 'The system that runs ops —',
        heroH1b: 'so you can build community.',
        heroSub: 'Guest requests go to your team automatically. Your team logs everything. You see it all — from anywhere. No WhatsApp groups. No paper checklists.',
        heroCta: 'Get started free →',
        heroSee: 'See how it works',
        heroFlowLabel: 'Live data flow',
        heroFlowGuest: 'Guest App',
        heroFlowGuestSub: 'Request sent',
        heroFlowStaff: 'Staff App',
        heroFlowStaffSub: 'Task assigned → in progress',
        heroFlowOwner: 'Owner Dashboard',
        heroFlowOwnerSub: 'Visible in real time',
        problemEye: 'The problem',
        problemH2: 'Managers spend 3+ hours a day on operational noise.',
        problemSub: "That's time you're not spending with your guests or growing your space.",
        problemItem1Title: 'Guest requests lost in WhatsApp',
        problemItem1Sub: 'No central record. No accountability.',
        problemItem2Title: "Staff don't know what's urgent",
        problemItem2Sub: 'Everything feels equal. Nothing gets prioritised.',
        problemItem3Title: "Owner can't see what's happening",
        problemItem3Sub: 'No visibility without calling someone.',
        problemItem4Title: 'Handovers fail',
        problemItem4Sub: "Night shift doesn't know what day shift left unresolved.",
        solutionEye: 'The product',
        solutionH2: 'Three layers. One system.',
        solutionSub: 'How it works',
        guestApp: 'Guest App',
        guestFeature1: 'QR code access — no app download',
        guestFeature1Sub: 'Guests scan and submit requests in seconds',
        guestFeature2: 'Request tracking',
        guestFeature2Sub: 'Guests see status. Staff get notified.',
        guestFeature3: 'Community feed',
        guestFeature3Sub: 'Local tips and property updates in one place',
        staffApp: 'Staff App',
        staffFeature1: 'Shift checklists',
        staffFeature1Sub: 'Room-by-room, role-specific. Auto-generated each shift.',
        staffFeature2: 'Incident reporting',
        staffFeature2Sub: 'Log issues with photo + location. Routed instantly.',
        staffFeature3: 'Real-time notifications',
        staffFeature3Sub: 'New request? Staff knows in seconds.',
        ownerDash: 'Owner Dashboard',
        ownerFeature1: 'Live activity stream',
        ownerFeature1Sub: 'Every request, every task — in one view.',
        ownerFeature2: 'Automated monthly reports',
        ownerFeature2Sub: 'Incidents, completions, trends — no effort needed',
        ownerFeature3: 'White-label ready',
        ownerFeature3Sub: 'Your brand. Your colours. Hostack stays invisible',
        resultsEye: 'Live since 2025',
        resultsH3: 'Torridonia',
        resultsSub: 'Loch Torridon, Scottish Highlands · 23 beds · 8–11 team members',
        quote: '"Before Hostack, I was forwarding messages and chasing updates all morning. Now I open the dashboard and I know exactly what\'s happening across every room before I\'ve had coffee."',
        quoteBy: '— Felix, Owner · Torridonia',
        before: 'Before:',
        beforeText: '3 WhatsApp groups, paper checklists, daily briefings.',
        after: 'After:',
        afterText: 'One dashboard. Automated task routing. Zero missed requests.',
        stat1Label: 'less time on operational tasks',
        stat2Label: 'requests tracked since launch',
        pricingEye: 'Start free. Upgrade when you\'re ready.',
        pricingH2: 'Simple tools. Real results.',
        pricingTag: 'What\'s included',
        foundingTitle: 'Founding Member Programme — 3 spots left',
        foundingTag: '2 of 5 taken',
        foundingSub: 'Skip the setup fee. Lock in the best price. Shape what we build next.',
        freePlan: 'Free',
        freeSub: 'No credit card. No time limit.',
        freeCta: 'Get started free →',
        freeTagline: 'Try everything for up to 20 beds. See if it works before you pay anything.',
        foundingPlan: 'Founding Member',
        foundingDeal: 'Founding Member deal',
        foundingPrice: '6 months × €99',
        foundingGet: 'You get 12 months',
        foundingDetail: 'Pay 6 months · Get 12 · Setup fee waived',
        foundingCta: 'Claim your spot →',
        fullPlan: 'Full Service',
        fullSub: 'Operator + add-ons',
        fullCta: 'Book a call →',
        trial: '30-day trial on all paid plans. Cancel any time.',
        feature1: 'Guest request system',
        feature2: 'Staff shift checklists',
        feature3: 'Incident reporting',
        feature4: 'Owner real-time dashboard',
        feature5: 'WhatsApp notifications',
        feature6: 'Monthly reports',
        feature7: 'QR onboarding — live in < 1 hour',
        feature8: 'Dedicated onboarding call',
        ctaH2: 'Founding Member Programme — 3 spots left',
        ctaTag: '2 of 5 taken',
        ctaPlaceholder: 'your@email.com',
        ctaButton: 'Claim my spot →',
        ctaConfirm: 'Got it — we\'ll reach out within 24 hours. ✓',
        footerTagline: 'The system that runs ops — so the manager builds community.',
        footerAvailable: 'Available in Europe & UK',
        footerCopy: '© 2026 Hostack. Available in Europe & UK.',
        footerSub: 'Built for operators who care about the experience, not just the booking.',
    },
    es: {
        navHow: 'Cómo funciona',
        navResults: 'Resultados',
        navPricing: 'Precios',
        navCta: 'Empezar →',
        heroBadge: 'En vivo en Torridonia · 23 camas',
        heroH1a: 'El sistema que gestiona operaciones —',
        heroH1b: 'para que construyas comunidad.',
        heroSub: 'Las solicitudes de huéspedes llegan a tu equipo automáticamente. Tu equipo registra todo. Tú lo ves todo — desde cualquier lugar. Sin grupos de WhatsApp. Sin listas en papel.',
        heroCta: 'Empezar gratis →',
        heroSee: 'Ver cómo funciona',
        heroFlowLabel: 'Flujo de datos en vivo',
        heroFlowGuest: 'App Huésped',
        heroFlowGuestSub: 'Solicitud enviada',
        heroFlowStaff: 'App Personal',
        heroFlowStaffSub: 'Tarea asignada → en progreso',
        heroFlowOwner: 'Dashboard Propietario',
        heroFlowOwnerSub: 'Visible en tiempo real',
        problemEye: 'El problema',
        problemH2: 'Los managers pasan 3+ horas al día en ruido operacional.',
        problemSub: 'Ese es tiempo que no estás dedicando a tus huéspedes o al crecimiento de tu espacio.',
        problemItem1Title: 'Solicitudes perdidas en WhatsApp',
        problemItem1Sub: 'Sin registro central. Sin responsabilidad.',
        problemItem2Title: 'El personal no sabe qué es urgente',
        problemItem2Sub: 'Todo parece igual. Nada se prioriza.',
        problemItem3Title: 'El propietario no puede ver qué está pasando',
        problemItem3Sub: 'Sin visibilidad sin llamar a alguien.',
        problemItem4Title: 'Los cambios de turno fallan',
        problemItem4Sub: 'El turno de noche no sabe qué dejó sin resolver el turno de día.',
        solutionEye: 'El producto',
        solutionH2: 'Tres capas. Un sistema.',
        solutionSub: 'Cómo funciona',
        guestApp: 'App Huésped',
        guestFeature1: 'Acceso por código QR — sin descargar app',
        guestFeature1Sub: 'Los huéspedes escanean y envían solicitudes en segundos',
        guestFeature2: 'Seguimiento de solicitudes',
        guestFeature2Sub: 'Los huéspedes ven el estado. El personal recibe notificaciones.',
        guestFeature3: 'Feed comunitario',
        guestFeature3Sub: 'Consejos locales y actualizaciones en un solo lugar',
        staffApp: 'App Personal',
        staffFeature1: 'Listas de turno',
        staffFeature1Sub: 'Habitación por habitación, específico por rol. Generado automáticamente cada turno.',
        staffFeature2: 'Reporte de incidentes',
        staffFeature2Sub: 'Registra problemas con foto + ubicación. Enrutado al instante.',
        staffFeature3: 'Notificaciones en tiempo real',
        staffFeature3Sub: '¿Nueva solicitud? El personal lo sabe en segundos.',
        ownerDash: 'Dashboard Propietario',
        ownerFeature1: 'Stream de actividad en vivo',
        ownerFeature1Sub: 'Cada solicitud, cada tarea — en una vista.',
        ownerFeature2: 'Reportes mensuales automáticos',
        ownerFeature2Sub: 'Incidentes, finalizaciones, tendencias — sin esfuerzo',
        ownerFeature3: 'Listo para marca blanca',
        ownerFeature3Sub: 'Tu marca. Tus colores. Hostack permanece invisible',
        resultsEye: 'En vivo desde 2025',
        resultsH3: 'Torridonia',
        resultsSub: 'Loch Torridon, Highlands de Escocia · 23 camas · 8–11 personas',
        quote: '"Antes de Hostack, pasaba la mañana reenviando mensajes y persiguiendo actualizaciones. Ahora abro el dashboard y sé exactamente lo que pasa en cada habitación antes de tomar café."',
        quoteBy: '— Felix, Propietario · Torridonia',
        before: 'Antes:',
        beforeText: '3 grupos de WhatsApp, listas en papel, briefings diarios.',
        after: 'Después:',
        afterText: 'Un dashboard. Tareas automáticas. Cero solicitudes perdidas.',
        stat1Label: 'menos tiempo en tareas operacionales',
        stat2Label: 'solicitudes registradas desde el lanzamiento',
        pricingEye: 'Empieza gratis. Mejora cuando estés listo.',
        pricingH2: 'Herramientas simples. Resultados reales.',
        pricingTag: 'Qué incluye',
        foundingTitle: 'Programa Founding Member — 3 plazas',
        foundingTag: '2 de 5 tomadas',
        foundingSub: 'Sin tarifa de configuración. Mejor precio bloqueado. Influye en lo que construimos.',
        freePlan: 'Gratis',
        freeSub: 'Sin tarjeta. Sin límite de tiempo.',
        freeCta: 'Empezar gratis →',
        freeTagline: 'Prueba todo hasta 20 camas. Comprueba si funciona antes de pagar.',
        foundingPlan: 'Founding Member',
        foundingDeal: 'Oferta Founding Member',
        foundingPrice: '6 meses × €99',
        foundingGet: 'Obtienes 12 meses',
        foundingDetail: 'Pagas 6 meses · Recibes 12 · Sin tarifa de configuración',
        foundingCta: 'Reserva tu plaza →',
        fullPlan: 'Full Service',
        fullSub: 'Operador + complementos',
        fullCta: 'Reservar llamada →',
        trial: 'Prueba de 30 días en todos los planes de pago. Cancela cuando quieras.',
        feature1: 'Sistema de solicitudes de huéspedes',
        feature2: 'Listas de turno del personal',
        feature3: 'Reporte de incidentes',
        feature4: 'Dashboard en tiempo real del propietario',
        feature5: 'Notificaciones de WhatsApp',
        feature6: 'Reportes mensuales',
        feature7: 'Onboarding QR — en vivo en < 1 hora',
        feature8: 'Llamada de onboarding dedicada',
        ctaH2: 'Programa Founding Member — 3 plazas',
        ctaTag: '2 de 5 tomadas',
        ctaPlaceholder: 'tu@email.com',
        ctaButton: 'Reservar mi plaza →',
        ctaConfirm: 'Recibido — te contactamos en 24 horas. ✓',
        footerTagline: 'El sistema que gestiona operaciones — para que el manager construya comunidad.',
        footerAvailable: 'Disponible en Europa & UK',
        footerCopy: '© 2026 Hostack. Disponible en Europa & UK.',
        footerSub: 'Hecho para operadores que cuidan la experiencia, no solo la reserva.',
    }
};

function useLang() {
    const [lang, setLang] = useState(() => {
        const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
        return nav.toLowerCase().startsWith('es') ? 'es' : 'en';
    });
    return [lang, setLang];
}

function useBreakpoint() {
    const [bp, setBp] = useState(() => {
        if (typeof window === 'undefined') return 'desktop';
        if (window.innerWidth < 640) return 'mobile';
        if (window.innerWidth < 1024) return 'tablet';
        return 'desktop';
    });

    useEffect(() => {
        const handler = () => {
            if (window.innerWidth < 640) setBp('mobile');
            else if (window.innerWidth < 1024) setBp('tablet');
            else setBp('desktop');
        };
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return bp;
}

const section = { padding: '64px 0' };

const container = (bp) => ({
    maxWidth: bp === 'mobile' ? '100%' : bp === 'tablet' ? 900 : 1200,
    margin: '0 auto',
    padding: bp === 'mobile' ? '0 16px' : bp === 'tablet' ? '0 24px' : '0 40px',
    width: '100%',
    boxSizing: 'border-box',
});

function useFade(threshold = 0.08) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setVisible(true);
        }, { threshold });

        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return [ref, visible];
}

function Fade({ children, delay = 0, style = {} }) {
    const [ref, visible] = useFade();
    return (
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(18px)', transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`, ...style, }}>{children}</div>
    );
}

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
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${P.border}`, }}>
            <div style={{ ...container(bp), display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <div style={{ width: 28, height: 28, background: P.accent, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icons.Logo light />
                    </div>
                    <span style={{ ...T.h4, fontSize: 15, color: P.ink }}>hostack</span>
                </a>
                {!isMobile && (
                    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {links.map(([label, href]) => (
                            <a key={label} href={href} style={{ padding: '6px 14px', fontSize: 13, color: P.inkSoft, textDecoration: 'none', borderRadius: 7, letterSpacing: '0.03em', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = P.ink} onMouseLeave={e => e.currentTarget.style.color = P.inkSoft}> {label} </a>
                        ))}
                    </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 6, border: `1px solid ${P.border}`, background: 'transparent', color: P.inkSoft, cursor: 'pointer' }}> {lang === 'en' ? 'ES' : 'EN'} </button>
                    {!isMobile && (
                        <a href="#cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: P.accent, color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.background = P.accentDeep; e.currentTarget.style.boxShadow = `0 0 0 2px ${P.neon}`; }} onMouseLeave={e => { e.currentTarget.style.background = P.accent; e.currentTarget.style.boxShadow = 'none'; }}> {i.navCta} </a>
                    )}
                    {isMobile && (
                        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}> {menuOpen ? <Icons.Close /> : <Icons.Ham />} </button>
                    )}
                </div>
            </div>
            {isMobile && menuOpen && (
                <div style={{ background: '#fff', borderTop: `1px solid ${P.border}`, padding: '12px 20px 16px' }}>
                    {links.map(([label, href]) => (
                        <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, color: P.inkMid, textDecoration: 'none', borderBottom: `1px solid ${P.border}` }}> {label} </a>
                    ))}
                    <a href="#cta" onClick={() => setMenuOpen(false)} style={{ display: 'block', marginTop: 14, background: P.accent, color: '#fff', padding: '11px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none', textAlign: 'center' }}> {i.navCta} </a>
                </div>
            )}
        </nav>
    );
}

function Hero({ bp, i }) {
    const isMobile = bp === 'mobile';
    const isTablet = bp === 'tablet';
    return (
        <section style={{ ...section, paddingTop: 120, background: P.surface, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: P.neon, opacity: 0.7 }} />
            <div style={{ position: 'absolute', right: '8%', top: '10%', width: 420, height: 420, background: `radial-gradient(ellipse,${P.neonSoft} 0%,transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ ...container(bp), display: 'grid', gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : isTablet ? '3rem' : '5rem', alignItems: 'center' }}>
                <div>
                    <Fade>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: P.tealSoft, border: `1px solid ${P.tealMid}`, borderRadius: 999, padding: '5px 14px', marginBottom: 24 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: P.neon }} />
                            <span style={{ ...T.eye, fontSize: 11, color: P.accent }}>{i.heroBadge}</span>
                        </div>
                    </Fade>
                    <Fade delay={80}>
                        <h1 style={{ ...T.h1, fontSize: isMobile ? 'clamp(1.8rem,7vw,2.4rem)' : isTablet ? 'clamp(2rem,5vw,2.8rem)' : 'clamp(2.4rem,4vw,3.6rem)', color: P.ink, marginBottom: 20 }}> {i.heroH1a}<br /> <span style={{ color: P.accent }}>{i.heroH1b}</span> </h1>
                    </Fade>
                    <Fade delay={160}>
                        <p style={{ fontSize: isMobile ? '15px' : isTablet ? '16px' : '17px', color: P.inkSoft, lineHeight: 1.78, marginBottom: 32, maxWidth: 430 }}> {i.heroSub} </p>
                    </Fade>
                    <Fade delay={240}>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 30 }}>
                            <a href="#cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: P.accent, color: '#fff', padding: isMobile ? '12px 20px' : '12px 24px', borderRadius: 9, fontSize: isMobile ? '13px' : '14px', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.background = P.accentDeep; e.currentTarget.style.boxShadow = `0 0 0 3px ${P.neon}`; }} onMouseLeave={e => { e.currentTarget.style.background = P.accent; e.currentTarget.style.boxShadow = 'none'; }}> {i.heroCta} <Icons.Arr /> </a>
                            <a href="#solution" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent', color: P.inkMid, padding: isMobile ? '12px 20px' : '12px 20px', borderRadius: 9, fontSize: isMobile ? '13px' : '14px', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}> {i.heroSee} </a>
                        </div>
                    </Fade>
                </div>
                {!isMobile && (
                    <Fade delay={300}>
                        <div style={{ background: P.surface2, borderRadius: 16, border: `1px solid ${P.border}`, padding: isTablet ? '20px 18px' : '28px 24px', maxWidth: isTablet ? '100%' : 380 }}>
                            <div style={{ ...T.eye, fontSize: 10, color: P.accent, marginBottom: 16 }}>{i.heroFlowLabel}</div>
                            {[
                                { label: i.heroFlowGuest, sub: i.heroFlowGuestSub, dot: P.neon },
                                { label: i.heroFlowStaff, sub: i.heroFlowStaffSub, dot: '#4af8d4' },
                                { label: i.heroFlowOwner, sub: i.heroFlowOwnerSub, dot: P.accentDark },
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

function Problem({ bp, i }) {
    const isMobile = bp === 'mobile';
    const issues = [
        [i.problemItem1Title, i.problemItem1Sub],
        [i.problemItem2Title, i.problemItem2Sub],
        [i.problemItem3Title, i.problemItem3Sub],
        [i.problemItem4Title, i.problemItem4Sub],
    ];

    return (
        <section style={{ ...section, background: P.surface }}>
            <div style={container(bp)}>
                <Fade>
                    <span style={{ display: 'inline-block', background: P.tealSoft, color: P.accent, ...T.eye, fontSize: 10, padding: '3px 10px', borderRadius: 5, marginBottom: 14 }}>{i.problemEye}</span>
                </Fade>
                <Fade delay={60}>
                    <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.6rem,5vw,2rem)' : 'clamp(2rem,4vw,2.8rem)', color: P.ink, maxWidth: 620, marginBottom: 12 }}>{i.problemH2}</h2>
                </Fade>
                <Fade delay={100}>
                    <p style={{ fontSize: isMobile ? '15px' : '16px', color: P.inkSoft, marginBottom: 40 }}>{i.problemSub}</p>
                </Fade>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: isMobile ? '12px' : '16px' }}>
                    {issues.map(([title, sub], idx) => (
                        <Fade key={title} delay={idx * 60}>
                            <div style={{ background: P.surface2, border: `1px solid ${P.border}`, borderRadius: 12, padding: isMobile ? '16px 18px' : '20px 22px' }}>
                                <div style={{ ...T.h4, fontSize: isMobile ? '13px' : '14px', color: P.ink, marginBottom: 5 }}>{title}</div>
                                <div style={{ fontSize: isMobile ? '12px' : '13px', color: P.inkSoft, lineHeight: 1.6 }}>{sub}</div>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Solution({ bp, i }) {
    const isMobile = bp === 'mobile';
    const layers = [
        {
            label: i.guestApp,
            color: P.neon,
            features: [
                [i.guestFeature1, i.guestFeature1Sub],
                [i.guestFeature2, i.guestFeature2Sub],
                [i.guestFeature3, i.guestFeature3Sub],
            ],
        },
        {
            label: i.staffApp,
            color: P.accentDark,
            features: [
                [i.staffFeature1, i.staffFeature1Sub],
                [i.staffFeature2, i.staffFeature2Sub],
                [i.staffFeature3, i.staffFeature3Sub],
            ],
        },
        {
            label: i.ownerDash,
            color: P.accentDeep,
            features: [
                [i.ownerFeature1, i.ownerFeature1Sub],
                [i.ownerFeature2, i.ownerFeature2Sub],
                [i.ownerFeature3, i.ownerFeature3Sub],
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
                    <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.6rem,5vw,2rem)' : 'clamp(2rem,4vw,2.8rem)', color: P.ink, marginBottom: 8 }}>{i.solutionH2}</h2>
                </Fade>
                <Fade delay={100}>
                    <p style={{ fontSize: isMobile ? '14px' : '15px', color: P.inkSoft, marginBottom: 44 }}>{i.solutionSub}</p>
                </Fade>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? '12px' : '20px' }}>
                    {layers.map((layer, li) => (
                        <Fade key={layer.label} delay={li * 80}>
                            <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 14, padding: isMobile ? '20px 18px' : '26px 24px', borderTop: `3px solid ${layer.color}` }}>
                                <div style={{ ...T.eye, fontSize: 10, color: P.accent, marginBottom: 16 }}>{layer.label}</div>
                                {layer.features.map(([title, sub]) => (
                                    <div key={title} style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                                        <Icons.Chk />
                                        <div>
                                            <div style={{ fontSize: isMobile ? '12px' : '13px', fontWeight: 500, color: P.ink, marginBottom: 2 }}>{title}</div>
                                            <div style={{ fontSize: isMobile ? '11px' : '12px', color: P.inkSoft, lineHeight: 1.6 }}>{sub}</div>
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

function Results({ bp, i }) {
    const isMobile = bp === 'mobile';
    const stats = [
        ['70%', isMobile ? 'less time on\noperational tasks' : i.stat1Label],
        ['100%', isMobile ? 'requests tracked\nsince launch' : i.stat2Label],
    ];

    return (
        <section id="results" style={{ ...section, background: P.surface2 }}>
            <div style={container(bp)}>
                <Fade>
                    <span style={{ display: 'inline-block', background: P.tealSoft, color: P.accent, ...T.eye, fontSize: 10, padding: '3px 10px', borderRadius: 5, marginBottom: 14 }}>{i.resultsEye}</span>
                </Fade>
                <div style={{ background: P.surface, borderRadius: 16, border: `1px solid ${P.border}`, padding: isMobile ? '20px 18px' : '32px 28px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '24px' : '32px' }}>
                    <Fade delay={60}>
                        <div>
                            <h3 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.3rem,4vw,1.7rem)' : 'clamp(1.5rem,2.2vw,1.9rem)', color: P.ink, marginBottom: 3 }}>{i.resultsH3}</h3>
                            <p style={{ fontSize: isMobile ? '12px' : '13px', color: P.inkSoft, marginBottom: 18 }}>{i.resultsSub}</p>
                            <blockquote style={{ fontSize: isMobile ? '13px' : '14px', fontStyle: 'italic', color: P.inkMid, lineHeight: 1.82, borderLeft: `2px solid ${P.neon}`, paddingLeft: 16, marginBottom: 12 }}> {i.quote} </blockquote>
                            <p style={{ fontSize: isMobile ? '11px' : '12px', color: P.inkFaint, ...T.mono }}>{i.quoteBy}</p>
                            <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${P.border}`, fontSize: isMobile ? '12px' : '13px', color: P.inkSoft, lineHeight: 1.78 }}> <strong style={{ color: P.ink, fontWeight: 500 }}>{i.before}</strong> {i.beforeText}<br /> <strong style={{ color: P.ink, fontWeight: 500 }}>{i.after}</strong> {i.afterText} </div>
                        </div>
                    </Fade>
                    <Fade delay={120}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px', justifyContent: 'center' }}>
                            {stats.map(([num, label]) => (
                                <div key={num} style={{ background: P.surface2, borderRadius: 12, padding: isMobile ? '18px 20px' : '22px 24px', border: `1px solid ${P.border}` }}>
                                    <div style={{ ...T.h1, fontSize: isMobile ? '2.2rem' : '2.8rem', color: P.accent, lineHeight: 1 }}>{num}</div>
                                    <div style={{ fontSize: isMobile ? '12px' : '13px', color: P.inkSoft, marginTop: 6, lineHeight: 1.5 }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </Fade>
                </div>
            </div>
        </section>
    );
}

function Pricing({ bp, i }) {
    const isMobile = bp === 'mobile';
    const features = [
        i.feature1,
        i.feature2,
        i.feature3,
        i.feature4,
        i.feature5,
        i.feature6,
        i.feature7,
        i.feature8,
    ];

    return (
        <section id="pricing" style={{ ...section, background: P.surface }}>
            <div style={container(bp)}>
                <Fade>
                    <div style={{ background: P.accentDeep, borderRadius: 14, padding: isMobile ? '18px 16px' : '24px 28px', marginBottom: 40, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? '16px' : '20px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                                <span style={{ ...T.h4, fontSize: isMobile ? '14px' : '15px', color: '#fff' }}>{i.foundingTitle}</span>
                                <span style={{ background: P.neon, color: P.accentDeep, ...T.eye, fontSize: 9, padding: '2px 8px', borderRadius: 4 }}>{i.foundingTag}</span>
                            </div>
                            <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>{i.foundingSub}</p>
                        </div>
                        <a href="#cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: P.neon, color: P.accentDeep, padding: '8px 18px', borderRadius: 8, fontSize: isMobile ? '12px' : '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer' }}> {i.foundingCta} <Icons.Arr /> </a>
                    </div>
                </Fade>
                <Fade delay={40}>
                    <span style={{ display: 'inline-block', background: P.tealSoft, color: P.accent, ...T.eye, fontSize: 10, padding: '3px 10px', borderRadius: 5, marginBottom: 14 }}>{i.pricingTag}</span>
                </Fade>
                <Fade delay={80}>
                    <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.6rem,5vw,2rem)' : 'clamp(2rem,4vw,2.8rem)', color: P.ink, marginBottom: 8 }}>{i.pricingH2}</h2>
                </Fade>
                <Fade delay={100}>
                    <p style={{ fontSize: isMobile ? '14px' : '15px', color: P.inkSoft, marginBottom: 32 }}>{i.pricingEye}</p>
                </Fade>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? '12px' : '20px', marginBottom: 20 }}>
                    {[
                        { plan: i.freePlan, price: '€0', sub: i.freeSub, tagline: i.freeTagline, cta: i.freeCta, color: 'light', featured: false },
                        { plan: i.foundingPlan, price: i.foundingPrice, sub: i.foundingDetail, get: i.foundingGet, cta: i.foundingCta, color: 'dark', featured: true },
                        { plan: i.fullPlan, price: 'Custom', sub: i.fullSub, cta: i.fullCta, color: 'light', featured: false },
                    ].map((card, idx) => (
                        <Fade key={card.plan} delay={120 + idx * 40}>
                            <div style={{ background: card.featured ? P.accentDeep : P.surface2, border: card.featured ? `2px solid ${P.neon}` : `1px solid ${P.border}`, borderRadius: 14, padding: isMobile ? '20px 18px' : '24px 22px', position: card.featured ? 'relative' : 'static', boxShadow: card.featured ? `0 0 0 4px ${P.neonSoft}` : 'none' }}>
                                {card.featured && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: P.neon, color: P.accentDeep, ...T.eye, fontSize: 9, padding: '3px 12px', borderRadius: 4 }}>{i.foundingDeal}</div>}
                                <div style={{ ...T.eye, fontSize: 10, color: card.featured ? 'rgba(255,255,255,0.55)' : P.inkSoft, marginBottom: 10, marginTop: card.featured ? 8 : 0 }}>{card.plan}</div>
                                <div style={{ ...T.h1, fontSize: isMobile ? '2rem' : '2.4rem', lineHeight: 1, color: card.featured ? '#fff' : P.ink, marginBottom: card.featured ? 2 : 3 }}>{card.price}{card.price !== 'Custom' && <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 400, color: card.featured ? 'rgba(255,255,255,0.7)' : P.inkSoft }}>/mo</span>}</div>
                                {card.get && <div style={{ fontSize: isMobile ? '12px' : '13px', color: P.neon, marginBottom: 4 }}>{card.get}</div>}
                                <div style={{ ...T.mono, fontSize: isMobile ? '11px' : '12px', color: card.featured ? 'rgba(255,255,255,0.45)' : P.inkSoft, paddingBottom: 12, borderBottom: card.featured ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${P.border}`, marginBottom: 14 }}>{card.sub}</div>
                                {card.tagline && <p style={{ fontSize: isMobile ? '12px' : '13px', color: card.featured ? 'rgba(255,255,255,0.7)' : P.inkSoft, lineHeight: 1.6, marginBottom: 16 }}>{card.tagline}</p>}
                                {features.slice(0, 4).map(f => (
                                    <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                                        <Icons.Chk color={card.featured ? P.neon : P.inkFaint} />
                                        <span style={{ fontSize: isMobile ? '12px' : '13px', color: card.featured ? 'rgba(255,255,255,0.8)' : P.inkSoft }}>{f}</span>
                                    </div>
                                ))}
                                {card.featured && features.slice(4).map(f => (
                                    <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                                        <Icons.Chk color={P.neon} />
                                        <span style={{ fontSize: isMobile ? '12px' : '13px', color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                                    </div>
                                ))}
                                <a href="#cta" style={{ display: 'block', marginTop: 16, textAlign: 'center', background: card.featured ? P.neon : P.accent, color: card.featured ? P.accentDeep : '#fff', padding: '10px 0', borderRadius: 8, fontSize: isMobile ? '12px' : '13px', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}> {card.cta} </a>
                            </div>
                        </Fade>
                    ))}
                </div>
                <p style={{ textAlign: 'center', fontSize: isMobile ? '11px' : '12px', color: P.inkFaint }}>{i.trial}</p>
            </div>
        </section>
    );
}

function CTA({ bp, i }) {
    const isMobile = bp === 'mobile';
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <section id="cta" style={{ ...section, background: P.accentDeep }}>
            <div style={{ ...container(bp), textAlign: 'center' }}>
                <Fade>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(74,248,212,0.15)', border: '1px solid rgba(74,248,212,0.3)', borderRadius: 999, padding: '4px 14px', marginBottom: 20 }}>
                        <span style={{ ...T.eye, fontSize: 9, color: P.neon }}>{i.ctaTag}</span>
                    </div>
                </Fade>
                <Fade delay={60}>
                    <h2 style={{ ...T.h2, fontSize: isMobile ? 'clamp(1.6rem,5vw,2rem)' : 'clamp(2rem,4vw,2.8rem)', color: '#fff', maxWidth: 600, margin: '0 auto 16px' }}>{i.ctaH2}</h2>
                </Fade>
                <Fade delay={140}>
                    {sent ? (
                        <p style={{ fontSize: isMobile ? '14px' : '16px', color: P.neon, marginTop: 20 }}>{i.ctaConfirm}</p>
                    ) : (
                        <form onSubmit={async e => { e.preventDefault(); setLoading(true); try { await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); } catch(_) {} setSent(true); setLoading(false); }} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row', maxWidth: 460, margin: '0 auto' }}>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={i.ctaPlaceholder} style={{ flex: 1, padding: isMobile ? '10px 14px' : '11px 16px', borderRadius: 8, border: 'none', fontSize: isMobile ? '13px' : '14px', fontFamily: "'DM Sans',sans-serif", outline: 'none', color: P.ink, boxSizing: 'border-box' }} />
                            <button type="submit" style={{ background: P.neon, color: P.accentDeep, padding: isMobile ? '10px 18px' : '11px 22px', borderRadius: 8, border: 'none', fontSize: isMobile ? '13px' : '14px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", whiteSpace: 'nowrap' }}> {i.ctaButton} </button>
                        </form>
                    )}
                </Fade>
            </div>
        </section>
    );
}

function Footer({ bp, i }) {
    const isMobile = bp === 'mobile';
    return (
        <footer style={{ background: P.accentDeep, borderTop: '1px solid rgba(255,255,255,0.07)', padding: isMobile ? '28px 0 20px' : '36px 0 28px' }}>
            <div style={{ ...container(bp), display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? '16px' : '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, background: 'rgba(255,255,255,0.12)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icons.Logo light />
                    </div>
                    <span style={{ ...T.h4, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>hostack</span>
                </div>
                <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.35)', margin: '0 0 4px' }}>{i.footerCopy}</p>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>{i.footerSub}</p>
                </div>
                <div style={{ fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.35)', textAlign: isMobile ? 'left' : 'right' }}>{i.footerAvailable}</div>
            </div>
        </footer>
    );
}

export default function App() {
    const bp = useBreakpoint();
    const [lang, setLang] = useLang();
    const i = TRANSLATIONS[lang];

    return (
        <> 
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } html { scroll-behavior: smooth; } body { font-family: 'DM Sans', sans-serif; background: ${P.surface}; color: ${P.ink}; -webkit-font-smoothing: antialiased; } ::selection { background: ${P.neonMid}; }`}</style>
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
