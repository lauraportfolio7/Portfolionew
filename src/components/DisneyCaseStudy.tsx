import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ExternalLink,
  Images,
  Quote,
  Sparkles,
  Lightbulb,
  ArrowRight,
} from 'lucide-react'
import type { DisneyCaseStudy as DisneyCaseStudyData } from '@/types'

/* ===========================================================================
   Disney 100 — Vice-Versa : étude de cas (recommandation stratégique).
   Tout le contenu vit dans project.disneyCase ; ce composant le met en page
   sur 14 sections, dans l'univers coloré de Vice-Versa, façon dossier de jury.
   ======================================================================== */

/* Palette « émotions » de Vice-Versa, pour ponctuer les sections de couleur. */
const NAVY = '#16204D'
const JOY = '#F6C544' // Joie — jaune
const SAD = '#5AA9E6' // Tristesse — bleu
const FEAR = '#A78BD0' // Peur — violet
const DISGUST = '#7FC29B' // Dégoût — vert
const ANGER = '#E8694A' // Colère — corail/rouge

/* En-tête de section : pastille numérotée + titre + intro. */
function SectionHeader({
  n,
  label,
  title,
  intro,
  color = ANGER,
}: {
  n: number
  label?: string
  title: string
  intro?: string
  color?: string
}) {
  return (
    <div className="mb-6">
      {label && (
        <span
          className="inline-block text-[10px] uppercase tracking-[0.32em] mb-3 px-3 py-1 rounded-full"
          style={{ color, background: `${color}1A`, fontWeight: 700 }}
        >
          {label}
        </span>
      )}
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm tabular-nums text-white shadow-sm"
          style={{ background: color, fontWeight: 700 }}
        >
          {n}
        </span>
        <div>
          <h3 className="text-2xl md:text-[26px] text-night leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            {title}
          </h3>
        </div>
      </div>
      {intro && <p className="text-text-muted leading-relaxed mt-3 w-full">{intro}</p>}
    </div>
  )
}

/* Carte simple emoji + titre + texte. */
function IconCard({
  icon,
  title,
  text,
  color = ANGER,
}: {
  icon: string
  title: string
  text?: string
  color?: string
}) {
  return (
    <div
      className="bg-white rounded-2xl p-5 border border-night/5 shadow-[0_2px_18px_-10px_rgba(22,32,77,0.25)] h-full"
      style={{ borderTopColor: color, borderTopWidth: 3 }}
    >
      <div className="text-3xl mb-3 leading-none" aria-hidden="true">{icon}</div>
      <h4 className="text-night mb-1.5 leading-snug" style={{ fontWeight: 700 }}>{title}</h4>
      {text && <p className="text-sm text-text-muted leading-relaxed">{text}</p>}
    </div>
  )
}

