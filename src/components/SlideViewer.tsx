import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

interface SlideViewerProps {
  pdfUrl: string
  title?: string
}

export function SlideViewer({ pdfUrl, title }: SlideViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fullscreenCanvasRef = useRef<HTMLCanvasElement>(null)
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    setCurrentPage(1)
    setPdfDoc(null)
    setTotalPages(0)
    pdfjsLib.getDocument(pdfUrl).promise.then((doc) => {
      setPdfDoc(doc)
      setTotalPages(doc.numPages)
    })
  }, [pdfUrl])

  const renderPage = useCallback(async (canvas: HTMLCanvasElement | null, pageNum: number, maxWidth: number, maxHeight?: number) => {
    if (!pdfDoc || !canvas) return
    const page = await pdfDoc.getPage(pageNum)
    const viewport = page.getViewport({ scale: 1 })
    const dpr = window.devicePixelRatio || 1
    const scale = maxHeight
      ? Math.min(maxWidth / viewport.width, maxHeight / viewport.height)
      : maxWidth / viewport.width
    const scaled = page.getViewport({ scale: scale * dpr })
    canvas.width = scaled.width
    canvas.height = scaled.height
    canvas.style.width = `${scaled.width / dpr}px`
    canvas.style.height = `${scaled.height / dpr}px`
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const renderTask = page.render({ canvasContext: ctx, viewport: scaled } as any)
    await renderTask.promise
  }, [pdfDoc])

  useEffect(() => {
    if (!pdfDoc) return
    const canvas = canvasRef.current
    if (!canvas) return
    const page = pdfDoc.getPage(1).then((p) => {
      const vp = p.getViewport({ scale: 1 })
      const isSquareish = Math.abs(vp.width - vp.height) / vp.width < 0.15
      const containerW = canvas.parentElement?.clientWidth ?? 900
      const cap = isSquareish ? 520 : 900
      const maxW = Math.min(containerW - 32, cap)
      renderPage(canvas, currentPage, maxW)
    })
    return () => { page.catch(() => {}) }
  }, [pdfDoc, currentPage, renderPage])

  useEffect(() => {
    if (!pdfDoc || !fullscreen) return
    renderPage(
      fullscreenCanvasRef.current,
      currentPage,
      Math.min(window.innerWidth * 0.85, 1300),
      window.innerHeight * 0.78,
    )
  }, [pdfDoc, currentPage, fullscreen, renderPage])

  useEffect(() => {
    if (!fullscreen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrentPage((p) => Math.min(p + 1, totalPages))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrentPage((p) => Math.max(p - 1, 1))
      else if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [fullscreen, totalPages])

  if (!totalPages) return null

  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  return (
    <>
      <div className="mt-8">
        {title && (
          <h3 className="text-xl mb-4 text-night-secondary text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            {title}
          </h3>
        )}
        <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-night-secondary/10 bg-[#f0f0f0] relative group">
          <div className="flex items-center justify-center p-4">
            <canvas ref={canvasRef} className="rounded-lg shadow-sm" style={{ display: 'block' }} />
          </div>

          <div className="flex items-center justify-center gap-4 pb-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-night-secondary hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-night-secondary/60 tabular-nums">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-30 hover:bg-night-secondary hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFullscreen(true)}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-night-secondary hover:text-white transition-colors ml-2"
              title="Plein écran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => setFullscreen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-6 max-w-[95vw]">
              <canvas ref={fullscreenCanvasRef} className="rounded-lg" style={{ display: 'block' }} />

              <div className="flex items-center gap-6">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white/70 text-sm tabular-nums">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
                >
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
