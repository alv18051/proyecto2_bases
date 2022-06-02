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
    host: "ec2-3-234-131-8.compute-1.amazonaws.com",
    database: "dc0e1gmd8brd07",
    user: "owivztahhwwpek",
    port: 5432,
    password: "9a2b2731c22be05736cc6c3cc16157efc4a4b963de2d1c9efa4c6db20230f701",
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
        SELECT * FROM contenido WHERE tipo = '1';
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
        WHERE categoria = '2' AND tipo ILKE '${req.body.tipo}'
        
    
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
        WHERE categoria = '2' AND nombre ILKE '${req.body.nombre}'
        
    
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
        WHERE categoria = '2' AND contenido.actorestrella LIKE'${req.body.actorestrella}' 
        
    
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

app.post("/get_seriesGenero", (req, res) => {
    console.log("series por genero")
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

app.post("/get_seriesNombre", (req, res) => {
    console.log("series por nombre")
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

app.post("/get_seriesActor", (req, res) => {
    console.log("series por actor")
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
        (idcontenido, tipo, nombre, categoria, director, actorestrella, link, img) 
        VALUES ('${req.body.idcontenido}','${req.body.tipo}','${req.body.nombre}', '2', '${req.body.director}', '${req.body.actorestrella}', '${req.body.link}','${req.body.img}'
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
        "DELETE FROM contenido WHERE nombre ILIKE \'" +  nombre + "\';"
    
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false, err: err})
        console.log(res.json)
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

app.post("/simulacion", (req, res) => {
    console.log("\nsimulacion")

    const sql = `   
        INSERT INTO visualizacion 
        (tipo_de_contenido, id_contenido, tiempo_visto, id_usuario, hora_visto, dia_mes, mes ) 
        VALUES ('${req.body.tipo_de_contenido}','${req.body.id_contenido}','${req.body.tiempo_visto}','${req.body.id_usuario}','${req.body.hora_visto}','${req.body.dia_mes}','${req.body.mes}'
        );
        `;
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false, err: err})
    })
})

app.post("/admin_add", (req, res) => {
    console.log("AGREGAR ")

    const sql = `
        INSERT INTO registro_admins( admin_name, registro)
        VALUES('${req.body.admin_name}','cre');

    `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false})
    })
})

app.post("/admin_del", (req, res) => {
    console.log("ELIMINAR")

    const sql = `
        INSERT INTO registro_admins( admin_name, registro)
        VALUES('${req.body.admin_name}','del');

    `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false})
    })
})

app.post("/admin_mod", (req, res) => {
    console.log("MODIFICAR")

    const sql = `
        INSERT INTO registro_admins( admin_name, registro)
        VALUES('${req.body.admin_name}','mod');

    `
    console.log(sql)
    db.query(sql, (err, row) => {
        (row) ? res.json({success: true}) : res.json({success: false})
    })
})

app.get("/registro_admins", (req, res) => {
    //console.log("\nPELICULAS Y SERIES")
    const sql = `
            SELECT * FROM vista_registros 
        `
    //console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row.rowCount)
        res.json(row.rows)
    })
})

app.get("/top20", (req, res) => {
    //console.log("\nPELICULAS Y SERIES")
    const sql = `
            SELECT * FROM top20peliculas_no_terminadas 
        `
    //console.log(sql)
    db.query(sql, (err, row) => {
        //console.log(row.rowCount)
        res.json(row.rows)
    })
})









app.listen(8090, () => {
    console.log('Starting database in the port 8090')
})
