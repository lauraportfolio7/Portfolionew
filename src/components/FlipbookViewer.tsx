import { useEffect, useState, useRef, useMemo } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  animate,
  type PanInfo,
} from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize2, X, Loader2 } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

interface FlipbookViewerProps {
  pdfUrl: string
  title?: string
}

type PageImage = {
  src: string
  ratio: number
}

/* Précharge toutes les pages d'un PDF en JPEG dataURL pour un feuilletage instantané. */
async function preloadPdfPages(
  pdfUrl: string,
  scale: number,
  onProgress: (ratio: number) => void,
  signal: { cancelled: boolean },
): Promise<PageImage[]> {
  const doc = await pdfjsLib.getDocument(pdfUrl).promise
  const pages: PageImage[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    if (signal.cancelled) return pages
    const page = await doc.getPage(i)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: ctx, viewport } as any).promise
    pages.push({
      src: canvas.toDataURL('image/jpeg', 0.85),
      ratio: viewport.height / viewport.width,
    })
    onProgress(i / doc.numPages)
  }
  return pages
}

type Spread = [PageImage | null, PageImage | null]

function getSpread(pages: PageImage[], spreadIdx: number): Spread {
  if (pages.length === 0) return [null, null]
  if (spreadIdx === 0) return [null, pages[0]] // couverture seule à droite
  const leftIdx = spreadIdx * 2 - 1
  const rightIdx = spreadIdx * 2
  return [
    leftIdx < pages.length ? pages[leftIdx] : null,
    rightIdx < pages.length ? pages[rightIdx] : null,
  ]
}

function getTotalSpreads(pages: PageImage[]): number {
  if (pages.length === 0) return 0
  return Math.ceil((pages.length + 1) / 2)
}

interface BookProps {
  pages: PageImage[]
  spread: number
  pageWidth: number
  pageHeight: number
  onChangeSpread: (next: number) => void
  reduceMotion: boolean
}

/* Livre 3D : page à plat à gauche, page à plat à droite, et lors du flip,
   une feuille animée superposée tourne autour de la reliure. Drag latéral pour
   suivre la rotation au doigt, snap par animation à la fin. */
