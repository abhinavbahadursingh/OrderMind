import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHead, CTABand } from '../components/CTABand'
import { Pipeline } from '../components/Pipeline'
import { HeroVisual } from '../components/HeroVisual'
import { OrderCard } from '../components/Mocks'
import { Icon } from '../components/Icons'

const PIPELINE = [
  {
    title: 'Raw Chat',
    icon: 'chat' as const,
    description: 'Messages arrive exactly as customers type them — messy, code-mixed, unstructured.',
  },
  {
    title: 'NLU & Extraction',
    icon: 'spark' as const,
    description: 'Product, colour, size, quantity and intent are pulled out of the sentence.',
  },
  {
    title: 'Order State',
    icon: 'layers' as const,
    description: 'A single order object persists and updates across every turn of the thread.',
  },
  {
    title: 'Auto-Bill',
    icon: 'receipt' as const,
    description: 'A priced, tax-aware invoice is generated the moment the order settles.',
  },
  {
    title: 'Payment',
    icon: 'card' as const,
    description: 'A UPI-ready payment link returns to the same conversation, already reconciled.',
  },
]

const CAPABILITIES = [
  {
    icon: 'globe' as const,
    title: 'Hinglish understanding',
    body: 'Built for Hindi-English code-mixed speech — “bhai woh blue wali shirt, size M, 2 pieces bhej do” parses as cleanly as formal English.',
    tag: 'Code-mixed NLU',
  },
  {
    icon: 'edit' as const,
    title: 'Incremental order editing',
    body: '“Change black to blue”, “make it 3”, “remove item 2” — coreference resolution maps each edit onto the right line of the live order.',
    tag: 'Dialogue state',
  },
  {
    icon: 'tag' as const,
    title: 'Catalog-grounded recommendations',
    body: 'Suggestions only ever come from your real catalogue, with live price and stock, so nothing is invented in the chat.',
    tag: 'Your catalog',
  },
  {
    icon: 'receipt' as const,
    title: 'Automated billing',
    body: 'Line items, discounts and GST resolve into a clean invoice the moment the customer confirms — no spreadsheet, no re-typing.',
    tag: 'Zero re-entry',
  },
  {
    icon: 'dashboard' as const,
    title: 'Dashboard with oversight',
    body: 'Every structured order lands in a seller dashboard where a human can edit a field, approve, or flag it for review before anything ships.',
    tag: 'Human-in-the-loop',
  },
  {
    icon: 'plug' as const,
    title: 'Official API integrations',
    body: 'Connected through the WhatsApp Business, Instagram Messaging and Telegram Bot APIs — reliable, ToS-compliant, and never scraping.',
    tag: 'No scraping',
  },
]

