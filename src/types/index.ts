export type ProjectCategory = 'École' | 'Entreprise'

export interface TargetAudience {
  main?: string
  core?: string
  relay?: string
}

export interface Objectives {
  cognitive: string[]
  affective: string[]
  conative: string[]
}

export interface ConversationGroup {
  label: string
  cover: string
  images: string[]
}

export interface CarouselItem {
  label: string
  pdfUrl: string
  cover: string
}

export interface GalleryItem {
  image: string
  caption?: string
}

/* Carte BTS — synthèse pour les fiches détaillées (E6). */
export interface BtsConditions {
  realization: 'Vécue' | 'Simulée' | 'Observée'
  mode?: 'En autonomie' | 'Accompagnée'
  team: 'Individuelle' | 'Collective'
}

export interface BtsTool {
  name: string
  usage?: string
}

export interface BtsResult {
  label: string
  value: string
  change?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: ProjectCategory
  tags: string[]
  type: string
  context: string
  slogan: string
  target: string | TargetAudience
  objectives: Objectives
  supports: string[]
  impact: string
  gallery: (string | GalleryItem)[]
  isFeatured?: boolean
  problematic?: string
  positioning?: string
  promise?: string
  proofs?: string[]
  tone?: string[]
  creativeChoices?: string[]
  documentUrl?: string
  brochureUrl?: string
  brochureLabel?: string
  documentLabel?: string
  videoUrl?: string
  brandbookUrl?: string
  videos?: string[]
  conversationGroup?: ConversationGroup
  carousels?: CarouselItem[]
  tabletMockup?: boolean
  laptopMockup?: boolean
  bookletMockup?: boolean
  phoneMockup?: boolean
  carouselPdfUrl?: string
  // Vergelegen spécial
  isVergelegen?: boolean
  vergelegenPages?: string[]
  // Synthèse BTS (pour les 3 fiches détaillées E6)
  period?: string
  conditions?: BtsConditions
  btsActivities?: number[]
  tools?: BtsTool[]
  results?: BtsResult[]
}

export type MilestoneType = 'formation' | 'experience' | 'diplome' | 'objectif'

export interface Milestone {
  id: string
  year: string
  title: string
  detail: string
  type: MilestoneType
  note?: string
  isFuture?: boolean
}

export interface Track {
  title: string
  soundcloudUrl: string
  category?: string
}

export interface MusicPractice {
  icon: string
  title: string
}
