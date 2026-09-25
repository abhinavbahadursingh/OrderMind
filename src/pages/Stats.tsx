import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon, LogoMark } from '../components/Icons'
import type { IconName } from '../components/Icons'
import { ChatThread } from '../components/Mocks'
import type { ChatMessage } from '../components/Mocks'
import { useTheme } from '../lib/theme-context'

/* ==========================================================================
   Data
   ========================================================================== */

type SideItem = { id: string; label: string; icon: IconName }

const SIDE_NAV: SideItem[] = [
  { id: 'sec-overview', label: 'Overview', icon: 'dashboard' },
  { id: 'sec-orders', label: 'Orders', icon: 'receipt' },
  { id: 'sec-conversations', label: 'Conversations', icon: 'chat' },
  { id: 'sec-catalog', label: 'Products / Catalog', icon: 'tag' },
  { id: 'sec-billing', label: 'Billing & Payments', icon: 'card' },
  { id: 'sec-customers', label: 'Customers', icon: 'user' },
  { id: 'sec-settings', label: 'Settings', icon: 'sliders' },
]

type Kpi = {
  label: string
  value: number
  format: 'int' | 'inr' | 'pct'
  trend: string
  dir: 'up' | 'flat'
  tone: 'ok' | 'warn'
}

const KPIS: Kpi[] = [
  { label: 'Total Orders (This Month)', value: 342, format: 'int', trend: '+12%', dir: 'up', tone: 'ok' },
  { label: 'Revenue (This Month)', value: 184600, format: 'inr', trend: '+8%', dir: 'up', tone: 'ok' },
  { label: 'Pending Review', value: 7, format: 'int', trend: '3 urgent', dir: 'flat', tone: 'warn' },
  { label: 'Avg. Order Confidence', value: 94, format: 'pct', trend: '+2 pts', dir: 'up', tone: 'ok' },
  { label: 'Repeat Customers', value: 58, format: 'pct', trend: '+4%', dir: 'up', tone: 'ok' },
]

const ORDERS_30D = [
  7, 9, 6, 11, 8, 13, 10, 9, 14, 12, 8, 7, 15, 13, 11, 16, 10, 9, 12, 18, 14, 11, 9, 13, 17, 15,
  12, 19, 16, 21,
]

type Platform = 'whatsapp' | 'instagram' | 'telegram'
type StatusKey = 'new' | 'confirmed' | 'billed' | 'shipped' | 'review'

const PLATFORM_LABEL: Record<Platform, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  telegram: 'Telegram',
}

const STATUS_LABEL: Record<StatusKey, string> = {
  new: 'New',
  confirmed: 'Confirmed',
  billed: 'Billed',
  shipped: 'Shipped',
  review: 'Needs Review',
}

type RecentOrder = {
  id: string
  customer: string
  platform: Platform
  items: string
  amount: string
  status: StatusKey
  date: string
  time: string
}

const RECENT_ORDERS: RecentOrder[] = [
  { id: '#ORD-1042', customer: 'Ananya S.', platform: 'whatsapp', items: 'Blue Kurti (M) ×2', amount: '₹1,798', status: 'confirmed', date: 'Today', time: '10:42 AM' },
  { id: '#ORD-1041', customer: 'Priya M.', platform: 'instagram', items: 'Silver Anklet ×1', amount: '₹450', status: 'review', date: 'Today', time: '9:58 AM' },
  { id: '#ORD-1040', customer: 'Rohit K.', platform: 'telegram', items: 'Black Sneakers (9) ×1', amount: '₹2,199', status: 'billed', date: 'Yesterday', time: '7:31 PM' },
  { id: '#ORD-1039', customer: 'Sneha P.', platform: 'whatsapp', items: 'Floral Kurti (L) ×1, Jhumka ×2', amount: '₹1,597', status: 'shipped', date: 'Yesterday', time: '5:12 PM' },
  { id: '#ORD-1038', customer: 'Kabir D.', platform: 'instagram', items: 'Cotton Shirt (M) ×2', amount: '₹998', status: 'new', date: 'Yesterday', time: '2:47 PM' },
  { id: '#ORD-1037', customer: 'Meera J.', platform: 'whatsapp', items: 'Printed Saree ×1', amount: '₹1,860', status: 'shipped', date: '2 days ago', time: '11:20 AM' },
  { id: '#ORD-1036', customer: 'Arjun V.', platform: 'telegram', items: 'Linen Kurta (XL) ×1', amount: '₹2,340', status: 'confirmed', date: '2 days ago', time: '10:05 AM' },
  { id: '#ORD-1035', customer: 'Fatima R.', platform: 'whatsapp', items: 'Jhumka Earrings ×3', amount: '₹1,047', status: 'billed', date: '3 days ago', time: '6:40 PM' },
  { id: '#ORD-1034', customer: 'Dev S.', platform: 'instagram', items: 'Grey Sneakers (10) ×1', amount: '₹2,499', status: 'review', date: '3 days ago', time: '1:15 PM' },
  { id: '#ORD-1033', customer: 'Ishita B.', platform: 'whatsapp', items: 'Floral Kurti (S) ×2', amount: '₹1,798', status: 'shipped', date: '4 days ago', time: '8:55 AM' },
]

