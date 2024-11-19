import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import MarketingPage from './MarketingPage.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './SignIn.jsx'
import Inicio from './Inicio.jsx';
import Registro from './registro2.jsx';
import { UserProvider } from './provider/global.jsx';
import Confirmacion from "./confirmacion.jsx";



createRoot(document.getElementById('root')).render(
  <UserProvider>
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MarketingPage />}/>
      <Route path='signin' element={<SignIn />}/>
      <Route path='inicio/*' element={<Inicio />}/>
      <Route path='registro' element={<Registro/>}/>
      <Route path='confirmacion' element={<Confirmacion/>}/>
    </Routes>
    </BrowserRouter>
    
  </StrictMode>
  </UserProvider>,
)
