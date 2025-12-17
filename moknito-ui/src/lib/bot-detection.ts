import { load as loadBotd, type BotDetectionResult } from '@fingerprintjs/botd'

let __result: BotDetectionResult | null = null
async function init() {
  if (!__result) {
    const botd = await loadBotd()

    await botd.collect()
    __result = botd.detect()
  }

  if (__result.bot) {
    throw new Error(`detected bot: ${__result.botKind}`)
  }
}

const botDetection = init()
export default botDetection
