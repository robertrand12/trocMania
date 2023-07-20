/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Home({ query }) {
  const [setAds] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ads`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setAds(data);
      });
  }, []);
  return <p>{query}</p>;
}
