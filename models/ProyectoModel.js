import { Schema , model } from "mongoose";

const ProyectoSchema = new Schema({
    nombre_proyecto : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    
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