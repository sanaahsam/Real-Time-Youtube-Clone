import express from "express";
import Comments from "../Models/CommentModel.js";
import Video from "../Models/VideoModel.js";
import mongoose from "mongoose";
import { Users } from "../Models/UserModels.js";
import { io } from "../index.js";

const CmtRoute = express.Router();

CmtRoute.post("/cmt/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const { userID, contents } = req.body;
    const user = await Users.findById(new mongoose.Types.ObjectId(userID));
    const newCmt = await Comments.create({
      content: contents,
      userId: user,
      handle: user.Handle,
      userPfp: user.Picture,
      videoId: videoId,
    });

    await newCmt.save();

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.videoComments.push(newCmt);
    await video.save();

    io.emit("newComment", newCmt); // Emit the new comment event

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

CmtRoute.get("/getCmt/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  try {
    const getComment = await Comments.findOne(id);

    res.status(200).json(getComment);
  } catch (err) {
    console.log(err);
  }
});

CmtRoute.get("/allvdeocmt/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);

  const allcmt = await Comments.find({ videoId: id });

  res.status(200).json(allcmt);
});

export default CmtRoute;
