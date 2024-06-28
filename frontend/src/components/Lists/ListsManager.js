import React, { useState } from 'react';
import { useLists } from '../../contexts/ListContext'; // Ajuste la ruta a la ubicación correcta
import './ListManager.css';
import { useNavigate } from 'react-router-dom';

function ListsManager() {
  const { lists, setLists } = useLists();
  const [currentList, setCurrentList] = useState('Favoritas');
  const navigate = useNavigate();

  const handleRemoveMovie = (movieId) => {
    if (!lists[currentList]) {
      console.error(`The list ${currentList} does not exist.`);
      return;
    }
    const updatedList = lists[currentList].filter(movie => movie.id !== movieId);
    setLists({ ...lists, [currentList]: updatedList });
  };

  const handleListChange = (listName) => {
    setCurrentList(listName);
  };

  const handleBack = () => {
    navigate('/'); // Navegar a la página principal
  };

  return (
    <div className='myListsPage'>
      <h1>My Lists</h1>
      <h2>{currentList}</h2>
      <div>
        <button onClick={() => handleListChange('Favoritas')}>Favoritas</button>
        <button onClick={() => handleListChange('Vistas')}>Películas Vistas</button>
        <button onClick={() => handleListChange('Porver')}>Películas por Ver</button>
      </div>
      {lists[currentList] && lists[currentList].length > 0 ? (
        <ul>
          {lists[currentList].map(movie => (
            <li key={movie.id} className="list-item">
              <div className="movie-details">
                <span>{movie.title}</span>
                <button onClick={() => handleRemoveMovie(movie.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay películas para mostrar.</p>
      )}
      <button onClick={handleBack}>Volver</button>
    </div>
  );
}

export default ListsManager;
