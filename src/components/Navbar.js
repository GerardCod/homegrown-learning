import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaBars, FaBook, FaCheck, FaFile, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import DropdownItem from './DropdownItem';
import { FaVideo, FaPodcast } from 'react-icons/fa';
import { ClickAwayListener } from '@material-ui/core';
import guest from '../assets/img/1.png';

const Navbar = () => {
  const { signOut, getCurrentUser } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [user, setUser] = useState({});
  const dropRef = useRef({});
  const menuRef = useRef({});
  const [reveal, setReveal] = useState(false);

  const revealDrop = () => {
    dropRef.current.classList.toggle('Dropdown__Items--Active');
    setReveal(!reveal);
  }

  const exit = () => {
    signOut();
  }

  const hideMenu = () => {
    menuRef.current.classList.remove('Navbar__Menu--Active');
    setShow(true);
  }

  const showMenu = () => {
    menuRef.current.classList.add('Navbar__Menu--Active');
    setShow(false);
  }

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser({ ...currentUser });
  }, [getCurrentUser]);

  return (
    <Fragment>
      <ClickAwayListener onClickAway={hideMenu}>
        <nav className="flex width--full height--20vh Navbar items--center">
          {
            show ?
              <FaBars className="text--white margin-right--1rem cursor--pointer" onClick={showMenu} /> :
              <FaTimes className="text--white margin-right--1rem cursor--pointer" onClick={hideMenu} />
          }
          <figure className="Navbar__Avatar">
            <img src={user.avatar || guest} alt="avatar_img" />
          </figure>
          <h3 className="Navbar__User text--white">Hola de nuevo {user.name || 'Invitado'}</h3>
          <div className="flex Navbar__Menu" ref={menuRef}>
            <Link to="/platform/activities" className="Navbar__Link flex align--center">
              <FaFile />
              <span>Actividades</span>
            </Link>
            <Link to="/platform/assessments" className="Navbar__Link flex align--center">
              <FaCheck />
              <span>Evaluaciones</span>
            </Link>
            <div className="Navbar__Dropdown Navbar__Link">
              <span className="cursor--pointer" onClick={revealDrop}>
                {
                  reveal ?
                    <FaAngleUp /> :
                    <FaAngleDown />
                }
                Material de clase
              </span>
              <ul className="Dropdown__Items flex flex--column" ref={dropRef}>
                <DropdownItem className="text--white" text="Vídeos" to="/platform/videos" Icon={FaVideo} />
                <DropdownItem className="text--white" text="Audios" to="/platform/podcasts" Icon={FaPodcast} />
                <DropdownItem className="text--white" text="Libros" to="/platform/books" Icon={FaBook} />
              </ul>
            </div>
            <Link to="/" onClick={exit} className="Navbar__Link flex align--center">
              <FaSignOutAlt />
              <span>Salir</span>
            </Link>
          </div>
        </nav>
      </ClickAwayListener>
    </Fragment>
  );
}

export default Navbar;