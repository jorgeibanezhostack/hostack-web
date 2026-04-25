import { useState } from 'react'
import { COLORS, FONTS } from '../data/tokens'
import useBreakpoint from '../hooks/useBreakpoint'
import useClients from '../hooks/useClients'
import useTasks from '../hooks/useTasks'
import ClientTable from '../components/dashboard/ClientTable'
import TaskPanel from '../components/dashboard/TaskPanel'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import Icon from '../components/dashboard/Icon'

const BG      = '#040f11'
const SURFACE = '#071820'
const BORDER  = 'rgba(74,248,212,0.08)'
const MUTED   = '#7ab8b0'
const TEXT    = '#e8f6f5'

// Hostack logo mark (reused from LoginPage)
function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#084e59"/>
      <rect x="3"  y="3"  width="12" height="12" rx="2.5" fill="#4af8d4"/>
      <rect x="17" y="3"  width="12" height="12" rx="2.5" fill="#4af8d4" opacity=".55"/>
      <rect x="3"  y="17" width="12" height="12" rx="2.5" fill="#4af8d4" opacity=".55"/>
      <rect x="17" y="17" width="12" height="12" rx="2.5" fill="#4af8d4" opacity=".25"/>
    </svg>
  )
}

function SectionHeader({ children }) {
  return (
    <div style={{
      padding: '10px 20px',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(74,248,212,0.4)',
      borderBottom: `1px solid ${BORDER}`,
    }}>
      {children}
    </div>
  )
}

export default function CommandCenter({ session, signOut }) {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'

  const { clients, loading: clientsLoading, toggleService } = useClients(session)
  const { tasks,   loading: tasksLoading,   createTask     } = useTasks(session)

  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
  }

  const email = session?.user?.email || ''
  const shortEmail = email.length > 22 ? email.slice(0, 20) + '…' : email

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: BG,
      fontFamily: FONTS.sans,
      overflow: 'hidden',
    }}>
      {/* ── TOP BAR ── */}
      <header style={{
        height: 52,
        backgroundColor: SURFACE,
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0,
        zIndex: 10,
      }}>
        {/* Left: logo + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>
              Command Center
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.neon, opacity: 0.7 }}>
              Hostack
            </div>
          </div>
          <div style={{
            marginLeft: 8,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'rgba(74,248,212,0.1)',
            color: COLORS.neon,
            border: `1px solid rgba(74,248,212,0.2)`,
            padding: '2px 8px',
            borderRadius: 20,
          }}>
            Live
          </div>
        </div>

        {/* Right: user + sign out */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="user" size={13} color={MUTED} />
            <span style={{ fontSize: 12, color: MUTED }}>{shortEmail}</span>
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
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
            <Icon name="logout" size={12} color="currentColor" />
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </header>

      {/* ── MAIN BODY ── */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        flexDirection: isMobile ? 'column' : 'row',
      }}>

        {/* ── LEFT: CLIENT TABLE ── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}>
          {/* Clients header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: `1px solid ${BORDER}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="layers" size={14} color={COLORS.neon} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>
                Clients
              </span>
              {!clientsLoading && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 7px',
                  borderRadius: 20,
                  background: 'rgba(74,248,212,0.1)',
                  color: COLORS.neon,
                }}>
                  {clients.length}
                </span>
              )}
            </div>
          </div>

          <ClientTable
            clients={clients}
            loading={clientsLoading}
            onToggleService={toggleService}
            session={session}
          />
        </div>

        {/* ── RIGHT: SIDEBAR ── */}
        <div style={{
          width: isMobile ? '100%' : 340,
          borderLeft: isMobile ? 'none' : `1px solid ${BORDER}`,
          borderTop: isMobile ? `1px solid ${BORDER}` : 'none',
          display: 'flex',
          flexDirection: 'column',
          overflowY: isMobile ? 'visible' : 'auto',
          flexShrink: 0,
          backgroundColor: SURFACE,
        }}>
          {/* Task queue */}
          <div style={{ flex: '0 0 auto' }}>
            <TaskPanel
              tasks={tasks}
              loading={tasksLoading}
              createTask={createTask}
              clients={clients}
            />
          </div>

          {/* Activity feed */}
          <div style={{ borderTop: `1px solid ${BORDER}` }}>
            <ActivityFeed session={session} />
          </div>
        </div>
      </div>
    </div>
  )
}
