// Rend plusieurs pages d'un PDF en PNG.
// Utilisation : node scripts/pdf-to-png-pages.mjs <input.pdf> <output-dir> <prefix> <pages> [scale]
// Exemple : node scripts/pdf-to-png-pages.mjs guide.pdf assets/x/ guide "1,4,8" 2
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { createCanvas } from '@napi-rs/canvas'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const pdfjs = require('pdfjs-dist/legacy/build/pdf.mjs')

const [, , pdfPath, outDir, prefix, pagesStr, scaleStr] = process.argv
if (!pdfPath || !outDir || !prefix || !pagesStr) {
  console.error('Usage: node scripts/pdf-to-png-pages.mjs <input.pdf> <output-dir> <prefix> <pages> [scale=2]')
  process.exit(1)
}

const scale = scaleStr ? parseFloat(scaleStr) : 2
const pages = pagesStr.split(',').map((s) => parseInt(s.trim(), 10))

await mkdir(outDir, { recursive: true })

const data = new Uint8Array(await readFile(pdfPath))
const pdf = await pdfjs.getDocument({ data, useSystemFonts: true }).promise
console.log(`PDF: ${pdf.numPages} pages totales`)

for (const pageNum of pages) {
  if (pageNum < 1 || pageNum > pdf.numPages) {
    console.warn(`! Page ${pageNum} ignorée (hors limites)`)
    continue
  }
  const page = await pdf.getPage(pageNum)
  const viewport = page.getViewport({ scale })
  const canvas = createCanvas(viewport.width, viewport.height)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, viewport.width, viewport.height)
  await page.render({ canvasContext: ctx, viewport, canvas }).promise
  const outPath = join(outDir, `${prefix}-p${pageNum}.png`)
  await writeFile(outPath, canvas.toBuffer('image/png'))
  console.log(`✓ ${outPath} (${Math.round(viewport.width)}×${Math.round(viewport.height)})`)
}
