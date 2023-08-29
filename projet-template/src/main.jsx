import React from 'react'
import ReactDOM from 'react-dom/client'
import Connexion from './pages/Connexion'
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css"
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Connexion /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
