const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Conectar a base de datos
        this.conectarDB()
        // Middelwares
        this.middlewares()
        // Rutas Aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        // CORS
        this.app.use(cors())

        // Parseo y lectura del
        this.app.use(express.json())

        // Directorio publico
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/user'))
    }

    listen(){
        this.app.listen(process.env.PORT,() => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}


module.exports = Server