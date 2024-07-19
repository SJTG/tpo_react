import React, { useState, useEffect } from 'react';
import { useLists } from '../../contexts/ListContext';
import { removeMovieFromList, getUserLists } from '../../services/api';
import './ListManager.css';
import { useNavigate, Link } from 'react-router-dom';

function ListsManager() {
  const { lists, setLists } = useLists();
  const [currentList, setCurrentList] = useState('favoritas');
  const [selectedMovies, setSelectedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token');
        const userLists = await getUserLists(token);
        setLists(userLists);
      } catch (error) {
        console.error('Error fetching user lists:', error);
      }
    };

    fetchLists();
  }, [setLists]);

  const handleSelectMovie = (movieId) => {
    setSelectedMovies((prevSelected) =>
      prevSelected.includes(movieId)
        ? prevSelected.filter((id) => id !== movieId)
        : [...prevSelected, movieId]
    );
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        selectedMovies.map((movieId) =>
          removeMovieFromList({ listType: currentList, movieId }, token)
        )
      );
      setLists((prevLists) => ({
        ...prevLists,
        [currentList]: prevLists[currentList].filter(
          (movie) => !selectedMovies.includes(movie.id)
        ),
      }));
      setSelectedMovies([]);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error removing movies from list:', error);
    }
  };

  const handleListChange = (listName) => {
    setCurrentList(listName);
  };

  const handleBack = () => {
    navigate('/'); 
  };

  return (
    <div className='listsPage'>
      <h1>My Lists</h1>
      <h2>{currentList}</h2>
      <div>
        <button onClick={() => handleListChange('favoritas')}>Favoritas</button>
        <button onClick={() => handleListChange('vistas')}>Películas Vistas</button>
        <button onClick={() => handleListChange('porVer')}>Películas por Ver</button>
      </div>
      {lists[currentList] && lists[currentList].length > 0 ? (
        <ul>
          {lists[currentList].map(movie => (
            movie && (
              <li key={movie.id} className="list-item">
                <div className="movie-details">
                  <input
                    type="checkbox"
                    checked={selectedMovies.includes(movie.id)}
                    onChange={() => handleSelectMovie(movie.id)}
                  />
                  <Link to={`/movieDetail/${movie.id}`} className="movie-title-link">
                    {movie.title}
                  </Link>
                  <button onClick={() => handleSelectMovie(movie.id)}>Seleccionar</button>
                </div>
              </li>
            )
          ))}
        </ul>
      ) : (
        <p>No hay películas para mostrar.</p>
      )}
      <button onClick={handleSaveChanges}>Eliminar seleccion</button>
      <button onClick={handleBack}>Volver</button>
    </div>
  );
}

export default ListsManager;
