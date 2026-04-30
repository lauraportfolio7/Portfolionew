import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import portrait from '@/assets/profile/laura-sunflowers.png'
import { Picture } from '@/components/Picture'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const scrollToProjects = () => {
    const el = document.querySelector('#projets')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative bg-night overflow-hidden min-h-screen flex flex-col"
      aria-label="Accueil"
    >
      {/* Sunflower glow ambience */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 30%, rgba(229,168,35,0.20) 0%, transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(176,116,16,0.12) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Vertical decorative line — left edge */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute left-12 top-32 bottom-32 w-[1px] origin-top z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(229,168,35,0.4), transparent)' }}
        aria-hidden="true"
      />

      {/* Side label vertical right */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-5">
        <div className="w-[1px] h-16 bg-accent/30" aria-hidden="true" />
        <span className="text-[10px] uppercase tracking-[0.55em] text-accent/70 [writing-mode:vertical-rl] rotate-180" style={{ fontWeight: 500 }}>
          BTS Communication · 2026
        </span>
        <div className="w-[1px] h-16 bg-accent/30" aria-hidden="true" />
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-[5] px-6 md:px-12 lg:px-20 pt-24 md:pt-28 pb-28">
        <div className="max-w-7xl mx-auto w-full h-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[78vh]">
            {/* Left — typography stack */}
            <motion.div className="lg:col-span-7 relative z-[6]" style={{ y: titleY }}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-7 flex items-center gap-3"
              >
                <span className="text-[10px] tabular-nums text-accent/80 tracking-[0.3em]" style={{ fontWeight: 500 }}>
                  N°01
                </span>
                <div className="w-10 h-[1px] bg-accent/40" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.45em] text-ivory-warm/65">
                  Portfolio Édition 2026
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,9vw,7.5rem)] tracking-[-0.025em] leading-[0.9] text-ivory"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
              >
                <span className="block">Laura</span>
                <span className="block italic relative pr-[0.15em] pb-[0.05em]" style={{ overflow: 'visible' }}>
                  <span
                    className="inline-block"
                    style={{
                      paddingRight: '0.12em',
                      background: 'linear-gradient(135deg, #F5C957 0%, #E5A823 55%, #B07410 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Cerveaux
                  </span>
                  <span className="not-italic text-accent/30">.</span>
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 max-w-xl"
              >
                <p
                  className="text-base md:text-lg text-ivory-warm/85 leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                >
                  Communication, création, son <span className="text-accent">&amp;</span> image.
                </p>
                <p className="mt-2 text-sm md:text-base text-ivory-warm/55 leading-relaxed max-w-md">
                  Je construis des récits qui donnent envie qu'on les écoute.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-wrap items-center gap-5"
              >
                <button
                  onClick={scrollToProjects}
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full overflow-hidden transition-shadow duration-500 hover:shadow-[0_10px_36px_-8px_rgba(229,168,35,0.55)]"
                  style={{
                    background: 'linear-gradient(135deg, #F5C957 0%, #E5A823 55%, #B07410 100%)',
                    color: '#1B160B',
                    fontWeight: 600,
                  }}
                >
                  <span className="relative text-[13px] tracking-wide">Découvrir mes projets</span>
                  <ArrowDownRight className="relative w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-500" />
                </button>

                <a
                  href="#contact"
                  className="text-ivory-warm/75 hover:text-accent transition-colors text-[11px] tracking-[0.25em] uppercase border-b border-ivory-warm/20 hover:border-accent pb-1.5"
                  style={{ fontWeight: 500 }}
                >
                  Me contacter
                </a>
              </motion.div>
            </motion.div>

            {/* Right — editorial photo composition with parallax */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: portraitY, scale: portraitScale }}
              className="lg:col-span-5 relative z-[6] flex justify-center lg:justify-end items-start lg:-mt-8"
            >
              <div className="relative w-full max-w-[380px] lg:max-w-[440px]">
                {/* Yellow circle backdrop */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-6 -right-6 w-[110%] aspect-square rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, #F5C957 0%, #E5A823 50%, #B07410 100%)',
                    filter: 'blur(0px)',
                  }}
                  aria-hidden="true"
                />
                {/* Soft outer glow */}
                <div
                  className="absolute -inset-10 rounded-full opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(229,168,35,0.25) 0%, transparent 65%)',
                    filter: 'blur(30px)',
                  }}
                  aria-hidden="true"
                />

                {/* Sunflower SVG decor — top right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-10 -left-10 w-24 h-24 z-[2] hidden md:block"
                  aria-hidden="true"
                >
                  <SunflowerSVG />
                </motion.div>

                {/* Sunflower SVG decor — bottom left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-8 -right-6 w-20 h-20 z-[2] hidden md:block"
                  aria-hidden="true"
                >
                  <SunflowerSVG variant="small" />
                </motion.div>

                {/* Photo with organic mask */}
                <div
                  className="relative z-[3] overflow-hidden"
                  style={{
                    borderRadius: '52% 48% 50% 50% / 60% 55% 45% 40%',
                    boxShadow:
                      '0 30px 80px -20px rgba(229,168,35,0.40), 0 12px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  <Picture
                    src={portrait}
                    alt="Laura Cerveaux"
                    className="w-full h-full object-cover aspect-[4/5]"
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 30vw"
                  />
                </div>

                {/* Editorial credit chip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                  className="absolute -bottom-4 left-4 z-[4] px-4 py-2 rounded-full bg-night/90 backdrop-blur-md border border-accent/25"
                  style={{ boxShadow: '0 10px 28px -8px rgba(0,0,0,0.5)' }}
                >
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-accent" style={{ fontWeight: 500 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    22 ans · La Réunion
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.6 }}
        className="relative z-[5] border-t border-accent/20 px-6 md:px-12 py-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ivory-warm/50"
      >
        <span>BTS Communication · Alternance</span>
        <span className="hidden md:inline">Son × Image · Récit & Direction</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 text-accent/80"
        >
          Scroll <span aria-hidden="true">↓</span>
        </motion.span>
      </motion.div>
    </section>
  )
}

function SunflowerSVG({ variant = 'large' }: { variant?: 'large' | 'small' }) {
  const petalCount = variant === 'small' ? 10 : 12
  const petals = Array.from({ length: petalCount })
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: variant === 'small' ? 80 : 120, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <radialGradient id={`petalGrad-${variant}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#F5C957" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#B07410" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      {petals.map((_, i) => {
        const angle = (360 / petalCount) * i
        return (
          <ellipse
            key={i}
            cx="50"
            cy="22"
            rx="6"
            ry="14"
            fill={`url(#petalGrad-${variant})`}
            transform={`rotate(${angle} 50 50)`}
            opacity="0.85"
          />
        )
      })}
      <circle cx="50" cy="50" r="9" fill="#1B160B" />
      <circle cx="50" cy="50" r="6" fill="#3A2F1A" />
    </motion.svg>
  )
}
