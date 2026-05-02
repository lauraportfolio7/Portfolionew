// Petit utilitaire ponctuel : rend la page 1 d'un PDF en PNG.
// Utilisation : node scripts/pdf-to-png.mjs <input.pdf> <output.png> [scale]
import { readFile, writeFile } from 'node:fs/promises'
import { createCanvas } from '@napi-rs/canvas'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const pdfjs = require('pdfjs-dist/legacy/build/pdf.mjs')

const [, , pdfPath, pngPath, scaleStr] = process.argv
if (!pdfPath || !pngPath) {
  console.error('Usage: node scripts/pdf-to-png.mjs <input.pdf> <output.png> [scale=2]')
  process.exit(1)
}
const scale = scaleStr ? parseFloat(scaleStr) : 2

const data = new Uint8Array(await readFile(pdfPath))
const pdf = await pdfjs.getDocument({ data, useSystemFonts: true }).promise
const page = await pdf.getPage(1)
const viewport = page.getViewport({ scale })

const canvas = createCanvas(viewport.width, viewport.height)
const ctx = canvas.getContext('2d')
ctx.fillStyle = '#ffffff'
ctx.fillRect(0, 0, viewport.width, viewport.height)

await page.render({ canvasContext: ctx, viewport, canvas }).promise

await writeFile(pngPath, canvas.toBuffer('image/png'))
console.log(`✓ ${pngPath} (${Math.round(viewport.width)}×${Math.round(viewport.height)})`)
