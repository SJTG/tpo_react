import React, { useState } from 'react';
import { useLists } from '../../contexts/ListContext';
import './AddToList.css';

function AddToList({ movie }) {
  const { addToList } = useLists();
  const [selectedList, setSelectedList] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedList && movie) {
      addToList(movie, selectedList);  
      alert(`Movie added to ${selectedList}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
        required
      >
        <option value="">Elige donde guardarla! </option>
        <option value="Favoritas">Favoritas</option>
        <option value="Vistas">Vistas</option>
        <option value="Por Ver">Peliculas por Ver</option>
      </select>
      <button type="submit">Add to List</button>
    </form>
  );
}

export default AddToList;