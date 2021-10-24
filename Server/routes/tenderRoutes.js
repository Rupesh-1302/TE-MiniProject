const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const Tender = require("../models/Tender");
const User = require("../models/User");
const catchAsync = require("../util/catchAsync");

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const tenders = await Tender.find({}).populate("author");
    res.json({ tenders });
  })
);

router.post(
  "/new",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { maxBid, description, title, hashTags, timeOfPost, tenderDate } =
      req.body;
    const newTender = new Tender({
      title,
      desc: description,
      Tags: hashTags,
      author: req.user._id,
      timeOfPost,
      maxBid,
      expireDate: tenderDate,
    });
    const author = await User.findById(req.user._id);
    await author.userTender.unshift(newTender);
    await newTender.save();
    await author.save();
    res.json(req.body);
  })
);

module.exports = router;
