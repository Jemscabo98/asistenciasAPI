const express = require('express');
const UsuarioController = require('../controllers/usuario.controller');
const CursoController = require('../controllers/curso.controller');
const SesionController = require('../controllers/sesion.controller');

const router = express.Router();

// ROUTES USUARIOS
// Obtener usuario por ID
router.get('/usuarios/:id', UsuarioController.getUsuario);
// Obtener todos los usuarios
router.get('/usuarios', UsuarioController.getAllUsuarios);
// Crear un usuario
router.post('/usuarios', UsuarioController.createUsuario);
// Actualizar un usuario
router.put('/usuarios/:id', UsuarioController.updateUsuario);
// Eliminar un usuario
router.delete('/usuarios/:id', UsuarioController.deleteUsuario);
// Obtener usuario por email
router.get('/usuarios/:email', UsuarioController.findByEmail);

// ROUTES CURSOS
// Obtener curso por nombre
router.get('/cursos/:id', CursoController.getCurso);
// Obtener todos los cursos
router.get('/cursos', CursoController.getAllCursos);
// Crear un curso
router.post('/cursos', CursoController.createCurso);
// Actualizar un curso
router.put('/cursos/:id', CursoController.updateCurso);
// Eliminar un curso
router.delete('/cursos/:id', CursoController.deleteCurso);
// Obtener un curso por nombre
router.get('/cursos/n/:nombre', CursoController.findByName);

// ROUTES GRUPOS
// Obtener por nombre de GRUPO
router.get('/grupos/:curso/:grupo', CursoController.getGrupo);
// Obtener todos los grupos
router.get('/grupos', CursoController.getAllGrupos);
// Obtener todos los grupos de un curso
router.get('/grupos/:curso', CursoController.getAllGruposFromCurso);
// Crear un grupo
router.post('/grupos', CursoController.createGrupo);
// Actualizar un grupo
router.put('/grupos/:curso', CursoController.updateGrupo);
// Eliminar un grupo
router.delete('/grupos/:curso/:grupo', CursoController.deleteGrupo);

// ROUTES SESIONES
// Obtener sesion por ID
router.get('/sesiones/:id', SesionController.getSesion);
// Obtener todas las sesiones
router.get('/sesiones', SesionController.getAllSesiones);
// Crear una sesion
router.post('/sesiones', SesionController.createSesion);
// Actualizar una sesion
router.put('/sesiones/:id', SesionController.updateSesion);
// Eliminar una sesion
router.delete('/sesiones/:id', SesionController.deleteSesion);
// Obtener una sesion por alumno
router.get('/sesiones/:nombre-alumno', SesionController.findByStudent);
// Obtener una sesion por fecha
router.get('/sesiones/:fecha', SesionController.findByDate);
// Obtener una sesion por unidad
router.get('/sesiones/:unidad', SesionController.findByUnit);

module.exports = router;