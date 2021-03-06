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
    fetch('http://127.0.0.1:8090/start_search')
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
  const [tipo, setTipo] = useState('')
  const [admin, setAdmin] = useState('')

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

const getTipo = (tipo) => {
  setTipo(tipo)
}

const getDirector = (director) => {
  setDirector(director)
}

const getCategoria = (categoria) => {
  setCategoria(categoria)
}

const getAdmin = (admin) => {
  setAdmin(admin)
}
const handleAddMovie = (idcontenido, tipo, nombre, categoria, director, actorestrella, link, img) => {
 fetch("http://127.0.0.1:8090/add_new_movie", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                idcontenido: idcontenido,
                tipo: tipo,
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
    fetch("http://127.0.0.1:8090/delete_movie", {
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

  const handleSimulation = (tipo_de_contenido, id_contenido, tiempo_visto, id_usuario, hora_visto, dia_mes, mes) => {
    fetch("http://127.0.0.1:8090/simulacion", {
               method: 'POST',
               headers: {
                   'Content-Type' : 'application/json'
               },
               body: JSON.stringify({
                   tipo_de_contenido:tipo_de_contenido,
                   id_contenido:id_contenido,
                   tiempo_visto:tiempo_visto,
                   id_usuario:id_usuario,
                   hora_visto:hora_visto,
                   dia_mes:dia_mes,
                   mes:mes
               })
           })
           .then(response => response.json())
           .then(result => {
               if(result.success){
                   console.log("Simulacion completada")
               }else{
                   alert("Error con la solicitud")
               }
           })
           .catch(error => {
               alert("Ocurrio un error inesperado: " + error)
           })
       }

       const handleAdminRegister = (admin_name) => {
        fetch("http://127.0.0.1:8090/admin_add", {
                   method: 'POST',
                   headers: {
                       'Content-Type' : 'application/json'
                   },
                   body: JSON.stringify({
                        admin_name:admin_name
                   })
               })
               .then(response => response.json())
               .then(result => {
                   if(result.success){
                       console.log("Agregado a los registros")
                   }else{
                       alert("Error con la solicitud")
                   }
               })
               .catch(error => {
                   alert("Ocurrio un error inesperado: " + error)
               })
           }

      const handleAdminRegister2 = (admin_name) => {
        fetch("http://127.0.0.1:8090/admin_del", {
                   method: 'POST',
                   headers: {
                       'Content-Type' : 'application/json'
                   },
                   body: JSON.stringify({
                        admin_name:admin_name
                   })
               })
               .then(response => response.json())
               .then(result => {
                   if(result.success){
                       console.log("Agregado a los registros")
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
      let id = 12;
      handleAddMovie(id, tipo, nombre, categoria, director, actor, link, img)
      
      event.preventDefault();
    }

    const eliminar = event => {
      //alert(`Cercania: ${Cercania} & Especialidad: ${Emergencia} & Tarifas: ${Tarifas} 
      //& Rating: ${Rating} & Cantidad: ${Cantidad} `);
      handleDeleteMovie(nombre)
      
      event.preventDefault();
    }

    const handleAdmin = event =>{
      event.preventDefault();
      handleAdminRegister(admin)
  }

  const handleAdmin2 = event =>{
    event.preventDefault();
    handleAdminRegister2(admin)
}

const reporteria = event => {
  window.open('http://127.0.0.1:8090/registro_admins')
}

const reporteria2 = event => {
  window.open('http://127.0.0.1:8090/top20')
}

const reporteria3 = event => {
  window.open('http://127.0.0.1:8090/top5seacrhes')
}

    const simulacion = event => {
      let tiempo = 60;
      let x = 0;
      while (x < tiempo){

        let tipo = (Math.floor(Math.random()*2)+1);
        let id = (Math.floor(Math.random()*50)+1);
        let time = (Math.floor(Math.random()*40)+1);
        let user = (Math.floor(Math.random()*50)+1);
        let hora = (Math.floor(Math.random()*23));
        let dia = (Math.floor(Math.random()*30)+1);
        let mes = (Math.floor(Math.random()*12)+1);
        
        x = x + 1;

        handleSimulation(tipo, id, time, user, hora, dia, mes)
      
        event.preventDefault();

      }
      
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

            <InputComponent getter = {getNombre} title='Eliminar pelicula'  message='Ingresa el nombre de la pelicula que desea eliminar' />
            <InputComponent getter = {getAdmin} title='Admin username'  message='Ingresa tu username de administrador' />
                
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

          <form onSubmit={reporteria}>
              <div className='SearchOuterContainer2'>
                <Button type='submit' 
                backgroundColor='#400da0'
                _hover='rgb(174 213 142)'
                _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
                color='#fff'
                width='100%'
                marginTop='10px'   
                >Reporte modificacion admins</Button>
              </div>

            </form>

            <form onSubmit={reporteria3}>
              <div className='SearchOuterContainer2'>
                <Button type='submit' 
                backgroundColor='#400da0'
                _hover='rgb(174 213 142)'
                _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
                color='#fff'
                width='100%'
                marginTop='10px'   
                >Top 5 searches</Button>
              </div>

            </form>

            <form onSubmit={reporteria2}>
              <div className='SearchOuterContainer2'>
                <Button type='submit' 
                backgroundColor='#400da0'
                _hover='rgb(174 213 142)'
                _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
                color='#fff'
                width='100%'
                marginTop='10px'   
                >Reporte top 20</Button>
              </div>

            </form>

            <form onSubmit={simulacion}>
              <div className='SearchOuterContainer2'>
                <Button type='submit' 
                backgroundColor='#400da0'
                _hover='rgb(174 213 142)'
                _active={{bg:'rgb(174 213 142)', borderColor:'rgb(75, 11, 134)'}}
                color='#fff'
                width='100%'
                marginTop='10px'   
                >Simulación</Button>
              </div>

            </form>

          
          <form onSubmit={add}>
          <div className='SearchOuterContainer2'>

          <InputComponent getter = {getNombre} title='Ingresar pelicula'  message='Ingresa el nombre de la pelicula' />
          <InputComponent getter = {getActor} title=''  message='Ingresa el id del actor estrella' />
          <InputComponent getter = {getDirector} title=''  message='Ingresa el id del director' />
          <InputComponent getter = {getCategoria} title=''  message='Ingresa el id de la categoria' />
          <InputComponent getter = {getLink} title=''  message='Ingresa el link' />
          <InputComponent getter = {getImg} title=''  message='Ingresa el link de la imagen' />
          <InputComponent getter = {getTipo} title=''  message='Ingresa el id del genero' />

          <InputComponent getter = {getAdmin} title='Admin username'  message='Ingresa tu username de administrador' />

            
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
            <p className='questionCont'>¿Cambiar a series? <a href='./AdminSeries'> <b className='highlight'>Cambiar</b></a></p>
            <p className='questionCont'>¿Registrar un usuario/admin? <a href='./RegisterAdmin'> <b className='highlight'>Cambiar</b></a></p>
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
   
