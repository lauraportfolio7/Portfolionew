import { motion } from 'motion/react'
import { Sigil } from '@/components/Sigil'

export function Manifesto() {
  return (
    <section
      id="apropos"
      className="relative bg-bone text-ink px-6 md:px-10 py-24 md:py-40 overflow-hidden"
      aria-label="À propos"
    >
      <div className="max-w-7xl mx-auto">
        {/* Bandeau d'en-tête éditorial */}
        <div className="flex items-center justify-between mb-12 md:mb-20 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-deep">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span style={{ color: 'var(--color-gold)' }}>
              <Sigil size={18} color="currentColor" />
            </span>
            <span>À propos — Manifeste 01</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden md:block"
          >
            Page 002
          </motion.div>
        </div>

        {/* Petit set-up italique */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-2xl md:text-4xl text-ink-deep leading-tight max-w-3xl"
          style={{ fontWeight: 400 }}
        >
          « Je ne fais pas que communiquer. »
        </motion.p>

        {/* Punch monumental */}
        <h2
          className="font-display italic leading-[0.92] tracking-[-0.035em] mt-6 md:mt-10"
          style={{ fontSize: 'clamp(3.5rem, 13vw, 11rem)', fontWeight: 600 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="block"
            style={{ color: 'var(--color-ink)' }}
          >
            Je construis
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block"
            style={{ color: 'var(--color-gold-deep)' }}
          >
            des récits
            <span className="not-italic" style={{ color: 'var(--color-cinnabar)' }}>
              .
            </span>
          </motion.span>
        </h2>

        {/* Composition asymétrique : méta gauche · paragraphes droite */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mt-20 md:mt-32">
          {/* Méta-infos en mono — colonne gauche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-3 md:border-r md:border-ink/15 md:pr-6"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] space-y-5">
              {[
                { label: 'Identité', value: 'Laura Cerveaux' },
                { label: 'Âge', value: '22 ans' },
                { label: 'Origine', value: 'La Réunion · 974' },
                { label: 'Statut', value: 'BTS Comm · Alternance' },
                { label: 'Direction', value: 'Son & Image' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="block mb-1.5" style={{ color: 'var(--color-gold-deep)' }}>
                    {label}
                  </span>
                  <span className="text-ink">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Paragraphes corps — colonne droite */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
            }}
            className="md:col-span-8 md:col-start-5 space-y-6 font-body text-base md:text-lg leading-[1.75] text-ink-deep max-w-2xl"
          >
            {[
              <>
                Je suis en{' '}
                <strong className="text-ink font-semibold">BTS Communication en alternance</strong>, un parcours qui me sert de passerelle vers ce qui m'anime vraiment :{' '}
                <em className="italic font-display" style={{ color: 'var(--color-gold-deep)' }}>
                  le son et l'image
                </em>
                .
              </>,
              <>
                J'y développe à la fois des compétences en communication et une sensibilité créative, à travers des projets réels menés en entreprise — événementiel, édition, branding, contenus digitaux.
              </>,
              <>
                Mon objectif est d'intégrer une{' '}
                <strong className="text-ink font-semibold">licence professionnelle dans le domaine du son et de l'image</strong>, un univers plus proche de la musique et de la création visuelle.
              </>,
            ].map((node, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {node}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Tags éditoriaux brutalistes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 md:mt-28 border-t border-ink/15 pt-8"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-gold-deep)' }}>
            Champs d'expression
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'BTS Communication',
              'Alternance',
              'Son & Image',
              'Création',
              'Éditorial',
              'Direction artistique',
              'Branding',
              'Événementiel',
            ].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.25em] px-4 py-2.5 border border-ink text-ink hover:bg-ink hover:text-bone transition-colors duration-200"
                data-cursor="hover"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
