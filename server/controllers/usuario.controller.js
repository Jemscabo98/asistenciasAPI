var Usuario = require('../models/Usuario');

var usuarioController = {

    createUsuario: function(req, res) {
        var usuario = new Usuario();
        var params = req.body;

        usuario.correo = params.correo;
        usuario.contrasena = params.contrasena;

        usuario.save((err, usuarioStored) => {
            if (err) return res.status(500).send({message: "Error al guardar"});

            if (!usuarioStored) return res.status(404).send({message: "No se ha podido guardar el usuario"});

            return res.status(200).send({usuario: usuarioStored});
        });
    },

    getUsuario: function(req, res) {
        var usuarioId = req.params.id;

        if (usuarioId == null) return res.status(404).send({message: "Usuario no existente"});

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!usuario) return res.status(404).send({message: "Usuario no existente"});

            return res.status(200).send({
                usuario: usuario
            });
        });
    },
    
    getAllUsuarios: function(req, res) {
        
        Usuario.find({}).exec((err, usuarios) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!usuarios) return res.status(404).send({message: "No hay usuarios que mostrar"});

            return res.status(200).send({usuarios});
        });
    },

    updateUsuario: function(req, res) {

        var usuarioId = req.params.id;
        var update = req.body;

        Usuario.findByIdAndUpdate(usuarioId, update, {new:true}, (err, usuarioUpdated) => {
            if (err) return res.status(500).send({message: "Error al actualizar"});

            if (!usuarioUpdated) return res.status(404).send({message: "Usuario no existente"});

            return res.status(200).send({
                usuario: usuarioUpdated
            });
        });
    },

    deleteUsuario: function(req, res) {

        var usuarioId = req.params.id;
        
        Usuario.findByIdAndRemove(usuarioId, (err, usuarioRemoved) => {
            if (err) return res.status(500).send({message: "No se ha podido borrar"});

            if (!usuarioRemoved) return res.status(404).send({message: "Usuario no existente"});

            return res.status(200).send({
                usuario: usuarioRemoved
            });
        });
    },

    findByEmail: function(req, res) {
        
        var email = req.params.email;

        if (email == null) return res.status(404).send({message: "Usuario no existente"});

        Usuario.find({correo: email}).exec((err, usuarios) => {
            if (err) return res.status(500).send({message: "Error al obtener"});

            if (!usuarios) return res.status(404).send({message: "No hay usuarios que mostrar"});

            return res.status(200).send({usuarios});
        });
    }
}

module.exports = usuarioController;