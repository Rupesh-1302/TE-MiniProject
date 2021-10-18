const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const Post = require("../models/Post");
const User = require("../models/User");
const catchAsync = require("../util/catchAsync");

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const posts = await Post.find({}).populate("author");
    res.json({ posts });
  })
);
router.get("/:postId", (req, res) => {
  res.send("get perticular post");
});
router.post(
  "/new",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { price, image, description, title, product, hashTags, timeOfPost } =
      req.body;
    const newPost = new Post({
      product,
      title,
      imageURL: image,
      desc: description,
      Tags: hashTags,
      price,
      author: req.user._id,
      timeOfPost,
    });
    const author = await User.findById(req.user._id);
    await author.userPosts.unshift(newPost);
    await newPost.save();
    await author.save();
    res.json(req.body);
  })
);

router.delete("/:id", (req, res) => {
  res.send("Delete a post");
});

module.exports = router;
