const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "consumer",
  },
  phoneNo: {
    type: Number,
  },
  following: {
    type: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    require: true,
    default: [],
  },
  followers: {
    type: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    require: true,
    default: [],
  },
  consumer: {
    likesCounts: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikesCounts: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  posts: [Schema.Types.ObjectId],
  unseenPosts: [Schema.Types.ObjectId],
  privateAuctionList: [Schema.Types.ObjectId],
  privateTenderList: [Schema.Types.ObjectId],
});

// address to add.

module.exports = mongoose.model(User, userSchema);
