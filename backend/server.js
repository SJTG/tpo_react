// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/movie-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error(err));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));