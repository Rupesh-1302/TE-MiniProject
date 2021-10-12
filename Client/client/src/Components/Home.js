import React from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Post from "./Post";

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "40px",
    marginBottom: "40px",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <>
      <Container xs={"lg"} className={classes.mainContainer}>
        <Grid container direction={"column"} alignItems={"center"} spacing={3}>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
          <Grid item>
            <Post />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
