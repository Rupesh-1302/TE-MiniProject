import React from "react";
import { Avatar, Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    marginBottom: "30px",
  },
  dataDisplay: {
    flexGrow: "1",
    padding: "10px",
    marginLeft: "100px",
  },
  innerDiv: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "10px",
    marginBottom: "10px",
  },
});

function UserData() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        <Avatar
          alt="Remy Sharp"
          src="/images/logo.png"
          sx={{ width: 150, height: 150 }}
        />
        <div className={classes.dataDisplay}>
          <div>
            <Typography variant="h5">Rupesh_Agarwal</Typography>
          </div>
          <div className={classes.innerDiv}>
            <Typography variant="h6">24 Posts</Typography>
            <Typography variant="h6">400 Followers</Typography>
            <Typography variant="h6">200 Following</Typography>
          </div>
          <div>
            <Typography variant="body1">Rupesh Agarwal</Typography>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default UserData;
