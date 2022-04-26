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
  const [link, setLink] = useState('')
  const [img, setImg] = useState('')
  const [director, setDirector] = useState('')
  const [categoria, setCategoria] = useState('')
  const [nombre, setNombre] = useState('')

  const getNombre = (name) => {
        setNombre(name)
    }

    const getActor = (actor) => {
      setActor(actor)
  }

  const getLink = (link) => {
      setLink(link)
  }
  const getImg = (img) => {
    setImg(img)
}

const getDirector = (director) => {
  setDirector(director)
}

const getCategoria = (categoria) => {
  setCategoria(categoria)
}
const handleAddMovie = (nombre, categoria, director, actorestrella, link, img) => {
 fetch("http://127.0.0.1:8090/add_new_serie", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                categoria:categoria,
                director: director,
                actorestrella: actorestrella,
                link: link,
                img:img
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                alert("Se agrego la pelicula, puede refrescar la pagina para ver los cambios")
            }else{
                alert("Error con la solicitud")
            }
        })
        .catch(error => {
            alert("Ocurrio un error inesperado: " + error)
        })
    }

  const handleDeleteMovie = (nombre) =>{
    fetch("http://127.0.0.1:8090/delete_serie", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                alert("Se elimino la pelicula")
            }else{
                alert("Error con la solicitud")
            }
        })
        .catch(error => {
            alert("Ocurrio un error inesperado: " + error)
        })
    
  }



    const target = event => {
      //alert(`Cercania: ${Cercania} & Especialidad: ${Emergencia} & Tarifas: ${Tarifas} 
      //& Rating: ${Rating} & Cantidad: ${Cantidad} `);
      alert(posts)
      event.preventDefault();
    }

    const add = event => {
      //alert(`Cercania: ${Cercania} & Especialidad: ${Emergencia} & Tarifas: ${Tarifas} 
      //& Rating: ${Rating} & Cantidad: ${Cantidad} `);
      handleAddMovie(nombre, categoria, director, actor, link, img)
      
      event.preventDefault();
    }

    const eliminar = event => {
      //alert(`Cercania: ${Cercania} & Especialidad: ${Emergencia} & Tarifas: ${Tarifas} 
      //& Rating: ${Rating} & Cantidad: ${Cantidad} `);
      handleDeleteMovie(nombre)
      
      event.preventDefault();
    }
   
     return (

      <div className='SearchBackgorund'>

        <div className='SearchOuterContainer container'>
          <div className='SearchInfoContainer'>
            <div className='titleContainer'>
              <Heading className='title'>Filtros</Heading>
            </div>
            
            <form onSubmit={eliminar} >
            
            <div className='SearchOuterContainer2'>

            <InputComponent getter = {getNombre} title='Eliminar Serie'  message='Ingresa el nombre de la serie que desea eliminar' />
                
            <Button type='submit' 
              backgroundColor='#400da0'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Eliminar</Button>
            </div>
          </form>

          
          <form onSubmit={add}>
          <div className='SearchOuterContainer2'>

          <InputComponent getter = {getNombre} title='Ingresar serie'  message='Ingresa el nombre de la serie' />
          <InputComponent getter = {getActor} title=''  message='Ingresa el id del actor estrella' />
          <InputComponent getter = {getDirector} title=''  message='Ingresa el id del director' />
          <InputComponent getter = {getCategoria} title=''  message='Ingresa el id de la categoria' />
          <InputComponent getter = {getLink} title=''  message='Ingresa el link' />
          <InputComponent getter = {getImg} title=''  message='Ingresa el link de la imagen' />

            
            <Button type='submit' 
              backgroundColor='#400da0'
              _hover='rgb(174 213 142)'
              _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
              color='#fff'
              width='100%'
              marginTop='10px'   
            >Añadir</Button>
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
            <p className='questionCont'>¿Cambiar a peliculas? <a href='./Admin'> <b className='highlight'>Cambiar</b></a></p>
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
            
            
            

          </div>

        </div>




      </div>
     );
   }

  
   
 export default Search;
   
