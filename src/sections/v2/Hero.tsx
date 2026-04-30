import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Sigil } from '@/components/Sigil'
import { Picture } from '@/components/Picture'
import portrait from '@/assets/profile/laura-sunflowers.png'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sigilY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={ref}
      id="accueil"
      className="relative min-h-screen overflow-hidden bg-bone text-ink flex flex-col"
      aria-label="Accueil"
    >
      {/* Sceau géant en arrière-plan */}
      <motion.div
        style={{ y: sigilY }}
        className="absolute pointer-events-none -right-40 top-1/4 hidden md:block"
        aria-hidden="true"
      >
        <Sigil
          size={900}
          color="var(--color-gold)"
          spin
          spinDuration={140}
          className="opacity-[0.18]"
        />
      </motion.div>

      {/* Sceau plus petit pour mobile */}
      <motion.div
        style={{ y: sigilY }}
        className="absolute pointer-events-none -right-20 top-1/3 md:hidden"
        aria-hidden="true"
      >
        <Sigil
          size={400}
          color="var(--color-gold)"
          spin
          spinDuration={140}
          className="opacity-[0.18]"
        />
      </motion.div>

      {/* Masthead — grain éditorial */}
      <header className="relative z-10 px-6 md:px-10 pt-8 md:pt-10 flex items-start justify-between gap-6 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink-deep">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="inline-block w-2 h-2 bg-gold" aria-hidden="true" />
          <span>N° 01 — 2026</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="hidden md:block"
        >
          BTS Communication × Alternance
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-right"
        >
          La Réunion · 974
        </motion.div>
      </header>

      {/* TITRE MASSIF — centré verticalement */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 py-12"
      >
        <h1
          className="font-display tracking-[-0.04em] leading-[0.85] select-none"
          style={{ fontSize: 'clamp(4.5rem, 18vw, 14rem)', fontWeight: 600 }}
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              LAURA
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block italic"
              style={{ color: 'var(--color-gold-deep)' }}
            >
              Cerveaux
              <span className="not-italic" style={{ color: 'var(--color-cinnabar)' }}>
                .
              </span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* Bandeau bas — sous-titre + portrait + CTA */}
      <div className="relative z-10 px-6 md:px-10 pb-8 md:pb-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8"
          >
            <p className="font-display italic text-xl md:text-3xl lg:text-4xl text-ink leading-tight max-w-2xl mb-8">
              Communication, son <span style={{ color: 'var(--color-gold-deep)' }}>&amp;</span> image. <br className="hidden md:block" />
              Je construis des récits qui donnent envie qu'on les écoute.
            </p>
            <a
              href="#projets-teaser"
              className="group inline-flex items-center gap-3 bg-ink text-bone px-6 py-4 font-mono text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ink transition-colors duration-300"
              data-cursor-label="DÉCOUVRIR"
            >
              <span>Découvrir l'univers</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 relative max-w-[200px] md:max-w-[240px] ml-auto w-full"
          >
            <div className="relative">
              <Picture
                src={portrait}
                alt="Portrait de Laura Cerveaux"
                className="w-full aspect-[4/5] object-cover grayscale-[0.15] contrast-[1.05]"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 60vw, 25vw"
              />
              <div className="absolute -bottom-2 -left-2 bg-ink text-gold px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]">
                22 ans
              </div>
              <div className="absolute -top-4 -right-4 text-gold">
                <Sigil size={48} color="currentColor" spin spinDuration={18} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 pt-4 border-t border-ink/15 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-deep"
        >
          <span>Édition 2026</span>
          <span className="hidden md:inline">Récit · Direction · Image</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2"
            style={{ color: 'var(--color-gold-deep)' }}
          >
            <span>Scroll</span>
            <span aria-hidden="true">↓</span>
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
