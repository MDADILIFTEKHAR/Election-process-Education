import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserMemoryProvider } from './contexts/UserMemoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserMemoryProvider>
      <App />
    </UserMemoryProvider>
  </StrictMode>,
)
