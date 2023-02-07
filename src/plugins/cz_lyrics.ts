import type { App } from 'vue'

const lyrics = {
  select: {
    defaultPlaceholder: 'Выбрать',
  },
}

export const CeezaamLyrics = {
  install(app: App) {
    app.config.globalProperties.$czLyrics = (key: string): string => {
      // @ts-ignore
      return key.split('.').reduce((pre, curr) => pre[curr], lyrics)
    }
  },
}