const LIVE_THREAD: ChatMessage[] = [
  { from: 'in', text: 'ye wali dress hai kya size L mein?', meta: 'Ananya · 10:42' },
  { from: 'out', text: 'haan available hai, color?', meta: 'OrderMind · 10:42' },
  { from: 'in', text: 'black bhej do, 2 piece', marks: ['black', '2 piece'], meta: 'Ananya · 10:43' },
  { from: 'in', text: 'haan confirm kar do', meta: 'Ananya · 10:43' },
]

type LiveField = { k: string; label: string; v: string; conf: number }

const LIVE_FIELDS: LiveField[] = [
  { k: 'product', label: 'Product', v: 'Dress', conf: 97 },
  { k: 'size', label: 'Size', v: 'L', conf: 98 },
  { k: 'color', label: 'Color', v: 'Black', conf: 68 },
  { k: 'qty', label: 'Quantity', v: '2', conf: 96 },
  { k: 'channel', label: 'Channel', v: 'WhatsApp', conf: 99 },
  { k: 'intent', label: 'Intent', v: 'confirm_order', conf: 93 },
]

type Product = { name: string; price: number; stock: number; sku: string }

const PRODUCTS: Product[] = [
  { name: 'Floral Kurti', price: 899, stock: 12, sku: 'OM-KT-114' },
  { name: 'Silver Anklet', price: 450, stock: 3, sku: 'OM-AN-021' },
  { name: 'Cotton Shirt', price: 499, stock: 24, sku: 'OM-SH-067' },
  { name: 'Printed Saree', price: 1771, stock: 8, sku: 'OM-SA-009' },
  { name: 'Jhumka Earrings', price: 349, stock: 41, sku: 'OM-EA-055' },
  { name: 'Linen Kurta', price: 2299, stock: 5, sku: 'OM-KT-231' },
]

type Invoice = {
  no: string
  customer: string
  amount: string
  paid: boolean
  ref: string
  date: string
}

const INVOICES: Invoice[] = [
  { no: 'INV-1042', customer: 'Ananya S.', amount: '₹1,798', paid: true, ref: 'upi-482913@okaxis', date: 'Today' },
  { no: 'INV-1041', customer: 'Priya M.', amount: '₹450', paid: false, ref: '—', date: 'Today' },
  { no: 'INV-1040', customer: 'Rohit K.', amount: '₹2,199', paid: true, ref: 'upi-771204@oksbi', date: 'Yesterday' },
  { no: 'INV-1039', customer: 'Sneha P.', amount: '₹1,597', paid: true, ref: 'upi-590817@okhdfc', date: 'Yesterday' },
  { no: 'INV-1038', customer: 'Kabir D.', amount: '₹998', paid: true, ref: 'upi-318642@okicici', date: '2 days ago' },
  { no: 'INV-1035', customer: 'Fatima R.', amount: '₹1,047', paid: false, ref: '—', date: '3 days ago' },
]

type Alert = { icon: IconName; tone: 'warn' | 'ok' | 'info'; text: string; time: string }

const ALERTS: Alert[] = [
  { icon: 'flag', tone: 'warn', text: 'Order #ORD-1041 — low confidence on color field (68%) — please review', time: '10:41 AM' },
  { icon: 'rupee', tone: 'ok', text: 'Payment received for Order #ORD-1038', time: '9:52 AM' },
  { icon: 'package', tone: 'warn', text: 'Stock low: Silver Anklet (3 left)', time: '8:30 AM' },
  { icon: 'chat', tone: 'info', text: 'New customer message needs a reply — Instagram', time: '12 min ago' },
]

