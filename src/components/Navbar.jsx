import { useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white"
      style={{ borderBottom: '1px solid #E5E7EB' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Text logo */}
        <NavLink to="/" className="text-xl sm:text-2xl tracking-tight select-none">
          <span className="font-normal text-gray-900">Keen</span>
          <span className="font-bold  text-gray-900">Keeper</span>
        </NavLink>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
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

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-0.5 bg-gray-700 transition-transform duration-200"
            style={{ transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-0.5 bg-gray-700 transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-gray-700 transition-transform duration-200"
            style={{ transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-white px-4 pb-3 pt-1 flex flex-col gap-1"
          style={{ borderTop: '1px solid #F3F4F6' }}
        >
          {navLinks.map(({ to, label, Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-150 ${
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
          ))}
        </div>
      )}
    </nav>
  )
}
