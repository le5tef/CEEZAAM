interface IRoutesPaths {
  ROOT: string
  AUTH: string
  AUTH_LOGIN: string
  AUTH_REGISTER: string
  AUTH_PASS_RESET: string
  AUTH_PASS_CHANGE: string
  AUTH_ACTIVATE_USER: string
  ONBOARDING: string
  ONBOARDING_STEP_1: string
  ONBOARDING_STEP_2: string
  ONBOARDING_STEP_3: string
  ONBOARDING_STEP_4: string
  SETTINGS: string
  SETTINGS_COLORS: string
  SETTINGS_INFORMATION: string
  EMPLOYEES: string
  EMPLOYEES_LIST: string
  EMPLOYEES_SCHEDULE: string
  EMPLOYEES_MOTIVATIONS: string
  EMPLOYEES_PAYROLL: string
  CLIENTS: string
  CLIENTS_CREATE: string
  CLIENTS_EDIT: string
  SERVICES: string
  BOOKING: string
  REPORTS: string
  REPORTS_COMPLEX: string
}

const AUTH = '/auth'
const ONBOARDING = '/start'
const SETTINGS = '/settings'
const EMPLOYEES = '/employees'
const CLIENTS = '/clients'
const SERVICES = '/services'
const BOOKING = '/booking'
const REPORTS = '/reports'

export const ROUTES_PATHS: IRoutesPaths = Object.freeze({
  ROOT: '/',
  AUTH,
  AUTH_LOGIN: `${AUTH}/login`,
  AUTH_REGISTER: `${AUTH}/register`,
  AUTH_PASS_RESET: `${AUTH}/reset`,
  AUTH_PASS_CHANGE: `${AUTH}/recovery/:token`,
  AUTH_ACTIVATE_USER: `${AUTH}/verify/:token`,
  ONBOARDING,
  ONBOARDING_STEP_1: `${ONBOARDING}/1`,
  ONBOARDING_STEP_2: `${ONBOARDING}/2`,
  ONBOARDING_STEP_3: `${ONBOARDING}/3`,
  ONBOARDING_STEP_4: `${ONBOARDING}/4`,
  SETTINGS,
  SETTINGS_COLORS: `${SETTINGS}/colors`,
  SETTINGS_INFORMATION: `${SETTINGS}/information`,
  EMPLOYEES,
  EMPLOYEES_LIST: `${EMPLOYEES}/list`,
  EMPLOYEES_SCHEDULE: `${EMPLOYEES}/schedule`,
  EMPLOYEES_MOTIVATIONS: `${EMPLOYEES}/motivations`,
  EMPLOYEES_PAYROLL: `${EMPLOYEES}/payroll`,
  CLIENTS,
  CLIENTS_CREATE: `${CLIENTS}/create/`,
  CLIENTS_EDIT: `${CLIENTS}/edit/:id`,
  SERVICES,
  BOOKING,
  REPORTS,
  REPORTS_COMPLEX: `${REPORTS}/complex/`,
})

/*
  ROUTES_NAMES - объект полность зависимый от ROUTES_PATHS, где
  и ключём, и значением каждого элемента является строка с названием
  переменной роута, например { ROOT: 'ROOT', ERROR_AUTH: 'ERROR_AUTH' } и так далее
  по списку ключей ROUTES_PATHS. Это затем, что бы не придумывать
  и не писать имена роутов руками - они всегда совпадают с названием
  соответствующего ROUTES_PATHS.ИМЯ_РОУТА
*/
export const ROUTES_NAMES: IRoutesPaths = Object.freeze(
  Object.keys(ROUTES_PATHS).reduce((acc, key) => {
    acc[key] = key

    return acc
  }, {} as any) as IRoutesPaths // eslint-disable-line
)
