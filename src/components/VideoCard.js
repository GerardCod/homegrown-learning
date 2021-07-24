import React, { Fragment } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link, useRouteMatch } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const match = useRouteMatch('/platform/videos');

  return (
    <Fragment>
      <article className="VideoCard">
        <Link to={`${match}/${video.id}`} className="width--full height--full">
          <div className="grid VideoCard__Content width--full height--full">
            <figure className="VideoCard__Illustration flex items--center content--center">
              <FaPlay />
            </figure>
            <footer className="VideoCard__Footer">
              <h4>{video.title}</h4>
            </footer>
          </div>
        </Link>
      </article>
    </Fragment>
  );
}

export default VideoCard;