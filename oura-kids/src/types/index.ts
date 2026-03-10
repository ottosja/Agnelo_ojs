export type Category =
  | 'biblia'
  | 'manualidades'
  | 'canciones'
  | 'actividades'
  | 'colorear'
  | 'cuentos'

export interface Ebook {
  id: string
  title: string
  subtitle: string
  description: string
  category: Category
  coverColor: string
  coverEmoji: string
  coverGradient: string
  isFree: boolean
  hotmartUrl?: string
  hotmartProductId?: string
  pages: EbookPage[]
  ageRange: string
  rating: number
  reviewCount: number
  language: 'es'
  author: string
  previewPages?: number // how many pages free users can preview
  fileSize?: string
}

export interface EbookPage {
  id: string
  pageNumber: number
  title?: string
  content: PageContent[]
  backgroundColor?: string
}

export type PageContent =
  | TextContent
  | ImageContent
  | ActivityContent
  | ColoringContent

export interface TextContent {
  type: 'text'
  text: string
  style?: 'verse' | 'story' | 'instruction' | 'heading' | 'fun-fact'
  alignment?: 'left' | 'center' | 'right'
}

export interface ImageContent {
  type: 'image'
  emoji: string
  caption?: string
  size?: 'small' | 'medium' | 'large'
}

export interface ActivityContent {
  type: 'activity'
  question: string
  answer?: string
  hint?: string
}

export interface ColoringContent {
  type: 'coloring'
  description: string
  emoji: string
}

export interface Annotation {
  id: string
  ebookId: string
  pageNumber: number
  text: string
  color: string
  createdAt: string
  position?: { x: number; y: number }
  note?: string
}

export interface UserNote {
  id: string
  ebookId: string
  pageNumber: number
  note: string
  createdAt: string
}

export interface PurchaseRecord {
  ebookId: string
  purchasedAt: string
  transactionId?: string
}

export interface UserState {
  name: string
  email: string
  avatar?: string
  purchases: PurchaseRecord[]
  annotations: Annotation[]
  notes: UserNote[]
  readingProgress: Record<string, number> // ebookId -> last page
  favorites: string[] // ebookIds
}
