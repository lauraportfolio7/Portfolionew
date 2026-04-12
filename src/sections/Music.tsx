import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { Music2, Piano, Mic, Laptop } from 'lucide-react'
import { tracks, practices } from '@/data/music'

const practiceIcons = { Piano, 'Ukulélé': Music2, Chant: Mic, MAO: Laptop } as const

export function Music() {
  const [ref, isInView] = useInView({ threshold: 0.15 })

  return (
    <section id="musique" className="py-20 md:py-28 px-6 relative overflow-hidden bg-night" ref={ref} aria-label="Musique">
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[400px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(ellipse, rgba(107,127,232,0.12) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute bottom-[15%] left-[8%] w-[450px] h-[380px] rounded-full blur-[110px]" style={{ background: 'radial-gradient(ellipse, rgba(74,111,189,0.10) 0%, transparent 65%)' }} aria-hidden="true" />

      <svg className="absolute top-[30%] left-0 right-0 w-full h-32 pointer-events-none opacity-5" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M0 50 Q60 20 120 50 Q180 80 240 50 Q300 20 360 50 Q420 80 480 50 Q540 20 600 50 Q660 80 720 50 Q780 20 840 50 Q900 80 960 50 Q1020 20 1080 50 Q1140 80 1200 50 Q1260 20 1320 50 Q1380 80 1440 50"
          stroke="white" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeOut', repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-3 block">Passion</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 text-white leading-[1.1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Musique
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6" aria-hidden="true" />
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            La musique fait partie de moi depuis toujours. C'est un espace personnel de création, d'écoute et d'expression qui nourrit tout le reste.
          </p>
        </motion.div>

        {/* Practice pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {practices.map((item, index) => {
            const IconComp = practiceIcons[item.title as keyof typeof practiceIcons] || Music2
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.08] backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/[0.12] transition-all duration-300"
              >
                <IconComp className="w-4 h-4 text-white/80" />
                <span className="text-sm text-white/80" style={{ fontWeight: 500 }}>{item.title}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Music cards with SoundCloud players */}
        <div className="grid md:grid-cols-2 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-night-light/60 to-night/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500"
                style={{ boxShadow: '0 20px 60px -12px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.08)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-accent/20 to-transparent blur-2xl" />
                </div>

                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-blue flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg text-white" style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                      {track.title}
                    </h3>
                  </div>

                  <div className="rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={track.soundcloudUrl}
                      className="w-full"
                      title={`SoundCloud - ${track.title}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
