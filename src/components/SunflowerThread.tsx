import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

export function SunflowerThread() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const flowerY = useTransform(smoothProgress, [0, 1], ['0vh', 'calc(100vh - 60px)'])
  const flowerRotate = useTransform(smoothProgress, [0, 1], [0, 720])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div
      className="fixed top-0 left-4 lg:left-6 h-screen z-[40] pointer-events-none hidden md:flex flex-col items-center"
      aria-hidden="true"
    >
      {/* Top tick mark */}
      <div className="w-[6px] h-[6px] rounded-full bg-accent/70 mt-6" />

      {/* Vertical thread track */}
      <div className="relative flex-1 w-[1px] my-2 bg-accent/15">
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{
            height: lineHeight,
            background: 'linear-gradient(to bottom, transparent, #E5A823 20%, #B07410 80%, transparent)',
          }}
        />
      </div>

      {/* Bottom tick mark */}
      <div className="w-[6px] h-[6px] rounded-full bg-accent/30 mb-6" />

      {/* Floating sunflower glyph that travels with scroll */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-7 h-7"
        style={{ top: flowerY, rotate: flowerRotate }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 6px rgba(229,168,35,0.45))' }}>
          <defs>
            <radialGradient id="thread-petal" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#F5C957" stopOpacity="1" />
              <stop offset="100%" stopColor="#B07410" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (360 / 12) * i
            return (
              <ellipse
                key={i}
                cx="50"
                cy="22"
                rx="7"
                ry="14"
                fill="url(#thread-petal)"
                transform={`rotate(${angle} 50 50)`}
              />
            )
          })}
          <circle cx="50" cy="50" r="11" fill="#3A2F1A" />
          <circle cx="50" cy="50" r="7" fill="#1B160B" />
        </svg>
      </motion.div>
    </div>
  )
}
