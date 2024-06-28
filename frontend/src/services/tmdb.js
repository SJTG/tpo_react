// src/services/tmdb.js
import axios from 'axios';

const TMDB_API_KEY = 'da558536b1d1ca3fbfb73ba736f43331';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query, page = 1) => {
  try {
    console.log(`Searching movies with query: "${query}" and page: ${page}`);
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        page: page,
      },
    });
    console.log('Search Movies Response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    console.log(`Fetching details for movieId: ${movieId}`);
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    console.log('Get Movie Details Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting movie details:', error);
    throw error;
  }
};
