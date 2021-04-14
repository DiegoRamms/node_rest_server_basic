const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') =>{

    return new Promise((resolve,reject) =>{
        const paylod = {uid}

        jwt.sign(paylod,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err)
                reject('No de pudo generar el token')
            }else {
                resolve(token)
            }
        })
    })

}

module.exports = {
    generarJWT
}