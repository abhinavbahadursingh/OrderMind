import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { CTABand } from '../components/CTABand'
import { Icon } from '../components/Icons'
import type { IconName } from '../components/Icons'

const PLATFORMS: { id: string; label: string; icon: IconName; method: string }[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'whatsapp',
    method:
      'Connected through the WhatsApp Business Cloud API. You register a number, we subscribe to message webhooks, and replies are sent over the same verified endpoint.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: 'instagram',
    method:
      'Connected through the Instagram Messaging API on a Facebook app. DMs arrive as page events, so the same order state machine runs on your inbox.',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    icon: 'telegram',
    method:
      'Connected with an official Bot API token. The bot joins your sales flow, receives updates by long poll or webhook, and answers in-thread.',
  },
]

export function Contact() {
  const [platforms, setPlatforms] = useState<string[]>(['whatsapp'])
  const [sent, setSent] = useState(false)

  const toggle = (id: string) =>
    setPlatforms((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <header className="page-head">
        <div className="container">
          <div className="page-head__inner">
            <Reveal effect="fade">
              <span className="eyebrow">Get started</span>
            </Reveal>
            <Reveal delay={70}>
              <h1>Bring OrderMind to your chats</h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede">
                Tell us how you sell today. We will set up an official connection, load your
                catalogue, and walk a live conversation through the pipeline with you.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container contact-grid">
          <Reveal className="form-panel">
            <form className="form-panel__rows" onSubmit={onSubmit} noValidate={sent}>
              <div className="form-panel__grid">
                <div className="field">
                  <label className="field__label" htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="input"
                    autoComplete="name"
                    placeholder="Riya Sharma"
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="business">
                    Business name
                  </label>
                  <input
                    id="business"
                    name="business"
                    className="input"
                    autoComplete="organization"
                    placeholder="Sharma Textiles"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <span className="field__label" id="platforms-label">
                  Platform(s) you sell on
                </span>
                <div className="check-row" role="group" aria-labelledby="platforms-label">
                  {PLATFORMS.map((p) => (
                    <label className="check" key={p.id}>
                      <input
                        type="checkbox"
                        name="platform"
                        value={p.id}
                        checked={platforms.includes(p.id)}
                        onChange={() => toggle(p.id)}
                      />
                      <Icon name={p.icon} size={16} />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  autoComplete="email"
                  placeholder="you@yourshop.in"
                  required
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="message">
                  What would you like to solve first?
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="textarea"
                  placeholder="We handle about 80 WhatsApp orders a day and bill them manually in Excel."
                />
              </div>

              <div className="btn-row">
                <button className="btn btn--primary btn--lg" type="submit">
                  Send request
                  <Icon name="arrow-right" />
                </button>
                <span className="form-status" role="status">
                  {sent ? 'Received — we will reply within one working day.' : ''}
                </span>
              </div>
            </form>
          </Reveal>

          <div className="contact-aside">
            <Reveal delay={90} className="card card--flat">
              <h3 className="card__title">Prefer to talk first?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
                <span className="contact-line">
                  <Icon name="mail" />
                  <a href="mailto:hello@ordermind.app">hello@ordermind.app</a>
                </span>
                <span className="contact-line">
                  <Icon name="calendar" />
                  <a href="mailto:hello@ordermind.app?subject=OrderMind%20demo%20call">
                    Book a 20-minute demo call
                  </a>
                </span>
                <span className="contact-line">
                  <Icon name="clock" />
                  Mon–Fri, 10:00–19:00 IST
                </span>
              </div>
            </Reveal>

            <Reveal delay={150} className="card card--flat">
              <h3 className="card__title">What setup looks like</h3>
              <p className="card__body">
                A single call to connect your channel officially, a catalogue import, then a
                supervised week where every structured order is reviewed by you before it is
                trusted to run unattended.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section" id="integrations">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Integration options</span>
            <h2>Three official ways to connect</h2>
            <p className="lede">
              Each channel uses its own documented API. No browser automation, no credential
              sharing, nothing that can break when a platform changes its terms.
            </p>
          </Reveal>

          <div className="grid grid--3">
            {PLATFORMS.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className="integration">
                <span className="integration__icon">
                  <Icon name={p.icon} />
                </span>
                <div>
                  <h3>{p.label}</h3>
                  <p>{p.method}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Or start with a single conversation"
        lede="Send us one real thread and a product list. We will return the structured order, the diff history and the generated bill."
        buttonLabel="Request the walkthrough"
      />
    </>
  )
}
