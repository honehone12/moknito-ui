import { load as loadBotd, type BotDetectionResult } from '@fingerprintjs/botd'

let result: BotDetectionResult | null = null

async function init() {
  if (!result) {
    const botd = await loadBotd()

    await botd.collect()
    result = botd.detect()
  }

  if (result.bot) {
    throw new Error(`detected bot: ${result.botKind}`)
  }

  return result
}

export const botDetection = init()
