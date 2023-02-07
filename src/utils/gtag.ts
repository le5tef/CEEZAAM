import { ENV, GLOBAL } from '@/constants'
import { Logger } from './logger'

const logger = new Logger({ prefix: 'gtag' })

interface IEvent {
  event: string
  debug?: boolean
  stand?: string

  [key: string]: any
}

interface IGtag {
  condition?: boolean
  dataLayer: any[]

  push(event: IEvent): void
}

class Gtag implements IGtag {
  public condition: boolean
  public dataLayer = GLOBAL.dataLayer || []

  constructor(condition = true) {
    this.condition = condition
  }

  public push(event: IEvent) {
    const eventComputed = Object.assign(
      {
        debug: !ENV.IS_PRODUCTION_STAND,
        stand: ENV.SZ_STAND,
      },
      event
    )

    if (this.condition) {
      this.dataLayer.push(eventComputed)
    }

    logger.log(`condition: ${this.condition}; pushed event: ${event.event}`, event)
  }
}

export const gtag = new Gtag(ENV.IS_PRODUCTION_STAND)
