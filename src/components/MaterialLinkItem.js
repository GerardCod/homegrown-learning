import React, { Fragment } from 'react';
import { FaFile } from 'react-icons/fa';

const MaterialLinkItem = function Component({material}) {
  return (
    <Fragment>
      <article className="PodcastItem flex content--start">
        <FaFile className="text--primary PodcastItem__Icon" />
        <div className="PodcastItem__Content">
          <h2 className="margin--none PodcastItem__Title">
            <a href={material.link} target="_blank" rel="noreferrer">{material.title}</a>
          </h2>
          <span className="PodcastItem__Date">Subido el {material.postDate} a las {material.postTime}</span>
        </div>
      </article>
    </Fragment>
  )
}

export default MaterialLinkItem;