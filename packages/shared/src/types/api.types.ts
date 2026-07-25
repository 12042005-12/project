export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
    details?: any
  }
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AuthResponse {
  user: {
    _id: string
    email: string
    role: string
    isEmailVerified: boolean
  }
  token: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  token: string
  refreshToken: string
}
