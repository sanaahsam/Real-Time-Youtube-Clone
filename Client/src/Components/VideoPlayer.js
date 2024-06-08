import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useGesture } from "@use-gesture/react";
import useFetchOneVideo from "../Hooks/FetchOneVideo";
import "../Components/VideoPlayer.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const VideoPlayer = (prop) => {
  const playpause = useRef(null);
  const [TripleTaps, setTripleTaps] = useState(0);
  const [TripleClick, setTripleClick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { User } = useContext(UserContext);
  const [visitedIds, setVisitedIds] = useState([]);
  const { setFetchonevideo } = useFetchOneVideo();
  const userId = User ? User._id : "";
  const navigate = useNavigate();

  const filterAndExtractIds = (id, videos, visited) => {
    // Filter out the object with the specified id and objects that have been visited
    const filteredVideos = videos.filter(
      (video) => video._id !== id && !visited.includes(video._id)
    );

    // Map to extract the id of the remaining objects
    const ids = filteredVideos.map((video) => video._id);

    return ids;
  };

  //for pause and play the video
  const handlePlayPause = () => {
    if (isPlaying) {
      playpause.current.pause();
      setIsPlaying((prevState) => !prevState);
    } else {
      playpause.current.play();
      setIsPlaying((prevState) => !prevState);
    }
    setTripleClick((prev) => prev + 1);

    if (TripleClick + 1 === 3) {
      // Add the current id to visitedIds
      setVisitedIds((prevVisitedIds) => [...prevVisitedIds, prop.id]);

      // Get the filtered IDs excluding the current id and visited ids
      const filteredIds = filterAndExtractIds(prop.id, prop.lnk, visitedIds);

      // Navigate to the first unvisited video
      if (filteredIds.length > 0) {
        navigate(`/watch/${filteredIds[0]}`);
      }

      // Reset triple click counter
      setTripleClick(0);
    }
    setTimeout(() => {
      setTripleClick(0);
    }, 1000);
  };

  //for forward the video

  const handleForward = () => {
    playpause.current.currentTime += 10;
  };

  //for backward the video

  const handleBackward = () => {
    playpause.current.currentTime -= 10;
  };

  //

  // function for set playback speed to 2x

  const handleSpeedUp = () => {
    if (playpause.current) {
      playpause.current.playbackRate = 2.0; //setting playback speed to 2x
    }
  };

  //function for set playback speed to 0.5x
  const handleSlowDown = () => {
    if (playpause.current) {
      playpause.current.playbackRate = 0.5; // setting playback speed to 0.5x
    }
  };

  //function for set playback speed to normal

  const handleNormalSpeed = () => {
    if (playpause.current) {
      playpause.current.playbackRate = 1.0; //reset playback to normal
    }
  };

  //on click and hold on the right side video will play in 2x fast

  const bindRight = useGesture({
    onPointerDown: () => handleSpeedUp(),
    onPointerUp: () => handleNormalSpeed(),
    onPointerLeave: () => handleNormalSpeed(),
  });

  //on click on the left side video will play in 2x slow

  const bindLeft = useGesture({
    onPointerDown: () => handleSlowDown(),
    onPointerUp: () => handleNormalSpeed(),
    onPointerLeave: () => handleNormalSpeed(),
  });

  //close the window on triple tap on right side of the video

  const TripleTapRightSide = () => {
    setTripleTaps((prev) => prev + 1);

    if (TripleTaps === 2) {
      window.close(); //goes here functions

      setTripleTaps(0);
    }
    setTimeout(() => {
      setTripleTaps(0);
    }, 2000);
    console.log(TripleTaps);
  };

  //

  //click top-right corner to show location and temprature on popup

  const showtemp = async () => {
    const res = await fetch("http://localhost:5000/getloc", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    alert(data.locationName + " " + data.temperatureCelsius);
  };

  //move to next on triple click on center

  //handle play

  const handlePlay = async () => {
    const res = await fetch(`http://localhost:5000/Youtube/view/${prop.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    socket.emit("videoUpdated", data);

    setFetchonevideo(data);
  };

  //triple click on center

  return (
    <div className="video-player">
      <video
        ref={playpause}
        poster={`http://localhost:5000/${prop.thumb}`}
        src={`http://localhost:5000/${prop.src}`}
        controls
        onPlay={handlePlay}
      />
      <div className="play-pause" onClick={handlePlayPause}></div>
      <div
        className="right-div"
        onDoubleClick={handleForward}
        {...bindRight()}
        onClick={TripleTapRightSide}
      ></div>
      <div
        className="left-div"
        onDoubleClick={handleBackward}
        {...bindLeft()}
      ></div>
      <div className="top-right" onClick={showtemp}></div>
    </div>
  );
};
