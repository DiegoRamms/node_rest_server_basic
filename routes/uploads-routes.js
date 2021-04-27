const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloud } = require("../controllers/uploads-controller");
const {validarCampos} = require("../middlewares/validar-campos");
const {coleccionesPermitidas} = require("../helpers/db-validator");
const { validarArchivoSubir } = require("../middlewares/validar-archivos");
const { route } = require("./auth-routes");


const router = Router()

router.post('/',[
    validarArchivoSubir,
    validarCampos
],cargarArchivos)


router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id',"El id debe de ser de Mongo").isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloud)

router.get('/:coleccion/:id',[
    check('id',"El id debe de ser de Mongo").isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)


module.exports = router