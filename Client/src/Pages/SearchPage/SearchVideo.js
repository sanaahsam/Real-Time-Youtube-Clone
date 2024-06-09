import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Video from "../../Components/YoutubeVideo/video";

function SearchVideo() {
  const [searchVideos, setSearchVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract search query from URL
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://mernclone-6an5.onrender.com/Youtube/searchedvideo?query=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await res.json();
        console.log(data);
        setSearchVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchVideos();
    }
  }, [query]);

  return (
    <div className="searchvdeo-container">
      <div className="searchvdeo-list">
        {loading ? (
          <p style={{ color: "white" }}>Loading...</p>
        ) : error ? (
          <p style={{ color: "white" }}>Error: {error}</p>
        ) : (
          searchVideos.map((video) => (
            <Link key={video._id} to={`/watch/${video._id}`}>
              <Video key={video._id} data={video} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchVideo;
