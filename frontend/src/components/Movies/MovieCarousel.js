import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import moviesData from './movies.json';
import { useNavigate } from 'react-router-dom';
import './MovieCarousel.css'


function MovieCarousel() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState('All');
  const navigate = useNavigate(); 

  useEffect(() => {
    setMovies(moviesData);
    setFilteredMovies(moviesData);
  }, []);

  useEffect(() => {
    if (genre === 'All') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => movie.genre === genre));
    }
  }, [genre, movies]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

 
  const handleMovieClick = (movieId) => {
    navigate(`/movieDetail/${movieId}`);
  };

  return (
    <div>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="All">All</option>
        <option value="Suspense">Suspense</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
      </select>
      <Slider {...settings}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
            <img src={movie.poster} alt={movie.title} className="movie-image" />
            <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MovieCarousel;