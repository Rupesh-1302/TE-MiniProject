import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth";

function ProtectedRoute({ component: Component, ...rest }) {
  console.log("inside protected Route");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAutenticated()) {
          console.log(auth.isAutenticated(), "True part");
          return <Component {...props} user={auth.getUser()} />;
        } else {
          console.log("false part");
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
