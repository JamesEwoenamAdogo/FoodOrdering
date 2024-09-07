import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/storeContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>

   <StoreContextProvider>
    <GoogleOAuthProvider clientId="883137988918-tsja4ss1lg6dctj19hat8nedb6ti09ec.apps.googleusercontent.com">


        <App />

    </GoogleOAuthProvider>

   </StoreContextProvider>
    
    
  </BrowserRouter>
  
)
