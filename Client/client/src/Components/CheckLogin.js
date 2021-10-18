import React, { useEffect } from "react";
import auth from "../auth";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";

axios.defaults.withCredentials = true;

function CheckLogin() {
  let history = useHistory();
  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/isLoggedIn");
      if (!res.data.error) {
        console.log(res.data.user);
        auth.login(res.data.user, () => {
          console.log("user call");
          history.push("/user/home");
        });
      } else {
        auth.logout(() => {
          console.log("logout");
          history.push("/login");
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  return <div></div>;
}

export default withRouter(CheckLogin);
