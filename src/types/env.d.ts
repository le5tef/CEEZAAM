/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SZ_STAND: 'local' | 'production'
  readonly VITE_API_URL: string
  readonly VITE_MEDIA_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
