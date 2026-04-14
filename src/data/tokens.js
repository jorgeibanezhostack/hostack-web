// ============================================================
// HOSTACK DESIGN TOKENS — Edit here to change the whole site
// ============================================================

export const COLORS = {
  teal:        '#004F59',
  tealDark:    '#052f36',
  tealDeep:    '#031e23',
  tealMid:     '#084e59',
  turquoise:   '#00BFB3',
  neon:        '#4af8d4',
  neonSoft:    'rgba(74,248,212,0.12)',
  neonMid:     'rgba(74,248,212,0.25)',
  glass:       'rgba(4,78,89,0.45)',
  glassDark:   'rgba(3,30,35,0.65)',
  glassLight:  'rgba(74,248,212,0.06)',
  glassBorder: 'rgba(74,248,212,0.15)',
  surface:     '#ffffff',
  surface2:    '#f4f8f8',
  surface3:    '#e6f0f1',
  ink:         '#0d1f22',
  inkMid:      '#1e3a3f',
  inkSoft:     '#4a6e74',
  inkFaint:    '#7a9ea4',
  border:      'rgba(8,78,89,0.10)',
  borderStrong:'rgba(8,78,89,0.20)',
  success:     '#10B981',
  warning:     '#F59E0B',
  error:       '#EF4444',
};

export const FONTS = {
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'DM Mono', 'JetBrains Mono', monospace",
};

