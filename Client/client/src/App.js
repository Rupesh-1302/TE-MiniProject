import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import User from "./Components/User";
import Signin from "./Components/SignIn";
import Signup from "./Components/Signup";
import axios from "axios";
import ProtectedRoute from "./Components/ProtectedRoute";
import auth from "./auth";
import CheckLogin from "./Components/CheckLogin";

axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <CheckLogin />
          <Switch>
            <Route exact path="/" exact>
              <Redirect to="/user/home" />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <>
                <Signin />
              </>
            </Route>
            <ProtectedRoute path="/user" component={User} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default withRouter(App);
