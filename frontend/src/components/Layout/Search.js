import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css'; 
import moviesData from '../../components/Movies/movies.json';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Limpiar búsqueda cuando el componente se monte
  useEffect(() => {
    setSearchTerm('');
    setResults([]);
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = searchTerm.toLowerCase();
  
    const filteredMovies = moviesData.filter(movie => {
      const title = movie.title ? movie.title.toLowerCase() : '';
      const genre = movie.genre ? movie.genre.toLowerCase() : '';
      const description = movie.description ? movie.description.toLowerCase() : '';
      const director = movie.director ? movie.director.toLowerCase() : '';
      const actorMatch = movie.actors && movie.actors.some(actor => actor && actor.toLowerCase().includes(searchQuery));
  
      return title.includes(searchQuery) ||
             genre.includes(searchQuery) ||
             description.includes(searchQuery) ||
             actorMatch ||
             director.includes(searchQuery);
    });
  
    setResults(filteredMovies);
  };

  const handleMovieClick = (movieId) => {
    setSearchTerm(''); // Limpiar el campo del buscador
    setResults([]); // Limpiar los resultados de la búsqueda
    navigate(`/movieDetail/${movieId}`);
  };

  return (
    <div>
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
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>{movie.genre} - Directed by {movie.director}</p>
              <p>Starring: {movie.actors.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;