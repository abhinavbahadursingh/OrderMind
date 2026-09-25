import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { SectionHead, CTABand } from '../components/CTABand'
import { Pipeline } from '../components/Pipeline'
import { ChatThread, OrderCard, StatePanel, Invoice } from '../components/Mocks'
import { Icon } from '../components/Icons'

const STAGES = [
  {
    title: 'Ingest',
    icon: 'chat' as const,
    description: 'Every message from every channel lands in one stream.',
  },
  {
    title: 'Extract',
    icon: 'spark' as const,
    description: 'Entities and intent are pulled from code-mixed sentences.',
  },
  {
    title: 'Structure',
    icon: 'layers' as const,
    description: 'The conversation resolves into a live order object.',
  },
  {
    title: 'Revise',
    icon: 'edit' as const,
    description: 'Corrections patch the same order instead of starting over.',
  },
  {
    title: 'Bill',
    icon: 'receipt' as const,
    description: 'Priced, taxed invoice generated automatically.',
  },
  {
    title: 'Collect',
    icon: 'card' as const,
    description: 'UPI link returns to the chat and reconciles itself.',
  },
]

const ENTITIES = [
  { k: 'product', v: 'Cotton shirt' },
  { k: 'color', v: 'Blue' },
  { k: 'size', v: 'M' },
  { k: 'quantity', v: '2' },
  { k: 'channel', v: 'WhatsApp' },
  { k: 'intent', v: 'confirm_order' },
]

