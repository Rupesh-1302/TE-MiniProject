import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import User from "./Components/User";
import Signin from "./Components/SignIn";
import Signup from "./Components/Signup";

function App() {
  const [login, setLogin] = useState(true);
  function verifiedUser(verification) {
    setLogin(verification);
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/user" />
          </Route>
          <Route path="/login">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/user">
            {login ? <User /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
