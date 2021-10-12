const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
