import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import http from "http";
import { Server } from "socket.io";
import UserRoutes from "./Routes/UserRoutes.js";
import VideoRoute from "./Routes/VideoRoute.js";
import OptionRoute from "./Routes/OptionsRoute.js";
import playlistRoute from "./Routes/PlayListRoutes.js";
import CmtRoute from "./Routes/CommentRoutes.js";
import getlocRouter from "./Routes/GetLocandTemp.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.RIGIN, //yout frontend port
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.ORIGIN, // your frontend port
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/Youtube", VideoRoute);
app.use("/Youtube", OptionRoute);
app.use("/Youtube", playlistRoute);
app.use("/Youtube", CmtRoute);
app.use("/", UserRoutes);
app.use("/", getlocRouter);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is listening on port ${process.env.PORT}`);
});

export { io };
