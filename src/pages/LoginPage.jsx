import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS, FONTS } from '../data/tokens'
import Icon from '../components/dashboard/Icon'

// Hostack logo mark — matches favicon.svg
function LogoMark({ size = 28 }) {
  const r = Math.round(size * 0.22)
  const sq = Math.round(size * 0.375)
  const gap = Math.round(size * 0.53)
  const pad = Math.round(size * 0.094)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#084e59"/>
      <rect x="3"  y="3"  width="12" height="12" rx="2.5" fill="#4af8d4"/>
      <rect x="17" y="3"  width="12" height="12" rx="2.5" fill="#4af8d4" opacity=".55"/>
      <rect x="3"  y="17" width="12" height="12" rx="2.5" fill="#4af8d4" opacity=".55"/>
      <rect x="17" y="17" width="12" height="12" rx="2.5" fill="#4af8d4" opacity=".25"/>
    </svg>
  )
}

export default function LoginPage({ session, signIn }) {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  useEffect(() => {
    if (session) navigate('/command-center', { replace: true })
  }, [session, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/command-center', { replace: true })
    }
  }

  const INPUT = {
    background: 'rgba(10,32,41,0.8)',
    border: '1px solid rgba(74,248,212,0.14)',
    borderRadius: 10,
    padding: '13px 16px',
    fontFamily: FONTS.sans,
    fontSize: 14,
    color: '#e8f6f5',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: COLORS.tealDeep,
      fontFamily: FONTS.sans,
      padding: '24px',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74,248,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 380, position: 'relative' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
          <LogoMark size={32} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#e8f6f5', letterSpacing: '0.02em' }}>
            Hostack
          </span>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(7,24,32,0.9)',
          border: '1px solid rgba(74,248,212,0.12)',
          borderRadius: 16,
          padding: '32px 28px',
          backdropFilter: 'blur(16px)',
        }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: COLORS.neon,
              marginBottom: 8,
            }}>
              Command Center
            </div>
            <h1 style={{
              fontSize: 22,
              fontWeight: 600,
              color: '#e8f6f5',
              margin: 0,
              lineHeight: 1.2,
            }}>
              Sign in
            </h1>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={INPUT}
              onFocus={e => e.target.style.borderColor = COLORS.neon}
              onBlur={e  => e.target.style.borderColor = 'rgba(74,248,212,0.14)'}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={INPUT}
              onFocus={e => e.target.style.borderColor = COLORS.neon}
              onBlur={e  => e.target.style.borderColor = 'rgba(74,248,212,0.14)'}
            />

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.10)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 13,
                color: '#f87171',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                padding: '13px 0',
                borderRadius: 10,
                border: 'none',
                background: loading ? 'rgba(74,248,212,0.4)' : COLORS.neon,
                color: COLORS.tealDeep,
                fontFamily: FONTS.sans,
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(122,184,176,0.4)', marginTop: 20 }}>
          Access restricted to authorised operators
        </p>
      </div>
    </div>
  )
}
