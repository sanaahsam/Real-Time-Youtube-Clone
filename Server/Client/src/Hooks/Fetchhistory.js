import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const useFetchHistory = () => {
  //loading state

  const [history, setHistory] = useState([]);
  const { User } = useContext(UserContext);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await fetch(
          `https://mernclone-sana-ahsams-projects.vercel.app/Youtube/history/${User._id}`,
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
        setHistory(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    if (history.length === 0) {
      getHistory();
    }
  }, [history.length, User._id]);

  return { history };
};

export default useFetchHistory;
