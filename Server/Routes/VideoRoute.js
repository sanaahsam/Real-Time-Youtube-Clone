import express from "express";
import {
  AllVideo,
  CreateVideo,
  GetoneVideo,
  GetChannel,
  SearchedVideo,
} from "../Controllers/VideoController.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const VideoRoute = express.Router();

// Get all videos
VideoRoute.get("/allvideos", AllVideo);

//get one video

VideoRoute.get("/watch/:id", GetoneVideo);

//get searched video
VideoRoute.get("/searchedvideo", SearchedVideo);

//get all user Video
VideoRoute.get("/channel/:id", GetChannel);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(null, true);
  },
});

// Post create new media
VideoRoute.post(
  "/uploadvideo",
  upload.fields([
    { name: "selectedFile", maxCount: 1 },
    { name: "selectedPic", maxCount: 1 },
  ]),
  CreateVideo
);

export default VideoRoute;
