const mongoose = require("mongoose");
const { Schema } = mongoose;

const tenderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  maxBid: {
    type: Number,
    min: 0,
  },
  expireDate: {
    type: String,
    required: true,
  },
  Tags: [String],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  timeOfPost: String,
});
//tenderList
module.exports = mongoose.model("Tender", tenderSchema);
