import { FONTS } from '../../../data/tokens'

const NEON   = '#4af8d4'
const TEXT   = '#e8f6f5'
const MUTED  = '#7ab8b0'
const CARD   = '#0a2029'
const BORDER = 'rgba(74,248,212,0.08)'

const INPUT = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(74,248,212,0.15)',
  borderRadius: 8,
  padding: '9px 12px',
  color: TEXT,
  fontSize: 13,
  fontFamily: FONTS.sans,
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
}

const LABEL = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: 'rgba(200,230,228,0.7)',
  marginBottom: 6,
  letterSpacing: '0.03em',
}

const SECTION = {
  backgroundColor: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
}

const SECTION_TITLE = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(74,248,212,0.5)',
  marginBottom: 16,
  paddingBottom: 8,
  borderBottom: `1px solid ${BORDER}`,
}

function focus(e) { e.target.style.borderColor = 'rgba(74,248,212,0.4)' }
function blur(e)  { e.target.style.borderColor = 'rgba(74,248,212,0.15)' }

function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        padding: '8px 12px',
        background: 'none',
        border: '1px dashed rgba(74,248,212,0.2)',
        borderRadius: 7,
        color: 'rgba(74,248,212,0.5)',
        fontSize: 12,
        cursor: 'pointer',
        fontFamily: FONTS.sans,
        marginTop: 8,
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(74,248,212,0.5)'; e.currentTarget.style.color = NEON }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,248,212,0.2)'; e.currentTarget.style.color = 'rgba(74,248,212,0.5)' }}
    >
      + {label}
    </button>
  )
}

function RemoveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flexShrink: 0,
        background: 'none',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 6,
        padding: '4px 8px',
        color: 'rgba(239,68,68,0.5)',
        fontSize: 11,
        cursor: 'pointer',
        fontFamily: FONTS.sans,
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.6)'; e.currentTarget.style.color = '#EF4444' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = 'rgba(239,68,68,0.5)' }}
    >
      ×
    </button>
  )
}

function ChecklistSection({ title, items, onChange }) {
  const add    = ()      => onChange([...items, ''])
  const update = (i, v)  => onChange(items.map((x, j) => j === i ? v : x))
  const remove = (i)     => onChange(items.filter((_, j) => j !== i))

  return (
    <div style={SECTION}>
      <div style={SECTION_TITLE}>{title}</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: MUTED, width: 20, textAlign: 'right', flexShrink: 0 }}>{i + 1}.</span>
          <input
            style={{ ...INPUT, flex: 1 }}
            value={item}
            onChange={e => update(i, e.target.value)}
            onFocus={focus}
            onBlur={blur}
            placeholder={`Step ${i + 1}`}
          />
          <RemoveButton onClick={() => remove(i)} />
        </div>
      ))}
      <AddButton onClick={add} label="Add step" />
    </div>
  )
}

export default function StaffAppForm({ config, onChange }) {
  const set = (key, val) => onChange({ ...config, [key]: val })

  const contacts = config.team_contacts || []
  const addContact    = ()        => set('team_contacts', [...contacts, { name: '', role: '', phone: '' }])
  const updateContact = (i, k, v) => set('team_contacts', contacts.map((c, j) => j === i ? { ...c, [k]: v } : c))
  const removeContact = (i)       => set('team_contacts', contacts.filter((_, j) => j !== i))

  return (
    <div>
      <ChecklistSection
        title="Check-in Checklist"
        items={config.checkin_checklist || []}
        onChange={v => set('checkin_checklist', v)}
      />
      <ChecklistSection
        title="Check-out Checklist"
        items={config.checkout_checklist || []}
        onChange={v => set('checkout_checklist', v)}
      />
      <ChecklistSection
        title="Cleaning Checklist"
        items={config.cleaning_checklist || []}
        onChange={v => set('cleaning_checklist', v)}
      />

      {/* Team Contacts */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Team Contacts</div>
        {contacts.map((contact, i) => (
          <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: MUTED }}>Contact {i + 1}</span>
              <RemoveButton onClick={() => removeContact(i)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div>
                <label style={LABEL}>Name</label>
                <input style={INPUT} value={contact.name} onChange={e => updateContact(i, 'name', e.target.value)} onFocus={focus} onBlur={blur} placeholder="Jane Smith" />
              </div>
              <div>
                <label style={LABEL}>Role</label>
                <input style={INPUT} value={contact.role} onChange={e => updateContact(i, 'role', e.target.value)} onFocus={focus} onBlur={blur} placeholder="Manager" />
              </div>
              <div>
                <label style={LABEL}>Phone</label>
                <input style={INPUT} type="tel" value={contact.phone} onChange={e => updateContact(i, 'phone', e.target.value)} onFocus={focus} onBlur={blur} placeholder="+44 7700 000000" />
              </div>
            </div>
          </div>
        ))}
        <AddButton onClick={addContact} label="Add contact" />
      </div>
    </div>
  )
}
