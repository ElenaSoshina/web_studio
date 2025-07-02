import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  // Приоритет: VITE_BASE_PATH из окружения -> значение по умолчанию для GitHub Pages -> корень
  let basePath = '/'
  
  try {
    if (process?.env?.VITE_BASE_PATH) {
      basePath = process.env.VITE_BASE_PATH
    } else if (process.env.NODE_ENV === 'production') {
      // Для production без явно указанного пути используем GitHub Pages путь
      basePath = '/web_studio/'
    }
  } catch {
    console.warn('process.env недоступен, используется значение по умолчанию /')
    basePath = '/'
  }

  console.log(`🔧 Vite base path: ${basePath}`)
  
  return {
    plugins: [react()],
    base: basePath,
    server: {
      host: '0.0.0.0',
      port: 5173,
    }
  }
})
