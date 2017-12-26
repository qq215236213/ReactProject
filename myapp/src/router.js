import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import WebLogin from './components/Login/WebLogin';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={IndexPage} />
        {/*<Route path='/login' component={WebLogin} />*/}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
