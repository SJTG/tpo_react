// src/views/SearchPage.js
import React from 'react';
import Search from '../components/Layout/Search'; // Ruta corregida para el componente Search

function SearchPage() {
  return (
    <div>
      <main className="search-page">
        <h1>Search for Movies</h1>
        <Search />
      </main>
    </div>
  );
}

export default SearchPage;
