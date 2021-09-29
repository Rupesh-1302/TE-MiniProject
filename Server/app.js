const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/SocialMediaMarketplace", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected"))
  .catch((e) => {
    console.log(e);
  });

// ********  app.use()  ***********

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// *******  routes  *********

app.get("/home", (req, res) => {
  res.send("Hello from server");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req);
  console.log(email, password);
  if (email == "rupeshagarwal955@gmail.com" && password == "Rupesh") {
    console.log(email);
    res.send(true);
  } else {
    console.log("fail");
    res.send(false);
  }
});

// ***********  server start  **********

app.listen(8000, () => {
  console.log("app is listening");
});
