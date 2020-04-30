const mongoose = require('mongoose');

var AcademiaSchema = new mongoose.Schema({
    nombre : String,
    tipo : {
        type : 'String',
        enum : ['universidad', 'colegio', 'instituto', 'otra-opcion'],
        default : 'universidad'
    },
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('Academia', AcademiaSchema)