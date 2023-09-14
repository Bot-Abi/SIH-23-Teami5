import React from "react";
import {Router,Route} from "react-router-dom";
// import Layout from "./Components/Layout";
import { Routes } from "react-router-dom";
import { RouterConfig } from "./Components/navigation/RouterConfig";
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
    <BrowserRouter>
       <RouterConfig />
    </BrowserRouter>
    
  );
}

export default App;
