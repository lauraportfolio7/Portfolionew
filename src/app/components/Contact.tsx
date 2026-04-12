import { motion } from 'motion/react';
import { useInView } from './useInView';
import { Mail, Phone, ArrowRight } from 'lucide-react';

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'cerveauxlaura5@gmail.com', link: 'mailto:cerveauxlaura5@gmail.com' },
    { icon: Phone, label: 'Téléphone', value: '06 93 54 37 57', link: 'tel:+33693543757' },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-gradient-to-b from-[#FAFBFC] to-[#F5F7FA] relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[320px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(ellipse, rgba(107,127,232,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[15%] left-[8%] w-[350px] h-[280px] rounded-full blur-[90px]" style={{ background: 'radial-gradient(ellipse, rgba(74,111,189,0.06) 0%, transparent 65%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#0A0E1A]/30 mb-4 block">Contact</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-[#0F1B3D] leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            Discutons de vos projets
          </h2>
          <div className="w-24 h-1 bg-[#0F1B3D] rounded-full mx-auto mb-6" />
          <p className="text-lg md:text-xl text-[#2A3458] max-w-2xl mx-auto leading-relaxed">
            Vous avez un projet en tête ? N'hésitez pas à me contacter.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white p-7 rounded-2xl border border-[#0F1B3D]/10 hover:border-[#0F1B3D]/25 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ boxShadow: '0 8px 32px -8px rgba(15,27,61,0.12)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#6B7FE8]/10 to-transparent blur-2xl" />
              </div>

              <div className="relative flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F1B3D] to-[#1A2B52] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#0A0E1A]/40 uppercase tracking-[0.2em] mb-1.5">{info.label}</p>
                  <p className="text-[#0F1B3D] text-base md:text-lg group-hover:text-[#1A2B52] transition-colors" style={{ fontWeight: 500 }}>
                    {info.value}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#0F1B3D]/30 group-hover:text-[#0F1B3D] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="mailto:cerveauxlaura5@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#0F1B3D] text-white rounded-full hover:bg-[#1A2B52] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(15,27,61,0.30)] group"
          >
            <span className="text-[17px] tracking-wide" style={{ fontWeight: 600 }}>Travaillons ensemble</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
