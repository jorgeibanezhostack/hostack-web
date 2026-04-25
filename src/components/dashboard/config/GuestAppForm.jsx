import { useState } from 'react'
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

const FIELD = { marginBottom: 14 }

function focus(e)  { e.target.style.borderColor = 'rgba(74,248,212,0.4)' }
function blur(e)   { e.target.style.borderColor = 'rgba(74,248,212,0.15)' }

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

const TIP_CATEGORIES = ['food', 'transport', 'activities', 'shopping', 'nightlife', 'other']

export default function GuestAppForm({ config, onChange }) {
  const [showPwd, setShowPwd] = useState(false)

  const set = (key, val) => onChange({ ...config, [key]: val })

  // House rules helpers
  const rules = config.rules || []
  const addRule    = ()      => set('rules', [...rules, ''])
  const updateRule = (i, v)  => set('rules', rules.map((r, j) => j === i ? v : r))
  const removeRule = (i)     => set('rules', rules.filter((_, j) => j !== i))

  // Local tips helpers
  const tips = config.local_tips || []
  const addTip    = ()         => set('local_tips', [...tips, { name: '', description: '', category: 'food' }])
  const updateTip = (i, k, v)  => set('local_tips', tips.map((t, j) => j === i ? { ...t, [k]: v } : t))
  const removeTip = (i)        => set('local_tips', tips.filter((_, j) => j !== i))

  // Review platforms helpers
  const platforms = config.review_platforms || []
  const addPlatform    = ()        => set('review_platforms', [...platforms, { name: '', url: '' }])
  const updatePlatform = (i, k, v) => set('review_platforms', platforms.map((p, j) => j === i ? { ...p, [k]: v } : p))
  const removePlatform = (i)       => set('review_platforms', platforms.filter((_, j) => j !== i))

  return (
    <div>
      {/* Basic Info */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Basic Info</div>
        <div style={FIELD}>
          <label style={LABEL}>Display name</label>
          <input style={INPUT} value={config.display_name || ''} onChange={e => set('display_name', e.target.value)} onFocus={focus} onBlur={blur} placeholder="Torridonia Hostel" />
        </div>
        <div style={FIELD}>
          <label style={LABEL}>Tagline</label>
          <input style={INPUT} value={config.tagline || ''} onChange={e => set('tagline', e.target.value)} onFocus={focus} onBlur={blur} placeholder="Your home in the Highlands" />
        </div>
        <div style={{ ...FIELD, marginBottom: 0 }}>
          <label style={LABEL}>Description</label>
          <textarea
            style={{ ...INPUT, minHeight: 80, resize: 'vertical' }}
            value={config.description || ''}
            onChange={e => set('description', e.target.value)}
            onFocus={focus}
            onBlur={blur}
            placeholder="Brief description shown to guests on check-in…"
          />
        </div>
      </div>

      {/* Operations */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Operations</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <label style={LABEL}>Check-in time</label>
            <input style={INPUT} type="time" value={config.check_in_time || '15:00'} onChange={e => set('check_in_time', e.target.value)} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={LABEL}>Check-out time</label>
            <input style={INPUT} type="time" value={config.check_out_time || '11:00'} onChange={e => set('check_out_time', e.target.value)} onFocus={focus} onBlur={blur} />
          </div>
        </div>
        <div style={{ marginBottom: 0 }}>
          <label style={LABEL}>Emergency contact</label>
          <input style={INPUT} value={config.emergency_contact || ''} onChange={e => set('emergency_contact', e.target.value)} onFocus={focus} onBlur={blur} placeholder="+44 7700 000000" />
        </div>
      </div>

      {/* Connectivity */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Connectivity</div>
        <div style={FIELD}>
          <label style={LABEL}>WiFi network name</label>
          <input style={INPUT} value={config.wifi_name || ''} onChange={e => set('wifi_name', e.target.value)} onFocus={focus} onBlur={blur} placeholder="Torridonia_Guest" />
        </div>
        <div style={{ marginBottom: 0 }}>
          <label style={LABEL}>WiFi password</label>
          <div style={{ position: 'relative' }}>
            <input
              style={{ ...INPUT, paddingRight: 70 }}
              type={showPwd ? 'text' : 'password'}
              value={config.wifi_password || ''}
              onChange={e => set('wifi_password', e.target.value)}
              onFocus={focus}
              onBlur={blur}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPwd(v => !v)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: MUTED,
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: FONTS.sans,
                padding: '2px 4px',
              }}
            >
              {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </div>

      {/* House Rules */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>House Rules</div>
        {rules.map((rule, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <input
              style={{ ...INPUT, flex: 1 }}
              value={rule}
              onChange={e => updateRule(i, e.target.value)}
              onFocus={focus}
              onBlur={blur}
              placeholder={`Rule ${i + 1}`}
            />
            <RemoveButton onClick={() => removeRule(i)} />
          </div>
        ))}
        <AddButton onClick={addRule} label="Add rule" />
      </div>

      {/* Local Tips */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Local Tips</div>
        {tips.map((tip, i) => (
          <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: MUTED }}>Tip {i + 1}</span>
              <RemoveButton onClick={() => removeTip(i)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 8, marginBottom: 8 }}>
              <div>
                <label style={LABEL}>Name</label>
                <input style={INPUT} value={tip.name} onChange={e => updateTip(i, 'name', e.target.value)} onFocus={focus} onBlur={blur} placeholder="Torridon Inn" />
              </div>
              <div>
                <label style={LABEL}>Category</label>
                <select
                  style={{ ...INPUT }}
                  value={tip.category}
                  onChange={e => updateTip(i, 'category', e.target.value)}
                  onFocus={focus}
                  onBlur={blur}
                >
                  {TIP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={LABEL}>Description</label>
              <input style={INPUT} value={tip.description} onChange={e => updateTip(i, 'description', e.target.value)} onFocus={focus} onBlur={blur} placeholder="Great food, 5 min walk" />
            </div>
          </div>
        ))}
        <AddButton onClick={addTip} label="Add tip" />
      </div>

      {/* Reviews & Feedback */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Reviews & Feedback</div>
        <div style={FIELD}>
          <label style={LABEL}>Primary review link</label>
          <input style={INPUT} type="url" value={config.review_link || ''} onChange={e => set('review_link', e.target.value)} onFocus={focus} onBlur={blur} placeholder="https://www.hostelworld.com/…" />
        </div>
        <div>
          <label style={{ ...LABEL, marginBottom: 10 }}>Review platforms</label>
          {platforms.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input
                style={{ ...INPUT, flex: '0 0 140px' }}
                value={p.name}
                onChange={e => updatePlatform(i, 'name', e.target.value)}
                onFocus={focus}
                onBlur={blur}
                placeholder="Hostelworld"
              />
              <input
                style={{ ...INPUT, flex: 1 }}
                type="url"
                value={p.url}
                onChange={e => updatePlatform(i, 'url', e.target.value)}
                onFocus={focus}
                onBlur={blur}
                placeholder="https://…"
              />
              <RemoveButton onClick={() => removePlatform(i)} />
            </div>
          ))}
          <AddButton onClick={addPlatform} label="Add platform" />
        </div>
      </div>
    </div>
  )
}
