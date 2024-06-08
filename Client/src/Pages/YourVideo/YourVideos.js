import React from "react";
import { Link } from "react-router-dom";
import Video from "../../Components/YoutubeVideo/video";
import useFetchYourvideo from "../../Hooks/FetchYourVideos";

function YourVideos() {
  const { yourvideo } = useFetchYourvideo();

  return (
    <div className="home-container">
      <div className="home">
        {yourvideo.map((m) => {
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

export default YourVideos;
