import React, { Fragment } from 'react';
import { FaMailBulk, FaPhone, FaUser } from 'react-icons/fa';

const Footer = function Component() {
  return (
    <Fragment>
      <footer className="Footer">
        <article className="Footer__Content">
          <h3 className="Footer__Title text--white">Contacto</h3>
          <div className="flex text--white Contact">
            <FaUser />
            <span className="Contact__Value">Katia Lizbeth Castro Rodríguez</span>
          </div>
          <div className="flex text--white Contact">
            <FaPhone />
            <span className="Contact__Value">2381199054</span>
          </div>
          <div className="flex text--white Contact">
            <FaMailBulk />
            <span className="Contact__Value">katiacastrogz@gmail.com</span>
          </div>
        </article>
      </footer>
    </Fragment>
  );
}

export default Footer;