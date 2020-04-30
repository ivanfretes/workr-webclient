var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    nombre : {
        type : String,
        required : true
    },
    apellido : {
        type : String,
        required : true
    },
    username : {
        type : 'String',
        lowercase : true,
        unique : true, 
        required : true,
    },
    
    password : {
        type : 'String',
        required : true,
    },
 
    email : {
        type : 'String',
        default : null,
        minlength : 10, 
        unique : true, 
        maxlength : 100
    },

    // Posibilidad de generar un nuevo token, pero debe ser unique
    token : { 
        type : 'String',
        default : null
    },

    avartar : { 
        type : 'String',
        default : null
    },
 
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _update_at : {
        type : Date,
        default : Date.now()
    }
})


module.exports = mongoose.model('User', UserSchema);