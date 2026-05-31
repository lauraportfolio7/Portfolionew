// Rend TOUTES les pages d'un PDF en JPEG nets et légers (pré-rendu côté build).
// Rendu via @napi-rs/canvas (PNG) puis recompression sharp (qualité fiable).
// Utilisation : node scripts/pdf-to-jpg-pages.mjs <input.pdf> <output-dir> <prefix> [scale] [quality]
// Exemple : node scripts/pdf-to-jpg-pages.mjs public/documents/vice-versa.pdf public/disney-diapo diapo 2 82
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { createCanvas } from '@napi-rs/canvas'
import sharp from 'sharp'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const pdfjs = require('pdfjs-dist/legacy/build/pdf.mjs')

const [, , pdfPath, outDir, prefix, scaleStr, qualityStr] = process.argv
if (!pdfPath || !outDir || !prefix) {
  console.error('Usage: node scripts/pdf-to-jpg-pages.mjs <input.pdf> <output-dir> <prefix> [scale=2] [quality=82]')
  process.exit(1)
}

const scale = scaleStr ? parseFloat(scaleStr) : 2
const quality = qualityStr ? parseInt(qualityStr, 10) : 82

await mkdir(outDir, { recursive: true })

const data = new Uint8Array(await readFile(pdfPath))
const pdf = await pdfjs.getDocument({ data, useSystemFonts: true }).promise
console.log(`PDF: ${pdf.numPages} pages`)

const pad = (n) => String(n).padStart(2, '0')

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  const page = await pdf.getPage(pageNum)
  const viewport = page.getViewport({ scale })
  const canvas = createCanvas(viewport.width, viewport.height)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, viewport.width, viewport.height)
  await page.render({ canvasContext: ctx, viewport, canvas }).promise
  const png = canvas.toBuffer('image/png')
  const jpg = await sharp(png).jpeg({ quality, mozjpeg: true }).toBuffer()
  const outPath = join(outDir, `${prefix}-${pad(pageNum)}.jpg`)
  await writeFile(outPath, jpg)
  console.log(`✓ ${outPath} (${Math.round(viewport.width)}×${Math.round(viewport.height)}, ${Math.round(jpg.length / 1024)} Ko)`)
}
console.log('Terminé.')
