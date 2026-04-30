import type { CSSProperties, ImgHTMLAttributes } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'sync' | 'auto'
  sizes?: string
  imgClassName?: string
  imgStyle?: CSSProperties
  pictureClassName?: string
  pictureStyle?: CSSProperties
} & Pick<ImgHTMLAttributes<HTMLImageElement>, 'draggable' | 'onLoad' | 'onError'>

const TARGET_WIDTHS = [640, 1280, 1920] as const
const SOURCE_EXT_RE = /\.(jpe?g|png|webp|avif)$/i
const VARIANT_RE = /\.(640|1280|1920)w\.(avif|webp|jpe?g|png)$/i
const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 50vw'

const sourceModules = import.meta.glob<string>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, query: '?url', import: 'default' }
)
const variantModules = import.meta.glob<string>(
  '/src/assets/**/*.{640,1280,1920}w.{avif,webp,jpg,jpeg,png}',
  { eager: true, query: '?url', import: 'default' }
)

type Manifest = {
  byUrl: Map<string, string>
  variantByPath: Map<string, string>
}

function buildManifest(): Manifest {
  const byUrl = new Map<string, string>()
  for (const [path, url] of Object.entries(sourceModules)) {
    if (VARIANT_RE.test(path)) continue
    byUrl.set(url, path)
  }
  const variantByPath = new Map<string, string>()
  for (const [path, url] of Object.entries(variantModules)) {
    variantByPath.set(path, url)
  }
  return { byUrl, variantByPath }
}

const manifest = buildManifest()

type ResolvedVariants = {
  avif: string[]
  webp: string[]
  fallback: string[]
  fallbackType: 'image/jpeg' | 'image/png'
  largestFallbackUrl: string
}

function resolveVariants(src: string): ResolvedVariants | null {
  const sourcePath = manifest.byUrl.get(src)
  if (!sourcePath) return null

  const extMatch = sourcePath.match(SOURCE_EXT_RE)
  if (!extMatch) return null
  const sourceExt = extMatch[0].toLowerCase()
  const base = sourcePath.slice(0, -sourceExt.length)
  const fallbackExt = sourceExt === '.png' ? 'png' : 'jpg'
  const fallbackType = fallbackExt === 'png' ? 'image/png' : 'image/jpeg'

  const avif: string[] = []
  const webp: string[] = []
  const fallback: string[] = []

  for (const w of TARGET_WIDTHS) {
    const a = manifest.variantByPath.get(`${base}.${w}w.avif`)
    const wp = manifest.variantByPath.get(`${base}.${w}w.webp`)
    const fb = manifest.variantByPath.get(`${base}.${w}w.${fallbackExt}`)
    if (a) avif.push(`${a} ${w}w`)
    if (wp) webp.push(`${wp} ${w}w`)
    if (fb) fallback.push(`${fb} ${w}w`)
  }

  if (avif.length === 0 && webp.length === 0 && fallback.length === 0) {
    return null
  }

  const largestFallbackUrl =
    fallback.length > 0
      ? fallback[fallback.length - 1].split(' ')[0]
      : src

  return { avif, webp, fallback, fallbackType, largestFallbackUrl }
}

export function Picture({
  src,
  alt,
  className,
  style,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  sizes = DEFAULT_SIZES,
  imgClassName,
  imgStyle,
  pictureClassName,
  pictureStyle,
  draggable,
  onLoad,
  onError,
}: Props) {
  const resolved = resolveVariants(src)

  const finalImgClassName = imgClassName ?? className
  const finalImgStyle = imgStyle ?? style

  if (!resolved) {
    return (
      <img
        src={src}
        alt={alt}
        className={finalImgClassName}
        style={finalImgStyle}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        draggable={draggable}
        onLoad={onLoad}
        onError={onError}
      />
    )
  }

  return (
    <picture className={pictureClassName} style={pictureStyle}>
      {resolved.avif.length > 0 && (
        <source type="image/avif" srcSet={resolved.avif.join(', ')} sizes={sizes} />
      )}
      {resolved.webp.length > 0 && (
        <source type="image/webp" srcSet={resolved.webp.join(', ')} sizes={sizes} />
      )}
      {resolved.fallback.length > 0 && (
        <source
          type={resolved.fallbackType}
          srcSet={resolved.fallback.join(', ')}
          sizes={sizes}
        />
      )}
      <img
        src={resolved.largestFallbackUrl}
        alt={alt}
        className={finalImgClassName}
        style={finalImgStyle}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        draggable={draggable}
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
  )
}
