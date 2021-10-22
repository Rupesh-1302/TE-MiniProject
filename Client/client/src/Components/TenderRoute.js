import React, { useRef } from "react";
import TenderPostModal from "./TenderPostModal";
import Tender from "./Tender";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
function TenderRoute() {
  let TenderPostModalRef = useRef();
  const handleTenderPostModalOpen = () => {
    TenderPostModalRef.current.handleOpen();
  };
  return (
    <>
      <Tender />
      <Fab
        color="primary"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: "100px",
          right: "200px",
        }}
        onClick={handleTenderPostModalOpen}
      >
        <AddIcon sx={{ mr: 1 }} />
        NEW Tender
      </Fab>
      <TenderPostModal ref={TenderPostModalRef} />
    </>
  );
}

export default TenderRoute;
