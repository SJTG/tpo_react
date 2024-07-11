// src/contexts/ListContext.js
import React, { createContext, useState, useContext } from 'react';

const ListContext = createContext();

export function useLists() {
  return useContext(ListContext);
}

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState({
    favoritas: [],
    vistas: [],
    porVer: []
  });

  return (
    <ListContext.Provider value={{ lists, setLists }}>
      {children}
    </ListContext.Provider>
  );
};
