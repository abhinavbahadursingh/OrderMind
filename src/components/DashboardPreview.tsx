import { Icon, type IconName } from './Icons'

export type StatCardProps = {
  title: string
  value: string | number
  trend: string
  trendPositive: boolean
  icon: IconName
}

export function StatCard({ title, value, trend, trendPositive, icon }: StatCardProps) {
  const trendClass = trendPositive ? 'trend--up' : 'trend--down'

  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <Icon name={icon} className="icon--small" />
      </div>
      <div className="stat-card__content">
        <h3 className="stat-card__title">{title}</h3>
        <div className="stat-card__value">
          {typeof value === 'number' ? value.toLocaleString() : value}
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
