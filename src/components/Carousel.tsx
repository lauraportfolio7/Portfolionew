import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  children: React.ReactNode
  autoplay?: boolean
  loop?: boolean
  className?: string
}

export function Carousel({ children, autoplay = true, loop = true, className = '' }: CarouselProps) {
  const plugins = autoplay ? [Autoplay({ delay: 5000, stopOnInteraction: true })] : []

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: 'center' }, plugins)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className={`relative ${className}`}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex items-stretch">{children}</div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev && !loop}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 border border-night/5 disabled:opacity-30"
        aria-label="Projet précédent"
      >
        <ChevronLeft className="w-5 h-5 text-night" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext && !loop}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 border border-night/5 disabled:opacity-30"
        aria-label="Projet suivant"
      >
        <ChevronRight className="w-5 h-5 text-night" />
      </button>

      {/* Dots */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-8 bg-night' : 'w-2 bg-night/20 hover:bg-night/40'
              }`}
              aria-label={`Aller au projet ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CarouselSlideProps {
  children: React.ReactNode
  className?: string
}

export function CarouselSlide({ children, className = '' }: CarouselSlideProps) {
  return (
    <div className={`flex-[0_0_85%] md:flex-[0_0_70%] min-w-0 px-3 flex ${className}`}>
      <div className="w-full">{children}</div>
    </div>
  )
}
