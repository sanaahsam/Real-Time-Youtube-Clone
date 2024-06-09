import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const useFetchWatchLatervdeos = () => {
  //loading state

  const [allWLvdeos, SetAllWLvdeos] = useState([]);
  const { User } = useContext(UserContext);

  useEffect(() => {
    const getWatchlater = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/Youtube/watchLater/${User._id}`,
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
        SetAllWLvdeos(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    if (allWLvdeos.length === 0) {
      getWatchlater();
    }
  }, [allWLvdeos.length, User._id]);

  return { allWLvdeos };
};

export default useFetchWatchLatervdeos;
