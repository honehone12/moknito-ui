import { load as loadBotd, type BotDetectionResult } from '@fingerprintjs/botd'
import FingerprintJS, { type GetResult } from '@fingerprintjs/fingerprintjs'

interface Fingerprint {
  botd: BotDetectionResult
  fp: GetResult
}

let result: Fingerprint | null = null

async function load() {
  const fpl = FingerprintJS.load()
  const botl = loadBotd()

  const fp = await fpl
  const botd = await botl

  const botc = botd.collect()
  const fpg = fp.get()

  await botc
  const botInfo = botd.detect()
  const fpInfo = await fpg

  return {
    botd: botInfo,
    fp: fpInfo,
  }
}

async function init() {
  if (!result) {
    result = await load()
  }

  if (result.botd.bot) {
    throw new Error(`detected bot: ${result.botd.botKind}`)
  }

  return result.fp
}

export const fingerprint = init()
