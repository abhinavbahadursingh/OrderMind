import { Link } from 'react-router-dom'
import { Icon, LogoMark } from './Icons'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Features', to: '/features' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Get Started', to: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About / Why', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Early access', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pipeline overview', to: '/how-it-works' },
      { label: 'Integrations', to: '/contact' },
      { label: 'Human oversight', to: '/dashboard' },
    ],
  },
]

const PLATFORMS = [
  { name: 'WhatsApp', icon: 'whatsapp' as const },
  { name: 'Instagram', icon: 'instagram' as const },
  { name: 'Telegram', icon: 'telegram' as const },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="brand" aria-label="OrderMind home">
              <LogoMark className="brand__mark" />
              <span>OrderMind</span>
            </Link>
            <p className="footer__tagline">
              Unstructured seller chats become structured, continuously updated orders — with
              auto-generated bills and a dashboard where you stay in control.
            </p>
            <div className="footer__social">
              {PLATFORMS.map((p) => (
                <span key={p.name} className="icon-btn" role="img" aria-label={p.name}>
                  <Icon name={p.icon} />
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div className="footer__col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:hello@ordermind.app">hello@ordermind.app</a>
              </li>
              <li>
                <Link to="/contact">Book an intro call</Link>
              </li>
              <li>
                <Link to="/contact">Request early access</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} OrderMind. All rights reserved.</span>
          <span>
            Built on official WhatsApp Business, Instagram Messaging &amp; Telegram Bot APIs.
          </span>
        </div>
      </div>
    </footer>
  )
}
