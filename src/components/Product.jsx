import { COLORS, FONTS, CONTENT } from '../data/tokens';

// SVG Icon Components
const SmartphoneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="3" width="20" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16" cy="27" r="1.5" fill="currentColor" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 22h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 22v2M18 22v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ZapIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2l8 14h-6l-2 14-8-14h6l2-14z" fill="currentColor" />
  </svg>
);

// Animated Connection Lines
const AnimatedConnections = ({ isMobile }) => {
  if (isMobile) return null;

  const keyframes = `
    @keyframes flowDash {
      0% {
        stroke-dashoffset: 20;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
    
    @keyframes flowFloat {
      0%, 100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '400px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1000 400"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill={COLORS.neon} />
          </marker>
        </defs>

        <path
          d="M 250 150 Q 375 100 500 150"
          stroke={COLORS.neon}
          strokeWidth="2"
          fill="none"
          strokeDasharray="8,4"
          style={{
            animation: 'flowDash 2s linear infinite',
          }}
          markerEnd="url(#arrowhead)"
        />
        <text
          x="375"
          y="85"
          fontSize="12"
          fill={COLORS.neon}
          textAnchor="middle"
          style={{
            animation: 'flowFloat 3s ease-in-out infinite',
          }}
        >
          requests
        </text>

        <path
          d="M 500 150 Q 625 100 750 150"
          stroke={COLORS.neon}
          strokeWidth="2"
          fill="none"
          strokeDasharray="8,4"
          style={{
            animation: 'flowDash 2s linear infinite 0.5s',
          }}
          markerEnd="url(#arrowhead)"
        />
        <text
          x="625"
          y="85"
          fontSize="12"
          fill={COLORS.neon}
          textAnchor="middle"
          style={{
            animation: 'flowFloat 3s ease-in-out infinite 0.5s',
          }}
        >
          tasks
        </text>

        <path
          d="M 750 150 Q 625 250 500 180 Q 375 210 250 150"
          stroke={COLORS.neon}
          strokeWidth="2"
          fill="none"
          strokeDasharray="8,4"
          style={{
            animation: 'flowDash 2s linear infinite 1s',
          }}
          markerEnd="url(#arrowhead)"
        />
        <text
          x="500"
          y="280"
          fontSize="12"
          fill={COLORS.neon}
          textAnchor="middle"
          style={{
            animation: 'flowFloat 3s ease-in-out infinite 1s',
          }}
        >
          updates
        </text>
      </svg>
    </>
  );
};

// App Card Component
const AppCard = ({ icon: Icon, title, description, features, isHighlighted, accentColor }) => {
  const styles = {
    card: {
      position: 'relative',
      backgroundColor: isHighlighted ? 'rgba(4, 159, 148, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: isHighlighted
        ? `2px solid ${COLORS.neon}`
        : '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '32px',
      fontFamily: FONTS.primary,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: isHighlighted
        ? `0 0 20px rgba(74, 248, 212, 0.2), inset 0 0 20px rgba(74, 248, 212, 0.05)`
        : 'none',
      transition: 'all 0.3s ease',
      zIndex: isHighlighted ? 10 : 5,
    },
    iconContainer: {
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      backgroundColor: isHighlighted
        ? 'rgba(74, 248, 212, 0.15)'
        : 'rgba(0, 191, 179, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: accentColor,
      flexShrink: 0,
    },
    title: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#ffffff',
      margin: '0',
    },
    description: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.8)',
      margin: '0',
      lineHeight: '1.5',
    },
    featuresList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    featureItem: {
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.7)',
      margin: '0',
      paddingLeft: '16px',
      position: 'relative',
    },
    featureBullet: {
      position: 'absolute',
      left: '0',
      color: accentColor,
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.iconContainer}>
        <Icon />
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      <ul style={styles.featuresList}>
        {features.map((feature, idx) => (
          <li key={idx} style={styles.featureItem}>
            <span style={styles.featureBullet}>+</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Roadmap Step Component
const RoadmapStep = ({ number, title, status, isLast, isMobile }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'now':
        return {
          backgroundColor: COLORS.neon,
          border: `2px solid ${COLORS.neon}`,
        };
      case 'next':
        return {
          backgroundColor: 'transparent',
          border: `2px solid ${COLORS.teal}`,
        };
      case 'future':
        return {
          backgroundColor: 'transparent',
          border: `2px solid rgba(0, 79, 89, 0.3)`,
        };
      default:
        return {};
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'now':
        return COLORS.deep;
      case 'next':
        return COLORS.teal;
      case 'future':
        return 'rgba(255, 255, 255, 0.4)';
      default:
        return '#ffffff';
    }
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flex: isMobile ? '1 1 100%' : '1 1 auto',
      flexDirection: isMobile ? 'column' : 'row',
      width: isMobile ? '100%' : 'auto',
    },
    circle: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '700',
      color: getStatusTextColor(),
      flexShrink: 0,
      ...getStatusStyle(),
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    label: {
      fontSize: '11px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: getStatusTextColor(),
    },
    title: {
      fontSize: '14px',
      fontWeight: '600',
      color: status === 'future' ? 'rgba(255, 255, 255, 0.5)' : '#ffffff',
      margin: '0',
    },
    connector: {
      flex: '1',
      height: isMobile ? '2px' : '2px',
      backgroundColor:
        status === 'future' ? 'rgba(0, 79, 89, 0.2)' : COLORS.teal,
      opacity: isLast ? 0 : 1,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.circle}>{number}</div>
      <div style={styles.content}>
        <div style={styles.label}>{status}</div>
        <p style={styles.title}>{title}</p>
      </div>
      {!isLast && <div style={styles.connector} />}
    </div>
  );
};

// Product Section Component
export default function Product({ bp }) {
  const isMobile = bp === 'mobile';
  const isTablet = bp === 'tablet';

  const styles = {
    section: {
      width: '100%',
      backgroundColor: COLORS.deep,
      padding: isMobile ? '48px 24px' : isTablet ? '64px 40px' : '80px 60px',
      fontFamily: FONTS.primary,
      color: '#ffffff',
      position: 'relative',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    eyebrow: {
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: COLORS.neon,
      margin: '0 0 12px 0',
    },
    headline: {
      fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
      fontWeight: '700',
      color: '#ffffff',
      lineHeight: '1.2',
      margin: '0 0 16px 0',
      maxWidth: '700px',
    },
    subheading: {
      fontSize: isMobile ? '16px' : '18px',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.6',
      margin: '0 0 48px 0',
      maxWidth: '700px',
    },
    cardsContainer: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
      gap: isMobile ? '24px' : isTablet ? '32px' : '40px',
      marginBottom: '80px',
      zIndex: 2,
    },
    roadmapSection: {
      marginTop: '80px',
      paddingTop: '60px',
      borderTop: '1px solid rgba(74, 248, 212, 0.1)',
    },
    roadmapEyebrow: {
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: COLORS.neon,
      margin: '0 0 12px 0',
    },
    roadmapHeadline: {
      fontSize: isMobile ? '28px' : isTablet ? '36px' : '40px',
      fontWeight: '700',
      color: '#ffffff',
      lineHeight: '1.2',
      margin: '0 0 48px 0',
    },
    roadmapGrid: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '32px' : '24px',
      alignItems: isMobile ? 'stretch' : 'center',
      justifyContent: 'space-between',
    },
  };

  return (
    <section id="product" style={styles.section}>
      <div style={styles.container}>
        <p style={styles.eyebrow}>{CONTENT.product.eyebrow}</p>
        <h2 style={styles.headline}>{CONTENT.product.headline}</h2>
        <p style={styles.subheading}>{CONTENT.product.sub}</p>

        <div style={styles.cardsContainer}>
          <AnimatedConnections isMobile={isMobile} />

          <AppCard
            icon={SmartphoneIcon}
            title={CONTENT.product.apps[0].title}
            description={CONTENT.product.apps[0].description}
            features={CONTENT.product.apps[0].features}
            accentColor={COLORS.teal}
          />

          <AppCard
            icon={MonitorIcon}
            title={CONTENT.product.apps[1].title}
            description={CONTENT.product.apps[1].description}
            features={CONTENT.product.apps[1].features}
            isHighlighted
            accentColor={COLORS.neon}
          />

          <AppCard
            icon={ZapIcon}
            title={CONTENT.product.apps[2].title}
            description={CONTENT.product.apps[2].description}
            features={CONTENT.product.apps[2].features}
            accentColor={COLORS.teal}
          />
        </div>

        <div style={styles.roadmapSection}>
          <p style={styles.roadmapEyebrow}>{CONTENT.roadmap.eyebrow}</p>
          <h2 style={styles.roadmapHeadline}>{CONTENT.roadmap.headline}</h2>

          <div style={styles.roadmapGrid}>
            {CONTENT.roadmap.steps.map((step, idx) => (
              <RoadmapStep
                key={idx}
                number={idx + 1}
                title={step.title}
                status={step.status}
                isLast={idx === CONTENT.roadmap.steps.length - 1}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}