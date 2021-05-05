const { validationResult } = require("express-validator")


const validarCampos = (req, res, next) => {
    const errors  = validationResult(req)
    if(!errors.isEmpty()){
        //status(400)
        return res.json(
            {
                status: "error",
                code: 2,
                errors
            })
    }

    next()
}


module.exports = {
    validarCampos
}