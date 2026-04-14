import { COLORS, FONTS, CONTENT } from '../data/tokens';

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.5 6.5l3.5 3.5L11.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── PHONE FRAME (Guest App) ─────────────────────────────────────────────── */
const GuestPhone = () => (
  <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 160, flexShrink: 0, filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.55)) drop-shadow(0 0 24px rgba(74,248,212,0.08))' }}>
    {/* Outer chassis */}
    <rect x="2" y="2" width="196" height="396" rx="32" fill="#0a2228" stroke="#1a4a54" strokeWidth="2"/>
    {/* Screen bezel */}
    <rect x="8" y="8" width="184" height="384" rx="26" fill="#061b21"/>
    {/* Dynamic island */}
    <rect x="74" y="16" width="52" height="16" rx="8" fill="#0a2228"/>
    {/* Status bar */}
    <text x="22" y="40" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="-apple-system, sans-serif">9:41</text>
    <g transform="translate(158,28)">
      <rect width="18" height="9" rx="2" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
      <rect x="18" y="2" width="2" height="5" rx="1" fill="rgba(255,255,255,0.35)"/>
      <rect x="1" y="1" width="14" height="7" rx="1.5" fill="rgba(74,248,212,0.8)"/>
    </g>

    {/* App header */}
    <rect x="8" y="54" width="184" height="36" fill="rgba(4,78,89,0.7)"/>
    <circle cx="32" cy="72" r="10" fill="rgba(74,248,212,0.15)" stroke="rgba(74,248,212,0.3)" strokeWidth="1"/>
    <path d="M28 72l3.5 3.5L37 67" stroke="#4af8d4" strokeWidth="1.4" strokeLinecap="round"/>
    <text x="50" y="76" fill="rgba(255,255,255,0.92)" fontSize="11" fontFamily="-apple-system,sans-serif" fontWeight="600">Guest App</text>
    <circle cx="170" cy="72" r="9" fill="rgba(74,248,212,0.15)"/>
    <text x="170" y="76" fill="#4af8d4" fontSize="10" fontFamily="sans-serif" textAnchor="middle">⋯</text>

    {/* Check-in hero card */}
    <rect x="16" y="98" width="168" height="90" rx="14" fill="rgba(4,78,89,0.6)" stroke="rgba(74,248,212,0.2)" strokeWidth="1"/>
    <circle cx="100" cy="128" r="20" fill="rgba(74,248,212,0.12)" stroke="rgba(74,248,212,0.25)" strokeWidth="1.5"/>
    {/* Avatar icon */}
    <circle cx="100" cy="122" r="9" fill="rgba(74,248,212,0.3)"/>
    <path d="M82 144 Q100 136 118 144" fill="rgba(74,248,212,0.15)" stroke="none"/>
    <text x="100" y="158" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="-apple-system,sans-serif" fontWeight="700" textAnchor="middle">Check in</text>
    <text x="100" y="174" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="-apple-system,sans-serif" textAnchor="middle">Room 4 · 3 nights · Bed 2</text>

    {/* Confirmation card */}
    <rect x="16" y="198" width="168" height="72" rx="12" fill="rgba(3,18,22,0.8)" stroke="rgba(74,248,212,0.18)" strokeWidth="1"/>
    <circle cx="36" cy="220" r="11" fill="rgba(74,248,212,0.18)" stroke="#4af8d4" strokeWidth="1.2"/>
    <path d="M31 220l3.5 3.5L42 214" stroke="#4af8d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="54" y="216" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontFamily="-apple-system,sans-serif" fontWeight="700">Booking confirmed</text>
    <text x="54" y="230" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="-apple-system,sans-serif">Check-out Apr 16 · €120/night</text>
    <rect x="24" y="240" width="152" height="22" rx="7" fill="rgba(74,248,212,0.1)" stroke="rgba(74,248,212,0.2)" strokeWidth="1"/>
    <text x="100" y="255" fill="#4af8d4" fontSize="8.5" fontFamily="-apple-system,sans-serif" textAnchor="middle" fontWeight="600">View reservation →</text>

    {/* QR request row */}
    <text x="22" y="292" fill="rgba(255,255,255,0.5)" fontSize="8.5" fontFamily="-apple-system,sans-serif" fontWeight="600">QUICK REQUESTS</text>
    {[
      {x:16, label:'🧺 Towels'},
      {x:72, label:'☕ Coffee'},
      {x:128, label:'🔑 Key'},
    ].map((item, i) => (
      <g key={i}>
        <rect x={item.x} y="298" width="54" height="38" rx="9" fill="rgba(4,78,89,0.6)" stroke="rgba(74,248,212,0.15)" strokeWidth="1"/>
        <text x={item.x+27} y="324" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="-apple-system,sans-serif" textAnchor="middle">{item.label}</text>
      </g>
    ))}

    {/* Primary CTA */}
    <rect x="16" y="346" width="168" height="32" rx="10" fill="#4af8d4"/>
    <text x="100" y="367" fill="#031e23" fontSize="11" fontFamily="-apple-system,sans-serif" textAnchor="middle" fontWeight="700">Continue</text>

    {/* Home bar */}
    <rect x="72" y="386" width="56" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
  </svg>
);

