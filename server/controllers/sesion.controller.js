var Sesion = require('../models/Sesion');

var sesionController = {

    createSesion: function(req, res) {
        var sesion = new Sesion();
        var params = req.body;
        
        sesion.nombreAlumno = params.nombreAlumno;
        sesion.asistencia = params.asistencia;
        sesion.unidadC = params.unidadC;
        sesion.curso = params.curso;
        sesion.grupo = params.grupo;

        sesion.save((err, sesionStored) => {
            if (err) return res.status(500).send({message: "Error al guardar"});

            if (!sesionStored) return res.status(404).send({message: "No se ha podido guarar el curso"});
            
            return res.status(200).send({
                sesion: sesionStored
            });
        });
    },

    getSesion: function(req, res) {
        var sesionId = req.params.id;

        if (sesionId == null) return res.status(404).send({message: "Sesion no existente"});
        
        Sesion.findById(sesionId, (err, sesion) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!sesion) return res.status(404).send({message: "Sesion no existente"});

            return res.status(200).send({sesion: sesion});
        });
    },
    
    getAllSesiones: function(req, res) {
        Sesion.find({}).exec((err, sesiones) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!sesiones) return res.status(404).send({message: "No hay sesiones que mostrar"});

            return res.status(200).send({sesiones});
        });
    },

    updateSesion: function(req, res) {
        var sesionId = req.params.id;
        var update = req.body;

        Sesion.findByIdAndUpdate(sesionId, update, {new:true}, (err, sesionUpdated) => {
            if (err) return res.status(500).send({message: "Error al actualizar"});

            if (!sesionUpdated) return res.status(404).send({message: "Sesion no existente"});

            return res.status(200).send({
                sesion: sesionUpdated
            });
        });
    },

    deleteSesion: function(req, res) {
        var sesionId = req.params.id;

        Sesion.findByIdAndRemove(sesionId, (err, sesionRemoved) => {
            if (err) return res.status(500).send({message: "Error al eliminar"});

            if (sesionRemoved) return res.status(404).send({messgae: "Sesion no existente"});

            return res.status(200).send({
                sesion: sesionRemoved
            });
        });
    },

    findByStudent: function(req, res) {
        var student = req.params.student;

        if (student == null) return res.status(404).send({message: "Sesion no existente"});

        Sesion.find({nombreAlumno: student}).exec((err, sesiones) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!sesiones) return res.status(404).send({message: "No hay sesiones que mostrar"});
        });

        return res.status(200).send({sesiones});

    },

    findByDate: function(req, res) {
        var date = req.params.date;

        if (date == null) return res.status(404).send({message: "Sesion no existente"});

        Sesion.find({fecha: date}).exec((err, sesiones) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!sesiones) return res.status(404).send({message: "No hay sesiones que mostrar"});

            return res.status(200).send({sesiones});
        });
    },

    findByUnit: function(req, res) {
        var unit = req.params.unit;
        
        if (unit == null) return res.status(404).send({message: "Sesion no existente"});

        Sesion.find({unidadC: unit}).exec((err, sesiones) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!sesiones) return res.status(404).send({message: "No hay sesiones que mostrar"});

            return res.status(200).send({sesiones});
        });
    }
}

module.exports = sesionController;