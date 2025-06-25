import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  // Безопасное получение переменной окружения с проверкой на undefined
  let basePath = '/'
  
  try {
    basePath = process?.env?.VITE_BASE_PATH || '/'
  } catch {
    console.warn('process.env недоступен, используется значение по умолчанию /')
    basePath = '/'
  }
  
  return {
    plugins: [react()],
    base: basePath,
    server: {
      host: '0.0.0.0',
      port: 5173,
    }
  }
})
