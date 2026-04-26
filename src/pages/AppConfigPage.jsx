import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { COLORS, FONTS } from '../data/tokens'
import useAppConfig from '../hooks/useAppConfig'
import GuestAppForm from '../components/dashboard/config/GuestAppForm'
import StaffAppForm from '../components/dashboard/config/StaffAppForm'
import OwnerDashForm from '../components/dashboard/config/OwnerDashForm'
import Icon from '../components/dashboard/Icon'

const BG      = '#040f11'
const SURFACE = '#071820'
const BORDER  = 'rgba(74,248,212,0.08)'
const MUTED   = '#7ab8b0'
const TEXT    = '#e8f6f5'

const APP_META = {
  guest_app:       { label: 'Guest App',       icon: 'smartphone' },
  staff_app:       { label: 'Staff App',       icon: 'zap'        },
  owner_dashboard: { label: 'Owner Dashboard', icon: 'monitor'    },
}

const FORM = {
  guest_app:       GuestAppForm,
  staff_app:       StaffAppForm,
  owner_dashboard: OwnerDashForm,
}

export default function AppConfigPage({ session, app }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [client, setClient]           = useState(null)
  const [clientLoading, setClientLoading] = useState(true)
  const [draft, setDraft]             = useState(null)
  const [toast, setToast]             = useState(null)

  const token = session?.access_token
  const initializedRef = useRef(false)

  // Resolve client from slug
  useEffect(() => {
    if (!token) return
    fetch('/api/command-center/clients', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(({ clients }) => {
        setClient(clients?.find(c => c.slug === slug) || null)
        setClientLoading(false)
      })
      .catch(() => setClientLoading(false))
  }, [token, slug])

  const { config, loading, saving, saveConfig } = useAppConfig(client?.id, app, session)

  // Initialise draft once config loads
  useEffect(() => {
    if (!loading && !initializedRef.current) {
      setDraft(config)
      initializedRef.current = true
    }
  }, [loading]) // eslint-disable-line react-hooks/exhaustive-deps

  const isDirty = draft !== null && JSON.stringify(draft) !== JSON.stringify(config)

  const handleSave = async () => {
    await saveConfig(draft)
    setToast('saved')
    setTimeout(() => setToast(null), 2500)
  }

  const meta = APP_META[app] || { label: app, icon: 'settings' }
  const FormComponent = FORM[app]

  if (clientLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.neon, animation: 'neonPulse 1.4s ease-in-out infinite' }} />
      </div>
    )
  }

  if (!client) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, fontFamily: FONTS.sans, fontSize: 14 }}>
        Client not found.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: BG, fontFamily: FONTS.sans }}>

      {/* TopBar */}
      <header style={{
        height: 52,
        backgroundColor: SURFACE,
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/command-center')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: `1px solid ${BORDER}`,
              borderRadius: 7,
              padding: '5px 10px',
              color: MUTED,
              fontFamily: FONTS.sans,
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,248,212,0.25)'; e.currentTarget.style.color = TEXT }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED }}
          >
            ← Back
          </button>

          <div style={{ width: 1, height: 20, background: BORDER }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name={meta.icon} size={14} color={COLORS.neon} />
            <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>
              {client.name}
            </span>
            <span style={{ color: MUTED, fontSize: 13 }}>—</span>
            <span style={{ fontSize: 13, color: MUTED }}>{meta.label}</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !isDirty}
          style={{
            background: isDirty ? COLORS.neon : 'rgba(74,248,212,0.08)',
            color: isDirty ? '#031e23' : 'rgba(74,248,212,0.3)',
            border: 'none',
            borderRadius: 7,
            padding: '7px 16px',
            fontFamily: FONTS.sans,
            fontSize: 13,
            fontWeight: 600,
            cursor: isDirty ? 'pointer' : 'default',
            transition: 'all 0.2s',
          }}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </header>

      {/* Success toast */}
      {toast === 'saved' && (
        <div style={{
          backgroundColor: 'rgba(16,185,129,0.12)',
          borderBottom: '1px solid rgba(16,185,129,0.25)',
          padding: '10px 20px',
          color: '#10B981',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <Icon name="checkCircle" size={14} color="#10B981" />
          Configuration saved successfully.
        </div>
      )}

      {/* Form body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {loading ? (
            <div style={{ color: MUTED, fontSize: 13 }}>Loading configuration…</div>
          ) : draft !== null && FormComponent ? (
            <FormComponent config={draft} onChange={setDraft} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
