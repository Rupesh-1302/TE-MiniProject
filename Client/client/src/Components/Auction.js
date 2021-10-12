import React from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AuctionPost from "./AuctionPost";

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "40px",
  },
});

function Auction() {
  const classes = useStyles();

  return (
    <>
      <Container xs={"lg"} className={classes.mainContainer}>
        <Grid container direction={"column"} alignItems={"center"} spacing={3}>
          <Grid item>
            <AuctionPost />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Auction;
