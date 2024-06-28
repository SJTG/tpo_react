import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

function RegisterPage({ onRegister }) {
  return (
    <div className="site-content">
      <RegisterForm onRegister={onRegister} />
    </div>
  );
}

export default RegisterPage;