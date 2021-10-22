import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TenderPost from "./TenderPost";
import axios from "axios";

axios.defaults.withCredentials = true;

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "40px",
    paddingBottom: "40px",
  },
});

function Tender() {
  const classes = useStyles();

  const [tenderPosts, setTenderPosts] = useState([
    {
      title: "first tender",
      maxBid: 20000,
      desc: "bbjknsfnkmdnk",
      expireDate: "22/3/5",
      timeOfPost: "4:31 22/10/2021",
      author: { username: "rupesh_agarwal", firstName: "Rupesh" },
    },
  ]);
  const handleTenderPostList = (postList) => {
    setTenderPosts((prevPosts) => {
      if (prevPosts) {
        return [...postList, ...prevPosts];
      } else {
        return [...postList];
      }
    });
  };
  // useEffect(async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/posts/");
  //     if (!res.data.error) {
  //       handleTenderPostList(res.data.posts);
  //     } else {
  //       throw new Error(res.data.message);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);
  let newTenderPostList = [];
  if (tenderPosts) {
    newTenderPostList = tenderPosts.map((tenderPost, key) => {
      return (
        <Grid item key={key}>
          <TenderPost tender={tenderPost} />
        </Grid>
      );
    });
  }

  return (
    <>
      <Container xs={"lg"} className={classes.mainContainer}>
        <Grid container direction={"column"} alignItems={"center"} spacing={3}>
          {newTenderPostList}
        </Grid>
      </Container>
    </>
  );
}

export default Tender;
