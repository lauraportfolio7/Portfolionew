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
  /* Pages pré-rendues en images (affichage instantané dans la lightbox). */
  pages?: string[]
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

/* Veille & Benchmark — références analysées + analyse de l'existant. */
export interface BenchmarkItem {
  image: string
  country: string
  title: string
  retained: string[]      // ce qui a été retenu
  inspiration?: string    // ce qui a inspiré le projet
  counter?: boolean       // contre-référence (ex. Italie)
}

export interface BenchmarkNote {
  title: string
  icon?: 'refresh' | 'square' | 'search'
  intro?: string
  bullets: string[]
}

export interface VeilleBenchmark {
  label?: string
  title: string
  intro?: string
  items: BenchmarkItem[]
  existingAnalysis: BenchmarkNote
}

/* Activité 2 — Conception du guide : étapes de réflexion + focus format. */
export interface ConceptionStep {
  title: string
  text?: string
}

export interface FormatFocus {
  title: string
  points: string[]
}

export interface ConceptionSection {
  label?: string
  title: string
  intro?: string
  steps: ConceptionStep[]
  format: FormatFocus
}

/* Activité 3 — Production du support : timeline de réalisation. */
export interface ProductionStep {
  title: string
  text?: string
}

export interface ProductionSection {
  label?: string
  title: string
  intro?: string
  steps: ProductionStep[]
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

/* ===========================================================================
   Disney 100 — Vice-Versa : étude de cas sur mesure (recommandation stratégique)
   Tout le contenu de la page projet Disney est décrit ici, section par section,
   puis rendu par <DisneyCaseStudy>. Les supports n'ont pas été produits : la page
   met en avant la réflexion, l'analyse et les recommandations.
   ======================================================================== */

/* Carte générique « emoji + titre + texte » (Grand Rex, rôle, KPI, etc.). */
export interface DisneyIconCard {
  icon: string          // emoji
  title: string
  text?: string
}

/* Bloc « titre + intro » réutilisable pour les sous-sections. */
export interface DisneyBlock {
  title: string
  intro?: string
}

/* Activité 1 — une étude (Disney, concurrents, quanti, quali). */
export interface DisneyStudyCard {
  icon: string
  title: string
  source?: string       // ex. « Ipsos × FondaMental, 2024 »
  points: string[]
}

/* Activité 1 — bloc questionnaire exploratoire. */
export interface DisneyQuestionnaire {
  title: string
  intro: string
  learnings: string[]   // principaux enseignements affichés sur la page
  galleryLabel: string  // libellé du bouton « Voir les réponses complètes »
  images: string[]      // captures dans l'ordre numérique (modal)
}

/* Activité 2 — correspondance « enseignement → solution recommandée ». */
export interface DisneyInsightSolution {
  insight: string
  solution: string
  icon?: string
}

/* Solution / innovation recommandée (carte). */
export interface DisneyRecommendation {
  icon: string
  title: string
  text: string
  tag?: string          // ex. « Innovation », « Réseaux sociaux »
}

/* Persona — fiche synthétique. */
export interface DisneyPersona {
  name: string
  age: string
  role: string
  quote?: string
  traits: { label: string; value: string }[]
  interests: string[]
  why: string[]         // « Pourquoi ce persona ? » — construit à partir des études
}

export interface DisneyCaseStudy {
  // 1. Contexte
  context: DisneyBlock & { text: string }
  // 2. Brief
  brief: DisneyBlock & { points: string[] }
  // 3. Pourquoi le Grand Rex
  grandRex: DisneyBlock & { cards: DisneyIconCard[]; conclusion: string }
  // 4. Problématique
  problematic: DisneyBlock & { statement: string }
  // 8. Objectifs de communication (cognitif / affectif / conatif)
  objectives: DisneyBlock & {
    cognitive: string[]
    affective: string[]
    conative: string[]
  }
  // 5. Cible & Persona
  audience: DisneyBlock & { segments: DisneyIconCard[]; persona: DisneyPersona }
  // 6. Mon rôle
  role: DisneyBlock & { cards: DisneyIconCard[] }
  // 7. Activité 1 — Veille et études
  research: DisneyBlock & {
    disney: DisneyStudyCard
    competitors: DisneyStudyCard[]
    quantitative: DisneyStudyCard[]
    questionnaire: DisneyQuestionnaire
  }
  // 8. Pourquoi Vice-Versa
  whyViceVersa: DisneyBlock & { reasons: DisneyIconCard[]; conclusion: string }
  // 9. Activité 2 — Création de la stratégie
  strategy: DisneyBlock & { mapping: DisneyInsightSolution[] }
  // 10. Solutions recommandées
  solutions: DisneyBlock & { disclaimer: string; cards: DisneyRecommendation[] }
  // 11. Innovations proposées
  innovations: DisneyBlock & { disclaimer: string; cards: DisneyRecommendation[] }
  // 12. Activité 5 — Évaluation et KPI
  kpi: DisneyBlock & { cards: DisneyIconCard[] }
  // 13. Présentation du diaporama
  slideshow: DisneyBlock & { pages: string[]; pdfUrl: string; pdfLabel: string }
  // 14. Bilan
  bilan: DisneyBlock & { text: string }
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
  impact?: string
  gallery: (string | GalleryItem)[]
  isFeatured?: boolean
  problematic?: string
  positioning?: string
  promise?: string
  proofs?: string[]
  tone?: string[]
  creativeChoices?: string[]
  documentUrl?: string
  /* Pages du document pré-rendues en images (chargement instantané, sans
     PDF.js). Si présent, le SlideViewer les utilise ; documentUrl ne sert
     plus qu'au bouton « voir le document complet ». */
  documentPages?: string[]
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
  veilleBenchmark?: VeilleBenchmark
  conception?: ConceptionSection
  production?: ProductionSection
  // Disney 100 — étude de cas sur mesure (remplace le contenu générique)
  disneyCase?: DisneyCaseStudy
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
