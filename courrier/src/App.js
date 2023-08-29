
import React from 'react';
import './App.css';
import Connexion from "./connexion/login";
import Navbar from './connexion/Navbar';
import { RouterProvider } from 'react-router-dom';
import navigation from './navigation';
import IMAGE from './image/index';
import Page from './connexion/secretaire/page';
import '@fontsource/inter';




function App() {
  return (
  <React.Fragment>
      <RouterProvider router={navigation} >
      </RouterProvider>
  </React.Fragment>
  );
}

export default App;
