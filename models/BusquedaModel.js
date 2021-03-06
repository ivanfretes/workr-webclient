import { Schema, model } from "mongoose";

const BusquedaSchema = Schema({
    valor_buscado : {
        type : String,
        required : true
    },
    _created_at : {
        type : Date,
        default : Date.now()
    },
    _updated_at : {
        type : Date,
        default: Date.now()
    },
});


module.exports = model('Busqueda', BusquedaSchema);