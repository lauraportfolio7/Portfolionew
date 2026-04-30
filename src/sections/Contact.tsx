import { motion } from 'motion/react'
import { useInView } from '@/hooks/useInView'
import { Mail, Phone, ArrowRight } from 'lucide-react'
import { contact } from '@/data/contact'

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.2 })

  const contactInfo = [
    { icon: Mail, label: 'Email', value: contact.email, link: `mailto:${contact.email}` },
    { icon: Phone, label: 'Téléphone', value: contact.phone, link: contact.phoneHref },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-ivory relative overflow-hidden" ref={ref} aria-label="Contact">
      <div
        className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(229,168,35,0.12) 0%, transparent 65%)',
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
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-accent" style={{ fontWeight: 600 }}>
              Contact
            </span>
            <div className="w-10 h-[1px] bg-accent" aria-hidden="true" />
          </div>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl mb-6 text-night leading-[1.05]"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}
          >
            Discutons de vos{' '}
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
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Vous avez un projet en tête ? N'hésitez pas à me contacter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white p-7 rounded-2xl border border-accent/15 hover:border-accent/40 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ boxShadow: '0 8px 32px -8px rgba(176,116,16,0.15)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/15 to-transparent blur-2xl" />
              </div>

              <div className="relative flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #F5C957 0%, #E5A823 55%, #B07410 100%)' }}
                >
                  <info.icon className="w-6 h-6 text-night" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-accent-blue uppercase tracking-[0.25em] mb-1.5" style={{ fontWeight: 600 }}>{info.label}</p>
                  <p className="text-night text-base md:text-lg group-hover:text-accent-blue transition-colors" style={{ fontWeight: 500 }}>
                    {info.value}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-accent group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_-8px_rgba(229,168,35,0.55)] group"
            style={{
              background: 'linear-gradient(135deg, #F5C957 0%, #E5A823 55%, #B07410 100%)',
              color: '#1B160B',
            }}
          >
            <span className="text-[17px] tracking-wide" style={{ fontWeight: 600 }}>Travaillons ensemble</span>
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
