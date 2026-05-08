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
} from 'lucide-react'
import { useEffect, useState, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import type { Project, CarouselItem } from '@/types'
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

/* Silhouette de clap — clin d'œil au clap de cinéma sur l'affiche. */
function ClapBoardSVG({ color = '#0E1A3A' }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill={color}>
        {/* Plaque arrière. */}
        <rect x="14" y="32" width="72" height="44" rx="2" />
        {/* Bras supérieur (clap ouvert). */}
        <polygon points="14,28 86,18 88,28 16,38" />
        {/* Charnière. */}
        <circle cx="14" cy="32" r="2.4" fill="#C77A48" />
      </g>
      {/* Bandes diagonales du clap (alternance crème/navy). */}
      <g>
        <polygon points="20,20 30,18.5 26,28 16,29.5" fill="#F2EBDA" />
        <polygon points="40,17 50,15.5 46,26 36,27.5" fill="#F2EBDA" />
        <polygon points="60,15 70,13.5 66,24 56,25.5" fill="#F2EBDA" />
        <polygon points="80,13 86,12 88,28 84,28" fill="#F2EBDA" opacity="0.0" />
      </g>
    </svg>
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
  const isDarkTheme = isGuideTheme || isCinemaTheme
  const heroBackground = isGuideTheme
    ? 'linear-gradient(135deg, #0B1A44 0%, #122862 55%, #1C3A8E 100%)'
    : isCinemaTheme
      ? 'linear-gradient(180deg, #0A1733 0%, #1C2350 35%, #4F2C2A 75%, #C77A48 100%)'
      : 'linear-gradient(135deg, #FFFCF4 0%, #FBF4DD 50%, #F5E5C0 100%)'
  // Accent texte selon thème (cyan pour le guide, crème chaud pour le ciné, doré sinon).
  const heroAccentText = isGuideTheme
    ? 'text-[#9DD8E6]'
    : isCinemaTheme
      ? 'text-[#FFD8A0]'
      : 'text-accent'
  const heroAccentBlueText = isGuideTheme
    ? 'text-[#9DD8E6]'
    : isCinemaTheme
      ? 'text-[#FFD8A0]'
      : 'text-accent-blue'
  const heroAccentBorder = isGuideTheme
    ? 'border-[#7CC4D6]/40'
    : isCinemaTheme
      ? 'border-[#FFD8A0]/40'
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
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
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

        <div className="max-w-6xl mx-auto bg-ivory shadow-[0_4px_40px_-12px_rgba(176,116,16,0.10)] md:rounded-3xl md:my-10 overflow-hidden">

          {/* Hero Section — cream + gold (ou navy + cyan pour le guide investisseur) */}
          <div
            className="relative grid md:grid-cols-2 gap-0"
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
                {/* Champ d'étoiles diffus sur l'ensemble du hero. */}
                <div className="absolute inset-0 opacity-90 pointer-events-none" aria-hidden="true">
                  <StarFieldSVG />
                </div>
                {/* Halo terracotta qui rappelle l'horizon de l'affiche. */}
                <div
                  className="absolute -bottom-10 -right-12 w-72 h-72 rounded-full opacity-40 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #E8A77B 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                {/* Silhouette de clap, clin d'œil au visuel principal. */}
                <div
                  className="absolute -bottom-6 -left-6 w-32 h-32 opacity-70 pointer-events-none rotate-[-8deg]"
                  aria-hidden="true"
                >
                  <ClapBoardSVG color="#0A1733" />
                </div>
                {/* Étiquette "événement" en haut à droite. */}
                <div className="absolute top-0 right-0 hidden md:flex items-center pointer-events-none">
                  <div className="bg-[#C77A48] px-7 py-2.5 rounded-bl-2xl shadow-md">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-ivory" style={{ fontWeight: 700 }}>
                      29 sept. — 4 oct. 2025
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

            <div className="relative overflow-hidden">
              <div
                className="aspect-[3/4] md:aspect-auto flex items-center justify-center p-6"
                style={{ maxHeight: '600px' }}
              >
                <Picture
                  src={project.image}
                  alt={project.title}
                  imgClassName={`w-full h-full object-contain relative z-[2] ${
                    isDarkTheme
                      ? 'drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]'
                      : 'drop-shadow-[0_10px_28px_rgba(176,116,16,0.20)]'
                  }`}
                  imgStyle={{ maxHeight: '580px' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

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

              <h2
                id="modal-title"
                className={`text-4xl md:text-5xl mb-6 leading-[1.1] ${
                  isDarkTheme ? 'text-ivory' : 'text-night'
                }`}
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
              >
                {project.title}
              </h2>

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
                <div className={`mb-8 pb-8 border-b ${isDarkTheme ? 'border-white/15' : 'border-accent/20'}`}>
                  <p
                    className={`text-2xl italic leading-relaxed ${heroAccentBlueText}`}
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    &ldquo;{project.slogan}&rdquo;
                  </p>
                </div>
              )}

              <div className="mb-6">
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

              {((typeof project.target === 'string' && project.target) ||
                (typeof project.target === 'object' && (project.target.main || project.target.core || project.target.relay))) && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className={`w-5 h-5 ${heroAccentText}`} />
                    <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-ivory' : 'text-night'}`}>
                      Cible
                    </h3>
                  </div>
                  {typeof project.target === 'string' ? (
                    <p className={`leading-relaxed ${isDarkTheme ? 'text-white/75' : 'text-text-muted'}`}>
                      {project.target}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {project.target.main && (
                        <div
                          className={`p-4 rounded-lg border ${
                            isDarkTheme
                              ? 'bg-white/5 border-white/15'
                              : 'bg-ivory border-accent/15'
                          }`}
                        >
                          <p
                            className={`font-semibold text-sm mb-2 uppercase tracking-wide ${heroAccentBlueText}`}
                          >
                            Cible principale
                          </p>
                          <p className={`leading-relaxed text-sm ${isDarkTheme ? 'text-white/80' : 'text-text-muted'}`}>
                            {project.target.main}
                          </p>
                        </div>
                      )}
                      {project.target.core && (
                        <div
                          className={`p-4 rounded-lg border ${
                            isDarkTheme
                              ? 'bg-white/5 border-white/15'
                              : 'bg-ivory border-accent/15'
                          }`}
                        >
                          <p
                            className={`font-semibold text-sm mb-2 uppercase tracking-wide ${heroAccentBlueText}`}
                          >
                            Coeur de cible
                          </p>
                          <p className={`leading-relaxed text-sm ${isDarkTheme ? 'text-white/80' : 'text-text-muted'}`}>
                            {project.target.core}
                          </p>
                        </div>
                      )}
                      {project.target.relay && (
                        <div
                          className={`p-4 rounded-lg border ${
                            isDarkTheme
                              ? 'bg-white/5 border-white/15'
                              : 'bg-ivory border-accent/15'
                          }`}
                        >
                          <p
                            className={`font-semibold text-sm mb-2 uppercase tracking-wide ${heroAccentBlueText}`}
                          >
                            Cible relais
                          </p>
                          <p className={`leading-relaxed text-sm ${isDarkTheme ? 'text-white/80' : 'text-text-muted'}`}>
                            {project.target.relay}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="bg-ivory p-8 md:p-12 space-y-12">
            {project.problematic && (
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 rounded-2xl border border-accent/30">
                <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Problématique
                </h3>
                <p className="text-lg text-text-muted leading-relaxed italic">{project.problematic}</p>
              </div>
            )}

            {project.context && (
              <div className="bg-ivory-warm/50 p-8 rounded-2xl border border-night/5">
                <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Contexte
                </h3>
                <p className="text-lg text-text-muted leading-relaxed">{project.context}</p>
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
                        <li key={i} className="flex items-center gap-3 text-text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
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

            {/* Supports */}
            {project.supports.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-night/5">
                <h3 className="text-2xl mb-6 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Supports Réalisés
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.supports.map((support, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-ivory rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-lg text-text-muted">{support}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact */}
            {project.impact && (
              <div className="bg-gradient-to-br from-accent/5 to-accent-blue/5 p-8 rounded-2xl border border-accent/20">
                <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                  <TrendingUp className="w-7 h-7 text-accent" />
                  Impact &amp; Résultats Attendus
                </h3>
                <p className="text-lg text-text-muted leading-relaxed">{project.impact}</p>
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
