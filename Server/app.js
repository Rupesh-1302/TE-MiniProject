const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const session = require("express-session");
const User = require("./models/User");
const ExpressError = require("./util/ExpressError");

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
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "withCredentials"],
    credentials: true,
  })
);

const sessionConfig = {
  secret: "thiscouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// *******  routes  *********
// app.use((req, res, next) => {
//   console.log(req.sessionID);
//   if (req.user) {
//     console.log(req.user);
//   }
//   next();
// });
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/auctions", auctionRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404, null));
});

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Something went wrong!";
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (!err.redirect) {
    err.redirect = null;
  }
  res.status(200).json({
    message: err.message,
    statusCode: err.statusCode,
    error: true,
    redirect: err.redirect,
  });
});

// ***********  server start  **********

app.listen(8000, () => {
  console.log("app is listening");
});
