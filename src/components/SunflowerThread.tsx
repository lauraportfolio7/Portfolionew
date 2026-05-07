import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

export function SunflowerThread() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 })
  const lineHeightPct = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const flowerTopPct = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const flowerRotate = useTransform(smoothProgress, [0, 1], [0, 360])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div
      className="fixed top-0 left-4 lg:left-6 h-screen z-[40] pointer-events-none hidden md:flex flex-col items-center"
      aria-hidden="true"
    >
      {/* Top tick */}
      <div className="w-[6px] h-[6px] rounded-full bg-accent/70 mt-6 flex-none" />

      {/* Vertical thread (track + fill + traveling sunflower share the same coordinate space) */}
      <div className="relative flex-1 w-[1px] my-2 bg-accent/15">
        {/* Filled portion grows as the page scrolls */}
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            height: lineHeightPct,
            background: 'linear-gradient(to bottom, transparent, #E5A823 18%, #B07410 82%, transparent)',
          }}
        />

        {/* Sunflower glyph riding the end of the filled line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7"
          style={{ top: flowerTopPct, rotate: flowerRotate }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 6px rgba(229,168,35,0.45))' }}
          >
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

      {/* Bottom tick */}
      <div className="w-[6px] h-[6px] rounded-full bg-accent/30 mb-6 flex-none" />
    </div>
  )
}
