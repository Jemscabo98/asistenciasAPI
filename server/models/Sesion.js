var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sesionSchema = new Schema({
    nombreAlumno: { type: String, required: true },
    asistencia: [ { type: Date, required: false }, { type: Boolean, required: false} ],
    unidadC: { type: Number, required: true },
    curso: { type: String, required: true },
    grupo: { type: String, required: true }
});

module.exports = mongoose.model('Sesion', sesionSchema);