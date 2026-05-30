import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  Target,
  Users,
  Award,
  FileText,
  TrendingUp,
  Maximize2,
  Sparkles,
  Quote,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Images,
  ArrowLeft,
  Calendar,
  Wrench,
  CheckCircle2,
  BarChart3,
  MousePointerClick,
  Repeat2,
  ThumbsUp,
  Eye,
  Play,
  ChevronDown,
  Flag,
} from 'lucide-react'
import { useEffect, useState, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import type {
  Project,
  CarouselItem,
  PerformanceSection,
  PerformanceHighlight,
  PerformanceMetric,
  Moodboard,
  MoodboardAxis,
  VisualIdentity,
  PosterProposal,
  FontChoice,
  ProjectRole,
} from '@/types'
import { SlideViewer } from '@/components/SlideViewer'
import { FlipbookViewer } from '@/components/FlipbookViewer'
import { Picture } from '@/components/Picture'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

/* Lightbox plein écran pour parcourir un carrousel PDF page par page. */
function CarouselLightbox({ item, onClose }: { item: CarouselItem; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setPage(1); setPdfDoc(null); setTotal(0)
    pdfjsLib.getDocument(item.pdfUrl).promise.then((doc) => {
      setPdfDoc(doc); setTotal(doc.numPages)
    })
  }, [item.pdfUrl])

  const render = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return
    const p = await pdfDoc.getPage(page)
    const vp = p.getViewport({ scale: 1 })
    const dpr = window.devicePixelRatio || 1
    const maxW = window.innerWidth * 0.85
    const maxH = window.innerHeight * 0.78
    const scale = Math.min(maxW / vp.width, maxH / vp.height)
    const scaled = p.getViewport({ scale: scale * dpr })
    const canvas = canvasRef.current
    canvas.width = scaled.width
    canvas.height = scaled.height
    canvas.style.width = `${scaled.width / dpr}px`
    canvas.style.height = `${scaled.height / dpr}px`
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    await p.render({ canvasContext: ctx, viewport: scaled } as any).promise
  }, [pdfDoc, page])

  useEffect(() => { render() }, [render])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setPage((p) => Math.min(p + 1, total))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setPage((p) => Math.max(p - 1, 1))
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-5 max-w-[95vw]">
        <canvas ref={canvasRef} className="rounded-lg shadow-2xl" style={{ display: 'block' }} />

        {total > 0 && (
          <div className="flex items-center gap-5 text-white">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center disabled:opacity-30 transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm tabular-nums">
              {page} / {total} — {item.label}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, total))}
              disabled={page === total}
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center disabled:opacity-30 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface ProjectViewProps {
  project: Project
  onBack: () => void
}

function SunflowerStaticSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="modal-petal" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#F5C957" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#B07410" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (360 / 14) * i
        return (
          <ellipse
            key={i}
            cx="50"
            cy="22"
            rx="6"
            ry="14"
            fill="url(#modal-petal)"
            transform={`rotate(${angle} 50 50)`}
            opacity="0.85"
          />
        )
      })}
      <circle cx="50" cy="50" r="9" fill="#3A2F1A" />
      <circle cx="50" cy="50" r="6" fill="#1B160B" />
    </svg>
  )
}

/* Champ d'étoiles — reprend le ciel de la Plaine des Sables sur l'affiche La Réunion à l'écran. */
function StarFieldSVG() {
  // Étoiles fixes pour un rendu identique côté SSR/CSR.
  const stars = [
    [8, 12, 0.7], [22, 8, 1.1], [38, 18, 0.6], [54, 6, 1.4], [72, 14, 0.9], [88, 4, 0.8],
    [4, 28, 1.0], [18, 34, 0.6], [32, 24, 1.3], [48, 32, 0.7], [62, 28, 1.1], [78, 38, 0.9], [94, 24, 0.6],
    [12, 48, 0.8], [28, 52, 1.2], [44, 46, 0.6], [60, 56, 0.9], [76, 50, 1.4], [92, 58, 0.7],
    [6, 68, 1.1], [22, 72, 0.6], [40, 78, 0.8], [56, 70, 1.0], [72, 80, 0.7], [88, 74, 1.2],
    [16, 90, 0.6], [34, 86, 0.9], [52, 92, 0.7], [70, 88, 1.1], [86, 94, 0.8],
  ] as const
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {stars.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="#FFE9C8"
          opacity={(0.5 + (r - 0.5) * 0.4).toFixed(2)}
        />
      ))}
      {/* Filet de Voie lactée. */}
      <ellipse cx="62" cy="38" rx="48" ry="6" fill="url(#milkyway)" opacity="0.35" />
      <defs>
        <linearGradient id="milkyway" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#FFE9C8" stopOpacity="0" />
          <stop offset="40%" stopColor="#FFD8A0" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#E8A879" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFE9C8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* Silhouette de chaise de réalisateur — l'élément central au premier plan de l'affiche. */
function DirectorChairSVG({ color = '#0A0A0A' }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <g fill={color}>
        {/* Dossier (toile entre deux montants). */}
        <rect x="22" y="24" width="56" height="4" rx="0.5" />
        <rect x="22" y="46" width="56" height="4" rx="0.5" />
        <rect x="22" y="28" width="56" height="18" />
        {/* Montants verticaux du dossier. */}
        <rect x="20" y="22" width="3" height="32" />
        <rect x="77" y="22" width="3" height="32" />
        {/* Toile d'assise. */}
        <rect x="20" y="62" width="60" height="10" />
        {/* Pieds en X (avant). */}
        <line x1="22" y1="58" x2="60" y2="116" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
        <line x1="78" y1="58" x2="40" y2="116" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
        {/* Pieds en X (arrière). */}
        <line x1="28" y1="58" x2="56" y2="116" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
        <line x1="72" y1="58" x2="44" y2="116" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
        {/* Traverses entre les pieds. */}
        <rect x="34" y="86" width="32" height="2" />
        <rect x="36" y="100" width="28" height="2" />
      </g>
      {/* Toile de la chaise — accent crème comme l'assise du clap visible sur l'affiche. */}
      <rect x="22" y="30" width="56" height="14" fill="#EDE3CD" />
      <rect x="22" y="64" width="56" height="6" fill="#EDE3CD" />
    </svg>
  )
}

/* Mini-livre auto-animé qui tourne ses pages en boucle — utilisé dans le hero
   du guide investisseur pour faire vivre la couverture comme un livre ouvert. */
function AutoFlipPage({
  pages,
  interval = 3800,
  duration = 1350,
  className,
  imgClassName,
}: {
  pages: string[]
  interval?: number
  duration?: number
  className?: string
  imgClassName?: string
}) {
  const [current, setCurrent] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const nextIdx = (current + 1) % Math.max(pages.length, 1)

  useEffect(() => {
    if (flipping || pages.length < 2) return
    const id = setTimeout(() => setFlipping(true), interval)
    return () => clearTimeout(id)
  }, [flipping, current, interval, pages.length])

  if (pages.length === 0) return null

  return (
    <div className={`relative ${className ?? ''}`} style={{ perspective: 2000 }}>
      {/* Page courante au repos. */}
      <img
        src={pages[current]}
        alt=""
        draggable={false}
        className={`block w-full h-full select-none ${imgClassName ?? ''}`}
      />

      {/* Page en train de tourner — montée uniquement pendant le flip. */}
      <AnimatePresence>
        {flipping && (
          <motion.div
            key={`flip-${current}`}
            className="absolute inset-0"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ duration: duration / 1000, ease: [0.45, 0, 0.55, 1] }}
            onAnimationComplete={() => {
              setCurrent((c) => (c + 1) % pages.length)
              setFlipping(false)
            }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src={pages[current]}
              alt=""
              draggable={false}
              className={`absolute inset-0 w-full h-full select-none ${imgClassName ?? ''}`}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' as any }}
            />
            <img
              src={pages[nextIdx]}
              alt=""
              draggable={false}
              className={`absolute inset-0 w-full h-full select-none ${imgClassName ?? ''}`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden' as any,
                transform: 'rotateY(180deg)',
              }}
            />
            {/* Ombre douce sur le pli pendant la rotation. */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0) 100%)',
                opacity: 0.6,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* Sphère de mémoire — translucide, lumineuse, reprend les boules de souvenirs
   de Vice Versa qui changent de couleur selon l'émotion dominante. */
function MemoryOrb({
  color,
  secondary,
  className,
}: {
  color: string
  secondary: string
  className?: string
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className ?? ''}`}
      style={{
        background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, ${color} 22%, ${secondary} 65%, ${secondary}00 100%)`,
        boxShadow: `0 0 60px 5px ${color}55, inset -6px -8px 24px ${secondary}66`,
      }}
      aria-hidden="true"
    >
      {/* Reflet lustré façon bulle de verre. */}
      <div
        className="absolute rounded-full"
        style={{
          top: '15%',
          left: '20%',
          width: '32%',
          height: '22%',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
          transform: 'rotate(-25deg)',
        }}
      />
    </div>
  )
}

