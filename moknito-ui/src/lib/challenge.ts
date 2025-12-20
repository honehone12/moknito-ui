import * as v from 'valibot'

export const CHALLENGE_METHOD = 'S256'
export const CHALLENGE_ENC_LEN = 43
const CHALLENGE_REGEX = /^[A-Za-z0-9_-]+$/

export const CHALLENGE_SCHEMA = v.object({
  challenge: v.pipe(
    v.string(),
    v.length(CHALLENGE_ENC_LEN),
    v.regex(CHALLENGE_REGEX),
  ),
  redirect: v.pipe(v.string(), v.url()),
})
