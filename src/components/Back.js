import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Back = ({backUrl}) => {
  return (
    <Link to={backUrl}>
      <FaArrowLeft />
      <span>Regresar</span>
    </Link>
  );
}

Back.propTypes = {
  backUrl = PropTypes.string.isRequired
};

export default Back;