// src/components/Movies/MovieCarousel.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { searchMovies } from '../../services/tmdb';
import { useNavigate } from 'react-router-dom';
import './MovieCarousel.css';

function MovieCarousel() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState('All');
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await searchMovies('');
        setMovies(results);
        setFilteredMovies(results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false); // Datos cargados, establecer loading a false
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (genre === 'All') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => movie.genre_ids.includes(parseInt(genre))));
    }
  }, [genre, movies]); // No incluir filteredMovies aquí

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of slides to show at a time
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

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="All">All</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Music</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="10770">TV Movie</option>
        <option value="53">Thriller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
      </select>
      <Slider {...settings}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-image" />
            <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MovieCarousel;