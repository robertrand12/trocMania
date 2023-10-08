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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ads/myads/${userId}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyAds(data);
      });
  }, []);

  if (myAds.length === 0) {
    return (
      <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
        <p className="text-center">
          Vous n'avez posté aucune annonce pour le moment
        </p>
      </section>
    );
  }
  return (
    <div>
      <HeaderMobile />
      <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
        <ul className="flex flex-wrap gap-4 justify-center">
          {myAds.map((ad) => (
            <Link to={`/${ad.id}`} className="w-48">
              <li key={`adlist - ${ad.id}`}>
                <Card infos={ad} />
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
