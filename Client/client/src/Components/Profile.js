import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import UserData from "./UserData";
import ProfilePostList from "./ProfilePostList";
const useStyles = makeStyles({
  mainContainer: {
    marginTop: "30px",
    marginBottom: "30px",
    padding: "10px",
  },
});

function Profile() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <UserData />
      <ProfilePostList />
    </Container>
  );
}

export default Profile;
