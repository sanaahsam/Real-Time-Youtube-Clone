import mongoose, { Schema } from "mongoose";

const PlaylistSchema = new mongoose.Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  LikeVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: "",
    },
  ],

  DislikeVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: "",
    },
  ],

  HistoryVideo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: "",
    },
  ],
  WatchLaterVideo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: "",
    },
  ],
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

export default Playlist;
