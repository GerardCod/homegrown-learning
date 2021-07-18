import React, { Fragment } from 'react';

const Comment = ({user: {name, avatar}, comment, postDate, postTime}) => {
  return (
    <Fragment>
      <article className="grid Comment">
        <figure className="Comment__Avatar">
          <img src={avatar} />
        </figure>
        <div className="Comment__Content flex flex--column">
          <h5 className="Comment__Username">{name}</h5>
          <p className="Comment__Message">{comment}</p>
          <span className="Comment__Date">Hecho el {postDate} a las {postTime}</span>
        </div>
      </article>
    </Fragment>
  );
};

export default Comment;