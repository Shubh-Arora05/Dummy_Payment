import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx' ;
import './App.css'
import {UserProvider} from "./Context/store.jsx"
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
  <UserProvider>
  <StrictMode>
  
    <App />
    </StrictMode>
    
    </UserProvider>
    </SnackbarProvider>
   
)
    
  
