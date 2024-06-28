import React, { useState } from 'react';
import './Sidebar.css'; 

function Sidebar({ onFilterChange }) {
  const [genre, setGenre] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    onFilterChange({ genre: e.target.value, actor, director });
  };

  const handleActorChange = (e) => {
    setActor(e.target.value);
    onFilterChange({ genre, actor: e.target.value, director });
  };

  const handleDirectorChange = (e) => {
    setDirector(e.target.value);
    onFilterChange({ genre, actor, director: e.target.value });
  };

  return (
    <div className="sidebar">
      <div className="filter">
        <label htmlFor="genre">Genre:</label>
        <input id="genre" type="text" value={genre} onChange={handleGenreChange} placeholder="Filter by Genre" />
      </div>
      <div className="filter">
        <label htmlFor="actor">Actor:</label>
        <input id="actor" type="text" value={actor} onChange={handleActorChange} placeholder="Filter by Actor" />
      </div>
      <div className="filter">
        <label htmlFor="director">Director:</label>
        <input id="director" type="text" value={director} onChange={handleDirectorChange} placeholder="Filter by Director" />
      </div>
    </div>
  );
}

export default Sidebar;