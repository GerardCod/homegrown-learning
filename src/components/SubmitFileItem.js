import React, { Fragment } from 'react';
import { FaFileAlt, FaTimes } from 'react-icons/fa';
const SubmitFileItem = ({ file, removeFile, remove }) => {
  
  return (
    <Fragment>
      <article className="PodcastItem flex content--start items--center">
      <FaFileAlt className="text--info PodcastItem__Icon" />
      <div className="PodcastItem__Content width--full flex content--between">
        <h2 className="margin--none PodcastItem__Title text--info">
          <a href={file.url} target="_blank" rel="noreferrer"> { file.name } </a>
        </h2>
        {
          remove &&  <FaTimes className="cursor--pointer" onClick={() => removeFile(file)}/>
        }
      </div>
    </article>
    </Fragment>
  );
}

export default SubmitFileItem;