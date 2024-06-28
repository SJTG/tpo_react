// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(400).json({ error: 'Credenciales incorrectas' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;