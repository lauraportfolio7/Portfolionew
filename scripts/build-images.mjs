// Image variant generator: scans src/assets for source images and produces
// AVIF + WebP + (PNG|JPG) variants at 640w / 1280w / 1920w widths.
// Caches per-source content hashes in .image-cache.json to skip unchanged files.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { loadImage, createCanvas } from '@napi-rs/canvas'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ASSETS_DIR = join(ROOT, 'src', 'assets')
const CACHE_FILE = join(ROOT, '.image-cache.json')

export const TARGET_WIDTHS = [640, 1280, 1920]
export const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const VARIANT_BASENAME_REGEX = /\.(640|1280|1920)w\.(avif|webp|jpg|jpeg|png)$/i

const QUALITY = {
  avif: { quality: 55, effort: 4 },
  webp: { quality: 78 },
  jpg: { quality: 85, mozjpeg: true },
  png: { compressionLevel: 9, palette: true },
}

export function isVariantFilename(name) {
  return VARIANT_BASENAME_REGEX.test(name)
}

export function fallbackExtensionFor(sourceExt) {
  return sourceExt.toLowerCase() === '.png' ? 'png' : 'jpg'
}

export function variantPathsFor(sourceAbsPath) {
  const ext = extname(sourceAbsPath)
  const base = sourceAbsPath.slice(0, -ext.length)
  const fallbackExt = fallbackExtensionFor(ext)
  const out = []
  for (const w of TARGET_WIDTHS) {
    out.push({ width: w, format: 'avif', path: `${base}.${w}w.avif` })
    out.push({ width: w, format: 'webp', path: `${base}.${w}w.webp` })
    out.push({ width: w, format: fallbackExt, path: `${base}.${w}w.${fallbackExt}` })
  }
  return out
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else if (entry.isFile()) {
      yield full
    }
  }
}

async function findSources() {
  const sources = []
  for await (const file of walk(ASSETS_DIR)) {
    const ext = extname(file).toLowerCase()
    if (!SOURCE_EXTENSIONS.has(ext)) continue
    if (isVariantFilename(basename(file))) continue
    sources.push(file)
  }
  return sources
}

async function hashFile(path) {
  const buf = await readFile(path)
  return createHash('sha256').update(buf).digest('hex')
}

async function loadCache() {
  if (!existsSync(CACHE_FILE)) return {}
  try {
    return JSON.parse(await readFile(CACHE_FILE, 'utf8'))
  } catch {
    return {}
  }
}

async function saveCache(cache) {
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n')
}

// Decode an image to a raw PNG buffer via @napi-rs/canvas — used as a fallback
// when sharp/libheif chokes on a specific AVIF bitstream. Slower but tolerant.
async function decodeViaCanvas(absPath) {
  const img = await loadImage(absPath)
  const canvas = createCanvas(img.width, img.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  return { buffer: await canvas.encode('png'), width: img.width, height: img.height }
}

async function generateVariants(input, sourceWidth, expected, fallbackExt) {
  let written = 0
  for (const w of TARGET_WIDTHS) {
    const targetWidth = Math.min(w, sourceWidth || w)
    const resized = sharp(input, { failOn: 'none' }).resize({
      width: targetWidth,
      withoutEnlargement: true,
    })

    const avifOut = expected.find((v) => v.width === w && v.format === 'avif').path
    const webpOut = expected.find((v) => v.width === w && v.format === 'webp').path
    const fallbackOut = expected.find((v) => v.width === w && v.format === fallbackExt).path

    await mkdir(dirname(avifOut), { recursive: true })

    await Promise.all([
      resized.clone().avif(QUALITY.avif).toFile(avifOut),
      resized.clone().webp(QUALITY.webp).toFile(webpOut),
      fallbackExt === 'png'
        ? resized.clone().png(QUALITY.png).toFile(fallbackOut)
        : resized.clone().jpeg(QUALITY.jpg).toFile(fallbackOut),
    ])
    written += 3
  }
  return written
}

export async function convertOne(sourceAbsPath, { force = false, cache = null } = {}) {
  const relPath = relative(ROOT, sourceAbsPath).replace(/\\/g, '/')
  const expected = variantPathsFor(sourceAbsPath)

  const fileHash = await hashFile(sourceAbsPath)
  const cached = cache?.[relPath]
  const allExist = expected.every((v) => existsSync(v.path))

  if (!force && cached && cached.hash === fileHash && allExist) {
    return { skipped: true, written: 0, viaCanvas: false }
  }

  const sourceExt = extname(sourceAbsPath).toLowerCase()
  const fallbackExt = fallbackExtensionFor(sourceExt)

  let written = 0
  let viaCanvas = false

  try {
    const meta = await sharp(sourceAbsPath, { failOn: 'none' }).metadata()
    written = await generateVariants(
      sourceAbsPath,
      meta.width ?? 0,
      expected,
      fallbackExt
    )
  } catch (err) {
    // libheif occasionally fails on specific AVIF bitstreams. Re-decode via
    // canvas to a PNG buffer and let sharp work from there.
    if (sourceExt !== '.avif') throw err
    const decoded = await decodeViaCanvas(sourceAbsPath)
    written = await generateVariants(
      decoded.buffer,
      decoded.width,
      expected,
      fallbackExt
    )
    viaCanvas = true
  }

  if (cache) {
    cache[relPath] = {
      hash: fileHash,
      generated: expected.map((v) => relative(ROOT, v.path).replace(/\\/g, '/')),
    }
  }
  return { skipped: false, written, viaCanvas }
}

async function main() {
  const force = process.argv.includes('--force')
  const start = Date.now()
  const sources = await findSources()
  const cache = force ? {} : await loadCache()

  let processed = 0
  let skipped = 0
  let totalWritten = 0
  const errors = []

  // Sequential to avoid maxing out CPU/memory on a laptop; sharp is internally parallel.
  for (const src of sources) {
    try {
      const result = await convertOne(src, { force, cache })
      if (result.skipped) {
        skipped++
      } else {
        processed++
        totalWritten += result.written
        const rel = relative(ROOT, src).replace(/\\/g, '/')
        const tag = result.viaCanvas ? ' [via canvas]' : ''
        process.stdout.write(`  + ${rel} (${result.written} variants)${tag}\n`)
      }
    } catch (err) {
      errors.push({ src, err })
      process.stderr.write(`  ! ${relative(ROOT, src)}: ${err.message}\n`)
    }
  }

  await saveCache(cache)
  const elapsed = ((Date.now() - start) / 1000).toFixed(2)

  console.log('')
  console.log(`Image pipeline summary:`)
  console.log(`  sources: ${sources.length}`)
  console.log(`  processed: ${processed}`)
  console.log(`  cache hit: ${skipped}`)
  console.log(`  variants written: ${totalWritten}`)
  console.log(`  errors: ${errors.length}`)
  console.log(`  elapsed: ${elapsed}s`)

  if (errors.length > 0) process.exit(1)
}

const isDirectInvocation =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isDirectInvocation) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
