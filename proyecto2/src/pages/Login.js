import React, { useState } from 'react';
import InputComponent from './InputComponent'
import { Heading, Button} from '@chakra-ui/react';
import md5 from "md5";
import './register.css'



const Login = () => {

    const [correo, setCorreo] = useState('')
    const [contra1, setContra1] = useState('')
    

    const getCorreo = (correo) => {
        setCorreo(correo)
    }
    const getContra = (contra) => {
        setContra1(contra)
    }

    

    const handleVerify = (user_name, contrasena) => {
        fetch("http://127.0.0.1:8090/verify", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user_name: user_name,
                contrasena: md5(contrasena)
            })
            
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                
                console.log(result.exist)
                console.log(result.data)
                if(result.exist === 0){
                    alert("Usuario o contraseña no valido")
                    
                }else{
                    alert("Bienvenido")
                    window.open('./Search')
                    
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
        
        handleVerify(correo, contra1);
        
      };

  return (
    <div className='provisionalBackgorund'>
            <div className='outerContainer container' >
                <div className='infoContainer'>
                    <div className='titleContainer'>
                        <Heading className='title'>Iniciar Sesión</Heading>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <InputComponent getter = {getCorreo} title='Username'  message='Ingresa tu usuario' />
                    <InputComponent getter = {getContra} title='Contraseña'  message='Ingresa tu contraseña' />
                    <Button
                            backgroundColor='#400da0'
                            _hover='#ce84dd'
                            _active={{bg:'rgb(75, 11, 134)', borderColor:'rgb(181 142 213)'}}
                            color='#fff'
                            type='submit' 
                            width='100%'
                            marginTop='10px' 
                             
                        >
                            Aceptar
                    </Button>
                    </form>
                    <p className='questionCont'>¿No tienes cuenta? <a href='/Register'><b className='highlight'>¡Registrate!</b></a></p>
                </div>
                <div className='innerContainer'>
                        
                    </div>
            </div>
        </div>
  )
}

export default Login
