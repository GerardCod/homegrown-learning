import React, { Fragment } from 'react';
import { FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MaterialLinkItem = function Component({material}) {
  return (
    <Fragment>
      <article className="PodcastItem flex content--start">
        <FaFile className="text--primary PodcastItem__Icon" />
        <div className="PodcastItem__Content">
          <Link to={{
            pathname: material.link
          }} replace>
            <h2 className="margin--none PodcastItem__Title">{material.title}</h2>
          </Link>
          <span className="PodcastItem__Date">Subido el {material.postDate} a las {material.postTime}</span>
        </div>
      </article>
    </Fragment>
  )
}

export default MaterialLinkItem;