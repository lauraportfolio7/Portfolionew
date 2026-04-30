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
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Project } from '@/types'
import { SlideViewer } from '@/components/SlideViewer'
import { FlipbookViewer } from '@/components/FlipbookViewer'
import { Picture } from '@/components/Picture'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
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

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [convLightboxOpen, setConvLightboxOpen] = useState(false)
  const [convLightboxIndex, setConvLightboxIndex] = useState(0)

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) setLightboxImage(null)
        else if (convLightboxOpen) setConvLightboxOpen(false)
        else onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose, lightboxImage, convLightboxOpen])

  if (!project) return null

  const totalMedia =
    project.gallery.length + (project.videos?.length || 0) + (project.conversationGroup ? 1 : 0)
  const gridClass =
    totalMedia === 1
      ? 'grid-cols-1 max-w-md mx-auto'
      : totalMedia === 2
        ? 'grid-cols-2 max-w-2xl mx-auto'
        : 'grid-cols-2 md:grid-cols-3'

  return (
    <AnimatePresence>
      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          key="lightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md"
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md"
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

      {/* Main Modal */}
      <div key="modal" className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-6xl mx-4 my-8 bg-ivory rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center group bg-ivory border border-accent/20 hover:bg-accent hover:border-accent"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-night transition-colors" />
          </button>

          {/* Hero Section — premium cream + gold */}
          <div
            className="relative grid md:grid-cols-2 gap-0"
            style={{
              background:
                'linear-gradient(135deg, #FFFCF4 0%, #FBF4DD 50%, #F5E5C0 100%)',
            }}
          >
            <div
              className="absolute -top-10 -right-10 w-44 h-44 opacity-20 pointer-events-none"
              aria-hidden="true"
            >
              <SunflowerStaticSVG />
            </div>

            <div className="relative overflow-hidden">
              <div
                className="aspect-[3/4] md:aspect-auto flex items-center justify-center p-6"
                style={{ maxHeight: '600px' }}
              >
                <Picture
                  src={project.image}
                  alt={project.title}
                  imgClassName="w-full h-full object-contain relative z-[2] drop-shadow-[0_10px_28px_rgba(176,116,16,0.20)]"
                  imgStyle={{ maxHeight: '580px' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="relative z-[2] p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 self-start bg-accent/12 border border-accent/30">
                <span className="text-sm uppercase tracking-[0.25em] font-medium text-accent-blue" style={{ fontWeight: 600 }}>
                  {project.category}
                </span>
              </div>

              <h2
                id="modal-title"
                className="text-4xl md:text-5xl mb-6 leading-[1.1] text-night"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
              >
                {project.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm bg-accent/8 text-accent-blue border border-accent/20"
                    style={{ fontWeight: 500 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.slogan && (
                <div className="mb-8 pb-8 border-b border-accent/20">
                  <p
                    className="text-2xl italic leading-relaxed text-accent-blue"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    &ldquo;{project.slogan}&rdquo;
                  </p>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-night">Type de Projet</h3>
                </div>
                <p className="leading-relaxed text-text-muted">{project.type}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-night">Cible</h3>
                </div>
                {typeof project.target === 'string' ? (
                  <p className="leading-relaxed text-text-muted">{project.target}</p>
                ) : (
                  <div className="space-y-4">
                    {project.target.main && (
                      <div className="p-4 rounded-lg border bg-ivory border-accent/15">
                        <p className="font-semibold text-sm mb-2 uppercase tracking-wide text-accent-blue">
                          Cible principale
                        </p>
                        <p className="leading-relaxed text-sm text-text-muted">{project.target.main}</p>
                      </div>
                    )}
                    {project.target.core && (
                      <div className="p-4 rounded-lg border bg-ivory border-accent/15">
                        <p className="font-semibold text-sm mb-2 uppercase tracking-wide text-accent-blue">
                          Coeur de cible
                        </p>
                        <p className="leading-relaxed text-sm text-text-muted">{project.target.core}</p>
                      </div>
                    )}
                    {project.target.relay && (
                      <div className="p-4 rounded-lg border bg-ivory border-accent/15">
                        <p className="font-semibold text-sm mb-2 uppercase tracking-wide text-accent-blue">
                          Cible relais
                        </p>
                        <p className="leading-relaxed text-sm text-text-muted">{project.target.relay}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
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

            <div className="bg-ivory-warm/50 p-8 rounded-2xl border border-night/5">
              <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                <div className="w-2 h-8 bg-accent rounded-full" />
                Contexte
              </h3>
              <p className="text-lg text-text-muted leading-relaxed">{project.context}</p>
            </div>

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

            {/* Supports */}
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

            {/* Impact */}
            <div className="bg-gradient-to-br from-accent/5 to-accent-blue/5 p-8 rounded-2xl border border-accent/20">
              <h3 className="text-2xl mb-4 flex items-center gap-3 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
                <TrendingUp className="w-7 h-7 text-accent" />
                Impact &amp; Résultats Attendus
              </h3>
              <p className="text-lg text-text-muted leading-relaxed">{project.impact}</p>
            </div>

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
                </div>
              </div>
            )}

            {/* Embedded slide viewer */}
            {project.documentUrl?.endsWith('.pdf') && (
              <SlideViewer pdfUrl={project.documentUrl} title={project.documentLabel || 'Document'} />
            )}

            {/* Flipbook brochure viewer */}
            {project.brochureUrl && (
              <FlipbookViewer pdfUrl={project.brochureUrl} title="Feuilleter la brochure" />
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
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
