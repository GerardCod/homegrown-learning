import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../components/Back';
import Loader from '../components/Loader';
import { BookContext } from '../contexts/BookContext';
import { onError } from '../utils';

const BookDetailsPage = () => {
  const { state, fetchBook, documentRef } = useContext(BookContext);
  const { id } = useParams();

  useEffect(() => {
    fetchBook(id, {onError: onError});
    const subscriber = documentRef.current;

    return () => {
      subscriber();
    }
  }, [id, documentRef, fetchBook]);

  return (
    <Fragment>
      <Back backUrl="/platform/books" />
      {
        state.bookSelected ? 
        <div>
          <br />
          <h2 className="Page__Title">
            <a href={state.bookSelected.url} target="_blank" rel="noreferrer">
              {state.bookSelected.title}
            </a>
          </h2>
          <br />
          <p>{state.bookSelected.description}</p>
          <br />
          <br />
          <iframe src={state.bookSelected.url} title={state.bookSelected.title} className="Page--Book"></iframe>
        </div> :
        <Loader />
      }
    </Fragment>
  );
}

export default BookDetailsPage;