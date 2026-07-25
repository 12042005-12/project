export interface User {
  _id: string
  email: string
  password: string
  role: 'user' | 'admin'
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  _id: string
  userId: string
  avatar?: string
  gender?: 'male' | 'female' | 'other'
  age?: number
  height?: number
  weight?: number
  bodyMeasurements?: {
    shoulderWidth?: number
    chest?: number
    waist?: number
    hips?: number
    inseam?: number
  }
  skinTone?: string
  undertone?: 'warm' | 'cool' | 'neutral'
  fashionPreferences?: string[]
  favoriteBrands?: string[]
  favoriteColors?: string[]
  country?: string
  language?: string
  theme?: 'light' | 'dark'
  notificationSettings?: {
    email: boolean
    push: boolean
    marketing: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface BodyAnalysis {
  _id: string
  userId: string
  imageUrl: string
  bodyShape?: string
  bodyType?: string
  shoulderWidth?: number
  waist?: number
  hip?: number
  legLength?: number
  heightEstimation?: number
  bodyProportion?: string
  pose?: any
  confidenceScore: number
  createdAt: Date
}

export interface SkinToneAnalysis {
  _id: string
  userId: string
  imageUrl: string
  skinTone: string
  undertone: 'warm' | 'cool' | 'neutral'
  matchingColors: string[]
  avoidColors: string[]
  confidenceScore: number
  createdAt: Date
}

export interface Garment {
  _id: string
  userId: string
  name: string
  category: 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory' | 'jewelry'
  subCategory?: string
  imageUrl: string
  colors: string[]
  brand?: string
  size?: string
  material?: string
  pattern?: string
  style?: string
  occasions?: string[]
  seasons?: string[]
  tags?: string[]
  isFavorite: boolean
  usageCount: number
  lastUsedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Recommendation {
  _id: string
  userId: string
  occasion: string
  weather?: string
  budget?: number
  preferredColors?: string[]
  season?: string
  location?: string
  outfit: {
    topWear?: Garment
    bottomWear?: Garment
    shoes?: Garment
    accessories?: Garment[]
    jewelry?: Garment[]
    hairstyle?: string
    makeup?: string
  }
  confidenceScore: number
  reason: string
  alternativeLooks?: any[]
  createdAt: Date
}

export interface TryOn {
  _id: string
  userId: string
  userImageUrl: string
  dressImageUrl: string
  resultImageUrl: string
  modelUsed: string
  confidenceScore: number
  createdAt: Date
}

export interface Wishlist {
  _id: string
  userId: string
  name: string
  items: Recommendation[]
  createdAt: Date
  updatedAt: Date
}

export interface Feedback {
  _id: string
  userId: string
  type: 'recommendation' | 'tryon' | 'general'
  relatedId: string
  rating: number
  comment?: string
  createdAt: Date
}

export interface Notification {
  _id: string
  userId: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}

export interface ChatMessage {
  _id: string
  userId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatHistory {
  _id: string
  userId: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}
