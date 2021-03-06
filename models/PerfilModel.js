const mongoose = require('mongoose');

const PerfilSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    
    cargo : { 
        type : String,
        default : null
    },

    // Soy un Senio software Developer
    estado_actual : {
        type: String,
        default : null
    },

    consideracion_experiencia : {
        type : String,
        enum : ['junio', 'semi-senior', 'senior', 'no_especificado'],
        default : 'no_especificado'
    },

    experiencia_total : Number,

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

    posibilidad_remoto : { 
        type : 'String',
        enum : ['no', 'si', 'no_especificado'],
        default : 'no_especificado'
    },

    bio_actual : String, // Biografia actual
    empresa_actual : String, // Empresa Actual

    freelance : {
        type : String,
        enum : ['si', 'no', 'no_especificado'],
        default : 'no_especificado'
    },

    movilidad_propia : {
        type : String,
        enum : ['si', 'no', 'no_especificado'],
        default : 'no_especificado'
    },

    salario_pretendido : {
        type: Number,
        default : null
    },

    // Indica, el tipo de usuario, por defecto no le damos mucho enfasis
    tipo_acceso : {
        type : String, 
        enum : ['rrhh', 'user'],
        default : 'user'
    },

    habilidades : {
        type : [String],
        required : true,
    },

    ciudad : String,
    pais : String,
    geoubicacion : {
        lat : { type : String, default :null }, 
        long : { type : String, default : null }
    },

    redes_sociales : {
        facebook : {
            type : String, default: null
        },
        twitter : {
            type : String, default: null
        },
        instagram : {
            type : String, default: null
        },
        linkedin : {
            type : String, default: null
        },
        youtube : {
            type : String, default: null
        },
        mi_web : {
            type : String, default: null
        }
    },


    /**
     * Si actual es true, significa que es su actual entidad educativa
     */
    experiencia_academica : [
        {
            carrera : {
                type : String,
                default : null
            },
            institucion : {
                type : String,
                default : null
            }, 
            fecha_desde : {
                type : Date
            },
            fecha_hasta : {
                type : Date
            },

            actual : {
                type : Boolean,
                default : false
            }, 
            descripcion : {
                type : String
            }, 
            tipo_institucion : { 
                type : String,
                enum : ['univesidad', 'colegio', 'independiente', 'no_especificado'],
                default : 'no_especificado'
            },
        }
    ],

    /**
     *  Si actual es true, significa que es su actual empleo
     */
    experiencia_laboral : [
        {
            ocupacion : {
                type : String,
            },
            empresa: {
                type : String,
            }, 
            fecha_desde : {
                type : Date
            },
            fecha_hasta : {
                type : Date
            },
            actual : {
                type : Boolean,
                default : false
            }, 
            descripcion : {
                type : String
            }
        }, 
        
    ],


    _created_at : {
        type : Date,
        default : Date.now()
    },
    _update_at : {
        type : Date,
        default : Date.now()
    }
}, {
    // Nombre de la coleccion en mongo
    collection : 'perfiles'
})


module.exports = mongoose.model('Perfil', PerfilSchema);