/* Motif réseau — réplique du graphisme de la couverture du guide investisseur. */
function GuideNetworkSVG({ stroke = '#7CC4D6', dot = '#7CC4D6' }: { stroke?: string; dot?: string }) {
  const points: [number, number][] = [
    [12, 18], [28, 8], [44, 22], [62, 12], [78, 26], [92, 16],
    [18, 38], [38, 44], [56, 36], [74, 48], [88, 40],
    [10, 60], [26, 70], [44, 62], [62, 74], [80, 66], [94, 78],
    [20, 88], [40, 92], [60, 88], [80, 94],
  ]
  const lines: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 10],
    [6, 7], [7, 8], [8, 9], [9, 10],
    [6, 11], [7, 12], [8, 13], [9, 14], [10, 16],
    [11, 12], [12, 13], [13, 14], [14, 15], [15, 16],
    [11, 17], [12, 17], [13, 18], [14, 19], [15, 20], [16, 20],
    [17, 18], [18, 19], [19, 20],
  ]
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {lines.map(([a, b], i) => (
        <line
          key={`l-${i}`}
          x1={points[a][0]}
          y1={points[a][1]}
          x2={points[b][0]}
          y2={points[b][1]}
          stroke={stroke}
          strokeWidth="0.35"
          opacity="0.55"
        />
      ))}
      {points.map(([x, y], i) => (
        <circle key={`p-${i}`} cx={x} cy={y} r="1.1" fill={dot} opacity="0.85" />
      ))}
    </svg>
  )
}

/* Glyphe LinkedIn (le set lucide installé ne l'exporte pas). */
function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/* Icône d'un KPI selon son intitulé (étude de performance). */
function getPerfIcon(label: string) {
  const l = label.toLowerCase()
  if (l.includes('vue')) return Play
  if (l.includes('impression')) return Eye
  if (l.includes('clic')) return MousePointerClick
  if (l.includes('engagement')) return TrendingUp
  if (l.includes('commentaire')) return MessageCircle
  if (l.includes('réaction') || l.includes('reaction')) return ThumbsUp
  if (l.includes('republi') || l.includes('partage')) return Repeat2
  return BarChart3
}

