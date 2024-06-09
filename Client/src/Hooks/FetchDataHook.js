import { useEffect, useState } from "react";
import io from "socket.io-client";

const useFetchDataHook = () => {
  const [getAllvideo, setGetAllvideo] = useState([]);

  useEffect(() => {
    console.log("Inside useFetchDataHook");

    const getdata = async () => {
      try {
        const res = await fetch(
          "https://mernclone-6an5.onrender.com/Youtube/allvideos",
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
        setGetAllvideo(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    if (getAllvideo.length === 0) {
      getdata();
    }

    const socket = io("https://mernclone-6an5.onrender.com");

    socket.on("videoCreated", (newVideo) => {
      setGetAllvideo((prevVideos) => [newVideo, ...prevVideos]);
    });

    return () => {
      socket.off("videoCreated");
      socket.disconnect();
    };
  }, [getAllvideo.length]);

  console.log("Outside useFetchDataHook");

  return { getAllvideo };
};

export default useFetchDataHook;
