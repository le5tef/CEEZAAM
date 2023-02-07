import Cookies from 'js-cookie'
import router from '@/router'
import { COOKIES, ROUTES_PATHS } from '@/constants'
import { Logger, parseJwt, reportError, sleep } from '@/utils'
import { AuthService, UserService } from '@/services'
import type { AuthCredentialsSchema, UserSchema } from '@/client'
import { ApiError } from '@/client'
import { initStores } from '@/utils/clientUiHandler'
import { defineAutoInitStore } from '@/store/utils'

const logger = new Logger({ prefix: 'store/user' })

export const useUserStore = defineAutoInitStore('user', {
  state: () => ({
    isInitInProgress: false,
    user: null as UserSchema | null,
    ready: false,
  }),
  actions: {
    async init() {
      this.isInitInProgress = true
      if (AuthService.isAuthorized()) {
        await this.fetchProfile()
      }

      this.isInitInProgress = false
      this.ready = true
    },
    async waitReady() {
      while (!this.ready) {
        await sleep(1)
      }
    },
    setUser(payload: UserSchema | null) {
      this.user = payload
    },
    async login(credentials: AuthCredentialsSchema) {
      try {
        const authResponse = await AuthService.login(credentials)
        if (authResponse.is_success && authResponse.data) {
          const { tokens, user } = authResponse.data
          const tokenData = parseJwt(tokens.access_token)
          const expiresInDays = 1
          const authRedirect = Cookies.get(COOKIES.AUTH_REDIRECT)
          const nextRoute = authRedirect || ROUTES_PATHS.ONBOARDING

          this.setUser(user)
          Cookies.set(COOKIES.AUTH_TOKEN, tokens.access_token, {
            expires: expiresInDays,
          })
          Cookies.set(COOKIES.AUTH_REDIRECT, '')
          await initStores()
          await router.replace(nextRoute)

          logger.log(`login() fired!, next route: ${nextRoute}`, tokenData)
        }
      } catch (error) {
        let message = 'Ошибка авторизации'
        if (error instanceof ApiError) {
          const errorDescription = error.body.error.msg
          const errorStatusCode = error.status

          if (errorStatusCode) message += ` — ${errorStatusCode}`
          if (errorDescription) message += `: ${errorDescription}`

          reportError(error, {
            prefix: 'store/user: login()',
            name: message,
          })
          throw error
        }
      }
    },
    logout(params = { redirect: true }) {
      Cookies.set(COOKIES.AUTH_REDIRECT, location.pathname)
      Cookies.remove(COOKIES.AUTH_TOKEN)
      this.setUser(null)
      if (params?.redirect) router.push(ROUTES_PATHS.AUTH).then()
      logger.log('logout()')
      router.go(0)
      window.location.reload()
    },
    async fetchProfile() {
      try {
        const profileResp = await UserService.profile()
        if (profileResp.is_success && profileResp.data) this.setUser(profileResp.data)
      } catch {
        this.setUser(null)
      }
    },
    async updateUser(data: object) {
      await UserService.updateUser(data)
      await this.fetchProfile()
    },
    async recoverPassword(email: string) {
      return await AuthService.recoverPassword(email)
    },
    async recoverSetPassword(reset_token: string, password: string, password_replay: string) {
      return await AuthService.recoverSetPassword({
        reset_token,
        password,
        password_replay,
      })
    },
  },
})
