import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ApiKeyManagementPage from './ApiKeyManagementPage'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ApiKeyManagementPage />
  </StrictMode>,
)
