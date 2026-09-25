import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Icon } from './Icons'
import type { IconName } from './Icons'
import { Reveal } from './Reveal'

export type PipelineStep = {
  title: string
  description: string
  icon: IconName
}

export function Pipeline({ steps, label }: { steps: PipelineStep[]; label: string }) {
  const ref = useRef<HTMLOListElement>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.18 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <ol
      ref={ref}
      className={`pipeline${inView ? ' is-in' : ''}`}
      aria-label={label}
      style={{ '--n': steps.length } as CSSProperties}
    >
      {steps.map((step, i) => (
        <Reveal
          key={step.title}
          as="li"
          className="pipe-step"
          delay={i * 100}
          style={{ '--i': i } as CSSProperties}
        >
          <span className="pipe-step__rail pipe-step__rail--h" aria-hidden="true" />
          <span className="pipe-step__rail pipe-step__rail--v" aria-hidden="true" />
          <span className="pipe-node" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="pipe-card card">
            <span className="card__icon">
              <Icon name={step.icon} />
            </span>
            <h3 className="card__title">{step.title}</h3>
            <p className="card__body">{step.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
