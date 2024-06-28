import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search'; 
import './Header.css';  

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src="Media/logo.png" alt="Movie App Logo" className="header-logo" />
      </Link>
      <Search/>
      <nav>
        <ul className="header-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;