import { NavLink } from 'react-router-dom'

const HomeIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? '#ffffff' : '#374151'} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const ClockIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? '#ffffff' : '#374151'} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ChartIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? '#ffffff' : '#374151'} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6"  y1="20" x2="6"  y2="14" />
  </svg>
)

const navLinks = [
  { to: '/',         label: 'Home',     Icon: HomeIcon,  exact: true },
  { to: '/timeline', label: 'Timeline', Icon: ClockIcon              },
  { to: '/stats',    label: 'Stats',    Icon: ChartIcon              },
]

const FOREST = '#1B4332'

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white"
      style={{ borderBottom: '1px solid #E5E7EB' }}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Text logo */}
        <NavLink to="/" className="text-2xl tracking-tight select-none">
          <span className="font-normal text-gray-900">Keen</span>
          <span className="font-bold  text-gray-900">Keeper</span>
        </NavLink>

        {/* Nav links */}
        <ul className="flex items-center gap-1">
          {navLinks.map(({ to, label, Icon, exact }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-md text-base font-medium transition-all duration-150 ${
                    isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                style={({ isActive }) => isActive ? { backgroundColor: FOREST } : {}}
              >
                {({ isActive }) => (
                  <>
                    <Icon active={isActive} />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
