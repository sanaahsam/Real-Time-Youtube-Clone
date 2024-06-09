import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const useFetchYourvideo = () => {
  //loading state

  const [yourvideo, setYourvideo] = useState([]);
  const { User } = useContext(UserContext);

  useEffect(() => {
    const getYourvideo = async () => {
      try {
        const res = await fetch(
          `hhttps://mernclone-6an5.onrender.com/Youtube/yourvideo/${User._id}`,
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
        setYourvideo(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    if (yourvideo.length === 0) {
      getYourvideo();
    }
  }, [yourvideo.length, User._id]);

  return { yourvideo };
};

export default useFetchYourvideo;
