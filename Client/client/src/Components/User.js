import React from "react";
import TopNav from "./TopNav";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import Home from "./Home";
import Auction from "./Auction";

function User() {
  const { path } = useRouteMatch();
  return (
    <div>
      <TopNav />
      <Switch>
        <Route path={`${path}/home`}>
          <Home />
        </Route>
        <Route path={`${path}/auction`}>
          <Auction />
        </Route>
      </Switch>
    </div>
  );
}

export default User;
