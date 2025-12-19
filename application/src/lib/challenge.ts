import { Base64 } from 'js-base64'

const RAW_CHALLENGE_LENGTH = 32
const CHALLENGE_STORAGE_KEY = 'CER'

export interface GeneratedChallenge {
  hash: string
}

export interface RestoredChallenge {
  raw: string
}

/**
 * this will overwrite stored challenge
 */
export async function generateChallenge(): Promise<GeneratedChallenge> {
  const raw = new Uint8Array(RAW_CHALLENGE_LENGTH)
  // is there a way to gen in safe context ? (key api is too much)
  // anyway i think this function will fail on unsafe context
  // because of hashing
  crypto.getRandomValues(raw)
  const encRaw = Base64.fromUint8Array(raw, true)

  const hash = await crypto.subtle.digest('SHA-256', raw)
  const encHash = Base64.fromUint8Array(new Uint8Array(hash), true)

  sessionStorage.setItem(CHALLENGE_STORAGE_KEY, encRaw)

  return {
    hash: encHash,
  }
}

/**
 * restore last generated challenge
 */
export function restoreChallenge(): RestoredChallenge | null {
  const encRaw = sessionStorage.getItem(CHALLENGE_STORAGE_KEY)
  return encRaw
    ? {
        raw: encRaw,
      }
    : null
}
