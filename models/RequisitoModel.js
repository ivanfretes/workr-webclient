const mongoose = require('mongoose');

var RequisitoSchema = new mongoose.Schema({
    nombre : String,
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : Date,
})

module.exports = mongoose.model('Requisito', RequisitoSchema)