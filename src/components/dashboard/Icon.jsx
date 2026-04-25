// Stroke-based brand icons — rounded linecap/linejoin, 1.5px stroke
// Matches the style of existing icons.svg (documentation-icon, social-icon)

const DEFAULTS = {
  width: 16,
  height: 16,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icons = {
  // User silhouette
  user: (
    <>
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M2 16c0-3.314 2.686-6 6-6s6 2.686 6 6" />
    </>
  ),

  // Agent — 4-square grid matching the Hostack favicon motif
  agent: (
    <>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" opacity=".6" />
      <rect x="2" y="9" width="5" height="5" rx="1" opacity=".6" />
      <rect x="9" y="9" width="5" height="5" rx="1" opacity=".3" />
    </>
  ),

  // Sign out — arrow leaving a door
  logout: (
    <>
      <path d="M10 3H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4" />
      <path d="M13 8H7m0 0 2-2m-2 2 2 2" />
      <path d="M13 8h2" />
      <path d="M15 5l3 3-3 3" />
    </>
  ),

  // Plus
  plus: (
    <>
      <path d="M8 3v10M3 8h10" />
    </>
  ),

  // Check circle — completed
  checkCircle: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="m5.5 8 1.5 1.5L10.5 6" />
    </>
  ),

  // Clock — pending
  clock: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3.5l2 2" />
    </>
  ),

  // Loader / spinner — in progress
  loader: (
    <>
      <circle cx="8" cy="8" r="5.5" strokeDasharray="8 6" />
      <path d="M8 2.5V4" />
    </>
  ),

  // X circle — failed
  xCircle: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="m5.5 5.5 5 5M10.5 5.5l-5 5" />
    </>
  ),

  // Smartphone — Guest App
  smartphone: (
    <>
      <rect x="4" y="1" width="8" height="14" rx="2" />
      <path d="M8 12.5h.01" strokeWidth="2" />
    </>
  ),

  // Zap — Staff App
  zap: (
    <>
      <path d="M9.5 2 4 9h4l-1.5 5L13 7H9L9.5 2Z" />
    </>
  ),

  // Monitor — Owner Dashboard
  monitor: (
    <>
      <rect x="2" y="3" width="12" height="9" rx="1.5" />
      <path d="M5 15h6M8 12v3" />
    </>
  ),

  // Activity — feed header
  activity: (
    <>
      <path d="M2 8h2.5l1.5-5 2.5 10L10.5 5 12 8H14" />
    </>
  ),

  // List — task panel header
  list: (
    <>
      <path d="M4 5h8M4 8h8M4 11h5" />
    </>
  ),

  // Alert triangle — maintenance
  alert: (
    <>
      <path d="M8 3 1.5 13.5h13L8 3Z" />
      <path d="M8 7.5v2.5M8 11.5v.5" strokeWidth="1.8" />
    </>
  ),

  // Layers / property
  layers: (
    <>
      <path d="M2 10.5 8 14l6-3.5M2 7 8 10.5 14 7M8 2 2 5.5l6 3.5 6-3.5L8 2Z" />
    </>
  ),

  // Settings / cog
  settings: (
    <>
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M11.8 4.2l1.1-1.1M3.1 12.9l1.1-1.1" />
    </>
  ),

  // Refresh
  refresh: (
    <>
      <path d="M12.5 4.5A6 6 0 1 0 14 8" />
      <path d="M14 4.5V8h-3.5" />
    </>
  ),
}

export default function Icon({ name, size = 16, color = 'currentColor', style = {} }) {
  const paths = icons[name]
  if (!paths) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={DEFAULTS.fill}
      stroke={color}
      strokeWidth={DEFAULTS.strokeWidth}
      strokeLinecap={DEFAULTS.strokeLinecap}
      strokeLinejoin={DEFAULTS.strokeLinejoin}
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {paths}
    </svg>
  )
}
