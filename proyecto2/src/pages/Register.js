import React, { useState } from 'react';
import InputComponent from './InputComponent'
import { Heading, Button, FormControl, Select} from '@chakra-ui/react';
import md5 from "md5";
import './register.css';


const Register = () => {

    const [nombre, setNombre] = useState('')
    const [user, setUser] = useState('')
    const [correo, setCorreo] = useState('')
    const [contra1, setContra1] = useState('')
    const [contra2, setContra2] = useState('')
    const [perfil, setPerfil] = useState('')
    const [tarjeta, setTarjeta] = useState('')
    const [ccv, setCcv] = useState('')

    const handleRegister = (correo, user_name, contrasena,planid,tarjeta,ccv,nombretitular ) => {
        
        fetch("http://127.0.0.1:8090/evit_repeat_user", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user_name: user_name,
            })
        })
        .then(response => response.json())
        .then(result => {        
            if(result.success){
                if(result.exist === 0){
                    fetch("http://127.0.0.1:8090/add_user", {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify({
                            user_name: user_name,
                            correo: correo,
                            contrasena: md5(contrasena),
                            planid: planid,
                            tarjeta:tarjeta,
                            ccv:ccv,
                            nombretitular: nombretitular
                        })
                    })
                    .then(response => response.json())
                    .then(result => {
                        if(result.success){
                            alert("Se agrego el user")
                        }else{
                            alert("Error con la solicitud")
                        }
                    })
                    .catch(error => {
                        alert("Ocurrio un error inesperado: " + error)
                    })
                }
                else{
                    alert("Nombre de usuario no valido, porfavor ingrese otro nombre de usuario")
                }
            }
            else{
                alert("Ocurrio un error inesperado")
            }
        })
        .catch(error => {
            console.log("ERROR :(" + error)
        })        

    }


    const handleSubmit = event => {
        event.preventDefault();
        if(contra1 === contra2){
            //alert(`user: ${user} & corre: ${correo} & planid: ${perfil} & contraseña: ${contra1} & tarjeta: ${tarjeta} & ccv: ${ccv} `);
            handleRegister(correo,user,contra1,perfil,tarjeta,ccv,nombre);

        }else{
            alert('no coinciden las contraseñas, vuelva a intentarlo')
        }
      };

    const getNombre = (name) => {
        setNombre(name)
    }

   
    const getUser = (user) => {
        setUser(user)
    }
    const getCorreo = (correo) => {
        setCorreo(correo)
    }
    const getContra = (contra) => {
        setContra1(contra)
    }
    const getContras = (contras) => {
        setContra2(contras)
    }

    const getTarjeta = (tarjeta) => {
        setTarjeta(tarjeta)
    }
 
    const getCcv = (ccv) => {
        setCcv(ccv)
    }

  

  return (
    <div className='provisionalBackgorund'>
            <div className='outerContainer container' >
                <div className='infoContainer'>
                    <div className='titleContainer'>
                        <Heading className='title'>Registro</Heading>
                    </div>
                    <form onSubmit={handleSubmit}>
                    
                    
                    <InputComponent getter = {getUser} title='Nombre de usuario'  message='Ingresa tu nombre de usuario' />
                    <InputComponent getter = {getCorreo} title='Correo'  message='Ingresa tu correo' />
                    <InputComponent getter = {getContra} title='Contraseña'  message='Ingresa tu contraseña' />
                    <InputComponent getter = {getContras} title='Cofirmar contraseña' message='Confirma tu contraseña' />
                    <FormControl>
                        <label><b>Perfil</b></label>
                            <Select placeholder={'Escoge tu perfil'} focusBorderColor={'rgb(75, 11, 134)'} onChange ={event => setPerfil(event.currentTarget.value)}>
                                <option value= {1}>Casual</option>
                                <option value={2}>Fan</option>
                                <option value={3}>Mega Fan</option>
                            </Select>
                    </FormControl>
                    <InputComponent getter = {getNombre} title='Nombre'  message='Ingresa tu nombre' />
                    <InputComponent getter = {getTarjeta} title='Tarjeta'  message='Ingresa tu tarjeta (ingresa 0 si eres usuario gratis)' />
                    <InputComponent getter = {getCcv} title='CCV'  message='Ingresa tu CCV (ingresa 0 si eres usuario gratis)' />
                    
                    <Button
                            backgroundColor='#400da0'
                            _hover='#ce84dd'
                            _active={{bg:'rgb(75, 11, 134)', borderColor:'rgb(75, 11, 134)'}}
                            color='#fff'
                            type='submit' 
                            width='100%'
                            marginTop='10px' 
                             
                        >
                            Aceptar
                    </Button>
                    </form>

                    <p className='questionCont'>¿Ya tienes cuenta? <a href='./Login'> <b className='highlight'>Iniciar sesión</b></a></p>
                    <p className='questionCont'>Regresar? <a href='#'> <b className='highlight'>Regresar</b></a></p>
                </div>

                <div className='innerContainer'>
                        
                    </div>
            </div>
        </div>
  )

  
}

export default Register