/* ─── LAPTOP FRAME (Owner Dashboard) ─────────────────────────────────────── */
const OwnerLaptop = () => (
  <svg viewBox="0 0 520 340" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 500, filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.65)) drop-shadow(0 0 40px rgba(74,248,212,0.10))' }}>
    {/* Laptop lid/screen */}
    <rect x="20" y="4" width="480" height="300" rx="10" fill="#0a2228" stroke="rgba(74,248,212,0.3)" strokeWidth="1.5"/>
    <rect x="26" y="10" width="468" height="288" rx="7" fill="#061b21"/>
    {/* Camera dot */}
    <circle cx="260" cy="7" r="3" fill="#1a4a54"/>

    {/* ── Dashboard UI ── */}
    {/* Top navigation bar */}
    <rect x="26" y="10" width="468" height="30" rx="7" fill="rgba(4,78,89,0.9)"/>
    <rect x="26" y="30" width="468" height="10" fill="rgba(4,78,89,0.9)"/>
    {/* Logo */}
    <rect x="34" y="17" width="12" height="12" rx="3" fill="#4af8d4" opacity="0.9"/>
    <rect x="37" y="20" width="6" height="3" rx="1" fill="#031e23" opacity="0.7"/>
    <rect x="37" y="24" width="6" height="3" rx="1" fill="#031e23" opacity="0.4"/>
    <text x="52" y="28" fill="rgba(255,255,255,0.9)" fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="700">hostack</text>
    {/* Nav links */}
    {['Dashboard','Tasks','Reports','Settings'].map((item, i) => (
      <text key={i} x={110 + i * 72} y="28" fill={i===0 ? '#4af8d4' : 'rgba(255,255,255,0.45)'} fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight={i===0 ? '600' : '400'}>{item}</text>
    ))}
    {/* User avatar */}
    <circle cx="471" cy="25" r="9" fill="rgba(74,248,212,0.2)" stroke="rgba(74,248,212,0.4)" strokeWidth="1"/>
    <text x="471" y="29" fill="#4af8d4" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="700">F</text>

    {/* Sidebar */}
    <rect x="26" y="40" width="52" height="258" fill="rgba(3,14,18,0.8)"/>
    {[
      {icon:'▣', label:'Board', active:true},
      {icon:'⚡', label:'Tasks', active:false},
      {icon:'◎', label:'Guests', active:false},
      {icon:'≡', label:'SOPs', active:false},
      {icon:'↗', label:'Reports', active:false},
    ].map((item, i) => (
      <g key={i}>
        <rect x="29" y={48 + i*44} width="46" height="36" rx="7" fill={item.active ? 'rgba(74,248,212,0.15)' : 'transparent'} stroke={item.active ? 'rgba(74,248,212,0.3)' : 'none'}/>
        <text x="52" y={62 + i*44} fill={item.active ? '#4af8d4' : 'rgba(255,255,255,0.3)'} fontSize="12" fontFamily="sans-serif" textAnchor="middle">{item.icon}</text>
        <text x="52" y={75 + i*44} fill={item.active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'} fontSize="6" fontFamily="-apple-system,sans-serif" textAnchor="middle">{item.label}</text>
      </g>
    ))}

    {/* Main content area */}
    {/* Page heading */}
    <text x="92" y="58" fill="rgba(255,255,255,0.92)" fontSize="13" fontFamily="-apple-system,sans-serif" fontWeight="700">Dashboard</text>
    <text x="92" y="70" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="-apple-system,sans-serif">Monday, April 13 · Torridon Estate</text>

    {/* KPI Cards */}
    {[
      {label:'Revenue MTD', value:'€12.4k', delta:'↑ +18%', color:'#4af8d4'},
      {label:'Occupancy', value:'87%', delta:'↑ +6pt', color:'#4af8d4'},
      {label:'Open Tasks', value:'3', delta:'2 high pri', color:'#f59e0b'},
      {label:'Team Adoption', value:'100%', delta:'All active', color:'#10b981'},
    ].map((kpi, i) => (
      <g key={i}>
        <rect x={92 + i*103} y="78" width="97" height="52" rx="8" fill="rgba(4,78,89,0.55)" stroke="rgba(74,248,212,0.12)" strokeWidth="1"/>
        <text x={102 + i*103} y="93" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="-apple-system,sans-serif">{kpi.label}</text>
        <text x={102 + i*103} y="112" fill={kpi.color} fontSize="16" fontFamily="-apple-system,sans-serif" fontWeight="700">{kpi.value}</text>
        <text x={102 + i*103} y="124" fill="rgba(255,255,255,0.45)" fontSize="6.5" fontFamily="-apple-system,sans-serif">{kpi.delta}</text>
      </g>
    ))}

    {/* Revenue chart */}
    <rect x="92" y="140" width="260" height="110" rx="9" fill="rgba(4,78,89,0.4)" stroke="rgba(74,248,212,0.1)" strokeWidth="1"/>
    <text x="104" y="156" fill="rgba(255,255,255,0.65)" fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight="600">Revenue — last 30 days</text>
    {/* Grid lines */}
    {[0,1,2,3].map(i => (
      <line key={i} x1="104" y1={167+i*19} x2="340" y2={167+i*19} stroke="rgba(74,248,212,0.06)" strokeWidth="0.5"/>
    ))}
    {/* Y axis labels */}
    {['4k','3k','2k','1k'].map((l,i) => (
      <text key={i} x="100" y={169+i*19} fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="mono" textAnchor="end">{l}</text>
    ))}
    {/* Area fill */}
    <polygon points="108,238 108,218 140,208 172,214 204,196 236,186 268,178 300,168 332,160 332,238"
      fill="url(#chartGrad)"/>
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4af8d4" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="#4af8d4" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Chart line */}
    <polyline points="108,218 140,208 172,214 204,196 236,186 268,178 300,168 332,160"
      stroke="#4af8d4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Highlight dot */}
    <circle cx="332" cy="160" r="3.5" fill="#4af8d4"/>
    <circle cx="332" cy="160" r="6" fill="rgba(74,248,212,0.2)"/>
    {/* Tooltip */}
    <rect x="316" y="143" width="44" height="14" rx="4" fill="#4af8d4"/>
    <text x="338" y="153" fill="#031e23" fontSize="7" fontFamily="mono" textAnchor="middle" fontWeight="700">€1,289</text>
    {/* X labels */}
    {['Apr 1','Apr 8','Apr 15','Apr 22','Apr 30'].map((l,i) => (
      <text key={i} x={108+i*56} y="248" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="-apple-system,sans-serif" textAnchor="middle">{l}</text>
    ))}

    {/* Task panel */}
    <rect x="362" y="140" width="126" height="110" rx="9" fill="rgba(4,78,89,0.4)" stroke="rgba(74,248,212,0.1)" strokeWidth="1"/>
    <text x="374" y="156" fill="rgba(255,255,255,0.65)" fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight="600">Live Tasks</text>
    <rect x="418" y="146" width="16" height="10" rx="4" fill="rgba(74,248,212,0.2)"/>
    <text x="426" y="154" fill="#4af8d4" fontSize="7" fontFamily="-apple-system,sans-serif" textAnchor="middle">3</text>
    {[
      {t:'Room 12 – Towels', p:'HIGH', done:false},
      {t:'Wi-Fi lobby', p:'HIGH', done:false},
      {t:'Check-in room 4', p:'MED', done:true},
      {t:'Handover notes', p:'LOW', done:true},
    ].map((task, i) => {
      const pColor = task.p==='HIGH' ? '#ef4444' : task.p==='MED' ? '#f59e0b' : '#4af8d4';
      return (
        <g key={i}>
          <rect x="370" y={163+i*21} width="114" height="17" rx="5"
            fill={task.done ? 'rgba(4,78,89,0.25)' : 'rgba(4,78,89,0.55)'}
            stroke="rgba(74,248,212,0.08)" strokeWidth="0.5"/>
          <circle cx="378" cy={171.5+i*21} r="3.5"
            fill={task.done ? 'rgba(74,248,212,0.2)' : 'rgba(255,255,255,0.05)'}
            stroke={task.done ? '#4af8d4' : 'rgba(255,255,255,0.2)'} strokeWidth="0.8"/>
          {task.done && <path d={`M376 ${171.5+i*21}l1.5 1.5 2.5-2.5`} stroke="#4af8d4" strokeWidth="0.8" strokeLinecap="round"/>}
          <text x="386" y={174+i*21} fill={task.done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.78)'} fontSize="6.5" fontFamily="-apple-system,sans-serif">{task.t}</text>
          <rect x="448" y={165+i*21} width="14" height="9" rx="3" fill={`${pColor}22`}/>
          <text x="455" y={172+i*21} fill={pColor} fontSize="5.5" fontFamily="-apple-system,sans-serif" textAnchor="middle" fontWeight="700">{task.p}</text>
        </g>
      );
    })}

    {/* Incident feed bottom panel */}
    <rect x="92" y="260" width="396" height="34" rx="8" fill="rgba(3,14,18,0.7)" stroke="rgba(74,248,212,0.08)" strokeWidth="1"/>
    <circle cx="108" cy="277" r="5" fill="rgba(74,248,212,0.2)"/>
    <circle cx="108" cy="277" r="3" fill="#4af8d4"/>
    <text x="120" y="273" fill="rgba(255,255,255,0.6)" fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="600">LIVE FEED</text>
    <text x="120" y="284" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="-apple-system,sans-serif">9:38 – Felix checked in · Room 4 confirmed ·  Guest request: extra pillow (Room 6)</text>

    {/* Laptop base */}
    <rect x="0" y="304" width="520" height="20" rx="4" fill="#0a2228" stroke="rgba(74,248,212,0.15)" strokeWidth="1"/>
    <rect x="180" y="306" width="160" height="8" rx="4" fill="#061b21"/>
    <rect x="0" y="320" width="520" height="6" rx="3" fill="#0d2f38"/>
  </svg>
);

