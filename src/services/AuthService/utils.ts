import Cookies from 'js-cookie'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { COOKIES } from '@/constants'
import { PASS_MAX_LENGTH, PASS_MIN_LENGTH } from './constants'
import { Logger } from '@/utils'

const logger = new Logger({ prefix: 'UserService/utils' })

export const validateLogin = (s: string) => isEmail(s)
export const validatePassword = (s: string) =>
  isStrongPassword(s, {
    minLength: PASS_MIN_LENGTH,
    minUppercase: 1,
    minSymbols: 0,
    minNumbers: 0,
  }) && s.length <= PASS_MAX_LENGTH

export const isAuthorized = () => {
  const isAuthorized = !!Cookies.get(COOKIES.AUTH_TOKEN)

  logger.log(`isAuthorized() fired: ${isAuthorized}`)

  return isAuthorized
}
