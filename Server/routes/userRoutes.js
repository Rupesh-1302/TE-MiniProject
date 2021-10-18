const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const ExpressError = require("../util/ExpressError");
const { isLoggedIn } = require("../middlewares");

router.get("/AuthErr", (req, res, next) => {
  next(
    new ExpressError("Password or Username incorrect please try again", 401)
  );
});

router.get("/isLoggedIn", isLoggedIn, (req, res) => {
  res.json({ user: req.user });
});

router.post("/register", async (req, res, next) => {
  try {
    const {
      address,
      password,
      username,
      phone,
      email,
      lastName,
      firstName,
      userType,
    } = req.body;
    const user = await new User({
      address,
      username,
      phoneNo: phone,
      email,
      lastName,
      firstName,
      userType,
    });
    const newUser = await User.register(user, password);
    res.json({
      redirect: "/user/home",
    });
  } catch (e) {
    if (
      !(e.message === "A user with the given username is already registered")
    ) {
      e.message = "Email already exist";
    }
    next(new ExpressError(e.message, 400));
  }
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/user/AuthErr" }),
  async (req, res) => {
    res.json({ user: req.user, redirect: "/user/home" });
  }
);

module.exports = router;
