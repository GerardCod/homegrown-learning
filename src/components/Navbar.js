import React, { Fragment, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';

const avatar = 'https://firebasestorage.googleapis.com/v0/b/homegrown-learning.appspot.com/o/avatar_katia.webp?alt=media&token=15295e33-bd7e-4948-90dd-cc60e6d5a2e2';

const Navbar = () => {
  const dropRef = useRef({});
  const { signOut } = useContext(AuthContext);

  const revealDrop = () => {
    dropRef.current.classList.toggle('Dropdown__Items--Active');
  }

  const exit = () => {
    signOut();
  }

  return (
    <Fragment>
      <nav className="flex width--full height--20vh Navbar items--center">
        <figure className="Navbar__Avatar">
          <img src={avatar} alt="avatar_img" />
        </figure>
        <h3 className="Navbar__User text--white">Bienvenida Katia</h3>
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
          <div className="Navbar__Dropdown">
            <span className="Navbar__Link cursor--pointer" onClick={revealDrop}>Material de clase <FaAngleDown /></span>
            <ul className="Dropdown__Items flex flex--column" ref={dropRef}>
              <Link to="">Vídeos</Link>
              <Link to="">Libros</Link>
              <Link to="">Podcasts</Link>
            </ul>
          </div>
          <Link to="/" onClick={exit}>
            <span className="Navbar__Link">Salir <FaSignOutAlt /></span>
          </Link>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;