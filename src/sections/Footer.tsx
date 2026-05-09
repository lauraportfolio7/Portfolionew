import { Heart } from 'lucide-react'
import { motion } from 'motion/react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-night-secondary text-white/80">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <p className="text-xl mb-0.5 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                C.L
              </p>
              <p className="text-[10px] text-white/35 tracking-[0.2em] uppercase">
                BTS Communication &bull; Alternance
              </p>
            </div>

            <div className="flex items-end gap-[2px]" aria-hidden="true">
              {[2, 4, 3, 8, 5, 12, 6, 14, 6, 10, 4, 7, 3, 5, 8, 4, 12, 5, 10, 4, 6, 3, 4, 2].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[1.5px] rounded-full bg-white/[0.12]"
                  initial={{ height: 0 }}
                  whileInView={{ height: h }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-white/35">
              <span>Créé avec</span>
              <Heart className="w-3 h-3 text-white/50 fill-white/50" />
              <span>&bull; {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.05] text-center">
            <p className="text-[10px] text-white/20 tracking-[0.15em] uppercase">
              &copy; {new Date().getFullYear()} Cerveaux Laura. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
