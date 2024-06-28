import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import { AuthProvider } from './contexts/AuthContext';
import { ListProvider } from './contexts/ListContext';
import NavigationComponent from './components/Layout/NavigationComponent';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ListsPage from './views/ListsPage';
import Footer from './components/Layout/Footer';
import MovieDetailPage from './views/MovieDetail';

function App() {
  const handleRegister = (token) => {
    localStorage.setItem('token', token);
    window.location.href = '/';
  };

  return (
    <AuthProvider>
      <ListProvider>
        <Router>
          <NavigationComponent />
          <div className="site-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/movieDetail/:movieId" element={<MovieDetailPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ListProvider>
    </AuthProvider>
  );
}

export default App;