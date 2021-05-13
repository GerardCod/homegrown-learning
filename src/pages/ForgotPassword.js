import React from "react";
import "../styles/ForgotPassword.css";
import img_login from "../assets/img/img_login.svg";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

function ForgotPassword() {
  return (
    <React.Fragment>
      <div className="ForgotContainer">
        <div className="ForgotForm">
          <div className="ForgotForm__return">
            <BsChevronLeft color="#6f58c9" size="20px" />{" "}
            <Link to="/login">Regresar</Link>
          </div>
          <div className="LoginForm__img">
            <img src={img_login} alt="" />
          </div>
          <form>
            <div className="ForgotForm__inputs">
              <input
                type="email"
                name=""
                id=""
                placeholder="Correo electrónico"
              />
              <button>Enviar correo</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ForgotPassword;
