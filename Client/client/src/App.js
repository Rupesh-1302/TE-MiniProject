import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import User from "./Components/User";

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
            <Login verifiedUser={verifiedUser} />
          </Route>
          <Route path="/signup">
            <h1>Signup</h1>
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
