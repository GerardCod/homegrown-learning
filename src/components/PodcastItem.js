import React from 'react';
import { FaBook } from 'react-icons/fa';

const PodcastItem = ({podcast}) => {
  return (
    <article className="PodcastItem flex content--start">
      <FaBook className="text--accent PodcastItem__Icon" />
      <div className="PodcastItem__Content">
        <h2 className="margin--none text--accent">{podcast.title}</h2>
        <span>Subido el 10/07/2021</span>
      </div>
    </article>
  );
}

export default PodcastItem;