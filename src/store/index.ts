import { createPinia } from 'pinia'
import { PiniaLogger } from 'pinia-logger'

export const pinia = createPinia()
pinia.use(
  PiniaLogger({
    expanded: false,
    disabled: import.meta.env.mode === 'production',
  })
)

export * from './ui'
export * from './clients'
export * from './company'
export * from './dialog'
export * from './employees'
export * from './onboarding'
export * from './schedule'
export * from './services'
export * from './settings'
export * from './user'
