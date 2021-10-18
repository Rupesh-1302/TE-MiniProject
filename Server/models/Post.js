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
  imageURL: String,
  desc: {
    type: String,
  },
  Tags: [String],
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
  timeOfPost: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postsSchema);