function Book({ pages, spread, pageWidth, pageHeight, onChangeSpread, reduceMotion }: BookProps) {
  const totalSpreads = getTotalSpreads(pages)

  // Progrès du flip : 0 = repos, -1 = flip vers la suivante (page droite vers la gauche),
  // +1 = flip vers la précédente (page gauche vers la droite).
  const progress = useMotionValue(0)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)
  const [animating, setAnimating] = useState(false)

  // Pages courantes + voisines (pour l'animation et le préchargement visuel).
  const current = useMemo(() => getSpread(pages, spread), [pages, spread])
  const nextSpread = useMemo(() => getSpread(pages, spread + 1), [pages, spread])
  const prevSpread = useMemo(() => getSpread(pages, spread - 1), [pages, spread])

  const canNext = spread < totalSpreads - 1
  const canPrev = spread > 0

  // Quand le flip est en cours, l'arrière-plan affiche la destination, et la feuille
  // animée superposée porte la page qui « tourne ».
  const target = direction === 'next' ? nextSpread : direction === 'prev' ? prevSpread : current
  const [bgLeft, bgRight] = target

  // La face avant de la feuille animée :
  //   - flip "next" : la page droite courante
  //   - flip "prev" : la page gauche courante
  // La face arrière :
  //   - flip "next" : la nouvelle page gauche (= leftPage du spread suivant)
  //   - flip "prev" : la nouvelle page droite (= rightPage du spread précédent)
  const flipFront = direction === 'next' ? current[1] : direction === 'prev' ? current[0] : null
  const flipBack = direction === 'next' ? nextSpread[0] : direction === 'prev' ? prevSpread[1] : null

  // Rotation de la feuille animée. Pour "next" : 0 → -180. Pour "prev" : 0 → +180.
  const rotateY = useTransform(progress, (p) => (direction === 'next' ? p * 180 : direction === 'prev' ? p * -180 : 0))
  // L'inversion : pour next, p est négatif ; pour prev, p est positif.
  // On normalise : on travaillera avec la valeur absolue.
  const absProgress = useTransform(progress, (p) => Math.abs(p))

  // Ombrages dynamiques :
  //   - ombre portée sous la feuille qui tourne (max au milieu de la rotation)
  //   - dégradé sur la feuille (effet de courbure)
  //   - ombre douce projetée sur la page opposée (le flip projette une ombre)
  const liftShadow = useTransform(absProgress, [0, 0.5, 1], [0.05, 0.45, 0.05])
  const curlGradient = useTransform(absProgress, [0, 0.5, 1], [0, 0.55, 0])
  const projectedShadow = useTransform(absProgress, [0, 0.55, 1], [0, 0.2, 0])
  const flipBoxShadow = useTransform(liftShadow, (s) => `0 ${s * 40}px ${s * 60}px rgba(0,0,0,${s})`)

  function startFlip(dir: 'next' | 'prev') {
    if (animating) return
    if (dir === 'next' && !canNext) return
    if (dir === 'prev' && !canPrev) return
    setDirection(dir)
    setAnimating(true)
    progress.set(0)
    if (reduceMotion) {
      // Pas d'anim : on commute directement.
      onChangeSpread(spread + (dir === 'next' ? 1 : -1))
      setDirection(null)
      setAnimating(false)
      progress.set(0)
      return
    }
    const target = dir === 'next' ? -1 : 1
    animate(progress, target, {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    }).then(() => {
      onChangeSpread(spread + (dir === 'next' ? 1 : -1))
      setDirection(null)
      setAnimating(false)
      progress.set(0)
    })
  }

  // Drag : on lit le delta x (positif = vers la droite = "prev", négatif = "next").
  const dragRef = useRef<{ pendingDir: 'next' | 'prev' | null }>({ pendingDir: null })

  function handleDragStart(_: any, info: PanInfo) {
    if (animating) return
    if (info.offset.x < 0 && canNext) {
      setDirection('next')
      dragRef.current.pendingDir = 'next'
    } else if (info.offset.x > 0 && canPrev) {
      setDirection('prev')
      dragRef.current.pendingDir = 'prev'
    }
  }

  function handleDrag(_: any, info: PanInfo) {
    if (animating) return
    const dir = dragRef.current.pendingDir
    if (!dir) return
    const ratio = Math.max(-1, Math.min(1, info.offset.x / pageWidth))
    progress.set(dir === 'next' ? Math.min(0, ratio) : Math.max(0, ratio))
  }

  function handleDragEnd(_: any, info: PanInfo) {
    const dir = dragRef.current.pendingDir
    if (!dir) return
    const velocity = info.velocity.x
    const offset = info.offset.x
    const triggered =
      (dir === 'next' && (offset < -pageWidth * 0.25 || velocity < -300)) ||
      (dir === 'prev' && (offset > pageWidth * 0.25 || velocity > 300))

    if (triggered) {
      setAnimating(true)
      const target = dir === 'next' ? -1 : 1
      animate(progress, target, {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }).then(() => {
        onChangeSpread(spread + (dir === 'next' ? 1 : -1))
        setDirection(null)
        setAnimating(false)
        progress.set(0)
        dragRef.current.pendingDir = null
      })
    } else {
      setAnimating(true)
      animate(progress, 0, {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }).then(() => {
        setDirection(null)
        setAnimating(false)
        progress.set(0)
        dragRef.current.pendingDir = null
      })
    }
  }

  // Empêche le scroll vertical pendant le drag horizontal.
  useMotionValueEvent(progress, 'change', () => {})

  // Préchargement DOM des images proches pour éviter le pop-in.
  const preloadList = useMemo(() => {
    const indices = [spread - 2, spread - 1, spread, spread + 1, spread + 2]
      .filter((i) => i >= 0 && i < totalSpreads)
    const set = new Set<string>()
    indices.forEach((i) => {
      const [l, r] = getSpread(pages, i)
      if (l) set.add(l.src)
      if (r) set.add(r.src)
    })
    return Array.from(set)
  }, [pages, spread, totalSpreads])

  return (
    <div className="relative" style={{ width: pageWidth * 2, height: pageHeight }}>
      {/* Pré-cache : <link rel="preload"> via éléments img cachés. */}
      <div className="hidden" aria-hidden="true">
        {preloadList.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {/* Empilement 3D. */}
      <div
        className="absolute inset-0"
        style={{ perspective: 2400, perspectiveOrigin: '50% 50%' }}
      >
        {/* Page gauche statique (destination du flip si flip en cours). */}
        <PageHalf
          page={bgLeft}
          side="left"
          width={pageWidth}
          height={pageHeight}
        />

        {/* Page droite statique (destination du flip si flip en cours). */}
        <PageHalf
          page={bgRight}
          side="right"
          width={pageWidth}
          height={pageHeight}
          offsetLeft={pageWidth}
        />

        {/* Reliure centrale. */}
        <div
          className="absolute top-0 bottom-0 w-[10px] pointer-events-none z-[2]"
          style={{
            left: pageWidth - 5,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.18))',
            mixBlendMode: 'multiply',
          }}
          aria-hidden="true"
        />

        {/* Ombre projetée par la feuille en cours de flip sur la page de destination. */}
        {direction !== null && (
          <motion.div
            className="absolute top-0 bottom-0 pointer-events-none z-[3]"
            style={{
              left: direction === 'next' ? 0 : pageWidth,
              width: pageWidth,
              opacity: projectedShadow,
              background:
                direction === 'next'
                  ? 'linear-gradient(to left, rgba(0,0,0,0.45), rgba(0,0,0,0) 60%)'
                  : 'linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0) 60%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Feuille animée pendant le flip. */}
        {direction !== null && flipFront && flipBack && (
          <motion.div
            className="absolute top-0 z-[4]"
            style={{
              left: direction === 'next' ? pageWidth : 0,
              width: pageWidth,
              height: pageHeight,
              transformOrigin: direction === 'next' ? 'left center' : 'right center',
              transformStyle: 'preserve-3d',
              rotateY,
              boxShadow: flipBoxShadow,
            }}
          >
            {/* Face avant de la page qui tourne. */}
            <FlipFace
              page={flipFront}
              width={pageWidth}
              height={pageHeight}
              isFront
              direction={direction}
              curlOpacity={curlGradient}
            />
            {/* Face arrière (sur le côté opposé). */}
            <FlipFace
              page={flipBack}
              width={pageWidth}
              height={pageHeight}
              isFront={false}
              direction={direction}
              curlOpacity={curlGradient}
            />
          </motion.div>
        )}

        {/* Couche capture de drag — au-dessus de tout, mais ne masque pas pendant l'animation. */}
        {!animating && (
          <motion.div
            className="absolute inset-0 z-[5] cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onClick={(e: React.MouseEvent) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
              const xRel = e.clientX - rect.left
              if (xRel < rect.width / 2) startFlip('prev')
              else startFlip('next')
            }}
          />
        )}
      </div>
    </div>
  )
}

