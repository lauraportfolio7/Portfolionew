import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

interface FlipbookViewerProps {
  pdfUrl: string
  title?: string
}

export function FlipbookViewer({ pdfUrl, title }: FlipbookViewerProps) {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null)
  const rightCanvasRef = useRef<HTMLCanvasElement>(null)
  const fsLeftCanvasRef = useRef<HTMLCanvasElement>(null)
  const fsRightCanvasRef = useRef<HTMLCanvasElement>(null)
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [spread, setSpread] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const getSpreads = useCallback(() => {
    if (!totalPages) return 0
    return Math.ceil((totalPages + 1) / 2)
  }, [totalPages])

  const getSpreadPages = useCallback((spreadIdx: number): [number | null, number | null] => {
    if (spreadIdx === 0) return [null, 1]
    const left = spreadIdx * 2
    const right = left + 1
    return [
      left <= totalPages ? left : null,
      right <= totalPages ? right : null,
    ]
  }, [totalPages])

  useEffect(() => {
    setSpread(0)
    setPdfDoc(null)
    setTotalPages(0)
    pdfjsLib.getDocument(pdfUrl).promise.then((doc) => {
      setPdfDoc(doc)
      setTotalPages(doc.numPages)
    })
  }, [pdfUrl])

  const renderPage = useCallback(async (canvas: HTMLCanvasElement | null, pageNum: number | null, maxHeight: number) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    if (!pdfDoc || !pageNum) {
      canvas.width = 0
      canvas.height = 0
      canvas.style.width = '0px'
      canvas.style.height = '0px'
      return
    }
    const page = await pdfDoc.getPage(pageNum)
    const viewport = page.getViewport({ scale: 1 })
    const dpr = window.devicePixelRatio || 1
    const scale = (maxHeight / viewport.height) * dpr
    const scaled = page.getViewport({ scale })
    canvas.width = scaled.width
    canvas.height = scaled.height
    canvas.style.width = `${scaled.width / dpr}px`
    canvas.style.height = `${scaled.height / dpr}px`
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: ctx, viewport: scaled } as any).promise
  }, [pdfDoc])

  useEffect(() => {
    if (!pdfDoc) return
    const [left, right] = getSpreadPages(spread)
    renderPage(leftCanvasRef.current, left, 400)
    renderPage(rightCanvasRef.current, right, 400)
  }, [pdfDoc, spread, renderPage, getSpreadPages])

  useEffect(() => {
    if (!pdfDoc || !fullscreen) return
    const [left, right] = getSpreadPages(spread)
    const h = Math.min(window.innerHeight * 0.75, 700)
    renderPage(fsLeftCanvasRef.current, left, h)
    renderPage(fsRightCanvasRef.current, right, h)
  }, [pdfDoc, spread, fullscreen, renderPage, getSpreadPages])

  useEffect(() => {
    if (!fullscreen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setSpread((s) => Math.min(s + 1, getSpreads() - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setSpread((s) => Math.max(s - 1, 0))
      else if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [fullscreen, getSpreads])

  if (!totalPages) return null

  const maxSpread = getSpreads() - 1
  const [leftPage, rightPage] = getSpreadPages(spread)

  const SpreadView = ({ leftRef, rightRef, shadow }: { leftRef: React.RefObject<HTMLCanvasElement | null>; rightRef: React.RefObject<HTMLCanvasElement | null>; shadow: boolean }) => (
    <div className="flex items-stretch justify-center" style={shadow ? { filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.2))' } : {}}>
      {leftPage !== null && (
        <div className="relative">
          <canvas ref={leftRef} style={{ display: 'block', borderRadius: '4px 0 0 4px' }} />
          <div className="absolute right-0 top-0 bottom-0 w-[6px] pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.12), rgba(0,0,0,0.03))' }} aria-hidden="true" />
        </div>
      )}
      {rightPage !== null && (
        <div className="relative">
          <canvas ref={rightRef} style={{ display: 'block', borderRadius: leftPage ? '0 4px 4px 0' : '4px' }} />
          <div className="absolute left-0 top-0 bottom-0 w-[6px] pointer-events-none" style={{ background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.08), rgba(0,0,0,0.02))' }} aria-hidden="true" />
        </div>
      )}
    </div>
  )

  return (
    <>
      <div className="mt-8">
        {title && (
          <h3 className="text-xl mb-4 text-night-secondary text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            {title}
          </h3>
        )}
        <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-night-secondary/10 bg-[#e8e4e0] relative">
          <div className="flex items-center justify-center p-6 min-h-[300px]">
            <SpreadView leftRef={leftCanvasRef} rightRef={rightCanvasRef} shadow />
          </div>

          <div className="flex items-center justify-center gap-4 pb-4">
            <button onClick={() => setSpread((s) => Math.max(s - 1, 0))} disabled={spread === 0} className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-night-secondary hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-night-secondary/60 tabular-nums">
              {leftPage && rightPage ? `${leftPage}–${rightPage}` : leftPage || rightPage} / {totalPages}
            </span>
            <button onClick={() => setSpread((s) => Math.min(s + 1, maxSpread))} disabled={spread === maxSpread} className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-night-secondary hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => setFullscreen(true)} className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-night-secondary hover:text-white transition-colors ml-2" title="Plein écran">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setFullscreen(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-6">
              <SpreadView leftRef={fsLeftCanvasRef} rightRef={fsRightCanvasRef} shadow={false} />

              <div className="flex items-center gap-6">
                <button onClick={() => setSpread((s) => Math.max(s - 1, 0))} disabled={spread === 0} className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white/70 text-sm tabular-nums">
                  {leftPage && rightPage ? `${leftPage}–${rightPage}` : leftPage || rightPage} / {totalPages}
                </span>
                <button onClick={() => setSpread((s) => Math.min(s + 1, maxSpread))} disabled={spread === maxSpread} className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
