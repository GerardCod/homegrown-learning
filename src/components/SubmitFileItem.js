import React, { Fragment } from 'react';
import { FaFileAlt } from 'react-icons/fa';

const SubmitFileItem = ({ file }) => {
  
  return (
    <Fragment>
      <article className="PodcastItem flex content--start">
      <FaFileAlt className="text--info PodcastItem__Icon" />
      <div className="PodcastItem__Content">
        <h2 className="margin--none PodcastItem__Title text--info">
          {file.name}
        </h2>
      </div>
    </article>
    </Fragment>
  );
}

export default SubmitFileItem;