export function HowItWorks() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <div className="page-head__inner">
            <Reveal effect="fade">
              <span className="eyebrow">How it works</span>
            </Reveal>
            <Reveal delay={70}>
              <h1>Six stages between a message and a settled payment</h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede">
                The same pipeline runs on every turn of every conversation. Nothing is entered
                twice, and nothing is remembered only in someone&rsquo;s head.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container">
          <Pipeline steps={STAGES} label="OrderMind processing stages" />
        </div>
      </section>

      {/* Stage 1 */}
      <section className="section section--tight">
        <div className="container">
          <div className="stage">
            <div className="stage__copy">
              <span className="stage__num">Stage 01</span>
              <Reveal>
                <h2>Raw conversation ingestion</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="stage__body">
                  Nothing is pre-formatted. Customers type the way they message — abbreviations,
                  code-mixed Hindi and English, emoji, voice-note transcripts. OrderMind ingests the
                  thread exactly as it arrives through the official platform API.
                </p>
              </Reveal>
              <Reveal delay={140} effect="fade">
                <div className="btn-row">
                  <span className="chip">WhatsApp</span>
                  <span className="chip">Instagram DM</span>
                  <span className="chip">Telegram</span>
                </div>
              </Reveal>
            </div>

            <Reveal className="stage__visual" delay={120}>
              <div className="stage__frame">
                <div className="hv__label">
                  <span>Thread · Riya S.</span>
                  <span>10:24</span>
                </div>
                <ChatThread
                  messages={[
                    {
                      from: 'in',
                      text: 'bhai woh blue wali shirt, size M, 2 pieces bhej do',
                      meta: 'Riya · 10:24',
                    },
                    {
                      from: 'out',
                      text: 'Ji, note kar liya. Confirm kar dein?',
                      meta: 'OrderMind · 10:24',
                    },
                    {
                      from: 'in',
                      text: 'haan aur kal tak aa jayega na?',
                      meta: 'Riya · 10:25',
                    },
                  ]}
                />
              </div>
            </Reveal>
          </div>

          {/* Stage 2 */}
          <div className="stage stage--flip">
            <div className="stage__copy">
              <span className="stage__num">Stage 02</span>
              <Reveal>
                <h2>Entity &amp; intent extraction</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="stage__body">
                  The sentence is decomposed into the fields an order actually needs: product,
                  colour, size, quantity, channel and intent. Hinglish phrases such as{' '}
                  <strong>“2 pieces bhej do”</strong> resolve to quantity and fulfilment intent —
                  not to a keyword match.
                </p>
              </Reveal>
            </div>

            <Reveal className="stage__visual" delay={120}>
              <div className="stage__frame">
                <div className="hv__label">
                  <span>Extracted entities</span>
                  <span className="pill pill--accent">6 found</span>
                </div>
                <ChatThread
                  messages={[
                    {
                      from: 'in',
                      text: 'bhai woh blue wali shirt, size M, 2 pieces bhej do',
                      marks: ['blue', 'size M', '2 pieces'],
                    },
                  ]}
                />
                <div className="field-grid">
                  {ENTITIES.map((e) => (
                    <div className="field-cell" key={e.k}>
                      <span className="field-cell__k">{e.k}</span>
                      <span className="field-cell__v">{e.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stage 3 */}
          <div className="stage">
            <div className="stage__copy">
              <span className="stage__num">Stage 03</span>
              <Reveal>
                <h2>Structured order state</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="stage__body">
                  Extracted entities are written into one persistent order object scoped to the
                  customer. It is the single source of truth for the dashboard, the invoice and the
                  payment link — and it survives across turns, days and channels.
                </p>
              </Reveal>
            </div>

            <Reveal className="stage__visual" delay={120}>
              <div className="stage__frame">
                <StatePanel
                  lines={[
                    '{',
                    '  "order_id": "OM-1042",',
                    '  "customer": "Riya S.",',
                    '  "channel": "whatsapp",',
                    '  "items": [',
                    '    { "product": "Cotton shirt", "color": "Blue",',
                    '      "size": "M", "qty": 2, "unit_price": 499 }',
                    '  ],',
                    '  "status": "awaiting_confirmation"',
                    '}',
                  ]}
                />
                <OrderCard
                  id="Order #OM-1042"
                  status="Awaiting confirmation"
                  statusTone="draft"
                  lines={[
                    {
                      name: 'Cotton shirt',
                      qty: 2,
                      price: '₹998',
                      meta: ['Blue', 'Size M'],
                    },
                  ]}
                  total="₹998"
                />
              </div>
            </Reveal>
          </div>

          {/* Stage 4 */}
          <div className="stage stage--flip">
            <div className="stage__copy">
              <span className="stage__num">Stage 04</span>
              <Reveal>
                <h2>Incremental modification</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="stage__body">
                  A correction is not a new order. <strong>“nahi wait, black kar do”</strong>{' '}
                  resolves the implicit reference to the shirt already on the table, patches the
                  colour field, and re-prices the line — the diff is visible in the state, not
                  buried in the transcript.
                </p>
              </Reveal>
            </div>

            <Reveal className="stage__visual" delay={120}>
              <div className="stage__frame">
                <ChatThread
                  messages={[
                    {
                      from: 'in',
                      text: 'nahi wait, black kar do',
                      marks: ['black'],
                      meta: 'Riya · 10:31',
                    },
                  ]}
                />
                <OrderCard
                  id="Order #OM-1042"
                  status="Field updated"
                  statusTone="draft"
                  lines={[
                    {
                      name: 'Cotton shirt',
                      qty: 2,
                      price: '₹998',
                      meta: ['Blue → Black', 'Size M'],
                      updated: true,
                    },
                  ]}
                  total="₹998"
                />
                <StatePanel
                  lines={[
                    '  "items": [',
                    '    { "product": "Cotton shirt",',
                    { text: '      "color": "Black",', changed: true },
                    '      "size": "M", "qty": 2, "unit_price": 499 }',
                    '  ],',
                    { text: '  "revision": 2', changed: true },
                  ]}
                />
              </div>
            </Reveal>
          </div>

          {/* Stage 5 */}
          <div className="stage">
            <div className="stage__copy">
              <span className="stage__num">Stage 05</span>
              <Reveal>
                <h2>Auto-bill generation</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="stage__body">
                  Once the seller confirms, the order state is rendered into an invoice — line
                  items, discounts, GST and totals — with no second data entry step. Prices come
                  from the catalogue, so the bill and the chat never disagree.
                </p>
              </Reveal>
              <Reveal delay={140} effect="fade">
                <Link to="/features" className="btn btn--secondary">
                  See billing features
                  <Icon name="arrow-right" />
                </Link>
              </Reveal>
            </div>

            <Reveal className="stage__visual" delay={120}>
              <div className="stage__frame">
                <Invoice
                  invoiceNo="INV-OM-1042"
                  customer="Riya S."
                  rows={[
                    { item: 'Cotton shirt · Black · M', qty: 2, amount: '₹998' },
                    { item: 'Delivery (Delhi NCR)', qty: 1, amount: '₹49' },
                  ]}
                  subtotal="₹1,047"
                  tax="₹52"
                  total="₹1,099"
                />
              </div>
            </Reveal>
          </div>

          {/* Stage 6 */}
          <div className="stage stage--flip">
            <div className="stage__copy">
              <span className="stage__num">Stage 06</span>
              <Reveal>
                <h2>Payment</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="stage__body">
                  A UPI-ready payment link is generated against that invoice and returned into the
                  same thread. When it settles, the order status updates itself — no reconciling a
                  separate payment app against a spreadsheet.
                </p>
              </Reveal>
            </div>

            <Reveal className="stage__visual" delay={120}>
              <div className="stage__frame">
                <div className="upi-card">
                  <span className="upi-card__icon">
                    <Icon name="rupee" />
                  </span>
                  <div>
                    <div style={{ fontWeight: 500 }}>UPI request · ₹1,099</div>
                    <div className="muted" style={{ fontSize: '0.875rem' }}>
                      ordermind@upi · valid for 24 hours
                    </div>
                  </div>
                </div>
                <ChatThread
                  messages={[
                    {
                      from: 'out',
                      text: 'Bill ready: ₹1,099. Pay kar dijiye — link neeche.',
                      meta: 'OrderMind · 10:33',
                    },
                    {
                      from: 'in',
                      text: 'done, check kar lo',
                      meta: 'Riya · 10:35',
                    },
                  ]}
                />
                <OrderCard
                  id="Order #OM-1042"
                  status="Paid"
                  statusTone="paid"
                  lines={[
                    {
                      name: 'Cotton shirt',
                      qty: 2,
                      price: '₹998',
                      meta: ['Black', 'Size M'],
                    },
                  ]}
                  total="₹1,099"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Coreference */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Reference resolution"
            title="“It”, “that”, “change X to Y” — tracked across turns"
            lede="Dialogue-state tracking keeps one order per customer per thread, so pronouns and short corrections resolve against the order that is already on the table."
          />

          <div className="coref">
            <Reveal>
              <ChatThread
                messages={[
                  { from: 'in', text: 'bhai woh blue wali shirt, size M, 2 pieces bhej do' },
                  { from: 'out', text: 'Blue shirt × 2, size M — updated.' },
                  { from: 'in', text: 'nahi wait, black kar do', marks: ['black'] },
                  { from: 'in', text: 'iska size L kar dena', marks: ['iska', 'L'] },
                  { from: 'in', text: 'aur ek aur add kar do', marks: ['ek aur'] },
                ]}
              />
            </Reveal>

            <div className="coref__notes">
              {[
                {
                  n: '1',
                  t: '“black kar do”',
                  d: 'No product named. The resolver attaches it to the only active line item — Cotton shirt — and rewrites colour from Blue to Black.',
                },
                {
                  n: '2',
                  t: '“iska size L”',
                  d: 'Hindi genitive “iska” binds to the same line. Quantity and price are untouched; only the size field changes, and revision increments.',
                },
                {
                  n: '3',
                  t: '“ek aur add kar do”',
                  d: 'Bare quantifier resolves against the catalogue context and proposes a matching line for the seller to approve — it never silently invents stock.',
                },
                {
                  n: '4',
                  t: 'What stays constant',
                  d: 'order_id OM-1042, customer identity and channel remain stable across every revision, so the invoice and the dashboard always agree.',
                },
              ].map((note, i) => (
                <Reveal key={note.n} delay={i * 90} className="note">
                  <span className="note__mark">{note.n}</span>
                  <span className="note__text">
                    <strong>{note.t}</strong> — {note.d}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="See the pipeline on your own catalogue"
        lede="Bring a real conversation and a product list — we will walk the six stages end to end on your data."
        buttonLabel="Book a walkthrough"
        to="/features"
      />
    </>
  )
}
