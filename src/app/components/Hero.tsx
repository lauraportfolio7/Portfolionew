import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(74,111,189,0.15) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(107,127,232,0.12) 0%, transparent 70%)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-[40%] right-[25%] w-[250px] h-[250px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,74,143,0.1) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}

function FloatingBars() {
  const barGroups = [
    { left: '8%', heights: [18, 28, 14, 22, 10], delay: 0 },
    { left: '22%', heights: [12, 20, 30, 16, 24], delay: 0.3 },
    { left: '55%', heights: [16, 26, 12, 22, 18], delay: 0.15 },
    { left: '70%', heights: [20, 14, 26, 18, 30], delay: 0.45 },
    { left: '92%', heights: [10, 18, 24, 14, 20], delay: 0.9 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {barGroups.map((group, gi) => (
        <div key={gi} className="absolute bottom-[20%] flex items-end gap-[2px]" style={{ left: group.left }}>
          {group.heights.map((h, bi) => (
            <motion.div
              key={bi}
              className="w-[1.5px] rounded-full bg-white"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: [0, h, h * 0.4, h * 0.8, h * 0.3, h * 0.6, 0],
                opacity: [0, 0.08, 0.04, 0.08, 0.03, 0.05, 0],
              }}
              transition={{ duration: 6, delay: group.delay + bi * 0.15, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function AnimatedWaves() {
  return (
    <svg className="absolute top-1/2 left-0 right-0 w-full h-56 -translate-y-1/2 pointer-events-none" viewBox="0 0 1440 240" preserveAspectRatio="none">
      <motion.path
        d="M0 120 Q60 50 120 120 Q180 190 240 120 Q300 50 360 120 Q420 190 480 120 Q540 50 600 120 Q660 190 720 120 Q780 50 840 120 Q900 190 960 120 Q1020 50 1080 120 Q1140 190 1200 120 Q1260 50 1320 120 Q1380 190 1440 120"
        stroke="white" strokeWidth="2" fill="none" opacity="0.06"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.06 }}
        transition={{ duration: 3, ease: 'easeOut', delay: 0.5 }}
      />
      <motion.path
        d="M0 120 Q80 65 160 120 Q240 175 320 120 Q400 65 480 120 Q560 175 640 120 Q720 65 800 120 Q880 175 960 120 Q1040 65 1120 120 Q1200 175 1280 120 Q1360 65 1440 120"
        stroke="#6B7FE8" strokeWidth="1.5" fill="none" opacity="0.08"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.08 }}
        transition={{ duration: 3.5, ease: 'easeOut', delay: 0.8 }}
      />
      <motion.path
        d="M0 120 Q100 80 200 120 Q300 160 400 120 Q500 80 600 120 Q700 160 800 120 Q900 80 1000 120 Q1100 160 1200 120 Q1300 80 1400 120"
        stroke="#4A6FBD" strokeWidth="1" fill="none" opacity="0.05"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.05 }}
        transition={{ duration: 4, ease: 'easeOut', delay: 1.1 }}
      />
    </svg>
  );
}

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const scrollToProjects = () => {
    const el = document.querySelector('#projets');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative overflow-hidden">
      {/* Deep blue background */}
      <div className="absolute inset-0 bg-[#0F1B3D]" />

      {/* Animated orbs */}
      <FloatingOrbs />

      {/* Mouse follow glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-[2500ms] ease-out pointer-events-none"
        style={{
          left: `calc(${mousePos.x * 100}% - 300px)`,
          top: `calc(${mousePos.y * 100}% - 300px)`,
          background: 'radial-gradient(circle, rgba(107,127,232,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Animated waves */}
      <AnimatedWaves />

      <FloatingBars />

      {/* Content */}
      <div className="min-h-[92vh] flex items-center justify-center relative z-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-2.5 border border-white/12 rounded-full bg-white/[0.05] backdrop-blur-sm">
              <div className="flex items-end gap-[1px]">
                {[3, 6, 4, 8, 5, 7, 3].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[1.5px] bg-white/40 rounded-full"
                    animate={{ height: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.3] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-[0.35em] text-white/60">BTS Communication &bull; Alternance</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-[6.5rem] tracking-tight mb-8 text-white leading-[0.95]"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            <span className="block">Laura</span>
            <span className="block">Cerveaux</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-white/80 mb-10 tracking-wide leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Créer, raconter, faire ressentir
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <div className="flex items-end gap-[2px]">
              {[3, 7, 5, 14, 7, 18, 9, 22, 9, 16, 6, 12, 4, 8, 14, 6, 20, 8, 15, 7, 10, 5, 7, 3].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[2px] rounded-full bg-white"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: h, opacity: 0.25 }}
                  transition={{ duration: 0.4, delay: 1 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0F1B3D] rounded-full hover:bg-white/95 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
          >
            <span className="text-[15px] tracking-wide" style={{ fontWeight: 600 }}>Voir mes projets</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-[12px] text-white/40 tracking-[0.3em] uppercase mt-8"
          >
            Communication &bull; Son &bull; Image &bull; Création
          </motion.p>
        </div>
      </div>

      {/* Gradient transition to light content */}
      <div className="h-20 bg-gradient-to-b from-[#0F1B3D] to-[#FAFBFC] relative z-10" />
    </section>
  );
}
