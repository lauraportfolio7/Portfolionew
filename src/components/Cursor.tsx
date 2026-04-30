import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
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
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf = 0
    let isHovering = false

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      const scale = isHovering ? 1.7 : 1
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const interactive = target.closest('a, button, [role="button"], [data-cursor="hover"], input, label, summary, .group')
      isHovering = !!interactive
      ring.style.borderColor = isHovering ? 'rgba(229,168,35,0.85)' : 'rgba(229,168,35,0.45)'
      ring.style.background = isHovering ? 'rgba(229,168,35,0.10)' : 'transparent'
      dot.style.background = isHovering ? '#1B160B' : '#E5A823'
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
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
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-9 h-9 rounded-full border transition-[border-color,background] duration-300 ease-out hidden md:block"
        style={{
          borderColor: 'rgba(229,168,35,0.45)',
          willChange: 'transform',
          mixBlendMode: 'normal',
        }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full hidden md:block"
        style={{
          background: '#E5A823',
          boxShadow: '0 0 8px rgba(229,168,35,0.6)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  )
}
