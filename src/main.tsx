import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './card-fixes.css'
import './editor-fixes.css'
import './delete-modal.css'
import './bulk-fixes.css'
import './stack-fixes.css'
import './excel-fixes.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
