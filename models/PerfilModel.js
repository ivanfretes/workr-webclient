var mongoose = require('mongoose');

var PerfilSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        unique : true
    },
    foto : { 
        type : String,
        default : null
    },

    //
    avatar : { 
        type : String,
        default : null
    },
    
    celular : {
        type : 'String',
        minlength : 10,
        maxlength : 30
    },
    fecha_nacimiento : {
        type : Date,
        default : null
    },

    // Posibilidad de generar un nuevo token, pero debe ser unique
    token : { 
        type : String,
        default : null
    },
    
    posibilidad_remoto : { 
        type : 'String',
        enum : ['no', 'si', 'no_especificado'],
        default : 'no_especificado'
    },

    bio_actual : String, // Biografia actual
    empresa_actual : String, // Descripcion Actual

    freelance : {
        type : String,
        enum : ['si', 'no', 'no_especificado'],
        default : 'no_especificado'
    },
    dispone_vehiculo : {
        type : String,
        enum : ['si', 'no', 'no_especificado'],
        default : 'no_especificado'
    },
    salario_pretendido : Number,
    rol : {
        type : String, 
        enum : ['rrhh', 'user'],
        default : 'user'
    },
    referencias : [{
        type : String,
        default : null
    }],
    habilidades : [{
        type : String,
        default : null
    }],
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _update_at : {
        type : Date,
        default : Date.now()
    }
}, {
    collection : 'perfiles'
})


module.exports = mongoose.model('Perfil', PerfilSchema);