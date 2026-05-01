import { motion } from 'motion/react'
import { Sigil } from '@/components/Sigil'
import { milestones } from '@/data/milestones'
import type { Milestone } from '@/types'

const TYPE_LABELS: Record<Milestone['type'], string> = {
  diplome: 'Diplôme',
  formation: 'Formation',
  experience: 'Expérience',
  objectif: 'Objectif',
}

export function Journey() {
  return (
    <section
      id="parcours"
      className="relative bg-ink text-bone px-6 md:px-10 py-24 md:py-40 overflow-hidden"
      aria-label="Parcours"
    >
      {/* Sceau décoratif en bas-droite */}
      <div
        className="absolute -right-32 -bottom-32 pointer-events-none opacity-[0.07] hidden md:block"
        aria-hidden="true"
      >
        <Sigil size={600} color="var(--color-gold)" spin spinDuration={180} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Bandeau d'en-tête */}
        <div className="flex items-center justify-between mb-12 md:mb-20 font-mono text-[10px] uppercase tracking-[0.3em]">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
            style={{ color: 'var(--color-gold)' }}
          >
            <Sigil size={18} color="currentColor" />
            <span>Parcours — CV éditorial</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden md:block opacity-60"
          >
            Page 003
          </motion.div>
        </div>

        {/* Titre de section */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display tracking-[-0.03em] leading-[0.92] mb-16 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 600 }}
        >
          Cinq ans
          <br />
          <span className="italic" style={{ color: 'var(--color-gold)' }}>
            de chemin
            <span className="not-italic" style={{ color: 'var(--color-cinnabar)' }}>
              .
            </span>
          </span>
        </motion.h2>

        {/* Liste de jalons — chaque ligne est une page éditoriale */}
        <div className="border-t border-bone/20">
          {milestones.map((m, i) => (
            <MilestoneRow key={m.id} milestone={m} index={i} />
          ))}
        </div>

        {/* Pied de section : objectif futur en grand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-24 grid md:grid-cols-12 gap-6 items-end"
        >
          <div className="md:col-span-2 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: 'var(--color-gold)' }}>
            Suite
          </div>
          <p className="md:col-span-10 font-display italic text-2xl md:text-4xl leading-tight max-w-3xl">
            « Une licence pro <span style={{ color: 'var(--color-gold)' }}>Image &amp; Son</span> pour rapprocher la com du métier que je vise vraiment. »
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function MilestoneRow({ milestone: m, index }: { milestone: Milestone; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-bone/15"
    >
      {/* Année — gros mono */}
      <div className="md:col-span-3 lg:col-span-3">
        <div
          className={`font-mono leading-[0.9] tracking-tight ${m.isFuture ? 'opacity-70' : ''}`}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
            color: m.isFuture ? 'var(--color-gold)' : 'var(--color-bone)',
            fontWeight: 500,
          }}
        >
          {m.year}
        </div>
      </div>

      {/* Type, titre, détail, note */}
      <div className="md:col-span-9 lg:col-span-9 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 border"
            style={{
              borderColor: m.isFuture ? 'var(--color-gold)' : 'var(--color-bone)',
              color: m.isFuture ? 'var(--color-gold)' : 'var(--color-bone)',
            }}
          >
            {TYPE_LABELS[m.type]}
          </span>
          {m.isFuture && (
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1.5"
              style={{ background: 'var(--color-cinnabar)', color: 'var(--color-bone)' }}
            >
              Prochain chapitre
            </span>
          )}
        </div>

        <h3
          className="font-display italic leading-[1.05]"
          style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)', fontWeight: 500 }}
        >
          {m.title}
        </h3>

        <p className="font-body text-base md:text-lg leading-[1.65] max-w-3xl text-bone/80">
          {m.detail}
        </p>

        {m.note && (
          <p
            className="font-mono text-[10px] uppercase tracking-[0.3em] inline-block pt-1"
            style={{ color: 'var(--color-cinnabar)' }}
          >
            ↳ {m.note}
          </p>
        )}
      </div>
    </motion.div>
  )
}
