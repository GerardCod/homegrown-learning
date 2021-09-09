import React, { Fragment } from 'react';
import logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';

const HomeNavbar = function Component() {
  return (
    <Fragment>
      <nav className="flex width--full HomeNavbar content--around items--center">
        <figure className="HomeNavbar__Logo flex items--center">
          <img src={logo} alt="logo_platform" />
          <h4 className="HomeNavbar__Text">Homegrown Learning</h4>
        </figure>
        <Link to="/signin" className="HomeNavbar__Text">
          Iniciar sesión
        </Link>
      </nav>
    </Fragment>
  );
}

export default HomeNavbar;