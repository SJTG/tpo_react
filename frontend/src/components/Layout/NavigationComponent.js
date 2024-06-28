import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import AuthenticatedHeader from './AuthenticatedHeader';
import Header from './Header';

function NavigationComponent() {
  const { isAuthenticated, logout } = useAuth();
  return isAuthenticated ? <AuthenticatedHeader onLogout={logout} /> : <Header />;
}

export default NavigationComponent;