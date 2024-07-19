import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { registerUser } from '../../services/api'; 
import './RegisterForm.css'; 

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
      localStorage.setItem('token', response.token); 
      onRegister(response.token);
      setError(''); 
    } catch (error) {
      console.error('Error en el registro', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message); 
      } else {
        setError('Error, please try again.'); 
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
