import * as v from 'valibot'

export const CODE_ENC_LEN = 22
const CODE_REGEX = /^[A-Za-z0-9_-]+$/

export const CODE_SCHEMA = v.object({
  code: v.pipe(v.string(), v.length(CODE_ENC_LEN), v.regex(CODE_REGEX)),
})
