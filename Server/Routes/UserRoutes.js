import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import { Signin, ChannelCreation } from "../Controllers/UserControllers.js";

const UserRoutes = express.Router();

//sign up
UserRoutes.post("/signin", Signin);

//creating channel

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/images")) {
      fs.mkdirSync("public/images");
    }

    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const allowedExtensions = [".jpg", ".jpeg", ".png"];

    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Only images are allowed!"));
    }

    cb(null, true);
  },
});

UserRoutes.put("/create", upload.single("Picture"), ChannelCreation);

export default UserRoutes;