/* Carte « étude » : emoji + titre + source + points. */
function StudyCard({
  icon,
  title,
  source,
  points,
  color = SAD,
}: {
  icon: string
  title: string
  source?: string
  points: string[]
  color?: string
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-night/5 shadow-[0_2px_18px_-10px_rgba(22,32,77,0.25)] h-full">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `${color}1A` }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <div>
          <h4 className="text-night leading-tight" style={{ fontWeight: 700 }}>{title}</h4>
          {source && (
            <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color, fontWeight: 600 }}>
              {source}
            </span>
          )}
        </div>
      </div>
      <ul className="space-y-1.5">
        {points.map((p, i) => (
          <li key={i} className="text-sm text-text-muted leading-relaxed flex gap-2">
            <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Disclaimer « recommandation, non produite ». */
function Disclaimer({ text, color = JOY }: { text: string; color?: string }) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-xl px-4 py-3 mb-5 text-sm"
      style={{ background: `${color}1F`, color: NAVY }}
    >
      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
      <span className="leading-snug" style={{ fontWeight: 500 }}>{text}</span>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Diaporama (images pré-rendues) : une slide visible, navigation + plein écran.
   ------------------------------------------------------------------------- */
function SlideShow({ pages, ratio = 16 / 9 }: { pages: string[]; ratio?: number }) {
  const [index, setIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const total = pages.length

  const go = useCallback(
    (dir: number) => setIndex((i) => Math.min(total - 1, Math.max(0, i + dir))),
    [total],
  )

  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen, go])

  if (total === 0) return null

  const Stage = ({ dark }: { dark?: boolean }) => (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${dark ? '' : 'shadow-[0_8px_40px_-12px_rgba(22,32,77,0.5)]'}`}
      style={{ aspectRatio: String(ratio), background: NAVY }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={pages[index]}
          alt={`Diapositive ${index + 1} sur ${total}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
          loading="lazy"
        />
      </AnimatePresence>

      {/* Flèches */}
      {index > 0 && (
        <button
          onClick={() => go(-1)}
          aria-label="Diapositive précédente"
          data-cursor="hover"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-night flex items-center justify-center shadow-md transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {index < total - 1 && (
        <button
          onClick={() => go(1)}
          aria-label="Diapositive suivante"
          data-cursor="hover"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-night flex items-center justify-center shadow-md transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Compteur + plein écran */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="px-3 py-1 rounded-full bg-black/45 text-white text-xs tabular-nums backdrop-blur-sm">
          {index + 1} / {total}
        </span>
      </div>
      {!dark && (
        <button
          onClick={() => setFullscreen(true)}
          aria-label="Plein écran"
          title="Plein écran"
          data-cursor="hover"
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  )

  return (
    <div>
      <Stage />

      {/* Pellicule de vignettes */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {pages.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
            data-cursor="hover"
            className={`shrink-0 w-24 rounded-lg overflow-hidden border-2 transition-all ${
              i === index ? 'opacity-100' : 'opacity-55 hover:opacity-90'
            }`}
            style={{ aspectRatio: String(ratio), borderColor: i === index ? ANGER : 'transparent', background: NAVY }}
          >
            <img src={src} alt="" loading="lazy" draggable={false} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setFullscreen(false)}
          >
            <button
              onClick={() => setFullscreen(false)}
              aria-label="Fermer"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Stage dark />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Galerie modale (questionnaire) : grille de miniatures → lightbox zoom + nav.
   ------------------------------------------------------------------------- */
function ImageLightbox({
  images,
  start,
  onClose,
}: {
  images: string[]
  start: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(start)
  const total = images.length
  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative flex items-center justify-center w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => go(-1)}
          aria-label="Réponse précédente"
          className="absolute left-0 -ml-2 md:-ml-14 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Réponse ${index + 1} sur ${total}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="max-h-[80vh] w-auto max-w-full rounded-lg shadow-2xl object-contain bg-white"
            draggable={false}
          />
        </AnimatePresence>
        <button
          onClick={() => go(1)}
          aria-label="Réponse suivante"
          className="absolute right-0 -mr-2 md:-mr-14 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <span className="mt-4 px-3 py-1 rounded-full bg-white/10 text-white text-xs tabular-nums">
        {index + 1} / {total}
      </span>
    </motion.div>
  )
}

/* Animation d'apparition partagée. */
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

export function DisneyCaseStudy({ data }: { data: DisneyCaseStudyData }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const {
    context,
    brief,
    grandRex,
    problematic,
    audience,
    role,
    research,
    whyViceVersa,
    strategy,
    solutions,
    innovations,
    kpi,
    slideshow,
    bilan,
  } = data

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Contexte */}
      <motion.section {...reveal}>
        <SectionHeader n={1} title={context.title} intro={context.intro} color={JOY} />
        <div className="bg-ivory-warm/50 p-6 md:p-8 rounded-2xl border border-night/5">
          <p className="text-lg text-text-muted leading-relaxed w-full">{context.text}</p>
        </div>
      </motion.section>

      {/* 2. Brief */}
      <motion.section {...reveal}>
        <SectionHeader n={2} title={brief.title} intro={brief.intro} color={SAD} />
        <div className="grid sm:grid-cols-2 gap-3">
          {brief.points.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white rounded-xl p-4 border border-night/5 shadow-[0_2px_14px_-10px_rgba(22,32,77,0.3)]"
            >
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs text-white tabular-nums"
                style={{ background: SAD, fontWeight: 700 }}
              >
                {i + 1}
              </span>
              <span className="text-night/85 leading-snug text-sm">{p}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Pourquoi le Grand Rex */}
      <motion.section {...reveal}>
        <SectionHeader n={3} title={grandRex.title} intro={grandRex.intro} color={ANGER} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {grandRex.cards.map((c, i) => (
            <IconCard key={i} icon={c.icon} title={c.title} text={c.text} color={ANGER} />
          ))}
        </div>
        <p
          className="mt-5 rounded-2xl px-5 py-4 text-night leading-relaxed"
          style={{ background: `${ANGER}14`, borderLeft: `4px solid ${ANGER}` }}
        >
          {grandRex.conclusion}
        </p>
      </motion.section>

      {/* 4. Problématique */}
      <motion.section {...reveal}>
        <SectionHeader n={4} title={problematic.title} color={FEAR} />
        <div
          className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2A2160 100%)` }}
        >
          <Quote className="absolute top-4 right-5 w-16 h-16 opacity-10 text-white" />
          <p className="text-lg md:text-xl text-white leading-relaxed italic relative z-10" style={{ fontFamily: 'var(--font-serif)' }}>
            {problematic.statement}
          </p>
        </div>
      </motion.section>

      {/* 5. Cible & Persona */}
      <motion.section {...reveal}>
        <SectionHeader n={5} title={audience.title} intro={audience.intro} color={DISGUST} />
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {audience.segments.map((s, i) => (
            <IconCard key={i} icon={s.icon} title={s.title} text={s.text} color={DISGUST} />
          ))}
        </div>

        {/* Fiche persona */}
        <div className="rounded-2xl overflow-hidden border border-night/5 shadow-[0_4px_28px_-14px_rgba(22,32,77,0.4)]">
          <div className="grid md:grid-cols-[260px_1fr]">
            <div
              className="p-6 flex flex-col justify-center text-white"
              style={{ background: `linear-gradient(160deg, ${FEAR} 0%, ${SAD} 100%)` }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-80 mb-2" style={{ fontWeight: 700 }}>
                Persona
              </span>
              <h4 className="text-3xl leading-none mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                {audience.persona.name}
              </h4>
              <p className="text-sm opacity-90">{audience.persona.age}</p>
              <p className="text-sm opacity-90 mb-4">{audience.persona.role}</p>
              {audience.persona.quote && (
                <p className="text-sm italic leading-snug border-l-2 border-white/40 pl-3">
                  « {audience.persona.quote} »
                </p>
              )}
            </div>
            <div className="bg-white p-6">
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-5">
                {audience.persona.traits.map((t, i) => (
                  <div key={i}>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-text-muted/70" style={{ fontWeight: 700 }}>
                      {t.label}
                    </span>
                    <span className="text-night text-sm" style={{ fontWeight: 500 }}>{t.value}</span>
                  </div>
                ))}
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-text-muted/70 mb-2" style={{ fontWeight: 700 }}>
                Centres d'intérêt
              </span>
              <div className="flex flex-wrap gap-2">
                {audience.persona.interests.map((it, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: `${FEAR}18`, color: NAVY, fontWeight: 500 }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pourquoi ce persona ? */}
          <div className="bg-ivory-warm/60 border-t border-night/5 p-6">
            <h5 className="text-night mb-3 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <Sparkles className="w-4 h-4" style={{ color: DISGUST }} />
              Pourquoi ce persona ?
            </h5>
            <ul className="space-y-2">
              {audience.persona.why.map((w, i) => (
                <li key={i} className="text-sm text-text-muted leading-relaxed flex gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: DISGUST }} />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* 6. Mon rôle */}
      <motion.section {...reveal}>
        <SectionHeader n={6} title={role.title} intro={role.intro} color={JOY} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {role.cards.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-night/5 shadow-[0_2px_14px_-10px_rgba(22,32,77,0.3)] flex flex-col items-center text-center gap-2"
            >
              <span className="text-2xl leading-none" aria-hidden="true">{c.icon}</span>
              <span className="text-night text-sm leading-snug" style={{ fontWeight: 600 }}>{c.title}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 7. Activité 1 — Veille et études */}
      <motion.section {...reveal}>
        <SectionHeader
          n={7}
          label="Activité 1 · Veille et études"
          title={research.title}
          intro={research.intro}
          color={SAD}
        />

        {/* Disney */}
        <h4 className="text-night mb-3 mt-2" style={{ fontWeight: 700 }}>La marque Disney</h4>
        <div className="mb-6">
          <StudyCard {...research.disney} color={JOY} />
        </div>

        {/* Concurrents */}
        <h4 className="text-night mb-3" style={{ fontWeight: 700 }}>Les studios concurrents</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {research.competitors.map((c, i) => (
            <StudyCard key={i} {...c} color={FEAR} />
          ))}
        </div>

        {/* Études quantitatives */}
        <h4 className="text-night mb-3" style={{ fontWeight: 700 }}>Les études quantitatives</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {research.quantitative.map((c, i) => (
            <StudyCard key={i} {...c} color={SAD} />
          ))}
        </div>

        {/* Questionnaire exploratoire */}
        <div
          className="rounded-2xl p-6 md:p-7 border"
          style={{ background: `${ANGER}0D`, borderColor: `${ANGER}33` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">🎤</span>
            <h4 className="text-night text-lg" style={{ fontWeight: 700 }}>{research.questionnaire.title}</h4>
          </div>
          <p className="text-text-muted leading-relaxed mb-4 w-full">{research.questionnaire.intro}</p>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-text-muted/70 mb-2" style={{ fontWeight: 700 }}>
            Principaux enseignements
          </span>
          <ul className="space-y-2 mb-5">
            {research.questionnaire.learnings.map((l, i) => (
              <li key={i} className="text-night/85 leading-relaxed flex gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ANGER }} />
                <span>{l}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setLightbox(0)}
            data-cursor="hover"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-white transition-transform hover:-translate-y-0.5"
            style={{ background: ANGER }}
          >
            <Images className="w-4 h-4" />
            <span style={{ fontWeight: 600 }}>{research.questionnaire.galleryLabel}</span>
            <span className="text-xs opacity-80 tabular-nums">({research.questionnaire.images.length})</span>
          </button>
        </div>
      </motion.section>

      {/* 8. Pourquoi Vice-Versa */}
      <motion.section {...reveal}>
        <SectionHeader n={8} title={whyViceVersa.title} intro={whyViceVersa.intro} color={JOY} />
        <div className="grid sm:grid-cols-2 gap-4">
          {whyViceVersa.reasons.map((r, i) => (
            <IconCard key={i} icon={r.icon} title={r.title} text={r.text} color={JOY} />
          ))}
        </div>
        <p
          className="mt-5 rounded-2xl px-5 py-4 text-night leading-relaxed"
          style={{ background: `${JOY}24`, borderLeft: `4px solid ${JOY}` }}
        >
          {whyViceVersa.conclusion}
        </p>
      </motion.section>

      {/* 9. Activité 2 — Création de la stratégie */}
      <motion.section {...reveal}>
        <SectionHeader
          n={9}
          label="Activité 2 · Création de la stratégie"
          title={strategy.title}
          intro={strategy.intro}
          color={DISGUST}
        />
        <div className="space-y-3">
          {strategy.mapping.map((m, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch gap-3"
            >
              <div className="bg-white rounded-xl p-4 border border-night/5 flex items-center gap-3">
                {m.icon && <span className="text-2xl shrink-0" aria-hidden="true">{m.icon}</span>}
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-text-muted/70" style={{ fontWeight: 700 }}>
                    Enseignement
                  </span>
                  <span className="text-night text-sm leading-snug" style={{ fontWeight: 500 }}>{m.insight}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center">
                <ArrowRight className="w-5 h-5" style={{ color: DISGUST }} />
              </div>
              <div
                className="rounded-xl p-4 flex items-center gap-2"
                style={{ background: `${DISGUST}14`, border: `1px solid ${DISGUST}33` }}
              >
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em]" style={{ color: DISGUST, fontWeight: 700 }}>
                    Solution
                  </span>
                  <span className="text-night text-sm leading-snug" style={{ fontWeight: 600 }}>{m.solution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 10. Solutions recommandées */}
      <motion.section {...reveal}>
        <SectionHeader n={10} title={solutions.title} intro={solutions.intro} color={ANGER} />
        <Disclaimer text={solutions.disclaimer} color={JOY} />
        <div className="grid sm:grid-cols-3 gap-4">
          {solutions.cards.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-night/5 shadow-[0_2px_18px_-10px_rgba(22,32,77,0.25)] h-full"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl leading-none" aria-hidden="true">{c.icon}</span>
                {c.tag && (
                  <span
                    className="text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                    style={{ background: `${ANGER}1A`, color: ANGER, fontWeight: 700 }}
                  >
                    {c.tag}
                  </span>
                )}
              </div>
              <h4 className="text-night mb-1.5 leading-snug" style={{ fontWeight: 700 }}>{c.title}</h4>
              <p className="text-sm text-text-muted leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 11. Innovations proposées */}
      <motion.section {...reveal}>
        <SectionHeader n={11} title={innovations.title} intro={innovations.intro} color={FEAR} />
        <Disclaimer text={innovations.disclaimer} color={FEAR} />
        <div className="grid md:grid-cols-2 gap-5">
          {innovations.cards.map((c, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-6 text-white overflow-hidden shadow-[0_8px_36px_-16px_rgba(22,32,77,0.7)]"
              style={{ background: `linear-gradient(150deg, ${NAVY} 0%, ${i % 2 === 0 ? FEAR : ANGER} 160%)` }}
            >
              <div className="absolute -top-8 -right-6 text-[120px] opacity-10 leading-none select-none" aria-hidden="true">
                {c.icon}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl leading-none" aria-hidden="true">{c.icon}</span>
                  {c.tag && (
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/15" style={{ fontWeight: 700 }}>
                      {c.tag}
                    </span>
                  )}
                </div>
                <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}>{c.title}</h4>
                <p className="text-sm text-white/85 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 12. Activité 5 — Évaluation et KPI */}
      <motion.section {...reveal}>
        <SectionHeader
          n={12}
          label="Activité 5 · Évaluation et KPI"
          title={kpi.title}
          intro={kpi.intro}
          color={SAD}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpi.cards.map((c, i) => (
            <IconCard key={i} icon={c.icon} title={c.title} text={c.text} color={SAD} />
          ))}
        </div>
      </motion.section>

      {/* 13. Présentation du diaporama */}
      <motion.section {...reveal}>
        <SectionHeader n={13} title={slideshow.title} intro={slideshow.intro} color={JOY} />
        <SlideShow pages={slideshow.pages} />
        <div className="flex justify-center mt-5">
          <a
            href={slideshow.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-white transition-transform hover:-translate-y-0.5 shadow-[0_8px_28px_-12px_rgba(22,32,77,0.7)]"
            style={{ background: NAVY }}
          >
            <Images className="w-5 h-5" />
            <span style={{ fontFamily: 'var(--font-serif)' }}>{slideshow.pdfLabel}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.section>

      {/* 14. Bilan */}
      <motion.section {...reveal}>
        <SectionHeader n={14} title={bilan.title} color={ANGER} />
        <div
          className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #3A2A66 100%)` }}
        >
          <Sparkles className="absolute top-5 right-6 w-10 h-10 opacity-20" />
          <p className="text-lg leading-relaxed relative z-10 w-full">{bilan.text}</p>
        </div>
      </motion.section>

      {/* Lightbox questionnaire */}
      <AnimatePresence>
        {lightbox !== null && (
          <ImageLightbox
            images={research.questionnaire.images}
            start={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
