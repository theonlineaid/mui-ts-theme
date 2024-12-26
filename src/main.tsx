import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SettingsProvider from './contexts/SettingsContext.tsx'
import ThemeProvider from './theme/index.tsx'
import ThemeSettings from './components/settings/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <ThemeSettings>
          <App />
        </ThemeSettings>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>,
)
