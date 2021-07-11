import React from 'react';
import { FaBook } from 'react-icons/fa';

const PodcastItem = ({podcast}) => {
  return (
    <article className="PodcastItem flex content--start">
      <FaBook />
      <div className="PodcastItem__Content">
        <h2>{podcast.title}</h2>
        <span>Subido el 10/07/2021</span>
      </div>
    </article>
  );
}

export default PodcastItem;