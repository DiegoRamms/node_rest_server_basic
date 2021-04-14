const { Router } = require('express')
const { check } = require('express-validator')
const Role = require('../models/role')
const { esRoleValido, emailExist, existeUsuarioPorId } = require('../helpers/db-validator')

const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
} = require('../controllers/user')
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const {esAdminRole, tieneRole} = require('../middlewares/validar-roles')


const router = Router()


router.get('/',usuariosGet)

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre','Obligatorio').not().isEmpty(),
    check('password','El password debe de tener mas de 6 caracteres').isLength({min: 6}),
    check('correo','El correo no es válido').isEmail(),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExist),
    validarCampos
], usuariosPost)

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)


module.exports = router