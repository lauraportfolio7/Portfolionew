import { motion } from 'motion/react'

interface AudioBarsProps {
  bars?: number[]
  color?: string
  opacity?: number
  width?: string
  gap?: string
  className?: string
  animated?: boolean
}

export function AudioBars({
  bars = [3, 6, 4, 8, 5, 7, 3],
  color = 'currentColor',
  opacity = 0.4,
  width = '1.5px',
  gap = '1px',
  className = '',
  animated = true,
}: AudioBarsProps) {
  return (
    <div className={`flex items-end ${className}`} style={{ gap }} aria-hidden="true">
      {bars.map((h, i) =>
        animated ? (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width, backgroundColor: color, opacity }}
            animate={{ height: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.3] }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <div
            key={i}
            className="rounded-full"
            style={{ width, height: h, backgroundColor: color, opacity }}
          />
        ),
      )}
    </div>
  )
}
