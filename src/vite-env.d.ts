/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string
  readonly BASE_URL: string
  // Добавить другие env переменные по мере необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 