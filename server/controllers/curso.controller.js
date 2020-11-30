var Curso = require('../models/Curso');
const Usuario = require('../models/Usuario');

var cursoController = {

    createCurso: function (req, res) {
        var curso = new Curso();
        var params = req.body;

        curso.nombre = params.nombre;
        curso.unidades = params.unidades;

        curso.save((err, cursoStored) => {
            if (err) return res.status(500).send({ message: "Error al guardar" });

            if (!cursoStored) return res.status(404).send({ message: "No se ha podido guardar el curso" });

            return res.status(200).send({ curso: cursoStored });
        });
    },

    getCurso: function (req, res) {
        var cursoId = req.params.id;

        Curso.findById(cursoId, (err, curso) => {
            if (err) return res.status(500).send({ message: "Error al obtener" });

            if (!curso) return res.status(404).send({ message: "Curso no existente" });

            return res.status(200).send({
                curso: curso
            });
        });
    },

    getAllCursos: function (req, res) {
        Curso.find({}).exec((err, cursos) => {
            if (err) return res.status(500).send({ message: "Error al obtener" });

            if (!cursos) return res.status(404).send({ message: "No hay cursos que mostrar" });

            return res.status(200).send({ cursos });
        });
    },

    updateCurso: function (req, res) {
        var cursoId = req.params.id;
        var update = req.body;

        Curso.findByIdAndUpdate(cursoId, update, { new: true }, (err, cursoUpdated) => {
            if (err) return res.status(500).send({ message: "Error al actualizar" });

            if (!cursoUpdated) return res.status(404).send({ message: "Curso no existente" });

            return res.status(200).send({
                curso: cursoUpdated
            });
        });
    },

    deleteCurso: function (req, res) {
        var cursoId = req.params.id;

        Curso.findByIdAndRemove(cursoId, (err, cursoRemoved) => {
            if (err) return res.status(500).send({ message: "No se ha podido borrar" });

            if (!cursoRemoved) return res.status(404).send({ message: "Curso no existente" });

            return res.status(200).send({
                usuario: cursoRemoved
            });
        });
    },

    findByName: function (req, res) {
        var name = req.params.nombre;

        if (name == null) return res.status(404).send({ message: "Curso no existente" });

        Curso.find({ nombre: name }).exec((err, cursos) => {
            if (err) return res.status(500).send({ message: "Error al obtener" });

            if (!cursos) return res.status(404).send({ message: "No hay cursos que mostrar" });

            return res.status(200).send(cursos);
        });
    },

    getAllGrupos: function (req, res) {

        Curso.find({ "grupos": { $gt: 1 } }, { "grupos": 1 }).exec((err, grupos) => {
            if (err) return res.status(500).send({ message: "Error al obtener" });

            if (!grupos) return res.status(404).send({ message: "No hay cursos que mostrar" });

            return res.status(200).send({grupos});
        });
    },
    
    getAllGruposFromCurso: function (req, res) {
        var curso = req.params.curso;

        Curso.find({ "nombre": curso }, { "grupos": 1 }).exec((err, grupos) => {
            if (err) return res.status(500).send({ message: "Error al obtener" });

            if (!grupos) return res.status(404).send({ message: "No hay cursos que mostrar" });

            return res.status(200).send({grupos});
        });
    },

    createGrupo: function (req, res) {
        var params = req.body;
        var curso = params.curso;
        var grupo = params.grupo;

        Curso.findOneAndUpdate({ "nombre": curso }, { $addToSet: { "grupos": grupo } }, { new: true }, (err, cursoUpdated) => {

            if (err) return res.status(500).send({ message: "Error al crear" });

            if (!cursoUpdated) return res.status(404).send({ message: "No se ha podido guardar el grupo" });

            return res.status(200).send({
                curso: cursoUpdated
            });
        });
    },

    getGrupo: function (req, res) { 
        var curso = req.params.curso;
        var grupo = req.params.grupo;

        Curso.find({ "nombre": curso }, { "grupos": grupo }).exec((err, grupos) => {
            if (err) return res.status(500).send({ message: "Error al obtener" });

            if (!grupos) return res.status(404).send({ message: "No hay grupos que mostrar" });

            return res.status(200).send(grupos);
        });
    },

    updateGrupo: function (req, res) {
        var curso = req.params.curso;
        var grupo = req.body.grupo;
        var update = req.body.update;

        Curso.update({ "nombre": curso, "grupos": grupo }, { $set: { "grupos.$": update } }, { new: true }, (err, cursoUpdated) => {
            if (err) return res.status(500).send({ message: "Error al actualizar" });

            if (!cursoUpdated) return res.status(404).send({ message: "Curso no existente" });

            return res.status(200).send({
                curso: cursoUpdated
            });
        });
    },

    deleteGrupo: function (req, res) { 
        var curso = req.params.curso;
        var grupo = req.params.grupo;

        Curso.findOneAndUpdate({ "nombre": curso }, { $pull: { "grupos": grupo } }, { new: true }, (err, cursoGrupoRemoved) => {

            if (err) return res.status(500).send({ message: "Error al eliminar" });

            if (!cursoGrupoRemoved) return res.status(404).send({ message: "Curso no existente" });

            return res.status(200).send({
                curso: cursoGrupoRemoved
            });
        });
    }
}

module.exports = cursoController;