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

export { LikedvideoPlaylist, HistoryvideoPlaylist, YourvideoPlaylist };
