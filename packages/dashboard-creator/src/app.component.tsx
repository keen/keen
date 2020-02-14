import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Grid from './components/grid/grid.component';

const App = () => (
  <>
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <div>home</div>} />
        <Route exact path="/dashboards" render={() => <div>List</div>} />
        <Route
          exact
          path="/dashboard/:id"
          render={() => (
            <div>
              <Grid />
            </div>
          )}
        />
      </Switch>
    </HashRouter>
  </>
);

export default App;
