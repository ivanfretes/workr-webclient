const mongoose = require('mongoose');

var ProfesionSchema = new mongoose.Schema({
    nombre : String,
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : Date,
})

module.exports = mongoose.model('ProfesionCargo', ProfesionSchema)