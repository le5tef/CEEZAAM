import type { UpdateUserEntity } from '@/client'
import { UserService } from '@/client'
import { Logger } from '@/utils'

const logger = new Logger({ prefix: 'UserService/providers' })

export async function profile() {
  const response = await UserService.usersProfile()
  logger.info('profile()', response)
  return response
}

export async function updateUser(data: UpdateUserEntity) {
  const response = await UserService.usersProfileUpdate(data)
  logger.info('updateUser()', response)
  return response
}
