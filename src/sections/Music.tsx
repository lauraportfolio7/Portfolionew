import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { Music2, Piano, Mic, Laptop } from 'lucide-react'
import { tracks, practices } from '@/data/music'
import { TrackList } from '@/components/TrackList'

const practiceIcons = { Piano, 'Ukulélé': Music2, Chant: Mic, MAO: Laptop } as const

export function Music() {
  const [ref, isInView] = useInView({ threshold: 0.15 })

  return (
    <section id="musique" className="py-24 md:py-32 px-6 relative bg-night overflow-hidden" ref={ref} aria-label="Musique">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(229,168,35,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(176,116,16,0.10) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-accent" style={{ fontWeight: 600 }}>
              Passion
            </span>
            <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
          </div>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl mb-5 text-ivory leading-[1.05]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
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
              Musique
            </span>
          </h2>
          <p className="text-ivory-warm/70 max-w-2xl mx-auto leading-relaxed text-base mt-4">
            Piano, ukulélé, voix, MAO. J'écris mes propres morceaux depuis quelques années — en voici deux.
          </p>
        </motion.div>

        {/* Practice pills — compact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {practices.map((item, index) => {
            const IconComp = practiceIcons[item.title as keyof typeof practiceIcons] || Music2
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/25 bg-accent/[0.06] backdrop-blur-sm transition-all duration-300 hover:bg-accent/[0.12] hover:border-accent/40"
              >
                <IconComp className="w-3.5 h-3.5 text-accent" />
                <span className="text-[12px] text-ivory-warm/85" style={{ fontWeight: 500 }}>{item.title}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Spotify-minimal player */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <TrackList tracks={tracks} />
        </motion.div>
      </div>
    </section>
  )
}
