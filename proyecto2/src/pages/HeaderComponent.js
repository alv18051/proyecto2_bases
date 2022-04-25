/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación

 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

import '../styles/index.css'
import { Link, useNavigate } from "react-router-dom";

 function HeaderComponent({setCurrentPage}) {

     return (

      <>
      <nav className="header">
         <Link to={"/"}> <h1 className="logo"><b>Rent-A-Video</b></h1> </Link>

         <ul className="header-right">  
         <li className="option active btn">
            <Link to={"/Register"}>Registrarse</Link>
           </li>  

        <li className="option btn">
            <Link to={"/login"}>Iniciar sesión</Link>
        </li>

        <li className="search btn">
            <Link to={"/Admin"}></Link>
        </li>

         </ul>
       </nav>
       
         </>

     );
   }
   
 export default HeaderComponent;
   