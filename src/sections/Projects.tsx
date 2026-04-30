import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { GraduationCap, Briefcase, ExternalLink, BookOpen, FileText, Play } from 'lucide-react'
import { ProjectModal } from '@/components/ProjectModal'
import { CatalogueViewer } from '@/components/CatalogueViewer'
import { Carousel, CarouselSlide } from '@/components/Carousel'
import { Picture } from '@/components/Picture'
import { featuredProjects, otherProjects } from '@/data/projects'
import type { Project } from '@/types'
import { useState } from 'react'

// Import Vergelegen pages for catalogue
import vergelegenCover from '@/assets/vergelegen/cover.jpg'
import vergelegenPage1 from '@/assets/vergelegen/page-1.jpg'
import vergelegenPage2 from '@/assets/vergelegen/page-2.jpg'

const PREMIUM_CARD_BG = {
  background:
    'linear-gradient(135deg, #FFFCF4 0%, #FBF4DD 50%, #F5E5C0 100%)',
}

function ProjectCard({ project, onClick, delay, dark = false }: { project: Project; onClick: () => void; delay: number; dark?: boolean }) {
  const hasImage = project.image && typeof project.image === 'string'

  return hasImage ? (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`group cursor-pointer relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        dark
          ? 'bg-night-light/40 border-accent/15 hover:border-accent/40 backdrop-blur-md'
          : 'bg-ivory border-night/10 hover:border-accent/40'
      }`}
      style={{
        boxShadow: dark
          ? '0 6px 22px -6px rgba(0,0,0,0.35)'
          : '0 6px 22px -6px rgba(176,116,16,0.12)',
      }}
    >
      {/* Top gold gradient line — grows on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out z-10"
        style={{
          background: 'linear-gradient(to right, transparent, #E5A823, transparent)',
        }}
        aria-hidden="true"
      />

      {project.tabletMockup ? (
        <div className="h-[360px] flex items-center justify-center p-6 relative overflow-hidden" style={PREMIUM_CARD_BG}>
          <SunflowerStamp />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #B07410 1px, transparent 0)', backgroundSize: '24px 24px' }} aria-hidden="true" />
          <div className="relative transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
            <div
              className="relative rounded-[20px] p-[10px] pb-[14px]"
              style={{
                background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #232327 100%)',
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.35), 0 8px 20px -6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#3a3a3e]" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)' }} aria-hidden="true" />
              <div className="rounded-[12px] overflow-hidden relative bg-white">
                <Picture src={project.image} alt={project.title} imgClassName="h-[290px] w-auto block mx-auto" imgStyle={{ objectFit: 'cover' }} sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw" />
                <div className="absolute inset-0 pointer-events-none rounded-[12px]" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.1)' }} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      ) : project.laptopMockup ? (
        <div className="h-[360px] flex items-center justify-center px-4 py-8 relative overflow-hidden" style={PREMIUM_CARD_BG}>
          <SunflowerStamp />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #B07410 1px, transparent 0)', backgroundSize: '24px 24px' }} aria-hidden="true" />
          <div className="relative transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
            {/* Laptop screen */}
            <div
              className="relative rounded-t-[10px] pt-[22px] px-[10px] pb-[6px]"
              style={{
                background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #232327 100%)',
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.35), 0 8px 20px -6px rgba(0,0,0,0.2)',
              }}
            >
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#3a3a3e]" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} aria-hidden="true" />
              <div className="rounded-[4px] overflow-hidden relative bg-white">
                <Picture src={project.image} alt={project.title} imgClassName="w-[360px] block" imgStyle={{ objectFit: 'contain', aspectRatio: '16/9' }} sizes="(max-width: 768px) 80vw, 360px" />
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.08)' }} aria-hidden="true" />
              </div>
            </div>
            {/* Laptop hinge */}
            <div
              className="relative h-[4px] mx-[-6px] rounded-b-sm"
              style={{ background: 'linear-gradient(to bottom, #2a2a2e, #222226)' }}
            />
            {/* Laptop base */}
            <div
              className="relative h-[12px] mx-[-16px] rounded-b-[8px]"
              style={{
                background: 'linear-gradient(to bottom, #28282c 0%, #1c1c20 100%)',
                boxShadow: '0 6px 16px -4px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[60px] h-[4px] rounded-[3px]" style={{ background: '#3a3a3e' }} aria-hidden="true" />
            </div>
          </div>
        </div>
      ) : project.phoneMockup ? (
        <div className="h-[360px] flex items-center justify-center p-6 relative overflow-hidden" style={PREMIUM_CARD_BG}>
          <SunflowerStamp />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #B07410 1px, transparent 0)', backgroundSize: '24px 24px' }} aria-hidden="true" />
          <div className="relative transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
            <div
              className="relative rounded-[32px] pt-[14px] pb-[14px] px-[8px]"
              style={{
                background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #232327 100%)',
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.35), 0 8px 20px -6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[36px] h-[4px] rounded-full bg-[#3a3a3e]" aria-hidden="true" />
              <div className="rounded-[24px] overflow-hidden relative bg-white">
                <Picture src={project.image} alt={project.title} imgClassName="w-[180px] h-[320px] block" imgStyle={{ objectFit: 'cover' }} sizes="180px" />
              </div>
              <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[40px] h-[4px] rounded-full bg-[#3a3a3e]" aria-hidden="true" />
            </div>
          </div>
        </div>
      ) : project.bookletMockup ? (
        <div className="h-[360px] flex items-center justify-center p-6 relative overflow-hidden" style={PREMIUM_CARD_BG}>
          <SunflowerStamp />
          <div className="relative transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1" style={{ perspective: '800px' }}>
            <div
              className="relative rounded-[3px] overflow-hidden"
              style={{
                transform: 'rotateY(-5deg) rotateX(2deg)',
                boxShadow: '8px 8px 30px -5px rgba(28,35,64,0.25), -2px -1px 10px rgba(28,35,64,0.05)',
              }}
            >
              <Picture src={project.image} alt={project.title} imgClassName="h-[310px] w-auto block" imgStyle={{ objectFit: 'contain' }} sizes="(max-width: 768px) 80vw, 360px" />
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-sm" style={{ background: 'linear-gradient(to right, rgba(28,35,64,0.15), transparent)', transform: 'rotateY(-5deg) rotateX(2deg)' }} aria-hidden="true" />
            <div className="absolute -bottom-[4px] left-[3%] right-[3%] h-[4px] rounded-b-sm" style={{ background: 'rgba(28,35,64,0.06)' }} aria-hidden="true" />
          </div>
        </div>
      ) : (
        <div className="h-[360px] flex items-center justify-center relative overflow-hidden" style={PREMIUM_CARD_BG}>
          <SunflowerStamp />
          <Picture
            src={project.image}
            alt={project.title}
            imgClassName="relative z-[2] w-full h-full object-contain p-6"
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
          <span className={`text-[10px] uppercase tracking-[0.3em] ${dark ? 'text-accent/80' : 'text-accent-blue'}`} style={{ fontWeight: 600 }}>
            {project.category}
          </span>
        </div>
        <div className="flex items-start justify-between mb-3 gap-3">
          <h4
            className={`text-xl leading-snug ${dark ? 'text-ivory group-hover:text-accent' : 'text-night group-hover:text-accent-blue'} transition-colors`}
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h4>
          <ExternalLink className={`w-4 h-4 flex-shrink-0 mt-1.5 ${dark ? 'text-accent/40' : 'text-accent/50'} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500`} />
        </div>
        <p className={`text-[13.5px] leading-relaxed mb-4 ${dark ? 'text-ivory-warm/65' : 'text-text-muted'}`}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className={`text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${
                dark
                  ? 'bg-accent/8 text-accent/85 border-accent/20'
                  : 'bg-accent/8 text-accent-blue border-accent/20'
              }`}
              style={{ fontWeight: 500 }}
            >
              {tag}
            </span>
          ))}
        </div>
        {project.documentUrl && !project.documentUrl.endsWith('.pdf') && (
          <a href={project.documentUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-lg text-[12px] tracking-wide transition-all duration-300" style={{ background: 'linear-gradient(135deg, #F5C957, #E5A823, #B07410)', color: '#1B160B', fontWeight: 600 }}>
            <FileText className="w-3.5 h-3.5" /><span>{project.documentLabel || 'Voir le dossier'}</span>
          </a>
        )}
        {project.videoUrl && (
          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-lg text-[12px] tracking-wide transition-all duration-300" style={{ background: 'linear-gradient(135deg, #F5C957, #E5A823, #B07410)', color: '#1B160B', fontWeight: 600 }}>
            <Play className="w-3.5 h-3.5" /><span>Voir la vidéo</span>
          </a>
        )}
        {project.brandbookUrl && (
          <a href={project.brandbookUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-lg text-[12px] tracking-wide transition-all duration-300" style={{ background: 'linear-gradient(135deg, #F5C957, #E5A823, #B07410)', color: '#1B160B', fontWeight: 600 }}>
            <BookOpen className="w-3.5 h-3.5" /><span>Voir le brand book</span>
          </a>
        )}
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`group cursor-pointer relative overflow-hidden p-6 rounded-2xl border transition-all duration-500 ${
        dark ? 'bg-night-light/40 border-accent/15 hover:border-accent/40 backdrop-blur-md' : 'bg-ivory border-night/10 hover:border-accent/40'
      }`}
      style={{ boxShadow: dark ? '0 6px 22px -6px rgba(0,0,0,0.35)' : '0 6px 22px -6px rgba(176,116,16,0.12)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
        style={{ background: 'linear-gradient(to right, transparent, #E5A823, transparent)' }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400 ${
            dark ? 'bg-accent/12 group-hover:bg-accent/20' : 'bg-accent/10 group-hover:bg-accent/18'
          }`}
        >
          {project.category === 'École' ? <GraduationCap className="w-5 h-5 text-accent" /> : <Briefcase className="w-5 h-5 text-accent" />}
        </div>
        <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-400 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${dark ? 'text-accent/60' : 'text-accent/60'}`} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
        <span className={`text-[10px] uppercase tracking-[0.3em] ${dark ? 'text-accent/80' : 'text-accent-blue'}`} style={{ fontWeight: 600 }}>
          {project.category}
        </span>
      </div>
      <h4
        className={`text-lg mb-2.5 transition-colors ${dark ? 'text-ivory group-hover:text-accent' : 'text-night group-hover:text-accent-blue'}`}
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
      >
        {project.title}
      </h4>
      <p className={`text-[13.5px] leading-relaxed ${dark ? 'text-ivory-warm/65' : 'text-text-muted'}`}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tags.slice(0, 2).map((tag, i) => (
          <span
            key={i}
            className={`text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${
              dark ? 'bg-accent/8 text-accent/85 border-accent/20' : 'bg-accent/8 text-accent-blue border-accent/20'
            }`}
            style={{ fontWeight: 500 }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function SunflowerStamp() {
  return (
    <motion.div
      className="absolute -top-12 -right-12 w-44 h-44 opacity-20 pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="stamp-petal" cx="50%" cy="50%">
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
              fill="url(#stamp-petal)"
              transform={`rotate(${angle} 50 50)`}
              opacity="0.85"
            />
          )
        })}
        <circle cx="50" cy="50" r="9" fill="#3A2F1A" />
        <circle cx="50" cy="50" r="6" fill="#1B160B" />
      </svg>
    </motion.div>
  )
}

function VergelegenCard({ onOpenCatalogue, onOpenProject }: { onOpenCatalogue: () => void; onOpenProject: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpenProject}
      className="bg-white/85 backdrop-blur-sm rounded-xl border border-night-secondary/[0.06] group cursor-pointer relative overflow-hidden"
      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-night-secondary/[0.08] to-transparent group-hover:via-night-secondary/25 transition-all duration-500 z-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-night-secondary to-night-secondary/20 group-hover:h-full transition-all duration-500 ease-out z-10" aria-hidden="true" />

      <div className="h-[380px] bg-gradient-to-br from-sky-light to-[#E4EBF5] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1C2340 1px, transparent 0)', backgroundSize: '20px 20px' }} aria-hidden="true" />
        <div className="relative transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
          {/* Tablet frame */}
          <div
            className="relative rounded-[20px] p-[10px] pb-[14px]"
            style={{
              background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #232327 100%)',
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.35), 0 8px 20px -6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Camera dot */}
            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#3a3a3e]" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)' }} aria-hidden="true" />
            {/* Screen */}
            <div className="rounded-[12px] overflow-hidden relative bg-white">
              <Picture src={vergelegenCover} alt="Vergelegen - Couverture" imgClassName="h-[290px] w-auto block" imgStyle={{ objectFit: 'cover' }} sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw" />
              <div className="absolute inset-0 pointer-events-none rounded-[12px]" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.1)' }} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-night-secondary/40" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-night-secondary/40">Publireportage</span>
        </div>
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg text-night-secondary group-hover:text-text-secondary transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>Vergelegen</h4>
          <ExternalLink className="w-4 h-4 text-night-secondary/30 opacity-0 group-hover:opacity-100 transition-all duration-400 flex-shrink-0 ml-2 mt-1" />
        </div>
        <p className="text-[13px] text-text-muted leading-relaxed mb-3">Publireportage gastronomique pour le domaine viticole Vergelegen — trois espaces culinaires au cœur de la nature sud-africaine.</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[10px] uppercase tracking-wider text-night-secondary/40 px-2 py-0.5 bg-night-secondary/[0.04] rounded-full">Rédaction</span>
          <span className="text-[10px] uppercase tracking-wider text-night-secondary/40 px-2 py-0.5 bg-night-secondary/[0.04] rounded-full">Mise en page</span>
          <span className="text-[10px] uppercase tracking-wider text-night-secondary/40 px-2 py-0.5 bg-night-secondary/[0.04] rounded-full">Publireportage</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onOpenCatalogue() }} className="inline-flex items-center gap-2 px-4 py-2 bg-night-secondary text-white rounded-lg text-[13px] tracking-wide hover:bg-text-secondary transition-all duration-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Feuilleter le magazine</span>
        </button>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [ref] = useInView({ threshold: 0.05 })
  const isInView = true
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [catalogueOpen, setCatalogueOpen] = useState(false)

  const vergelegenProject = otherProjects.find((p) => p.id === 'vergelegen')!
  const schoolProjects = otherProjects.filter((p) => p.category === 'École' && p.id !== 'vergelegen')
  const entrepriseProjects = otherProjects.filter((p) => p.category === 'Entreprise')

  return (
    <>
      <section id="projets" className="py-24 md:py-32 px-6 bg-ivory relative overflow-hidden" ref={ref} aria-label="Projets">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(229,168,35,0.10) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 md:mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.45em] text-accent" style={{ fontWeight: 600 }}>
                Réalisations
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl text-night leading-[1.05]"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Mes{' '}
              <span
                className="italic inline-block"
                style={{
                  paddingRight: '0.12em',
                  background: 'linear-gradient(135deg, #B07410 0%, #E5A823 50%, #F5C957 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                projets
              </span>
            </h2>
            <p className="mt-5 text-text-muted text-base md:text-lg max-w-2xl">
              Une sélection de projets menés en alternance et à l'école, avec leur direction artistique propre.
            </p>
          </motion.div>

          {/* Featured Projects Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-text-muted" style={{ fontWeight: 600 }}>
                Coups de cœur
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            </div>

            <Carousel autoplay={false}>
              {featuredProjects.map((project, idx) => (
                <CarouselSlide key={project.id}>
                  <div
                    className="rounded-3xl overflow-hidden transition-all duration-500 hover:translate-y-[-2px] relative h-full min-h-[480px] md:min-h-[520px] flex flex-col bg-ivory border border-accent/15"
                    style={{
                      boxShadow:
                        '0 14px 50px -10px rgba(176,116,16,0.18), 0 4px 18px -4px rgba(229,168,35,0.10)',
                    }}
                  >
                    {/* Soft decorative top corner */}
                    <SunflowerStamp />

                    <div className="grid md:grid-cols-2 gap-0 relative z-[2] flex-1">
                      <div
                        className="h-[360px] md:h-auto md:min-h-[480px] relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none flex items-center justify-center"
                        style={PREMIUM_CARD_BG}
                      >
                        <Picture
                          src={project.image}
                          alt={project.title}
                          imgClassName="w-full h-full object-contain relative z-[1] p-6"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 50vw"
                        />
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="text-[10px] tabular-nums tracking-[0.3em] text-accent" style={{ fontWeight: 600 }}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="w-8 h-[1px] bg-accent/50" aria-hidden="true" />
                          <span className="text-[10px] uppercase tracking-[0.35em] text-accent-blue" style={{ fontWeight: 600 }}>
                            {project.category}
                          </span>
                        </div>
                        <h4
                          className="text-3xl md:text-4xl mb-5 text-night leading-[1.1]"
                          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
                        >
                          {project.title}
                        </h4>
                        <p className="mb-7 leading-[1.8] text-text-muted">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.15em] bg-accent/8 text-accent-blue border border-accent/20"
                              style={{ fontWeight: 500 }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2.5 self-start group/btn transition-all duration-300 text-night hover:text-accent-blue"
                        >
                          <span className="tracking-wide" style={{ fontWeight: 600 }}>Voir le projet</span>
                          <span className="relative w-7 h-7 rounded-full border border-accent/30 group-hover/btn:bg-accent group-hover/btn:border-accent flex items-center justify-center transition-all duration-300">
                            <ExternalLink className="w-3.5 h-3.5 text-accent group-hover/btn:text-night transition-colors duration-300" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselSlide>
              ))}
            </Carousel>
          </motion.div>

        </div>
      </section>

      {/* ─── ENTREPRISE block ─── dark warm bg with gold accents */}
      <section
        id="projets-entreprise"
        className="relative py-20 md:py-28 px-6 overflow-hidden bg-night"
        aria-label="Projets en entreprise"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(229,168,35,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(176,116,16,0.10) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-14"
          >
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[11px] tabular-nums tracking-[0.3em] text-accent"
                    style={{ fontWeight: 600 }}
                  >
                    02
                  </span>
                  <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
                  <span
                    className="text-[10px] uppercase tracking-[0.45em] text-accent"
                    style={{ fontWeight: 600 }}
                  >
                    En entreprise
                  </span>
                </div>
                <h3
                  className="text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.05]"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
                >
                  Projets menés en{' '}
                  <span
                    className="italic inline-block"
                    style={{
                      paddingRight: '0.12em',
                      background: 'linear-gradient(135deg, #F5C957 0%, #E5A823 50%, #B07410 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    alternance
                  </span>
                </h3>
                <p className="mt-4 text-ivory-warm/65 text-sm md:text-base max-w-xl">
                  Réalisations en environnement professionnel, entre événementiel, communication institutionnelle et création de supports.
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-accent/10 border border-accent/30">
                <Briefcase className="w-4 h-4 text-accent" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-accent" style={{ fontWeight: 600 }}>
                  {entrepriseProjects.length} projets
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {entrepriseProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                delay={0.1 + index * 0.06}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ÉCOLE block ─── light cream bg with academic warmth */}
      <section
        id="projets-ecole"
        className="relative py-20 md:py-28 px-6 overflow-hidden bg-ivory-warm"
        aria-label="Projets scolaires"
      >
        <div
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(229,168,35,0.15) 0%, transparent 65%)',
            filter: 'blur(38px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(176,116,16,0.10) 0%, transparent 65%)',
            filter: 'blur(38px)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-14"
          >
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[11px] tabular-nums tracking-[0.3em] text-accent-blue"
                    style={{ fontWeight: 600 }}
                  >
                    03
                  </span>
                  <div className="w-10 h-[1px] bg-accent-blue/60" aria-hidden="true" />
                  <span
                    className="text-[10px] uppercase tracking-[0.45em] text-accent-blue"
                    style={{ fontWeight: 600 }}
                  >
                    À l'école
                  </span>
                </div>
                <h3
                  className="text-4xl md:text-5xl lg:text-6xl text-night leading-[1.05]"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
                >
                  Projets de{' '}
                  <span
                    className="italic inline-block"
                    style={{
                      paddingRight: '0.12em',
                      background: 'linear-gradient(135deg, #B07410 0%, #E5A823 50%, #F5C957 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    formation
                  </span>
                </h3>
                <p className="mt-4 text-text-muted text-sm md:text-base max-w-xl">
                  Travaux de BTS Communication : analyse stratégique, branding, propositions créatives et exercices d'agence.
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-night/[0.06] border border-night/15">
                <GraduationCap className="w-4 h-4 text-night" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-night" style={{ fontWeight: 600 }}>
                  {schoolProjects.length + 1} projets
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {schoolProjects.flatMap((project, index) => {
              const card = (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  delay={0.1 + index * 0.06}
                />
              )
              if (index === 0) {
                return [
                  card,
                  <VergelegenCard
                    key="vergelegen-card"
                    onOpenCatalogue={() => setCatalogueOpen(true)}
                    onOpenProject={() => setSelectedProject(vergelegenProject)}
                  />,
                ]
              }
              return [card]
            })}
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CatalogueViewer pages={[vergelegenCover, vergelegenPage1, vergelegenPage2]} isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} title="Vergelegen — Publireportage" />
    </>
  )
}
