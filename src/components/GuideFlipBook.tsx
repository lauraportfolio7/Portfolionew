import { useEffect, useRef, useState, forwardRef, Component, type ReactNode, type ComponentType } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — react-pageflip n'expose pas de types complets
import HTMLFlipBookRaw from 'react-pageflip'

// Les types de react-pageflip rendent obligatoires de nombreuses props ; on
// l'expose comme un composant à props libres (l'API gère ses propres défauts).
const HTMLFlipBook = HTMLFlipBookRaw as unknown as ComponentType<any>

interface GuideFlipBookProps {
  pages: string[]
  title?: string
}

/* Garde-fou : si react-pageflip échoue (ex. souci d'instance React), on bascule
   sur le lecteur de secours fourni en fallback, sans jamais casser la page. */
export class FlipErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    /* silencieux — le fallback prend le relais */
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/* Une page du livre — react-pageflip attache une ref à chaque enfant, donc la
   page doit transférer cette ref vers son élément DOM (forwardRef). */
const FlipPage = forwardRef<HTMLDivElement, { src: string; index: number }>(({ src, index }, ref) => (
  <div ref={ref} className="bg-[#FBF9F4] overflow-hidden">
    <img
      src={src}
      alt={`Page ${index + 1}`}
      draggable={false}
      loading={index < 4 ? 'eager' : 'lazy'}
      className="block w-full h-full object-cover select-none pointer-events-none"
    />
  </div>
))
FlipPage.displayName = 'FlipPage'

/* Livre feuilletable réaliste (page flip) basé sur react-pageflip / StPageFlip.
   Pages fournies en images pré-rendues → ouverture instantanée, effet papier,
   compatible souris + tactile. */
function Book({
  pages,
  size,
  fullscreen,
  onFlip,
  bookRef,
}: {
  pages: string[]
  size: number
  fullscreen: boolean
  onFlip: (page: number) => void
  bookRef: React.MutableRefObject<any>
}) {
  return (
    <HTMLFlipBook
      ref={bookRef}
      width={size}
      height={size}
      size="stretch"
      minWidth={240}
      maxWidth={fullscreen ? 760 : 560}
      minHeight={240}
      maxHeight={fullscreen ? 760 : 560}
      showCover={true}
      usePortrait={true}
      mobileScrollSupport={true}
      drawShadow={true}
      maxShadowOpacity={0.4}
      flippingTime={750}
      className="mx-auto"
      style={{}}
      startPage={0}
      onFlip={(e: { data: number }) => onFlip(e.data)}
    >
      {pages.map((src, i) => (
        <FlipPage key={i} src={src} index={i} />
      ))}
    </HTMLFlipBook>
  )
}

export function GuideFlipBook({ pages, title }: GuideFlipBookProps) {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [containerW, setContainerW] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<any>(null)
  const fsBookRef = useRef<any>(null)

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerW(containerRef.current.clientWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Flèches clavier en plein écran.
  useEffect(() => {
    if (!fullscreen) return
    const handle = (e: KeyboardEvent) => {
      const api = fsBookRef.current?.pageFlip?.()
      if (e.key === 'ArrowRight') api?.flipNext()
      else if (e.key === 'ArrowLeft') api?.flipPrev()
      else if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [fullscreen])

  if (pages.length === 0) return null

  // Taille de page : ~la moitié de la largeur du conteneur (livre = 2 pages), bornée.
  const inlineSize = Math.max(240, Math.min(520, containerW > 0 ? (containerW - 48) / 2 : 460))

  const Controls = ({ refObj, dark }: { refObj: React.MutableRefObject<any>; dark?: boolean }) => {
    const btn = dark
      ? 'bg-white/10 hover:bg-white/20 text-white'
      : 'bg-white shadow-md hover:bg-night-secondary hover:text-white text-night'
    return (
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={() => refObj.current?.pageFlip?.().flipPrev()}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${btn}`}
          aria-label="Page précédente"
          data-cursor="hover"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className={`text-sm tabular-nums ${dark ? 'text-white/70' : 'text-night-secondary/60'}`}>
          {Math.min(current + 1, pages.length)} / {pages.length}
        </span>
        <button
          onClick={() => refObj.current?.pageFlip?.().flipNext()}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${btn}`}
          aria-label="Page suivante"
          data-cursor="hover"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        {!dark && (
          <button
            onClick={() => setFullscreen(true)}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-night-secondary hover:text-white text-night transition-colors ml-2"
            title="Plein écran"
            data-cursor="hover"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="mt-8" ref={containerRef}>
      {title && (
        <h3 className="text-xl mb-4 text-night-secondary text-center" style={{ fontFamily: 'var(--font-serif)' }}>
          {title}
        </h3>
      )}
      <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-night-secondary/10 bg-[#e8e4e0] relative">
        <div className="flex items-center justify-center p-6 min-h-[300px]">
          <div style={{ filter: 'drop-shadow(0 14px 32px rgba(0,0,0,0.18))' }}>
            {containerW > 0 && (
              <Book pages={pages} size={inlineSize} fullscreen={false} onFlip={setCurrent} bookRef={bookRef} />
            )}
          </div>
        </div>
        <Controls refObj={bookRef} />
        <div className="pb-4" />
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center">
              <Book
                pages={pages}
                size={Math.min(700, Math.round((typeof window !== 'undefined' ? window.innerHeight : 760) * 0.72))}
                fullscreen
                onFlip={setCurrent}
                bookRef={fsBookRef}
              />
              <Controls refObj={fsBookRef} dark />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
