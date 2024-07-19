//Este archivo define las rutas para el registro e inicio de sesión de usuarios en la aplicación.
// Utiliza Express para crear un enrutador que maneja las solicitudes relacionadas con la autenticación.

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