type CustomerRow = {
  name: string
  platform: Platform
  orders: number
  spent: string
  last: string
}

const CUSTOMERS: CustomerRow[] = [
  { name: 'Ananya S.', platform: 'whatsapp', orders: 14, spent: '₹18,420', last: 'Today' },
  { name: 'Priya M.', platform: 'instagram', orders: 6, spent: '₹7,140', last: 'Today' },
  { name: 'Rohit K.', platform: 'telegram', orders: 9, spent: '₹24,310', last: 'Yesterday' },
  { name: 'Sneha P.', platform: 'whatsapp', orders: 21, spent: '₹31,860', last: 'Yesterday' },
  { name: 'Meera J.', platform: 'whatsapp', orders: 11, spent: '₹15,975', last: '3 days ago' },
]

const SETTINGS = [
  {
    id: 'autobill',
    label: 'Auto-generate invoice on confirmation',
    desc: 'Drafts the bill the moment a customer confirms — you still approve before it is sent.',
  },
  {
    id: 'lowstock',
    label: 'Low-stock alerts',
    desc: 'Notify when any product drops below 5 units.',
  },
  {
    id: 'digest',
    label: 'Nightly summary email',
    desc: 'Orders, revenue and unresolved reviews at 9 PM IST.',
  },
]

const inr = new Intl.NumberFormat('en-IN')

/* ==========================================================================
   Hooks & helpers
   ========================================================================== */

