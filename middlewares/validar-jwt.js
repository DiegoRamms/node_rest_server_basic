const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request,res = response, next) => {
    const token = req.header('x-token')
   
    if(!token){
        return res.status(401).json({
            msg: 'No Autorizado'
        })
    }

    try{
        const {uid} =jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        
        //Buscar Usuario
        const usuario = await Usuario.findById(uid)
        req.usuario = usuario

        //Si el usuario no existe
        if(!usuario){
            return res.status(401).json({
                msg:'Token no válido ------'
            })
        }

        // Si esta en dalso el estado returnar error
        if(usuario.estado == false){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }
        next()
    }catch(error){
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

   
   

}


module.exports = {
    validarJWT
}