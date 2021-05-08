import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import List from './pages/List';
import RegisterUser from './pages/Register/User';
import SingIn from './pages/SingIn';

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
      <Route exact path='/' component={() => <SingIn />} />
      <Route path='/registeruser' component={() => <RegisterUser />} />
      <Route path='/list' component={() => <List />} />
      <Route path='/services/:id' component={() => <Services />} />
      <PrivateRoute path='/app' component={() => <h1>App</h1>} />
      <Route path='*' component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
