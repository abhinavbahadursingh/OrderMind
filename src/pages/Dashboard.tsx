import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { CTABand } from '../components/CTABand'
import { ChatThread } from '../components/Mocks'
import { Icon } from '../components/Icons'

type Order = {
  id: string
  customer: string
  summary: string
  amount: string
  status: string
  tone: 'draft' | 'review' | 'paid'
  thread: { from: 'in' | 'out'; text: string }[]
  fields: { k: string; v: string; changed?: boolean }[]
  invoice: string
}

const ORDERS: Order[] = [
  {
    id: 'OM-1042',
    customer: 'Riya S.',
    summary: 'Cotton shirt × 2 · Black · M',
    amount: '₹1,099',
    status: 'Awaiting confirmation',
    tone: 'draft',
    thread: [
      { from: 'in', text: 'bhai woh blue wali shirt, size M, 2 pieces bhej do' },
      { from: 'in', text: 'nahi wait, black kar do' },
      { from: 'out', text: 'Black × 2, size M. Bill bheju?' },
    ],
    fields: [
      { k: 'product', v: 'Cotton shirt' },
      { k: 'colour', v: 'Black', changed: true },
      { k: 'size', v: 'M' },
      { k: 'quantity', v: '2' },
      { k: 'unit price', v: '₹499' },
      { k: 'channel', v: 'WhatsApp' },
    ],
    invoice: 'Not generated',
  },
  {
    id: 'OM-1041',
    customer: 'Arjun M.',
    summary: 'Linen kurta × 1 · Ivory · XL',
    amount: '₹2,340',
    status: 'Flagged for review',
    tone: 'review',
    thread: [
      { from: 'in', text: 'ek ivory kurta chahiye XL, wedding ke liye' },
      { from: 'in', text: 'pairing me matching stole bhi hai kya?' },
      { from: 'out', text: 'Stole available — add karna hai?' },
    ],
    fields: [
      { k: 'product', v: 'Linen kurta' },
      { k: 'colour', v: 'Ivory' },
      { k: 'size', v: 'XL' },
      { k: 'quantity', v: '1' },
      { k: 'unit price', v: '₹2,299' },
      { k: 'channel', v: 'Instagram' },
    ],
    invoice: 'Held — needs approval',
  },
  {
    id: 'OM-1039',
    customer: 'Neha T.',
    summary: 'Printed saree × 1 · Green · Free',
    amount: '₹1,860',
    status: 'Paid',
    tone: 'paid',
    thread: [
      { from: 'in', text: 'green wali printed saree bhej do, address same' },
      { from: 'out', text: 'Done — ₹1,860 ka link bhej diya.' },
      { from: 'in', text: 'paid ✅' },
    ],
    fields: [
      { k: 'product', v: 'Printed saree' },
      { k: 'colour', v: 'Green' },
      { k: 'size', v: 'Free size' },
      { k: 'quantity', v: '1' },
      { k: 'unit price', v: '₹1,771' },
      { k: 'channel', v: 'Telegram' },
    ],
    invoice: 'INV-OM-1039 · settled',
  },
]

const CALLOUTS = [
  {
    n: '1',
    pane: 'list' as const,
    t: 'Live order queue',
    d: 'Every active structured order across channels, with customer, line summary, amount and status at a glance.',
  },
  {
    n: '2',
    pane: 'detail' as const,
    t: 'Thread beside extracted fields',
    d: 'The original conversation sits next to the fields it produced, so any value can be traced back to a message.',
  },
  {
    n: '3',
    pane: 'controls' as const,
    t: 'Human-in-the-loop overrides',
    d: 'Edit a field, approve the order, or flag it for review. Nothing ships on the model’s say-so alone.',
  },
  {
    n: '4',
    pane: 'controls' as const,
    t: 'Billing status tracking',
    d: 'Invoice and payment state live on the order, updated automatically when the UPI link settles.',
  },
]

