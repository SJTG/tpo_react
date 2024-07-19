import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsMovieDetail from '../components/MovieDetail/DetailsMovieDetail'; 
import { getMovieDetails } from '../services/tmdb'; 

function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    console.log('Fetching details for movieId:', movieId); 
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        console.log('Movie data fetched:', movieData); 
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DetailsMovieDetail movie={movie} />
    </div>
  );
}

export default MovieDetailPage;
