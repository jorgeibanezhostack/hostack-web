import { FONTS } from '../../../data/tokens'

const TEXT   = '#e8f6f5'
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

function focus(e) { e.target.style.borderColor = 'rgba(74,248,212,0.4)' }
function blur(e)  { e.target.style.borderColor = 'rgba(74,248,212,0.15)' }

export default function OwnerDashForm({ config, onChange }) {
  const set = (key, val) => onChange({ ...config, [key]: val })

  return (
    <div>
      {/* Notifications */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Notifications</div>
        <div style={FIELD}>
          <label style={LABEL}>Alert email</label>
          <input
            style={INPUT}
            type="email"
            value={config.alert_email || ''}
            onChange={e => set('alert_email', e.target.value)}
            onFocus={focus}
            onBlur={blur}
            placeholder="owner@example.com"
          />
        </div>
        <div style={{ marginBottom: 0 }}>
          <label style={LABEL}>Report frequency</label>
          <select
            style={INPUT}
            value={config.report_frequency || 'weekly'}
            onChange={e => set('report_frequency', e.target.value)}
            onFocus={focus}
            onBlur={blur}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Performance Targets */}
      <div style={SECTION}>
        <div style={SECTION_TITLE}>Performance Targets</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={LABEL}>Occupancy target (%)</label>
            <input
              style={INPUT}
              type="number"
              min="0"
              max="100"
              value={config.occupancy_target ?? 80}
              onChange={e => set('occupancy_target', parseInt(e.target.value, 10))}
              onFocus={focus}
              onBlur={blur}
            />
          </div>
          <div>
            <label style={LABEL}>Revenue currency</label>
            <select
              style={INPUT}
              value={config.revenue_currency || 'GBP'}
              onChange={e => set('revenue_currency', e.target.value)}
              onFocus={focus}
              onBlur={blur}
            >
              <option value="GBP">GBP — British Pound</option>
              <option value="EUR">EUR — Euro</option>
              <option value="USD">USD — US Dollar</option>
              <option value="CHF">CHF — Swiss Franc</option>
              <option value="SEK">SEK — Swedish Krona</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
