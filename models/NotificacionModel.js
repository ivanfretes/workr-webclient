const mongoose = require('mongoose');

const NotificacionSchema = mongoose.Schema({
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

module.exports = mongoose.model('Notificacion', NotificacionSchema);