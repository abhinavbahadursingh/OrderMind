import { useEffect, useState } from 'react'
import { Icon } from './Icons'
import { OrderCard } from './Mocks'

const LOOP_MS = 700
const LAST_STEP = 5

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function HeroVisual() {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? 4 : 0))

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % (LAST_STEP + 1)), LOOP_MS)
    return () => window.clearInterval(id)
  }, [])

  const running = step <= 4
  const classes = [
    'hv',
    running ? 'is-chat' : '',
    step >= 1 && step <= 4 ? 'is-marks' : '',
    step >= 2 && step <= 4 ? 'is-link' : '',
    step >= 3 && step <= 4 ? 'is-order' : '',
    step === 4 ? 'is-bill' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} data-motion="always" aria-hidden="true">
      <div className="hv__label">
        <span>Incoming chat</span>
        <span className="pill pill--accent">
          <span className="pill__dot" />
          live
        </span>
      </div>

      <div className="hv__stack">
        <div className="hv__thread">
          <div className="bubble bubble--in">
            <span>
              bhai woh <mark>blue</mark> wali shirt, <mark>size M</mark>, <mark>2 pieces</mark>{' '}
              bhej do
            </span>
            <span className="bubble__meta">Riya · WhatsApp · 10:24</span>
          </div>
          <div className="bubble bubble--out">
            <span>Haan, order update kar diya. Bill bheju?</span>
            <span className="bubble__meta">Auto-reply · 10:24</span>
          </div>
        </div>

        <div className="hv__link">
          <span className="hv__pulse" />
          <span className="hv__wire" />
          <span>nlu → state → bill</span>
        </div>

        <div className="hv__order">
          <OrderCard
            id="Order #OM-1042"
            status={step === 4 ? 'Invoice sent' : 'Draft'}
            statusTone={step === 4 ? 'paid' : 'draft'}
            lines={[
              {
                name: 'Cotton shirt',
                qty: 2,
                price: '₹1,198',
                meta: ['Blue', 'Size M'],
                updated: step >= 3,
              },
            ]}
            total="₹1,198"
          />
          <div className="hv__sent" style={{ marginTop: '12px' }}>
            <Icon name="check" />
            <span>UPI bill sent to Riya</span>
          </div>
        </div>
      </div>
    </div>
  )
}
