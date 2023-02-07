import axios from 'axios'
import { APP } from '@/constants'

const TIMEOUT = 900000

axios.interceptors.request.use(
  async (config) => {
    config.withCredentials = true
    config.timeout = TIMEOUT
    config.timeoutErrorMessage = `Game over: timeout ${TIMEOUT}ms is over.`
    // @ts-ignore
    config.headers['x-prequel-app-name'] = 'prequel-web'
    // @ts-ignore
    config.headers['x-prequel-app-version'] = APP.VERSION

    return config
  },
  (error) => Promise.reject(error)
)
