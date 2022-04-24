/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación
 * 
 * Integrantes:
 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

 const express = require('express')
 const app = express()
 const { Client } = require('pg'); // npm install pg
 const bodyParser = require('body-parser')
 const cors = require('cors'); // npm install cors
 
 app.use(bodyParser.json())
 app.use(cors())
 
const db = new Client({
    host: "localhost",
    database: "proyecto2_db",
    user: "postgres",
    port: 5432,
    password: "bases2022",
    // ssl: {
    //     rejectUnauthorized: false
    // }
})
db.connect();

app.get("/testing", (req, res) => {
    console.log("\nPROBANDO")

    const sql = `
        SELECT * FROM usuario;
        `
    console.log(sql)
    // db.query(sql, (err, row) => {
    //     console.log(row.rows)
    // })
})

app.post("/sort_by_rating", (req, res) => {
    console.log("rating")
    const sql = `
        SELECT name FROM vet
        WHERE emergency LIKE '${req.body.emergency}' AND emergency IS NOT NULL  
        `
    
    console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row)   console.log(row.rows)

        (row) ? res.json({success: true, data:row.rows, exist: row.rows.length}) : res.json({success: false})

    })
})
app.post("/add_user", (req, res) => {
    console.log("AGREGAR USER")

    const sql = `
        INSERT INTO users( correo,user_name, contraseña, planid, fechanacimiento, tarjeta, fechaexp, ccv, nombretitular)
        VALUES('${req.body.correo}','${req.body.user_name}', '${req.body.contraseña}','${req.body.planid}',1999-01-01, '${req.body.tarjeta}',2023-08-01,'${req.body.ccv}', '${req.body.nombretitular}'   , 0);
    `
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false})
    })
})

app.post("/verify", (req, res) => {
    console.log("verificar usuarios")
    const sql = `
        SELECT user_name, password FROM users
        WHERE email ILIKE '${req.body.email}' AND password ILIKE '${req.body.password}' AND type_user LIKE 'user' AND email IS NOT NULL AND password IS NOT NULL;  
        
    
    `
    console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row)   console.log(row.rows)
       
        (row) ? res.json({success: true, data:row.rows, exist: row.rows.length}) : res.json({success: false})
        
    })
})

app.post("/verify_vet", (req, res) => {
    console.log("verificar veterinarios")
    const sql = `
        SELECT email, password FROM users
        WHERE email ILIKE '${req.body.email}' AND password ILIKE '${req.body.password}'AND type_user LIKE 'vet' AND email IS NOT NULL AND password IS NOT NULL;  
        
    
    `
    console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row)   console.log(row.rows)
       
        (row) ? res.json({success: true, data:row.rows, exist: row.rows.length}) : res.json({success: false})
        
    })
})



app.listen(8080, () => {
    console.log('Starting database in the port 8080')
})
