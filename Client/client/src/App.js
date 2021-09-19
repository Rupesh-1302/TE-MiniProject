import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  async function TestConnection() {
    const res = await axios.get("http://localhost:8000/home");
    setData(res.data);
  }
  useEffect(() => {
    TestConnection();
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home">
            <h1>{data}</h1>
          </Route>
          <Route path="/link">
            <h1>This is link page</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
