import { ENV } from '@/constants'
import { Logger } from './logger'

const logger = new Logger({ prefix: 'preloadImages' })

const cache: { [key: string]: Promise<HTMLImageElement> } = {}

interface IPreloadImages {
  verbose?: boolean
}

/**
 * Полиморфная функция для прогрева картинок. Используется в слайдерах,
 * что бы подгрузить картинку слудующего слайда как можно раньше.
 * Следующий, после прогревочного, запрос этой картинки получит ответ
 * 304 not modified если кеш в браузере не выключен, что позволит
 * отобразить картинку мгновенно.
 */
export function preloadImages(
  /** Адрес или массив адресов картинок, которую необходимо "прогреть". */
  urls: string | string[],
  options?: IPreloadImages
): Promise<HTMLImageElement[]> | undefined {
  if (!(import.meta as any)?.client) return

  if (!urls || !urls.length) {
    logger.error(`>>> preloadImages error: no urls recieved. urls:  ${urls}`)
    return
  }

  if (typeof urls === 'string') {
    urls = [urls]
  }

  const verboseMode = ENV.IS_DEVELOP && options?.verbose

  return new Promise(async (resolve, reject) => {
    const promises = []
    let cacheCount = 0

    for (const url of urls) {
      // @ts-ignore
      if (cache[url]) {
        promises.push(cache[url])
        cacheCount++
        continue
      }

      const image = new Image() as HTMLImageElement
      const promise: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
        image.onload = () => {
          resolve(image)
          cache[url] = promise
        }
        image.onerror = reject
        image.src = url
      })

      promises.push(promise)
    }

    const start = performance.now()
    let loadingTime = null

    try {
      const images = await Promise.all(promises)
      loadingTime = Math.round(performance.now() - start)

      if (verboseMode) {
        logger.log(
          `preloadImages: ${urls.length} images, ${cacheCount} taken from cache, loading time
          ${loadingTime}ms`,
          urls
        )
      }

      resolve(images)
    } catch (error) {
      logger.error(`>>> preloadImages error: ${error}`)
      reject(error)
    }
  })
}
