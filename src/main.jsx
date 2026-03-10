import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { TenantBrandingProvider } from './context/TenantBrandingContext'

// Импорт конфигурации i18n
import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TenantBrandingProvider>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || ''}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </TenantBrandingProvider>
  </React.StrictMode>,
)
