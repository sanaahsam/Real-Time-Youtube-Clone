import React from "react";
import Video from "../../Components/YoutubeVideo/video";

import { Link } from "react-router-dom";
import Suggestion from "../Suggestion";
import useFetchDataHook from "../../Hooks/FetchDataHook";

function Home() {
  const { getAllvideo } = useFetchDataHook();

  return (
    <div className="home-container">
      <Suggestion />
      <div className="home">
        {getAllvideo.map((m) => {
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

export default Home;
