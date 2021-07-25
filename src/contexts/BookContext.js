import React, { createContext } from 'react';

export const BookContext = createContext();

const BookProvider = ({children}) => {
  
  const childProps = {};

  return (
    <BookContext.Provider value={childProps}>
      { children }
    </BookContext.Provider>
  );
};

export default BookProvider;