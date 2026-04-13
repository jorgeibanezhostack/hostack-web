// ============================================================
// HOSTACK DESIGN TOKENS — Edit here to change the whole site
// ============================================================

export const COLORS = {
  // Brand
  teal:        '#004F59',   // Primary brand — headers, CTAs
  tealDark:    '#052f36',   // Deeper teal — hover states
  tealDeep:    '#031e23',   // Darkest — footer bg
  tealMid:     '#084e59',   // Mid teal — interactive elements
  turquoise:   '#00BFB3',   // Secondary accent — highlights
  neon:        '#4af8d4',   // Neon mint — CTA buttons, accents
  neonSoft:    'rgba(74,248,212,0.12)',
  neonMid:     'rgba(74,248,212,0.25)',

  // Surfaces
  surface:     '#ffffff',
  surface2:    '#f4f8f8',
  surface3:    '#e6f0f1',
  tealSoft:    '#ddf4f1',
  tealMidBg:   '#b0e8e2',

  // Ink / Text
  ink:         '#0d1f22',
  inkMid:      '#1e3a3f',
  inkSoft:     '#4a6e74',
  inkFaint:    '#7a9ea4',

  // Borders
  border:      'rgba(8,78,89,0.10)',
  borderStrong:'rgba(8,78,89,0.20)',

  // Semantic
  success:     '#10B981',
  warning:     '#F59E0B',
  error:       '#EF4444',
};

export const FONTS = {
  sans:  "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono:  "'DM Mono', 'JetBrains Mono', monospace",
};

export const TYPOGRAPHY = {
  h1:   { fontFamily: FONTS.sans, fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.08 },
  h2:   { fontFamily: FONTS.sans, fontWeight: 300, letterSpacing: '0.06em', lineHeight: 1.1 },
  h3:   { fontFamily: FONTS.sans, fontWeight: 400, letterSpacing: '0.07em' },
  h4:   { fontFamily: FONTS.sans, fontWeight: 500, letterSpacing: '0.08em' },
  eye:  { fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: FONTS.sans },
  mono: { fontFamily: FONTS.mono, letterSpacing: '0.05em' },
};

