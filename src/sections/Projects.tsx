import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { GraduationCap, Briefcase, ExternalLink, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router'
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

/* Ligne projet éditoriale — pleine largeur, alternance gauche/droite, format natif respecté. */
function ProjectRow({
  project,
  index,
  onOpen,
  dark = false,
  extraButton,
}: {
  project: Project
  index: number
  onOpen: () => void
  dark?: boolean
  extraButton?: React.ReactNode
}) {
  const reversed = index % 2 === 1

  const titleColor = dark ? 'text-ivory' : 'text-night'
  const titleHover = dark ? 'group-hover:text-accent' : 'group-hover:text-accent-blue'
  const descColor = dark ? 'text-ivory-warm/75' : 'text-text-muted'
  const numberColor = dark ? 'text-accent/85' : 'text-accent-blue'
  const ruleColor = dark ? 'bg-accent/30' : 'bg-accent-blue/35'
  const tagBorder = dark
    ? 'border-accent/25 text-accent bg-accent/[0.08]'
    : 'border-accent-blue/30 text-accent-blue bg-accent-blue/[0.05]'
  const ctaText = dark ? 'text-accent group-hover:text-ivory' : 'text-accent-blue group-hover:text-night'
  const imageBg = dark ? 'bg-night-light/40 border-accent/15' : 'bg-white border-accent/15'
  const ctaBorder = dark
    ? 'border-accent/40 group-hover:border-accent group-hover:bg-accent'
    : 'border-accent-blue/40 group-hover:border-accent-blue group-hover:bg-accent-blue'

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group cursor-pointer"
      data-cursor="hover"
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
        {/* Image — col-span-7, alterne G/D selon l'index */}
        <div className={`md:col-span-7 ${reversed ? 'md:order-2' : ''}`}>
          <div
            className={`relative overflow-hidden rounded-2xl border ${imageBg} transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-20px_rgba(176,116,16,0.30)]`}
          >
            <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center">
              <Picture
                src={project.image}
                alt={project.title}
                imgClassName="w-full h-auto max-h-[75vh] object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            {extraButton && (
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]">
                {extraButton}
              </div>
            )}
          </div>
        </div>

        {/* Texte — col-span-5 */}
        <div className={`md:col-span-5 ${reversed ? 'md:order-1' : ''}`}>
          <div
            className={`flex items-center gap-3 mb-5 font-mono text-[11px] tabular-nums tracking-[0.3em] ${numberColor}`}
            style={{ fontWeight: 600 }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span className={`block w-12 h-[1px] ${ruleColor}`} aria-hidden="true" />
            <span className="uppercase">{project.category}</span>
          </div>

          <h3
            className={`text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.05] mb-5 transition-colors duration-300 ${titleColor} ${titleHover}`}
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.015em' }}
          >
            {project.title}
          </h3>

          <p className={`leading-[1.75] mb-7 ${descColor}`}>{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${tagBorder}`}
                style={{ fontWeight: 600 }}
              >
                {tag}
              </span>
            ))}
          </div>

          <span className={`inline-flex items-center gap-3 transition-colors duration-300 ${ctaText}`}>
            <span className="text-[12px] uppercase tracking-[0.3em]" style={{ fontWeight: 700 }}>
              Voir le projet
            </span>
            <span
              className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${ctaBorder}`}
            >
              <ExternalLink className="w-3.5 h-3.5 transition-colors duration-300" />
            </span>
          </span>
        </div>
      </div>
    </motion.article>
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

export function Projects() {
  const [ref] = useInView({ threshold: 0.05 })
  const isInView = true
  const navigate = useNavigate()
  const openProject = (project: Project) => navigate(`/projet/${project.id}`)
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
                          onClick={() => openProject(project)}
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

      {/* Fondu ivory → night avant la section Entreprise */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-ivory via-night-secondary to-night" aria-hidden="true" />

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

          {/* Lignes éditoriales pleine largeur, alternance G/D, format natif respecté. */}
          <div className="space-y-20 md:space-y-32">
            {entrepriseProjects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onOpen={() => openProject(project)}
                dark
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fondu night → ivory-warm avant la section École */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-night via-night-secondary to-ivory-warm" aria-hidden="true" />

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

          {/* Lignes éditoriales pleine largeur, alternance G/D, format natif respecté. */}
          <div className="space-y-20 md:space-y-32">
            {schoolProjects.flatMap((project, index) => {
              const row = (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={() => openProject(project)}
                />
              )
              if (index === 0) {
                return [
                  row,
                  <ProjectRow
                    key="vergelegen-row"
                    project={vergelegenProject}
                    index={index + 1}
                    onOpen={() => openProject(vergelegenProject)}
                    extraButton={
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setCatalogueOpen(true)
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-night/95 backdrop-blur text-ivory rounded-full text-[11px] uppercase tracking-[0.25em] hover:bg-accent hover:text-night transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Feuilleter le magazine</span>
                      </button>
                    }
                  />,
                ]
              }
              return [row]
            })}
          </div>
        </div>
      </section>

      <CatalogueViewer pages={[vergelegenCover, vergelegenPage1, vergelegenPage2]} isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} title="Vergelegen — Publireportage" />
    </>
  )
}
