import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Services from './pages/Service';
import RegisterUser from './pages/Register/User';
import RegisterBusiness from './pages/Register/Business';
import UploadPhotos from './pages/UploadPhotos';
import SingIn from './pages/SingIn';
import Home from './pages/Home';
import UpdateService from './pages/UpdateService';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={() => <Home />} />
      <Route exact path='/login' component={() => <SingIn />} />
      <Route path='/registeruser' component={() => <RegisterUser />} />
      <Route path='/registerbusiness' component={() => <RegisterBusiness />} />
      <Route path='/uploadphotos' component={() => <UploadPhotos />} />
      <Route path='/service/:slug' component={() => <UpdateService />} />
      <Route path='/services/:id' component={() => <Services />} />
      <PrivateRoute path='/app' component={() => <h1>App</h1>} />
      <Route path='*' component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
