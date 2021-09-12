import React from "react";
import img_kid from "../assets/img/kid.png";
import img_tutor from "../assets/img/teacher.png";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <div className="HomeList flex flex--wrap">
        <h1 className="text--white text--center title--main">Bienvenido a Homegrown Learning</h1>
        <div className="HomeList__item">
          <Link to="login/Estudiante" >
            <div className="card">
              <div className="HomeList__item__img">
                <img src={img_kid} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Ingresar como estudiante</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="HomeList__item">
          <Link to="login/Docente">
            <div className="card">
              <div className="HomeList__item__img">
                <img src={img_tutor} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Ingresar como docente</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
