import { COLORS } from '../../data/tokens'
import Icon from './Icon'

const STATUS = {
  online:      { color: COLORS.success, label: 'Online',      icon: 'checkCircle' },
  offline:     { color: COLORS.error,   label: 'Offline',     icon: 'xCircle'     },
  maintenance: { color: COLORS.warning, label: 'Maintenance', icon: 'alert'        },
}

export default function StatusBadge({ status, showLabel = true }) {
  const cfg = STATUS[status] || STATUS.offline

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 11,
      fontWeight: 500,
      color: cfg.color,
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 7,
        height: 7,
        borderRadius: '50%',
        backgroundColor: cfg.color,
        flexShrink: 0,
        boxShadow: `0 0 6px ${cfg.color}66`,
      }} />
      {showLabel && cfg.label}
    </span>
  )
}
