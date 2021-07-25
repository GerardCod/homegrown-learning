import React, { createContext, useCallback, useReducer, useRef } from 'react';
import BookReducer, {initialState } from '../reducers/BookReducer';
import { ERROR, FETCH_COLLECTION, LOADING } from '../reducers/Actions';
import { database } from '../firebase';
import { collectIdAndData } from '../utils';

export const BookContext = createContext();

const BookProvider = ({children}) => {
  const [state, dispatch] = useReducer(BookReducer, initialState);
  const collectionRef = useRef({});

  const fetchBooks = useCallback(({onError}) => {
    dispatch({type: LOADING});
    collectionRef.current = database.collection('books').onSnapshot(
      snapshot => {
        const collection = snapshot.docs.map(collectIdAndData);
        dispatch({type: FETCH_COLLECTION, payload: collection});
      },
      error => {
        dispatch({type: ERROR, payload: error.message});
        onError(error.message);
      }
    ); 
  }, []);

  const childProps = {
    state,
    collectionRef,
    fetchBooks,
  };

  return (
    <BookContext.Provider value={childProps}>
      { children }
    </BookContext.Provider>
  );
};

export default BookProvider;