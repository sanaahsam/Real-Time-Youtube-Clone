import React, { useContext } from "react";
import "../YoutubeVideo/video.css";
import { DrawerContext } from "../../context/DrawerContext";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function Video(prop) {
  const { isDrawer } = useContext(DrawerContext);
  const thumbnail = prop.data.Thumbnail;
  return (
    <div
      className="video-container"
      style={{ width: isDrawer ? "400px" : "350px" }}
    >
      <video
        {...(thumbnail && {
          poster: `http://localhost:5000/${prop.data.Thumbnail}`,
        })}
        src={`http://localhost:5000/${prop.data.video}`}
      />

      <div className="video-subcontainer">
        <img
          className="pfp"
          src={`http://localhost:5000/${prop.data.uploaderPfp}`}
          alt="pic"
        />

        <div className="video-info">
          <Link to={`/watch/${prop.data._id}`}>
            <p className="title">{prop.data.title}</p>
          </Link>
          <p
            style={{ fontSize: "1rem", marginBottom: "4px" }}
            className="ChannelName"
          >
            {prop.data.channelName}
          </p>
          <div className="views-time">
            <p>{`${prop.data.views} views`}</p>
            <p>
              {formatDistanceToNow(new Date(prop.data.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
