import { motion } from 'motion/react';
import { useInView } from './useInView';
import profileImage from '@/assets/profile/laura.jpg';

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section id="apropos" className="py-16 md:py-24 px-6 bg-[#FAFBFC] relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-[10%] right-[8%] w-[450px] h-[350px] rounded-full blur-[90px]" style={{ background: 'radial-gradient(ellipse, rgba(107,127,232,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[280px] rounded-full blur-[80px]" style={{ background: 'radial-gradient(ellipse, rgba(74,111,189,0.06) 0%, transparent 65%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#0A0E1A]/30 mb-3 block">À propos</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#0F1B3D] leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            Qui suis-je ?
          </h2>
        </motion.div>

        {/* Asymmetric layout */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          {/* Photo - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <div className="relative">
              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute -top-4 -left-4 w-32 h-32 border-2 border-[#0F1B3D]/15 rounded-3xl"
              />

              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 24px 60px -12px rgba(15,27,61,0.25)' }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={profileImage} alt="Laura Cerveaux" className="w-full h-full object-cover object-top scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B3D]/30 via-transparent to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-5 -right-5 px-5 py-3 bg-[#0F1B3D] text-white rounded-2xl text-sm tracking-wide"
                style={{ boxShadow: '0 12px 32px -8px rgba(15,27,61,0.40)', fontWeight: 600 }}
              >
                22 ans
              </motion.div>
            </div>
          </motion.div>

          {/* Text - takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 space-y-8"
          >
            <div className="space-y-5">
              <h3 className="text-2xl md:text-3xl text-[#0F1B3D] leading-[1.3]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                Laura Cerveaux
              </h3>

              <div className="w-16 h-1 bg-[#0F1B3D] rounded-full" />

              <p className="text-lg md:text-xl text-[#0F1B3D] leading-relaxed" style={{ fontWeight: 500 }}>
                Je ne fais pas que communiquer, je construis des expériences visuelles et sonores.
              </p>
            </div>

            <div className="space-y-4 text-[15px] leading-[1.8] text-[#2A3458]">
              <p>
                Je suis actuellement en BTS Communication en alternance. Ce parcours me sert de passerelle vers le son et l'image.
              </p>
              <p>
                J'y développe à la fois des compétences en communication et une sensibilité créative, à travers des projets réels menés en entreprise.
              </p>
              <p>
                Mon objectif est d'intégrer une licence professionnelle dans le domaine du son et de l'image, un univers plus proche de la musique et de la création.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="px-5 py-2.5 bg-[#0F1B3D]/[0.06] rounded-full text-sm text-[#0F1B3D] border border-[#0F1B3D]/10" style={{ fontWeight: 500 }}>
                BTS Communication
              </div>
              <div className="px-5 py-2.5 bg-[#0F1B3D]/[0.06] rounded-full text-sm text-[#0F1B3D] border border-[#0F1B3D]/10" style={{ fontWeight: 500 }}>
                Alternance
              </div>
              <div className="px-5 py-2.5 bg-[#0F1B3D]/[0.06] rounded-full text-sm text-[#0F1B3D] border border-[#0F1B3D]/10" style={{ fontWeight: 500 }}>
                Son & Image
              </div>
              <div className="px-5 py-2.5 bg-[#0F1B3D]/[0.06] rounded-full text-sm text-[#0F1B3D] border border-[#0F1B3D]/10" style={{ fontWeight: 500 }}>
                Création
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
