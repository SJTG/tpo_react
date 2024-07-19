import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const handleLoginSuccess = (token) => {
    login(token, );       // Llama a la función login del contexto de autenticación
    navigate('/'); // Redirige al usuario a la página principal
  };

  return (
    <div className="site-content">
      <LoginForm onLogin={success => {
        if (success) {
          console.log(success)
          handleLoginSuccess(success); // Llama a la función que maneja el éxito del login
        } else {
          alert('Failed to login!'); // Manejo del caso de fallo
        }
      }} />
    </div>
  );
}

export default LoginPage;