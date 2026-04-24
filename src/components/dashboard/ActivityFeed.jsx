import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { COLORS, FONTS } from '../../data/tokens'
import Icon from './Icon'

const BORDER = 'rgba(74,248,212,0.08)'
const MUTED  = '#7ab8b0'
const TEXT   = '#e8f6f5'

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60)  return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60)  return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24)  return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export default function ActivityFeed({ session }) {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)

  const token = session?.access_token

  useEffect(() => {
    if (!token) return

    fetch('/api/command-center/activity?limit=30', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => setItems(data.activity || []))
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => {
    const channel = supabase
      .channel('command-center:activity_log')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' },
        (payload) => setItems(prev => [payload.new, ...prev].slice(0, 50))
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: FONTS.sans }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="activity" size={14} color={COLORS.neon} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>
          Activity
        </span>
      </div>

      {/* Feed */}
      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: '16px', color: MUTED, fontSize: 12, textAlign: 'center' }}>Loading…</div>
        ) : items.length === 0 ? (
          <div style={{ padding: '16px', color: 'rgba(74,248,212,0.25)', fontSize: 12, textAlign: 'center' }}>
            No activity yet.
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              gap: 10,
              padding: '9px 16px',
              borderBottom: `1px solid ${BORDER}`,
              transition: 'background 0.1s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,248,212,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: item.actor === 'agent'
                  ? 'rgba(74,140,255,0.15)'
                  : 'rgba(74,248,212,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}>
                <Icon
                  name={item.actor === 'agent' ? 'agent' : 'user'}
                  size={12}
                  color={item.actor === 'agent' ? '#4a8cff' : COLORS.neon}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, color: TEXT, lineHeight: 1.45, marginBottom: 2 }}>
                  {item.action}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {item.clients?.name && (
                    <span style={{ fontSize: 10, color: COLORS.neon, opacity: 0.6, fontFamily: "'DM Mono', monospace" }}>
                      {item.clients.name}
                    </span>
                  )}
                  <span style={{ fontSize: 10, color: 'rgba(122,184,176,0.5)', fontFamily: "'DM Mono', monospace" }}>
                    {timeAgo(item.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
