/* Logo de Laura — un « L » manuscrit dont la barre se prolonge en hampe de
   note de musique (clin d'œil à l'univers du son). Dessiné en currentColor
   pour s'adapter aux états clair/sombre de la navigation, avec la tête de note
   en accent (or). Purement décoratif : le nom reste accessible via aria-label. */
export function Logo({
  className,
  accent = 'var(--color-accent)',
}: {
  className?: string
  accent?: string
}) {
  return (
    <svg
      viewBox="0 0 48 40"
      className={className}
      role="img"
      aria-label="Laura Cerveaux"
      fill="none"
    >
      {/* Le « L » : montant vertical + empattement, tracé épais et arrondi */}
      <path
        d="M14 5 L14 30 Q14 33 17 33 L30 33"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hampe de la note, qui part du haut du L et monte vers la droite */}
      <path
        d="M14 9 L33 5.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Crochet de la note */}
      <path
        d="M33 5.5 Q39 6 38.5 11"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Tête de note (en accent) */}
      <ellipse
        cx="31.5"
        cy="13.6"
        rx="5"
        ry="3.7"
        transform="rotate(-20 31.5 13.6)"
        fill={accent}
      />
    </svg>
  )
}
