import mongoose, { Schema, model } from "mongoose";
import { commentSchema } from "./CommentModel.js";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    Thumbnail: {
      type: String,
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    uploaderName: {
      type: String,
      required: true,
    },

    uploaderPfp: {
      type: String,
      required: true,
    },
    uploaderSubscriber: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
      default: [],
    },
    dislikeCount: {
      type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
      default: [],
    },

    videoComments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
