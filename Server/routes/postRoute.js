const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("get home page posts");
});
router.get("/:postId", (req, res) => {
  res.send("get perticular post");
});
router.post("/", (req, res) => {
  res.send("add new post");
});
router.delete("/:id", (req, res) => {
  res.send("Delete a post");
});

module.exports = router;
