const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const Auction = require("../models/Auction");
const User = require("../models/User");
const catchAsync = require("../util/catchAsync");

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const auctions = await Auction.find({}).populate("author");
    res.json({ auctions });
  })
);

router.post(
  "/new",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const {
      basePrice,
      image,
      description,
      title,
      venue,
      hashTags,
      timeOfPost,
      auctionDate,
    } = req.body;
    const newAuction = new Auction({
      date: auctionDate,
      title,
      imageURL: image,
      desc: description,
      Tags: hashTags,
      basePrice,
      author: req.user._id,
      timeOfPost,
      venue,
    });
    const author = await User.findById(req.user._id);
    await author.userPosts.unshift(newAuction);
    await newAuction.save();
    await author.save();
    res.json(req.body);
  })
);

module.exports = router;
