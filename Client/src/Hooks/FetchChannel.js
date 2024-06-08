import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const useFetchChannel = () => {
  //loading state

  const [Channel, setChannel] = useState({});
  const { User } = useContext(UserContext);

  useEffect(() => {
    const getChannel = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/Youtube/channel/${User._id}`,
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
        setChannel(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    getChannel();
  }, [User._id]);

  return { Channel };
};

export default useFetchChannel;