export function Dashboard() {
  const [selected, setSelected] = useState(0)
  const [hot, setHot] = useState<string | null>(null)
  const order = ORDERS[selected]

  const heat = (pane: string) => (hot === pane ? ' is-hot' : '')

  return (
    <>
      <header className="page-head">
        <div className="container">
          <div className="page-head__inner">
            <Reveal effect="fade">
              <span className="eyebrow">Dashboard</span>
            </Reveal>
            <Reveal delay={70}>
              <h1>See every order, structured and under your control</h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede">
                One place where the conversation, the extracted fields and the approval controls
                sit side by side. The AI drafts; you decide what leaves the building.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="btn-row">
                <a href="#dashboard-preview" className="btn btn--primary">
                  Explore the preview
                  <Icon name="arrow-right" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="section section--tight" id="dashboard-preview">
        <div className="container">
          <Reveal className="dash is-annotated">
            <div className="dash__chrome" aria-hidden="true">
              <span className="dash__dot" />
              <span className="dash__dot" />
              <span className="dash__dot" />
              <span className="dash__url">app.ordermind.in/orders</span>
            </div>

            <div className="dash__body">
              {/* left */}
              <div className={`pane pane--list${heat('list')}`}>
                <span className="pane__badge">1</span>
                <div className="pane__title">
                  <span>Active orders</span>
                  <span>{ORDERS.length}</span>
                </div>
                {ORDERS.map((o, i) => (
                  <button
                    key={o.id}
                    type="button"
                    className={`order-item${i === selected ? ' is-selected' : ''}`}
                    onClick={() => setSelected(i)}
                    aria-pressed={i === selected}
                  >
                    <span className="order-item__top">
                      <span>{o.id}</span>
                      <span>{o.amount}</span>
                    </span>
                    <span className="order-item__sub">
                      <span>{o.customer}</span>
                      <span className={`status status--${o.tone}`}>{o.status}</span>
                    </span>
                    <span className="order-item__sub">
                      <span>{o.summary}</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* center */}
              <div className={`pane${heat('detail')}`}>
                <span className="pane__badge">2</span>
                <div className="pane__title">
                  <span>Order detail · {order.id}</span>
                  <span className={`status status--${order.tone}`}>{order.status}</span>
                </div>
                <div className="pane__thread">
                  <ChatThread messages={order.thread} />
                </div>
                <div className="field-grid">
                  {order.fields.map((f) => (
                    <div key={f.k} className={`field-cell${f.changed ? ' is-changed' : ''}`}>
                      <span className="field-cell__k">{f.k}</span>
                      <span className="field-cell__v">{f.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* right */}
              <div className={`pane${heat('controls')}`}>
                <span className="pane__badge">3</span>
                <div className="pane__title">
                  <span>Oversight</span>
                  <Icon name="sliders" size={15} />
                </div>
                <div className="control-stack">
                  <button type="button" className="control control--primary">
                    <Icon name="check" />
                    Confirm order
                  </button>
                  <button type="button" className="control">
                    <Icon name="edit" />
                    Edit extracted field
                  </button>
                  <button type="button" className="control">
                    <Icon name="refresh" />
                    Re-run extraction
                  </button>
                  <button type="button" className="control">
                    <Icon name="flag" />
                    Flag for review
                  </button>
                </div>

                <div className="billing-block">
                  <div className="billing-row">
                    <span>Invoice</span>
                    <span>{order.invoice}</span>
                  </div>
                  <div className="billing-row">
                    <span>Payment</span>
                    <span className={`status status--${order.tone}`}>
                      {order.tone === 'paid' ? 'UPI settled' : 'Link pending'}
                    </span>
                  </div>
                  <div className="billing-row">
                    <span>Revision</span>
                    <span>v2 · 10:31</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="callouts">
            {CALLOUTS.map((c, i) => (
              <Reveal
                key={c.n}
                delay={i * 90}
                className="callout"
                onMouseEnter={() => setHot(c.pane)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(c.pane)}
                onBlur={() => setHot(null)}
                tabIndex={0}
              >
                <span className="callout__n">{c.n}</span>
                <span>
                  <span className="callout__t">{c.t}</span>
                  <span className="callout__d">{c.d}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Request dashboard access"
        lede="Early access includes a guided setup of your catalogue, your channels and your approval rules."
        buttonLabel="Request access"
        to="/contact"
      />
    </>
  )
}
