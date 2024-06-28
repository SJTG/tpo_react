import React, { createContext, useState, useContext } from 'react';

const ListContext = createContext();

export function useLists() {
  return useContext(ListContext);
}

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState({
    Favoritas: [],
    Vistas: [],
    Porver: []  // Cambiado a 'Por ver' para consistencia
  });

  const addToList = (movie, listType) => {
    if (!lists[listType]) {
      console.error(`List type '${listType}' does not exist.`);
      return;
    }
    const newList = [...lists[listType], { id: movie.id, title: movie.title }];
    setLists(prevLists => ({ ...prevLists, [listType]: newList }));
  };

  return (
    <ListContext.Provider value={{ lists, setLists, addToList }}>
      {children}
    </ListContext.Provider>
  );
};