import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import LandingLayout from './components/LandingLayout'
import LoginPage from './pages/LoginPage'
import CommandCenter from './pages/CommandCenter'
import AppConfigPage from './pages/AppConfigPage'

function ProtectedRoute({ session, loading, children }) {
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#031e23',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#4af8d4',
          boxShadow: '0 0 16px rgba(74,248,212,0.5)',
          animation: 'neonPulse 1.4s ease-in-out infinite',
        }} />
      </div>
    )
  }
  if (!session) return <Navigate to="/command-center/login" replace />
  return children
}

export default function App() {
  const { session, loading, signIn, signOut } = useAuth()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

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

        main { width: 100%; }
        section { width: 100%; }
        h1, h2, h3, h4, h5, h6 { margin: 0; line-height: 1.15; }
        p { margin: 0; }

        button {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          cursor: pointer;
        }

        a { text-decoration: none; color: inherit; }

        input, select, textarea {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        input::placeholder, textarea::placeholder { opacity: 0.5; }
        input:focus, select:focus, textarea:focus { outline: none; }

        select option {
          background: #0a2029;
          color: #e8f6f5;
        }

        .glass-card {
          background: rgba(4,78,89,0.35);
          border: 1px solid rgba(74,248,212,0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #031e23; }
        ::-webkit-scrollbar-thumb { background: #004F59; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #4af8d4; }

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

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Routes>
        <Route path="/" element={<LandingLayout />} />
        <Route
          path="/command-center/login"
          element={<LoginPage session={session} signIn={signIn} />}
        />
        <Route
          path="/command-center"
          element={
            <ProtectedRoute session={session} loading={loading}>
              <CommandCenter session={session} signOut={signOut} />
            </ProtectedRoute>
          }
        />
        {['guest-app', 'staff-app', 'owner-dashboard'].map(slug => {
          const app = slug.replace(/-/g, '_')
          return (
            <Route
              key={app}
              path={`/command-center/clients/:slug/${slug}`}
              element={
                <ProtectedRoute session={session} loading={loading}>
                  <AppConfigPage session={session} app={app} />
                </ProtectedRoute>
              }
            />
          )
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
