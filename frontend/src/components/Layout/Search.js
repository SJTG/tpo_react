import React, { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../../services/tmdb';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Search.css';

function Search() {
  const [uniqueSearchTerm, setUniqueSearchTerm] = useState('');
  const [uniqueResults, setUniqueResults] = useState([]);
  const uniqueNavigate = useNavigate();

  const handleUniqueInputChange = (event) => {
    setUniqueSearchTerm(event.target.value);
  };

  const handleUniqueSearch = async (event) => {
    event.preventDefault();
    try {
      const results = await searchMovies(uniqueSearchTerm);
      setUniqueResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleUniqueMovieClick = (movieId) => {
    uniqueNavigate(`/movieDetail/${movieId}`);
  };

  const uniqueSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="search-page">
      <h2>Search for Movies</h2>
      <form onSubmit={handleUniqueSearch}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={uniqueSearchTerm}
          onChange={handleUniqueInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="results-container">
        {uniqueResults.length > 0 ? (
          <Slider {...uniqueSettings}>
            {uniqueResults.map(movie => (
              <div key={movie.id} className="movie-result" onClick={() => handleUniqueMovieClick(movie.id)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster-search" />
                <div className="movie-info">
                  <h4>{movie.title}</h4>
                  <p>{movie.genre_ids && movie.genre_ids.join(', ')}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
