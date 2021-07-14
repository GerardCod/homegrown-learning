import React from "react";
import img_classmate from "../assets/img/img_classmate.svg";
import img_tutor from "../assets/img/img_tutor.svg";
import img_teacher from "../assets/img/img_teacher.svg";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <div className="HomeList">
        <div className="HomeList__item">
          <Link to="login/E" >
            <div className="card">
              <div className="HomeList__item__img">
                <img src={img_classmate} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Alumno</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="HomeList__item">
          <Link to="login/T">
            <div className="card">
              <div className="HomeList__item__img">
                <img src={img_tutor} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Tutor</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="HomeList__item">
          <Link to="login/D">
            <div className="card">
              <div className="HomeList__item__img">
                <img src={img_teacher} alt="avatar" />
              </div>
              <div className="HomeList__item__title">
                <p>Docente</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
