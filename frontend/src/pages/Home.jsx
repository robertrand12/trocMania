/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [ads, setAds] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!category) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ads`, {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAds(data);
        });
    } else {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/ads/bycategory/${category}`,
        {
          credentials: "include",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAds(data);
        });
    }
  }, [category]);
  return (
    <div>
      <ul className="flex w-9/12 justify-evenly mx-auto flex-wrap gap-5">
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="tout afficher"
            onClick={() => setCategory("")}
          >
            tout afficher
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="ameublement"
            onClick={(e) => setCategory(e.target.value)}
          >
            ameublement
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="éléctroménager"
            onClick={(e) => setCategory(e.target.value)}
          >
            éléctroménager
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="décoration"
            onClick={(e) => setCategory(e.target.value)}
          >
            décoration
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="multimédia"
            onClick={(e) => setCategory(e.target.value)}
          >
            multimédia
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="véhicule"
            onClick={(e) => setCategory(e.target.value)}
          >
            véhicule
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="immobilier"
            onClick={(e) => setCategory(e.target.value)}
          >
            immobilier
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="jeux"
            onClick={(e) => setCategory(e.target.value)}
          >
            jeux
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="autre"
            onClick={(e) => setCategory(e.target.value)}
          >
            autre
          </button>
        </li>
      </ul>
      <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
        <ul className="flex flex-wrap gap-4 justify-center">
          {ads.map((ad) => (
            <Link to={`/${ad.id}`} className=" w-48">
              <li key={`home - ${ad.id}`}>
                <Card infos={ad} />
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
