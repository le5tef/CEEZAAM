/**
 * @note important
 * relative paths are used intentionally
 * otherwise it breaks the assembly on the server
 */
import { APP, ENV } from '../constants'

interface ILoggerOptions {
  prefixGlobal?: string
  prefix: string
  condition?: any
  ssr?: boolean
}

interface ILogger {
  log(): void

  info(): void

  warn(): void

  error(): void
}

const IS_BROWSER = typeof window !== 'undefined'
const DEFAULT_CONFIG: ILoggerOptions = {
  prefixGlobal: APP.NAME,
  prefix: '',
  condition: !ENV.IS_PRODUCTION_STAND,
  ssr: true,
}
const LEVELS = {
  DEBUG: 'Debug',
  INFO: 'Information',
  WARN: 'Warning',
  ERROR: 'Error',
}
const METHODS_MAP = {
  [LEVELS.DEBUG]: 'log',
  [LEVELS.INFO]: 'info',
  [LEVELS.WARN]: 'warn',
  [LEVELS.ERROR]: 'error',
}
const DEFAULT_STYLES = 'padding: 0 3px 2px 3px; border-radius: 3px; color: black;'
const STYLES = {
  [LEVELS.DEBUG]: `${DEFAULT_STYLES} background: gainsboro;`,
  [LEVELS.INFO]: `${DEFAULT_STYLES} background: #91efec;`,
  [LEVELS.WARN]: `${DEFAULT_STYLES} background: gold;`,
  [LEVELS.ERROR]: `${DEFAULT_STYLES} background: firebrick; color: white;`,
}

export class Logger implements ILogger {
  private readonly options: ILoggerOptions

  /**
   * @param {{ prefix: string, condition: boolean }} config
   */
  constructor(config = {} as ILoggerOptions) {
    this.options = {
      ...DEFAULT_CONFIG,
      ...config,
    }

    if (!this.options.ssr) {
      this.options.condition = this.options.condition && IS_BROWSER
    }
  }

  public log(...attrs: any[]) {
    this.output(LEVELS.DEBUG, ...attrs)
  }

  public info(...attrs: any[]) {
    this.output(LEVELS.INFO, ...attrs)
  }

  public warn(...attrs: any[]) {
    this.output(LEVELS.WARN, ...attrs)
  }

  public error(...attrs: any[]) {
    this.output(LEVELS.ERROR, ...attrs)
  }

  private output(level: string, ...attrs: any[]) {
    if (!this.hasAccess()) return

    const method = METHODS_MAP[level]
    const styles = STYLES[level] as string
    const { prefixGlobal, prefix } = this.options
    const prefixText: string = IS_BROWSER ? `%c${prefix}` : prefix

    ;(console as any)[method](`${prefixGlobal} ${prefixText}`, IS_BROWSER ? styles : '', ...attrs)
  }

  private hasAccess() {
    return !ENV.IS_PRODUCTION_STAND && Boolean(this.options.condition)
  }
}