interface PageHalfProps {
  page: PageImage | null
  side: 'left' | 'right'
  width: number
  height: number
  offsetLeft?: number
}

function PageHalf({ page, side, width, height, offsetLeft = 0 }: PageHalfProps) {
  return (
    <div
      className="absolute top-0 overflow-hidden bg-[#FBF9F4]"
      style={{
        left: offsetLeft,
        width,
        height,
        borderRadius: side === 'left' ? '4px 0 0 4px' : '0 4px 4px 0',
        boxShadow:
          side === 'left'
            ? 'inset -8px 0 16px -10px rgba(0,0,0,0.18)'
            : 'inset 8px 0 16px -10px rgba(0,0,0,0.18)',
      }}
    >
      {page && (
        <img
          src={page.src}
          alt=""
          draggable={false}
          className="block w-full h-full object-cover select-none"
        />
      )}
    </div>
  )
}

interface FlipFaceProps {
  page: PageImage
  width: number
  height: number
  isFront: boolean
  direction: 'next' | 'prev'
  curlOpacity: any
}

/* Face d'une feuille en flip — image plein cadre + dégradé de courbure pour
   l'effet papier qui se plie. */
function FlipFace({ page, width, height, isFront, direction, curlOpacity }: FlipFaceProps) {
  // Dégradé directionnel : sur "next" la lumière vient du pli (à gauche pour la face avant,
  // à droite pour la face arrière une fois qu'elle est révélée).
  const gradientDir = direction === 'next' ? (isFront ? 'to left' : 'to right') : isFront ? 'to right' : 'to left'

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#FBF9F4]"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        width,
        height,
        transform: isFront ? 'rotateY(0deg)' : 'rotateY(180deg)',
        borderRadius:
          (direction === 'next' && isFront) || (direction === 'prev' && !isFront)
            ? '0 4px 4px 0'
            : '4px 0 0 4px',
        boxShadow: '0 0 12px rgba(0,0,0,0.06)',
      }}
    >
      <img
        src={page.src}
        alt=""
        draggable={false}
        className="block w-full h-full object-cover select-none"
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: curlOpacity,
          background: `linear-gradient(${gradientDir}, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 30%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0) 100%)`,
        }}
      />
    </div>
  )
}

