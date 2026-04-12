import { motion } from 'motion/react'

interface WaveformDividerProps {
  className?: string
  variant?: 'default' | 'accent' | 'subtle' | 'wide'
}

export function WaveformDivider({ className = '', variant = 'default' }: WaveformDividerProps) {
  const colorMap = {
    default: '#1C2340',
    accent: '#B07D4F',
    subtle: '#1C2340',
    wide: '#1C2340',
  }
  const color = colorMap[variant]
  const opacity = variant === 'subtle' ? 0.15 : variant === 'accent' ? 0.5 : 0.4

  const bars =
    variant === 'wide'
      ? [1, 3, 5, 2, 8, 4, 12, 6, 16, 8, 20, 10, 24, 10, 20, 8, 16, 6, 12, 4, 8, 2, 5, 3, 1, 3, 6, 3, 10, 5, 14, 7, 18, 9, 22, 9, 18, 7, 14, 5, 10, 3, 6, 3, 1]
      : [2, 6, 4, 12, 6, 16, 8, 20, 7, 14, 5, 10, 3, 7, 12, 5, 18, 7, 13, 6, 9, 4, 6, 2]

  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`} aria-hidden="true">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: variant === 'wide' ? '1.5px' : '2px',
            height: `${height}px`,
            backgroundColor: color,
            opacity,
            borderRadius: '1px',
          }}
        />
      ))}
    </div>
  )
}

interface SectionWaveDividerProps {
  flip?: boolean
  fromColor?: string
  toColor?: string
}

export function SectionWaveDivider({
  flip = false,
  fromColor = '#FAFBFC',
  toColor = '#F5F7FA',
}: SectionWaveDividerProps) {
  return (
    <div className={`relative w-full h-8 md:h-10 overflow-hidden ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${fromColor}, ${toColor})` }} />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M0 45 Q120 20 240 45 Q360 70 480 45 Q600 20 720 45 Q840 70 960 45 Q1080 20 1200 45 Q1320 70 1440 45"
          stroke="#1C2340"
          strokeWidth="1"
          opacity="0.08"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.path
          d="M0 40 Q90 25 180 40 Q270 55 360 40 Q450 25 540 40 Q630 55 720 40 Q810 25 900 40 Q990 55 1080 40 Q1170 25 1260 40 Q1350 55 1440 40"
          stroke="#7EAED4"
          strokeWidth="0.8"
          opacity="0.06"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
        />
        <motion.path
          d="M0 50 Q180 30 360 50 Q540 70 720 50 Q900 30 1080 50 Q1260 70 1440 50"
          stroke="#1C2340"
          strokeWidth="0.6"
          opacity="0.04"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
        />
      </svg>
    </div>
  )
}
