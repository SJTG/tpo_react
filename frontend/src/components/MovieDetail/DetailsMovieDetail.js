import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // Asegúrate de usar el path correcto al AuthContext
import './DetailsMovieDetail.css'; 
import AddToList from './AddToList';

function DetailsMovieDetail({ movie }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="card">
      <div className="poster-container">
        {/* Cambia el src para usar una imagen fija */}
        <img src="/Media/shadows.png" alt={movie.title} className="movie-poster" />
      </div>
      <div className="details-container">
        <h1>{movie.title}</h1>
        <p><strong>Descripción:</strong> {movie.description}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Actores:</strong> {movie.actors.join(', ')}</p>
        <p><strong>Género:</strong> {movie.genre}</p>
        {/* Añadir a lista solo si el usuario está autenticado */}
        {isAuthenticated && <AddToList movie={movie} />}
      </div>
    </div>
  );
}

export default DetailsMovieDetail;