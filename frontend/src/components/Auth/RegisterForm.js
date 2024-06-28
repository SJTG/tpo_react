// src/components/Auth/RegisterForm.js
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
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      console.log('Registro exitoso', response);
      onRegister(response.token);
    } catch (error) {
      console.error('Error en el registro', error);
      setError('Error en el registro. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
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