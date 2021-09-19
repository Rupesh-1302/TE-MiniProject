import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  async function TestConnection() {
    const res = await axios.get("http://localhost:8000/home");
    console.log(res);
  }
  useEffect(() => {
    TestConnection();
  }, []);
  return <div className="App"></div>;
}

export default App;
