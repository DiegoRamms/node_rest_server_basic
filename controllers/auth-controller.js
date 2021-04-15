const {response, request} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')
const {googleVerify} = require('../helpers/google-verify')


const login = async(req, res = response) =>{

    const {correo, password} = req.body

    try{
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Si el usuario esta activo
        if(usuario.estado === false){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }

        // Validar passsword
        const validPassword = bcryptjs.compareSync(password,usuario.password)
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT

        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'Login Correcto',
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    

}


const googleSignin = async(req = request, res = response) => {

    const {id_token } = req.body

    
    try{
        const {nombre,correo,img} = await googleVerify( id_token )
        
        //Verificar si correo existe en la bd

        let usuario = await Usuario.findOne({correo})


        if(!usuario){
            const data = {
                nombre,
                correo,
                password1: ':b',
                img,
                google: true
            }

            usuario = new Usuario( data )
            await usuario.save()
        }

        // Si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id)
        
        res.json({
            msg: 'Google signin ok',
            usuario,
            token
        })
    }catch(error){
        res.status(400).json({
            msg: 'Token no reonocido'
        })
    }

    
}



module.exports = {
    login,
    googleSignin
}