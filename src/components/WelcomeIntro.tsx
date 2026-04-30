import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SEEN_KEY = 'portfolio-welcome-seen-v2'

export function WelcomeIntro() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem(SEEN_KEY)
    if (seen) return
    setShow(true)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem(SEEN_KEY, '1')
      document.body.style.overflow = ''
    }, 3600)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FFFCF4]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 40%, rgba(229,168,35,0.16) 0%, transparent 60%)',
            }}
          />
          <div className="relative w-full max-w-[1100px] px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] mb-8"
              style={{ color: 'rgba(27,22,11,0.45)' }}
            >
              Laura Cerveaux
            </motion.p>

            <div className="relative inline-block">
              <svg
                viewBox="0 0 1100 260"
                className="w-full h-auto"
                style={{ maxWidth: '1000px' }}
              >
                <defs>
                  <linearGradient id="brushGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#B07410" />
                    <stop offset="50%" stopColor="#E5A823" />
                    <stop offset="100%" stopColor="#F5C957" />
                  </linearGradient>
                  <filter id="paintFilter" x="-5%" y="-15%" width="110%" height="130%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
                    <feDisplacementMap in="SourceGraphic" scale="1.8" />
                  </filter>
                </defs>

                <motion.text
                  x="550"
                  y="120"
                  textAnchor="middle"
                  fill="url(#brushGradient)"
                  filter="url(#paintFilter)"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '110px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    fontStyle: 'italic',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  Bienvenue
                </motion.text>

                <motion.path
                  d="M 160 175 Q 300 168 550 172 T 950 175"
                  stroke="url(#brushGradient)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#paintFilter)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.text
                  x="550"
                  y="235"
                  textAnchor="middle"
                  fill="#1B160B"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '22px',
                    fontWeight: 300,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  transition={{ duration: 0.8, delay: 2.1 }}
                >
                  sur mon portfolio
                </motion.text>
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              <div className="flex gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block w-[6px] h-[6px] rounded-full bg-[#E5A823]"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
