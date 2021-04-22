const { Router } = require("express");
const { buscar } = require("../controllers/buscar-controller");
const {validarCampos} = require("../middlewares/validar-campos");


const router = Router()



router.get('/:coleccion/:termino',[
    validarCampos
],buscar)


module.exports = router