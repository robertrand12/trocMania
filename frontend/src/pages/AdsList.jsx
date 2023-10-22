/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import Card from "../components/Card";
import HeaderMobile from "../components/HeaderMobile";

export default function AdsList() {
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const [myAds, setMyAds] = useState([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/ads`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyAds(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (myAds.length === 0) {
    return (
      <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
        <p className="text-center">
          Vous n'avez posté aucune annonce pour le moment
        </p>
      </section>
    );
  }
  return (
    <div>
      <HeaderMobile />
      <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
        <h1 className="text-2xl mb-4">Mes annonces postées</h1>
        <ul className="flex flex-wrap gap-4 justify-center mb-4">
          {myAds.map((ad) =>
            ad.verified ? (
              <Link
                to={`/ads/${ad.id}`}
                className="w-48"
                key={`adlist - ${ad.id}`}
              >
                <li>
                  <Card infos={ad} />
                </li>
              </Link>
            ) : null
          )}
        </ul>
        <h1 className="text-2xl mb-4">Mes annonces en attente de validation</h1>
        <ul className="flex flex-wrap gap-4 justify-center">
          {myAds.map((ad) =>
            !ad.verified ? (
              <Link
                to={`/ads/${ad.id}`}
                className="w-48"
                key={`adlist - ${ad.id}`}
              >
                <li>
                  <Card infos={ad} />
                </li>
              </Link>
            ) : null
          )}
        </ul>
      </section>
    </div>
  );
}
