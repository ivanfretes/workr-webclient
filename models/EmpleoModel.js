const mongoose = require('mongoose');

var EmpleoSchema = new mongoose.Schema({
    requisitos : [ { 
       type: mongoose.Schema.Types.ObjectId , 
       ref : 'Requisito'
    }],
    edad_min : {
        type : Number,
        default : null
    },
    edad_max : {
        type : Number,
        default : null
    },
    contrato_periodo : {
        type : Number,
        default : null
    },
    contrato_periodo : {
        type : Number,
        default : null
    },
    conexiones : [ {  // Usuarios potenciales para el cargo
       type: mongoose.Schema.Types.ObjectId , 
       ref : 'User'
    }],

    // Profesiones que pueden ser parte en la busqueda de un perfil de usuario
    profesiones_relacionadas : [ 
        {  
            type: mongoose.Schema.Types.ObjectId , 
            ref : 'ProfesionCargo'
        }
    ],
    
    titulo : String,
    descripcion : {
        maxlength : 1000,
        minlength : 100,
        default : null,
        type : Text    
    },
    descripcion_corta : {
        maxlength : 255,
        default : null,
        type : Text    
    },
    empresa : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Empresa'
    },
    posibilidad_remoto : {
        type : 'String',
        enum: ['si', 'no'],
        default : 'no'
    },
    experiencia_min : Number,
    horario_init : {
        type : Date,
        default : null 
    },
    horario_fin : {
        type : Date,
        default : null 
    },
    disponer_vehiculo : {
        type : 'String',
        enum : [ 'si' , 'no' ],
        default : 'no'
    },
    ocacional : {
        type : 'String',
        enum : [ 'si' , 'no' ],
        default : 'no'
    },
    cant_vacancias : {
        type : Number,
        default : 'no'
    },
    es_pasantia : {
        type : String,
        enum : ['si' , 'no'],
        default : 'no'
    },
    activo : {
        type : String,
        enum : ['si' , 'no'],
        default : 'no'
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


/**
 * Agregar una empresa al empleo
 */
EmpleoSchema.method.addEmpresa = (empresaId) => {
    this.empresa = mongoose.Types.ObjectId(empresaId);
};


/**
 * Agregar un profesion al empleo
 */
EmpleoSchema.method.addProfesionRelacionada = (profesionId) => {
    this.profesiones_relacionadas.push(mongoose.Types.ObjectId(profesionId))
};


/**
 * Agregar un requisito al empleo
 */
EmpleoSchema.method.addRequisito = (requisitoId) => {
    this.requisitos.push(mongoose.Types.ObjectId(requisitoId))
};


/**
 * Agregar una conexion al empleo
 */
EmpleoSchema.method.addConexion = (userId) => {
    this.requisitos.push(mongoose.Types.ObjectId(userId))
};



module.exports = mongoose.model('Empleo', EmpleoSchema)