import React, { useRef } from "react";
import PostModal from "./PostModal";
import Home from "./Home";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

function HomeRoute() {
  let postModalRef = useRef();
  const handlePostModalOpen = () => {
    postModalRef.current.handleOpen();
  };
  return (
    <>
      <Home />
      <Fab
        color="primary"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: "100px",
          right: "200px",
        }}
        onClick={handlePostModalOpen}
      >
        <AddIcon sx={{ mr: 1 }} />
        NEW POST
      </Fab>
      <PostModal ref={postModalRef} />
    </>
  );
}

export default HomeRoute;
