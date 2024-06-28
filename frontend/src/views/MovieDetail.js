import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsMovieDetail from '../components/MovieDetail/DetailsMovieDetail'; 
import moviesData from '../components/Movies/movies.json'; 

function MovieDetailPage() {
  const { movieId } = useParams();
  const movie = moviesData.find(movie => movie.id === parseInt(movieId)); 

  if (!movie) {
    return <div>Pelicula no encontrada</div>;
  }

  return (
    <div>
      <DetailsMovieDetail movie={movie} />
    </div>
  );
}

export default MovieDetailPage;