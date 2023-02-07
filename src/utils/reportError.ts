// @TODO Sentry disabled
import type { VNode } from 'vue'
// import { captureException, captureMessage } from '@sentry/browser'
import { h } from 'vue'
import { Logger } from './logger'
import { notify } from './notify'
import type { ValidationError } from '@/client'
import { ApiError } from '@/client'

const logger = new Logger({ prefix: 'reportError.ts' })

interface IreportErrorParams {
  prefix?: string
  name?: string
  isError?: boolean
  payload?: object
  notify?: boolean
}

interface IreportErrorResult {
  errorName: string
  errorText: string | VNode
  errorStatus: number
}

const paramsDefault: IreportErrorParams = {
  isError: true,
}

export function reportError(error: any, params?: IreportErrorParams): IreportErrorResult {
  const config: IreportErrorParams = Object.assign({}, paramsDefault, params)
  // const captureMethod = config.isError ? captureException : captureMessage
  const errorStatus: number = error?.status || error?.response?.status || error?.request?.status

  let errorText: string | VNode = 'Что-то пошло не так'

  if (error instanceof ApiError) {
    if (error.body?.error?.fields) {
      const fieldsErrors = error.body.error.fields.map((x: ValidationError) =>
        h('div', [h('strong', x.loc.at(-1)), [': ', x.msg]])
      )
      errorText = h('div', [error.body.error.msg, fieldsErrors])
    } else if (error.body?.error?.msg) {
      errorText = error.body.error.msg
    }
  }

  const errorName = `${errorStatus && errorStatus} ${params?.name || 'Неизвестная ошибка'}`

  logger.error(/*captureMethod.name, */ params?.name, params?.prefix, error, params?.payload)

  // captureMethod(error, {
  //   extra: {
  //     prefix: params?.prefix && params.prefix,
  //     name: params?.name && params.name,
  //   },
  // })

  if (config?.notify) {
    notify({
      type: 'error',
      title: errorName,
      duration: 15000,
      message: h('div', errorText),
    })
  }

  return {
    errorName,
    errorText,
    errorStatus,
  }
}
