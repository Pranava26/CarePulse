import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { cn } from './lib/utils'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className={cn('min-h-screen bg-dark-300 font-sans antialiased')}>
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
