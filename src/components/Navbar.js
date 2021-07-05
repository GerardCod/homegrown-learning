import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const avatar = 'https://firebasestorage.googleapis.com/v0/b/homegrown-learning.appspot.com/o/avatar_katia.webp?alt=media&token=15295e33-bd7e-4948-90dd-cc60e6d5a2e2';

const Navbar = () => {
  return (
    <Fragment>
      <nav className="flex width--full height--20vh Navbar items--center">
        <figure className="Navbar__Avatar">
          <img src={avatar} alt="avatar_img" />
        </figure>
        <h3 className="Navbar__User">Bienvenida Katia</h3>
        <div className="flex height--full items--center Navbar__Menu content--around">
          <Link to="">
            <span className="Navbar__Link">
              Actividades
            </span>
          </Link>
          <Link to="">
            <span className="Navbar__Link">
              Evaluaciones
            </span>
          </Link>
          <div className="Navbar--Dropdown">
            <span className="Navbar__Link">Material de clase</span>
            <ul className="Dropdown__Items">
              <Link to="">Vídeos</Link>
              <Link to="">Libros</Link>
              <Link to="">Podcasts</Link>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;