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
  
   
const  handleRanking= (emergency) => {
  fetch("http://127.0.0.1:8000/sort_by_rating", {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
          emergency: emergency,

      })

  })
  .then(response => response.json())
  .then(result => {
      if(result.success){

          console.log(result.exist)
          console.log(result.data)
          if(result.exist === 0){
              alert("No se encontraron veterinarias")

          }else{
              //alert("Vet: El trejo")
              console.log('no')


          }
      }else{
          alert("Error con la solicitud")
      }
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
  

  handleRanking(Emergencia);

};



    const target = event => {
      alert(`Cercania: ${Cercania} & Especialidad: ${Emergencia} & Tarifas: ${Tarifas} 
      & Rating: ${Rating} & Cantidad: ${Cantidad} `);
      event.preventDefault();
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
              <FormControl>
                <label>Cercania</label>
                  <Select placeholder={'-Área de busqueda'} focusBorderColor={'rgb(174 213 142)'} onChange ={event => setCercania(event.currentTarget.value)}>
                    <option value='option1'>{'1km'}</option>
                    <option value='option2'>{'2km'}</option>
                    <option value='option3'>{'5km'}</option>
                    <option value='option4'>{'10km'}</option>
                  </Select>
              </FormControl>
            </div>

            <div className='SearchOuterContainer2'>
              <FormControl>
                <label>Emergencia</label>
                  <Select placeholder={'-Representa una emergencia'} focusBorderColor={'rgb(174 213 142)'} onChange ={event => setEmergencia(event.currentTarget.value)}>
                    <option value='true'>{'Si'}</option>
                    <option value='false'>{'No'}</option>
                  </Select>
              </FormControl>
            </div>

            <div className='SearchOuterContainer2'>
              <FormControl>
                <label>Tarifas</label>
                  <Select placeholder={'-Rango de precio'} focusBorderColor={'rgb(174 213 142)'} onChange ={event => setTarifas(event.currentTarget.value)}>
                    <option value='option1'>{'Menos de Q1,000'}</option>
                    <option value='option2'>{'Entre Q1,000 y Q2,499'}</option>
                    <option value='option3'>{'Entre Q2,500 y Q3,999'}</option>
                    <option value='option4'>{'Más de Q4,000'}</option>
                  </Select>
              </FormControl>
            </div>

            <div className='SearchOuterContainer2'>
              <FormControl>
                <label>Rating</label>
                  <Select placeholder={'-Valoración por estrellas'} focusBorderColor={'rgb(174 213 142)'} onChange ={event => setRating(event.currentTarget.value)}>
                    <option value='100'>{'Cualquier valoración'}</option>
                    <option value='100'>{'2 a 3 estrellas'}</option>
                    <option value='100'>{'4 a 5 estrellas'}</option>
                    <option value='100'>{'Únicamente 5 estrellas'}</option>
                  </Select>
              </FormControl>
            </div>

            <div className='SearchOuterContainer2'>
              <FormControl>
                <label>c de veterinarios</label>
                  <Select placeholder={'-No. de veterinarios en turno'} focusBorderColor={'rgb(174 213 142)'} onChange ={event => setCantidad(event.currentTarget.value)}>
                    <option value='option1'>{'1 veterinario'}</option>
                    <option value='option2'>{'2 a 4 veterinarios'}</option>
                    <option value='option3'>{'4 a 6 veterinarios'}</option>
                    <option value='option4'>{'7 o más veterinarios'}</option>
                  </Select>
              </FormControl>
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
   
