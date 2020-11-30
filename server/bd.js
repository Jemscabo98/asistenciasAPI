const mongoose = require('mongoose');
const app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/asistenciabd', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to asistenciabd...")
            app.listen(port, () => {
                console.log("Server running on localhost:3000");
            });
        })
        .catch(err => console.log(err));