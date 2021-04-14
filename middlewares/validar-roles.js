const { response, request } = require("express")
const usuario = require("../models/usuario")


const esAdminRole = (req, res = response, next) =>{

    const usuario = req.usuario
    if(!usuario){
        return res.status(500).json({
            msg: "Se quiere validar el usuario sin Validar Token"
        })
    }

    const {rol, nombre} = usuario

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no tiene permmiso`
        }) 
    }

    next()
}

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        
        const usuario = req.usuario
        if(!usuario){
            return res.status(500).json({
                msg: "Se quiere validar el usuario sin Validar Token"
            })
        }

        let tieneRole = false
        roles.forEach(element => {
            if(element === usuario.rol) tieneRole = true
            
        });

        if(tieneRole === false){
            return res.status(401).json({
                msg: `El usuario ${usuario.nombre} no tiene permmiso any`
            })
        }

        next()
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}