import { useState } from 'react'
import useBreakpoint from './hooks/useBreakpoint'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Product from './components/Product'
import Results from './components/Results'
import Pricing from './components/Pricing'
import FoundingMember from './components/FoundingMember'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'

export default function App() {
  const bp = useBreakpoint()
  const [waitlistPlan, setWaitlistPlan] = useState(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
        }

        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: #0d1f22;
          background-color: #031e23;
          line-height: 1.6;
          overflow-x: hidden;
        }

        main {
          width: 100%;
        }

        section {
          width: 100%;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          line-height: 1.15;
        }

        p {
          margin: 0;
        }

        button {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          cursor: pointer;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        input, select, textarea {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        input::placeholder,
        textarea::placeholder {
          opacity: 0.5;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
        }

        /* Global glass card effect */
        .glass-card {
          background: rgba(4,78,89,0.35);
          border: 1px solid rgba(74,248,212,0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #031e23; }
        ::-webkit-scrollbar-thumb { background: #004F59; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #4af8d4; }

        /* Global neon glow keyframe */
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,248,212,0.4); }
          50% { box-shadow: 0 0 20px 4px rgba(74,248,212,0.15); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes flowLine {
          0%   { stroke-dashoffset: 200; opacity: 0.4; }
          50%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.4; }
        }

        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Nav bp={bp} />
      <main style={{ paddingTop: 56 }}>
        <Hero bp={bp} />
        <Problem bp={bp} />
        <Product bp={bp} />
        <Results bp={bp} />
        <Pricing bp={bp} onOpenWaitlist={(plan) => setWaitlistPlan(plan)} />
        <FoundingMember bp={bp} />
      </main>
      <Footer bp={bp} />

      {waitlistPlan && (
        <WaitlistModal plan={waitlistPlan} onClose={() => setWaitlistPlan(null)} />
      )}
    </>
  )
}
