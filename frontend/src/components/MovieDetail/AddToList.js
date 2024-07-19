import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLists } from '../../contexts/ListContext';
import { addMovieToList } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './AddToList.css';

function AddToList({ movie }) {
  const { isAuthenticated, user } = useAuth();
  const { lists, setLists } = useLists();
  const [selectedList, setSelectedList] = useState('');
  const navigate = useNavigate();

  const handleAddToList = async (e) => {
    e.preventDefault();
    if (selectedList && movie && isAuthenticated) {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);
        const updatedLists = await addMovieToList({ listType: selectedList, movie }, token);
        setLists(prevLists => ({ ...prevLists, [selectedList]: updatedLists }));
        alert(`Movie added to ${selectedList}`);
      } catch (error) {
        console.error('Error adding movie to list:', error);
      }
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <form onSubmit={handleAddToList}>
      <select
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
        required
      >
        <option value="">Choose a list</option>
        <option value="favoritas">Favoritas</option>
        <option value="vistas">Vistas</option>
        <option value="porVer">Por Ver</option>
      </select>
      <button type="submit">Add to List</button>
      <button type="button" onClick={handleBack}>Volver</button>
    </form>
  );
}

export default AddToList;