export const TYPOGRAPHY = {
  h1:  { fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.08 },
  h2:  { fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.06em', lineHeight: 1.1 },
  h3:  { fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: '0.07em' },
  h4:  { fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: '0.08em' },
  eye: { fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" },
  mono:{ fontFamily: "'DM Mono', monospace", letterSpacing: '0.05em' },
};

export const CONTENT = {

  nav: {
    links: ['How it works', 'Results', 'Pricing'],
    cta: 'Join Founder Program',
  },

  hero: {
    badge: 'Beta · Live at Torridon Estate · 23 beds',
    h1a: 'The system that runs ops —',
    h1b: 'so you can build the community you dream.',
    sub: "Hostack is the ops platform built for hostels and colivings by people who've actually run one. Guest requests, staff tasks, incidents — all connected in real time. Set up in under 1 hour.",
    cta: 'Join the Founder Program',
    ctaSub: 'See how it works',
    stats: [
      { value: '60%',  label: 'Less time on daily ops' },
      { value: '2x',   label: 'Tasks done per shift' },
      { value: '100%', label: 'Team adoption' },
    ],
  },

  problem: {
    eyebrow: 'The Problem',
    headline: 'You love the people. Ops is getting in the way.',
    sub: 'Most hostel and coliving managers spend 6+ hours daily on chaos that should just run itself. Sound familiar?',
    pains: [
      { icon: 'users', title: 'Training never sticks',        body: 'New team members repeat the same mistakes. SOPs live in a WhatsApp thread nobody reads.' },
      { icon: 'bell',  title: 'Guest requests slip through',  body: 'Late check-ins, room issues, noise — handled reactively, never proactively. Guests feel it.' },
      { icon: 'table', title: 'Spreadsheets everywhere',      body: 'Rotas, incidents, inventory — scattered across tabs, DMs, and sticky notes. No single view.' },
      { icon: 'eye',   title: 'You find out too late',        body: 'You only know something went wrong when a guest complains. By then, damage is done.' },
    ],
    differentiator: {
      headline: 'Not a CRM. Not a POS. Not an OTA.',
      body: "Hostack is built specifically for the real operational challenges of hostels and colivings — volunteer-heavy teams, rotating guests, community-first culture. No bloat, no irrelevant features. Just what you actually need, from people who get it.",
    },
  },

  product: {
    eyebrow: 'The Product',
    headline: 'Three apps. One connected ecosystem.',
    sub: 'Guest experience, staff operations, and owner insight — all talking to each other, all the time.',
    phase: {
      label: 'Early Stage',
      status: 'Building in public',
      note: 'Live at Torridon Estate, Scotland. Expanding Q3 2025.',
    },
    apps: [
      {
        id: 'guest',
        icon: 'smartphone',
        name: 'Guest App',
        color: '#00BFB3',
        tagline: "Your guest's pocket companion",
        description: 'Guests scan a QR at check-in and instantly have everything they need. Requests go directly to your team — no WhatsApp, no front desk queue.',
        features: [
          'Submit requests via QR — no app download needed',
          'House rules, FAQ, and local tips always up to date',
          'Community board for guests to connect',
          'Activity feed for events and announcements',
        ],
      },
      {
        id: 'owner',
        icon: 'monitor',
        name: 'Owner Dashboard',
        color: '#4af8d4',
        tagline: 'Your command center',
        description: 'See everything happening across your property in one place. Incidents, tasks, team performance — all real-time, all in context.',
        features: [
          'Live incident and request feed — nothing slips',
          'Staff task manager with progress tracking',
          'Analytics and trends over time',
          'SOP library to keep standards consistent',
        ],
        highlight: true,
      },
      {
        id: 'staff',
        icon: 'zap',
        name: 'Staff App',
        color: '#00BFB3',
        tagline: 'Built for your team',
        description: 'Your team starts every shift knowing exactly what to do. Tasks from guests or the owner land here automatically — clear, prioritized, trackable.',
        features: [
          'Daily task checklist — auto-filled from guest requests',
          'Training modules to onboard volunteers fast',
          'Incident reports that reach the owner instantly',
          'Handover notes so nothing is lost between shifts',
        ],
      },
    ],
    roadmap: {
      title: 'Road map',
      steps: [
        { label: 'Live at Torridonia',              status: 'now' },
        { label: 'Founding members applications',   status: 'now' },
        { label: 'Iteration, reshape',              status: 'next', badge: 'May 26' },
        { label: 'Europe Activation',               status: 'future' },
        { label: 'Global Expansion',                status: 'future' },
      ],
    },
  },

  results: {
    eyebrow: 'Results',
    headline: 'Real numbers. Real place. Real team.',
    sub: 'Live data from Torridon Estate — a B&B and cottages in the Scottish Highlands. No demos, no simulations.',
    metrics: [
      { value: '60%',  label: 'Less manager time on daily ops',      icon: 'clock' },
      { value: '2x',   label: 'Tasks completed per team shift',      icon: 'zap' },
      { value: '<1h',  label: 'Full team onboarding time',           icon: 'rocket' },
      { value: '100%', label: 'Team adoption — nobody dropped off',  icon: 'check' },
    ],
    quote: {
      text: '"The dashboard is the first thing I check every morning. It tells me exactly what happened overnight and what needs my attention today."',
      author: 'Felix',
      role: 'Owner · Torridon Estate, Scottish Highlands',
    },
  },

  pricing: {
    eyebrow: 'Pricing',
    headline: "Start free. Grow when you're ready.",
    sub: 'No surprises. No lock-in. Built for operators who care about results — not contracts.',
    plans: [
      {
        id: 'free',
        name: 'Free',
        price: '€0',
        period: 'forever',
        tagline: 'For operators who want to explore Hostack',
        features: [
          'Guest App (QR requests)',
          'Staff App (basic tasks)',
          'Owner Dashboard (manual setup)',
          'Up to 10 staff accounts',
          'Community support',
        ],
        cta: 'Join the waiting list',
        ctaStyle: 'outline',
        anchor: '#founding-member',
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '€99',
        period: '/month',
        setup: '€300 setup fee',
        promo: 'Pay 6 months, get 12. Setup fee waived.',
        tagline: 'For operators ready to run ops on autopilot',
        features: [
          'Everything in Free — automatized',
          'Up to 50 staff accounts',
          'Full analytics dashboard',
          'SOP library & training',
          'Priority incident routing',
          'Slack/WhatsApp alerts',
          'Dedicated onboarding call',
        ],
        cta: 'Join the waiting list',
        ctaSecondary: 'Apply to Founding Member Program',
        ctaStyle: 'outline',
        highlight: true,
        anchor: '#founding-member',
      },
      {
        id: 'custom',
        name: 'Custom',
        price: 'Talk to us',
        period: '',
        tagline: 'Multi-property or larger teams',
        features: [
          'Everything in Pro',
          'Multi-property management',
          'Custom integrations',
          'White-label option',
          'Dedicated account manager',
        ],
        cta: 'Book a call',
        ctaStyle: 'outline',
        href: 'https://calendly.com/jorgebtco/cobu',
      },
    ],
  },

  founder: {
    eyebrow: 'Founder Member Program',
    headline: 'Help us build it. Get a year for almost free.',
    sub: "We're selecting 5 founding properties to co-build Hostack with us. You only cover the implementation fee and get free access for a full year, a fixed rate for life, a direct line to the founder team, and your fingerprints on the roadmap.",
    benefits: [
      { icon: 'gift',   title: '1 Year Pro — Free',                body: "1,188 EUR value. Yours at zero cost once you're a founding member." },
      { icon: 'users',  title: 'Direct access to the founder team', body: 'WhatsApp line, monthly calls, real co-building — not a support ticket.' },
      { icon: 'map',    title: 'Shape the roadmap',                 body: 'Your real use cases influence what we build next. No guessing.' },
      { icon: 'wallet', title: 'Only pay the setup fee',            body: '300 EUR activation — and you get a full year of Pro services plus a fixed rate for life.' },
      { icon: 'star',   title: 'Founding Member badge',             body: 'Recognized publicly as one of the people who helped build Hostack.' },
    ],
    spotsLeft: 3,
    totalSpots: 5,
    formTitle: 'Apply to be a Founding Member',
    formSub: 'Takes 3 minutes. We review all applications personally.',
    formButtonLabel: 'Apply to Founder Member Program',
  },

  footer: {
    tagline: 'Operations OS for hostels & colivings.',
    sub: 'Made by operators, for operators.',
    available: 'Currently accepting Founding Members',
    links: [
      { label: 'How it works',    href: '#product' },
      { label: 'Results',         href: '#results' },
      { label: 'Pricing',         href: '#pricing' },
      { label: 'Founder Program', href: '#founding-member' },
      { label: 'Contact',         href: 'mailto:jorge@hostack.io' },
    ],
    copyright: `© ${new Date().getFullYear()} Hostack. All rights reserved.`,
  },
};
