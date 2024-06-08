import { useEffect, useState } from "react";

const useFetchSearchArray = () => {
  const [searchArray, setSearchArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchArray = async () => {
      try {
        const res = await fetch("http://localhost:5000/Youtube/listTitle");

        if (!res.ok) {
          throw new Error("Failed to fetch search data");
        }

        const data = await res.json();
        console.log(data);
        setSearchArray(data); // Expecting an array of strings (video titles)
      } catch (err) {
        console.error("Error fetching search data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchArray();
  }, []);

  return { searchArray, loading, error };
};

export default useFetchSearchArray;
