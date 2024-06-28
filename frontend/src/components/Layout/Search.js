// src/components/Layout/Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../../services/tmdb';
import './Search.css'; 

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const results = await searchMovies(searchTerm);
      setResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    setSearchTerm(''); // Limpiar el campo del buscador
    setResults([]); // Limpiar los resultados de la búsqueda
    navigate(`/movieDetail/${movieId}`);
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="results-container">
        {results.map(movie => (
          <div key={movie.id} className="movie-result" onClick={() => handleMovieClick(movie.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>{movie.genre_ids && movie.genre_ids.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
