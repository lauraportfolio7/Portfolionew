/**
 * Sigil — la signature graphique de Laura.
 * Étoile géométrique à pétales (réinvention brutaliste du tournesol).
 * Génère un polygone procédural — pas d'image, scaleable à l'infini.
 */
type SigilProps = {
  size?: number
  petals?: number
  innerRatio?: number
  color?: string
  centerColor?: string
  className?: string
  spin?: boolean
  spinDuration?: number
}

export function Sigil({
  size = 64,
  petals = 12,
  innerRatio = 0.34,
  color = 'currentColor',
  centerColor,
  className,
  spin = false,
  spinDuration = 40,
}: SigilProps) {
  const cx = 50
  const cy = 50
  const outerR = 48
  const innerR = outerR * innerRatio
  const totalPoints = petals * 2

  const points: string[] = []
  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / totalPoints) * Math.PI * 2 - Math.PI / 2
    const radius = i % 2 === 0 ? outerR : innerR
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }

  const path = `M${points.join(' L')} Z`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={spin ? { animation: `sigilSpin ${spinDuration}s linear infinite` } : undefined}
      aria-hidden="true"
    >
      <path d={path} fill={color} />
      {centerColor && (
        <circle cx={cx} cy={cy} r={5.5} fill={centerColor} />
      )}
    </svg>
  )
}
