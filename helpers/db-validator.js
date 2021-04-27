const mongoose = require("mongoose")
const categoria = require("../models/categoria")
const Categoria = require("../models/categoria")
const Producto = require("../models/producto")
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

const existeCategoriaPorId = async(id) =>{
    if(mongoose.Types.ObjectId.isValid(id)){
        const existeCategoria = await Categoria.findById(id)
        if(!existeCategoria){
            throw new Error(`No existe la categoria con id: ${id}`)
        }
    }else {
        throw new Error(`El id ${id}no es valido`)
    }

}


const existeProductoPorId = async(id) =>{
    if(mongoose.Types.ObjectId.isValid(id)){
        const existeProducto = await Producto.findById(id)
        if(!existeProducto){
            throw new Error(`No existe el producto con id: ${id}`)
        }
    }else {
        throw new Error(`El id ${id}no es valido`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion)

    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida`)
    }

    return true
}
 
module.exports = {
    esRoleValido,
    emailExist,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}