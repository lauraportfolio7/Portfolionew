import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Pause } from 'lucide-react'
import type { Track } from '@/types'

declare global {
  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement): SCWidget
        Events: {
          READY: string
          PLAY: string
          PAUSE: string
          FINISH: string
          PLAY_PROGRESS: string
        }
      }
    }
  }
}

interface SCWidget {
  bind: (event: string, callback: (data?: { currentPosition?: number; relativePosition?: number }) => void) => void
  unbind: (event: string) => void
  play: () => void
  pause: () => void
  seekTo: (ms: number) => void
  getDuration: (cb: (duration: number) => void) => void
}

const WIDGET_API_SRC = 'https://w.soundcloud.com/player/api.js'

function loadWidgetApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.SC?.Widget) return Promise.resolve()
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${WIDGET_API_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      if (window.SC?.Widget) resolve()
      return
    }
    const script = document.createElement('script')
    script.src = WIDGET_API_SRC
    script.async = true
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
}

function formatTime(ms: number) {
  if (!Number.isFinite(ms) || ms <= 0) return '—'
  const totalSec = Math.floor(ms / 1000)
  const mm = Math.floor(totalSec / 60)
  const ss = totalSec % 60
  return `${mm}:${String(ss).padStart(2, '0')}`
}

interface TrackListProps {
  tracks: Track[]
}

