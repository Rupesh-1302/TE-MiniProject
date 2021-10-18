const mongoose = require("mongoose");
const { Schema } = mongoose;

const auctionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
    default: true,
    min: 0,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeOfPost: String,
  Tags: [String],
  desc: {
    type: String,
    requred: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Auction", auctionSchema);
