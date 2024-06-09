import express from "express";
import {
  HistoryvideoPlaylist,
  LikedvideoPlaylist,
  YourvideoPlaylist,
  AddWatchLater,
  WatchLaterVideoPlaylist,
} from "../Controllers/playlistController.js";

const playlistRoute = express.Router();

playlistRoute.get("/likeplaylist/:id", LikedvideoPlaylist);

playlistRoute.get("/history/:id", HistoryvideoPlaylist);

playlistRoute.get("/yourvideo/:id", YourvideoPlaylist);

playlistRoute.put("/addwatchlater/:id", AddWatchLater);

playlistRoute.get("/watchLater/:id", WatchLaterVideoPlaylist);

export default playlistRoute;