/* ─── PHONE FRAME (Staff App) ─────────────────────────────────────────────── */
const StaffPhone = () => (
  <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 160, flexShrink: 0, filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.55)) drop-shadow(0 0 24px rgba(74,248,212,0.08))' }}>
    <rect x="2" y="2" width="196" height="396" rx="32" fill="#0a2228" stroke="#1a4a54" strokeWidth="2"/>
    <rect x="8" y="8" width="184" height="384" rx="26" fill="#061b21"/>
    <rect x="74" y="16" width="52" height="16" rx="8" fill="#0a2228"/>
    <text x="22" y="40" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="-apple-system,sans-serif">9:41</text>

    {/* App header */}
    <rect x="8" y="54" width="184" height="36" fill="rgba(4,78,89,0.7)"/>
    <text x="22" y="76" fill="rgba(255,255,255,0.92)" fontSize="11" fontFamily="-apple-system,sans-serif" fontWeight="700">My Shift</text>
    {/* Shift active badge */}
    <rect x="86" y="64" width="60" height="16" rx="8" fill="rgba(74,248,212,0.15)" stroke="rgba(74,248,212,0.3)" strokeWidth="1"/>
    <circle cx="96" cy="72" r="3" fill="#4af8d4"/>
    <text x="102" y="75" fill="#4af8d4" fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="600">Active</text>
    {/* Notif badge */}
    <circle cx="170" cy="72" r="10" fill="rgba(74,248,212,0.12)" stroke="rgba(74,248,212,0.3)" strokeWidth="1"/>
    <text x="170" y="76" fill="#4af8d4" fontSize="8.5" fontFamily="-apple-system,sans-serif" textAnchor="middle" fontWeight="700">3</text>

    {/* Progress bar */}
    <rect x="16" y="98" width="168" height="16" rx="8" fill="rgba(4,78,89,0.5)" stroke="rgba(74,248,212,0.15)" strokeWidth="1"/>
    <rect x="16" y="98" width="98" height="16" rx="8" fill="rgba(74,248,212,0.2)"/>
    <text x="100" y="110" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="-apple-system,sans-serif" textAnchor="middle">3 of 5 tasks done</text>

    {/* Task cards */}
    {[
      {title:'Room 12 — Towels', sub:'Guest request · 10 min ago', pri:'HIGH', done:false},
      {title:'Wi-Fi lobby down', sub:'Incident · Floor 1', pri:'HIGH', done:false},
      {title:'Check-in room 4', sub:'Completed 9:22 AM', pri:'MED', done:true},
    ].map((task, i) => {
      const priColor = task.pri==='HIGH' ? '#ef4444' : '#f59e0b';
      return (
        <g key={i}>
          <rect x="16" y={124+i*72} width="168" height="62" rx="11"
            fill={task.done ? 'rgba(4,78,89,0.3)' : 'rgba(4,78,89,0.7)'}
            stroke={task.done ? 'rgba(74,248,212,0.07)' : task.pri==='HIGH' ? 'rgba(239,68,68,0.3)' : 'rgba(74,248,212,0.2)'}
            strokeWidth="1"/>
          {/* Priority pill */}
          <rect x="24" y={132+i*72} width={task.pri==='HIGH'?24:20} height="11" rx="5" fill={`${priColor}22`}/>
          <text x={task.pri==='HIGH'?36:34} y={141+i*72} fill={priColor} fontSize="6.5" fontFamily="-apple-system,sans-serif" textAnchor="middle" fontWeight="700">{task.pri}</text>
          {/* Task title */}
          <text x="54" y={140+i*72} fill={task.done ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.9)'} fontSize="8.5" fontFamily="-apple-system,sans-serif" fontWeight="600">{task.title}</text>
          <text x="24" y={156+i*72} fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="-apple-system,sans-serif">{task.sub}</text>
          {/* Done check or action */}
          {task.done ? (
            <g>
              <circle cx="162" cy={145+i*72} r="9" fill="rgba(74,248,212,0.18)" stroke="#4af8d4" strokeWidth="0.8"/>
              <path d={`M157 ${145+i*72}l3 3 5-5`} stroke="#4af8d4" strokeWidth="1.2" strokeLinecap="round"/>
            </g>
          ) : (
            <rect x="24" y={164+i*72} width="80" height="14" rx="5" fill="rgba(74,248,212,0.12)" stroke="rgba(74,248,212,0.25)" strokeWidth="1">
              <text x="64" y={174+i*72} fill="#4af8d4" fontSize="7" fontFamily="-apple-system,sans-serif" textAnchor="middle">Mark complete</text>
            </rect>
          )}
          <text x="64" y={174+i*72} fill={task.done ? 'transparent' : '#4af8d4'} fontSize="7" fontFamily="-apple-system,sans-serif" textAnchor="middle">Mark complete</text>
        </g>
      );
    })}

    {/* Report incident CTA */}
    <rect x="16" y="344" width="168" height="32" rx="10" fill="rgba(74,248,212,0.12)" stroke="rgba(74,248,212,0.4)" strokeWidth="1"/>
    <text x="100" y="364" fill="#4af8d4" fontSize="10" fontFamily="-apple-system,sans-serif" textAnchor="middle" fontWeight="700">⚡ Report Incident</text>

    {/* Home bar */}
    <rect x="72" y="386" width="56" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
  </svg>
);

