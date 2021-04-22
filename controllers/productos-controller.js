const { request, response, json } = require("express");
const Producto = require("../models/producto");

// Crear Producto



const crearProducto = async(req = request,res = response) => {
    const {usuario} = req

    const {categoria,precio, ...dataReq} = req.body

    const nombre = dataReq.nombre.toUpperCase()

    const productoDB = await Producto.findOne({nombre})

  
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${nombre}, ya existe`
        })
    }

    const data = {
        nombre,
        categoria,
        precio,
        usuario: usuario._id
    }


    const producto = new Producto(data)

    await producto.save({new: true})
    
    return res.json({
       producto
    })
}


//ObtenerProductos

const obtenerProductos = async(req = request,res = response) =>{
    const {limite = 5,desde = 0}= req.query
    const query = {estado: true}
    const productosTotal = Producto.countDocuments(query)
    const productosBD = Producto
        .find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(desde)
        .limit(limite)

    const [total,productos] = await Promise.all([
        productosTotal,productosBD
    ])

    return res.json({
        total,
        productos
    })
}


//ObtenerProducto

const obtenerProducto = async(req = request, res =response) =>{

    const {id} = req.params
    

    const producto = await Producto
        .findById(id)
        .populate('usuario','nombre')
        .populate('categoria','nombre')

    return res.json({
        producto
    })
}



//ActualizarProducto
const actualizarProducto = async(req = request, res = response) => {
    
    const id = req.params.id

    const nombre = req.body.nombre.toUpperCase()
    const usuario = req.usuario

    const data = {
        nombre: nombre,
        usuario: usuario._id
    }

    const productDB = await Producto.findOne({nombre})

    if(productDB){
        return res.json({
            msg: `El producto ${nombre} ya existe utilice otro`
        })
    }
    const productoActualizado = await Producto.
        findByIdAndUpdate(id,data,{new: true})
        .populate('usuario','nombre')
        .populate('categoria','nombre')

    
    return res.json({
        producto: productoActualizado
    })
}


//Borrar Producto

const borrarProducto = async(req = request, res = response) => {
    
    const id = req.params.id
    const productoBorrado = await Producto.findByIdAndUpdate(id,{estado: false}, {new: true})
    
    return res.json({
        producto: productoBorrado
    })
}



module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}