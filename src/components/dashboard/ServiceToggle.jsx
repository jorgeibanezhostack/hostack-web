import { COLORS } from '../../data/tokens'

const W = 36, H = 20, THUMB = 14

export default function ServiceToggle({ enabled, onChange, disabled }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => !disabled && onChange(!enabled)}
      title={enabled ? 'Disable service' : 'Enable service'}
      style={{
        position: 'relative',
        width: W,
        height: H,
        borderRadius: H / 2,
        backgroundColor: enabled ? COLORS.neon : 'rgba(255,255,255,0.12)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background-color 0.2s',
        padding: 0,
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: (H - THUMB) / 2,
        left: enabled ? W - THUMB - 3 : 3,
        width: THUMB,
        height: THUMB,
        borderRadius: '50%',
        backgroundColor: enabled ? COLORS.tealDeep : 'rgba(255,255,255,0.7)',
        transition: 'left 0.2s',
        display: 'block',
      }} />
    </button>
  )
}
