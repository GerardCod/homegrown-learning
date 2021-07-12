import React from 'react';
import { FaPodcast } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PodcastItem = ({podcast}) => {
  return (
    <article className="PodcastItem flex content--start">
      <FaPodcast className="text--accent PodcastItem__Icon" />
      <div className="PodcastItem__Content">
        <h2 className="margin--none">
          <Link to={`/platform/podcasts/${podcast.id}`} className="text--accent">
            {podcast.title}
          </Link>
        </h2>
        <span>Subido el 10/07/2021</span>
      </div>
    </article>
  );
}

export default PodcastItem;