import React, { useContext, useState } from "react";
import "../ShowVideo/videoanddetail.css";
import { PiShareFatLight } from "react-icons/pi";
import { BiSolidLike } from "react-icons/bi";
import { LiaDownloadSolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import { BiDislike } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import useFetchOneVideo from "../../Hooks/FetchOneVideo";
import { UserContext } from "../../context/UserContext";
import { VideoPlayer } from "../../Components/VideoPlayer";

const socket = io("http://localhost:5000");

function VideoandDetail() {
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const { User, dispatch } = useContext(UserContext);
  const { fetchonevideo, setFetchonevideo } = useFetchOneVideo();
  const [word, SetWord] = useState("Subscribe");
  const userId = User ? User._id : "";

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:5000/Youtube/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (res.ok) {
        socket.emit("videoUpdated", data);
        setFetchonevideo(data);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error("Failed to like the video:", err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await fetch(`http://localhost:5000/Youtube/dislike/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (res.ok) {
        socket.emit("videoUpdated", data);
        setFetchonevideo(data);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error("Failed to dislike the video:", err);
    }
  };

  if (!fetchonevideo._id) {
    return <div>Loading...</div>;
  }

  const handleSubscribe = async () => {
    try {
      const res = await fetch(`http://localhost:5000/Youtube/subscribe`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, videoId: id }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("suscessfull");
        SetWord("Subscribed");
        localStorage.setItem("YoutubeUser", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: JSON.parse(data) });
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error("Failed to dislike the video:", err);
    }
  };

  return (
    <div className="openvideo-container">
      <VideoPlayer
        id={id}
        src={fetchonevideo.video}
        thumb={fetchonevideo.Thumbnail}
        lnk={fetchonevideo.newvdeo}
      />
      <p className="video-title">{fetchonevideo.title}</p>
      <div className="openvideo-controls">
        <div className="controls-container">
          <div className="creator">
            <img
              src={`http://localhost:5000/${fetchonevideo.uploaderPfp}`}
              alt="pic"
            />
            <div className="creator-info">
              <p className="creator-name">{fetchonevideo.uploaderName}</p>
              <p className="subcribers">{`${fetchonevideo.uploaderSubscriber} subscribers`}</p>
            </div>
          </div>
          <div className="subscribe-btn" onClick={handleSubscribe}>
            <FaRegBell size={20} />
            <p style={{ marginLeft: "5px" }}>{`${word}`}</p>
          </div>
        </div>

        <div className="controls-container2">
          <div className="like-dislike-btns">
            <div className="like-btn" onClick={handleLike}>
              <BiSolidLike size={20} />
              <p>
                {fetchonevideo.likeCount ? fetchonevideo.likeCount.length : ""}
              </p>
            </div>
            <div className="dislike-btn" onClick={handleDislike}>
              <BiDislike size={20} />
              <p>
                {fetchonevideo.dislikeCount
                  ? fetchonevideo.dislikeCount.length
                  : ""}
              </p>
            </div>
          </div>
          <div className="share-btn">
            <PiShareFatLight size={20} />
            <p style={{ marginLeft: "10px" }}>Share</p>
          </div>
          <div className="download-btn">
            <LiaDownloadSolid size={20} />
            <p style={{ marginLeft: "10px" }}>Download</p>
          </div>
          <div className="dot-btn">
            <BsThreeDots size={20} />
          </div>
        </div>
      </div>

      <div className="description-container">
        <div className="view-time" style={{ marginBottom: "5px" }}>
          <p>{`${fetchonevideo.views} views`}</p>
        </div>
        <div className="description-subcontainer">
          <p
            className="content"
            style={{
              maxHeight: expanded ? "none" : "1.5em",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fetchonevideo.description}
          </p>
          {!expanded && (
            <p className="toggle-button" onClick={toggleContent}>
              more...
            </p>
          )}
          {expanded && (
            <p className="toggle-button" onClick={toggleContent}>
              less...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoandDetail;
