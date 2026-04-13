import { COLORS, FONTS, CONTENT } from '../data/tokens';

export default function Results({ bp }) {
  const metrics = [
    {
      number: '60%',
      label: 'Less manager time on daily ops',
      icon: 'clock',
    },
    {
      number: '2×',
      label: 'Tasks completed per team shift',
      icon: 'zap',
    },
    {
      number: '<1h',
      label: 'Full team onboarding time',
      icon: 'rocket',
    },
    {
      number: '100%',
      label: 'Team adoption — nobody dropped off',
      icon: 'check-circle',
    },
  ];

  const iconSvg = (name) => {
    const iconMap = {
      clock: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke={COLORS.teal} strokeWidth="2" />
          <path d="M16 8V16L22 22" stroke={COLORS.teal} strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      zap: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 2L22 14H13L19 30L8 16H16L13 2Z"
            stroke={COLORS.teal}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      rocket: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L20 12H30L22 18L26 28L16 22L6 28L10 18L2 12H12L16 2Z" stroke={COLORS.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      'check-circle': (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke={COLORS.teal} strokeWidth="2" />
          <path d="M10 16L14 20L22 12" stroke={COLORS.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    };
    return iconMap[name] || null;
  };

  const gridColumns = bp === 'mobile' ? '1' : '2';

  return (
    <section
      id="results"
      style={{
        width: '100%',
        backgroundColor: COLORS.lightBg,
        padding: bp === 'mobile' ? '48px 20px' : '80px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: COLORS.teal,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Results
        </div>
        <h2
          style={{
            fontSize: bp === 'mobile' ? '32px' : '48px',
            fontWeight: '700',
            lineHeight: '1.2',
            color: COLORS.deep,
            marginBottom: '16px',
            fontFamily: FONTS.heading,
            letterSpacing: '-0.02em',
          }}
        >
          Real numbers. Real place. Real team.
        </h2>
        <p
          style={{
            fontSize: bp === 'mobile' ? '16px' : '18px',
            lineHeight: '1.6',
            color: COLORS.inkSoft,
            fontFamily: FONTS.body,
          }}
        >
          Live data from Torridon Estate — a B&B and cottages in the Scottish Highlands. No demos, no simulations.
        </p>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: bp === 'mobile' ? '24px' : '32px',
        }}
      >
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: COLORS.white,
              borderTop: `3px solid ${COLORS.teal}`,
              padding: '32px',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              <div
                style={{
                  fontSize: bp === 'mobile' ? '36px' : '48px',
                  fontWeight: '700',
                  color: COLORS.neon,
                  fontFamily: FONTS.heading,
                  lineHeight: '1',
                }}
              >
                {metric.number}
              </div>
              <div style={{ flexShrink: 0 }}>{iconSvg(metric.icon)}</div>
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: COLORS.inkSoft,
                fontFamily: FONTS.body,
              }}
            >
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quote Block */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
          backgroundColor: COLORS.teal,
          color: COLORS.white,
          padding: bp === 'mobile' ? '40px 24px' : '60px 48px',
          borderRadius: '12px',
          position: 'relative',
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
        }}
      >
        {/* Quote Marks */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '24px',
            opacity: '0.15',
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill={COLORS.white} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C7.58172 12 4 15.5817 4 20V32C4 36.4183 7.58172 40 12 40C16.4183 40 20 36.4183 20 32V20C20 15.5817 16.4183 12 12 12Z" />
            <path d="M36 12C31.5817 12 28 15.5817 28 20V32C28 36.4183 31.5817 40 36 40C40.4183 40 44 36.4183 44 32V20C44 15.5817 40.4183 12 36 12Z" />
          </svg>
        </div>

        <p
          style={{
            fontSize: bp === 'mobile' ? '18px' : '24px',
            fontStyle: 'italic',
            lineHeight: '1.6',
            color: COLORS.white,
            fontFamily: FONTS.body,
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          The dashboard is the first thing I check every morning. It tells me exactly what happened overnight and what needs my attention today.
        </p>

        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: FONTS.body,
            margin: 0,
          }}
        >
          — Felix, Owner · Torridon Estate, Scottish Highlands
        </p>
      </div>
    </section>
  );
}
