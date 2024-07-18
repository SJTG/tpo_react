import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const getUserLists = async (token) => {
  const response = await api.get('/lists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addMovieToList = async (movieData, token) => {
  const response = await api.post('/lists/add', movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const removeMovieFromList = async (movieData, token) => {
  const response = await api.post('/lists/remove', movieData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
