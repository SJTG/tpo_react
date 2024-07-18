// Este archivo define el componente AuthenticatedHeader, que representa la cabecera del sitio para los usuarios autenticados. 

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function AuthenticatedHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout();
    alert("You have been logged out.");
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/">
        <img src="Media/logo.png" alt="Movie App Logo" className="header-logo" />
      </Link>
      <nav>
        <ul className="header-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/lists">My Lists</Link></li>
          <li className='blocked-button'><Link to="/profile">My Profile</Link></li>
          <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default AuthenticatedHeader;
