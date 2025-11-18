/**
 * Shared TypeScript types for authentication
 */

// User profile data structure matching your registration flow
export interface UserProfile {
  id: string
  email: string
  emailVerified: boolean

  // Personal Information (Step 2)
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  phoneNumber?: string
  profilePhotoUrl?: string

  // Address Information (Step 3)
  streetAddress?: string
  city?: string
  province?: string
  zipCode?: string
  country?: string

  // Identity Verification (Step 4)
  idType?: 'passport' | 'drivers_license' | 'national_id'
  idNumber?: string
  documentUrl?: string
  verified?: boolean

  // Preferences (Step 5)
  interests?: string[] // e.g., ['houses', 'apartments', 'sedans']
  bio?: string

  // Metadata
  createdAt?: string
  updatedAt?: string
}

// Login request/response types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: {
    id: string
    email: string
    emailVerified: boolean
    createdAt: string
  }
  session: {
    accessToken: string
    refreshToken: string
    expiresAt: number
  }
}

// Registration request type (matches your multi-step form)
export interface RegistrationRequest {
  // Step 1
  email: string
  password: string

  // Step 2
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
  profilePhotoUrl?: string

  // Step 3
  streetAddress: string
  city: string
  province: string
  zipCode: string
  country: string

  // Step 4
  idType: 'passport' | 'drivers_license' | 'national_id'
  idNumber: string
  documentUrl?: string

  // Step 5
  interests: string[]
  bio?: string
}

export interface RegistrationResponse {
  message: string
  user: {
    id: string
    email: string
    emailVerified: boolean
  }
}

// API error response
export interface ApiErrorResponse {
  error: string
  details?: unknown
}

// Auth state for Redux
export interface AuthState {
  loggedIn: boolean
  user: UserProfile | null
  loading: boolean
  error: string | null
}