/* ─── WAVE SVG BACKGROUND ──────────────────────────────────────────────────── */
const WaveLines = () => (
  <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none' }}
    viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none">
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4af8d4" stopOpacity="0"/>
        <stop offset="20%" stopColor="#4af8d4" stopOpacity="0.5"/>
        <stop offset="50%" stopColor="#4af8d4" stopOpacity="0.7"/>
        <stop offset="80%" stopColor="#4af8d4" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#4af8d4" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Multiple wave strands */}
    {[
      {d:"M0 250 C200 150,380 350,600 250 S900 150,1200 250", w:2, op:0.6},
      {d:"M0 250 C200 170,380 330,600 250 S900 170,1200 250", w:1.5, op:0.4},
      {d:"M0 250 C200 190,380 310,600 250 S900 190,1200 250", w:1, op:0.25},
      {d:"M0 250 C200 130,380 370,600 250 S900 130,1200 250", w:1, op:0.18},
      {d:"M0 250 C200 210,380 290,600 250 S900 210,1200 250", w:0.8, op:0.12},
      {d:"M0 250 C200 110,380 390,600 250 S900 110,1200 250", w:0.7, op:0.08},
      {d:"M0 250 C200 230,380 270,600 250 S900 230,1200 250", w:0.6, op:0.07},
      {d:"M0 250 C200 90, 380 410,600 250 S900 90, 1200 250", w:0.5, op:0.05},
    ].map((w,i) => (
      <path key={i} d={w.d} stroke="url(#wg)" strokeWidth={w.w} opacity={w.op} filter="url(#glow)"/>
    ))}
    {/* Glow orbs at connection points */}
    <circle cx="200" cy="250" r="40" fill="rgba(74,248,212,0.04)" stroke="rgba(74,248,212,0.08)" strokeWidth="1"/>
    <circle cx="600" cy="250" r="60" fill="rgba(74,248,212,0.06)" stroke="rgba(74,248,212,0.14)" strokeWidth="1.5"/>
    <circle cx="1000" cy="250" r="40" fill="rgba(74,248,212,0.04)" stroke="rgba(74,248,212,0.08)" strokeWidth="1"/>
  </svg>
);

