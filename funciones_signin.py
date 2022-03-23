import hashlib
import csv
import os

def useNewUser(setUser):
  with open('data.csv', 'a') as db:
    writer = csv.writer(db)
    writer.writerow(setUser)

def useUser(username):
  with open('data.csv', 'r') as db:
    userInfo = csv.reader(db)
    for line in userInfo:
      if line:
        if line[0] == username:
          return bytes.fromhex(line[1]), line[2]
    return 'usuario no registrado'

def signin(username, password):
  currentUser = useUser(username)
  try:
    salt, code = currentUser
  except ValueError:
    return currentUser

  newone = hashlib.pbkdf2_hmac(
    hash_name='sha256',
    password=str(password).encode('utf-8'),
    salt=salt,
    iterations=100000
    ).hex()

  if code == newone:
    return 'Ingreso exitoso'
  else:
    return 'Usuario o contraseña incorrecta, intentelo nuevamente'

def signup(username, password):
  salt = os.urandom(32)
  code = hashlib.pbkdf2_hmac(
  hash_name='sha256',
  password=str(password).encode('utf-8'),
  salt=salt,
  iterations=100000  
  ).hex()

  try:
    salt, code = useUser(username)
    return 'EL nombre de usuario ya existe'
  except ValueError:
    addUser = [username, salt.hex(), code]
    useNewUser(addUser)
    return 'Usuario agregado'

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

salir = False
opcion = 0

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
    print(signup(username, password))
  
  elif opcion == 2:
    print('\nLog in\n')

    username = input('Nombre de usuario: ')
    password = input('Contraseña: ')
    print(signin(username, password))

  elif opcion == 3:
    print('\nGracias por utilizar nuestro servicio\n')

    salir =  True 