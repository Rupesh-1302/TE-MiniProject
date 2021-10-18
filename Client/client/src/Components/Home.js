import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Post from "./Post";
import axios from "axios";

axios.defaults.withCredentials = true;

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "40px",
    paddingBottom: "40px",
  },
});

function Home() {
  const classes = useStyles();

  const [posts, setPosts] = useState(null);
  const handlePostList = (postList) => {
    setPosts((prevPosts) => {
      if (prevPosts) {
        return [...postList, ...prevPosts];
      } else {
        return [...postList];
      }
    });
  };
  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:8000/posts/");
      if (!res.data.error) {
        handlePostList(res.data.posts);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  let newPostList = [];
  if (posts) {
    newPostList = posts.map((post) => {
      return (
        <Grid item>
          <Post post={post} />
        </Grid>
      );
    });
  }

  return (
    <>
      <Container xs={"lg"} className={classes.mainContainer}>
        <Grid container direction={"column"} alignItems={"center"} spacing={3}>
          {newPostList}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