/* ─── MAIN EXPORT ──────────────────────────────────────────────────────────── */
export default function Product({ bp }) {
  const isMobile = bp === 'mobile';
  const isTablet = bp === 'tablet';

  const apps = CONTENT.product.apps;
  const roadmap = CONTENT.product.roadmap;

  return (
    <section id="product" style={{
      width: '100%',
      backgroundColor: COLORS.tealDeep,
      padding: isMobile ? '64px 20px' : isTablet ? '80px 40px' : '100px 64px',
      fontFamily: FONTS.sans,
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient bg radial */}
      <div style={{
        position:'absolute',top:'0%',left:'50%',transform:'translateX(-50%)',
        width:1200,height:600,
        background:'radial-gradient(ellipse at 50% 30%, rgba(74,248,212,0.04) 0%, transparent 65%)',
        pointerEvents:'none',
      }}/>

      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ fontSize:11,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:COLORS.neon,marginBottom:14 }}>
          {CONTENT.product.eyebrow}
        </div>
        <h2 style={{
          fontSize: isMobile?30:isTablet?38:46,
          fontWeight:300,color:'#fff',lineHeight:1.1,
          marginBottom:14,maxWidth:700,letterSpacing:'0.04em',
        }}>
          {CONTENT.product.headline}
        </h2>
        <p style={{ fontSize:isMobile?15:17,color:'rgba(255,255,255,0.65)',lineHeight:1.65,marginBottom:48,maxWidth:620 }}>
          {CONTENT.product.sub}
        </p>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:8,
          padding:'6px 16px',backgroundColor:COLORS.neonSoft,
          border:`1px solid ${COLORS.glassBorder}`,borderRadius:20,
          fontSize:12,fontWeight:600,color:COLORS.neon,marginBottom:56,letterSpacing:'0.06em',
        }}>
          <span style={{width:6,height:6,borderRadius:'50%',backgroundColor:COLORS.neon,display:'inline-block'}}/>
          {CONTENT.product.phase.label} · {CONTENT.product.phase.status} · {CONTENT.product.phase.note}
        </div>

        {/* ── ECOSYSTEM VISUAL ──────────────────────────────────── */}
        <div style={{
          position:'relative',
          background:'linear-gradient(135deg, rgba(3,26,32,0.9) 0%, rgba(4,78,89,0.25) 50%, rgba(3,26,32,0.9) 100%)',
          border:'1px solid rgba(74,248,212,0.13)',
          borderRadius:28,
          overflow:'hidden',
          padding: isMobile ? '48px 20px 40px' : isTablet ? '56px 32px 48px' : '72px 56px 64px',
          marginBottom: 88,
        }}>
          {!isMobile && <WaveLines />}

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1.5fr 1fr',
            gap: isMobile ? 56 : isTablet ? 48 : 40,
            alignItems: 'flex-end',
            position: 'relative',
            zIndex: 2,
          }}>

            {/* Guest App */}
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:24 }}>
              <GuestPhone />
              <div style={{ textAlign:'center',maxWidth:220 }}>
                <div style={{ fontSize:20,fontWeight:700,color:'#fff',marginBottom:6 }}>{apps[0].name}</div>
                <div style={{ fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:14,lineHeight:1.5 }}>{apps[0].tagline}</div>
                <ul style={{ listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:7,textAlign:'left' }}>
                  {apps[0].features.slice(0,3).map((f,i) => (
                    <li key={i} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:12.5,color:'rgba(255,255,255,0.58)',lineHeight:1.45 }}>
                      <span style={{ color:COLORS.turquoise,marginTop:2,flexShrink:0 }}><CheckIcon/></span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Owner Dashboard — CENTER */}
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:24 }}>
              <div style={{
                display:'inline-flex',alignItems:'center',gap:6,
                padding:'4px 14px',borderRadius:20,
                backgroundColor:COLORS.neon,color:COLORS.tealDeep,
                fontSize:10,fontWeight:700,letterSpacing:'0.10em',
                marginBottom:8,
              }}>
                YOUR COMMAND CENTER
              </div>
              <OwnerLaptop />
              <div style={{ textAlign:'center',maxWidth:300 }}>
                <div style={{ fontSize:20,fontWeight:700,color:'#fff',marginBottom:6 }}>{apps[1].name}</div>
                <div style={{ fontSize:13,color:COLORS.neon,marginBottom:14,lineHeight:1.5 }}>{apps[1].tagline}</div>
                <ul style={{ listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:7,textAlign:'left' }}>
                  {apps[1].features.slice(0,3).map((f,i) => (
                    <li key={i} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:12.5,color:'rgba(255,255,255,0.62)',lineHeight:1.45 }}>
                      <span style={{ color:COLORS.neon,marginTop:2,flexShrink:0 }}><CheckIcon/></span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Staff App */}
            <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:24 }}>
              <StaffPhone />
              <div style={{ textAlign:'center',maxWidth:220 }}>
                <div style={{ fontSize:20,fontWeight:700,color:'#fff',marginBottom:6 }}>{apps[2].name}</div>
                <div style={{ fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:14,lineHeight:1.5 }}>{apps[2].tagline}</div>
                <ul style={{ listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:7,textAlign:'left' }}>
                  {apps[2].features.slice(0,3).map((f,i) => (
                    <li key={i} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:12.5,color:'rgba(255,255,255,0.58)',lineHeight:1.45 }}>
                      <span style={{ color:COLORS.turquoise,marginTop:2,flexShrink:0 }}><CheckIcon/></span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* ── ROADMAP ───────────────────────────────────────────── */}
        <div style={{ borderTop:'1px solid rgba(74,248,212,0.10)',paddingTop:64 }}>
          <div style={{ fontSize:isMobile?20:24,fontWeight:600,color:COLORS.neon,marginBottom:40,letterSpacing:'0.04em' }}>
            {roadmap.title}
          </div>
          <div style={{
            display:'flex',
            flexDirection:isMobile?'column':'row',
            alignItems:'flex-start',
            position:'relative',
          }}>
            {roadmap.steps.map((step, idx) => {
              const isNow = step.status === 'now';
              const isNext = step.status === 'next';
              const isLast = idx === roadmap.steps.length - 1;
              const nextStep = roadmap.steps[idx + 1];
              const connectorColor = isNow && nextStep?.status === 'now' ? COLORS.neon : 'rgba(74,248,212,0.15)';
              const textColor = isNow ? '#fff' : isNext ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)';
              return (
                <div key={idx} style={{ display:'flex',alignItems:'flex-start',flex:1,flexDirection:isMobile?'row':'column',gap:isMobile?12:0 }}>
                  <div style={{ display:'flex',flexDirection:isMobile?'column':'row',alignItems:'center',marginBottom:isMobile?0:16,width:isMobile?undefined:'100%' }}>
                    <div style={{
                      width:32,height:32,borderRadius:'50%',flexShrink:0,
                      backgroundColor:isNow?COLORS.neon:'transparent',
                      border:`2px solid ${isNow?COLORS.neon:isNext?COLORS.teal:'rgba(74,248,212,0.2)'}`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:13,fontWeight:700,
                      color:isNow?COLORS.tealDeep:isNext?COLORS.teal:'rgba(74,248,212,0.25)',
                      zIndex:1,
                    }}>{idx+1}</div>
                    {!isLast && (
                      <div style={{
                        width:isMobile?2:'100%',height:isMobile?24:3,
                        backgroundColor:connectorColor,
                        margin:isMobile?'4px auto':'0',
                        flex:isMobile?'none':1,minWidth:isMobile?undefined:8,
                      }}/>
                    )}
                  </div>
                  <div style={{ paddingRight: isMobile ? 0 : 8, paddingBottom: isMobile ? 16 : 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: isNow ? COLORS.neon : isNext ? COLORS.turquoise : 'rgba(255,255,255,0.3)', marginBottom: 4 }}>
                      {step.badge || step.status}
                    </div>
                    <div style={{ fontSize: isMobile ? 13 : 13.5, fontWeight: 500, color: textColor, lineHeight: 1.4 }}>
                      {step.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
