import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const useFetchComments = (id) => {
  //loading state

  const [cmtArray, setCmtArray] = useState([]);

  useEffect(() => {
    const getCmts = async () => {
      try {
        const res = await fetch(
          `hhttps://mernclone-sana-ahsams-projects.vercel.app/Youtube/allvdeocmt/${id}`,
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
        setCmtArray(data);

        socket.on("newComment", (newComment) => {
          setCmtArray((prevComments) => [...prevComments, newComment]);
        });
        return () => socket.disconnect();
      } catch (err) {
        console.error("Error fetching videos:", err.message);
      }
    };

    if (cmtArray.length === 0) {
      getCmts();
    }
  }, [cmtArray.length, id]);

  return { cmtArray };
};

export default useFetchComments;
