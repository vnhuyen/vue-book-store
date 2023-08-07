/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_EMAIL: string
  readonly VITE_APP_PASSWORD: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
