import { Reveal } from '../components/Reveal'
import { SectionHead, CTABand } from '../components/CTABand'
import { Icon } from '../components/Icons'

const AUDIENCE = [
  {
    icon: 'store' as const,
    title: 'SME sellers in chat commerce',
    body: 'Businesses that already close sales inside WhatsApp groups, Instagram DMs and Telegram channels — with no storefront and no order form in between.',
  },
  {
    icon: 'globe' as const,
    title: 'India-first, Hinglish-speaking',
    body: 'Customers message the way they talk. The system is built for code-mixed Hindi-English, rupee pricing and UPI settlement from day one.',
  },
  {
    icon: 'user' as const,
    title: 'Small teams, many threads',
    body: 'One or two people handling hundreds of conversations, where reading every message twice is the difference between growing and drowning.',
  },
]

const APPROACH = [
  { k: 'NLU', v: 'Understand the sentence, including code-mixed Hindi-English.' },
  { k: 'State', v: 'Keep one persistent, versioned order per customer and thread.' },
  { k: 'Recommendation', v: 'Suggest only from the real catalogue, with live price and stock.' },
  { k: 'Billing', v: 'Render the state into a priced, tax-aware invoice.' },
  { k: 'Payment', v: 'Return a UPI link to the same chat and reconcile automatically.' },
]

export function About() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <div className="page-head__inner">
            <Reveal effect="fade">
              <span className="eyebrow">About / Why</span>
            </Reveal>
            <Reveal delay={70}>
              <h1>Sellers were never given an order system. They were given a chat app.</h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede">
                OrderMind exists because the hardest part of selling in a conversation is not the
                selling — it is remembering, structuring and billing what was just agreed.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* The problem */}
      <section className="section section--tight">
        <div className="container split split--wide-left">
          <div>
            <Reveal effect="fade">
              <span className="eyebrow">The problem</span>
            </Reveal>
            <Reveal>
              <div className="prose" style={{ marginTop: '20px' }}>
                <p>
                  A typical seller opens WhatsApp in the morning to a wall of messages. Somewhere
                  in there is <strong>an order</strong> — split across four bubbles, corrected
                  twice, half of it in Hindi and half in English.
                </p>
                <p>
                  So the seller reads the thread, holds the product, colour, size and quantity in
                  their head, and re-types it into a billing app. When the customer changes their
                  mind at message number nine, the whole loop starts again.
                </p>
                <p>
                  Multiply that by a hundred conversations a day and you have a job that does not
                  scale — not because sellers are slow, but because{' '}
                  <strong>the work is being done by hand that software should be doing</strong>.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="problem" style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
              <div className="stats">
                <div className="stat">
                  <div className="stat__value">4–9</div>
                  <div className="stat__label">
                    messages it typically takes to settle one order
                  </div>
                </div>
                <div className="stat">
                  <div className="stat__value">2×</div>
                  <div className="stat__label">
                    times the same details get read, then re-typed
                  </div>
                </div>
                <div className="stat">
                  <div className="stat__value">0</div>
                  <div className="stat__label">
                    durable records left behind by the conversation
                  </div>
                </div>
              </div>
              <p className="problem__note" style={{ marginTop: '18px' }}>
                Illustrative framing for the problem narrative — replace with measured figures once
                early-access data is available.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The insight */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="pull-quote">
            <p>
              The failure is not that sellers lack a form to fill in. It is that a conversation is
              a <strong>state-tracking problem</strong> — and nobody gave them a machine that
              tracks it.
            </p>
            <footer>The insight behind OrderMind</footer>
          </Reveal>

          <div className="split" style={{ marginTop: 'clamp(28px, 4vw, 48px)' }}>
            <Reveal>
              <div className="prose">
                <p>
                  Forms assume the customer already knows what they are buying and will enter it
                  once, cleanly. Real conversations do the opposite: they <em>build</em> the order
                  incrementally, out of order, across days, in two languages at once.
                </p>
                <p>
                  So the right layer is not another UI. It is an agent that reads the thread,
                  maintains the order as a live object, and hands a structured result back to the
                  seller — with the human deciding what is finally confirmed.
                </p>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="stage__frame" style={{ position: 'relative' }}>
                <div className="pane__title">
                  <span>The agent layer</span>
                  <Icon name="spark" size={15} />
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {APPROACH.map((a) => (
                    <li key={a.k} className="note">
                      <span className="note__mark">
                        <Icon name="check" size={14} />
                      </span>
                      <span className="note__text">
                        <strong>{a.k}</strong> — {a.v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Who it's for"
            title="Built for the sellers who already sell in chat"
            lede="Not a migration project and not a new marketplace — an intelligence layer on top of the channels people already use."
          />

          <div className="grid grid--3">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.title} delay={i * 100} className="card card--hover">
                <span className="card__icon">
                  <Icon name={a.icon} />
                </span>
                <h3 className="card__title">{a.title}</h3>
                <p className="card__body">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The approach */}
      <section className="section section--tight">
        <div className="container split split--wide-right">
          <Reveal>
            <span className="eyebrow">The approach</span>
            <h2 style={{ marginTop: '18px' }}>An agentic layer, not a scraping bot</h2>
            <div className="prose" style={{ marginTop: '18px', fontSize: '1.0625rem' }}>
              <p>
                OrderMind connects through the{' '}
                <strong>WhatsApp Business API, Instagram Messaging API and Telegram Bot API</strong>{' '}
                — official, documented, webhook-driven endpoints. That makes it reliable under
                load, safe to build a business on, and compliant with each platform&rsquo;s terms.
              </p>
              <p>
                On top of that sits a five-part agent: NLU, persistent order state,
                catalog-grounded recommendation, billing and payment. Each stage is inspectable,
                and every consequential action is gated by a human in the dashboard.
              </p>
            </div>
            <div className="btn-row" style={{ marginTop: '24px' }}>
              <span className="chip">
                <Icon name="shield" size={14} /> No scraping
              </span>
              <span className="chip">
                <Icon name="rupee" size={14} /> UPI-first
              </span>
              <span className="chip">
                <Icon name="sliders" size={14} /> Human override
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="cta-band" style={{ textAlign: 'left' }}>
              <div className="cta-band__inner" style={{ alignItems: 'flex-start', margin: 0 }}>
                <span className="eyebrow">Mission</span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 1.1rem + 1.4vw, 2.125rem)' }}>
                  Give every small seller the back office that big brands take for granted.
                </h2>
                <p className="lede">
                  Structured orders, honest invoices and a clear record — available to a
                  two-person shop selling in a WhatsApp group, not just to enterprises with ERP
                  budgets.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
