const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    nombre : String, 
    slogan : String,
    descripcion : {
        maxlength : 1000,
        minlength : 100,
        type : Text    
    },
    cant_empleados : Number,
    logo : {
        type : String, 
        default : null
    },
    rubro : {
        type : [String],
    },
    redes_sociales : {
        facebook : {
            type: String
        },
        twitter : {
            type : String
        }, 


    },
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : {
        type : Date,
        default: Date.now()
    },
})


module.exports = mongoose.model('Empresa', EmpresaSchema);