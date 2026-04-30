import { motion, AnimatePresence } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { GraduationCap, Briefcase, Calendar, BookOpen, Sparkles, ChevronDown } from 'lucide-react'
import { milestones } from '@/data/milestones'
import { useState } from 'react'

const typeConfig = {
  formation: { icon: BookOpen, color: '#0F1B3D', bg: 'rgba(15,27,61,0.06)', label: 'Formation' },
  experience: { icon: Briefcase, color: '#0F1B3D', bg: 'rgba(15,27,61,0.06)', label: 'Expérience' },
  diplome: { icon: GraduationCap, color: '#0F1B3D', bg: 'rgba(15,27,61,0.06)', label: 'Diplôme' },
  objectif: { icon: Sparkles, color: '#6B7FE8', bg: 'rgba(107,127,232,0.10)', label: 'Objectif' },
}

const VISIBLE_COUNT = 4

export function Journey() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)

  const visibleMilestones = expanded ? milestones : milestones.slice(0, VISIBLE_COUNT)
  const hasMore = milestones.length > VISIBLE_COUNT

  return (
    <section id="parcours" className="py-24 md:py-32 px-6 bg-ivory relative" ref={ref} aria-label="Parcours">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-night/30 mb-3 block">Parcours</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 text-night leading-[1.1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Mon parcours
          </h2>
          <div className="w-20 h-1 bg-night rounded-full mx-auto" aria-hidden="true" />
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-7 md:left-1/2 top-0 bottom-0 w-[2px] transform md:-translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(15,27,61,0.18) 5%, rgba(15,27,61,0.12) 50%, rgba(107,127,232,0.18) 90%, transparent 100%)',
              transformOrigin: 'top',
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <AnimatePresence initial={false}>
            {visibleMilestones.map((milestone, index) => {
              const config = typeConfig[milestone.type]
              const IconComp = config.icon
              const isHovered = hoveredIndex === index
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: isLeft ? -25 : 25, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: index < VISIBLE_COUNT ? 0.15 + index * 0.1 : 0.05 + (index - VISIBLE_COUNT) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative mb-6 md:mb-8 flex items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-7 md:left-1/2 transform -translate-x-1/2 z-10 mt-5" aria-hidden="true">
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full ring-[6px] ring-ivory"
                      style={{ backgroundColor: config.color, boxShadow: `0 0 0 1px ${config.color}25, 0 4px 12px ${config.color}15` }}
                      animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: config.color }}
                        initial={{ scale: 1, opacity: 0.4 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.9 }}
                      />
                    )}
                  </div>

                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-24px)] ${isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
                    <motion.div
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`bg-white p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden group cursor-default ${
                        milestone.isFuture
                          ? 'border-dashed border-accent/30 hover:border-accent/50'
                          : 'border-night/10 hover:border-night/20'
                      }`}
                      style={{ boxShadow: isHovered ? '0 12px 40px -8px rgba(15,27,61,0.18)' : '0 4px 16px -4px rgba(15,27,61,0.08)' }}
                      animate={isHovered ? { y: -4 } : { y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${config.color}30, transparent)` }} aria-hidden="true" />
                      <div className="absolute top-0 left-0 w-[2px] h-0 group-hover:h-full transition-all duration-500 ease-out rounded-full" style={{ backgroundColor: config.color + '40' }} aria-hidden="true" />

                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 text-night/50">
                          <Calendar className="w-4 h-4" />
                          <span className="text-[11px] uppercase tracking-[0.15em]" style={{ fontWeight: 500 }}>{milestone.year}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.15em]" style={{ backgroundColor: config.bg, color: config.color, fontWeight: 600 }}>
                          <IconComp className="w-3.5 h-3.5" />
                          {config.label}
                        </div>
                      </div>

                      <h3 className="text-[1.05rem] mb-2 text-night leading-[1.3]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                        {milestone.title}
                      </h3>

                      {milestone.note && (
                        <p className="text-[11px] text-night/40 italic mb-2">{milestone.note}</p>
                      )}

                      <p className="text-[14px] text-text-secondary leading-[1.7]">{milestone.detail}</p>

                      {milestone.isFuture && (
                        <div className="mt-4 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-[11px] uppercase tracking-wider text-accent" style={{ fontWeight: 600 }}>Objectif à venir</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {!expanded && hasMore && (
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-ivory via-ivory/90 to-transparent z-20" aria-hidden="true" />
          )}
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-8 relative z-30"
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white border border-night/[0.12] hover:border-night/25 hover:bg-night/[0.02] transition-all duration-500 cursor-pointer relative overflow-hidden"
              style={{ boxShadow: '0 4px 20px -4px rgba(15,27,61,0.12)' }}
              aria-expanded={expanded}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-night/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <span className="text-[12px] uppercase tracking-[0.2em] text-night/70 group-hover:text-night transition-colors relative z-10" style={{ fontWeight: 600 }}>
                {expanded ? 'Voir moins' : 'Voir plus'}
              </span>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
                <ChevronDown className="w-4 h-4 text-night/50 group-hover:text-night transition-colors" />
              </motion.div>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
