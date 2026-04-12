import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['accueil', 'apropos', 'parcours', 'projets', 'musique', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#accueil', id: 'accueil', label: 'Accueil' },
    { href: '#apropos', id: 'apropos', label: 'À propos' },
    { href: '#parcours', id: 'parcours', label: 'Parcours' },
    { href: '#projets', id: 'projets', label: 'Projets' },
    { href: '#musique', id: 'musique', label: 'Musique' },
    { href: '#contact', id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
  };

  // Colors change based on scroll position (dark hero vs light content)
  const textBase = scrolled ? 'text-[#0F1B3D]' : 'text-white';
  const textMuted = scrolled ? 'text-[#0F1B3D]/45' : 'text-white/50';
  const textHover = scrolled ? 'hover:text-[#0F1B3D]' : 'hover:text-white';
  const dotColor = scrolled ? 'bg-[#0F1B3D]' : 'bg-white';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          scrolled
            ? 'bg-[#FAFBFC]/90 backdrop-blur-lg border-b border-[#0F1B3D]/[0.08]'
            : 'bg-transparent'
        }`}
        style={{
          maskImage: scrolled ? 'linear-gradient(to bottom, black 85%, transparent 100%)' : 'none',
          WebkitMaskImage: scrolled ? 'linear-gradient(to bottom, black 85%, transparent 100%)' : 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => scrollTo(e, '#accueil')}
            className={`text-[1.25rem] tracking-tight transition-colors duration-500 shrink-0 relative z-10 ${textBase} ${textHover}`}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            Laura C.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-12">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`text-[11px] uppercase tracking-[0.15em] transition-all duration-300 relative py-2 whitespace-nowrap ${
                    isActive ? textBase : `${textMuted} ${textHover}`
                  }`}
                  style={{ fontWeight: isActive ? 600 : 500 }}
                >
                  {item.label}
                  <motion.span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${dotColor}`}
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 0.7 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden ml-auto transition-colors duration-500 relative z-10 p-2 ${
              scrolled
                ? 'text-[#0F1B3D]/60 hover:text-[#0F1B3D]'
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden pb-6 pt-2 backdrop-blur-xl rounded-b-2xl -mx-4 px-6 border-b ${
              scrolled
                ? 'bg-[#FAFBFC]/98 border-[#0F1B3D]/[0.08]'
                : 'bg-[#0F1B3D]/98 border-white/[0.10]'
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`flex items-center gap-3 py-3.5 text-[12px] uppercase tracking-[0.15em] transition-colors border-b last:border-0 ${
                    scrolled
                      ? `border-[#0F1B3D]/[0.05] ${isActive ? 'text-[#0F1B3D]' : 'text-[#0F1B3D]/50 hover:text-[#0F1B3D]/80'}`
                      : `border-white/[0.08] ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}`
                  }`}
                  style={{ fontWeight: isActive ? 600 : 500 }}
                >
                  {isActive && (
                    <div className={`w-1.5 h-1.5 rounded-full ${scrolled ? 'bg-[#0F1B3D]/60' : 'bg-white/60'}`} />
                  )}
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
