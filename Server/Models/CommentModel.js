import mongoose, { Schema } from "mongoose";

// Define the schema for the Comment model

export const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  userPfp: {
    type: String,
  },
  handle: {
    type: String,
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

const Comments = mongoose.model("Comment", commentSchema);

export default Comments;
