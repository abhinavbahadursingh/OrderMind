import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
  id,
}: {
  eyebrow: string
  title: string
  lede?: string
  center?: boolean
  id?: string
}) {
  return (
    <Reveal
      className={`section-head${center ? ' section-head--center' : ''}`}
      id={id}
      effect="fade"
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </Reveal>
  )
}

export function CTABand({
  title = 'Get early access',
  lede = 'Join the early access list and we will set up OrderMind on your WhatsApp Business number in a single call.',
  buttonLabel = 'Request access',
  to = '/contact',
}: {
  title?: string
  lede?: string
  buttonLabel?: string
  to?: string
}) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
  }

  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal className="cta-band">
          <div className="cta-band__inner">
            <span className="eyebrow">Early access</span>
            <h2>{title}</h2>
            <p className="lede" style={{ textAlign: 'center' }}>
              {lede}
            </p>

            <form className="cta-form" onSubmit={onSubmit} noValidate>
              <label className="sr-only" htmlFor="cta-email">
                Work email
              </label>
              <input
                id="cta-email"
                className="input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@yourshop.in"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSent(false)
                }}
                required
              />
              <button className="btn btn--primary" type="submit">
                {buttonLabel}
              </button>
            </form>

            <p className="cta-note" role="status">
              {sent
                ? 'Thanks — you are on the list. We will reach out within a working day.'
                : 'No credit card. Demo on your own catalogue.'}
            </p>

            <Link to={to} className="btn btn--secondary">
              Talk to us first
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
