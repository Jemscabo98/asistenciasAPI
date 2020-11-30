const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRoutes = require('./routes/index.js');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Esto habilita las peticiones AJAX entre el Front-end y el Servidor
// Configurar cabeceras y cors
app.use(cors());


// Routes
app.use('/api', indexRoutes);

// Export
module.exports = app;