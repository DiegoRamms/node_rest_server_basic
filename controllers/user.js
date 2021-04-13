const { response, request } = require('express')
const bcrypt = require('bcryptjs')


const Usuario = require('../models/usuario')
const { validationResult } = require('express-validator')
const usuario = require('../models/usuario')



const usuariosGet = async(req = request,res = response) =>{
    //const {q,nombre = "no name",apikey} = req.query
    const {limit = 5, since = 0} = req.query

    const usuarios =  Usuario.find({estado : true})
        .skip(Number(since))
        .limit(Number(limit))
        

    const totalUsers = Usuario.countDocuments({estado: true})

    const [total, users] = await Promise.all([
        totalUsers,
        usuarios
    ])

    res.json({
        ok: true,
        total,
        usuarios: users
    })
}


const usuariosPost  = async(req,res = response) => {
   
    

    const {nombre, correo, password, rol} = req.body
    

    
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    const usuario = new Usuario( {nombre, correo, password, rol} )
    usuario.password = bcrypt.hashSync(password,salt)
    
    await usuario.save()

    res.json({
        ok: true,
        usuario

    })
}

const usuariosDelete = async(req = request, res = response) => {

    const {id} = req.params
    const user = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json({
        ok: true,
        user
    })
}

const usuariosPut =  async(req, res = response) => {
    const { id } = req.params
    
    const {_id, password, google, ...resto } = req.body

    //TODO validar contra base de datos

    if(password){
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }

    if(google){
        resto.google = false
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto) 

    res.json({
        ok: true,
        msg: 'put API - controlador',
        usuario
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}