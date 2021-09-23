import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useHistory();
  function handleCredentials(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function checkLogin(e) {
    e.preventDefault();
    // console.log(credentials);
    const res = await axios.post("http://localhost:8000/login", credentials);
    // console.log(res);
    if (res.data) {
      props.verifiedUser(true);
      history.push("/user");
    } else {
      props.verifiedUser(false);
    }
  }
  return (
    <div className="container">
      <form onSubmit={checkLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={handleCredentials}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            id="exampleInputPassword1"
            onChange={handleCredentials}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
