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

  React.useEffect(() => {
    getData(setPosts)
  }, [])

  const getData = (setPosts) => {
    fetch('http://127.0.0.1:8090/start_searchS')
      .then(response => response.json())
      .then(data => {
        setPosts(data)
      })
      }
  getData();

  const [peliculas, setPeliculas] = useState([])
  const [actor, setActor] = useState('')
  const [premio, setPremio] = useState('')
  const [genero, setGenero] = useState('')
  const [nombre, setNombre] = useState('')

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
            
            <form onSubmit={target} >

            
          

            <div className='SearchOuterContainer2'>

            <FormControl>
                <label>Nombre del actor</label>
                  <Select placeholder={'-Actor'} focusBorderColor={'rgb(174 213 142)'} onChange ={event => setActor(event.currentTarget.value)}>
                    <option value='1'>Leonardo di Caprio</option>
                    <option value='2'>actor2</option>
                    <option value='3'>actor3</option>
                    <option value='4'>actor4</option>
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
                    <option value='2'>accion</option>
                    <option value='1'>comedia</option>
                    <option value='3'>terror</option>
                    <option value='4'>romance</option>
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
            <InputComponent getter = {getNombre} title='Nombre de la serie'  message='Ingresa el nombre de la serie' />
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

            <p className='questionCont'>¿Cambiar a peliculas? <a href='./Search'> <b className='highlight'>Cambiar</b></a></p>
          </div>
        </div>

        <div className='SearchOuterContainer3 container'>
          <div className='SearchInfoContainer'>
            <div className='titleContainer'>
              <Heading className='title'>Series</Heading>
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
                  
                  //title={post.nombre}  link={post.link} image={post.img}>
                  //</CardComponent> 
                )
              })
            
            
            }
            
            
            {/*<CardComponent title={x[0].nombre}  link={x[0].link} image={x[0].img}/>*/}
            {/*<CardComponent title={x[1].nombre}  link={x[1].link} image={x[1].img}/>*/}

          </div>

        </div>




      </div>
     );
   }

  
   
 export default Search;
   
