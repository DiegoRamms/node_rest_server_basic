const { request, response } = require("express")
const {v4: uuidv4} = require('uuid')
const path = require('path')



const subirArchivo = (files , extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '') => {

    return new Promise((resolve,reject) => {
        const {archivo} = files

        const nombreCortado = archivo.name.split('.')
        const extencion = nombreCortado[nombreCortado.length -1]
        
        
        if(!extensionesValidas.includes(extencion)){
            return reject("Extención no valida")
        }
          
        const nombreTemporal = uuidv4()+'.'+extencion
        const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreTemporal)
    
        archivo.mv(uploadPath,(err) => {
            if(err) {
                reject(err)
            }  
            
        })
    
        resolve(nombreTemporal)
    })

    
    
}



module.exports = {subirArchivo}