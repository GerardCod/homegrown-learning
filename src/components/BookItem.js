import React, { Fragment } from 'react';
import { FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookItem = ({book}) => {
  return (
    <Fragment>
      <article className="PodcastItem flex content--start">
        <FaBook className="text--info PodcastItem__Icon" />
        <div className="PodcastItem__Content">
          <h2 className="margin--none PodcastItem__Title">
            <Link to={`/platform/books/${book.id}`} className="text--info">
              {book.title}
            </Link>
          </h2>
          <span className="PodcastItem__Date">Subido el {book.postDate} a las {book.postTime}</span>
        </div>
      </article>
    </Fragment>
  );
};

export default BookItem;