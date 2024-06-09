import React from "react";
import Video from "../../Components/YoutubeVideo/video";
import { Link } from "react-router-dom";
import useFetchWatchLatervdeos from "../../Hooks/FetchWatchLater";

export default function WatchLatervdeos() {
  const { allWLvdeos } = useFetchWatchLatervdeos();
  return (
    <div className="home-container">
      <div className="home">
        {allWLvdeos.map((m) => {
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
