/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import HeaderMobile from "../components/HeaderMobile";

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
        })
        .catch((err) => console.error(err));
    } else {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/ads/categories/${category}`,
        {
          credentials: "include",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAds(data);
        })
        .catch((err) => console.error(err));
    }
  }, [category]);
  return (
    <div>
      <HeaderMobile />
      <div className="md:hidden form-group flex flex-col items-start mx-8 ">
        <label htmlFor="category" className="text-base mb-2 text-black">
          Catégorie de l'article :
        </label>
        <select
          id="category"
          required
          name="category"
          value={category}
          className="px-4 py-1 text-black rounded-md w-full border-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Tout afficher</option>
          <option value="ameublement">Ameublement</option>
          <option value="éléctroménager">Eléctroménager</option>
          <option value="décoration">Décoration</option>
          <option value="multimédia">Multimédia</option>
          <option value="véhicule">Véhicule</option>
          <option value="immobilier">Immobilier</option>
          <option value="jeux">Jeux</option>
          <option value="autre">autre</option>
        </select>
      </div>
      <ul className="hidden md:flex w-9/12 justify-evenly mx-auto flex-wrap gap-5">
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="tout afficher"
            onClick={() => setCategory("")}
          >
            Tout afficher
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="ameublement"
            onClick={(e) => setCategory(e.target.value)}
          >
            Ameublement
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="éléctroménager"
            onClick={(e) => setCategory(e.target.value)}
          >
            Electroménager
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="décoration"
            onClick={(e) => setCategory(e.target.value)}
          >
            Décoration
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="multimédia"
            onClick={(e) => setCategory(e.target.value)}
          >
            Multimédia
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="véhicule"
            onClick={(e) => setCategory(e.target.value)}
          >
            Véhicule
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="immobilier"
            onClick={(e) => setCategory(e.target.value)}
          >
            Immobilier
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="jeux"
            onClick={(e) => setCategory(e.target.value)}
          >
            Loisir
          </button>
        </li>
        <li className="hover:scale-105 ">
          <button
            type="button"
            className="hover:underline hover:underline-offset-4"
            value="autre"
            onClick={(e) => setCategory(e.target.value)}
          >
            Autres
          </button>
        </li>
      </ul>
      <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
        {ads.length < 1 ? (
          <p className="text-center">Aucune annonce à afficher</p>
        ) : (
          <ul className="flex flex-wrap gap-4 justify-center">
            {ads.map((ad) => (
              <Link
                to={`/ads/${ad.id}`}
                className=" w-48"
                key={`home - ${ad.id}`}
              >
                <li>
                  <Card infos={ad} />
                </li>
              </Link>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
