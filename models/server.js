const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.categoriasPath = '/api/catergorias'
        this.productosPath = '/api/productos'
        this.buscarPath = '/api/buscar'
        this.subirArchivosPath = '/api/uploads'

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

        // Manejar carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth-routes'))
        this.app.use(this.categoriasPath,require('../routes/categorias-routes'))
        this.app.use(this.usuariosPath,require('../routes/user'))
        this.app.use(this.productosPath,require('../routes/productos-routes'))
        this.app.use(this.buscarPath,require('../routes/buscar-routes'))
        this.app.use(this.subirArchivosPath,require('../routes/uploads-routes'))
    }

    listen(){
        this.app.listen(process.env.PORT,() => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}


module.exports = Server