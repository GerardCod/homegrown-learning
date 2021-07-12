import React from 'react';
import illustration from '../assets/img/empty.svg';
import PropTypes from 'prop-types';

const Empty = ({message}) => {
  return (
    <figure className="Void">
      <img className="Void__Img" src={illustration} alt="illustration" />
      <figcaption className="Void__Message">{message}</figcaption>
    </figure>
  );
}

Empty.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Empty;