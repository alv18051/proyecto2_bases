'''
  Codigo utilizado para el menu de nuestra interfaz, dando opcion a iniciar sesion o crear una cuenta
  y código que contiene todas las funciones utiles implementadas para un incio de sesion en la plataforma
  por Javier Alvarez y Diego Ruiz
'''

import hashlib
import csv
import os

#funcion para escribir un nuevo usuario al csv
def useNewUser(setUser):
  with open('data.csv', 'a') as db:
    writer = csv.writer(db)
    writer.writerow(setUser)

#funcion para buscar el nombre de usuario en la base de datos para evitar duplicados
def useUser(username):
  with open('data.csv', 'r') as db:
    userInfo = csv.reader(db)
    for line in userInfo:
      if line:
        if line[0] == username:
          return bytes.fromhex(line[1]), line[2]
    return 'usuario no registrado'

#funcion para iniciar sesion 
def signin(username, password):
  currentUser = useUser(username)#se verifica usuario
  try:
    salt, code = currentUser 
  except ValueError:
    return currentUser

  newone = hashlib.pbkdf2_hmac(#se verifica la contraseña utilizando una comparacion de códigos
    hash_name='sha256',
    password=str(password).encode('utf-8'),
    salt=salt,
    iterations=100000
    ).hex()

  if code == newone:
    print('Ingreso exitoso')#se devuelve que el ingreso fue exitoso si los codigos son identicos
    return True
  else:
    print('Usuario o contraseña incorrecta, intentelo nuevamente')#regresa un error si existe un error en la comparacion
    return False

def signup(username, password):
  #parte del código utilizado para encriptar la contraseña  
  salt = os.urandom(32)
  code = hashlib.pbkdf2_hmac(
  hash_name='sha256',
  password=str(password).encode('utf-8'),
  salt=salt,
  iterations=100000  
  ).hex()

  try:
    #se comprueba que el usuario no se identico a otro que ya exista
    salt, code = useUser(username)
    return 'EL nombre de usuario ya existe'
  except ValueError:
    #se agrega nuevo usuario a la base de datos
    addUser = [username, salt.hex(), code]
    useNewUser(addUser)
    return 'Usuario agregado'
#creacion de funcion util para el menu
def numEnt():
    correcto = False
    num = 0
    while (correcto != True):
        try:
            num = int(input("Ingrese el número de la opción que desea: "))
            correcto = True
        except ValueError:
            print("No ingreso un numero")
    return num
#seccion de variables
salir = False
opcion = 0
peli_niños = ['despicable me', 'toy story', 'cars', 'monsters inc', 'turning red']
peli_adultos = ['Duro de matar', 'the girl with the dragon tattoo', 'son como niños', 'billy', 'leon the professional']

#menu
while (salir != True):
  print("Bienvenido al menu :")
  print("1. Registrarse")
  print("2. Ingresar")
  print("3. Salir")

  opcion = numEnt()

  if opcion == 1:
    print('\nSign up\n')

    username = input('Nombre de usuario: ')
    password = input('Contraseña: ')
    print(signup(username, password),'\n')
  
  elif opcion == 2:
    print('\nLog in\n')

    username = input('Nombre de usuario: ')
    password = input('Contraseña: ')
    registro_correcto = signin(username, password)
    if registro_correcto == True:
      print('Perfil 1: adulto, perfil 2: niño')
      num = int(input("Ingrese el número del perfil a utilizar: "))
      if num == 1:
        print('Ha ingresado al perfil de adultos')
        print('\n Peliculas: \n')
        print(*peli_adultos, sep ='\n')
        print('Seleccione la pelicula que desea ver: ')
        salir = True
      elif num == 2:
        print('Ha ingresado al perfil de niños')
        print('\n Peliculas: \n')
        print(*peli_niños, sep ='\n')
        print('Seleccione la pelicula que desea ver: ')
        salir = True
      else:
        print('Ingrese un numero valido')
    elif registro_correcto == False: 
      print('\n')


  elif opcion == 3:
    print('\nGracias por utilizar nuestro servicio\n')

    salir =  True 