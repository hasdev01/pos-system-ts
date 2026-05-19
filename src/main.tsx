import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ModuleProvider } from './context/ModuleContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModuleProvider>
          <App />
        </ModuleProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
