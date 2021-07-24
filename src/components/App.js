import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import PlatformRouter from "./PlatformRouter";
import AuthProvider from '../contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login/:role" component={Login} />
          <Route path="/forgotpassword/:role" component={ForgotPassword} />
          <Route path="/platform" component={PlatformRouter} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
