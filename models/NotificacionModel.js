import { Schema, model } from "mongoose";

const NotificacionSchema = Schema({
    revisado : {
        type : Boolean,
        default : false
    },
    titulo : {
        type :  String,
    },
    mensage : {
        type : String
    },
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : {
        type : Date,
        default : Date.now()
    },
})

module.exports = model('Notificacion', NotificacionSchema);