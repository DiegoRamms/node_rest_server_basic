const { validationResult } = require("express-validator")


const validarCampos = (req, res, next) => {
    const errors  = validationResult(req)
    if(!errors.isEmpty()){
        //status(400)
        return res.json(errors)
    }

    next()
}


module.exports = {
    validarCampos
}