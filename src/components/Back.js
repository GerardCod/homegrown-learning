import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Back = ({backUrl}) => {
  return (
    <Link to={backUrl} className="flex items--center">
      <FaChevronLeft />
      <span>Regresar</span>
    </Link>
  );
}

Back.propTypes = {
  backUrl: PropTypes.string.isRequired
};

export default Back;