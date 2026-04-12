import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { GraduationCap, Briefcase, ExternalLink, BookOpen, FileText, Play } from 'lucide-react'
import { ProjectModal } from '@/components/ProjectModal'
import { CatalogueViewer } from '@/components/CatalogueViewer'
import { Carousel, CarouselSlide } from '@/components/Carousel'
import { featuredProjects, otherProjects } from '@/data/projects'
import type { Project } from '@/types'
import { useState } from 'react'

// Import Vergelegen pages for catalogue
import vergelegenCover from '@/assets/vergelegen/cover.jpg'
import vergelegenPage1 from '@/assets/vergelegen/page-1.jpg'
import vergelegenPage2 from '@/assets/vergelegen/page-2.jpg'

function ProjectCard({ project, onClick, delay }: { project: Project; onClick: () => void; delay: number }) {
  const hasImage = project.image && typeof project.image === 'string'

  return hasImage ? (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="bg-white/85 backdrop-blur-sm rounded-xl border border-night-secondary/[0.06] group cursor-pointer relative overflow-hidden"
      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-night-secondary/[0.08] to-transparent group-hover:via-night-secondary/25 transition-all duration-500 z-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-night-secondary to-night-secondary/20 group-hover:h-full transition-all duration-500 ease-out z-10" aria-hidden="true" />

      <div className="h-[380px] bg-sky-light flex items-center justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg text-night-secondary group-hover:text-text-secondary transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
            {project.title}
          </h4>
          <ExternalLink className="w-4 h-4 text-night-secondary/30 opacity-0 group-hover:opacity-100 transition-all duration-400 flex-shrink-0 ml-2 mt-1" />
        </div>
        <p className="text-[13px] text-text-muted leading-relaxed mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] uppercase tracking-wider text-night-secondary/40 px-2 py-0.5 bg-night-secondary/[0.04] rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {project.documentUrl && (
          <a href={project.documentUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-night-secondary text-white rounded-lg text-[13px] tracking-wide hover:bg-text-secondary transition-all duration-300">
            <FileText className="w-3.5 h-3.5" /><span>Voir le dossier</span>
          </a>
        )}
        {project.videoUrl && (
          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-night-secondary text-white rounded-lg text-[13px] tracking-wide hover:bg-text-secondary transition-all duration-300">
            <Play className="w-3.5 h-3.5" /><span>Voir la vidéo</span>
          </a>
        )}
        {project.brandbookUrl && (
          <a href={project.brandbookUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-night-secondary text-white rounded-lg text-[13px] tracking-wide hover:bg-text-secondary transition-all duration-300">
            <BookOpen className="w-3.5 h-3.5" /><span>Voir le brand book</span>
          </a>
        )}
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="bg-white/85 backdrop-blur-sm p-6 rounded-xl border border-night-secondary/[0.06] group cursor-pointer relative overflow-hidden"
      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-night-secondary/[0.08] to-transparent group-hover:via-night-secondary/25 transition-all duration-500" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-night-secondary to-night-secondary/20 group-hover:h-full transition-all duration-500 ease-out" aria-hidden="true" />
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-night-secondary/[0.06] flex items-center justify-center group-hover:bg-night-secondary/[0.12] group-hover:scale-105 transition-all duration-400">
          {project.category === 'École' ? <GraduationCap className="w-5 h-5 text-night-secondary" /> : <Briefcase className="w-5 h-5 text-night-secondary" />}
        </div>
        <ExternalLink className="w-4 h-4 text-night-secondary/30 opacity-0 group-hover:opacity-100 transition-all duration-400 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <h4 className="text-lg mb-2.5 text-night-secondary group-hover:text-text-secondary transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>{project.title}</h4>
      <p className="text-[13.5px] text-text-muted leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider text-night-secondary/40 px-2 py-0.5 bg-night-secondary/[0.04] rounded-full">{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

function VergelegenCard({ onOpenCatalogue }: { onOpenCatalogue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/85 backdrop-blur-sm rounded-xl border border-night-secondary/[0.06] group relative overflow-hidden"
      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-night-secondary/[0.08] to-transparent group-hover:via-night-secondary/25 transition-all duration-500 z-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-night-secondary to-night-secondary/20 group-hover:h-full transition-all duration-500 ease-out z-10" aria-hidden="true" />

      <div className="h-[380px] bg-gradient-to-br from-sky-light to-[#E4EBF5] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1C2340 1px, transparent 0)', backgroundSize: '20px 20px' }} aria-hidden="true" />
        <div className="relative" style={{ perspective: '800px' }}>
          <div
            className="rounded-sm overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
            style={{
              transform: 'rotateY(-4deg) rotateX(1deg)',
              boxShadow: '8px 8px 30px -5px rgba(28,35,64,0.25), -2px -1px 10px rgba(28,35,64,0.05), inset -2px 0 4px rgba(0,0,0,0.1)',
            }}
          >
            <img src={vergelegenCover} alt="Vergelegen - Couverture" className="h-[340px] w-auto block" style={{ objectFit: 'contain' }} loading="lazy" decoding="async" />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-sm" style={{ background: 'linear-gradient(to right, rgba(28,35,64,0.15), rgba(28,35,64,0.05))', transform: 'rotateY(-4deg) rotateX(1deg)' }} aria-hidden="true" />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-night-secondary/40" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-night-secondary/40">Publireportage</span>
        </div>
        <h4 className="text-lg mb-2 text-night-secondary group-hover:text-text-secondary transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>Vergelegen</h4>
        <p className="text-[13px] text-text-muted leading-relaxed mb-3">Publireportage gastronomique pour le domaine viticole Vergelegen — trois espaces culinaires au cœur de la nature sud-africaine.</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[10px] uppercase tracking-wider text-night-secondary/40 px-2 py-0.5 bg-night-secondary/[0.04] rounded-full">Rédaction</span>
          <span className="text-[10px] uppercase tracking-wider text-night-secondary/40 px-2 py-0.5 bg-night-secondary/[0.04] rounded-full">Mise en page</span>
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
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [catalogueOpen, setCatalogueOpen] = useState(false)

  const schoolProjects = otherProjects.filter((p) => p.category === 'École')
  const entrepriseProjects = otherProjects.filter((p) => p.category === 'Entreprise')

  return (
    <>
      <section id="projets" className="py-10 md:py-14 px-6 bg-sky-light relative overflow-hidden" ref={ref} aria-label="Projets">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.012]" aria-hidden="true">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="#1C2340" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>
        </div>
        <div className="absolute top-[30%] left-[3%] w-[350px] h-[280px] rounded-full blur-[90px]" style={{ background: 'radial-gradient(ellipse, rgba(190,218,245,0.18) 0%, transparent 65%)' }} aria-hidden="true" />
        <div className="absolute bottom-[20%] right-[8%] w-[300px] h-[250px] rounded-full blur-[80px]" style={{ background: 'radial-gradient(ellipse, rgba(205,225,248,0.15) 0%, transparent 60%)' }} aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[11px] uppercase tracking-[0.35em] text-night/35 mb-2 block">Réalisations</span>
            <h2 className="text-3xl md:text-4xl mb-4 text-night" style={{ fontFamily: 'var(--font-serif)' }}>
              Mes Projets
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-night-secondary/15 via-night-secondary/40 to-night-secondary/15 mx-auto" aria-hidden="true" />
          </motion.div>

          {/* Featured Projects Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 max-w-5xl mx-auto"
          >
            <h3 className="text-xl mb-8 text-center text-night" style={{ fontFamily: 'var(--font-serif)' }}>
              Projets Principaux
            </h3>

            <Carousel>
              {featuredProjects.map((project) => (
                <CarouselSlide key={project.id}>
                  <div
                    className="rounded-3xl overflow-hidden transition-all duration-500 hover:translate-y-[-2px]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.90) 100%)',
                      boxShadow: '0 8px 40px -8px rgba(28,35,64,0.10), 0 2px 15px -3px rgba(28,35,64,0.05)',
                      border: '1px solid rgba(28,35,64,0.06)',
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-[400px] md:h-[440px] relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-light/30 to-sky-light/10" />
                        <img src={project.image} alt={project.title} className="w-full h-full object-contain relative z-[1] p-4" loading="lazy" decoding="async" />
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-night-secondary/[0.06] rounded-full mb-5 self-start border border-night-secondary/10">
                          <span className="text-xs uppercase tracking-[0.2em] text-night-secondary">{project.category}</span>
                        </div>
                        <h4 className="text-3xl mb-5 text-night-secondary" style={{ fontFamily: 'var(--font-serif)' }}>
                          {project.title}
                        </h4>
                        <p className="text-text-muted mb-8 leading-[1.8] opacity-85">{project.description}</p>
                        <div className="flex flex-wrap gap-2.5 mb-8">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-3.5 py-1 bg-night-secondary/[0.06] text-night-secondary/80 rounded-full text-sm">{tag}</span>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2.5 text-night-secondary hover:text-text-secondary transition-all duration-300 self-start group"
                        >
                          <span className="tracking-wide">Voir le projet</span>
                          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselSlide>
              ))}
            </Carousel>
          </motion.div>

          {/* Other Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* School Projects */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-night-secondary/[0.05] rounded-full border border-night-secondary/[0.08]">
                  <GraduationCap className="w-4 h-4 text-night-secondary" />
                  <span className="text-[12px] uppercase tracking-[0.2em] text-night-secondary">Projets scolaires</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-night-secondary/10 to-transparent" aria-hidden="true" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {schoolProjects.flatMap((project, index) => {
                  const card = (
                    <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} delay={0.5 + index * 0.08} />
                  )
                  // Insert Vergelegen after first school project (Lava Flow)
                  if (index === 0) {
                    return [card, <VergelegenCard key="vergelegen" onOpenCatalogue={() => setCatalogueOpen(true)} />]
                  }
                  return [card]
                })}
              </div>
            </div>

            {/* Enterprise Projects */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-night-secondary/[0.05] rounded-full border border-night-secondary/[0.08]">
                  <Briefcase className="w-4 h-4 text-night-secondary" />
                  <span className="text-[12px] uppercase tracking-[0.2em] text-night-secondary">Projets en entreprise</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-night-secondary/10 to-transparent" aria-hidden="true" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {entrepriseProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} delay={0.6 + index * 0.08} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CatalogueViewer pages={[vergelegenCover, vergelegenPage1, vergelegenPage2]} isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} title="Vergelegen — Publireportage" />
    </>
  )
}
