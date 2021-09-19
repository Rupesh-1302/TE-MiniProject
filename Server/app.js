const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.send("Hello from server");
});

app.listen(8000, () => {
  console.log("app is listening");
});
