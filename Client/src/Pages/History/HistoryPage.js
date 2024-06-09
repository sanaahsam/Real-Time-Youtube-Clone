import React from "react";
import { Link } from "react-router-dom";
import Video from "../../Components/YoutubeVideo/video";
import useFetchHistory from "../../Hooks/Fetchhistory";

function HistoryPage() {
  const { history } = useFetchHistory();
  return (
    <div className="home-container">
      <div className="home">
        {history.map((m) => {
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

export default HistoryPage;
