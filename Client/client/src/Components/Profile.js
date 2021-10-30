import { Container, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import UserData from "./UserData";
import ProfilePostList from "./ProfilePostList";
import ProfileTenderList from "./ProfileTenderList";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GridOn, Gavel, Assignment } from "@mui/icons-material";
import axios from "axios";
axios.defaults.withCredentials = true;
const useStyles = makeStyles({
  mainContainer: {
    marginTop: "30px",
    padding: "10px",
  },
});

function Profile() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Post");
  const [user, setUser] = React.useState(null);

  const handleUser = (newUser) => {
    setUser(newUser);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePostPortalOpen = (post, value) => {
    post.author = user;
    console.log(post, value);
  };

  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/userProfile", {
        withCredentials: true,
      });
      if (res.data.error) {
        throw new Error(res.data.message);
      } else {
        console.log(res.data);
        axios.defaults.withCredentials = false;
        handleUser(res.data.user);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      {user ? <UserData user={user} /> : "User Not Found"}
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          centered
        >
          <Tab icon={<GridOn />} label="Posts" value="Post" />
          <Tab icon={<Gavel />} label="Auctions" value="Auction" />
          <Tab icon={<Assignment />} label="Tenders" value="Tender" />
        </TabList>
        <TabPanel value="Post">
          {user ? (
            <ProfilePostList
              userPosts={user.userPosts}
              value="Post"
              handlePostPortalOpen={handlePostPortalOpen}
            />
          ) : (
            "No Posts Yet"
          )}
        </TabPanel>
        <TabPanel value="Auction">
          {user ? (
            <ProfilePostList
              userPosts={user.userAuction}
              value="Auction"
              handlePostPortalOpen={handlePostPortalOpen}
            />
          ) : (
            "No Posts Yet"
          )}
        </TabPanel>
        <TabPanel value="Tender">
          {user ? (
            <ProfileTenderList
              userTender={user.userTender}
              value="Tender"
              handlePostPortalOpen={handlePostPortalOpen}
            />
          ) : (
            "No Tender Yet"
          )}
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default Profile;
