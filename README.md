# Hostack — Marketing Landing Page

Production landing page for [hostack.vercel.app](https://hostack.vercel.app)

## Stack
- React 19 + Vite
- No CSS framework — all styles in `src/App.jsx` via inline style objects
- DM Sans + DM Mono (Google Fonts)

## Architecture — Lego Blocks
Each section in `App.jsx` is a self-contained component:
- `Header` — sticky nav, scroll-aware
- `Hero` — animated live data flow mockup
- `Problem` — pain point grid + 70% stat
- `Solution` — 3-layer loop (Guest / Staff / Owner)
- `HowItWorks` — 6-step grid
- `Results` — Torridonia case study [TORRIDONIA-SPECIFIC]
- `Features` — capability cards
- `Pricing` — Free / Operator (Founding Member deal) / Full Service
- `CTA` — email capture
- `Footer` — links + Europe & UK availability

## Color Tokens (`C` object in App.jsx)
- `accent`: `#084e59` — primary brand
- `neon`: `#4af8d4` — active states, highlights, CTA
- All derivatives computed from these two values

## Dev
```bash
npm install
npm run dev
```

## Deploy
Connected to Vercel via GitHub. Push to `main` → auto-deploy.
