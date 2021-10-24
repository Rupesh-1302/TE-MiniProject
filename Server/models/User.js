const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    required: true,
    default: "consumer",
  },
  phoneNo: {
    type: Number,
    unique: true,
  },
  following: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    require: true,
    default: [],
  },
  followers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    require: true,
    default: [],
  },
  producer: {
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
    address: {
      type: String,
    },
  },
  userPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  userAuction: [
    {
      type: Schema.Types.ObjectId,
      ref: "Auction",
    },
  ],
  userTender: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tender",
    },
  ],
  unseenPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  privateAuctionList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Auction",
    },
  ],
  privateTenderList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tender",
    },
  ],
  profileImage: {
    type: String,
    default: null,
  },
});

userSchema.plugin(passportLocalMongoose);

// address to add.

module.exports = mongoose.model("User", userSchema);
