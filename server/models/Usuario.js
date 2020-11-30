var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    cursos: [{type: Schema.Types.ObjectId, ref: 'Curso', required: false}]
});

module.exports = mongoose.model('Usuario', usuarioSchema);