import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from '../components/Loader';

// Providers
const AuthProvider = React.lazy(() => import('../contexts/AuthContext'));

// Components and routers
const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
const PlatformRouter = React.lazy(() => import('./PlatformRouter'));
const HomePage = React.lazy(() => import('../pages/HomePage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signin" component={Home} />
            <Route path="/login/:role" component={Login} />
            <Route path="/forgotpassword/:role" component={ForgotPassword} />
            <Route path="/platform" component={PlatformRouter} />
          </Switch>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
