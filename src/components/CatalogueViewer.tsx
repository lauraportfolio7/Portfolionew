import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const FLIP_DURATION = 550

interface CatalogueViewerProps {
  pages: string[]
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function CatalogueViewer({ pages, isOpen, onClose, title }: CatalogueViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      if (flipTimer.current) clearTimeout(flipTimer.current)
    }
  }, [isOpen])

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true)
      setDirection(1)
      setCurrentPage((p) => p + 1)
      flipTimer.current = setTimeout(() => setIsFlipping(false), FLIP_DURATION)
    }
  }, [currentPage, pages.length, isFlipping])

  const goPrev = useCallback(() => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true)
      setDirection(-1)
      setCurrentPage((p) => p - 1)
      flipTimer.current = setTimeout(() => setIsFlipping(false), FLIP_DURATION)
    }
  }, [currentPage, isFlipping])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, goNext, goPrev])

  const pageLabels = ['Couverture', 'Page intérieure 1', 'Page intérieure 2']

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at center, rgba(15,18,30,0.88) 0%, rgba(8,10,18,0.96) 100%)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Visionneuse de catalogue'}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 border border-white/[0.08]"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & page indicator */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-50">
          {title && (
            <p className="text-white/50 text-sm tracking-wider mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
              {title}
            </p>
          )}
          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase">
            {pageLabels[currentPage] || `Page ${currentPage + 1}`} — {currentPage + 1} / {pages.length}
          </p>
        </div>

        {/* Navigation arrows */}
        {currentPage > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 border border-white/[0.08] backdrop-blur-sm"
            aria-label="Page précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {currentPage < pages.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 border border-white/[0.08] backdrop-blur-sm"
            aria-label="Page suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Magazine display area */}
        <div
          className="relative mx-auto px-4"
          style={{ perspective: '1400px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-6 rounded-[50%] blur-xl" style={{ background: 'rgba(0,0,0,0.3)' }} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{
                rotateY: direction > 0 ? -90 : 90,
                opacity: 0,
                scale: 0.95,
              }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{
                rotateY: direction > 0 ? 90 : -90,
                opacity: 0,
                scale: 0.95,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{ transformStyle: 'preserve-3d', transformOrigin: direction > 0 ? 'left center' : 'right center' }}
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-lg" style={{ boxShadow: '0 25px 80px -15px rgba(0,0,0,0.6), 0 10px 30px -5px rgba(0,0,0,0.3)' }} />

                <div
                  className="relative rounded-[3px] overflow-hidden bg-white"
                  style={{
                    boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.08), inset -1px 0 3px rgba(0,0,0,0.03)',
                  }}
                >
                  <img
                    src={pages[currentPage]}
                    alt={pageLabels[currentPage] || `Page ${currentPage + 1}`}
                    className="block"
                    style={{ maxHeight: '78vh', maxWidth: '85vw', width: 'auto', height: 'auto', objectFit: 'contain' }}
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-[6px]" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0.04), transparent)' }} />
                  <div className="absolute right-0 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.1), transparent)' }} />
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.05), rgba(255,255,255,0.08), rgba(0,0,0,0.05))' }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                if (!isFlipping && i !== currentPage) {
                  setIsFlipping(true)
                  setDirection(i > currentPage ? 1 : -1)
                  setCurrentPage(i)
                  flipTimer.current = setTimeout(() => setIsFlipping(false), FLIP_DURATION)
                }
              }}
              className="flex flex-col items-center gap-1.5 group/dot"
              aria-label={`Page ${i + 1}`}
            >
              <span className={`block h-1 rounded-full transition-all duration-400 ${i === currentPage ? 'w-8 bg-white/60' : 'w-2 bg-white/20 group-hover/dot:bg-white/35'}`} />
              <span className={`text-[9px] tracking-wider uppercase transition-all duration-300 ${i === currentPage ? 'text-white/40' : 'text-white/0 group-hover/dot:text-white/25'}`}>
                {i === 0 ? 'Couv.' : `P.${i}`}
              </span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50">
          <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase">
            Flèches ou clavier pour naviguer
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
