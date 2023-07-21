/* eslint-disable consistent-return */
import { useParams, useNavigate, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";

import defaultImage from "../assets/defaultImage.jpg";

export default function AdDetail() {
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const [adInfo, setAdInfo] = useState([]);
  const [adUser, setAdUser] = useState();
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);
  const [favoriteInfo, setFavoriteInfo] = useState();

  const deleteAd = () => {
    fetch(`http://localhost:8000/api/ads/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      navigate("/mes-annonces");
    });
  };

  const addToFavorite = () => {
    if (favorite === false) {
      fetch("http://localhost:8000/api/favorites", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ad_id: id,
          user_id: userId,
        }),
      }).then(() => {
        setFavorite(true);
        navigate("/mes-favoris");
      });
    } else {
      fetch(`http://localhost:8000/api/favorites/${favoriteInfo.id}`, {
        method: "DELETE",
        credentials: "include",
      }).then(() => {
        setFavorite(false);
        navigate("/mes-favoris");
      });
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ads/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdInfo(data);
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${data.user_id}/`,
          {
            credentials: "include",
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((datass) => {
            setAdUser(datass);
            fetch(`http://localhost:8000/api/favorites/${data.id}/${userId}`, {
              credentials: "include",
            })
              .then((res) => res.json())
              .then((responseData) => {
                if (responseData.length === 0) {
                  return setFavorite(false);
                }
                setFavorite(true);
                setFavoriteInfo(responseData);
              });
          });
      });
  }, []);

  if (!adInfo || !adUser) {
    return <p>Chargement de la page</p>;
  }

  return (
    <section className="relative justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
      {userId === adInfo.user_id ? (
        <Link to={`/${id}/edit`}>
          <button
            type="submit"
            className="font-bold bg-blue-400 text-white mt-2 rounded-md w-60 h-10 mx-4"
          >
            <p className="px-6 py-2 text-center">Modifier</p>
          </button>
        </Link>
      ) : (
        <a href={`mailto:${adUser.email}`}>
          <button
            type="submit"
            className="font-bold bg-blue-400 text-white mt-2 rounded-md w-60 h-10 mx-4"
          >
            <p className="px-6 py-2 text-center">Contacter le vendeur</p>
          </button>
        </a>
      )}
      {userId === adInfo.user_id ? (
        <Link to="/">
          <button
            type="submit"
            className="font-bold bg-red-400 text-white mt-2 rounded-md w-60 h-10 mx-4"
            onClick={deleteAd}
          >
            <p className="px-6 py-2 text-center">Supprimer</p>
          </button>
        </Link>
      ) : null}
      <button
        type="button"
        className="absolute right-1"
        onClick={addToFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
          className={`mx-auto ${favorite ? "fill-red-500" : "fill-black"}`}
        >
          <path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z" />
        </svg>
      </button>
      <figure className="flex flex-col">
        <h1 className="text-center mb-5 text-2xl">{adInfo.title}</h1>
        <div className="flex gap-5 justify-between mb-5">
          {adInfo.pictures[0].source ? (
            <Carousel infiniteLoop showStatus={false} className="w-1/2">
              {adInfo.pictures.map((picture) => (
                <img
                  className=" object-content"
                  src={`${import.meta.env.VITE_ASSETS_IMAGES_URL}/${
                    picture.source
                  }`}
                  alt={picture.source}
                />
              ))}
            </Carousel>
          ) : (
            <img src={defaultImage} alt="" className="w-1/2" />
          )}

          <div className="relative w-1/2">
            <p>{adInfo.price} Euros</p>
            <p>{adInfo.description}</p>
            {userId === adInfo.user_id ? (
              <Link to={`/${id}/editphoto`}>
                <button
                  type="button"
                  className="font-bold bg-red-400 text-white mt-2 rounded-md  mx-4"
                >
                  <p className="px-6 py-2 text-center">
                    Gérer les photos de mon annonces
                  </p>
                </button>
              </Link>
            ) : null}
            <div className="absolute bottom-0 font-bold">
              <p>Annonce postée par : {adUser.nickname}</p>
              <p>{adUser.city}</p>
            </div>
          </div>
        </div>
      </figure>
    </section>
  );
}
