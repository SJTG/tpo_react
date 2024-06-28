// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../../services/api';
import './LoginForm.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser({ email: username, password });
      console.log('Login successful', response);
      onLogin(response.token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="forgot-password">
          <button type="button" onClick={() => alert('Funcionalidad de recuperación de contraseña aún no implementada.')}>
            ¿Olvidaste la contraseña?
          </button>
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;