export interface Auth {
  avatar: string
  email: string
  fullName: string
  id: number
}
export interface UserResponse {
  data?: Auth
}
export interface UserProfile {
  accessToken: string
  email: string
  id: number
}

export interface AuthInitialStateType {
  state: { userInfo: Auth | null; isLogin: boolean }
  signup: (info: Auth) => void
  login: (info: Auth) => void
  logout: () => void
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  email: string
  accessToken: string
}

export type SignupRequest = {
  email: string
  password: string
  fullName: string
  avatar?: string
}

export type SignupResponse = {
  data?: {
    message: string
  }
}
export type MessageResponse = {
  data?: {
    message: string
  }
}
export type GetmeResponse = {
  data: {
    avatar: string
    email: string
    fullName: string
    id: number
  }
}

export type ResponseBadRequest = {
  code: 'string'
  error: 'string'
  errors: [
    {
      error: 'string'
      field: 'string'
    },
  ]
  traceId: 'string'
}