/* Carte KPI mise en avant (gros chiffre, fond doré). large = hero unique. */
function PerfHighlightCard({
  highlight,
  large,
}: {
  highlight: PerformanceHighlight
  large?: boolean
}) {
  const Icon = getPerfIcon(highlight.label)
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-accent/30 ${large ? 'p-6 md:p-7' : 'p-5'}`}
      style={{ background: 'linear-gradient(135deg, #FBF4DD 0%, #F5E5C0 100%)' }}
    >
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,168,35,0.22) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="flex items-center gap-2 mb-3 relative z-[1]">
        <Icon className="w-4 h-4 text-accent-blue" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-accent-blue" style={{ fontWeight: 700 }}>
          {highlight.label}
        </span>
      </div>
      <p
        className={`text-night leading-none relative z-[1] ${large ? 'text-5xl md:text-6xl' : 'text-4xl'}`}
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.03em' }}
      >
        {highlight.value}
      </p>
      {highlight.note && (
        <p className="mt-3 text-sm text-text-muted relative z-[1]">{highlight.note}</p>
      )}
    </div>
  )
}

/* Petite carte KPI (chiffre secondaire). */
function PerfMetricCard({ metric }: { metric: PerformanceMetric }) {
  const Icon = getPerfIcon(metric.label)
  return (
    <div className="rounded-xl p-4 md:p-5 bg-ivory border border-night/8">
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className="w-4 h-4 text-accent" />
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-text-muted" style={{ fontWeight: 700 }}>
          {metric.label}
        </span>
      </div>
      <p
        className="text-2xl md:text-3xl text-night leading-none"
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
      >
        {metric.value}
      </p>
    </div>
  )
}

/* Bloc "étude de performance" — bandeau LinkedIn, vidéo/capture, KPI, analyse.
   Deux modes : avec vidéo (vidéo centrée + highlights en rangée) ou compact
   (capture à gauche, KPI à droite). */
function PerformanceBlock({
  data,
  onZoom,
}: {
  data: PerformanceSection
  onZoom: (src: string) => void
}) {
  const hasVideo = !!data.video
  const singleHighlight = data.highlights.length === 1

  const Capture = data.image ? (
    <figure className="m-0">
      <button
        type="button"
        onClick={() => onZoom(data.image!)}
        className="group/img block w-full rounded-2xl overflow-hidden border border-night/10 bg-ivory-warm/40 shadow-[0_10px_36px_-14px_rgba(0,0,0,0.25)] cursor-pointer"
        aria-label="Agrandir la capture LinkedIn"
        data-cursor="hover"
      >
        <div className="relative flex items-center justify-center p-4 md:p-6">
          <Picture
            src={data.image}
            alt={data.imageCaption || data.title}
            imgClassName="w-full h-auto max-h-[520px] object-contain rounded-lg"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
          <div className="absolute inset-0 bg-night/0 group-hover/img:bg-night/5 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover/img:opacity-100 transition-all duration-300 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center">
              <Maximize2 className="w-5 h-5 text-night" />
            </span>
          </div>
        </div>
      </button>
      {data.imageCaption && (
        <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.22em] text-text-muted" style={{ fontWeight: 600 }}>
          {data.imageCaption}
        </figcaption>
      )}
    </figure>
  ) : null

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-night/10 bg-white shadow-[0_4px_40px_-16px_rgba(176,116,16,0.18)]"
      aria-label={data.title}
    >
      {/* Bandeau LinkedIn */}
      <div className="flex items-center gap-3 px-6 md:px-8 py-4 border-b border-night/5 bg-ivory-warm/40">
        <span className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center shrink-0">
          <LinkedinGlyph className="w-[18px] h-[18px] text-white" />
        </span>
        {data.label && (
          <span className="text-[10px] uppercase tracking-[0.32em] text-text-muted" style={{ fontWeight: 700 }}>
            {data.label}
          </span>
        )}
        <span className="ml-auto text-[10px] uppercase tracking-[0.28em] text-[#0A66C2]" style={{ fontWeight: 700 }}>
          LinkedIn Analytics
        </span>
      </div>

      <div className="p-6 md:p-10">
        <h3
          className="text-2xl md:text-3xl mb-4 text-night leading-[1.15]"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
        >
          {data.title}
        </h3>
        <p className="text-text-muted leading-[1.8] max-w-3xl">{data.intro}</p>

        {/* Vidéo centrée (mode vidéo) */}
        {hasVideo && (
          <figure className="m-0 mt-8 max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-night/10 bg-night shadow-[0_18px_50px_-18px_rgba(0,0,0,0.5)]">
              <video
                src={data.video}
                controls
                preload="metadata"
                className="w-full h-auto block bg-black"
              />
            </div>
            {data.videoCaption && (
              <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.22em] text-text-muted" style={{ fontWeight: 600 }}>
                {data.videoCaption}
              </figcaption>
            )}
          </figure>
        )}

        {hasVideo ? (
          <>
            {/* Highlights en rangée pleine largeur */}
            {data.highlights.length > 0 && (
              <div
                className={`mt-8 grid gap-3 sm:grid-cols-2 ${data.highlights.length >= 3 ? 'lg:grid-cols-3' : ''}`}
              >
                {data.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PerfHighlightCard highlight={h} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Capture + métriques secondaires */}
            <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
              {Capture}
              <div className="grid grid-cols-2 gap-3">
                {data.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PerfMetricCard metric={m} />
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Mode compact : capture à gauche, KPI à droite */
          <div className="grid lg:grid-cols-2 gap-8 mt-8 items-center">
            {Capture}
            <div className="space-y-4">
              {data.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PerfHighlightCard highlight={h} large={singleHighlight} />
                </motion.div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {data.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PerfMetricCard metric={m} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analyse */}
        <div className="mt-8 pt-7 border-t border-night/8">
          <h4 className="flex items-center gap-2 mb-3 text-night" style={{ fontWeight: 600 }}>
            <span className="w-1.5 h-5 bg-accent rounded-full" aria-hidden="true" />
            Analyse
          </h4>
          <p className="text-text-muted leading-[1.8] w-full">{data.analysis}</p>
        </div>
      </div>
    </motion.section>
  )
}

/* Une ligne d'axe du mood board : numéro + titre + description (+ puces),
   et le(s) visuel(s). Plusieurs visuels = cartes "références" sur fond clair,
   un seul = cadre photo pleine image. media alterne gauche/droite. */
function MoodboardAxisRow({
  axis,
  reversed,
  onZoom,
}: {
  axis: MoodboardAxis
  reversed: boolean
  onZoom: (src: string) => void
}) {
  const isCardSet = axis.images.length > 1

  const media = isCardSet ? (
    <div className="grid grid-cols-3 gap-3">
      {axis.images.map((img, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="m-0"
        >
          <button
            type="button"
            onClick={() => onZoom(img.src)}
            data-cursor="hover"
            className="group/m block w-full rounded-xl overflow-hidden bg-[#F4ECDA] border border-white/10 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] cursor-pointer"
            aria-label={img.caption || 'Agrandir'}
          >
            <div className="aspect-square flex items-center justify-center p-4 md:p-5">
              <Picture
                src={img.src}
                alt={img.caption || axis.title}
                imgClassName="max-w-full max-h-full object-contain transition-transform duration-500 group-hover/m:scale-[1.05]"
                sizes="(max-width: 768px) 30vw, 16vw"
              />
            </div>
          </button>
          {img.caption && (
            <figcaption className="mt-2 text-center text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-ivory/45" style={{ fontWeight: 600 }}>
              {img.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  ) : (
    <figure className="m-0">
      <button
        type="button"
        onClick={() => onZoom(axis.images[0].src)}
        data-cursor="hover"
        className="group/m block w-full rounded-2xl overflow-hidden bg-black/25 border border-white/10 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.7)] cursor-pointer"
        aria-label={axis.images[0].caption || 'Agrandir'}
      >
        <div className="flex items-center justify-center p-3 md:p-4">
          <Picture
            src={axis.images[0].src}
            alt={axis.images[0].caption || axis.title}
            imgClassName="w-full h-auto max-h-[440px] object-contain rounded-lg transition-transform duration-700 group-hover/m:scale-[1.02]"
            sizes="(max-width: 1024px) 90vw, 42vw"
          />
        </div>
      </button>
      {axis.images[0].caption && (
        <figcaption className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-ivory/45" style={{ fontWeight: 600 }}>
          {axis.images[0].caption}
        </figcaption>
      )}
    </figure>
  )

  const text = (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm tabular-nums text-accent" style={{ fontWeight: 700 }}>
          {axis.index}
        </span>
        <span className="block w-10 h-px bg-accent/40" aria-hidden="true" />
      </div>
      <h4
        className="text-xl md:text-2xl text-ivory mb-3 leading-snug"
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
      >
        {axis.title}
      </h4>
      <p className="text-ivory/65 leading-[1.75] text-sm md:text-[15px]">{axis.description}</p>
      {axis.bullets && axis.bullets.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {axis.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-ivory/75 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[0.5rem]" aria-hidden="true" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-12 gap-7 md:gap-10 items-center"
    >
      <div className={`md:col-span-7 ${reversed ? 'md:order-2' : ''}`}>{media}</div>
      <div className={`md:col-span-5 ${reversed ? 'md:order-1' : ''}`}>{text}</div>
    </motion.div>
  )
}

/* Mood board complet : veille créative en 4 axes + palette + mots-clés,
   sur un panneau sombre cinématographique. */
function MoodboardSection({ data, onZoom }: { data: Moodboard; onZoom: (src: string) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl"
      style={{ background: 'linear-gradient(160deg, #14110C 0%, #1B160B 55%, #241A12 100%)' }}
      aria-label={data.title}
    >
      {/* Lueur dorée diffuse en haut. */}
      <div
        className="absolute -top-24 right-0 w-[480px] h-[480px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(229,168,35,0.18) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative p-6 md:p-12">
        {/* En-tête */}
        <div className="mb-10 md:mb-14">
          {data.label && (
            <span className="block text-[10px] uppercase tracking-[0.34em] text-accent mb-4" style={{ fontWeight: 700 }}>
              {data.label}
            </span>
          )}
          <h3
            className="text-3xl md:text-4xl text-ivory leading-[1.1] mb-4"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
          >
            {data.title}
          </h3>
          <p className="text-ivory/65 leading-[1.8] w-full">{data.intro}</p>

          {/* Mots-clés */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-7">
            {data.keywords.map((k, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-accent/50" aria-hidden="true" />}
                <span className="text-[11px] uppercase tracking-[0.22em] text-ivory/55" style={{ fontWeight: 600 }}>
                  {k}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Axes de veille */}
        <div className="space-y-12 md:space-y-16">
          {data.axes.map((axis, i) => (
            <MoodboardAxisRow key={axis.index} axis={axis} reversed={i % 2 === 1} onZoom={onZoom} />
          ))}
        </div>

        {/* Résultat final — climax */}
        <div className="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-white/10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-accent" style={{ fontWeight: 700 }}>
              <span className="font-mono">04</span>
              <span className="w-8 h-px bg-accent/40" aria-hidden="true" />
              Résultat final
            </span>
          </div>

          <div className="relative flex justify-center">
            {/* Projecteur : halo derrière l'affiche. */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="w-[70%] h-[80%] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(229,168,35,0.22) 0%, rgba(199,122,72,0.12) 40%, transparent 72%)' }}
              />
            </div>
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onZoom(data.finalImage)}
              data-cursor="hover"
              className="relative group/final rounded-2xl overflow-hidden border border-accent/25 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.8)] cursor-pointer"
              aria-label={data.finalCaption || 'Agrandir l\'affiche finale'}
            >
              <Picture
                src={data.finalImage}
                alt={data.finalCaption || 'Affiche finale'}
                imgClassName="block w-auto h-auto max-h-[68vh] md:max-h-[640px] object-contain transition-transform duration-700 group-hover/final:scale-[1.02]"
                sizes="(max-width: 768px) 86vw, 40vw"
              />
            </motion.button>
          </div>

          {data.finalCaption && (
            <p className="mt-5 text-center text-[11px] uppercase tracking-[0.26em] text-accent/90" style={{ fontWeight: 700 }}>
              {data.finalCaption}
            </p>
          )}
          {data.finalNote && (
            <p
              className="mt-4 text-center text-ivory/70 italic leading-[1.8] max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {data.finalNote}
            </p>
          )}

          {/* Palette */}
          {data.palette.length > 0 && (
            <div className="mt-10 md:mt-12 max-w-2xl mx-auto">
              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-ivory/45 mb-4" style={{ fontWeight: 700 }}>
                Palette extraite de l'affiche finale
              </p>
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {data.palette.map((sw, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <div
                      className="w-full h-14 md:h-16 rounded-xl border border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.12)]"
                      style={{ backgroundColor: sw.color }}
                      aria-hidden="true"
                    />
                    <span className="block mt-2 text-[8px] md:text-[9px] uppercase tracking-[0.14em] text-ivory/55 leading-tight" style={{ fontWeight: 600 }}>
                      {sw.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

/* Carte d'une proposition d'affiche (piste graphique). */
function PosterCard({
  proposal,
  badge,
  onZoom,
  featured,
}: {
  proposal: PosterProposal
  badge: string
  onZoom: (src: string) => void
  featured?: boolean
}) {
  return (
    <figure className="m-0">
      <button
        type="button"
        onClick={() => onZoom(proposal.src)}
        data-cursor="hover"
        className={`group/p relative block w-full rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-500 ${
          proposal.selected
            ? 'ring-2 ring-accent shadow-[0_20px_50px_-18px_rgba(176,116,16,0.5)]'
            : 'border border-night/10 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.4)]'
        }`}
        aria-label={proposal.title}
      >
        {proposal.selected && (
          <span className="absolute top-3 left-3 z-[2] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-night shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ fontWeight: 800 }}>
              {badge}
            </span>
          </span>
        )}
        <Picture
          src={proposal.src}
          alt={proposal.title}
          imgClassName={`block w-full h-auto object-contain transition-transform duration-700 ease-out group-hover/p:scale-[1.04] ${
            featured ? 'max-h-[600px]' : ''
          }`}
          sizes={featured ? '(max-width: 768px) 90vw, 38vw' : '(max-width: 640px) 90vw, 30vw'}
        />
      </button>
      <figcaption className="mt-3">
        {proposal.step && (
          <span
            className={`block font-mono text-[10px] uppercase tracking-[0.24em] mb-1 ${
              proposal.selected ? 'text-accent-blue' : 'text-text-muted'
            }`}
            style={{ fontWeight: 700 }}
          >
            {proposal.step}
          </span>
        )}
        <span className="block text-night leading-snug" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
          {proposal.title}
        </span>
        {proposal.note && <span className="block mt-1.5 text-sm text-text-muted leading-relaxed">{proposal.note}</span>}
      </figcaption>
    </figure>
  )
}

/* Carte d'aperçu d'une police de la charte finale. */
function FontPreviewCard({ font }: { font: FontChoice }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-night/10 bg-white overflow-hidden shadow-[0_8px_30px_-18px_rgba(0,0,0,0.3)]"
    >
      {/* Aperçu typographique */}
      <div className="px-6 py-8 md:py-10 bg-gradient-to-br from-ivory-warm/70 to-ivory flex items-center justify-center min-h-[120px]">
        <span
          className="text-night text-center leading-tight"
          style={{
            fontFamily: `'${font.fontFamily}', serif`,
            fontWeight: 600,
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            textTransform: font.uppercase ? 'uppercase' : 'none',
            letterSpacing: font.uppercase ? '0.04em' : '0',
          }}
        >
          {font.sample}
        </span>
      </div>
      {/* Méta */}
      <div className="px-6 py-5 border-t border-night/8">
        <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.26em] text-text-muted" style={{ fontWeight: 700 }}>
            {font.usage}
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent/10 text-accent-blue border border-accent/20" style={{ fontWeight: 600 }}>
            {font.font}
          </span>
        </div>
        <p className="text-sm text-text-muted leading-relaxed">{font.description}</p>
      </div>
    </motion.div>
  )
}

/* Construction de l'identité visuelle — étude de cas : pistes, typographies, DA. */
function IdentitySection({ data, onZoom }: { data: VisualIdentity; onZoom: (src: string) => void }) {
  const explorations = data.proposals.filter((p) => !p.selected)
  const retained = data.proposals.find((p) => p.selected)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-night/10 bg-white shadow-[0_4px_40px_-16px_rgba(176,116,16,0.18)]"
      aria-label={data.title}
    >
      <div className="p-6 md:p-12">
        {/* En-tête */}
        <div className="mb-10 md:mb-12">
          {data.label && (
            <span className="block text-[10px] uppercase tracking-[0.3em] text-accent-blue mb-4" style={{ fontWeight: 700 }}>
              {data.label}
            </span>
          )}
          <h3
            className="text-3xl md:text-4xl text-night leading-[1.1] mb-4"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
          >
            {data.title}
          </h3>
          <p className="text-text-muted leading-[1.8] w-full">{data.intro}</p>
        </div>

        {/* Sous-section 1 — Recherches et explorations */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm tabular-nums text-accent" style={{ fontWeight: 700 }}>01</span>
            <span className="w-10 h-px bg-accent/40" aria-hidden="true" />
            <h4 className="text-xl md:text-2xl text-night" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              {data.proposalsTitle}
            </h4>
          </div>

          {/* Pistes explorées */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {explorations.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <PosterCard proposal={p} badge={data.selectedBadge} onZoom={onZoom} />
              </motion.div>
            ))}
          </div>

          {/* Proposition retenue — mise en avant */}
          {retained && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 md:mt-8 rounded-2xl p-5 md:p-8 border border-accent/25"
              style={{ background: 'linear-gradient(135deg, #FBF4DD 0%, #F5E5C0 100%)' }}
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                <PosterCard proposal={retained} badge={data.selectedBadge} onZoom={onZoom} featured />
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-night mb-4">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontWeight: 800 }}>
                      {data.selectedBadge}
                    </span>
                  </span>
                  <h5
                    className="text-2xl md:text-3xl text-night mb-3 leading-tight"
                    style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
                  >
                    {retained.title}
                  </h5>
                  {retained.note && <p className="text-text-muted leading-[1.8]">{retained.note}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* Analyse de la galerie */}
          <div className="mt-7 md:mt-8 flex gap-4 w-full">
            <Quote className="w-7 h-7 text-accent/50 shrink-0" />
            <p className="text-text-muted leading-[1.85] italic" style={{ fontFamily: 'var(--font-serif)' }}>
              {data.galleryAnalysis}
            </p>
          </div>
        </div>

        {/* Sous-section 2 — Choix typographiques */}
        <div className="mb-12 md:mb-16 pt-10 md:pt-12 border-t border-night/8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm tabular-nums text-accent" style={{ fontWeight: 700 }}>02</span>
            <span className="w-10 h-px bg-accent/40" aria-hidden="true" />
            <h4 className="text-xl md:text-2xl text-night" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              {data.typographyTitle}
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {data.fonts.map((f, i) => (
              <FontPreviewCard key={i} font={f} />
            ))}
          </div>
        </div>

        {/* Sous-section 3 — Direction artistique retenue */}
        <div className="pt-10 md:pt-12 border-t border-night/8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm tabular-nums text-accent" style={{ fontWeight: 700 }}>03</span>
            <span className="w-10 h-px bg-accent/40" aria-hidden="true" />
            <h4 className="text-xl md:text-2xl text-night" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              {data.daTitle}
            </h4>
          </div>
          <div
            className="relative overflow-hidden rounded-2xl p-7 md:p-9 border border-accent/20"
            style={{ background: 'linear-gradient(135deg, #FFFCF4 0%, #FBF4DD 100%)' }}
          >
            <Sparkles className="w-7 h-7 text-accent mb-4" />
            <p className="text-lg md:text-xl text-night/85 leading-[1.85]" style={{ fontFamily: 'var(--font-serif)' }}>
              {data.daText}
            </p>
            {data.daTags && data.daTags.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mt-6">
                {data.daTags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full bg-white/70 text-accent-blue border border-accent/20"
                    style={{ fontWeight: 600 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* Conteneur déroulant « Voir plus » — clampe la hauteur avec un fondu,
   puis déploie tout le contenu. Allège la lecture sans rien retirer. */
function Expandable({
  children,
  label = 'Voir plus',
  collapsedHeight = 560,
}: {
  children: React.ReactNode
  label?: string
  collapsedHeight?: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div
        className="relative overflow-hidden transition-[max-height] duration-700 ease-out"
        style={{ maxHeight: open ? 24000 : collapsedHeight }}
      >
        {children}
        {!open && (
          <div
            className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ivory via-ivory/85 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          data-cursor="hover"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-accent/40 text-accent-blue hover:bg-accent hover:text-night transition-colors duration-300"
        >
          <span className="text-[11px] uppercase tracking-[0.25em]" style={{ fontWeight: 700 }}>
            {open ? 'Voir moins' : label}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  )
}

/* Bloc « Mon rôle » — missions + coordination de prestataires (activité BTS valorisée). */
function RoleBlock({ role }: { role: ProjectRole }) {
  const icons = [Sparkles, FileText, MessageCircle, Images, BarChart3, Users]
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-night/5">
      <h3 className="text-2xl mb-2 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
        <div className="w-2 h-8 bg-accent rounded-full" />
        Mon rôle
      </h3>
      {role.intro && <p className="text-text-muted leading-relaxed mb-6 w-full">{role.intro}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {role.missions.map((m, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div key={i} className="flex gap-3 p-4 rounded-xl bg-ivory border border-night/5">
              <span className="w-9 h-9 rounded-full bg-accent/12 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-accent-blue" />
              </span>
              <div>
                <p className="text-night leading-tight mb-1" style={{ fontWeight: 600 }}>{m.title}</p>
                {m.description && <p className="text-sm text-text-muted leading-relaxed">{m.description}</p>}
              </div>
            </div>
          )
        })}
      </div>

      {role.collaboration && (
        <div className="mt-5 p-5 md:p-6 rounded-xl border border-accent/25 bg-gradient-to-br from-accent/[0.08] to-accent/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent-blue" style={{ fontWeight: 700 }}>
              {role.collaboration.label}
            </span>
          </div>
          <p className="text-text-muted leading-relaxed w-full">{role.collaboration.text}</p>
        </div>
      )}
    </div>
  )
}

/* Bloc « Bilan » — recul professionnel et conclusion. */
function BilanBlock({ text }: { text: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-7 md:p-9 border border-accent/20"
      style={{ background: 'linear-gradient(135deg, #FFFCF4 0%, #FBF4DD 100%)' }}
    >
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,168,35,0.16) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <h3 className="text-2xl mb-4 flex items-center gap-3 text-night relative z-[1]" style={{ fontFamily: 'var(--font-serif)' }}>
        <Flag className="w-6 h-6 text-accent" />
        Bilan
      </h3>
      <p className="text-lg text-night/85 leading-[1.85] relative z-[1] w-full" style={{ fontFamily: 'var(--font-serif)' }}>
        {text}
      </p>
    </div>
  )
}

export function ProjectView({ project, onBack }: ProjectViewProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [convLightboxOpen, setConvLightboxOpen] = useState(false)
  const [convLightboxIndex, setConvLightboxIndex] = useState(0)
  const [carouselLightbox, setCarouselLightbox] = useState<CarouselItem | null>(null)

  // Remonte en haut de page à l'arrivée sur la page projet
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [project.id])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) setLightboxImage(null)
        else if (convLightboxOpen) setConvLightboxOpen(false)
        else if (carouselLightbox) setCarouselLightbox(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [lightboxImage, convLightboxOpen, carouselLightbox])

  const totalMedia =
    project.gallery.length +
    (project.videos?.length || 0) +
    (project.conversationGroup ? 1 : 0) +
    (project.carousels?.length || 0)
  const gridClass =
    totalMedia === 1
      ? 'grid-cols-1 max-w-md mx-auto'
      : totalMedia === 2
        ? 'grid-cols-2 max-w-2xl mx-auto'
        : 'grid-cols-2 md:grid-cols-3'

  // Identité visuelle reprise du guide investisseur (deep navy + cyan + motif réseau).
  const isGuideTheme = project.id === 'guide-investisseur'
  // Identité visuelle reprise de l'affiche La Réunion à l'écran (ciel étoilé + terracotta).
  const isCinemaTheme = project.id === 'reunion-ecran'
  // Identité visuelle reprise de l'univers Vice Versa (cosmos onirique + sphères de mémoire).
  const isViceVersaTheme = project.id === 'disney-100-ans'
  const isDarkTheme = isGuideTheme || isCinemaTheme || isViceVersaTheme
  // Pour l'infographie, on n'affiche pas le visuel dans le hero (le SlideViewer du PDF suffit).
  const hideHeroImage = project.id === 'infographie-publicite-contextuelle'
  const heroBackground = isGuideTheme
    ? 'linear-gradient(135deg, #0B1A44 0%, #122862 55%, #1C3A8E 100%)'
    : isCinemaTheme
      ? 'linear-gradient(180deg, #050818 0%, #0E1834 22%, #2E1F30 48%, #5A2E22 70%, #8E4F2A 88%, #B26340 100%)'
      : isViceVersaTheme
        ? 'linear-gradient(180deg, #0F1842 0%, #1F2768 25%, #3A2B72 50%, #6E3580 70%, #B8568C 88%, #F0A26E 100%)'
        : 'linear-gradient(135deg, #FFFCF4 0%, #FBF4DD 50%, #F5E5C0 100%)'
  // Accent texte selon thème (cyan pour le guide, crème chaud pour le ciné, jaune Joie pour Vice Versa, doré sinon).
  const heroAccentText = isGuideTheme
    ? 'text-[#9DD8E6]'
    : isCinemaTheme
      ? 'text-[#FFD8A0]'
      : isViceVersaTheme
        ? 'text-[#FFD05A]'
        : 'text-accent'
  const heroAccentBlueText = isGuideTheme
    ? 'text-[#9DD8E6]'
    : isCinemaTheme
      ? 'text-[#FFD8A0]'
      : isViceVersaTheme
        ? 'text-[#FFD05A]'
        : 'text-accent-blue'
  const heroAccentBorder = isGuideTheme
    ? 'border-[#7CC4D6]/40'
    : isCinemaTheme
      ? 'border-[#FFD8A0]/40'
      : isViceVersaTheme
        ? 'border-[#FFD05A]/40'
        : 'border-accent/30'

  return (
    <AnimatePresence>
      {carouselLightbox && (
        <CarouselLightbox
          key="carousel-lightbox"
          item={carouselLightbox}
          onClose={() => setCarouselLightbox(null)}
        />
      )}

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          key="lightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-night" />
            </button>
            <Picture
              src={lightboxImage}
              alt="Vue plein écran"
              loading="eager"
              imgClassName="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              sizes="90vw"
            />
          </motion.div>
        </div>
      )}

      {/* Conversation Group Lightbox */}
      {convLightboxOpen && project.conversationGroup && (
        <div
          key="convLightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setConvLightboxOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center gap-4 md:gap-8 max-w-[96vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setConvLightboxOpen(false)}
              className="absolute -top-5 -right-2 md:-top-6 md:-right-6 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-ivory-warm transition-colors border border-night/10"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-night" />
            </button>

            <button
              onClick={() => {
                const len = project.conversationGroup!.images.length
                setConvLightboxIndex((prev) => (prev - 1 + len) % len)
              }}
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-ivory-warm hover:scale-110 active:scale-95 transition-all border border-night/10"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-7 h-7 text-night" />
            </button>

            <div className="relative max-w-[75vw] max-h-[85vh] flex flex-col items-center gap-4">
              <Picture
                src={project.conversationGroup.images[convLightboxIndex]}
                alt={`${project.conversationGroup.label} – ${convLightboxIndex + 1}`}
                loading="eager"
                imgClassName="max-w-[75vw] max-h-[78vh] object-contain rounded-2xl shadow-2xl"
                sizes="75vw"
              />
              <div className="px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg text-sm text-night border border-night/10">
                {convLightboxIndex + 1} / {project.conversationGroup.images.length} — {project.conversationGroup.label}
              </div>
            </div>

            <button
              onClick={() => {
                const len = project.conversationGroup!.images.length
                setConvLightboxIndex((prev) => (prev + 1) % len)
              }}
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-ivory-warm hover:scale-110 active:scale-95 transition-all border border-night/10"
              aria-label="Suivant"
            >
              <ChevronRight className="w-7 h-7 text-night" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Page projet — vraie page (pas une modale) */}
      <motion.article
        key="project-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-ivory min-h-screen pb-24"
        aria-labelledby="project-title"
      >
        {/* Bandeau supérieur avec bouton retour */}
        <div className="sticky top-0 z-30 backdrop-blur-md bg-ivory/85 border-b border-accent/15">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2.5 text-night hover:text-accent-blue transition-colors"
              aria-label="Retour"
            >
              <span className="w-9 h-9 rounded-full border border-accent/30 group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all">
                <ArrowLeft className="w-4 h-4 text-accent group-hover:text-night transition-colors" />
              </span>
              <span className="text-[12px] uppercase tracking-[0.25em]" style={{ fontWeight: 600 }}>
                Retour aux projets
              </span>
            </button>
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-text-muted hidden md:inline"
              style={{ fontWeight: 600 }}
            >
              {project.category}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-ivory shadow-[0_4px_40px_-12px_rgba(176,116,16,0.10)] md:rounded-3xl md:my-10 overflow-hidden">

          {/* Hero Section — cream + gold (ou navy + cyan pour le guide investisseur) */}
          <div
            className={`relative grid gap-0 items-stretch ${hideHeroImage ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}
            style={{ background: heroBackground }}
          >
            {isGuideTheme && (
              <>
                {/* Motif réseau aux deux coins, signature du guide. */}
                <div
                  className="absolute -top-12 -right-12 w-72 h-72 opacity-30 pointer-events-none"
                  aria-hidden="true"
                >
                  <GuideNetworkSVG stroke="#7CC4D6" dot="#9DD8E6" />
                </div>
                <div
                  className="absolute -bottom-16 -left-16 w-60 h-60 opacity-20 pointer-events-none"
                  aria-hidden="true"
                >
                  <GuideNetworkSVG stroke="#7CC4D6" dot="#9DD8E6" />
                </div>
                {/* Onglet "page" reprenant la signature du document. */}
                <div className="absolute top-0 right-0 hidden md:flex items-center pointer-events-none">
                  <div className="bg-ivory px-7 py-2.5 rounded-bl-2xl shadow-md">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-[#0B1A44]" style={{ fontWeight: 700 }}>
                      Édition · 2025
                    </span>
                  </div>
                </div>
              </>
            )}

            {isCinemaTheme && (
              <>
                {/* Champ d'étoiles dense sur la moitié haute (ciel cosmique de l'affiche). */}
                <div className="absolute inset-x-0 top-0 h-3/5 opacity-100 pointer-events-none" aria-hidden="true">
                  <StarFieldSVG />
                </div>
                {/* Voie lactée orange/rose en diagonale, signature du ciel de l'affiche. */}
                <div
                  className="absolute top-0 -right-20 w-[140%] h-1/2 opacity-55 pointer-events-none mix-blend-screen"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 35% at 70% 35%, #C9663A 0%, #8E3A2E 30%, transparent 65%)',
                    transform: 'rotate(-8deg)',
                  }}
                  aria-hidden="true"
                />
                {/* Horizon volcanique chaud en bas. */}
                <div
                  className="absolute -bottom-16 -right-20 w-96 h-96 rounded-full opacity-55 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #D17542 0%, #8E4F2A 50%, transparent 75%)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full opacity-35 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #B26340 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                {/* Silhouette de chaise de réalisateur (premier plan de l'affiche). */}
                <div
                  className="absolute bottom-2 right-6 w-20 h-24 md:w-28 md:h-32 opacity-90 pointer-events-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
                  aria-hidden="true"
                >
                  <DirectorChairSVG color="#080808" />
                </div>
                {/* Étiquette "événement" en haut à droite. */}
                <div className="absolute top-0 right-0 hidden md:flex items-center pointer-events-none z-[3]">
                  <div className="bg-[#C77A48] px-7 py-2.5 rounded-bl-2xl shadow-md">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-ivory" style={{ fontWeight: 700 }}>
                      29 sept. — 4 oct. 2025
                    </span>
                  </div>
                </div>
              </>
            )}

            {isViceVersaTheme && (
              <>
                {/* Champ d'étoiles léger dans le ciel cosmique. */}
                <div className="absolute inset-x-0 top-0 h-3/5 opacity-80 pointer-events-none" aria-hidden="true">
                  <StarFieldSVG />
                </div>

                {/* Sphères de mémoire flottantes — une par émotion Vice Versa. */}
                {/* Joie — jaune solaire, en haut à droite, la plus grande. */}
                <MemoryOrb
                  color="#FFD05A"
                  secondary="#E8A82E"
                  className="top-8 right-10 w-32 h-32 md:w-44 md:h-44 opacity-90"
                />
                {/* Tristesse — bleu doux, milieu gauche. */}
                <MemoryOrb
                  color="#6FA8E0"
                  secondary="#3B6AA8"
                  className="top-1/3 left-6 w-20 h-20 md:w-28 md:h-28 opacity-85"
                />
                {/* Peur — violet, en haut à gauche. */}
                <MemoryOrb
                  color="#A98BD8"
                  secondary="#6C4FA8"
                  className="top-10 left-1/4 w-14 h-14 md:w-20 md:h-20 opacity-80"
                />
                {/* Dégoût — vert tendre, milieu droite. */}
                <MemoryOrb
                  color="#92D67E"
                  secondary="#5DA64A"
                  className="top-1/2 right-1/3 w-12 h-12 md:w-16 md:h-16 opacity-75"
                />
                {/* Anxiété — orange, bas droite. */}
                <MemoryOrb
                  color="#F3A65E"
                  secondary="#C26F2E"
                  className="bottom-12 right-16 w-16 h-16 md:w-24 md:h-24 opacity-85"
                />
                {/* Colère — rouge, bas gauche, plus discrète. */}
                <MemoryOrb
                  color="#E96250"
                  secondary="#B33C2C"
                  className="bottom-6 left-12 w-12 h-12 md:w-16 md:h-16 opacity-80"
                />

                {/* Halo aurore en bas pour la transition coral → orange. */}
                <div
                  className="absolute -bottom-24 inset-x-0 h-64 opacity-50 pointer-events-none mix-blend-screen"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 100% at 50% 100%, #FFB37A 0%, #E86A8E 35%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Étiquette "Disney 100" en haut à droite. */}
                <div className="absolute top-0 right-0 hidden md:flex items-center pointer-events-none z-[3]">
                  <div className="bg-[#FFD05A] px-7 py-2.5 rounded-bl-2xl shadow-md">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-[#1F2768]" style={{ fontWeight: 800 }}>
                      Disney 100 · Grand Rex
                    </span>
                  </div>
                </div>
              </>
            )}

            {!isDarkTheme && (
              <div
                className="absolute -top-10 -right-10 w-44 h-44 opacity-20 pointer-events-none"
                aria-hidden="true"
              >
                <SunflowerStaticSVG />
              </div>
            )}

            {!hideHeroImage && (
              <div className="relative overflow-hidden">
                <div className="aspect-[3/4] md:aspect-auto md:min-h-[440px] flex items-center justify-center p-6 h-full">
                  {isGuideTheme ? (
                    /* Guide investisseur — la couverture et les pages-clés tournent en boucle
                       dans le hero pour évoquer un livre que l'on feuillette. */
                    <AutoFlipPage
                      pages={[
                        typeof project.image === 'string' ? project.image : ((project.image as any).src ?? project.image),
                        ...project.gallery.map((item) => {
                          const src = typeof item === 'string' ? item : item.image
                          return typeof src === 'string' ? src : ((src as any).src ?? src)
                        }),
                      ]}
                      className="relative z-[2] max-w-full max-h-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
                      imgClassName="object-contain rounded-sm"
                    />
                  ) : (
                    <Picture
                      src={project.image}
                      alt={project.title}
                      imgClassName={`w-full h-full object-contain relative z-[2] ${
                        isDarkTheme
                          ? 'drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]'
                          : 'drop-shadow-[0_10px_28px_rgba(176,116,16,0.20)]'
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              </div>
            )}

            <div className="relative z-[2] p-8 md:p-12 flex flex-col justify-center">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 self-start ${
                  isDarkTheme
                    ? `bg-white/10 border ${heroAccentBorder}`
                    : 'bg-accent/12 border border-accent/30'
                }`}
              >
                <span
                  className={`text-sm uppercase tracking-[0.25em] font-medium ${heroAccentBlueText}`}
                  style={{ fontWeight: 600 }}
                >
                  {project.category}
                </span>
              </div>

              {isCinemaTheme ? (
                <h2
                  id="modal-title"
                  className="mb-6 text-ivory leading-[0.9]"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
                >
                  <span
                    className="block text-5xl md:text-7xl italic"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    La Réunion
                  </span>
                  <span
                    className="block mt-2 text-2xl md:text-3xl uppercase"
                    style={{ fontWeight: 600, letterSpacing: '0.18em', fontFamily: 'var(--font-serif)' }}
                  >
                    à l'écran
                  </span>
                </h2>
              ) : (
                <h2
                  id="modal-title"
                  className={`text-4xl md:text-5xl mb-6 leading-[1.1] ${
                    isDarkTheme ? 'text-ivory' : 'text-night'
                  }`}
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
                >
                  {project.title}
                </h2>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkTheme
                        ? 'bg-white/8 text-white/85 border border-white/15'
                        : 'bg-accent/8 text-accent-blue border border-accent/20'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.slogan && (
                isCinemaTheme ? (
                  <div className="mb-8 pb-8 border-b border-white/15 space-y-3">
                    <span className="inline-block bg-ivory text-[#1A1228] px-4 py-2.5 shadow-md">
                      <span
                        className="text-sm md:text-base uppercase"
                        style={{ fontWeight: 800, letterSpacing: '0.25em' }}
                      >
                        Une île de talents
                      </span>
                    </span>
                    <span className="block">
                      <span className="inline-block bg-ivory text-[#1A1228] px-4 py-2.5 shadow-md">
                        <span
                          className="text-sm md:text-base uppercase"
                          style={{ fontWeight: 800, letterSpacing: '0.25em' }}
                        >
                          et de kréations
                        </span>
                      </span>
                    </span>
                    {/* Pin "MARS — Plaine des Sables" repris de l'affiche. */}
                    <span className="inline-flex items-center gap-2 mt-2 text-[#FFD8A0]">
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#FFD8A0]"
                        style={{ fontWeight: 700 }}
                      >
                        <span className="text-[10px]">●</span>
                      </span>
                      <span className="text-[11px] md:text-xs uppercase tracking-[0.32em]" style={{ fontWeight: 700 }}>
                        Mars
                      </span>
                      <span className="italic text-base md:text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                        Plaine des Sables
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className={`mb-8 pb-8 border-b ${isDarkTheme ? 'border-white/15' : 'border-accent/20'}`}>
                    <p
                      className={`text-2xl italic leading-relaxed ${heroAccentBlueText}`}
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      &ldquo;{project.slogan}&rdquo;
                    </p>
                  </div>
                )
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className={`w-5 h-5 ${heroAccentText}`} />
                  <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-ivory' : 'text-night'}`}>
                    Type de Projet
                  </h3>
                </div>
                <p className={`leading-relaxed ${isDarkTheme ? 'text-white/75' : 'text-text-muted'}`}>
                  {project.type}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-ivory p-6 md:p-10 space-y-9">
            {/* Fiche BTS — synthèse compacte pour les 3 projets détaillés. */}
            {(project.period || project.conditions || (project.btsActivities && project.btsActivities.length > 0) || (project.tools && project.tools.length > 0)) && (
              <div className="bg-white border border-night/5 rounded-2xl overflow-hidden shadow-[0_2px_18px_-8px_rgba(176,116,16,0.18)]">
                <div className="px-5 md:px-6 py-3 bg-ivory-warm/60 border-b border-night/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.32em] text-text-muted" style={{ fontWeight: 700 }}>
                    Fiche BTS · Synthèse
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent-blue" style={{ fontWeight: 700 }}>
                    E6 — Session 2026
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-night/5">
                  {project.period && (
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted" style={{ fontWeight: 700 }}>
                          Période
                        </span>
                      </div>
                      <p className="text-night leading-snug" style={{ fontWeight: 500 }}>{project.period}</p>
                    </div>
                  )}

                  {project.conditions && (
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted" style={{ fontWeight: 700 }}>
                          Conditions
                        </span>
                      </div>
                      <p className="text-night leading-snug text-sm" style={{ fontWeight: 500 }}>
                        {project.conditions.realization}
                        {project.conditions.mode && (
                          <> <span className="text-text-muted/60">·</span> {project.conditions.mode}</>
                        )}
                        <> <span className="text-text-muted/60">·</span> {project.conditions.team}</>
                      </p>
                    </div>
                  )}

                  {project.btsActivities && project.btsActivities.length > 0 && (
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted" style={{ fontWeight: 700 }}>
                          Activités du bloc
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => {
                          const active = project.btsActivities!.includes(n)
                          return (
                            <span
                              key={n}
                              title={`Activité ${n}`}
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] tabular-nums transition-colors ${
                                active
                                  ? 'bg-accent text-night border-2 border-accent'
                                  : 'bg-transparent text-text-muted/45 border border-night/10'
                              }`}
                              style={{ fontWeight: 700 }}
                            >
                              {n}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {project.tools && project.tools.length > 0 && (
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-4 h-4 text-accent" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted" style={{ fontWeight: 700 }}>
                          Outils
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool, i) => (
                          <span
                            key={i}
                            title={tool.usage}
                            className="text-[11px] text-night/75 px-2 py-1 bg-ivory rounded-md border border-night/5"
                          >
                            {tool.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contexte */}
            {project.context && (
              <div className="bg-ivory-warm/50 p-6 md:p-8 rounded-2xl border border-night/5">
                <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Contexte
                </h3>
                <p className="text-lg text-text-muted leading-relaxed w-full">{project.context}</p>
              </div>
            )}

            {project.problematic && (
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 md:p-8 rounded-2xl border border-accent/30">
                <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Problématique
                </h3>
                <p className="text-lg text-text-muted leading-relaxed italic w-full">{project.problematic}</p>
              </div>
            )}

            {((typeof project.target === 'string' && project.target) ||
              (typeof project.target === 'object' && (project.target.main || project.target.core || project.target.relay))) && (
              <div className="bg-white p-8 rounded-2xl border border-night/5">
                <h3 className="text-2xl mb-5 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <Users className="w-6 h-6 text-accent" />
                  Cible
                </h3>
                {typeof project.target === 'string' ? (
                  <p className="text-lg text-text-muted leading-relaxed">{project.target}</p>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    {project.target.main && (
                      <div className="p-5 rounded-xl bg-ivory border border-accent/15">
                        <p className="font-semibold text-sm mb-2 uppercase tracking-wide text-accent-blue">
                          Cible principale
                        </p>
                        <p className="leading-relaxed text-sm text-text-muted">{project.target.main}</p>
                      </div>
                    )}
                    {project.target.core && (
                      <div className="p-5 rounded-xl bg-ivory border border-accent/15">
                        <p className="font-semibold text-sm mb-2 uppercase tracking-wide text-accent-blue">
                          Coeur de cible
                        </p>
                        <p className="leading-relaxed text-sm text-text-muted">{project.target.core}</p>
                      </div>
                    )}
                    {project.target.relay && (
                      <div className="p-5 rounded-xl bg-ivory border border-accent/15">
                        <p className="font-semibold text-sm mb-2 uppercase tracking-wide text-accent-blue">
                          Cible relais
                        </p>
                        <p className="leading-relaxed text-sm text-text-muted">{project.target.relay}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {(project.positioning || project.promise) && (
              <div className="grid md:grid-cols-2 gap-6">
                {project.positioning && (
                  <div className="bg-white p-8 rounded-2xl border border-night/5">
                    <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                      <Target className="w-6 h-6 text-accent" />
                      Positionnement
                    </h3>
                    <p className="text-text-muted leading-relaxed">{project.positioning}</p>
                  </div>
                )}
                {project.promise && (
                  <div className="bg-white p-8 rounded-2xl border border-night/5">
                    <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                      <Quote className="w-6 h-6 text-accent" />
                      Promesse
                    </h3>
                    <p className="text-text-muted leading-relaxed italic text-lg">{project.promise}</p>
                  </div>
                )}
              </div>
            )}

            {(project.proofs || project.tone) && (
              <div className="grid md:grid-cols-2 gap-6">
                {project.proofs && project.proofs.length > 0 && (
                  <div className="bg-white p-8 rounded-2xl border border-night/5">
                    <h3 className="text-2xl mb-5 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                      <ShieldCheck className="w-6 h-6 text-accent" />
                      Preuves
                    </h3>
                    <ul className="space-y-3">
                      {project.proofs.map((proof, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[0.6rem]" />
                          <span className="leading-relaxed">{proof}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.tone && project.tone.length > 0 && (
                  <div className="bg-white p-8 rounded-2xl border border-night/5">
                    <h3 className="text-2xl mb-5 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                      <MessageCircle className="w-6 h-6 text-accent" />
                      Ton
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.tone.map((t, i) => (
                        <span key={i} className="px-4 py-2 bg-accent/[0.08] text-accent rounded-full text-sm border border-accent/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {project.creativeChoices && project.creativeChoices.length > 0 && (
              <div className="bg-gradient-to-br from-ivory-warm/50 to-ivory-warm/20 p-8 rounded-2xl border border-night/5">
                <h3 className="text-2xl mb-6 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <Sparkles className="w-6 h-6 text-accent" />
                  Choix Créatifs
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.creativeChoices.map((choice, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white/80 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-text-muted leading-relaxed">{choice}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Objectives */}
            {(project.objectives.cognitive.length > 0 ||
              project.objectives.affective.length > 0 ||
              project.objectives.conative.length > 0) && (
            <div>
              <h3 className="text-3xl mb-8 text-center text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                Objectifs de Communication
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-night/5 hover:border-accent/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-night/[0.08] flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-night" />
                  </div>
                  <h4 className="text-xl mb-4 font-semibold text-night" style={{ fontFamily: 'var(--font-serif)' }}>Cognitifs</h4>
                  <ul className="space-y-3">
                    {project.objectives.cognitive.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-muted">
                        <span className="text-accent mt-1.5">&bull;</span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-night/5 hover:border-accent/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-night/[0.06] flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-text-secondary" />
                  </div>
                  <h4 className="text-xl mb-4 font-semibold text-night" style={{ fontFamily: 'var(--font-serif)' }}>Affectifs</h4>
                  <ul className="space-y-3">
                    {project.objectives.affective.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-muted">
                        <span className="text-accent mt-1.5">&bull;</span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-night/5 hover:border-accent/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-night/[0.08] flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-night" />
                  </div>
                  <h4 className="text-xl mb-4 font-semibold text-night" style={{ fontFamily: 'var(--font-serif)' }}>Conatifs</h4>
                  <ul className="space-y-3">
                    {project.objectives.conative.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-muted">
                        <span className="text-accent mt-1.5">&bull;</span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            )}

            {/* Mon rôle — missions + coordination de prestataires */}
            {project.role && <RoleBlock role={project.role} />}

            {/* Veille créative (mood board) — déroulable pour alléger la lecture */}
            {project.moodboard && (
              <Expandable key="exp-veille" label="Voir la veille créative" collapsedHeight={560}>
                <MoodboardSection data={project.moodboard} onZoom={setLightboxImage} />
              </Expandable>
            )}

            {/* Construction de l'identité visuelle — déroulable */}
            {project.visualIdentity && (
              <Expandable key="exp-identite" label="Voir la construction de l'identité" collapsedHeight={560}>
                <IdentitySection data={project.visualIdentity} onZoom={setLightboxImage} />
              </Expandable>
            )}

            {/* Réalisations (supports) */}
            {project.supports.length > 0 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-night/5">
                <h3 className="text-2xl mb-6 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Réalisations
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.supports.map((support, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-ivory rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-text-muted">{support}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {totalMedia > 0 && (
              <div>
                <h3 className="text-3xl mb-8 text-center text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  Galerie Visuelle
                </h3>
                <div className={`grid gap-6 ${gridClass}`}>
                  {project.gallery.map((item, i) => {
                    const image = typeof item === 'string' ? item : item.image
                    const caption = typeof item === 'string' ? undefined : item.caption
                    return (
                      <motion.div
                        key={`img-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-ivory-warm/30 cursor-pointer"
                        onClick={() => setLightboxImage(image)}
                      >
                        <div className="flex items-center justify-center p-2 aspect-square bg-ivory-warm/40">
                          <Picture
                            src={image}
                            alt={caption || `${project.title} – visuel ${i + 1}`}
                            imgClassName="max-w-full max-h-full object-contain rounded"
                            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 25vw"
                          />
                          {caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-4 py-2">
                              {caption}
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-night" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}

                  {project.videos?.map((videoUrl, i) => (
                    <motion.div
                      key={`vid-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (project.gallery.length + i) * 0.1 }}
                      className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-ivory-warm/30"
                    >
                      <div className="w-full bg-black flex items-center justify-center aspect-square">
                        {videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.mov') ? (
                          <video
                            src={videoUrl}
                            title={`Vidéo ${i + 1}`}
                            className="w-full h-full object-contain"
                            controls
                            preload="metadata"
                          />
                        ) : (
                          <iframe
                            src={videoUrl}
                            title={`Vidéo ${i + 1}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {project.conversationGroup && (
                    <motion.div
                      key="conv-group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (project.gallery.length + (project.videos?.length || 0)) * 0.1 }}
                      className="relative group rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-ivory-warm/30 cursor-pointer"
                      onClick={() => {
                        setConvLightboxIndex(0)
                        setConvLightboxOpen(true)
                      }}
                    >
                      <div className="flex items-center justify-center p-2 aspect-square bg-ivory-warm/40 relative">
                        <Picture
                          src={project.conversationGroup.cover}
                          alt={project.conversationGroup.label}
                          imgClassName="max-w-full max-h-full object-contain rounded"
                          sizes="(max-width: 768px) 80vw, 50vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col items-center justify-end pb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                          <Images className="w-4 h-4 text-accent" />
                          <span className="text-sm text-night">{project.conversationGroup.label}</span>
                          <span className="text-xs text-text-muted">({project.conversationGroup.images.length})</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
                            <Images className="w-5 h-5 text-night" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {project.carousels?.map((carousel, i) => {
                    const offset = project.gallery.length + (project.videos?.length || 0) + (project.conversationGroup ? 1 : 0)
                    return (
                      <motion.div
                        key={`carousel-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (offset + i) * 0.1 }}
                        className="relative group rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-ivory-warm/30 cursor-pointer"
                        onClick={() => setCarouselLightbox(carousel)}
                      >
                        <div className="flex items-center justify-center p-2 aspect-square bg-ivory-warm/40 relative">
                          <Picture
                            src={carousel.cover}
                            alt={carousel.label}
                            imgClassName="max-w-full max-h-full object-contain rounded"
                            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 25vw"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col items-center justify-end pb-5">
                          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                            <Images className="w-3.5 h-3.5 text-accent" />
                            <span className="text-xs text-night uppercase tracking-wide" style={{ fontWeight: 600 }}>
                              Carrousel
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-night" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Résultats clés — KPI globaux de l'événement */}
            {project.results && project.results.length > 0 && (
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 md:p-8 rounded-2xl border border-accent/25">
                <h3 className="text-2xl mb-6 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <BarChart3 className="w-6 h-6 text-accent" />
                  Résultats clés
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {project.results.map((r, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 md:p-5 border border-accent/15">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-text-muted mb-2" style={{ fontWeight: 700 }}>
                        {r.label}
                      </p>
                      <p
                        className="text-xl md:text-3xl text-night leading-none"
                        style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
                      >
                        {r.value}
                      </p>
                      {r.change && (
                        <p className="text-xs text-accent-blue mt-2" style={{ fontWeight: 600 }}>
                          {r.change}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Études de performance — une ou plusieurs (post, vidéo…) */}
            {project.performances && project.performances.length > 0 && (
              <div className="space-y-8">
                {project.performances.map((perf, i) => (
                  <PerformanceBlock key={i} data={perf} onZoom={setLightboxImage} />
                ))}
              </div>
            )}

            {/* Analyse & impact — interprétation des résultats */}
            {project.impact && (
              <div className="bg-gradient-to-br from-accent/5 to-accent-blue/5 p-6 md:p-8 rounded-2xl border border-accent/20">
                <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <TrendingUp className="w-7 h-7 text-accent" />
                  Analyse &amp; impact
                </h3>
                <p className="text-lg text-text-muted leading-relaxed w-full">{project.impact}</p>
              </div>
            )}

            {/* Bilan */}
            {project.bilan && <BilanBlock text={project.bilan} />}

            {/* Embedded slide viewer */}
            {project.documentUrl?.endsWith('.pdf') && (
              <SlideViewer pdfUrl={project.documentUrl} title={project.documentLabel || 'Document'} />
            )}

            {/* Flipbook brochure viewer */}
            {project.brochureUrl && (
              isGuideTheme ? (
                <div
                  className="relative -mx-8 md:-mx-12 px-8 md:px-12 py-12 md:py-16 overflow-hidden"
                  style={{ background: 'linear-gradient(180deg, #0B1A44 0%, #0F2255 100%)' }}
                >
                  <div className="absolute -top-10 -right-10 w-72 h-72 opacity-25 pointer-events-none" aria-hidden="true">
                    <GuideNetworkSVG stroke="#7CC4D6" dot="#9DD8E6" />
                  </div>
                  <div className="absolute -bottom-16 -left-10 w-64 h-64 opacity-15 pointer-events-none" aria-hidden="true">
                    <GuideNetworkSVG stroke="#7CC4D6" dot="#9DD8E6" />
                  </div>
                  <div className="relative max-w-3xl mx-auto text-center mb-2">
                    <span
                      className="block text-[11px] uppercase tracking-[0.4em] text-[#9DD8E6] mb-3"
                      style={{ fontWeight: 700 }}
                    >
                      The complete guide
                    </span>
                    <h3
                      className="text-3xl md:text-4xl text-ivory leading-[1.1]"
                      style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
                    >
                      Land for business and Investment
                    </h3>
                    <div className="mx-auto mt-4 mb-2 h-[2px] w-16 bg-[#7CC4D6]/60" />
                    <p className="text-sm text-white/70 mt-3">
                      27 pages — feuilletez l'intégralité du document tel qu'il a été livré.
                    </p>
                  </div>
                  <div className="relative [&_.text-night-secondary]:text-ivory [&_h3]:text-ivory">
                    <FlipbookViewer
                      pdfUrl={project.brochureUrl}
                      title={project.brochureLabel || 'Feuilleter la brochure'}
                    />
                  </div>
                </div>
              ) : (
                <FlipbookViewer
                  pdfUrl={project.brochureUrl}
                  title={project.brochureLabel || 'Feuilleter la brochure'}
                />
              )
            )}

            {/* LinkedIn carousel viewer */}
            {project.carouselPdfUrl && (
              <SlideViewer pdfUrl={project.carouselPdfUrl} title="Carrousel LinkedIn" />
            )}

            {/* Document / Brandbook Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {project.documentUrl && !project.documentUrl.endsWith('.pdf') && (
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent/10 hover:bg-accent/15 text-accent rounded-2xl transition-all duration-300 border border-accent/20 hover:border-accent/40 group"
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>{project.documentLabel || 'Consulter le document complet'}</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.brandbookUrl && (
                <a
                  href={project.brandbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent/10 hover:bg-accent/15 text-accent rounded-2xl transition-all duration-300 border border-accent/20 hover:border-accent/40 group"
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>Voir le brandbook</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  )
}
