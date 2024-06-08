import express from "express";
import Video from "../Models/VideoModel.js";
import mongoose from "mongoose";
import { Users } from "../Models/UserModels.js";
import { io } from "../server.js";

const AllVideo = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const GetoneVideo = async (req, res) => {
  const id = req.params.id;
  if (res.locals.videoProcessed) {
    return;
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ObjectId");
      return res.status(400).json({ error: "Invalid ObjectId" });
    }
    const videoId = new mongoose.Types.ObjectId(id);
    const watchVideo = await Video.findOne({ _id: videoId });
    res.status(200).json(watchVideo);
    res.locals.videoProcessed = true;
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
};

const GetChannel = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = new mongoose.Types.ObjectId(id);
    const UserExist = await Users.findById(userId);

    if (UserExist) {
      console.log(UserExist);
      res.status(200).json({
        _id: UserExist._id,
        email: UserExist.Email,
        points: UserExist.Points,
        name: UserExist.Name,
        profile: UserExist.Picture,
        handle: UserExist.Handle,
        ischannel: UserExist.Channel,
      });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const CreateVideo = async (req, res) => {
  const { title, description, uploader } = req.body;
  const { selectedPic, selectedFile } = req.files; // Ensure your file upload middleware is set up correctly
  const thumbnail = selectedPic ? selectedPic[0].path : null;
  try {
    const user = await Users.findById(uploader);
    const createdVideo = await Video.create({
      title,
      description,
      video: selectedFile[0].path,
      Thumbnail: thumbnail,
      uploader,
      uploaderName: user.Name,
      uploaderPfp: user.Picture,
    });
    io.emit("videoCreated", createdVideo);

    res.json({ message: "Video created successfully", createdVideo });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const SearchedVideo = async (req, res) => {
  try {
    const { query, limit = 3 } = req.query; // Access 'query' and 'limit' parameters

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const videos = await Video.find({
      title: { $regex: query, $options: "i" }, // Search for titles containing the query, case-insensitive
    })
      .limit(parseInt(limit, 10))
      .exec();

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { AllVideo, CreateVideo, GetChannel, GetoneVideo, SearchedVideo };
