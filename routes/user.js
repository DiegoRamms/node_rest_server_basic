const { Router } = require('express')
const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
} = require('../constrollers/user')

const router = Router()


router.get('/',usuariosGet)
router.put('/:id',usuariosPut)
router.post('/',usuariosPost)
router.delete('/',usuariosDelete)


module.exports = router