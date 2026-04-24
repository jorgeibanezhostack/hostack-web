import { COLORS, FONTS } from '../../data/tokens'
import StatusBadge from './StatusBadge'
import ServiceToggle from './ServiceToggle'
import Icon from './Icon'

const SERVICES = [
  { key: 'guest_app',       label: 'Guest App',       icon: 'smartphone' },
  { key: 'staff_app',       label: 'Staff App',       icon: 'zap'        },
  { key: 'owner_dashboard', label: 'Owner Dashboard', icon: 'monitor'    },
]

const PLAN_STYLE = {
  free:   { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' },
  pro:    { background: 'rgba(74,248,212,0.12)',  color: COLORS.neon              },
  custom: { background: 'rgba(74,140,255,0.12)',  color: '#4a8cff'               },
}

const CELL = {
  padding: '14px 16px',
  fontSize: 13,
  color: '#c8e6e4',
  borderBottom: '1px solid rgba(74,248,212,0.06)',
  verticalAlign: 'middle',
}

const HEAD = {
  ...CELL,
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(74,248,212,0.45)',
  padding: '10px 16px',
  borderBottom: '1px solid rgba(74,248,212,0.10)',
  whiteSpace: 'nowrap',
}

function SkeletonRow() {
  return (
    <tr>
      {[160, 60, 40, 90, 90, 90, 90].map((w, i) => (
        <td key={i} style={CELL}>
          <span style={{
            display: 'inline-block',
            width: w,
            height: 12,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.05)',
          }} />
        </td>
      ))}
    </tr>
  )
}

export default function ClientTable({ clients, loading, onToggleService, session }) {
  const token = session?.access_token

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: FONTS.sans,
        tableLayout: 'fixed',
        minWidth: 680,
      }}>
        <thead>
          <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
            <th style={{ ...HEAD, width: 180, textAlign: 'left' }}>Client</th>
            <th style={{ ...HEAD, width: 70,  textAlign: 'left' }}>Plan</th>
            <th style={{ ...HEAD, width: 55,  textAlign: 'left' }}>Beds</th>
            <th style={{ ...HEAD, textAlign: 'left' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="smartphone" size={12} color={COLORS.neon} style={{ opacity: 0.6 }} />
                Guest App
              </span>
            </th>
            <th style={{ ...HEAD, textAlign: 'left' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="zap" size={12} color={COLORS.neon} style={{ opacity: 0.6 }} />
                Staff App
              </span>
            </th>
            <th style={{ ...HEAD, textAlign: 'left' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="monitor" size={12} color={COLORS.neon} style={{ opacity: 0.6 }} />
                Owner Dash
              </span>
            </th>
            <th style={{ ...HEAD, width: 80, textAlign: 'left' }}>Country</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>{[0,1,2].map(i => <SkeletonRow key={i} />)}</>
          ) : clients.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ ...CELL, textAlign: 'center', color: 'rgba(74,248,212,0.3)', padding: '40px 16px' }}>
                No clients yet — add your first client to get started.
              </td>
            </tr>
          ) : (
            clients.map(client => {
              const svcMap = {}
              ;(client.service_states || []).forEach(s => { svcMap[s.service] = s })

              return (
                <tr key={client.id} style={{ transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,248,212,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Client name */}
                  <td style={CELL}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#e8f6f5' }}>{client.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(74,248,212,0.4)', marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
                      {client.property_type}
                    </div>
                  </td>

                  {/* Plan badge */}
                  <td style={CELL}>
                    <span style={{
                      ...PLAN_STYLE[client.plan] || PLAN_STYLE.free,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      padding: '2px 7px',
                      borderRadius: 20,
                    }}>
                      {client.plan}
                    </span>
                  </td>

                  {/* Beds */}
                  <td style={{ ...CELL, fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
                    {client.beds}
                  </td>

                  {/* Service columns */}
                  {SERVICES.map(({ key }) => {
                    const svc = svcMap[key] || { status: 'offline', enabled: false }
                    return (
                      <td key={key} style={CELL}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
                          <StatusBadge status={svc.status} />
                          <ServiceToggle
                            enabled={!!svc.enabled}
                            onChange={(enabled) => onToggleService(client.id, key, enabled, token)}
                          />
                        </div>
                      </td>
                    )
                  })}

                  {/* Country */}
                  <td style={{ ...CELL, fontSize: 12, color: 'rgba(200,230,228,0.6)' }}>
                    {client.country}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
