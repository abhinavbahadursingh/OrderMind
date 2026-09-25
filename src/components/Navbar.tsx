import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon, LogoMark } from './Icons'
import { useTheme } from '../lib/theme-context'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/features', label: 'Features' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [seenPath, setSeenPath] = useState(location.pathname)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (seenPath !== location.pathname) {
    setSeenPath(location.pathname)
    setOpen(false)
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav__link${isActive ? ' is-active' : ''}`

  return (
    <>
      <header className={`nav${stuck ? ' is-stuck' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="brand" aria-label="OrderMind home">
            <LogoMark className="brand__mark" />
            <span>OrderMind</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
            >
              <span className="theme-glyph">
                <svg className="glyph-sun" viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="4.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 2.8v2.4M12 18.8v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <svg className="glyph-moon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20 14.4A8.4 8.4 0 0 1 9.6 4 8.6 8.6 0 1 0 20 14.4Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <Link to="/stats" className="btn btn--primary btn--sm nav__cta">
              See Stats
            </Link>

            <Link to="/contact" className="btn btn--secondary btn--sm nav__cta">
              Get Started
            </Link>

            <button
              type="button"
              className="icon-btn nav__toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-nav" className={`nav__sheet${open ? ' is-open' : ''}`}>
        <nav aria-label="Mobile">
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/stats" className="btn btn--primary">
            See Stats
          </Link>
          <Link to="/contact" className="btn btn--secondary">
            Get Started
          </Link>
        </nav>
      </div>
    </>
  )
}
