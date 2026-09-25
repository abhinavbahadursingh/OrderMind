import { useEffect, useRef } from 'react'
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'

type RevealProps = {
  children?: ReactNode
  as?: ElementType
  delay?: number
  effect?: 'rise' | 'fade'
  className?: string
  id?: string
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
  }
  return observer
}

export function Reveal({
  children,
  as,
  delay = 0,
  effect = 'rise',
  className,
  id,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    const io = getObserver()
    if (!node || !io) {
      node?.classList.add('is-revealed')
      return
    }
    io.observe(node)
    return () => io.unobserve(node)
  }, [])

  const Tag = (as ?? 'div') as ElementType
  const mergedStyle = { ...style, ...(delay ? { transitionDelay: `${delay}ms` } : null) }

  return (
    <Tag
      {...rest}
      ref={ref}
      id={id}
      data-reveal={effect}
      className={className}
      style={mergedStyle}
    >
      {children}
    </Tag>
  )
}
