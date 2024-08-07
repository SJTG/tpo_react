// Este archivo define el componente RegisterForm, que permite a los usuarios registrarse en la aplicación. 
// El componente maneja el estado del formulario, realiza la validación de contraseñas y llama a una función de servicio para registrar al usuario.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { registerUser } from '../../services/api'; // Asegúrate de que el path es correcto
import './RegisterForm.css'; // Crea un archivo CSS para los estilos

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('The passwords dont match');
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      console.log('Registro exitoso', response);
      onRegister(response.token);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error en el registro', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Set specific error message
      } else {
        setError('Error, please try again.'); // Set a generic error message
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error */}
      <div>
        <label>Nombre de Usuario:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Confirmar Contraseña:</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
}

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterForm;
