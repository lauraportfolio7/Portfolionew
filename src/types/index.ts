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

export interface GalleryItem {
  image: string
  caption?: string
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
  videoUrl?: string
  brandbookUrl?: string
  videos?: string[]
  conversationGroup?: ConversationGroup
  // Vergelegen spécial
  isVergelegen?: boolean
  vergelegenPages?: string[]
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
}

export interface MusicPractice {
  icon: string
  title: string
}
