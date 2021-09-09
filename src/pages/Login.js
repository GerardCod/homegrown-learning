import React, { useContext, useRef, useState } from "react";
import "../styles/Login.css";
import img_kid from '../assets/img/kid.png';
import img_tutor from '../assets/img/teacher.png';
import { Link, Redirect, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { AuthContext } from '../contexts/AuthContext';
import { onError } from "../utils";

function Login() {
  const [data, setData] = useState({email: '', password: ''});
  const { signIn } = useContext(AuthContext);
  const formRef = useRef({});
  const { role } = useParams();

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    signIn({...data, slugName: role}, { onError });
    setData({email: '', password: ''});
    formRef.current.reset();
  }

  return (
    <React.Fragment>
      <div className="LoginContainer">
        {
          localStorage.getItem('user') && <Redirect to="/platform/activities" />
        }
        <div className="LoginForm">
          <div className="LoginForm__return">
            <BsChevronLeft color="#6f58c9" size="20px" /> <Link to="/signin">Regresar</Link>
          </div>
          <div className="LoginForm__img">
            <img src={role === 'Estudiante' ? img_kid : img_tutor} alt="avatar_login" />
          </div>
          <form onSubmit={handleSubmit} ref={ formRef }>
            <div className="LoginForm__inputs flex flex--column items--center">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                value={data.email.trim()}
              />
              <input 
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={data.password.trim()}
              />
              <Link to={`/forgotpassword/${role}`} className="align-self--end">¿Olvidaste tu contraseña?</Link>
              <button className="Button--Primary" disabled={(!data.email || !data.password)}>Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
