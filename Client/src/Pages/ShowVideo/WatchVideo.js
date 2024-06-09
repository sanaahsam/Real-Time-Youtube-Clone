import React from "react";
import VideoandDetail from "./VideoandDetail";
import Suggestion from "../Suggestion";
import "../ShowVideo/watchvideo.css";

import Video from "../../Components/YoutubeVideo/video";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetchOneVideo from "../../Hooks/FetchOneVideo";
import useFetchDataHook from "../../Hooks/FetchDataHook";
import useFetchComments from "../../Hooks/FetchComments";

function WatchVideo() {
  const { id } = useParams();
  const { getAllvideo } = useFetchDataHook();
  const { cmtArray } = useFetchComments(id);
  const { fetchonevideo } = useFetchOneVideo();
  const filteredVideo = getAllvideo.filter((video) => video._id !== id);

  return (
    <div className="watchvideo-container">
      <div className="watchvideo-subcontainer">
        <VideoandDetail data={fetchonevideo} newvdeo={filteredVideo} />
        <CommentSection cmts={cmtArray} />
      </div>
      <div className="watchvideo-subcontainer2">
        <Suggestion />
        {filteredVideo.map((m) => {
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

export default WatchVideo;
