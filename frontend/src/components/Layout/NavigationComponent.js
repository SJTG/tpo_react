// Este archivo define el componente NavigationComponent, que se encarga de renderizar el encabezado adecuado según si el usuario está autenticado o no

import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import AuthenticatedHeader from './AuthenticatedHeader';
import Header from './Header';

function NavigationComponent() {
  const { isAuthenticated, logout } = useAuth();
  return isAuthenticated ? <AuthenticatedHeader onLogout={logout} /> : <Header />;
}

export default NavigationComponent;