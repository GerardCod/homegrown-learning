import React, { Fragment } from 'react';
import { useRouteMatch, Route } from 'react-router';
import BooksPage from '../pages/BooksPage';
import BookDetailsPage from '../pages/BookDetailsPage';

const BookRouter = () => {
  const { path } = useRouteMatch('/platform/books');

  return (
    <Fragment>
      <Route path={path} exact component={BooksPage} />
      <Route path={`${path}/:id`} component={BookDetailsPage} />
    </Fragment>
  );
};

export default BookRouter;