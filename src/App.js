import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GuestsPage from "./pages/GuestsPage";

import { ROUTE_HOME, ROUTE_GUESTS } from "./constants/Routes";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path={ROUTE_HOME} exact component={HomePage} />
          <Route path={ROUTE_GUESTS} exact component={GuestsPage} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
