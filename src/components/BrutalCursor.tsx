import { useEffect, useRef, useState } from 'react'

/**
 * BrutalCursor — curseur brutaliste éditorial.
 * Petit carré doré qui suit la souris, accompagné d'un label typographique
 * mono qui apparaît sur les éléments interactifs.
 *
 * data-cursor-label="TEXTE" sur n'importe quel élément interactif pour
 * personnaliser le label affiché.
 */
export function BrutalCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: coarse)')
    setIsCoarse(mq.matches)
    const onChange = () => setIsCoarse(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (isCoarse) return

    const dot = dotRef.current
    const label = labelRef.current
    if (!dot || !label) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let labelX = mouseX
    let labelY = mouseY
    let raf = 0
    let hovering = false

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const tick = () => {
      labelX += (mouseX - labelX) * 0.22
      labelY += (mouseY - labelY) * 0.22
      label.style.transform = `translate3d(${labelX}px, ${labelY}px, 0) translate(20px, -50%)`
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="hover"], input, label, summary'
      ) as HTMLElement | null
      hovering = !!interactive

      if (hovering && interactive) {
        const customLabel = interactive.getAttribute('data-cursor-label')
        let text = customLabel || ''
        if (!text) {
          if (interactive.tagName === 'A') text = 'OUVRIR'
          else if (interactive.tagName === 'BUTTON') text = 'CLIQUER'
          else if (interactive.tagName === 'INPUT') text = 'SAISIR'
          else text = 'VOIR'
        }
        label.textContent = text
        label.style.opacity = '1'
        dot.style.width = '22px'
        dot.style.height = '22px'
      } else {
        label.style.opacity = '0'
        dot.style.width = '10px'
        dot.style.height = '10px'
      }
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      label.style.opacity = '0'
    }

    const onEnter = () => {
      dot.style.opacity = '1'
    }

    document.documentElement.classList.add('cursor-none-mode')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('cursor-none-mode')
    }
  }, [isCoarse])

  if (isCoarse) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block transition-[width,height,opacity] duration-200 ease-out"
        style={{
          background: 'var(--color-gold)',
          width: '10px',
          height: '10px',
          willChange: 'transform',
          mixBlendMode: 'normal',
        }}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex items-center px-3 py-1.5 transition-opacity duration-200 ease-out whitespace-nowrap"
        style={{
          background: 'var(--color-ink)',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          willChange: 'transform',
          opacity: 0,
        }}
        aria-hidden="true"
      />
    </>
  )
}
