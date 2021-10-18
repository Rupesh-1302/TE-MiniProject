import React, { useRef } from "react";
import TopNav from "./TopNav";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import Profile from "./Profile";
import Explore from "./Explore";
import HomeRoute from "./HomeRoute";
import AuctionRoute from "./AuctionRoute";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#EEEEEE",
  },
});

function User() {
  const { path } = useRouteMatch();
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <TopNav />
      <Switch>
        {/* <ProtectedRoute path={`${path}/home`} component={HomeRoute} /> */}
        <Route path={`${path}/home`}>
          <HomeRoute />
        </Route>
        <Route path={`${path}/auction`}>
          <AuctionRoute />
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
