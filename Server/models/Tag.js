const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true,
  },
  uploadLists: {
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    auctions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Auction",
      },
    ],
    tenders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tender",
      },
    ],
  },
});

module.exports = mongoose.model("Tag", tagSchema);
