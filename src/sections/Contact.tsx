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
    <section id="contact" className="py-20 md:py-28 px-6 bg-gradient-to-b from-ivory to-ivory-warm relative overflow-hidden" ref={ref} aria-label="Contact">
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[320px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(ellipse, rgba(107,127,232,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute bottom-[15%] left-[8%] w-[350px] h-[280px] rounded-full blur-[90px]" style={{ background: 'radial-gradient(ellipse, rgba(74,111,189,0.06) 0%, transparent 65%)' }} aria-hidden="true" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-night/30 mb-4 block">Contact</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-night leading-[1.1]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Discutons de vos projets
          </h2>
          <div className="w-24 h-1 bg-night rounded-full mx-auto mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
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
              className="group relative bg-white p-7 rounded-2xl border border-night/10 hover:border-night/25 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ boxShadow: '0 8px 32px -8px rgba(15,27,61,0.12)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent blur-2xl" />
              </div>

              <div className="relative flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-night to-night-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-night/40 uppercase tracking-[0.2em] mb-1.5">{info.label}</p>
                  <p className="text-night text-base md:text-lg group-hover:text-night-light transition-colors" style={{ fontWeight: 500 }}>
                    {info.value}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-night/30 group-hover:text-night group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
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
            className="inline-flex items-center gap-3 px-10 py-5 bg-night text-white rounded-full hover:bg-night-light transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(15,27,61,0.30)] group"
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
