import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { I18nProvider } from './i18n/I18nContext'
import { SettingsProvider } from './settings/SettingsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
