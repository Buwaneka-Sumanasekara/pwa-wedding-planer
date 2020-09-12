import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GuestsPage from "./pages/GuestsPage";
import InvitationPage from "./pages/InvitationPage";
import GuestsManagePage from "./pages/GuestsUpdatePage";
import DashboardPage from "./pages/Dashboard";

import {
  ROUTE_HOME,
  ROUTE_GUESTS,
  ROUTE_INVITATION,
  ROUTE_GUEST_MANAGE,
  ROUTE_DASHBOARD,
} from "./constants/Routes";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path={ROUTE_HOME} exact component={HomePage} />
          <Route path={ROUTE_GUESTS} exact component={GuestsPage} />
          <Route path={ROUTE_INVITATION} exact component={InvitationPage} />
          <Route path={ROUTE_GUEST_MANAGE} exact component={GuestsManagePage} />
          <Route path={ROUTE_DASHBOARD} exact component={DashboardPage} />
          <Route component={HomePage} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
