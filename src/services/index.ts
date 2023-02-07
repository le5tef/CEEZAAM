import Cookies from 'js-cookie'
import { OpenAPI } from '@/client'
import { COOKIES } from '@/constants'

export * as AuthService from './AuthService'
export * as OnboardingService from './OnboardingService'
export * as CompanyService from './CompanyService'
export * as UserService from './UserService'
export * as ScheduleService from './ScheduleService'
export { ClientsService, useClientsService } from './clients'

OpenAPI.BASE = import.meta.env.VITE_API_URL || ''

OpenAPI.TOKEN = async () => {
  const cookieToken = Cookies.get(COOKIES.AUTH_TOKEN)
  if (cookieToken) {
    return cookieToken
  } else {
    return ''
  }
}
