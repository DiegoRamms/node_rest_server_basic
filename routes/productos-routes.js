const { Router, response, request } = require("express");
const { check } = require("express-validator");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/productos-controller");
const { existeProductoPorId } = require("../helpers/db-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { route } = require("./auth-routes");




const router = Router()



router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    validarCampos,
]
,crearProducto)


router.get('/',[
    validarCampos
],obtenerProductos)


router.get('/:id',[
    check('id','El id debe de ser valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)


router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarProducto)


router.post('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El id es obligatorio').not().isEmpty(),
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)


module.exports = router