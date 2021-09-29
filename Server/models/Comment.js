const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  replyTo: {
    type: Schema.Types.ObjectId,
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

module.exports = mongoose.model(Comment, commentSchema);
