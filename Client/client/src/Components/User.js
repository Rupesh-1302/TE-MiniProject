import React from "react";
import TopNav from "./TopNav";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import Home from "./Home";
import Auction from "./Auction";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Profile from "./Profile";
import Explore from "./Explore";

function User() {
  const { path } = useRouteMatch();
  return (
    <div>
      <TopNav />
      <Switch>
        <Route path={`${path}/home`}>
          <Home />
          <Fab
            color="secondary"
            variant="extended"
            sx={{
              position: "fixed",
              bottom: "100px",
              right: "200px",
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            NEW POST
          </Fab>
        </Route>
        <Route path={`${path}/auction`}>
          <Auction />
          <Fab
            color="secondary"
            variant="extended"
            sx={{
              position: "fixed",
              bottom: "100px",
              right: "200px",
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            NEW Auction
          </Fab>
        </Route>
        <Route path={`${path}/profile`}>
          <Profile />
        </Route>
        <Route path={`${path}/explore`}>
          <Explore />
        </Route>
      </Switch>
    </div>
  );
}

export default User;
