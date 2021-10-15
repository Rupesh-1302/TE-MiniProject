import React from "react";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExploreList from "./ExploreList";
const useStyles = makeStyles({
  mainContainer: {
    marginTop: "30px",
    marginBottom: "30px",
    padding: "10px",
  },
});

function Explore() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <Typography variant="h3">Explore</Typography>
      <ExploreList />
    </Container>
  );
}

export default Explore;
