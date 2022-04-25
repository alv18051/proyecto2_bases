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
    host: "ec2-3-229-252-6.compute-1.amazonaws.com",
    database: "d2oahsu1323u6q",
    user: "ajnkeybcwaeqmb",
    port: 5432,
    password: "e3668f80647ecc76901eed184548965557fa3f88ae5d7069f7f26a33a4996017",
     ssl: {
         rejectUnauthorized: false
     }
})
db.connect();

app.get("/testing", (req, res) => {
    console.log("\nPROBANDO")

    const sql = `
        SELECT * FROM usuario;
        `
    console.log(sql)
     db.query(sql, (err, row) => {
         console.log(row.rows)
     })
})

app.get("/get_peliculas", (req, res) => {
    console.log("\npeliculas")

    const sql = `
        SELECT * FROM contenido WHERE tipo ILIKE '1';
        `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true, data: row.rows }) : res.json({success: false, err: err})
    })
})

app.get("/get_series", (req, res) => {
    console.log("\nseries")

    const sql = `
        SELECT * FROM contenido WHERE tipo ILIKE '2';
        `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true, data: row.rows }) : res.json({success: false, err: err})
    })
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
        INSERT INTO usuario( userid,correo,user_name, contrasena, planid, fechanacimiento, tarjeta, fechaexp, ccv, nombretitular)
        VALUES('${req.body.userid}','${req.body.correo}','${req.body.user_name}', '${req.body.contrasena}','${req.body.planid}','1999-01-01', '${req.body.tarjeta}','2023-08-01','${req.body.ccv}', '${req.body.nombretitular}' );

    `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false})
    })
})

app.post("/verify", (req, res) => {
    console.log("verificar usuarios")
    const sql = `
        SELECT user_name, contrasena FROM usuario
        WHERE user_name LIKE '${req.body.user_name}' AND contrasena LIKE '${req.body.contrasena}' AND user_name IS NOT NULL AND contrasena IS NOT NULL;  
        
    
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



app.listen(8090, () => {
    console.log('Starting database in the port 8090')
})
