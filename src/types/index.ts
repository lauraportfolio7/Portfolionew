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

/* Étude de performance — visuel + KPI + analyse (ex. perf d'un post). */
export interface PerformanceMetric {
  label: string
  value: string
}

export interface PerformanceHighlight {
  label: string
  value: string
  note?: string
}

export interface PerformanceSection {
  label?: string
  title: string
  intro: string
  image?: string
  imageCaption?: string
  video?: string
  videoCaption?: string
  highlights: PerformanceHighlight[]
  metrics: PerformanceMetric[]
  analysis: string
}

/* Mood board — démarche de veille créative (direction artistique). */
export interface MoodboardImage {
  src: string
  caption?: string
}

export interface MoodboardAxis {
  index: string
  title: string
  description: string
  images: MoodboardImage[]
  bullets?: string[]
}

export interface MoodboardSwatch {
  name: string
  color: string
}

export interface Moodboard {
  label?: string
  title: string
  intro: string
  keywords: string[]
  axes: MoodboardAxis[]
  finalImage: string
  finalCaption?: string
  finalNote?: string
  palette: MoodboardSwatch[]
}

/* Mon rôle — missions et coordination de prestataires. */
export interface RoleMission {
  title: string
  description?: string
}

export interface RoleCollaboration {
  label: string
  text: string
}

export interface ProjectRole {
  intro?: string
  missions: RoleMission[]
  collaboration?: RoleCollaboration
}

/* Construction de l'identité visuelle — pistes graphiques, typographies, DA. */
export interface PosterProposal {
  src: string
  step?: string
  title: string
  note?: string
  selected?: boolean
}

export interface FontChoice {
  usage: string
  font: string
  fontFamily: string
  sample: string
  description: string
  uppercase?: boolean
}

export interface VisualIdentity {
  label?: string
  title: string
  intro: string
  proposalsTitle: string
  proposals: PosterProposal[]
  selectedBadge: string
  galleryAnalysis: string
  typographyTitle: string
  fonts: FontChoice[]
  daTitle: string
  daText: string
  daTags?: string[]
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
  brochurePages?: string[]
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
  performances?: PerformanceSection[]
  moodboard?: Moodboard
  visualIdentity?: VisualIdentity
  role?: ProjectRole
  bilan?: string
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
