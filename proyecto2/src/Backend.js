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
        SELECT * FROM contenido WHERE tipo LIKE '1';
        `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true, data: row.rows }) : res.json({success: false, err: err})
    })
})

app.post("/get_peliculasGenero", (req, res) => {
    console.log("peliculas por genero")
    const sql = `
        SELECT nombre, link , img, tipo o FROM contenido 
        WHERE categoria = '1' AND tipo ILKE '${req.body.tipo}'
        
    
    `
    console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row)   console.log(row.rows)
       
        (row) ? res.json({success: true, data:row.rows, exist: row.rows.length}) : res.json({success: false})
        
    })
})

app.post("/get_peliculasNombre", (req, res) => {
    console.log("peliculas por nombre")
    const sql = `
        SELECT nombre, link , img, tipo o FROM contenido 
        WHERE categoria = '1' AND nombre ILKE '${req.body.nombre}'
        
    
    `
    console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row)   console.log(row.rows)
       
        (row) ? res.json({success: true, data:row.rows, exist: row.rows.length}) : res.json({success: false})
        
    })
})

app.post("/get_peliculasActor", (req, res) => {
    console.log("peliculas por actor")
    const sql = `
        SELECT nombre, link , img, tipo o FROM contenido 
        INNER JOIN actorestrella ON actorestrella.actorid = contenido.actorestrella
        WHERE categoria = '1' AND contenido.actorestrella LIKE'${req.body.actorestrella}' 
        
    
    `
    console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row)   console.log(row.rows)
       
        (row) ? res.json({success: true, data:row.rows, exist: row.rows.length}) : res.json({success: false})
        
    })
})

app.get("/get_series", (req, res) => {
    console.log("\nseries")

    const sql = `
        SELECT * FROM contenido WHERE categoria = '2';
        `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true, data: row.rows }) : res.json({success: false, err: err})
    })
})


app.post("/add_user", (req, res) => {
    console.log("AGREGAR USER")

    const sql = `
        INSERT INTO usuario( correo,user_name, contrasena, planid, fechanacimiento, tarjeta, fechaexp, ccv, nombretitular)
        VALUES('${req.body.correo}','${req.body.user_name}', '${req.body.contrasena}','${req.body.planid}','1999-01-01', '${req.body.tarjeta}','2023-08-01','${req.body.ccv}', '${req.body.nombretitular}' );

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

app.post("/verifyAdmin", (req, res) => {
    console.log("verificar admin")
    const sql = `
        SELECT user_name, contrasena FROM usuario
        WHERE user_name LIKE '${req.body.user_name}' AND contrasena LIKE '${req.body.contrasena}' AND user_name IS NOT NULL AND contrasena IS NOT NULL AND planid = '4';  
        
    
    `
    console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row)   console.log(row.rows)
       
        (row) ? res.json({success: true, data:row.rows, exist: row.rows.length}) : res.json({success: false})
        
    })
})

app.post('/evit_repeat_user', (req, res) => {
    console.log("\nVerificar que no se repita el user_name")

    const sql = "SELECT user_name FROM usuario WHERE user_name = '"+ req.body.user_name +"';"
    console.log(sql)
    db.query(sql, (err, row) => {
        if(row){                        
            res.json({ success: true, exist: row.rows.length})
        }
        else{
            console.log("Error: " + err)
            res.json({ success: false })
        }        
    })
 })

 app.get("/start_search", (req, res) => {
    //console.log("\nPELICULAS Y SERIES")
    const sql = `
        SELECT idcontenido, nombre, link, img FROM contenido WHERE categoria = 2
        `
    //console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row.rowCount)
        res.json(row.rows)
    })
})

app.get("/start_searchS", (req, res) => {
    //console.log("\nPELICULAS Y SERIES")
    const sql = `
        SELECT idcontenido, nombre, link, img FROM contenido  WHERE categoria = '1'
        `
    //console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row.rowCount)
        res.json(row.rows)
    })
})

/*
-------------------------------------------------------------------------------------------------
Funciones de admin
-------------------------------------------------------------------------------------------------
*/

app.post("/add_new_movie", (req, res) => {
    console.log("\nagregar nueva pelicula")

    const sql = `   
        INSERT INTO contenido 
        (tipo, nombre, categoria, director, actorestrella, link, img) 
        VALUES ('${req.body.tipo}','${req.body.nombre}', '2', '${req.body.director}', '${req.body.actorestrella}', '${req.body.link}','${req.body.img}'
        );
        `;
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false, err: err})
    })
})

app.post("/add_new_serie", (req, res) => {
    console.log("\nagregar nueva serie")

    const sql = `   
        INSERT INTO contenido 
        (tipo, nombre, categoria, director, actorestrella, link, img) 
        VALUES ('${req.body.tipo}','${req.body.nombre}', '1', '${req.body.director}', '${req.body.actorestrella}', '${req.body.link}','${req.body.img}'
        );
        `;
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false, err: err})
    })
})

app.post("/delete_movie", (req, res) => {
    console.log("\borrar pelicula")

    const nombre = req.body.nombre
    
    const sql = 
        "DELETE FROM contenido WHERE nombre = " +  nombre + ";"
    
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false, err: err})
    })
})

app.post("/delete_serie", (req, res) => {
    console.log("\borrar serie")

    const nombre = req.body.nombre
    
    const sql = 
        "DELETE FROM contenido WHERE nombre = " +  nombre + ";"
    
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false, err: err})
    })
})







app.listen(8090, () => {
    console.log('Starting database in the port 8090')
})
