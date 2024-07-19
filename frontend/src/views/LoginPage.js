import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const handleLoginSuccess = (token) => {
    login(token, );       
    navigate('/'); 
  };

  return (
    <div className="site-content">
      <LoginForm onLogin={success => {
        if (success) {
          console.log(success)
          handleLoginSuccess(success); 
        } else {
          alert('Failed to login!');
        }
      }} />
    </div>
  );
}

export default LoginPage;