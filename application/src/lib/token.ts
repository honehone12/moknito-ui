export const ACCESS_TOKEN_COOKIE_KEY = 'ao'
export const REFRESH_TOKEN_COOKIE_KEY = 'rf'

export interface Token {
  access_token: string
  refresh_token?: string | undefined
  token_type: string
  expires_in: number
}
