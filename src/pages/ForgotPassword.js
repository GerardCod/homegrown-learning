import React, { useState, useRef, useContext } from "react";
import "../styles/ForgotPassword.css";
import img_kid from '../assets/img/kid.png';
import img_tutor from '../assets/img/teacher.png';
import { Link, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { AuthContext } from "../contexts/AuthContext";
import { onError, onSuccess } from "../utils";
import { FaCircleNotch } from 'react-icons/fa';

function ForgotPassword() {
  const { role } = useParams();
  const [data, setData] = useState({email: ''});
  const formRef = useRef({});
  const { state, sendForgotPasswordEmail } = useContext(AuthContext);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    sendForgotPasswordEmail(data.email, {onSuccess, onError});
    setData({email: ''});
    formRef.current.reset();
  }

  return (
    <React.Fragment>
      <div className="ForgotContainer">
        <div className="ForgotForm">
          <div className="ForgotForm__return">
            <BsChevronLeft color="#6f58c9" size="20px" />{" "}
            <Link to={`/login/${role}`}>Regresar</Link>
          </div>
          <div className="LoginForm__img">
            <img src={role === 'Estudiante' ? img_kid : img_tutor} alt="forgot_avatar" />
          </div>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="ForgotForm__inputs">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                value={data.email}
                onChange={handleChange}
              />
              {
                state.loading ?
                <button className="Button--Primary" disabled> <FaCircleNotch className="loading" /> Enviando correo</button> :
                <button className="Button--Primary" disabled={!data.email}>Enviar correo</button>
              }
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ForgotPassword;