const MESSY = [
  'bhai blue wali shirt bhejna size M',
  'haan 2 piece',
  'wait black kar do na',
  'L bhi chalega agar M nahi hai',
  'kitna hua total?',
  'kal tak bhej dena please 🙏',
]

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <Reveal effect="fade">
              <span className="pill pill--accent">
                <span className="pill__dot" />
                India-first chat commerce
              </span>
            </Reveal>

            <Reveal delay={80} effect="fade">
              <h1 className="font-blue">
                <span className="hw" style={{ '--wi': 0 } as CSSProperties}>
                  Your
                </span>{' '}
                <span className="hw" style={{ '--wi': 1 } as CSSProperties}>
                  chats.
                </span>{' '}
                <span className="hw" style={{ '--wi': 2 } as CSSProperties}>
                  <em>Automatically</em>
                </span>{' '}
                <span className="hw" style={{ '--wi': 3 } as CSSProperties}>
                  structured
                </span>{' '}
                <span className="hw" style={{ '--wi': 4 } as CSSProperties}>
                  orders.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="lede">
                OrderMind reads your WhatsApp, Instagram and Telegram conversations, keeps a live
                structured order for every customer, and bills them — while you keep the final say.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="btn-row">
                <Link to="/stats" className="btn btn--primary btn--lg">
                  See Stats
                  <Icon name="arrow-right" />
                </Link>
                <Link to="/dashboard" className="btn btn--secondary btn--lg">
                  Try the Demo
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320} effect="fade">
              <div className="btn-row" style={{ gap: '18px', color: 'var(--text-faint)' }}>
                <span className="contact-line" style={{ fontSize: '0.875rem' }}>
                  <Icon name="shield" />
                  Official APIs only
                </span>
                <span className="contact-line" style={{ fontSize: '0.875rem' }}>
                  <Icon name="rupee" />
                  UPI-ready billing
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="hero__visual">
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* Problem framing */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="problem" data-glare>
            <div className="problem__grid">
              <div>
                <span className="eyebrow">The real problem</span>
                <p className="problem__statement" style={{ marginTop: '16px' }}>
                  Reading a chat to build a bill is a translation problem — not a UI problem.
                </p>
                <p className="problem__note">
                  Sellers are doing NLU and state-tracking in their heads, then re-typing the result
                  into a billing app. Every correction starts the whole loop again.
                </p>
              </div>

              <div className="ba">
                <div className="ba__panel">
                  <h4>What the seller reads</h4>
                  <div className="ba__messy">
                    {MESSY.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="ba__arrow">
                  <Icon name="arrow-right" />
                </div>

                <div className="ba__panel">
                  <h4>What OrderMind keeps</h4>
                  <OrderCard
                    id="Order #OM-1042"
                    status="In sync"
                    statusTone="draft"
                    lines={[
                      {
                        name: 'Cotton shirt',
                        qty: 2,
                        price: '₹1,198',
                        meta: ['Black → confirmed', 'Size L'],
                      },
                    ]}
                    total="₹1,198"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Condensed pipeline */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="Five steps between a message and money in the bank"
            lede="The same pipeline runs on every conversation, continuously — not once at checkout."
          />
          <Pipeline steps={PIPELINE} label="OrderMind pipeline overview" />
          <Reveal
            delay={400}
            style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}
          >
            <Link to="/how-it-works" className="btn btn--secondary">
              Walk through the full pipeline
              <Icon name="arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Core capabilities"
            title="Everything a seller does in their head, made explicit"
            lede="Six capabilities that turn an informal conversation into an operational order."
          />

          <div className="grid grid--3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 100} className="card card--hover feature-card">
                <span className="card__icon">
                  <Icon name={c.icon} />
                </span>
                <h3 className="card__title">{c.title}</h3>
                <p className="card__body">{c.body}</p>
                <span className="feature-card__tag">{c.tag}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / context */}
      <section className="section section--tight">
        <div className="container">
          <SectionHead
            center
            eyebrow="Trust & context"
            title="Built where Indian sellers already sell"
            lede="Connected through official platform APIs and settled over UPI — reliable, compliant, and auditable end to end."
          />

          <Reveal className="trust-row" effect="fade">
            <span className="trust-item">
              <Icon name="whatsapp" />
              WhatsApp Business API
            </span>
            <span className="trust-item">
              <Icon name="instagram" />
              Instagram Messaging API
            </span>
            <span className="trust-item">
              <Icon name="telegram" />
              Telegram Bot API
            </span>
            <span className="trust-item">
              <Icon name="rupee" />
              UPI-first payments
            </span>
            <span className="trust-item">
              <Icon name="shield" />
              ToS-compliant, no scraping
            </span>
          </Reveal>
        </div>
      </section>

      {/* Social proof placeholder */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="pull-quote">
            <p>
              “Earlier I would scroll back twenty messages to figure out who ordered what. Now the
              order is already sitting in my dashboard, and I just approve it.”
            </p>
            <footer>
              Sample testimonial placeholder — replace with a verified seller quote before launch.
            </footer>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
