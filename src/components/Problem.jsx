import { COLORS, FONTS, CONTENT } from '../data/tokens';

// Icon Components
const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="3" fill="currentColor" />
    <circle cx="16" cy="8" r="3" fill="currentColor" />
    <path d="M8 11c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z" fill="currentColor" />
    <path d="M16 11c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z" fill="currentColor" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2c-1.1 0-2 .9-2 2v1c-3.3 0-6 2.7-6 6v7l-2 2v1h16v-1l-2-2v-7c0-3.3-2.7-6-6-6V4c0-1.1-.9-2-2-2z" fill="currentColor" />
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" fill="currentColor" />
  </svg>
);

const TableIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5" />
    <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5" />
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
    <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

// Pain Point Card Component
const PainPointCard = ({ icon: Icon, title }) => {
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      borderLeft: `4px solid ${COLORS.teal}`,
      fontFamily: FONTS.sans,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    iconContainer: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: COLORS.teal,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      flexShrink: 0,
    },
    title: {
      fontSize: '16px',
      fontWeight: '600',
      color: COLORS.tealDeep,
      margin: '0',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.iconContainer}>
        <Icon />
      </div>
      <h3 style={styles.title}>{title}</h3>
    </div>
  );
};

// Problem Section Component
export default function Problem({ bp }) {
  const isMobile = bp === 'mobile';
  const isTablet = bp === 'tablet';

  const styles = {
    section: {
      width: '100%',
      backgroundColor: '#f4f8f8',
      padding: isMobile ? '48px 24px' : isTablet ? '64px 40px' : '80px 60px',
      fontFamily: FONTS.sans,
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
      color: COLORS.teal,
      marginBottom: '12px',
      margin: '0 0 12px 0',
    },
    headline: {
      fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
      fontWeight: '700',
      color: COLORS.tealDeep,
      lineHeight: '1.2',
      marginBottom: '16px',
      margin: '0 0 16px 0',
      maxWidth: '600px',
    },
    subheading: {
      fontSize: isMobile ? '16px' : '18px',
      color: '#666666',
      lineHeight: '1.6',
      marginBottom: '48px',
      margin: '0 0 48px 0',
      maxWidth: '700px',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '24px',
      marginBottom: '48px',
    },
    differentiatorBox: {
      backgroundColor: COLORS.tealDeep,
      color: '#ffffff',
      padding: isMobile ? '32px 24px' : isTablet ? '40px 32px' : '48px 40px',
      borderRadius: '8px',
      marginTop: '32px',
      fontFamily: FONTS.sans,
    },
    differentiatorHeadline: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '700',
      margin: '0 0 16px 0',
      lineHeight: '1.3',
    },
    differentiatorBody: {
      fontSize: '14px',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.9)',
      margin: '0',
    },
  };

  return (
    <section id="problem" style={styles.section}>
      <div style={styles.container}>
        <p style={styles.eyebrow}>{CONTENT.problem.eyebrow}</p>
        <h2 style={styles.headline}>{CONTENT.problem.headline}</h2>
        <p style={styles.subheading}>{CONTENT.problem.sub}</p>

        <div style={styles.gridContainer}>
          <PainPointCard icon={UsersIcon} title={CONTENT.problem.painPoints[0]} />
          <PainPointCard icon={BellIcon} title={CONTENT.problem.painPoints[1]} />
          <PainPointCard icon={TableIcon} title={CONTENT.problem.painPoints[2]} />
          <PainPointCard icon={EyeIcon} title={CONTENT.problem.painPoints[3]} />
        </div>

        <div style={styles.differentiatorBox}>
          <h3 style={styles.differentiatorHeadline}>
            {CONTENT.problem.differentiator.headline}
          </h3>
          <p style={styles.differentiatorBody}>
            {CONTENT.problem.differentiator.body}
          </p>
        </div>
      </div>
    </section>
  );
}