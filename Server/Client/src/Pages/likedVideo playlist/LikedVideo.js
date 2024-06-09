import React from "react";
import Video from "../../Components/YoutubeVideo/video";
import { Link } from "react-router-dom";
import useFetchLikedVideo from "../../Hooks/FetchLikeVideo";

function LikedVideo() {
  const { allLikedvideo } = useFetchLikedVideo();
  return (
    <div className="home-container">
      <div className="home">
        {allLikedvideo.map((m) => {
          return (
            <Link key={m._id} to={`/watch/${m._id}`}>
              <Video key={m._id} data={m} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LikedVideo;
