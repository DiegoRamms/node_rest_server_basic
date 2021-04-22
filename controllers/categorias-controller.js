const { request, response } = require("express");
const Categoria = require("../models/categoria");



// Obtener Categorias - paginado -total -populate
const obtenerCategorias = async(req = request, res = response) => {
    
    const {since = 0, limit =5} = req.query

    const query = {estado: true}

    const promiseCount = Categoria.countDocuments(query)
    const promiseCategories =  Categoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(since)).
        limit(Number(limit))


    const [total, categorias] = await Promise.all([
        promiseCount,
        promiseCategories
    ])

    res.json({
        total,
        categorias
    })
}



// Obtener Categoria - populate

const obtenerCategoria = async(req = request, res = response) => {
    const {id} = req.params
    
    const categoriaDB = await Categoria.findById(id)

    res.json({
        categoriaDB
    })

}


const crearCategoria = async(req = request,res = response) => {
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    // Guardar categoria
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    await categoria.save()

    res.status(201).json(categoria)

}

// Actualizar Categoria

const actualizarCategoria = async(req = request, res = response) => {
    
    const {id} = req.params
    const {estado, usuario, ...data} = req.body
 
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id
    
    const categoriaBD = await Categoria.findOne({nombre: data.nombre})

    let categoria 
    if(!categoriaBD){
        categoria = await Categoria.findByIdAndUpdate(id,data,{new: true})
    }else{
        return res.json({
            msg: `La categoria ${data.nombre} ya existe`
        })
    }
 
    

    

    res.json({
        categoria
    })
}


//Inhabilitar Categoria

const borrarCategoria = async (req = request, res= response) => {

    const id = req.params.id

    const usuario = req.usuario._id

    const data = {
        estado: false,
        usuario
    }

    const categoriaBD = await Categoria.findByIdAndUpdate(id,data,{new: true})

    res.json({
        caategoria: categoriaBD
    })

}




module.exports = {
    obtenerCategoria,
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}