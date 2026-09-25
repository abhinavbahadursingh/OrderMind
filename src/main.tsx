import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import './styles/ui.css'
import './styles/layout.css'
import './styles/pages.css'
import './styles/stats.css'
import './styles/motion.css'
import App from './App.tsx'
import { initPointerFx } from './lib/pointer-fx'

initPointerFx()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
