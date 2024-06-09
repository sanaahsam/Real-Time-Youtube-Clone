import Playlist from "../Models/PlaylistModel.js";
import { Users } from "../Models/UserModels.js";
import Video from "../Models/VideoModel.js";
import { io } from "../index.js";

const likes = async (req, res) => {
  const videoId = req.params.id;
  const { userId } = req.body;
  try {
    const grabVideo = await Video.findById(videoId);
    if (!grabVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    const alreadyDisliked = await Playlist.exists({
      UserID: userId,
      DislikeVideos: videoId,
    });
    if (alreadyDisliked) {
      await Playlist.updateOne(
        { UserID: userId },
        { $pull: { DislikeVideos: videoId } }
      );
      grabVideo.dislikeCount.pull(userId);
    }

    const alreadyLiked = await Playlist.exists({
      UserID: userId,
      LikeVideos: videoId,
    });

    if (alreadyLiked) {
      await Playlist.updateOne(
        { UserID: userId },
        { $pull: { LikeVideos: videoId } }
      );
      grabVideo.likeCount.pull(userId);
      await grabVideo.save();
      io.emit("videoUpdated", grabVideo);
      return res
        .status(400)
        .json({ message: "Video already liked by the user" });
    }

    grabVideo.likeCount.push(userId);
    await grabVideo.save();

    let playlist = await Playlist.findOne({ UserID: userId });

    if (!playlist) {
      playlist = await Playlist.create({
        UserID: userId,
        LikeVideos: [videoId],
      });
    } else {
      playlist.LikeVideos.push(videoId);
    }

    await playlist.save();
    io.emit("videoUpdated", grabVideo);
    return res.status(200).json(grabVideo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const dislike = async (req, res) => {
  const videoId = req.params.id;
  const { userId } = req.body;
  try {
    const grabVideo = await Video.findById(videoId);
    if (!grabVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    const alreadyLiked = await Playlist.exists({
      UserID: userId,
      LikeVideos: videoId,
    });

    if (alreadyLiked) {
      await Playlist.updateOne(
        { UserID: userId },
        { $pull: { LikeVideos: videoId } }
      );
      grabVideo.likeCount.pull(userId);
    }

    const alreadyDisliked = await Playlist.exists({
      UserID: userId,
      DislikeVideos: videoId,
    });

    if (alreadyDisliked) {
      await Playlist.updateOne(
        { UserID: userId },
        { $pull: { DislikeVideos: videoId } }
      );
      grabVideo.dislikeCount.pull(userId);
      await grabVideo.save();
      io.emit("videoUpdated", grabVideo);
      return res
        .status(400)
        .json({ message: "Video already disliked by the user" });
    }

    grabVideo.dislikeCount.push(userId);
    await grabVideo.save();

    let playlist = await Playlist.findOne({ UserID: userId });

    if (!playlist) {
      playlist = await Playlist.create({
        UserID: userId,
        DislikeVideos: [videoId],
      });
    } else {
      playlist.DislikeVideos.push(videoId);
    }

    await playlist.save();
    io.emit("videoUpdated", grabVideo);
    return res.status(200).json(grabVideo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const views = async (req, res) => {
  const videoId = req.params.id;
  const { userId } = req.body;
  try {
    const grabVideo = await Video.findById(videoId);
    if (!grabVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    const user = await Users.findById(userId);

    const alreadyViewed = await Playlist.exists({
      UserID: userId,
      HistoryVideo: videoId,
    });
    if (alreadyViewed) {
      return;
    } else {
      grabVideo.views = grabVideo.views + 1;
      user.Points = user.Points + 5;
      await user.save();
      await grabVideo.save();

      let playlist = await Playlist.findOne({ UserID: userId });

      if (!playlist) {
        playlist = await Playlist.create({
          UserID: userId,
          HistoryVideo: [videoId],
        });
      } else {
        playlist.HistoryVideo.push(videoId);
      }
      await playlist.save();
      io.emit("videoUpdated", grabVideo);
      return res.status(200).json(grabVideo);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchList = async (req, res) => {
  try {
    const videos = await Video.find();
    const videoTitles = videos.map((video) => video.title);
    return res.status(200).json(videoTitles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const Subscription = async (req, res) => {
  const { userId, videoId } = req.body;

  if (!userId || !videoId) {
    return res.status(400).json({ error: "userId and videoId are required" });
  }

  try {
    // Find the video to get the uploader (target user)
    const newvideo = await Video.findById(videoId);

    if (!newvideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    const targetUserId = newvideo.uploader;

    const targetUser = await Users.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found" });
    }

    // Check if the target user is already in the current user's subscriptions
    const currentuser = await Users.findById(userId);

    if (!currentuser) {
      return res.status(404).json({ error: "User not found" });
    }

    const alreadySubscribed = currentuser.subscriptions.some(
      (sub) => sub.userId.toString() === targetUserId.toString()
    );

    if (!alreadySubscribed) {
      // Add target user to current user's subscriptions
      currentuser.subscriptions.push({
        userId: targetUserId,

        handle: targetUser.Handle,
        picture: targetUser.Picture,
      });
      await currentuser.save();
    }

    const alreadySubscriber = targetUser.subscribers.some(
      (sub) => sub.userId.toString() === userId.toString()
    );

    if (!alreadySubscriber) {
      // Add current user to target user's subscribers
      targetUser.subscribers.push({
        userId: userId,

        handle: currentuser.Handle,
        picture: currentuser.Picture,
      });
      await targetUser.save();
    }

    res.status(200).json(currentuser);
  } catch (error) {
    console.error("Error subscribing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { views, likes, dislike, searchList, Subscription };
