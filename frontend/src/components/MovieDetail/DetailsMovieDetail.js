// src/components/Movies/DetailsMovieDetail.js
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // Asegúrate de usar el path correcto al AuthContext
import './DetailsMovieDetail.css'; 
import AddToList from './AddToList';

function DetailsMovieDetail({ movie }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="card">
      <div className="poster-container">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
      </div>
      <div className="details-container">
        <h1>{movie.title}</h1>
        <p><strong>Description:</strong> {movie.overview}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Actors:</strong> {movie.cast && movie.cast.map(actor => actor.name).join(', ')}</p>
        <p><strong>Genre:</strong> {movie.genres && movie.genres.map(g => g.name).join(', ')}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Duration:</strong> {movie.runtime} minutos</p>
        <p><strong>Score:</strong> {movie.vote_average}</p>
        <p><strong>Tagline:</strong> {movie.tagline}</p>
        {isAuthenticated && <AddToList movie={movie} />}
      </div>
    </div>
  );
}

export default DetailsMovieDetail;
