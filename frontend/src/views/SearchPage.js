// src/views/SearchPage.js
import React from 'react';
import Search from '../components/Layout/Search'; // Ruta corregida para el componente Search

function SearchPage() {
  return (
    <div className="search-page-container">
      <main className="search-page-content">
        <Search />
      </main>
    </div>
  );
}

export default SearchPage;
