import express from "express";
import {
  HistoryvideoPlaylist,
  LikedvideoPlaylist,
  YourvideoPlaylist,
} from "../Controllers/playlistController.js";

const playlistRoute = express.Router();

playlistRoute.get("/likeplaylist/:id", LikedvideoPlaylist);

playlistRoute.get("/history/:id", HistoryvideoPlaylist);

playlistRoute.get("/yourvideo/:id", YourvideoPlaylist);

export default playlistRoute;
