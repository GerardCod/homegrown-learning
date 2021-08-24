import React, { Fragment } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AssessmentItem = function component({ assessment }) {
  return (
    <Fragment>
      <article className="PodcastItem flex content--start">
        <FaClipboardList className="PodcastItem__Icon text--accent" />
        <div className="PodcastItem__Content">
          <h2 className="margin--none PodcastItem__Title">
            <Link to={`/platform/assessments/${assessment.id}`} className="text--accent">
              { assessment.title }
            </Link>
          </h2>
          <span className="PodcastItem__Date">Subido el { assessment.postDate } a las { assessment.postTime }</span>
        </div>
      </article> 
    </Fragment>
  );
}

export default AssessmentItem;