import type { AuthCredentialsSchema, Registration, ResetPasswordSchema } from '@/client'
import { AuthService, UserService } from '@/client'
import { Logger } from '@/utils'

const logger = new Logger({ prefix: 'AuthService/providers' })

export async function login(data: AuthCredentialsSchema) {
  const response = await AuthService.authSignIn(data)

  logger.info('login()', response)

  return response
}

export async function register(data: Registration) {
  const response = await AuthService.usersSignUp(data)

  logger.info('register()', response)

  return response
}

export async function activate(token: string) {
  const response = await AuthService.usersActivate({ activation_token: token })

  logger.info('activate()', response)

  return response
}

export async function recoverPassword(email: string) {
  const response = await UserService.usersRequestPasswordRecovery({
    email: email,
  })

  logger.info('recoverPassword()', response)

  return response
}

export async function recoverSetPassword(data: ResetPasswordSchema) {
  const response = await UserService.usersResetPassword(data)

  logger.info('recoverSetPassword()', response)

  return response
}
