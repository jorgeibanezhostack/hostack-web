import { COLORS, FONTS, CONTENT } from '../data/tokens';

// SVG Icons
const SmartphoneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="2" width="18" height="28" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    <circle cx="16" cy="26" r="1.5" fill="currentColor"/>
    <line x1="13" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MonitorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    <path d="M10 26h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 22v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="7" y="8" width="18" height="10" rx="1" fill="currentColor" opacity="0.2"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 3L7 18h9l-2 11 14-16h-9l2-10z" fill="currentColor" opacity="0.9"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ICON_MAP = { smartphone: SmartphoneIcon, monitor: MonitorIcon, zap: ZapIcon };

export default function Product({ bp }) {
  const isMobile = bp === 'mobile';
  const isTablet = bp === 'tablet';

  const sectionStyle = {
    width: '100%',
    backgroundColor: COLORS.tealDeep,
    padding: isMobile ? '64px 24px' : isTablet ? '80px 40px' : '100px 64px',
    fontFamily: FONTS.sans,
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  };

  const innerStyle = {
    maxWidth: 1160,
    margin: '0 auto',
  };

  const eyebrowStyle = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: COLORS.neon,
    marginBottom: 16,
  };

  const headlineStyle = {
    fontSize: isMobile ? 30 : isTablet ? 38 : 46,
    fontWeight: 300,
    color: '#fff',
    lineHeight: 1.12,
    marginBottom: 16,
    maxWidth: 700,
    letterSpacing: '0.04em',
  };

  const subStyle = {
    fontSize: isMobile ? 15 : 17,
    color: 'rgba(255,255,255,0.70)',
    lineHeight: 1.65,
    marginBottom: 56,
    maxWidth: 640,
  };

  const phaseBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 14px',
    backgroundColor: COLORS.neonSoft,
    border: `1px solid ${COLORS.glassBorder}`,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.neon,
    marginBottom: 40,
    letterSpacing: '0.06em',
  };

  const cardsWrapStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
    gap: isMobile ? 20 : 24,
    marginBottom: 80,
    position: 'relative',
  };

  // Roadmap
  const roadmapStyle = {
    borderTop: `1px solid rgba(74,248,212,0.12)`,
    paddingTop: 64,
    marginTop: 20,
  };

  const roadmapTitleStyle = {
    fontSize: isMobile ? 20 : 24,
    fontWeight: 600,
    color: COLORS.neon,
    marginBottom: 40,
    letterSpacing: '0.04em',
  };

  const stepsStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? 0 : 0,
    alignItems: isMobile ? 'flex-start' : 'flex-start',
    position: 'relative',
  };

  const roadmap = CONTENT.product.roadmap;

  return (
    <section id="product" style={sectionStyle}>
      {/* Subtle bg glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(74,248,212,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={innerStyle}>
        <div style={eyebrowStyle}>{CONTENT.product.eyebrow}</div>
        <h2 style={headlineStyle}>{CONTENT.product.headline}</h2>
        <p style={subStyle}>{CONTENT.product.sub}</p>

        <div style={phaseBadgeStyle}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.neon, display: 'inline-block' }}/>
          {CONTENT.product.phase.label} · {CONTENT.product.phase.status} · {CONTENT.product.phase.note}
        </div>

        {/* Wave-flow connected ecosystem visual */}
        <div style={{
          position: 'relative',
          marginBottom: 80,
          background: 'rgba(4,78,89,0.25)',
          border: '1px solid rgba(74,248,212,0.12)',
          borderRadius: 24,
          padding: isMobile ? '40px 24px' : '56px 48px',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
        }}>
          {/* Background wave SVG */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.5 }}
            viewBox="0 0 1160 320" preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 160 C200 80, 400 240, 580 160 S900 80, 1160 160" stroke="#4af8d4" strokeWidth="1.5" fill="none" opacity="0.4"/>
            <path d="M0 160 C200 100, 400 220, 580 160 S900 100, 1160 160" stroke="#4af8d4" strokeWidth="1" fill="none" opacity="0.25"/>
            <path d="M0 160 C200 120, 400 200, 580 160 S900 120, 1160 160" stroke="#4af8d4" strokeWidth="0.8" fill="none" opacity="0.15"/>
            {/* Floating glow dots */}
            <circle cx="290" cy="130" r="3" fill="#4af8d4" opacity="0.6"/>
            <circle cx="580" cy="160" r="4" fill="#4af8d4" opacity="0.8"/>
            <circle cx="870" cy="130" r="3" fill="#4af8d4" opacity="0.6"/>
          </svg>

          {/* Three app nodes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? 32 : 0,
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}>
            {CONTENT.product.apps.map((app, i) => {
              const Icon = ICON_MAP[app.icon] || SmartphoneIcon;
              const isHighlight = !!app.highlight;
              return (
                <div key={app.id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 16,
                  padding: isMobile ? 0 : '0 24px',
                  borderRight: (!isMobile && i < 2) ? '1px solid rgba(74,248,212,0.10)' : 'none',
                }}>
                  {/* Icon circle */}
                  <div style={{
                    width: isMobile ? 72 : 88,
                    height: isMobile ? 72 : 88,
                    borderRadius: '50%',
                    background: isHighlight
                      ? 'rgba(74,248,212,0.22)'
                      : 'rgba(0,191,179,0.18)',
                    border: isHighlight
                      ? '2px solid rgba(74,248,212,0.70)'
                      : '1.5px solid rgba(0,191,179,0.40)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isHighlight ? COLORS.neon : COLORS.turquoise,
                    boxShadow: isHighlight ? '0 0 28px rgba(74,248,212,0.25)' : 'none',
                    flexShrink: 0,
                  }}>
                    <Icon />
                  </div>

                  <div>
                    <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{app.name}</div>
                    <div style={{ fontSize: 12, color: isHighlight ? COLORS.neon : 'rgba(255,255,255,0.55)', fontWeight: 500, lineHeight: 1.5 }}>{app.tagline}</div>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left', width: '100%', maxWidth: 220 }}>
                    {app.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.45 }}>
                        <span style={{ color: isHighlight ? COLORS.neon : COLORS.turquoise, marginTop: 2, flexShrink: 0 }}><CheckIcon /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Roadmap */}
        <div style={roadmapStyle} id="roadmap">
          <div style={roadmapTitleStyle}>{roadmap.title}</div>
          <div style={stepsStyle}>
            {roadmap.steps.map((step, idx) => {
              const isNow = step.status === 'now';
              const isNext = step.status === 'next';
              const isLast = idx === roadmap.steps.length - 1;
              const circleColor = isNow ? COLORS.neon : isNext ? 'transparent' : 'transparent';
              const circleBorder = isNow ? COLORS.neon : isNext ? COLORS.teal : 'rgba(74,248,212,0.2)';
              const textColor = isNow ? '#fff' : isNext ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)';
              const numColor = isNow ? COLORS.tealDeep : isNext ? COLORS.teal : 'rgba(74,248,212,0.25)';

              return (
                <div key={idx} style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-start', flex: 1, flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? 12 : 0 }}>
                  {/* Step indicator + connector line */}
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', marginBottom: isMobile ? 0 : 16 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      backgroundColor: circleColor, border: `2px solid ${circleBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: numColor,
                      zIndex: 1,
                    }}>
                      {idx + 1}
                    </div>
                    {!isLast && (
                      <div style={{
                        width: isMobile ? 2 : '100%',
                        height: isMobile ? 24 : 2,
                        backgroundColor: isNow ? COLORS.neon : 'rgba(74,248,212,0.15)',
                        margin: isMobile ? '4px auto' : '0',
                        flex: isMobile ? 'none' : 1,
                        minWidth: isMobile ? undefined : 8,
                      }}/>
                    )}
                  </div>
                  <div style={{ paddingRight: isMobile ? 0 : 8, paddingBottom: isMobile ? 16 : 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: isNow ? COLORS.neon : isNext ? COLORS.turquoise : 'rgba(255,255,255,0.3)', marginBottom: 4 }}>
                      {step.status}
                    </div>
                    <div style={{ fontSize: isMobile ? 13 : 13.5, fontWeight: 500, color: textColor, lineHeight: 1.4 }}>
                      {step.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
