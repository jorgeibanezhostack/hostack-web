import { useState } from 'react'
import { COLORS, FONTS } from '../../data/tokens'
import Icon from './Icon'

const BG   = '#071820'
const CARD = '#0a2029'
const BORDER = 'rgba(74,248,212,0.08)'
const MUTED  = '#7ab8b0'
const TEXT   = '#e8f6f5'

const TASK_STATUS_CONFIG = {
  pending:     { color: '#F59E0B', icon: 'clock'       },
  in_progress: { color: '#4a8cff', icon: 'loader'      },
  completed:   { color: COLORS.success, icon: 'checkCircle' },
  failed:      { color: COLORS.error,   icon: 'xCircle'    },
}

const PRIORITY_COLOR = {
  low:      'rgba(255,255,255,0.3)',
  medium:   '#F59E0B',
  high:     '#F97316',
  critical: COLORS.error,
}

const TYPE_COLOR = {
  fix:    { bg: 'rgba(239,68,68,0.12)',    color: '#f87171' },
  deploy: { bg: 'rgba(74,140,255,0.12)',   color: '#4a8cff' },
  config: { bg: 'rgba(245,200,66,0.12)',   color: '#f5c842' },
  review: { bg: 'rgba(178,130,255,0.12)',  color: '#b282ff' },
  other:  { bg: 'rgba(74,248,212,0.08)',   color: COLORS.neon },
}

const INPUT = {
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  padding: '9px 12px',
  fontFamily: FONTS.sans,
  fontSize: 13,
  color: TEXT,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

export default function TaskPanel({ tasks, loading, createTask, clients = [] }) {
  const [form, setForm]     = useState({ title: '', task_type: 'other', priority: 'medium', client_id: '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    setErr(null)
    try {
      await createTask({
        title:     form.title.trim(),
        task_type: form.task_type,
        priority:  form.priority,
        client_id: form.client_id || null,
      })
      setForm({ title: '', task_type: 'other', priority: 'medium', client_id: '' })
    } catch (e) {
      setErr(e.message)
    } finally {
      setSaving(false)
    }
  }

  const priorities = ['low', 'medium', 'high', 'critical']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: FONTS.sans }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="list" size={14} color={COLORS.neon} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>
          Task Queue
        </span>
        <span style={{
          marginLeft: 'auto',
          fontSize: 10,
          fontWeight: 700,
          padding: '1px 7px',
          borderRadius: 20,
          background: 'rgba(74,248,212,0.1)',
          color: COLORS.neon,
        }}>
          {tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length} active
        </span>
      </div>

      {/* New task form */}
      <form onSubmit={handleSubmit} style={{ padding: '14px 16px', borderBottom: `1px solid ${BORDER}` }}>
        <input
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="Log an action item…"
          style={{ ...INPUT, marginBottom: 8 }}
          onFocus={e => e.target.style.borderColor = COLORS.neon}
          onBlur={e  => e.target.style.borderColor = BORDER}
        />

        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <select
            value={form.task_type}
            onChange={e => set('task_type', e.target.value)}
            style={{ ...INPUT, width: '50%', cursor: 'pointer' }}
          >
            {['fix','deploy','config','review','other'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={form.client_id}
            onChange={e => set('client_id', e.target.value)}
            style={{ ...INPUT, width: '50%', cursor: 'pointer' }}
          >
            <option value="">— any client —</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Priority pills */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
          {priorities.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => set('priority', p)}
              style={{
                flex: 1,
                padding: '4px 0',
                borderRadius: 20,
                border: form.priority === p ? `1px solid ${PRIORITY_COLOR[p]}` : `1px solid ${BORDER}`,
                background: form.priority === p ? `${PRIORITY_COLOR[p]}22` : 'transparent',
                color: form.priority === p ? PRIORITY_COLOR[p] : MUTED,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {err && <div style={{ fontSize: 11, color: COLORS.error, marginBottom: 6 }}>{err}</div>}

        <button
          type="submit"
          disabled={saving || !form.title.trim()}
          style={{
            width: '100%',
            padding: '9px 0',
            borderRadius: 8,
            border: 'none',
            background: form.title.trim() ? COLORS.neon : 'rgba(74,248,212,0.15)',
            color: form.title.trim() ? '#031e23' : MUTED,
            fontFamily: FONTS.sans,
            fontSize: 13,
            fontWeight: 700,
            cursor: saving || !form.title.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Icon name="plus" size={14} color={form.title.trim() ? '#031e23' : MUTED} />
          {saving ? 'Adding…' : 'Add Task'}
        </button>
      </form>

      {/* Task list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: '20px 16px', color: MUTED, fontSize: 12, textAlign: 'center' }}>
            Loading…
          </div>
        ) : tasks.length === 0 ? (
          <div style={{ padding: '20px 16px', color: 'rgba(74,248,212,0.25)', fontSize: 12, textAlign: 'center' }}>
            No tasks yet. Log your first action item above.
          </div>
        ) : (
          tasks.map(task => {
            const statusCfg  = TASK_STATUS_CONFIG[task.status] || TASK_STATUS_CONFIG.pending
            const typeCfg    = TYPE_COLOR[task.task_type] || TYPE_COLOR.other

            return (
              <div key={task.id} style={{
                padding: '10px 16px',
                borderBottom: `1px solid ${BORDER}`,
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,248,212,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 5 }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: task.status === 'completed' ? MUTED : TEXT,
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                    lineHeight: 1.4,
                    flex: 1,
                  }}>
                    {task.title}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: statusCfg.color, flexShrink: 0 }}>
                    <Icon name={statusCfg.icon} size={12} color={statusCfg.color} />
                    <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{
                    ...typeCfg,
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '1px 7px',
                    borderRadius: 20,
                  }}>
                    {task.task_type}
                  </span>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: PRIORITY_COLOR[task.priority] || PRIORITY_COLOR.medium,
                    flexShrink: 0,
                    boxShadow: `0 0 4px ${PRIORITY_COLOR[task.priority] || PRIORITY_COLOR.medium}88`,
                  }} />
                  {task.clients?.name && (
                    <span style={{ fontSize: 10, color: 'rgba(74,248,212,0.4)', fontFamily: "'DM Mono', monospace" }}>
                      {task.clients.name}
                    </span>
                  )}
                  {task.assigned_agent && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#4a8cff' }}>
                      <Icon name="agent" size={10} color="#4a8cff" />
                      {task.assigned_agent}
                    </span>
                  )}
                </div>

                {task.result && (
                  <div style={{
                    marginTop: 6,
                    padding: '5px 8px',
                    background: 'rgba(74,248,212,0.05)',
                    borderRadius: 5,
                    fontSize: 11,
                    color: MUTED,
                    lineHeight: 1.4,
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {task.result}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
