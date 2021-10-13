const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
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
      user: newUser,
    });
  } catch (e) {
    res.json({
      error: {
        message: e.message,
      },
    });
  }
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  res.json({ redirect: "/user/home" });
});

module.exports = router;
