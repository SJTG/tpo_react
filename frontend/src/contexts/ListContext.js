// Este archivo define el contexto de listas para la aplicación
// gestiona el estado de las listas de películas del usuario y proporciona acceso a ellas a través del contexto.

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
