import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="LoaderContainer">
      <FaCircleNotch className="text--accent Loader" />
    </div>
  );
}

export default Loader;