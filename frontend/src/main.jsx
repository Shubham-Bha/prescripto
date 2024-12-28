import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import AppContexProvider from './context/context.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContexProvider>
    <App />
  </AppContexProvider>
  </BrowserRouter>,
)
