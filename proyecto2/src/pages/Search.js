/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación

 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

 import React, { useState } from 'react';
 import OptionComponent from './OptionComponent'
 import CardComponent from './CardComponent'
 import InputComponent from './InputComponent'
 import { Heading, Button, Input, FormControl, Select  } from '@chakra-ui/react';
 import './search.css'


 
 function Search({onCurrentPage}) {
  const [peliculas, setPeliculas] = useState([])
  const [actor, setActor] = useState('')
  const [premio, setPremio] = useState('')
  const [genero, setGenero] = useState('')
  const [nombre, setNombre] = useState('')

  const getNombre = (name) => {
        setNombre(name)
    }
  
  
   
  const  handleAdd= () => {
    fetch("http://127.0.0.1:8090/get_peliculas")
    .then(response => response.json)
    .then(result =>{
      console.log(result.data);
      setPeliculas(result.data)

    })
    .catch(error => {
         alert("Ocurrio un error inesperado: " + error)
    })
  }  
  

  handleAdd();

      const target = event => {
      
        event.preventDefault();
        handleAdd();

        };
   
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
                <label>Nombre del actor</label>
                  <Select placeholder={'-Actor'} focusBorderColor={'rgb(174 213 142)'} onChange ={event => setActor(event.currentTarget.value)}>
                    <option value='Leonardo di Caprio'>Leonardo di Caprio</option>
                    <option value='option2'>actor2</option>
                    <option value='option3'>actor3</option>
                    <option value='option4'>actor4</option>
                    <option></option>
                  </Select>
              </FormControl>
            <Button type='submit' 
              backgroundColor='#400da0'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(174, 213, 142)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Buscar por actor</Button>
            </div>
            </form>
            <form onSubmit={target}>
            
            <div className='SearchOuterContainer2'>
            

            <FormControl>
                <label>Nombre del genero</label>
                  <Select placeholder={'-Genero'} focusBorderColor={'rgb(75, 11, 134)'} onChange ={event => setGenero(event.currentTarget.value)}>
                    <option value='accion'>accion</option>
                    <option value='comedia'>comedia</option>
                    <option value='romance'>romance</option>
                    <option value='documental'>documental</option>
                    <option></option>
                  </Select>
              </FormControl>
            <Button type='submit' 
              backgroundColor='#400da0'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Buscar por genero</Button>
            </div>
            </form>

            <form onSubmit={target}>
          <div className='SearchOuterContainer2'>

            <FormControl>
                <label>Nombre del premio</label>
                  <Select placeholder={'-Premio'} focusBorderColor={'rgb(75, 11, 134)'} onChange ={event => setPremio(event.currentTarget.value)}>
                    <option value='oscar'>Oscar</option>
                    <option value='globo de oro'>Globo de oro</option>
                    <option></option>
                  </Select>
              </FormControl>
            <Button type='submit' 
              backgroundColor='#400da0'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Buscar por premio</Button>
            </div>
            </form>
            <form onSubmit={target}>
            <div className='SearchOuterContainer2'>
            <InputComponent getter = {getNombre} title='Nombre de la pelicula'  message='Ingresa el nombre de la pelicula' />
            <Button type='submit' 
              backgroundColor='#400da0'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Buscar por nombre</Button>
            </div>
            

            </form>
          </div>
        </div>

        <div className='SearchOuterContainer3 container'>
          <div className='SearchInfoContainer'>
            <div className='titleContainer'>
              <Heading className='title'>Peliculas</Heading>
            </div>
          </div>
          <div className='SearchGridContainer'>
            <Input className='inputS' focusBorderColor='rgb(75, 11, 134)' placeholder='Ingrese el nombre de una veterinaria'/>
            <Button className='buttonS'
              backgroundColor='#ea9a64'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
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
      )};
   
   
 export default Search;
   
