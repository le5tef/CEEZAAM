import { createRouter, createWebHistory } from 'vue-router'
import { useUiStore } from '@/store'
import { COOKIES, ROUTES_NAMES, ROUTES_PATHS, UI } from '@/constants'
import { useUserStore } from '@/store/user'
import { AuthService } from '@/services'
import Cookies from 'js-cookie'
import { Logger } from '@/utils'

const PageAuth = () => import('@/ui/pages/PageAuth.vue')
const PageAuthVerify = () => import('@/ui/pages/PageAuthVerify.vue')
const PageOnboarding = () => import('@/ui/pages/PageOnboarding.vue')
const PageSettings = () => import('@/ui/pages/PageSettings.vue')
const PageSettingsColors = () => import('@/ui/pages/PageSettingsColors.vue')
const PageEmployees = () => import('@/ui/pages/PageEmployees.vue')
const PageClients = () => import('@/ui/pages/PageClients.vue')
const PageBooking = () => import('@/ui/pages/PageBooking.vue')
const PageServices = () => import('@/ui/pages/PageServices.vue')
const PageReports = () => import('@/ui/pages/PageReports.vue')
const AuthFormLogin = () => import('@/ui/components/auth/AuthFormLogin.vue')
const AuthFormRegistration = () => import('@/ui/components/auth/AuthFormRegistration.vue')
const AuthPasswordRecovery = () => import('@/ui/components/auth/AuthPasswordRecovery.vue')
const AuthSetNewPassword = () => import('@/ui/components/auth/AuthSetNewPassword.vue')
const OnboardingStep1 = () => import('@/ui/components/onboarding/OnboardingStep1.vue')
const OnboardingStep2 = () => import('@/ui/components/onboarding/OnboardingStep2.vue')
const OnboardingStep3 = () => import('@/ui/components/onboarding/OnboardingStep3.vue')
const OnboardingStep4 = () => import('@/ui/components/onboarding/OnboardingStep4.vue')
const Employees = () => import('@/ui/components/employees/Employees.vue')
const ClientsList = () => import('@/ui/components/clients/Clients.vue')
const ClientsCreate = () => import('@/ui/components/clients/ClientsCreate.vue')
const ClientsEdit = () => import('@/ui/components/clients/ClientsEdit.vue')
const ReportsComplex = () => import('@/ui/components/reports/ReportsComplex.vue')
const SettingsBasicInformation = () =>
  import('@/ui/components/settings/SettingsBasicInformation.vue')

