var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cursoSchema = new Schema({
    nombre: { type: String, required: true },
    unidades: { type: Number, required: true },
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: false},
    grupos: [{type: String, required: false}]
});

module.exports = mongoose.model("Curso", cursoSchema);