const express = require("express");
const cors = require("cors");
const { METHODS } = require("http");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/home", (req, res) => {
  res.send("Hello from server");
});

app.listen(8000, () => {
  console.log("app is listening");
});
