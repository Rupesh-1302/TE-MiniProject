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
<<<<<<< HEAD
import PostModal from "./Components/PostModal";

=======
import PostModel from "./Components/PostModal";
>>>>>>> ce8308b4b8035c2fa0cec588a1657329aef67b14

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
            {/* <Signup /> */}
            <PostModal />
          </Route>
          <Route path="/user">
            {login ? 
            <User /> : <Redirect to="/login" />}
          </Route>
          <Route path="/postModel">
            <PostModel />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