export function TrackList({ tracks }: TrackListProps) {
  const widgetsRef = useRef<(SCWidget | null)[]>([])
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([])
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [durations, setDurations] = useState<number[]>(() => tracks.map(() => 0))
  const [progress, setProgress] = useState<number[]>(() => tracks.map(() => 0))
  const [ready, setReady] = useState<boolean[]>(() => tracks.map(() => false))

  useEffect(() => {
    let cancelled = false
    loadWidgetApi().then(() => {
      if (cancelled) return
      iframeRefs.current.forEach((iframe, i) => {
        if (!iframe || !window.SC?.Widget) return
        const widget = window.SC.Widget(iframe)
        widgetsRef.current[i] = widget

        widget.bind(window.SC.Widget.Events.READY, () => {
          widget.getDuration((d) => {
            setDurations((prev) => {
              const next = [...prev]
              next[i] = d
              return next
            })
            setReady((prev) => {
              const next = [...prev]
              next[i] = true
              return next
            })
          })
        })
        widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
          if (data?.relativePosition === undefined) return
          setProgress((prev) => {
            const next = [...prev]
            next[i] = data.relativePosition!
            return next
          })
        })
        widget.bind(window.SC.Widget.Events.PLAY, () => {
          setActiveIdx(i)
          setIsPlaying(true)
        })
        widget.bind(window.SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false)
        })
        widget.bind(window.SC.Widget.Events.FINISH, () => {
          setIsPlaying(false)
          setProgress((prev) => {
            const next = [...prev]
            next[i] = 0
            return next
          })
        })
      })
    })

    return () => {
      cancelled = true
    }
  }, [])

  const togglePlay = (idx: number) => {
    const widget = widgetsRef.current[idx]
    if (!widget) return
    if (activeIdx === idx && isPlaying) {
      widget.pause()
      return
    }
    // pause others
    widgetsRef.current.forEach((w, i) => {
      if (w && i !== idx) w.pause()
    })
    widget.play()
  }

  return (
    <div className="relative">
      {/* Hidden iframes — controlled via SC Widget API */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {tracks.map((track, i) => (
          <iframe
            key={i}
            ref={(el) => {
              iframeRefs.current[i] = el
            }}
            src={track.soundcloudUrl}
            allow="autoplay"
            title={`SoundCloud — ${track.title}`}
            width="1"
            height="1"
            scrolling="no"
            frameBorder="0"
          />
        ))}
      </div>

      {/* Track list — Spotify minimal */}
      <div className="rounded-2xl overflow-hidden border border-accent/15 backdrop-blur-sm" style={{ background: 'rgba(26,21,11,0.55)' }}>
        {/* Header */}
        <div className="hidden md:grid grid-cols-[40px_44px_1fr_140px_60px] items-center gap-4 px-6 py-3 border-b border-accent/10 text-[10px] uppercase tracking-[0.3em] text-ivory-warm/35" style={{ fontWeight: 600 }}>
          <span className="text-right">#</span>
          <span />
          <span>Titre</span>
          <span>Catégorie</span>
          <span className="text-right">Durée</span>
        </div>

        {tracks.map((track, i) => {
          const isActive = activeIdx === i
          const playing = isActive && isPlaying
          const dur = durations[i]
          const prog = progress[i]
          const trackReady = ready[i]

          return (
            <motion.button
              key={i}
              onClick={() => togglePlay(i)}
              disabled={!trackReady}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative w-full grid grid-cols-[40px_44px_1fr_60px] md:grid-cols-[40px_44px_1fr_140px_60px] items-center gap-4 px-6 py-4 text-left transition-colors duration-300 border-b border-accent/[0.06] last:border-b-0 ${
                isActive ? 'bg-accent/[0.06]' : 'hover:bg-accent/[0.04]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              data-cursor="hover"
            >
              {/* Active indicator bar */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="track-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: 'linear-gradient(to bottom, #F5C957, #E5A823, #B07410)' }}
                  />
                )}
              </AnimatePresence>

              {/* Track number / equalizer */}
              <span className="text-right tabular-nums text-[12px] tracking-[0.15em] text-ivory-warm/40">
                {playing ? (
                  <span className="inline-flex items-end gap-[2px] h-3 justify-end">
                    {[0, 1, 2].map((bar) => (
                      <motion.span
                        key={bar}
                        className="w-[2px] bg-accent rounded-sm"
                        animate={{ height: ['30%', '100%', '30%'] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: bar * 0.15, ease: 'easeInOut' }}
                      />
                    ))}
                  </span>
                ) : (
                  String(i + 1).padStart(2, '0')
                )}
              </span>

              {/* Play / pause button */}
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-accent text-night'
                    : 'border border-accent/30 text-accent group-hover:border-accent group-hover:bg-accent/10'
                }`}
                style={isActive ? { boxShadow: '0 0 0 4px rgba(229,168,35,0.15)' } : undefined}
              >
                {playing ? (
                  <Pause className="w-3.5 h-3.5" fill="currentColor" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-[1.5px]" fill="currentColor" />
                )}
              </span>

              {/* Title */}
              <span className="min-w-0 truncate">
                <span
                  className={`block text-[15px] md:text-base truncate transition-colors ${
                    isActive ? 'text-accent' : 'text-ivory group-hover:text-accent'
                  }`}
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.005em' }}
                >
                  {track.title}
                </span>
              </span>

              {/* Category — desktop only */}
              <span className="hidden md:inline-block text-[11px] uppercase tracking-[0.2em] text-ivory-warm/45" style={{ fontWeight: 500 }}>
                {track.category ?? '—'}
              </span>

              {/* Duration */}
              <span className="text-right tabular-nums text-[12px] text-ivory-warm/55">
                {trackReady ? formatTime(dur) : '—'}
              </span>

              {/* Progress line at bottom of row when playing */}
              <span
                className="absolute left-0 right-0 bottom-0 h-[1.5px] origin-left pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, #F5C957, #E5A823)',
                  transform: `scaleX(${isActive ? prog : 0})`,
                  transformOrigin: '0 0',
                  transition: isActive ? 'transform 0.15s linear' : 'transform 0.4s ease-out',
                  opacity: isActive ? 1 : 0,
                }}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.3em] text-ivory-warm/35" style={{ fontWeight: 500 }}>
        {tracks.length} titre{tracks.length > 1 ? 's' : ''} · Lecteur SoundCloud intégré
      </p>
    </div>
  )
}
