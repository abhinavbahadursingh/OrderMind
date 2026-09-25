/* Delegated pointer effects: cursor-follow glare + subtle tilt on glass panels.
   Attaches once at boot; elements opt in with data-glare / data-tilt. */

let bound = false

export function initPointerFx() {
  if (bound || typeof window === 'undefined') return
  bound = true

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  let raf = 0
  let lastX = 0
  let lastY = 0
  let target: Element | null = null

  const apply = () => {
    raf = 0
    const el = target as HTMLElement | null
    if (!el || !document.contains(el)) return
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) return
    const px = (lastX - r.left) / r.width
    const py = (lastY - r.top) / r.height
    el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`)
    el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`)
    if (el.hasAttribute('data-tilt') && !reduce.matches) {
      el.style.setProperty('--ry', `${((px - 0.5) * 5).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${((0.5 - py) * 5).toFixed(2)}deg`)
    }
    el.classList.add('is-glare')
  }

  const onMove = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.('[data-glare]') ?? null
    if (el !== target) {
      if (target instanceof HTMLElement) reset(target)
      target = el
    }
    lastX = e.clientX
    lastY = e.clientY
    if (!raf) raf = requestAnimationFrame(apply)
  }

  const reset = (el: HTMLElement) => {
    el.classList.remove('is-glare')
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '0%')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const onOut = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.('[data-glare]') ?? null
    const to = e.relatedTarget as Element | null
    if (el instanceof HTMLElement && (!to || !el.contains(to))) {
      reset(el)
      if (target === el) target = null
    }
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerout', onOut, { passive: true })
}
