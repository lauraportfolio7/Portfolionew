import { motion, AnimatePresence } from 'motion/react';
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
} from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ConversationGroup {
  label: string;
  cover: string;
  images: string[];
}

export interface ProjectDetails {
  title: string;
  type: string;
  context: string;
  slogan: string;
  target:
    | string
    | {
        main?: string;
        core?: string;
        relay?: string;
      };
  objectives: {
    cognitive: string[];
    conative: string[];
    affective: string[];
  };
  supports: string[];
  impact: string;
  gallery: (string | { image: string; caption?: string })[];
  category: string;
  tags: string[];
  image: string;
  description: string;
  problematic?: string;
  positioning?: string;
  promise?: string;
  proofs?: string[];
  tone?: string[];
  creativeChoices?: string[];
  documentUrl?: string;
  videoUrl?: string;
  videos?: string[];
  conversationGroup?: ConversationGroup;
  brandbookUrl?: string;
}

interface ProjectModalProps {
  project: ProjectDetails | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [convLightboxOpen, setConvLightboxOpen] = useState(false);
  const [convLightboxIndex, setConvLightboxIndex] = useState(0);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!project) return null;

  const totalMedia =
    project.gallery.length + (project.videos?.length || 0) + (project.conversationGroup ? 1 : 0);
  const gridClass =
    totalMedia === 1
      ? 'grid-cols-1 max-w-2xl mx-auto'
      : totalMedia === 2
        ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
        : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <AnimatePresence>
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
              <X className="w-5 h-5 text-gray-800" />
            </button>
            <img
              src={lightboxImage}
              alt="Vue plein écran"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      )}

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
            {/* Close button */}
            <button
              onClick={() => setConvLightboxOpen(false)}
              className="absolute -top-5 -right-2 md:-top-6 md:-right-6 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Previous button */}
            <button
              onClick={() => {
                const len = project.conversationGroup!.images.length;
                setConvLightboxIndex((prev) => (prev - 1 + len) % len);
              }}
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all border border-gray-200"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-7 h-7 text-gray-800" />
            </button>

            {/* Image + counter */}
            <div className="relative max-w-[75vw] max-h-[85vh] flex flex-col items-center gap-4">
              <img
                src={project.conversationGroup.images[convLightboxIndex]}
                alt={`${project.conversationGroup.label} – ${convLightboxIndex + 1}`}
                className="max-w-[75vw] max-h-[78vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg text-sm text-gray-700 border border-gray-200">
                {convLightboxIndex + 1} / {project.conversationGroup.images.length} — {project.conversationGroup.label}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={() => {
                const len = project.conversationGroup!.images.length;
                setConvLightboxIndex((prev) => (prev + 1) % len);
              }}
              className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all border border-gray-200"
              aria-label="Suivant"
            >
              <ChevronRight className="w-7 h-7 text-gray-800" />
            </button>
          </motion.div>
        </div>
      )}

      <div
        key="modal"
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      >
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
          className="relative w-full max-w-6xl mx-4 my-8 bg-background rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-background/95 border border-border shadow-lg hover:bg-accent hover:border-primary transition-all flex items-center justify-center group"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative overflow-hidden bg-secondary/20">
              <div className="aspect-[3/4] md:aspect-auto flex items-center justify-center bg-secondary/10 p-6" style={{ maxHeight: '600px' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '580px' }}
                />
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center bg-background">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 self-start">
                <span className="text-sm uppercase tracking-wider text-primary font-medium">
                  {project.category}
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.slogan && (
                <div className="mb-8 pb-8 border-b border-border">
                  <p
                    className="text-2xl text-primary italic leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    &ldquo;{project.slogan}&rdquo;
                  </p>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Type de Projet</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.type}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Cible</h3>
                </div>
                {typeof project.target === 'string' ? (
                  <p className="text-muted-foreground leading-relaxed">
                    {project.target}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {project.target.main && (
                      <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                        <p className="font-semibold text-sm text-primary mb-2 uppercase tracking-wide">
                          Cible principale
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {project.target.main}
                        </p>
                      </div>
                    )}
                    {project.target.core && (
                      <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                        <p className="font-semibold text-sm text-primary mb-2 uppercase tracking-wide">
                          Coeur de cible
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {project.target.core}
                        </p>
                      </div>
                    )}
                    {project.target.relay && (
                      <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                        <p className="font-semibold text-sm text-primary mb-2 uppercase tracking-wide">
                          Cible relais
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {project.target.relay}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-background p-8 md:p-12 space-y-12">
            {project.problematic && (
              <div className="bg-gradient-to-br from-accent/10 to-primary/5 p-8 rounded-2xl border border-primary/30">
                <h3
                  className="text-2xl mb-4 flex items-center gap-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  Problématique
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  {project.problematic}
                </p>
              </div>
            )}

            <div className="bg-secondary/30 p-8 rounded-2xl border border-border">
              <h3
                className="text-2xl mb-4 flex items-center gap-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <div className="w-2 h-8 bg-primary rounded-full" />
                Contexte
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.context}
              </p>
            </div>

            {(project.positioning || project.promise) && (
              <div className="grid md:grid-cols-2 gap-6">
                {project.positioning && (
                  <div className="bg-card p-8 rounded-2xl border border-border">
                    <h3
                      className="text-2xl mb-4 flex items-center gap-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <Target className="w-6 h-6 text-primary" />
                      Positionnement
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.positioning}
                    </p>
                  </div>
                )}
                {project.promise && (
                  <div className="bg-card p-8 rounded-2xl border border-border">
                    <h3
                      className="text-2xl mb-4 flex items-center gap-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <Quote className="w-6 h-6 text-primary" />
                      Promesse
                    </h3>
                    <p className="text-muted-foreground leading-relaxed italic text-lg">
                      {project.promise}
                    </p>
                  </div>
                )}
              </div>
            )}

            {(project.proofs || project.tone) && (
              <div className="grid md:grid-cols-2 gap-6">
                {project.proofs && project.proofs.length > 0 && (
                  <div className="bg-card p-8 rounded-2xl border border-border">
                    <h3
                      className="text-2xl mb-5 flex items-center gap-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <ShieldCheck className="w-6 h-6 text-primary" />
                      Preuves
                    </h3>
                    <ul className="space-y-3">
                      {project.proofs.map((proof, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="leading-relaxed">{proof}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.tone && project.tone.length > 0 && (
                  <div className="bg-card p-8 rounded-2xl border border-border">
                    <h3
                      className="text-2xl mb-5 flex items-center gap-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <MessageCircle className="w-6 h-6 text-primary" />
                      Ton
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.tone.map((t, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-primary/8 text-primary rounded-full text-sm border border-primary/15"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {project.creativeChoices && project.creativeChoices.length > 0 && (
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 p-8 rounded-2xl border border-border">
                <h3
                  className="text-2xl mb-6 flex items-center gap-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                  Choix Créatifs
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.creativeChoices.map((choice, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-background/80 rounded-xl"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {choice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Objectives */}
            <div>
              <h3
                className="text-3xl mb-8 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Objectifs de Communication
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0F1B3D]/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-[#0F1B3D]" />
                  </div>
                  <h4
                    className="text-xl mb-4 font-semibold text-[#0F1B3D]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Cognitifs
                  </h4>
                  <ul className="space-y-3">
                    {project.objectives.cognitive.map((obj, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-primary mt-1.5">&bull;</span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0F1B3D]/8 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-[#2A3458]" />
                  </div>
                  <h4
                    className="text-xl mb-4 font-semibold text-[#0F1B3D]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Affectifs
                  </h4>
                  <ul className="space-y-3">
                    {project.objectives.affective.map((obj, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-primary mt-1.5">&bull;</span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0F1B3D]/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-[#0F1B3D]" />
                  </div>
                  <h4
                    className="text-xl mb-4 font-semibold text-[#0F1B3D]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Conatifs
                  </h4>
                  <ul className="space-y-3">
                    {project.objectives.conative.map((obj, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-primary mt-1.5">&bull;</span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Supports */}
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3
                className="text-2xl mb-6 flex items-center gap-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <div className="w-2 h-8 bg-primary rounded-full" />
                Supports Réalisés
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.supports.map((support, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-background rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg text-muted-foreground">
                      {support}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/20">
              <h3
                className="text-2xl mb-4 flex items-center gap-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <TrendingUp className="w-7 h-7 text-primary" />
                Impact &amp; Résultats Attendus
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.impact}
              </p>
            </div>

            {/* Gallery */}
            {totalMedia > 0 && (
              <div>
                <h3
                  className="text-3xl mb-8 text-center"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Galerie Visuelle
                </h3>
                <div className={`grid gap-6 ${gridClass}`}>
                  {project.gallery.map((item, i) => {
                    const image = typeof item === 'string' ? item : item.image;
                    const caption = typeof item === 'string' ? undefined : item.caption;
                    return (
                      <motion.div
                        key={`img-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-secondary/10 cursor-pointer"
                        onClick={() => setLightboxImage(image)}
                      >
                        <div className="flex items-center justify-center p-4" style={{ maxHeight: '420px', minHeight: '280px' }}>
                          <img
                            src={image}
                            alt={`Visuel ${i + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            style={{ maxHeight: '400px' }}
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
                              <Maximize2 className="w-5 h-5 text-gray-700" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  {project.videos &&
                    project.videos.map((videoUrl, i) => (
                      <motion.div
                        key={`vid-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: (project.gallery.length + i) * 0.1,
                        }}
                        className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-secondary/10"
                      >
                        <div className="w-full bg-black flex items-center justify-center" style={{ height: '420px' }}>
                          <iframe
                            src={videoUrl}
                            title={`Vidéo ${i + 1}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </motion.div>
                    ))}
                  {project.conversationGroup && (
                    <motion.div
                      key="conv-group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay:
                          (project.gallery.length +
                            (project.videos?.length || 0)) *
                          0.1,
                      }}
                      className="relative group rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-secondary/10 cursor-pointer"
                      onClick={() => {
                        setConvLightboxIndex(0);
                        setConvLightboxOpen(true);
                      }}
                    >
                      <div className="flex items-center justify-center p-4 relative" style={{ maxHeight: '420px', minHeight: '280px' }}>
                        <img
                          src={project.conversationGroup.cover}
                          alt={project.conversationGroup.label}
                          className="max-w-full max-h-full object-contain rounded-lg"
                          style={{ maxHeight: '400px' }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col items-center justify-end pb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                          <Images className="w-4 h-4 text-primary" />
                          <span className="text-sm text-gray-700">
                            {project.conversationGroup.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({project.conversationGroup.images.length})
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
                            <Images className="w-5 h-5 text-gray-700" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Document Link */}
            {project.documentUrl && (
              <div className="flex justify-center">
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary/10 hover:bg-primary/15 text-primary rounded-2xl transition-all duration-300 border border-primary/20 hover:border-primary/40 group"
                >
                  <FileText className="w-5 h-5" />
                  <span
                    className="text-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Consulter le document complet
                  </span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}