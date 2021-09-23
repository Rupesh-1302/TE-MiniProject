const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.listen(8000, () => {
  console.log("app is listening");
});
