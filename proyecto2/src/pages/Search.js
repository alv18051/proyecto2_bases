/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación

 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

 import React, { useState } from 'react';
 import OptionComponent from './OptionComponent'
 import CardComponent from './CardComponent'
 import { Heading, Button, Input, FormControl, Select  } from '@chakra-ui/react';
 import './search.css'


 
 function Search({onCurrentPage}) {
  const [peliculas, setPeliculas] = useState([])
  const [Cercania, setCercania] = useState('')
  const [Emergencia, setEmergencia] = useState('')
  const [Tarifas, setTarifas] = useState('')
  const [Rating, setRating] = useState('')
  const [Cantidad, setCantidad] = useState('')
  
  const getCercania = (Cercania) => {
    setCercania(Cercania)
  }

const getEmergencia = (Emergencia) => {
  setEmergencia(Emergencia)
  }

const getTarifas = (Tarifas) => {
  setTarifas(Tarifas)
  }

const getRating = (Rating) => {
  setRating(Rating)
  }

const getCantidad = (Cantidad) => {
  setCantidad(Cantidad)
  }

const [value, setValue] = React.useState('')
  

  
  
   
  const  handleAdd= () => {
    fetch("http://127.0.0.1:8090/get_peliculas")
    .then(response => response.json)
    .then(result =>{
      console.log(result.data);
      //setPeliculas(result.data)

    })
    .catch(error => {
         alert("Ocurrio un error inesperado: " + error)
    })
  } 

  const handleSubmit = event => {
    event.preventDefault();
    if(Emergencia === 'true'){
      setEmergencia = true;
    } else{
      setEmergencia = false
    }
  

  

  };

  handleAdd();

    const target = event => {
      
      event.preventDefault();
      handleAdd();

    }
   
     return (
      <div className='SearchBackgorund'>
        <div className='SearchOuterContainer container'>
          <div className='SearchInfoContainer'>
            <div className='titleContainer'>
              <Heading className='title'>Filtros</Heading>
            </div>
            
            <form onSubmit={target}>

            <div className='SearchOuterContainer2'>
              
            </div>

          
          
            <Button type='submit' 
              backgroundColor='#ea9a64'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(174, 213, 142)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Aplicar Filtros</Button>
          

            </form>
          </div>
        </div>

        <div className='SearchOuterContainer3 container'>
          <div className='SearchInfoContainer'>
            <div className='titleContainer'>
              <Heading className='title'>Busqueda de veterinarias</Heading>
            </div>
          </div>
          <div className='SearchGridContainer'>
            <Input className='inputS' focusBorderColor='rgb(174 213 142)' placeholder='Ingrese el nombre de una veterinaria'/>
            <Button className='buttonS'
              backgroundColor='#ea9a64'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(174, 213, 142)'}}
              color='#fff'
              grid-column='8'
              grid-row='1'
            >	&#x1F50D; </Button>
          </div>

          <div className='CardsContainer'>
         
            {peliculas.map((peliculas)=>
             <CardComponent title={peliculas.nombre} link={peliculas.link} image = {peliculas.img}/>
            )}
          
            
            <CardComponent title='Veterinaria El Rejo'  link='./Popup' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
            <CardComponent title='Veterinaria La Paz'  link='elpastor.html' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
            <CardComponent title='CEMIVET'  link='elpastor.html' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
            <CardComponent title='VETINSA'  link='elpastor.html' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
            <CardComponent title='Veterinaria El Pastor'  link='elpastor.html' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
            <CardComponent title='Veterinaria La Bendicion'  link='elpastor.html' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
            <CardComponent title='Veterinaria El Cerro'  link='elpastor.html' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
            <CardComponent title='DANA'  link='elpastor.html' image='https://pbs.twimg.com/media/EWH0kEZWsAAWwvI.jpg'/>
          </div>

        </div>




      </div>
     );
   }
   
 export default Search;
   
