import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from './app/api/UserContext.jsx'
import PatientProvider from './app/api/PatientContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <PatientProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        </BrowserRouter>
      </PatientProvider>
      
    </UserProvider>
    
  </StrictMode>,
)
