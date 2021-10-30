import React, { useRef, useEffect } from "react";
import TopNav from "./TopNav";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import Profile from "./Profile";
import Explore from "./Explore";
import HomeRoute from "./HomeRoute";
import AuctionRoute from "./AuctionRoute";
import TenderRoute from "./TenderRoute";
import { makeStyles } from "@mui/styles";
import Chat from "./Chat";
const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#EEEEEE",
    minHeight: "100vh",
    height: "100%",
  },
});

function User(props) {
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
        <Route path={`${path}/tender`}>
          <TenderRoute />
        </Route>
        <Route path={`${path}/chat`}>
          <Chat username={props.user.username} />
        </Route>
      </Switch>
    </div>
  );
}

export default User;
