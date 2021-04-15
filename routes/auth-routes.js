const {Router} = require('express')
const {check} = require('express-validator')
const { login, googleSignin } = require('../controllers/auth-controller')
const {validarCampos} = require('../middlewares/validar-campos')

const router = Router()

router.post('/login',
[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
]
,login)


router.post('/goolge',
[
    check('id_token','Token Obligatorio').not().isEmpty(),
    validarCampos
]
,googleSignin)



module.exports = router