function prefersReduced() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [threshold])

  return { ref, inView }
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(() => (prefersReduced() ? target : 0))

  useEffect(() => {
    if (!active || prefersReduced()) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return value
}

function formatKpi(kpi: Kpi, n: number) {
  if (kpi.format === 'inr') return `₹${inr.format(n)}`
  if (kpi.format === 'pct') return `${n}%`
  return inr.format(n)
}

function PlatformTag({ platform }: { platform: Platform }) {
  return (
    <span className="sx-plat">
      <Icon name={platform} size={15} />
      {PLATFORM_LABEL[platform]}
    </span>
  )
}

/* ==========================================================================
   Section pieces
   ========================================================================== */

function KpiCard({ kpi, active, index }: { kpi: Kpi; active: boolean; index: number }) {
  const n = useCountUp(kpi.value, active)
  return (
    <div className="sx-kpi" style={{ '--i': index } as CSSProperties}>
      <span className="sx-kpi__label">{kpi.label}</span>
      <span className="sx-kpi__value">{formatKpi(kpi, n)}</span>
      <span className={`sx-kpi__trend is-${kpi.tone}`}>
        {kpi.dir === 'up' ? (
          <Icon name="arrow-right" size={13} style={{ transform: 'rotate(-45deg)' }} />
        ) : (
          <Icon name="flag" size={13} />
        )}
        {kpi.trend}
      </span>
    </div>
  )
}

function OrdersChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const max = Math.max(...ORDERS_30D)

  return (
    <div className="sx-panel sx-chart" ref={ref}>
      <div className="sx-panel__head">
        <div>
          <h3 className="sx-panel__title">Orders over the last 30 days</h3>
          <p className="sx-panel__sub">Structured orders created from conversations</p>
        </div>
        <span className="chip">
          <Icon name="calendar" size={13} /> Sep 1 – Sep 30
        </span>
      </div>

      <div className={`sx-chart__body${inView ? ' is-in' : ''}`}>
        <div className="sx-chart__axis" aria-hidden="true">
          <span>{max}</span>
          <span>{Math.round(max / 2)}</span>
          <span>0</span>
        </div>
        <div className="sx-chart__plot">
          <span className="sx-chart__line" style={{ top: 0 }} />
          <span className="sx-chart__line" style={{ top: '50%' }} />
          <span className="sx-chart__line" style={{ top: '100%' }} />
          <div className="sx-chart__bars" role="img" aria-label="Bar chart of daily orders for the last 30 days">
            {ORDERS_30D.map((v, i) => (
              <span
                key={i}
                className="sx-chart__bar"
                title={`Day ${i + 1}: ${v} orders`}
                style={{ '--h': `${(v / max) * 100}%`, '--i': i } as CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="sx-chart__foot" aria-hidden="true">
          <span>Sep 1</span>
          <span>Sep 15</span>
          <span>Sep 30</span>
        </div>
      </div>
    </div>
  )
}

function PaidDonut() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35)
  const C = 2 * Math.PI * 54
  const paidShare = 0.82
  const unpaidShare = 0.18

  return (
    <div className="sx-donut-card" ref={ref}>
      <div className={`sx-donut${inView ? ' is-in' : ''}`}>
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <circle className="sx-donut__track" cx="64" cy="64" r="54" />
          <circle
            className="sx-donut__arc sx-donut__arc--paid"
            cx="64"
            cy="64"
            r="54"
            style={
              {
                '--len': C * paidShare,
                '--c': C,
                transitionDelay: '150ms',
              } as CSSProperties
            }
          />
          <circle
            className="sx-donut__arc sx-donut__arc--unpaid"
            cx="64"
            cy="64"
            r="54"
            style={
              {
                '--len': C * unpaidShare,
                '--c': C,
                transitionDelay: '650ms',
              } as CSSProperties
            }
          />
        </svg>
        <div className="sx-donut__center">
          <strong>82%</strong>
          <span>paid this month</span>
        </div>
      </div>

      <ul className="sx-legend">
        <li>
          <span className="sx-legend__dot is-paid" />
          <span className="sx-legend__label">Paid</span>
          <span className="sx-legend__value">₹1,51,372</span>
        </li>
        <li>
          <span className="sx-legend__dot is-unpaid" />
          <span className="sx-legend__label">Unpaid</span>
          <span className="sx-legend__value">₹33,228</span>
        </li>
      </ul>
    </div>
  )
}

function OrderModal({ order, onClose }: { order: RecentOrder; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div
      className="sx-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Order detail ${order.id}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="sx-modal__panel">
        <div className="sx-modal__head">
          <div className="sx-modal__title">
            <span className="sx-modal__id">{order.id}</span>
            <span className={`sx-st sx-st--${order.status}`}>{STATUS_LABEL[order.status]}</span>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close order detail">
            <Icon name="close" />
          </button>
        </div>

        <div className="sx-modal__body">
          <div className="sx-modal__grid">
            <div>
              <span>Customer</span>
              <strong>{order.customer}</strong>
            </div>
            <div>
              <span>Platform</span>
              <strong>
                <PlatformTag platform={order.platform} />
              </strong>
            </div>
            <div>
              <span>Placed</span>
              <strong>
                {order.date} · {order.time}
              </strong>
            </div>
            <div>
              <span>Amount</span>
              <strong className="sx-num">{order.amount}</strong>
            </div>
          </div>

          <div className="sx-modal__items">
            <span className="sx-modal__label">Line items</span>
            <div className="sx-modal__row">
              <span>{order.items}</span>
              <span className="sx-num">{order.amount}</span>
            </div>
          </div>

          <p className="sx-modal__note">
            <Icon name="spark" size={15} />
            Structured from the {PLATFORM_LABEL[order.platform]} thread · confidence 96% · no
            manual entry
          </p>
        </div>

        <div className="sx-modal__foot">
          <button type="button" className="btn btn--primary btn--sm">
            <Icon name="check" />
            Confirm order
          </button>
          <button type="button" className="btn btn--secondary btn--sm">
            <Icon name="flag" />
            Flag for review
          </button>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   Page
   ========================================================================== */

export function Stats() {
  const { theme, toggle } = useTheme()

  const [active, setActive] = useState('sec-overview')
  const [sideOpen, setSideOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<RecentOrder | null>(null)
  const [kpiActive, setKpiActive] = useState(false)

  const [fieldVals, setFieldVals] = useState<Record<string, string>>(() =>
    Object.fromEntries(LIVE_FIELDS.map((f) => [f.k, f.v])),
  )
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [edited, setEdited] = useState<Record<string, boolean>>({})
  const cancelRef = useRef(false)

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    autobill: true,
    lowstock: true,
    digest: false,
  })

  const navRef = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ top: 0, height: 0 })

  /* sliding sidebar indicator */
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current
      if (!nav) return
      const el = nav.querySelector<HTMLElement>('.is-active')
      if (!el) return
      const nr = nav.getBoundingClientRect()
      const er = el.getBoundingClientRect()
      setGlow({ top: er.top - nr.top, height: er.height })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  /* active section follows scroll */
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const nodes = SIDE_NAV.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[]
    if (nodes.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting)
        if (hit.length === 0) return
        const top = hit.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        )
        setActive(top.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  /* esc closes modal / popovers / drawer / editor */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setModal(null)
      setNotifOpen(false)
      setSideOpen(false)
      setEditing(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* count-ups start once the page is up */
  useEffect(() => {
    const id = window.setTimeout(() => setKpiActive(true), 120)
    return () => window.clearTimeout(id)
  }, [])

  const goTo = (id: string) => {
    setActive(id)
    setSideOpen(false)
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced() ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return RECENT_ORDERS
    return RECENT_ORDERS.filter((o) =>
      `${o.id} ${o.customer} ${o.items}`.toLowerCase().includes(q),
    )
  }, [query])

  const startEdit = (f: LiveField) => {
    cancelRef.current = false
    setEditing(f.k)
    setDraft(fieldVals[f.k])
  }

  const commitEdit = () => {
    if (cancelRef.current) {
      cancelRef.current = false
      return
    }
    if (!editing) return
    const key = editing
    setFieldVals((v) => ({ ...v, [key]: draft.trim() || v[key] }))
    setEdited((e) => ({ ...e, [key]: true }))
    setEditing(null)
  }

  return (
    <div className="sx-shell">
      {/* ---- sidebar ---- */}
      <aside className={`sx-side${sideOpen ? ' is-open' : ''}`} aria-label="Dashboard sidebar">
        <Link to="/" className="sx-brand" onClick={() => setSideOpen(false)}>
          <LogoMark className="sx-brand__mark" />
          <span className="sx-brand__text">
            OrderMind <small>Seller OS</small>
          </span>
        </Link>

        <div className="sx-nav" ref={navRef}>
          <span
            className="sx-nav__glow"
            aria-hidden="true"
            style={{ transform: `translateY(${glow.top}px)`, height: glow.height }}
          />
          {SIDE_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sx-nav__item${active === item.id ? ' is-active' : ''}`}
              onClick={() => goTo(item.id)}
              aria-current={active === item.id ? 'page' : undefined}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="sx-side__foot">
          <Link to="/" className="sx-side__back">
            <Icon name="arrow-left" size={16} />
            Back to site
          </Link>
        </div>
      </aside>

      {sideOpen && (
        <div className="sx-scrim" onClick={() => setSideOpen(false)} aria-hidden="true" />
      )}

      {/* ---- main ---- */}
      <div className="sx-main">
        <header className="sx-topbar">
          <button
            type="button"
            className="icon-btn sx-burger"
            onClick={() => setSideOpen((v) => !v)}
            aria-label={sideOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={sideOpen}
          >
            <Icon name={sideOpen ? 'close' : 'menu'} />
          </button>

          <div className="sx-who">
            <span className="sx-avatar" aria-hidden="true">
              RE
            </span>
            <span className="sx-who__text">
              <strong>Riya&rsquo;s Ethnic Wear</strong>
              <small>Seller account</small>
            </span>
          </div>

          <label className="sx-search">
            <Icon name="search" size={17} />
            <input
              type="search"
              placeholder="Search orders, customers, invoices…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search orders"
            />
          </label>

          <div className="sx-topbar__actions">
            <div className="sx-notif">
              <button
                type="button"
                className="icon-btn"
                onClick={() => setNotifOpen((v) => !v)}
                aria-label="Notifications, 3 unread"
                aria-expanded={notifOpen}
              >
                <Icon name="bell" />
                <span className="sx-notif__badge">3</span>
              </button>

              {notifOpen && (
                <div className="sx-notif__panel">
                  <div className="sx-notif__head">
                    <span>Notifications</span>
                    <span className="pill pill--accent">3 new</span>
                  </div>
                  {ALERTS.slice(0, 3).map((a) => (
                    <div key={a.text} className="sx-notif__item">
                      <span className={`sx-notif__icon is-${a.tone}`}>
                        <Icon name={a.icon} size={15} />
                      </span>
                      <span className="sx-notif__text">
                        {a.text}
                        <small>{a.time}</small>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
          </div>
        </header>

        <div className="sx-content">
          {/* ---- 1 · Overview / KPIs ---- */}
          <section className="sx-section" id="sec-overview">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Overview</h2>
                <p className="sx-section__sub">Month to date · updated 2 min ago</p>
              </div>
              <span className="chip">
                <Icon name="calendar" size={13} /> Sep 2026
              </span>
            </div>

            <div className="sx-kpis">
              {KPIS.map((k, i) => (
                <KpiCard key={k.label} kpi={k} active={kpiActive} index={i} />
              ))}
            </div>

            <OrdersChart />
          </section>

          {/* ---- 2 · Recent orders ---- */}
          <section className="sx-section" id="sec-orders">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Recent Orders</h2>
                <p className="sx-section__sub">
                  {filteredOrders.length} of {RECENT_ORDERS.length} orders · all channels
                </p>
              </div>
              <span className="chip">
                <Icon name="spark" size={13} /> Auto-structured
              </span>
            </div>

            <div className="sx-panel sx-table-wrap">
              <table className="sx-table">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Platform</th>
                    <th scope="col">Items</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o, i) => (
                    <tr key={o.id} style={{ '--i': i } as CSSProperties}>
                      <td className="sx-td-id">{o.id}</td>
                      <td>{o.customer}</td>
                      <td>
                        <PlatformTag platform={o.platform} />
                      </td>
                      <td className="sx-td-items">{o.items}</td>
                      <td className="sx-num">{o.amount}</td>
                      <td>
                        <span className={`sx-st sx-st--${o.status}`}>
                          {STATUS_LABEL[o.status]}
                        </span>
                      </td>
                      <td className="sx-td-date">
                        {o.date}
                        <small>{o.time}</small>
                      </td>
                      <td className="sx-td-action">
                        <button type="button" className="sx-view" onClick={() => setModal(o)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={8} className="sx-empty">
                        No orders match &ldquo;{query}&rdquo;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ---- 3 · Live conversation → order ---- */}
          <section className="sx-section" id="sec-conversations">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Live Conversation → Order</h2>
                <p className="sx-section__sub">Ananya S. · WhatsApp · structuring in real time</p>
              </div>
              <span className="pill pill--accent">
                <span className="pill__dot" />
                live
              </span>
            </div>

            <div className="sx-panel sx-live">
              <div className="sx-live__col">
                <div className="sx-live__label">
                  <Icon name="chat" size={15} />
                  <span>Thread</span>
                </div>
                <ChatThread messages={LIVE_THREAD} />
                <div className="sx-live__typing" aria-hidden="true">
                  <span className="sx-live__dot" />
                  OrderMind is structuring…
                </div>
              </div>

              <div className="sx-live__col">
                <div className="sx-live__label">
                  <Icon name="layers" size={15} />
                  <span>Structured order</span>
                  <span className="chip">#ORD-1043 · draft</span>
                </div>

                <div className="sx-fields">
                  {LIVE_FIELDS.map((f) => {
                    const conf = edited[f.k] ? 100 : f.conf
                    return (
                      <div className="sx-field" key={f.k}>
                        <span className="sx-field__k">{f.label}</span>
                        {editing === f.k ? (
                          <input
                            className="sx-field__input"
                            autoFocus
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitEdit()
                              if (e.key === 'Escape') {
                                cancelRef.current = true
                                setEditing(null)
                              }
                            }}
                            aria-label={`Edit ${f.label}`}
                          />
                        ) : (
                          <span className="sx-field__v">{fieldVals[f.k]}</span>
                        )}
                        <span className={`sx-field__conf${conf < 80 ? ' is-low' : ''}`}>
                          {conf}%
                        </span>
                        <button
                          type="button"
                          className="sx-field__edit"
                          onClick={() => startEdit(f)}
                          aria-label={`Edit ${f.label}`}
                        >
                          <Icon name="edit" size={14} />
                        </button>
                      </div>
                    )
                  })}
                </div>

                <div className="sx-live__actions">
                  <button type="button" className="btn btn--primary btn--sm">
                    <Icon name="check" />
                    Confirm order
                  </button>
                  <button type="button" className="btn btn--secondary btn--sm">
                    <Icon name="flag" />
                    Flag for review
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ---- 4 · Product / catalog snapshot ---- */}
          <section className="sx-section" id="sec-catalog">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Product / Catalog Snapshot</h2>
                <p className="sx-section__sub">6 of 48 products · live stock from your catalogue</p>
              </div>
              <span className="chip">
                <Icon name="tag" size={13} /> Catalog-synced
              </span>
            </div>

            <div className="sx-prods">
              {PRODUCTS.map((p, i) => (
                <article className="sx-prod" key={p.sku} style={{ '--i': i } as CSSProperties}>
                  <div className="sx-prod__thumb" aria-hidden="true">
                    <span>{p.name.charAt(0)}</span>
                    <Icon name="tag" size={14} />
                  </div>
                  <div className="sx-prod__name">{p.name}</div>
                  <div className="sx-prod__meta">
                    <span className="sx-prod__price">₹{inr.format(p.price)}</span>
                    <span className={`sx-stock${p.stock <= 5 ? ' is-low' : ''}`}>
                      {p.stock <= 5 ? `Low · ${p.stock} left` : `${p.stock} in stock`}
                    </span>
                  </div>
                  <div className="sx-prod__sku">{p.sku}</div>
                </article>
              ))}
            </div>
          </section>

          {/* ---- 5 · Billing & payments ---- */}
          <section className="sx-section" id="sec-billing">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Billing &amp; Payments</h2>
                <p className="sx-section__sub">Auto-generated invoices · UPI settlement</p>
              </div>
              <span className="chip">
                <Icon name="rupee" size={13} /> UPI-first
              </span>
            </div>

            <div className="sx-billing">
              <div className="sx-panel sx-table-wrap">
                <table className="sx-table sx-table--compact">
                  <thead>
                    <tr>
                      <th scope="col">Invoice</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Payment</th>
                      <th scope="col">UPI reference</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INVOICES.map((inv, i) => (
                      <tr key={inv.no} style={{ '--i': i } as CSSProperties}>
                        <td className="sx-td-id">{inv.no}</td>
                        <td>{inv.customer}</td>
                        <td className="sx-num">{inv.amount}</td>
                        <td>
                          <span className={`sx-st sx-st--${inv.paid ? 'shipped' : 'review'}`}>
                            {inv.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </td>
                        <td className="sx-td-ref">{inv.ref}</td>
                        <td className="sx-td-date">{inv.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sx-panel sx-donut-wrap">
                <div className="sx-panel__head">
                  <div>
                    <h3 className="sx-panel__title">Paid vs Unpaid</h3>
                    <p className="sx-panel__sub">This month</p>
                  </div>
                </div>
                <PaidDonut />
              </div>
            </div>
          </section>

          {/* ---- 6 · Alerts ---- */}
          <section className="sx-section" id="sec-alerts">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Needs Attention</h2>
                <p className="sx-section__sub">Alerts from the last 24 hours</p>
              </div>
            </div>

            <div className="sx-alerts">
              {ALERTS.map((a, i) => (
                <div
                  className="sx-alert"
                  key={a.text}
                  style={{ '--i': i } as CSSProperties}
                >
                  <span className={`sx-alert__icon is-${a.tone}`}>
                    <Icon name={a.icon} size={17} />
                  </span>
                  <span className="sx-alert__text">{a.text}</span>
                  <span className="sx-alert__time">{a.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ---- 7 · Customers snapshot ---- */}
          <section className="sx-section" id="sec-customers">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Customers Snapshot</h2>
                <p className="sx-section__sub">Top customers by lifetime value</p>
              </div>
            </div>

            <div className="sx-panel sx-table-wrap">
              <table className="sx-table sx-table--compact">
                <thead>
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Platform</th>
                    <th scope="col">Total Orders</th>
                    <th scope="col">Total Spent</th>
                    <th scope="col">Last Order</th>
                  </tr>
                </thead>
                <tbody>
                  {CUSTOMERS.map((c, i) => (
                    <tr key={c.name} style={{ '--i': i } as CSSProperties}>
                      <td className="sx-td-id">{c.name}</td>
                      <td>
                        <PlatformTag platform={c.platform} />
                      </td>
                      <td className="sx-num">{c.orders}</td>
                      <td className="sx-num">{c.spent}</td>
                      <td className="sx-td-date">{c.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ---- settings ---- */}
          <section className="sx-section" id="sec-settings">
            <div className="sx-section__head">
              <div>
                <h2 className="sx-section__title">Settings</h2>
                <p className="sx-section__sub">Workspace preferences for Riya&rsquo;s Ethnic Wear</p>
              </div>
            </div>

            <div className="sx-panel sx-settings">
              {SETTINGS.map((s) => (
                <div className="sx-setting" key={s.id}>
                  <div className="sx-setting__text">
                    <span className="sx-setting__label">{s.label}</span>
                    <span className="sx-setting__desc">{s.desc}</span>
                  </div>
                  <button
                    type="button"
                    className="sx-switch"
                    role="switch"
                    aria-checked={toggles[s.id]}
                    aria-label={s.label}
                    onClick={() => setToggles((t) => ({ ...t, [s.id]: !t[s.id] }))}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {modal && <OrderModal order={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
