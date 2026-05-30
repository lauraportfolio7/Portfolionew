import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import fs from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { imageWatch } from './scripts/vite-image-watch'

/**
 * Sert les PDF de /documents avec le support des requêtes HTTP Range en dev.
 * pdf.js (disableAutoFetch) ne télécharge alors que les octets des pages
 * affichées au lieu du fichier entier — les gros documents s'ouvrent vite.
 * (En production, nginx gère déjà nativement le Range sur les fichiers statiques.)
 */
function pdfRange(): Plugin {
  return {
    name: 'pdf-range',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (!url || !url.startsWith('/documents/') || !url.endsWith('.pdf')) return next()
        const filePath = path.join(__dirname, 'public', decodeURIComponent(url))
        let stat: fs.Stats
        try {
          stat = fs.statSync(filePath)
        } catch {
          return next()
        }
        const total = stat.size
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Content-Type', 'application/pdf')
        const range = req.headers.range
        if (range) {
          const m = /bytes=(\d*)-(\d*)/.exec(range)
          let start = m && m[1] ? parseInt(m[1], 10) : 0
          let end = m && m[2] ? parseInt(m[2], 10) : total - 1
          if (isNaN(start)) start = 0
          if (isNaN(end) || end >= total) end = total - 1
          if (start > end) {
            res.statusCode = 416
            res.setHeader('Content-Range', `bytes */${total}`)
            return res.end()
          }
          res.statusCode = 206
          res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`)
          res.setHeader('Content-Length', String(end - start + 1))
          fs.createReadStream(filePath, { start, end }).pipe(res)
        } else {
          res.statusCode = 200
          res.setHeader('Content-Length', String(total))
          fs.createReadStream(filePath).pipe(res)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [pdfRange(), react(), tailwindcss(), imageWatch()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    rolldownOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/motion') || id.includes('node_modules/gsap')) {
            return 'animation-vendor'
          }
        },
      },
    },
  },
})
