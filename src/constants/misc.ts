export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = !IS_SERVER
export const GLOBAL: Window | any = IS_CLIENT ? window : {} // eslint-disable-line
export const LOADER_REMOVE_TIMEOUT = 400
