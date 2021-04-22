const {Router, request, response} = require('express')
const {check} = require('express-validator')

const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria} = require('../controllers/categorias-controller')
const { existeCategoriaPorId } = require('../helpers/db-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRole } = require('../middlewares/validar-roles')


const router = Router()

/**
 * /api/Categorias
 */

 // Obtener todas las categorias - publico
router.get('/',[
    validarCampos
],obtenerCategorias)

// Obtener una categoria por id - publico
router.get("/:id",[
    check('id','No es un id Validoo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
    ]
    ,obtenerCategoria)

// Crear una categoria - privado .cualquier persona con un token válido
router.post("/",[
    validarJWT,
    check('nombre','El nomnre es obligatorio').not().isEmpty(),
    validarCampos
        
]
, crearCategoria)

// Actualizar  -privado - cualquiera con token válido
router.put("/:id",[
    validarJWT,
    check('nombre',"Error no hay nombre").not().isEmpty(),
    check('id').not().isEmpty(),
    check('id','No es un id Validoo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],
actualizarCategoria)

// Borrar una categoria - Admin
router.delete("/:id", [
    validarJWT,
    esAdminRole,
    check('id').not().isEmpty(),
    check('id','No es un id Validoo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos],
    borrarCategoria)



module.exports = router


