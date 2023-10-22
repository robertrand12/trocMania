import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import defaultImage from "../assets/defaultImage.jpg";
import HeaderMobile from "../components/HeaderMobile";

export default function FavoritesAds() {
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const [myFavAds, setMyFavAds] = useState([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/favorites`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyFavAds(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!myFavAds) {
    return (
      <div>
        <HeaderMobile />
        <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
          <p className="text-center">en cours de chargement</p>
        </section>
      </div>
    );
  }

  if (myFavAds.length === 0) {
    return (
      <div>
        <HeaderMobile />
        <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
          <p className="text-center">
            Vous n'avez enregistré aucune annonce en tant que favoris
          </p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <HeaderMobile />
      <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
        <h1 className="text-2xl mb-4">Mes favoris</h1>
        <ul className="flex flex-wrap gap-4 justify-center">
          {myFavAds.map((ad) => (
            <Link
              to={`/ads/${ad.ads[0].id}`}
              className="w-48"
              key={`adlist - ${ad.ads[0].id}`}
            >
              <li>
                <figure className="flex flex-col justify-between bg-gray-200 px-2 rounded-md shadow-md shadow-gray-600 h-72">
                  <h2>{ad.ads[0].title}</h2>
                  {ad.ads[0].pictures[0].source ? (
                    <img
                      className="overflow-hidden"
                      src={`${import.meta.env.VITE_ASSETS_IMAGES_URL}/${
                        ad.ads[0].pictures[0].source
                      }`}
                      alt=""
                    />
                  ) : (
                    <img
                      className=" overflow-hidden"
                      src={defaultImage}
                      alt=""
                    />
                  )}

                  <p>{ad.ads[0].price} Euros</p>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}
