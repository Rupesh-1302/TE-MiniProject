import React, { useEffect } from "react";
import auth from "../auth";
import axios from "axios";
import { useHistory, withRouter, useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

function CheckLogin() {
  let history = useHistory();
  let location = useLocation();
  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/isLoggedIn");
      if (!res.data.error) {
        auth.login(res.data.user, () => {
          console.log("user call");
          history.push(location.pathname);
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
