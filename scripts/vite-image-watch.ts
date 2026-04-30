// Vite plugin: watches src/assets in dev mode and re-runs the per-file image
// conversion when a source image is added or modified. Production builds rely
// on `pnpm images` running before `vite build` (configured in package.json).

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, basename, dirname, resolve } from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import { convertOne, isVariantFilename, SOURCE_EXTENSIONS } from './build-images.mjs'

type CacheShape = Record<string, { hash: string; generated: string[] }>

function loadCache(cacheFile: string): CacheShape {
  if (!existsSync(cacheFile)) return {}
  try {
    return JSON.parse(readFileSync(cacheFile, 'utf8')) as CacheShape
  } catch {
    return {}
  }
}

function saveCache(cacheFile: string, cache: CacheShape) {
  writeFileSync(cacheFile, JSON.stringify(cache, null, 2) + '\n')
}

export function imageWatch(): Plugin {
  const root = resolve(process.cwd())
  const assetsDir = join(root, 'src', 'assets')
  const cacheFile = join(root, '.image-cache.json')

  let server: ViteDevServer | null = null
  const inFlight = new Set<string>()

  async function handleFile(file: string) {
    if (!file.startsWith(assetsDir)) return
    const name = basename(file)
    const ext = name.slice(name.lastIndexOf('.')).toLowerCase()
    if (!SOURCE_EXTENSIONS.has(ext)) return
    if (isVariantFilename(name)) return
    if (inFlight.has(file)) return

    inFlight.add(file)
    try {
      const cache = loadCache(cacheFile)
      const result = await convertOne(file, { cache })
      if (!result.skipped) {
        saveCache(cacheFile, cache)
        server?.config.logger.info(
          `[image-watch] generated ${result.written} variants for ${name}`,
          { timestamp: true }
        )
        server?.ws.send({ type: 'full-reload' })
      }
    } catch (err) {
      server?.config.logger.error(
        `[image-watch] failed on ${name}: ${(err as Error).message}`,
        { timestamp: true }
      )
    } finally {
      inFlight.delete(file)
    }
  }

  return {
    name: 'image-watch',
    apply: 'serve',
    configureServer(devServer) {
      server = devServer
      const watcher = devServer.watcher
      watcher.add(join(assetsDir, '**/*'))
      watcher.on('add', handleFile)
      watcher.on('change', handleFile)
    },
  }
}
