import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import RegisterUser from './pages/Register/User';
import SingIn from './pages/SingIn';
import Home from './pages/Home';

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
      <Route path='/registerUser' component={() => <RegisterUser />} />
      <PrivateRoute path='/here' component={() => <h1>Private Route</h1>} />
      <Route path='*' component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