/* Préfère le mouvement réduit côté système. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])
  return reduced
}

export function FlipbookViewer({ pdfUrl, title }: FlipbookViewerProps) {
  const [pages, setPages] = useState<PageImage[]>([])
  const [progress, setProgress] = useState(0)
  const [spread, setSpread] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [containerW, setContainerW] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const fsContainerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // Précharge l'intégralité du PDF en images JPEG.
  useEffect(() => {
    setPages([]); setSpread(0); setProgress(0)
    const signal = { cancelled: false }
    preloadPdfPages(pdfUrl, 1.5, setProgress, signal).then((loaded) => {
      if (!signal.cancelled) setPages(loaded)
    })
    return () => { signal.cancelled = true }
  }, [pdfUrl])

  // Mesure le conteneur pour dimensionner le livre.
  useEffect(() => {
    const measure = () => {
      const target = fullscreen ? fsContainerRef.current : containerRef.current
      if (target) setContainerW(target.clientWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [fullscreen])

  // Touches clavier en plein écran.
  useEffect(() => {
    if (!fullscreen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setSpread((s) => Math.min(s + 1, getTotalSpreads(pages) - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setSpread((s) => Math.max(s - 1, 0))
      else if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [fullscreen, pages])

  // Dimensions du livre en fonction du conteneur.
  const ratio = pages[0]?.ratio ?? 1.41
  const inlineMaxHeight = 460
  const fsMaxHeight = Math.min(window.innerHeight * 0.78, 760)

  const inlineDims = useMemo(() => {
    const maxBookW = containerW > 0 ? containerW - 48 : 700
    let pageW = maxBookW / 2
    let pageH = pageW * ratio
    if (pageH > inlineMaxHeight) {
      pageH = inlineMaxHeight
      pageW = pageH / ratio
    }
    return { pageW, pageH }
  }, [containerW, ratio])

  const fsDims = useMemo(() => {
    const maxBookW = containerW > 0 ? containerW * 0.92 : 1100
    let pageW = maxBookW / 2
    let pageH = pageW * ratio
    if (pageH > fsMaxHeight) {
      pageH = fsMaxHeight
      pageW = pageH / ratio
    }
    return { pageW, pageH }
  }, [containerW, ratio, fsMaxHeight])

  if (pages.length === 0) {
    return (
      <div className="mt-8">
        {title && (
          <h3 className="text-xl mb-4 text-night-secondary text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            {title}
          </h3>
        )}
        <div className="rounded-2xl bg-[#e8e4e0] border border-night-secondary/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-16 flex flex-col items-center gap-4">
          <Loader2 className="w-7 h-7 text-night-secondary/70 animate-spin" />
          <div className="w-64 h-2 bg-white/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-night-secondary transition-[width] duration-300"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-night-secondary/60" style={{ fontWeight: 600 }}>
            Préchargement · {Math.round(progress * 100)}%
          </p>
        </div>
      </div>
    )
  }

  const totalSpreads = getTotalSpreads(pages)
  const [leftPage, rightPage] = getSpread(pages, spread)
  const leftIdx = leftPage ? (spread === 0 ? 1 : spread * 2) : null
  const rightIdx = rightPage ? (spread === 0 ? 1 : spread * 2 + 1) : null

  return (
    <>
      <div className="mt-8" ref={containerRef}>
        {title && (
          <h3 className="text-xl mb-4 text-night-secondary text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            {title}
          </h3>
        )}
        <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-night-secondary/10 bg-[#e8e4e0] relative">
          <div className="flex items-center justify-center p-6 min-h-[300px]">
            <div style={{ filter: 'drop-shadow(0 14px 32px rgba(0,0,0,0.18))' }}>
              <Book
                pages={pages}
                spread={spread}
                pageWidth={inlineDims.pageW}
                pageHeight={inlineDims.pageH}
                onChangeSpread={(next) => setSpread(Math.max(0, Math.min(totalSpreads - 1, next)))}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pb-4">
            <button
              onClick={() => setSpread((s) => Math.max(s - 1, 0))}
              disabled={spread === 0}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-night-secondary hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-night-secondary/60 tabular-nums">
              {leftIdx && rightIdx ? `${leftIdx}–${rightIdx}` : leftIdx || rightIdx} / {pages.length}
            </span>
            <button
              onClick={() => setSpread((s) => Math.min(s + 1, totalSpreads - 1))}
              disabled={spread === totalSpreads - 1}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-night-secondary hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFullscreen(true)}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-night-secondary hover:text-white transition-colors ml-2"
              title="Plein écran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setFullscreen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={fsContainerRef}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))' }}>
                <Book
                  pages={pages}
                  spread={spread}
                  pageWidth={fsDims.pageW}
                  pageHeight={fsDims.pageH}
                  onChangeSpread={(next) => setSpread(Math.max(0, Math.min(totalSpreads - 1, next)))}
                  reduceMotion={reduceMotion}
                />
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setSpread((s) => Math.max(s - 1, 0))}
                  disabled={spread === 0}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white/70 text-sm tabular-nums">
                  {leftIdx && rightIdx ? `${leftIdx}–${rightIdx}` : leftIdx || rightIdx} / {pages.length}
                </span>
                <button
                  onClick={() => setSpread((s) => Math.min(s + 1, totalSpreads - 1))}
                  disabled={spread === totalSpreads - 1}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
