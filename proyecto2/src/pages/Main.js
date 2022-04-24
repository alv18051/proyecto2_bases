/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación

 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

 import React from "react";
 import './landingPage.css';
 import HeaderComponent from "./HeaderComponent";
 
 function Main() {
       
     return (
       <div>
         
           <HeaderComponent className="header"/>
           <div className="textCont">
             <img src='https://w0.peakpx.com/wallpaper/161/542/HD-wallpaper-background-2-jpg-neon-hot-purple-swoosh.jpg'></img>
 
             <div class="text">
               <h2><b>Rent-a-Video</b></h2>
               <h3> <b>Bienvenidos al mejor servicio de peliculas y series de la historia</b></h3>
               <p><b>Ofrecemos:</b></p>
               
               
             </div>
             <div>
               <img src="https://i.imgur.com/H5fuKvW.jpg"></img>
               </div>
           </div>
       </div>
     );
   }
   
 export default Main;