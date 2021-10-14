const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = new Schema({
  product: {
    type: Boolean,
    require: true,
    default: false,
  },
  title: {
    type: String,
    require: true,
  },
  postMediaType: {
    type: String,
    default: "image",
    required: true,
  },
  postMediaUrl: String,
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
    ref: "Comment",
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  timeOfPost: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postsSchema);
