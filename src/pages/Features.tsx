import { Reveal } from '../components/Reveal'
import { SectionHead, CTABand } from '../components/CTABand'
import { Icon } from '../components/Icons'

const FEATURES = [
  {
    icon: 'globe' as const,
    title: 'Hinglish & code-mixed understanding',
    body: 'Trained for Hindi-English code-mixed customer speech, not just formal English. Slang, abbreviations, transliterated Hindi and emoji all resolve into the same structured fields.',
    tag: 'NLU',
  },
  {
    icon: 'layers' as const,
    title: 'Dialogue-state tracking',
    body: 'One persistent order object lives alongside the conversation across turns, days and channels. Nothing is re-read from scratch, and nothing is lost when the thread gets long.',
    tag: 'State',
  },
  {
    icon: 'edit' as const,
    title: 'Incremental edits & corrections',
    body: '“Change black to blue”, “make it 3”, “remove item 2” — coreference resolution maps each short correction onto the right line and re-prices it, keeping a revision history.',
    tag: 'Corrections',
  },
  {
    icon: 'tag' as const,
    title: 'Catalog-grounded recommendations',
    body: 'Suggestions, alternatives and upsells are drawn only from your own catalogue with live price and stock, so the model can never promise something you do not sell.',
    tag: 'Recommendations',
  },
  {
    icon: 'receipt' as const,
    title: 'Automated invoice generation',
    body: 'The confirmed order state renders directly into a clean, tax-aware invoice — line items, discounts, GST and totals — with zero second data entry.',
    tag: 'Billing',
  },
  {
    icon: 'rupee' as const,
    title: 'UPI-first payment integration',
    body: 'A payment link is generated against the invoice and returned into the same chat. Settlement updates the order status automatically, so reconciliation is never manual.',
    tag: 'Payments',
  },
  {
    icon: 'dashboard' as const,
    title: 'Seller dashboard with overrides',
    body: 'Every structured order is visible, editable and approvable. Edit any extracted field, confirm, or flag for review — the AI proposes, the seller decides.',
    tag: 'Human in the loop',
  },
  {
    icon: 'plug' as const,
    title: 'Official platform integrations',
    body: 'WhatsApp Business API, Instagram Messaging API and Telegram Bot API. Webhook-driven, rate-limit aware, and dependent on nothing that can be blocked overnight.',
    tag: 'Integrations',
  },
  {
    icon: 'shield' as const,
    title: 'Security & ToS-compliant by design',
    body: 'No credential sharing, no browser scraping, no grey-area automation. Conversations are processed over official endpoints with scoped access and audit trails.',
    tag: 'Compliance',
  },
]

const BEFORE = [
  'Scroll back through the thread to rebuild what was ordered',
  'Hold quantities, sizes and colours in working memory',
  'Re-type everything into a billing app or spreadsheet',
  'Start over whenever the customer changes their mind',
  'Chase payment in a separate app and reconcile by hand',
  'Miss edits that were buried three messages ago',
]

const AFTER = [
  'A structured order already exists before you open the chat',
  'Every field extracted, timestamped and versioned',
  'Invoice generated from the same state, priced from the catalog',
  'Corrections patch the order and show an explicit diff',
  'UPI link returns to the thread and reconciles itself',
  'A human approves, edits or flags before anything ships',
]

export function Features() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <div className="page-head__inner">
            <Reveal effect="fade">
              <span className="eyebrow">Features</span>
            </Reveal>
            <Reveal delay={70}>
              <h1>Everything sellers need, built into the conversation</h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede">
                Nine capabilities that carry an order from an informal message to a paid,
                invoiced, auditable record — without asking anyone to learn a new tool.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3">
            {FEATURES.map((f, i) => (
              <Reveal
                key={f.title}
                delay={(i % 3) * 100}
                className="card card--hover feature-card"
              >
                <span className="card__icon">
                  <Icon name={f.icon} />
                </span>
                <h3 className="card__title">{f.title}</h3>
                <p className="card__body">{f.body}</p>
                <span className="feature-card__tag">{f.tag}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Before & after"
            title="Manual process vs. OrderMind"
            lede="Same conversation, two very different afternoons."
          />

          <Reveal className="compare">
            <div className="compare__col">
              <h3 className="compare__title">Manual process</h3>
              <ul className="compare__list">
                {BEFORE.map((item) => (
                  <li key={item} className="is-bad">
                    <Icon name="close" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="compare__divider">vs</div>

            <div className="compare__col compare__col--after">
              <h3 className="compare__title">With OrderMind</h3>
              <ul className="compare__list">
                {AFTER.map((item) => (
                  <li key={item} className="is-good">
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Put the pipeline to work"
        lede="Tell us which channels you sell on and we will show you the same conversation processed live."
        buttonLabel="Get early access"
        to="/contact"
      />
    </>
  )
}
