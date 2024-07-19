import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../services/api';
import './LoginForm.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser({ email: username, password });
      console.log('Login successful', response);
      localStorage.setItem('token2', response.token); 
      login(response.token);
      onLogin(response.token);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message); 
      } else {
        setError('Login failed. Please try again.'); 
      }
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
          <button type="button" onClick={() => alert('Password recovery function not yet available.')}>
            ¿Olvidaste la contraseña?
          </button>
        </div>
      </div>
      {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error */}
      <button type="submit">Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