// ============================================================
// CONTENT — Edit copy here without touching components
// ============================================================
export const CONTENT = {
  // NAV
  nav: {
    logo: 'hostack',
    links: ['How it works', 'Results', 'Pricing'],
    cta: 'Join Founder Program →',
  },

  // HERO
  hero: {
    badge: '⚡ Beta · Live at Torridonia · 23 beds',
    h1a: 'The system that runs ops —',
    h1b: 'so you can build community.',
    sub: 'Hostack is the operations OS for hostels & colivings. Guest requests, staff tasks, incident reports — all connected in real time via QR. One dashboard. Set up in under 1 hour.',
    cta: 'Join the Founder Program →',
    ctaSub: 'See how it works ↓',
    stats: [
      { value: '60%', label: 'Less manager time on ops' },
      { value: '2×',  label: 'Staff tasks per shift' },
      { value: '100%', label: 'Team adoption' },
    ],
  },

  // PROBLEM
  problem: {
    eyebrow: 'The Problem',
    headline: 'You built a community. Ops is drowning it.',
    sub: 'Most hostel and coliving managers spend 6+ hours daily on chaos that should run itself.',
    pains: [
      { icon: '👥', title: 'Staff training never sticks', body: 'New volunteers repeat the same mistakes. SOPs live in a WhatsApp thread nobody reads.' },
      { icon: '🔔', title: 'Guest requests slip through', body: 'Late check-ins, room issues, noise complaints — handled reactively, never proactively.' },
      { icon: '📊', title: 'Spreadsheets don\'t scale', body: 'Rotas, incidents, inventory — scattered across tabs, DMs, and sticky notes.' },
      { icon: '🎯', title: 'No real-time visibility', body: 'You only know what\'s wrong when guests complain or staff escalate. By then, damage is done.' },
    ],
    differentiator: {
      headline: 'This Isn\'t a CRM, POS, or OTA Tool',
      body: 'Hostack is purpose-built for the unique operational reality of hostels and colivings — volunteer-heavy teams, rotating guests, community-first culture. No bloat. No irrelevant features. Just what you actually need.',
    },
  },

  // PRODUCT
  product: {
    eyebrow: 'The Product',
    headline: 'One ecosystem. Three connected apps.',
    sub: 'Guest experience, staff operations, and owner control — all talking to each other in real time.',
    phase: {
      label: 'Phase 1',
      status: 'Building in public',
      note: 'Launched at Torridonia. Expanding Q3 2025.',
    },
    apps: [
      {
        id: 'guest',
        name: 'Guest App',
        emoji: '📱',
        color: '#00BFB3',
        tagline: 'What guests see',
        features: ['Submit requests via QR', 'House rules & FAQ', 'Community board', 'Activity feed'],
      },
      {
        id: 'owner',
        name: 'Owner Dashboard',
        emoji: '🎯',
        color: '#4af8d4',
        tagline: 'Your command center',
        features: ['Real-time incident feed', 'Staff task manager', 'Analytics & trends', 'SOP library'],
        highlight: true,
      },
      {
        id: 'staff',
        name: 'Staff App',
        emoji: '⚡',
        color: '#00BFB3',
        tagline: 'What staff see',
        features: ['Daily task checklist', 'Training modules', 'Incident reports', 'Handover notes'],
      },
    ],
    roadmap: [
      { phase: 'Phase 1', status: 'now',    label: 'Core Ops Loop', note: 'Guest requests → Staff tasks → Owner visibility' },
      { phase: 'Phase 2', status: 'next',   label: 'Smart Automation', note: 'Auto-assign tasks, predictive alerts, AI summaries' },
      { phase: 'Phase 3', status: 'future', label: 'Network Effects',  note: 'Multi-property, staff marketplace, benchmarks' },
    ],
  },

  // RESULTS
  results: {
    eyebrow: 'Results',
    headline: 'Numbers from the ground.',
    sub: 'Live data from Torridonia, a 23-bed coliving in Madrid. Real ops. Real team. Real results.',
    metrics: [
      { value: '60%', label: 'Reduction in manager time on daily ops', icon: '⏱' },
      { value: '2×',  label: 'Tasks completed per volunteer shift',     icon: '⚡' },
      { value: '<1h', label: 'Full team onboarding time',               icon: '🚀' },
      { value: '100%', label: 'Team adoption rate (zero churn)',        icon: '✅' },
    ],
    quote: {
      text: '"The dashboard is the first thing I check every morning. It tells me exactly what happened overnight and what needs attention today."',
      author: 'Jorge Ibáñez',
      role: 'Founder · Torridonia Madrid',
    },
  },

  // PRICING
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Start free. Grow on your terms.',
    sub: 'No surprise fees. No lock-in. Built for operators who need results, not contracts.',
    plans: [
      {
        id: 'free',
        name: 'Free',
        price: '€0',
        period: 'forever',
        tagline: 'For operators exploring Hostack',
        features: [
          'Guest App (QR requests)',
          'Staff App (basic tasks)',
          'Owner Dashboard (read-only)',
          'Up to 2 staff accounts',
          'Community support',
        ],
        cta: 'Start Free',
        ctaStyle: 'outline',
        anchor: '#register',
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '€99',
        period: '/month',
        setup: '€300 setup fee',
        promo: '🎁 Pay 6 months → get 12. Setup fee waived.',
        tagline: 'For operators ready to reclaim their time',
        features: [
          'Everything in Free',
          'Unlimited staff accounts',
          'Full analytics dashboard',
          'SOP library & training',
          'Priority incident routing',
          'Slack/WhatsApp alerts',
          'Dedicated onboarding call',
        ],
        cta: 'Apply for Pro →',
        ctaStyle: 'primary',
        highlight: true,
        anchor: '#founding-member',
      },
      {
        id: 'custom',
        name: 'Custom',
        price: 'Talk to us',
        period: '',
        tagline: 'Multi-property or enterprise needs',
        features: [
          'Everything in Pro',
          'Multi-property management',
          'Custom integrations',
          'White-label option',
          'Dedicated account manager',
        ],
        cta: 'Book a call →',
        ctaStyle: 'outline',
        href: 'https://calendly.com/jorgebtco/cobu',
      },
    ],
  },

  // FOUNDER PROGRAM
  founder: {
    eyebrow: 'Founder Member Program',
    headline: 'Get 1 year free. Shape the product.',
    sub: 'We\'re selecting 10 founding properties to co-build Hostack with us. You get free access, direct line to the founder, and your fingerprints on the roadmap.',
    benefits: [
      { icon: '🎁', title: '1 Year Pro — Free', body: '€1,188 value. Zero cost for founding members.' },
      { icon: '🤝', title: 'Direct access to Jorge', body: 'WhatsApp line. Monthly calls. Real co-building.' },
      { icon: '🗺', title: 'Shape the roadmap', body: 'Your use case influences what we build next.' },
      { icon: '⚡', title: 'Setup fee waived', body: '€300 activation fee — completely free for you.' },
      { icon: '🏆', title: 'Founding Member badge', body: 'Recognized as an early builder of Hostack.' },
    ],
    spotsLeft: 7,
    totalSpots: 10,
    formTitle: 'Apply to be a Founding Member',
    formSub: 'Takes 3 minutes. We review all applications personally.',
  },

  // FOOTER
  footer: {
    tagline: 'Operations OS for hostels & colivings.',
    sub: 'Built in Madrid. Deployed in Europe.',
    available: 'Currently accepting Founding Members',
    links: [
      { label: 'How it works', href: '#product' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Founder Program', href: '#founding-member' },
      { label: 'Contact', href: 'mailto:jorge@hostack.io' },
    ],
    copyright: `© ${new Date().getFullYear()} Hostack. All rights reserved.`,
  },
};
