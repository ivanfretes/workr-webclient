import { Schema , model } from "mongoose";

const ProyectoSchema = new Schema({
    nombre_proyecto : {
        type : String,
        required : true
    },

    // Usuario propietario del proyecto
    propietario : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },

    // Necesito 
    vinculo_requerido : {
        type : String,
        enum : ['socio', 'contratar', 'tercierizar', 'no_especificado'],
        default : 'no_especificado'
    },

    descripcion : {
        type : String,
        required : true
    }

    ciudad : {
        type : String,
        default : null
    },
    pais : {
        type : String,
        default : null
    },

    posibilidad_remoto : { 
        type : 'String',
        enum : ['no', 'si', 'no_especificado'],
        default : 'no_especificado'
    },
    
    // Listado de necesidades para el proyecto
    recursos_necesarios : [
        {
            type : String, 
            default : null,
        }
    ],
    interesados : [
        {
            type : Schema.model.ObjectId,
            ref : 'User',
            unique : true
        }
    ]
}, {
    collection : "proyectos"
})

module.exports = model('Proyecto', ProyectoSchema);