import React, { useState } from "react";
import "../styles/Login.css";
import img_login from "../assets/img/img_login.svg";
import { Link, Redirect } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

function Login() {
  const [redirect, setRedirect] = useState(false);

  return (
    <React.Fragment>
      <div className="LoginContainer">
        {
          redirect && <Redirect to="platform" />
        }
        <div className="LoginForm">
          <div className="LoginForm__return">
            <BsChevronLeft color="#6f58c9" size="20px" /> <Link to="/">Regresar</Link>
          </div>
          <div className="LoginForm__img">
            <img src={img_login} alt="" />
          </div>
          <form>
            <div className="LoginForm__inputs">
              <input
                type="email"
                name=""
                id=""
                placeholder="Correo electrónico"
              />
              <input type="password" name="" id="" placeholder="Contraseña" />
              <Link to="/forgotpassword">¿Olvidaste tu contraseña?</Link>
              <button onClick={() => { setRedirect(true); }}>Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
