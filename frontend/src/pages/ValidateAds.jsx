/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import Card from "../components/Card";
import HeaderMobile from "../components/HeaderMobile";

export default function ValidateAds() {
  const navigate = useNavigate();
  const { userId, role } = useUserContext();
  const [adsToVerify, setAdsToVerify] = useState([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!userId && role === "admin") {
      return navigate("/login");
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ads/toVerified`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdsToVerify(data);
      })
      .catch((err) => console.error(err));
  }, [role]);

  if (adsToVerify.length === 0) {
    return (
      <div>
        <HeaderMobile />
        <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
          <p className="text-center">Vous n'avez aucune annonce à valider</p>
        </section>
      </div>
    );
  }
  return (
    <div>
      <HeaderMobile />
      <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
        <h1 className="text-2xl mb-4">Liste des annonces à valider</h1>
        <ul className="flex flex-wrap gap-4 justify-center mb-4">
          {adsToVerify.map((ad) => (
            <Link
              to={`/ads/${ad.id}`}
              className="w-48"
              key={`adlist - ${ad.id}`}
            >
              <li>
                <Card infos={ad} />
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
