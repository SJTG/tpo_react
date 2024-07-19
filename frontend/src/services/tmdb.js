// Este archivo define las funciones para interactuar con la API de The Movie Database (TMDB) utilizando axios para realizar solicitudes HTTP.

import axios from 'axios';

const TMDB_API_KEY = 'da558536b1d1ca3fbfb73ba736f43331';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        page: page,
      },
    });
    let combinedResults = response.data.results;
    if (combinedResults.length >= 1){
      if (response.data.results[0].media_type == "person") {
          combinedResults = [...response.data.results[0].known_for, ...response.data.results.slice(1)];
      }
    }
    return combinedResults;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting movie details:', error);
    throw error;
  }
};

export const getMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
