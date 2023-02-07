import { IS_SERVER } from './misc'

/**
 * На сервере мы получаем переменные окружения из process.env,
 * а на клиенте из html специального тега meta который содержит
 * в себе строку с JSON объектом переменных окружения
 */
const ENV_SOURCE = IS_SERVER
  ? import.meta.env // process.env || import.meta.env
  : Object.assign(
      {},
      JSON.parse(
        document.querySelector('meta[data-hid="prql-env"]')?.getAttribute('content') || '{}'
      )
    )

export const ENV = {
  SZ_STAND: ENV_SOURCE.SZ_STAND,
  SZ_API_URL: ENV_SOURCE.SZ_API_URL,
  IS_LOCAL: ENV_SOURCE.SZ_STAND === 'local',
  IS_PRODUCTION: ENV_SOURCE.NODE_ENV === 'production',
  IS_DEVELOP: ENV_SOURCE.NODE_ENV !== 'production',
  IS_PRODUCTION_STAND: ENV_SOURCE.SZ_STAND === 'production',
}
