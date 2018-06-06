import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';



export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={ Home } />
      <Route path="/register" exact component={ Register } />
      <Route path="/login" exact component={ Login } />
      <Route path="/create-team" exact component={ CreateTeam } />
    </Switch>
  </Router>
);
