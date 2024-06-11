import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Picture: {
    type: String,
    default: "",
  },
  Email: {
    type: String,
    unique: true,
  },
  Points: {
    type: Number,
    default: 0,
  },
  Name: {
    type: String,
    required: true,
  },
  Handle: {
    type: String,
  },
  Channel: {
    type: Boolean,
    required: true,
    default: false,
  },
  subscribers: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        handle: {
          type: String,
          required: true,
        },
        picture: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
  subscriptions: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        handle: {
          type: String,
          required: true,
        },
        picture: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
});

export const Users = mongoose.model("User", UserSchema);
