import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AuctionPost from "./AuctionPost";
import axios from "axios";
axios.defaults.withCredentials = true;
const useStyles = makeStyles({
  mainContainer: {
    marginTop: "40px",
    paddingBottom: "40px",
  },
});

function Auction() {
  const classes = useStyles();
  const [auctions, setAuctions] = useState(null);
  const handleAuctionList = (auctionList) => {
    setAuctions((prevAuctions) => {
      if (prevAuctions) {
        return [...auctionList, ...prevAuctions];
      } else {
        return [...auctionList];
      }
    });
  };
  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:8000/auctions/", {
        withCredentials: true,
      });
      if (!res.data.error) {
        axios.defaults.withCredentials = false;
        handleAuctionList(res.data.auctions);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  let newAuctionList = [];
  if (auctions) {
    newAuctionList = auctions.map((auction) => {
      return (
        <Grid item>
          <AuctionPost auction={auction} />
        </Grid>
      );
    });
  }

  return (
    <>
      <Container xs={"lg"} className={classes.mainContainer}>
        <Grid container direction={"column"} alignItems={"center"} spacing={3}>
          {newAuctionList}
        </Grid>
      </Container>
    </>
  );
}

export default Auction;