const logger = new Logger({ prefix: 'router/index' })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.ROOT,
      name: ROUTES_NAMES.ROOT,
      redirect: ROUTES_PATHS.CLIENTS,
      meta: { heading: 'Главная страница', layout: UI.LAYOUT_DEFAULT },
    },
    {
      path: ROUTES_PATHS.AUTH,
      name: ROUTES_NAMES.AUTH,
      component: PageAuth,
      meta: { layout: UI.LAYOUT_PLAIN, public: true },
      redirect: ROUTES_PATHS.AUTH_LOGIN,
      children: [
        {
          path: ROUTES_PATHS.AUTH_LOGIN,
          name: ROUTES_NAMES.AUTH_LOGIN,
          component: AuthFormLogin,
          meta: { layout: UI.LAYOUT_PLAIN, public: true },
        },
        {
          path: ROUTES_PATHS.AUTH_REGISTER,
          name: ROUTES_NAMES.AUTH_REGISTER,
          component: AuthFormRegistration,
          meta: { layout: UI.LAYOUT_PLAIN, public: true },
        },
        {
          path: ROUTES_PATHS.AUTH_PASS_RESET,
          name: ROUTES_NAMES.AUTH_PASS_RESET,
          component: AuthPasswordRecovery,
          meta: { layout: UI.LAYOUT_PLAIN, public: true },
        },
        {
          path: ROUTES_PATHS.AUTH_PASS_CHANGE,
          name: ROUTES_NAMES.AUTH_PASS_CHANGE,
          component: AuthSetNewPassword,
          meta: { layout: UI.LAYOUT_PLAIN, public: true },
        },
        {
          path: ROUTES_PATHS.AUTH_ACTIVATE_USER,
          name: ROUTES_NAMES.AUTH_ACTIVATE_USER,
          component: PageAuthVerify,
          meta: { layout: UI.LAYOUT_PLAIN, public: true },
        },
      ],
    },
    {
      path: ROUTES_PATHS.ONBOARDING,
      name: ROUTES_NAMES.ONBOARDING,
      component: PageOnboarding,
      redirect: ROUTES_PATHS.ONBOARDING_STEP_1,
      meta: { heading: 'Заполнение профиля' },
      beforeEnter: async (to, from, next) => {
        if (AuthService.isAuthorized()) {
          const userStore = useUserStore()
          await userStore.waitReady()
          if (userStore.user?.is_onboarding_finished) {
            next(ROUTES_PATHS.ROOT)
          } else {
            next()
          }
        } else {
          next(ROUTES_PATHS.AUTH)
        }
      },
      children: [
        {
          path: ROUTES_PATHS.ONBOARDING_STEP_1,
          name: ROUTES_NAMES.ONBOARDING_STEP_1,
          component: OnboardingStep1,
          meta: { heading: 'Заполнение профиля' },
        },
        {
          path: ROUTES_PATHS.ONBOARDING_STEP_2,
          name: ROUTES_NAMES.ONBOARDING_STEP_2,
          component: OnboardingStep2,
          meta: { heading: 'Заполнение профиля' },
        },
        {
          path: ROUTES_PATHS.ONBOARDING_STEP_3,
          name: ROUTES_NAMES.ONBOARDING_STEP_3,
          component: OnboardingStep3,
          meta: { heading: 'Заполнение профиля' },
        },
        {
          path: ROUTES_PATHS.ONBOARDING_STEP_4,
          name: ROUTES_NAMES.ONBOARDING_STEP_4,
          component: OnboardingStep4,
          meta: { heading: 'Заполнение профиля' },
        },
      ],
    },
    {
      path: ROUTES_PATHS.SETTINGS,
      name: ROUTES_NAMES.SETTINGS,
      component: PageSettings,
      redirect: ROUTES_PATHS.SETTINGS_COLORS,
      meta: { layout: UI.LAYOUT_DEFAULT },
      children: [
        {
          path: ROUTES_PATHS.SETTINGS_COLORS,
          name: ROUTES_NAMES.SETTINGS_COLORS,
          component: PageSettingsColors,
          meta: { heading: 'Логотип и цвет' },
        },
        {
          path: ROUTES_PATHS.SETTINGS_INFORMATION,
          name: ROUTES_NAMES.SETTINGS_INFORMATION,
          component: SettingsBasicInformation,
          meta: { heading: 'Основная информация' },
        },
      ],
    },
    {
      path: ROUTES_PATHS.EMPLOYEES,
      name: ROUTES_NAMES.EMPLOYEES,
      component: PageEmployees,
      redirect: ROUTES_PATHS.EMPLOYEES_LIST,
      meta: { layout: UI.LAYOUT_DEFAULT },
      children: [
        {
          path: ROUTES_PATHS.EMPLOYEES_LIST,
          name: ROUTES_NAMES.EMPLOYEES_LIST,
          component: Employees,
          meta: { heading: 'Сотрудники' },
        },
        {
          path: ROUTES_PATHS.EMPLOYEES_SCHEDULE,
          name: ROUTES_NAMES.EMPLOYEES_SCHEDULE,
          component: Employees,
          meta: { heading: 'График' },
        },
        {
          path: ROUTES_PATHS.EMPLOYEES_MOTIVATIONS,
          name: ROUTES_NAMES.EMPLOYEES_MOTIVATIONS,
          component: Employees,
          meta: { heading: 'Мотивация' },
        },
        {
          path: ROUTES_PATHS.EMPLOYEES_PAYROLL,
          name: ROUTES_NAMES.EMPLOYEES_PAYROLL,
          component: Employees,
          meta: { heading: 'Зарплата' },
        },
      ],
    },
    {
      path: ROUTES_PATHS.CLIENTS,
      component: PageClients,
      meta: { layout: UI.LAYOUT_DEFAULT },
      children: [
        {
          path: ROUTES_PATHS.CLIENTS,
          name: ROUTES_NAMES.CLIENTS,
          component: ClientsList,
          meta: { heading: 'Клиенты' },
        },
        {
          path: ROUTES_PATHS.CLIENTS_CREATE,
          name: ROUTES_NAMES.CLIENTS_CREATE,
          component: ClientsCreate,
          meta: { heading: 'Создание клиента' },
        },
        {
          path: ROUTES_PATHS.CLIENTS_EDIT,
          name: ROUTES_NAMES.CLIENTS_EDIT,
          component: ClientsEdit,
          meta: { heading: 'Редактирование клиента' },
        },
      ],
    },
    {
      path: ROUTES_PATHS.SERVICES,
      name: ROUTES_NAMES.SERVICES,
      component: PageServices,
      meta: { layout: UI.LAYOUT_DEFAULT },
    },
    {
      path: ROUTES_PATHS.BOOKING,
      name: ROUTES_NAMES.BOOKING,
      component: PageBooking,
      meta: { layout: UI.LAYOUT_DEFAULT },
    },
    {
      path: ROUTES_PATHS.REPORTS,
      name: ROUTES_NAMES.REPORTS,
      redirect: ROUTES_PATHS.REPORTS_COMPLEX,
      component: PageReports,
      meta: { layout: UI.LAYOUT_DEFAULT },
      children: [
        {
          path: ROUTES_PATHS.REPORTS_COMPLEX,
          name: ROUTES_NAMES.REPORTS_COMPLEX,
          component: ReportsComplex,
          meta: { heading: 'Комплексный отчёт' },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const uiStore = useUiStore()
  const userStore = useUserStore()
  // in case of only query changed but route path is still the same
  // @TODO проверить после подключения авторизации (главная страница не перекидывала на логин)
  // if (to.path === from.path) {
  //   next()
  //   return
  // }

  uiStore.hideAllUiModals()

  // // @TODO убрать как будет работать авторизация
  // next()

  // @TODO вернуть как будет работать авторизация

  await userStore.waitReady()

  const userIsAuthorized = AuthService.isAuthorized()
  const userIsUnauthorizedAndRouteRequiresAuth = !userIsAuthorized && !to.meta.public
  const userIsAuthorizedAndRouteIsLogin = userIsAuthorized && to.path.includes(ROUTES_PATHS.AUTH)
  const userIsAuthAndRouteIsNotOnboardingAndOnboardingIsNotFinished =
    userIsAuthorized &&
    !to.path.includes(ROUTES_PATHS.ONBOARDING) &&
    !userStore.user?.is_onboarding_finished

  if (userIsUnauthorizedAndRouteRequiresAuth) {
    logger.log('userIsUnauthorizedAndRouteRequiresAuth')

    if (to.path.includes(ROUTES_PATHS.AUTH)) {
      Cookies.set(COOKIES.AUTH_REDIRECT, to.fullPath)
      logger.log(`COOKIES.AUTH_REDIRECT set to ${to.fullPath}`)
    }

    next(ROUTES_PATHS.AUTH_LOGIN)
  } else if (userIsAuthorizedAndRouteIsLogin) {
    next(ROUTES_PATHS.ROOT)
    logger.log('userIsAuthorizedAndRouteIsLogin')
  } else if (userIsAuthAndRouteIsNotOnboardingAndOnboardingIsNotFinished) {
    logger.log('userIsAuthAndRouteIsNotOnboardingAndOnboardingIsNotFinished')
    next(ROUTES_PATHS.ONBOARDING)
  } else {
    logger.log(to.fullPath)
    next()
  }
})

export default router
