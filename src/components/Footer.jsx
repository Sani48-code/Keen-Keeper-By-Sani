/* Social icons are inline SVG so they render reliably as pure white
   on the dark forest-green background — no PNG filter issues.           */

const FOREST = '#1B4332'

/* ── Inline SVG social icons ─────────────────────────────────────────── */
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="#ffffff" stroke="none" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
)

const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const socialLinks = [
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { Icon: FacebookIcon,  label: 'Facebook',  href: 'https://facebook.com'  },
  { Icon: XIcon,         label: 'X / Twitter', href: 'https://x.com'      },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: FOREST }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col items-center text-center gap-4">

        {/* Brand name */}
        <p className="text-5xl font-bold leading-none tracking-tight">
          Keen<span className="font-extrabold">Keeper</span>
        </p>

        {/* Tagline */}
        <p className="text-base text-gray-300 max-w-md leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>

        {/* Social Links label */}
        <p className="text-base font-semibold text-white mt-3">Social Links</p>

        {/* Social icon buttons */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-12 h-12 rounded-full transition-opacity duration-200 hover:opacity-75 cursor-pointer"
              style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="w-full mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span>© {new Date().getFullYear()} KeenKeeper. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-white transition-colors cursor-pointer">
              Cookies
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
