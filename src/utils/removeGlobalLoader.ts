import { GLOBAL, IS_CLIENT } from '@/constants'
import { Logger } from './logger'
import { sleep } from './sleep'

const logger = new Logger({ prefix: 'removeGlobalLoader' })

export async function removeGlobalLoader() {
  logger.log('removeGlobalLoader() fired', GLOBAL.prqlLoader)

  const { prqlLoader } = GLOBAL

  if (!IS_CLIENT || !prqlLoader?.isVisible) return

  try {
    prqlLoader.hide()
    await sleep(100)
  } catch (error) {
    console.error(`prqlLoader error! prqlLoader: ${prqlLoader}, error: ${error}`)
  }
}
