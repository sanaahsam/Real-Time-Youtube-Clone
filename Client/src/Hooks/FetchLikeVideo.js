import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const useFetchLikedVideo = () => {
  //loading state

  const [allLikedvideo, setAllLikedvideo] = useState([]);
  const { User } = useContext(UserContext);

  useEffect(() => {
    const getLiked = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/Youtube/likeplaylist/${User._id}`,
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
        setAllLikedvideo(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    if (allLikedvideo.length === 0) {
      getLiked();
    }
  }, [allLikedvideo.length, User._id]);

  return { allLikedvideo };
};

export default useFetchLikedVideo;
