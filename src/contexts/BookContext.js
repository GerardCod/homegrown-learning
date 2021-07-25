import React, { createContext, useCallback, useReducer, useRef } from 'react';
import BookReducer, {initialState } from '../reducers/BookReducer';
import { ERROR, FETCH_COLLECTION, FETCH_DOCUMENT, LOADING } from '../reducers/Actions';
import { database } from '../firebase';
import { collectIdAndData } from '../utils';

export const BookContext = createContext();

const BookProvider = ({children}) => {
  const [state, dispatch] = useReducer(BookReducer, initialState);
  const collectionRef = useRef({});
  const documentRef = useRef({});

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

  const fetchBook = useCallback((id, {onError}) => {
    dispatch({type: LOADING});
    documentRef.current = database.doc(`books/${id}`).onSnapshot(
      snapshot => {
        const book = collectIdAndData(snapshot);
        dispatch({type: FETCH_DOCUMENT, payload: book});
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
    documentRef,
    fetchBooks,
    fetchBook,
  };

  return (
    <BookContext.Provider value={childProps}>
      { children }
    </BookContext.Provider>
  );
};

export default BookProvider;