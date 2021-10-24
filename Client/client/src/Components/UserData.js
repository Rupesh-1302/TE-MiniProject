import React from "react";
import { Avatar, Typography, Divider } from "@mui/material";
import { red } from "@mui/material/colors";
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

function UserData({ user }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        {user.profileImage ? (
          <Avatar
            alt="User Profile pic"
            src="/images/logo.png"
            sx={{ width: 150, height: 150 }}
          />
        ) : (
          <Avatar
            alt="User Profile pic"
            sx={{ width: 150, height: 150, bgcolor: red[500] }}
          >
            <Typography variant="h4">
              {user.firstName[0].toUpperCase()}
            </Typography>
          </Avatar>
        )}
        <div className={classes.dataDisplay}>
          <div>
            <Typography variant="h5">{user.username}</Typography>
          </div>
          <div className={classes.innerDiv}>
            <Typography variant="h6">{user.userPosts.length} Posts</Typography>
            <Typography variant="h6">
              {user.userAuction.length} Auctions
            </Typography>
            <Typography variant="h6">
              {user.userTender.length} Tenders
            </Typography>
            <Typography variant="h6">
              {user.followers.length} Followers
            </Typography>
            <Typography variant="h6">
              {user.following.length} Following
            </Typography>
          </div>
          <div>
            <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default UserData;
