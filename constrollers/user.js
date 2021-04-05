const { response, request } = require('express')

const usuariosGet = (req = request,res = response) =>{
    const {q,nombre = "no name",apikey} = req.query
    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    })
}


const usuariosPost  = (req,res = response) => {
    const {nombre,edad} = req.body
    res.json({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad

    })
}

const usuariosDelete = (req , res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    })
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}