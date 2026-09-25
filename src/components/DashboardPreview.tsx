import { useEffect, useRef, useState } from 'react'
import { Icon, type IconName } from './Icons'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export type StatCardProps = {
  title: string
  value: string | number
  trend: string
  trendPositive: boolean
  icon: IconName
}

export function StatCard({ title, value, trend, trendPositive, icon }: StatCardProps) {
  const trendClass = trendPositive ? 'trend--up' : 'trend--down'
  const isNum = typeof value === 'number'
  const [display, setDisplay] = useState<string | number>(() =>
    isNum && !prefersReducedMotion() ? 0 : value,
  )
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!isNum || started.current) return
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }
    let cancelled = false
    let frame = 0
    let fallback = 0
    const finish = (target: number) => {
      if (!cancelled) setDisplay(target)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current || cancelled) return
        started.current = true
        io.disconnect()
        const from = performance.now()
        const target = value as number
        fallback = window.setTimeout(() => finish(target), 1400)
        const tick = (t: number) => {
          if (cancelled) return
          const p = Math.min(1, Math.max(0, (t - from) / 1000))
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(target * eased))
          if (p < 1) {
            frame = requestAnimationFrame(tick)
          } else {
            window.clearTimeout(fallback)
            finish(target)
          }
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(node)
    return () => {
      cancelled = true
      io.disconnect()
      if (frame) cancelAnimationFrame(frame)
      if (fallback) window.clearTimeout(fallback)
    }
  }, [isNum, value])

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-card__icon">
        <Icon name={icon} className="icon--small" />
      </div>
      <div className="stat-card__content">
        <h3 className="stat-card__title">{title}</h3>
        <div className="stat-card__value">
          {typeof display === 'number' ? display.toLocaleString() : display}
        </div>
        <span className={`stat-card__trend ${trendClass}`}>{trend}</span>
      </div>
    </div>
  )
}

export type BreakdownItemProps = {
  title: string
  description: string
  icon: IconName
}

export function BreakdownItem({ title, description, icon }: BreakdownItemProps) {
  return (
    <div className="breakdown-item">
      <div className="breakdown-item__icon">
        <Icon name={icon} className="icon--small" />
      </div>
      <div className="breakdown-item__details">
        <h3 className="breakdown-item__title">{title}</h3>
        <p className="breakdown-item__body">{description}</p>
      </div>
    </div>
  )
}

export type ScenarioCardProps = {
  title: string
  story: string
  icon: IconName
}

export function ScenarioCard({ title, story, icon }: ScenarioCardProps) {
  return (
    <div className="scenario-card">
      <div className="scenario-card__icon">
        <Icon name={icon} className="icon--small" />
      </div>
      <div className="scenario-card__content">
        <h3 className="scenario-card__title">{title}</h3>
        <p className="scenario-card__story">{story}</p>
      </div>
    </div>
  )
}

export type AlertCardProps = {
  message: string
  type: 'warning' | 'success' | 'attention'
}

const ALERT_ICON: Record<AlertCardProps['type'], IconName> = {
  warning: 'warning',
  success: 'check',
  attention: 'alert-triangle',
}

export function AlertCard({ message, type }: AlertCardProps) {
  return (
    <div className={`alert-card alert--${type}`}>
      <span className="alert-card__icon">
        <Icon name={ALERT_ICON[type]} className="icon--tiny" />
      </span>
      <span className="alert-card__message">{message}</span>
    </div>
  )
}
