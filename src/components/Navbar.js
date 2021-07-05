import React from 'react';
import { Link } from 'react-router-dom';

const avatar = 'https://firebasestorage.googleapis.com/v0/b/homegrown-learning.appspot.com/o/avatar_katia.webp?alt=media&token=15295e33-bd7e-4948-90dd-cc60e6d5a2e2';

const Navbar = () => {
  return (
    <nav>
      <figure>
        <img src={avatar} alt="avatar_img" />
      </figure>

      <div>
        <Link to="">
          Actividades
        </Link>
        <Link to="">
          Evaluaciones
        </Link>
        <div>
          <span>Material de clase</span>
          <ul>
            <Link to="">Vídeos</Link>
            <Link to="">Libros</Link>
            <Link to="">Podcasts</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;