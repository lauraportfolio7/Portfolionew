import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SEEN_KEY = 'portfolio-welcome-seen-v3'
const TOTAL_DURATION = 1400

export function WelcomeIntro() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SEEN_KEY)) return
    setShow(true)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem(SEEN_KEY, '1')
      document.body.style.overflow = ''
    }, TOTAL_DURATION)
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
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
          aria-hidden="true"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="italic text-[clamp(2.5rem,8vw,5.5rem)] leading-none text-night"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Laura{' '}
            <span
              className="inline-block"
              style={{
                paddingRight: '0.12em',
                background: 'linear-gradient(135deg, #B07410 0%, #E5A823 55%, #F5C957 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Cerveaux
            </span>
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
