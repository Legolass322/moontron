import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from 'client/components/App'
import { BrowserRouter } from 'react-router-dom'

import 'client/ui/styles/null.global.scss'
import 'client/ui/styles/tmp.global.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
