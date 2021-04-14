const mongoose = require("mongoose")
const Role = require("../models/role")
const Usuario = require("../models/usuario")


const esRoleValido = async(rol  = '') => {
    const existRole = await Role.findOne({rol})
    if(!existRole){
        throw new Error(`El ro ${rol} no esta registrado en la BD`)
    }
}

const emailExist = async(correo = '') => {
    const emailExist = await Usuario.findOne({correo})
    
    if(emailExist){
        throw new Error(`El correo ${correo} ya existe usa otro`)
    }

}

const existeUsuarioPorId = async(id) => {
    
    if(mongoose.Types.ObjectId.isValid(id)){
        const existeUsuario = await Usuario.findById(id)
        
        if(!existeUsuario){
            console.log("Error")
            throw new Error(`El usuario con ${id} no existe`)
        }
    }else {
        throw new Error(`id no ${id} no valido`)
    }
    
}

module.exports = {
    esRoleValido,
    emailExist,
    existeUsuarioPorId
}