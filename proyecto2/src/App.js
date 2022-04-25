/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación
 
 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

// ---------------------------------------------------------------------------------------
// -> Importar los paquetes importantes
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// ---------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------
// -> Importar el resto de las páginas
import Main from "./pages/Main";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Register from "./pages/Register"
import HeaderComponent from "./pages/HeaderComponent";

// ---------------------------------------------------------------------------------------
 
function App() {

  
      
  // -> Por si no se selecciono una de las páginas anteriores ---------------------------
  return (
    <Routes>
    <Route path='/' element={<> <Main/>  </>}></Route>
    <Route path='/login' element={<> <Login/>  </>}></Route>
    <Route path='/register' element={<>  <Register/>  </>}></Route>
    <Route path='/Search' element={<>  <Search/>  </>}></Route>
  </Routes>
  );
}

export default App;
