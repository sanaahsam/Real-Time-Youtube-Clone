import Playlist from "../Models/PlaylistModel.js";
import Video from "../Models/VideoModel.js";

//liked playlist controller
const LikedvideoPlaylist = async (req, res) => {
  const userId = req.params.id;

  try {
    const playlist = await Playlist.findOne({ UserID: userId });

    if (playlist && playlist.LikeVideos.length > 0) {
      const showlikedVideo = [];

      for (const videoId of playlist.LikeVideos) {
        const findvideo = await Video.findById(videoId);
        if (findvideo) {
          showlikedVideo.push(findvideo);
        }
      }

      res.status(200).json(showlikedVideo);
    } else {
      throw new Error("User didn't like any video or playlist not found");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const HistoryvideoPlaylist = async (req, res) => {
  const userId = req.params.id;

  try {
    const playlist = await Playlist.findOne({ UserID: userId });

    if (playlist && playlist.HistoryVideo.length > 0) {
      const historyVideo = [];

      for (const videoId of playlist.HistoryVideo) {
        const findvideo = await Video.findById(videoId);
        if (findvideo) {
          historyVideo.push(findvideo);
        }
      }

      res.status(200).json(historyVideo);
    } else {
      throw new Error("User didn't like any video or playlist not found");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const YourvideoPlaylist = async (req, res) => {
  const userId = req.params.id;
  try {
    const yourVideos = await Video.find({ uploader: userId });

    res.status(200).json(yourVideos);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const AddWatchLater = async (req, res) => {
  const videoId = req.params.id;
  const { userId } = req.body;

  try {
    const playlist = await Playlist.findOne({ UserID: userId });

    if (playlist) {
      if (!playlist.WatchLaterVideo.includes(videoId)) {
        playlist.WatchLaterVideo.push(videoId);
        await playlist.save();
      }

      res
        .status(200)
        .json({ message: "Video added to Watch Later list", playlist });
    } else {
      throw new Error("Playlist not found for the user");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const WatchLaterVideoPlaylist = async (req, res) => {
  const userId = req.params.id;

  try {
    const playlist = await Playlist.findOne({ UserID: userId });

    if (playlist && playlist.WatchLaterVideo.length > 0) {
      const WatchVideo = [];

      for (const videoId of playlist.WatchLaterVideo) {
        const findvideo = await Video.findById(videoId);
        if (findvideo) {
          WatchVideo.push(findvideo);
        }
      }
      console.log(WatchVideo);
      res.status(200).json(WatchVideo);
    } else {
      throw new Error("User didn't like any video or playlist not found");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  LikedvideoPlaylist,
  HistoryvideoPlaylist,
  YourvideoPlaylist,
  AddWatchLater,
  WatchLaterVideoPlaylist,
};
