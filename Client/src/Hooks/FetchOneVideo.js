import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function useFetchOneVideo() {
  const { id } = useParams();

  const [fetchonevideo, setFetchonevideo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchOne = async () => {
      try {
        const res = await fetch(`http://localhost:5000/Youtube/watch/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          console.log(data.err);
        }
        if (isMounted) {
          setFetchonevideo(data);
          setLoading(false);
        }

        socket.on("connect", () => {
          console.log("connected to server");
        });

        socket.on("disconnect", () => {
          console.log("disconnected from server");
        });

        socket.on("videoUpdated", (updatedVideo) => {
          if (isMounted && updatedVideo._id === id) {
            setFetchonevideo(updatedVideo);
          }
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchOne();

    return () => {
      isMounted = false;
      socket.off("connect");
      socket.off("disconnect");
      socket.off("videoUpdated");
    };
  }, [id]);

  return { fetchonevideo, loading, setFetchonevideo };
}

export default useFetchOneVideo;
