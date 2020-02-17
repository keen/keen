import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { DashboardList, EditDashboard, Dashboard } from './pages';

import { ROUTES } from './constants';

const App = () => (
  <>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={DashboardList} />
        <Route
          exact
          path={`${ROUTES.EDIT_DASHBOARD}/:id`}
          component={EditDashboard}
        />
        <Route exact path={`${ROUTES.DASHBOARD}/:id`} component={Dashboard} />
      </Switch>
    </HashRouter>
  </>
);

export default App;
