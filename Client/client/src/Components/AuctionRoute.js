import React, { useRef } from "react";
import AuctionPostModal from "./AuctionPostModal";
import Auction from "./Auction";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
function AuctionRoute() {
  let AuctionPostModalRef = useRef();
  const handleAuctionPostModalOpen = () => {
    AuctionPostModalRef.current.handleOpen();
  };
  return (
    <>
      <Auction />
      <Fab
        color="primary"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: "100px",
          right: "200px",
        }}
        onClick={handleAuctionPostModalOpen}
      >
        <AddIcon sx={{ mr: 1 }} />
        NEW Auction
      </Fab>
      <AuctionPostModal ref={AuctionPostModalRef} />
    </>
  );
}

export default AuctionRoute;
