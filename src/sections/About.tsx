import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.15 })

  return (
    <section
      id="apropos"
      className="py-24 md:py-32 px-6 bg-ivory relative overflow-hidden"
      ref={ref}
      aria-label="À propos"
    >
      {/* Soft sunflower glow corners */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(229,168,35,0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-32 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(176,116,16,0.08) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20 text-center md:text-left"
        >
          <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-accent" style={{ fontWeight: 600 }}>
              À propos
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl text-night leading-[1.05] max-w-4xl"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            La communication est pour moi un moyen de
            <br />
            <span
              className="italic inline-block"
              style={{
                paddingRight: '0.1em',
                background: 'linear-gradient(135deg, #B07410 0%, #E5A823 50%, #F5C957 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              faire ressentir autant que de faire comprendre.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
            }}
            className="md:col-span-7 space-y-6 text-[16px] md:text-[17px] leading-[1.85] text-text-secondary"
          >
            {[
              <>
                Je suis en <span className="text-night" style={{ fontWeight: 600 }}>BTS Communication en alternance</span>, une formation qui me permet de développer des compétences en stratégie, création de contenus et gestion de projets à travers des expériences concrètes menées à l'école et en entreprise.
              </>,
              <>
                Depuis toujours, la <span className="text-accent-blue" style={{ fontWeight: 600 }}>musique</span> occupe une place importante dans ma vie. C'est ce qui m'a naturellement conduit à m'intéresser à l'univers du son et à la manière dont une émotion peut être transmise, partagée et ressentie.
              </>,
              <>
                Aujourd'hui, je me dirige vers une <span className="text-night" style={{ fontWeight: 600 }}>licence professionnelle dans le domaine du son</span>, avec l'envie de mettre ma créativité au service de projets capables de toucher les gens et de créer une véritable expérience.
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div
              className="relative p-7 rounded-3xl border border-accent/20"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,252,244,0.95) 0%, rgba(251,244,221,0.95) 100%)',
                boxShadow: '0 18px 50px -14px rgba(176,116,16,0.18)',
              }}
            >
              <div className="absolute top-4 right-4 text-[60px] leading-none text-accent/15" style={{ fontFamily: 'var(--font-serif)' }} aria-hidden="true">
                "
              </div>
              <p
                className="text-xl md:text-2xl text-night leading-[1.45] italic mb-6 relative z-10"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}
              >
                Mon vrai métier : créer ce qui touche les gens.
              </p>
              <div className="w-12 h-[2px] bg-accent mb-3" aria-hidden="true" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted" style={{ fontWeight: 600 }}>
                Laura · 22 ans · La Réunion
              </p>
            </div>

          </motion.div>
        </div>

        {/* Mon univers musical — vidéo cover */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20"
        >
          <div
            className="grid md:grid-cols-2 gap-8 md:gap-10 items-center p-6 md:p-8 rounded-3xl border border-accent/20"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,252,244,0.95) 0%, rgba(251,244,221,0.92) 100%)',
              boxShadow: '0 18px 50px -16px rgba(176,116,16,0.18)',
            }}
          >
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <div className="w-8 h-[1px] bg-accent" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-accent" style={{ fontWeight: 600 }}>
                  Cover
                </span>
              </div>
              <h3
                className="text-3xl md:text-4xl text-night leading-[1.1] mb-4"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.01em' }}
              >
                Mon univers musical
              </h3>
              <p className="text-[16px] md:text-[17px] leading-[1.8] text-text-secondary max-w-xl mx-auto md:mx-0">
                La musique occupe une place centrale dans mon parcours. Cette reprise reflète ce qui m'anime :
                transmettre une émotion à travers le son.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-night/90 aspect-video shadow-[0_14px_40px_-12px_rgba(176,116,16,0.35)]">
                <video
                  src="/videos/cover-musique.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Reprise musicale de Laura"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
