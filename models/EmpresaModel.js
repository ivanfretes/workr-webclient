const mongoose = require('mongoose');

var EmpresaSchema = new mongoose.Schema({
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
    rubro : [{
        type : String,
    }],
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : {
        type : Date,
        default: Date.now()
    },
})