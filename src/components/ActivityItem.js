import React, { Fragment } from 'react';
import { FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ActivityItem = ({ activity }) => (
  <Fragment>
    <article className="PodcastItem flex content--start">
      <FaFile className="text--success PodcastItem__Icon" />
      <div className="PodcastItem__Content">
        <h2 className="margin--none PodcastItem__Title">
          <Link to={`/platform/activities/${activity.id}`} className="text--success">
            { activity.title }
          </Link>
        </h2>
        <span className="PodcastItem__Date">Subido el 10/07/2021</span>
      </div>
    </article>
  </Fragment>
);

export default ActivityItem;