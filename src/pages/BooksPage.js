import React, { Fragment, useContext, useEffect } from 'react';
import BookItem from '../components/BookItem';
import Empty from '../components/Empty';
import Loader from '../components/Loader';
import {BookContext} from '../contexts/BookContext';
import { onError } from '../utils';

const BooksPage = () => {
  const { state, fetchBooks, collectionRef } = useContext(BookContext);
  
  useEffect(() => {
    fetchBooks({onError});
    const subscriber = collectionRef.current;

    return () => {
      subscriber();
    }
  }, [collectionRef, fetchBooks]);

  return (
    <Fragment>
      <h2 className="Page__Title">Libros subidos a la plataforma</h2>
      <div className="flex flex--column items--center">
        {
          state.loading ?
            <Loader /> :
            (state.books && state.books.length > 0) ?
              state.books.map((element) => <BookItem book={element} key={`book: ${element.id}`} />) :
              <Empty message="No hay libros en la plataforma" />
        }
      </div>
    </Fragment>
  );
}

export default BooksPage;