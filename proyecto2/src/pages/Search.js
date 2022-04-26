/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación
 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

 import React, { useState, useEffect, Component } from 'react';
 import OptionComponent from './OptionComponent'
 import CardComponent from './CardComponent'
 import InputComponent from './InputComponent'
 import { Heading, Button, Input, FormControl, Select  } from '@chakra-ui/react';
 import './search.css'



 function Search({onCurrentPage}) {

  const [posts, setPosts] = useState([]);

  const [peliculas, setPeliculas] = useState([])
  const [actorestrella, setActor] = useState('')
  const [premio, setPremio] = useState('')
  const [genero, setGenero] = useState('')
  const [nombre, setNombre] = useState('')

  React.useEffect(() => {
    getData(setPosts)
  }, [])

  const getData = (setPosts) => {
    fetch('http://127.0.0.1:8090/start_search')
      .then(response => response.json())
      .then(data => {
        setPosts(data)
      })
      }
  //getData();


  const handleActor= (actor) => {
    fetch("http://127.0.0.1:8090/actor_search", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          actorestrella: actor
        })
    })
    .then(response => response.json())
    .then(data => {
      setPosts(data)       
    })
    .catch(error => {
        alert("Ocurrio un error inesperado: " + error)
    })
  } 

  const getPeliculas = (peliculas) => {
    setPeliculas(peliculas)
  }

  const getActor = (actor) => {
    setActor(actor)
  }

  const getPremio = (premio) => {
    setPremio(premio)
  }

  const getGenero = (genero) => {
    setGenero(genero)
  }

  const getNombre = (name) => {
        setNombre(name)
    }


    const target = event => {
      //alert(`Cercania: ${Cercania} & Especialidad: ${Emergencia} & Tarifas: ${Tarifas} 
      //& Rating: ${Rating} & Cantidad: ${Cantidad} `);
      alert(posts)
      event.preventDefault();
    }
   
     return (

      <div className='SearchBackgorund'>

        <div className='SearchOuterContainer container'>
          <div className='SearchInfoContainer'>
            <div className='titleContainer'>
              <Heading className='title'>Filtros</Heading>
            </div>
            
            <form onSubmit={handleActor} >

            <div className='SearchOuterContainer2'>

            <FormControl>
                <InputComponent getter = {getActor} title='Nombre del actor'  message='Ingresa el nombre aqui' />
              </FormControl>
            <Button type='submit' 
              backgroundColor='#400da0'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(174, 213, 142)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Buscar por nombre de actor</Button>
            </div>
            </form>
            <form onSubmit={target}>
            
            <div className='SearchOuterContainer2'>
            

            <FormControl>
              <InputComponent getter = {getGenero} title='Nombre del genero'  message='Ingresa el nombre aqui' />
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
              <InputComponent getter = {getPremio} title='Nombre del premio'  message='Ingresa el nombre aqui' />
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
            
          </div>

          <div className='CardsContainer'>
            {/*<CardComponent title={post.nombre}  link={post.link} image={post.img}/>*/}
            {
              posts.map(post => {
                return(
                  //<CardComponent className='box' key={post.idcontenido}
                  <div key={post.idcontenido}>
                    <CardComponent title={post.nombre}  link={post.link} image={post.img}/>
                  </div>
                )
              })            
            }

          </div>

        </div>




      </div>
     );
   }

  
   
 export default Search;
   
