const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = new Schema({
  product: {
    type: Boolean,
    require: true,
  },
  title: {
    type: String,
  },
  postType: {
    type: String,
    default: "image",
    required: true,
  },
  postUrl: String,
  desc: {
    type: String,
  },
  Tags: [String],
  userTags: [String],
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  comments: {
    type: [Schema.Types.ObjectId],
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model(Post, postsSchema);
