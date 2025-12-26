export const ACCESS_TOKEN_COOKIE_KEY = 'ao'
export const REFRESH_TOKEN_COOKIE_KEY = 'rf'
export const SECURE_COOKIE = false // for local

export interface Token {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}
