import * as v from 'valibot'

export const CHALLENGE_ENC_LEN = 43
const CHALLENGE_REGEX = /^[A-Za-z0-9_-]+$/

export const CHALLENGE_SCHEMA = v.object({
  challenge: v.pipe(
    v.string(),
    v.length(CHALLENGE_ENC_LEN),
    v.regex(CHALLENGE_REGEX),
  ),
})
