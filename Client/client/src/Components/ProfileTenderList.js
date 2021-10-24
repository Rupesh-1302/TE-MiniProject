import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function ProfileTenderList({ userTender, value, handlePostPortalOpen }) {
  console.log(userTender);
  const newTenderList = userTender.map((tender) => {
    return (
      <Card
        sx={{ marginTop: "10px" }}
        key={tender._id}
        onClick={() => {
          handlePostPortalOpen(tender, value);
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {tender.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Max-Bid : {tender.maxBid} -/ rs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Expire Date : {tender.expireDate}
          </Typography>
        </CardContent>
      </Card>
    );
  });
  return <Box>{newTenderList}</Box>;
}

export default ProfileTenderList;
