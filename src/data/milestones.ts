import type { Milestone } from '@/types'

export const milestones: Milestone[] = [
  {
    id: 'bac',
    year: '2021',
    title: 'Baccalauréat',
    detail: 'Obtention du baccalauréat avec les spécialités SES, HGGSP et SVT.',
    type: 'diplome',
  },
  {
    id: 'psycho',
    year: '2021 – 2022',
    title: 'L1 Psychologie – Rennes 2',
    detail: 'Première année de licence de psychologie à l\'université Rennes 2.',
    type: 'formation',
    note: 'Année non validée',
  },
  {
    id: 'musico',
    year: '2022 – 2023',
    title: 'L1 Musicologie – Rennes 2',
    detail: 'Première année de licence de musicologie à l\'université Rennes 2.',
    type: 'formation',
    note: 'Année non validée',
  },
  {
    id: 'leclerc',
    year: '2023',
    title: 'Hôtesse de caisse – Leclerc Cleunay',
    detail: '5 mois en tant qu\'hôtesse de caisse au Leclerc Cleunay de Rennes.',
    type: 'experience',
  },
  {
    id: 'service-civique',
    year: 'Fin 2023 – 2024',
    title: 'Service civique – Cercle Paul Bert',
    detail: 'Service civique dans le service communication du Cercle Paul Bert de Rennes, dans le cadre de l\'organisation du festival de spectacle vivant Quartiers en Scène.',
    type: 'experience',
  },
  {
    id: 'bts-com',
    year: 'Sept. 2024 – Aujourd\'hui',
    title: 'BTS Communication',
    detail: 'Formation en alternance axée sur la stratégie de communication, le digital et la création de contenu.',
    type: 'formation',
  },
  {
    id: 'alternance-reunion',
    year: 'Déc. 2024 – Mai 2026',
    title: 'Alternance – La Réunion Développement',
    detail: 'Alternance en cours au sein de La Réunion Développement, organisme de promotion de l\'attractivité économique du territoire.',
    type: 'experience',
  },
  {
    id: 'licence-pro',
    year: 'Sept. 2026',
    title: 'Licence pro Image et Son – Saint-Brieuc',
    detail: 'Objectif : intégrer la licence professionnelle Image et Son à Saint-Brieuc pour approfondir mes compétences en audiovisuel.',
    type: 'objectif',
    isFuture: true,
  },
]
