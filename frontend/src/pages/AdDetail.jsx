/* eslint-disable consistent-return */
import { useParams, useNavigate, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { useUserContext } from "../contexts/UserContext";

import defaultImage from "../assets/defaultImage.jpg";
import HeaderMobile from "../components/HeaderMobile";
import Map from "../components/Map";

export default function AdDetail() {
  const navigate = useNavigate();
  const { userId, role } = useUserContext();
  const [adInfo, setAdInfo] = useState([]);
  const [adUser, setAdUser] = useState();
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);
  const [favoriteInfo, setFavoriteInfo] = useState();
  const [openInvalid, setOpenInvalid] = useState(false);
  const [openValid, setOpenValid] = useState(false);
  const [openDeleteAd, setOpenDeleteAd] = useState(false);
  const [openDeleteAdOk, setOpenDeleteAdOk] = useState(false);
  const [openFavoriteOk, setOpenFavoriteOk] = useState(false);
  const [openNotFavoriteOk, setOpenNotFavoriteOk] = useState(false);

  const onOpenModalNotFavoriteOk = () => setOpenNotFavoriteOk(true);
  const onCloseModalNotFavoriteOk = () => setOpenNotFavoriteOk(false);

  const onOpenModalFavoriteOk = () => setOpenFavoriteOk(true);
  const onCloseModalFavoriteOk = () => setOpenFavoriteOk(false);

  const onOpenModalDeleteAdOk = () => setOpenDeleteAdOk(true);
  const onCloseModalDeleteAdOk = () => setOpenDeleteAdOk(false);

  const onOpenModalDeleteAd = () => setOpenDeleteAd(true);
  const onCloseModalDeleteAd = () => setOpenDeleteAd(false);

  const onOpenModalInvalid = () => setOpenInvalid(true);
  const onCloseModalInvalid = () => setOpenInvalid(false);

  const onOpenModalValid = () => setOpenValid(true);
  const onCloseModalValid = () => setOpenValid(false);

  const invalidAd = () => {
    fetch(`http://localhost:8000/api/ads/${id}/invalid`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: adUser.email,
        firstname: adUser.firstname,
      }),
    })
      .then(onOpenModalInvalid())
      .catch((err) => console.error(err));
  };

  const validAd = () => {
    fetch(`http://localhost:8000/api/ads/${id}/valid`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: adUser.email,
        firstname: adUser.firstname,
      }),
    })
      .then(onOpenModalValid())
      .catch((err) => console.error(err));
  };

  const deleteAd = () => {
    fetch(`http://localhost:8000/api/ads/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        onOpenModalDeleteAdOk();
      })
      .catch((err) => console.error(err));
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
      })
        .then(() => {
          setFavorite(true);
          onOpenModalFavoriteOk();
        })
        .catch((err) => console.error(err));
    } else {
      fetch(`http://localhost:8000/api/favorites/${favoriteInfo.id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then(() => {
          setFavorite(false);
          onOpenModalNotFavoriteOk();
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
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
            fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/favorites/${
                data.id
              }/users/${userId}`,
              {
                credentials: "include",
              }
            )
              .then((res) => res.json())
              .then((responseData) => {
                if (responseData.length === 0) {
                  return setFavorite(false);
                }
                setFavorite(true);
                setFavoriteInfo(responseData);
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [favorite]);

  if (!adInfo || !adUser) {
    return <p>Chargement de la page</p>;
  }

  return (
    <div>
      <HeaderMobile />
      {role === "admin" && adInfo.verified === 0 ? (
        <ul className="flex justify-center">
          <li>
            <button
              type="submit"
              className="font-bold bg-green-400 text-white mt-2 rounded-md w-60 h-10 mx-4 hover:bg-green-500 hover:scale-105 duration-300 flex items-center justify-center"
              onClick={validAd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-white"
              >
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
              <p className="px-6 py-2 text-center">Valider l'annonce</p>
            </button>
          </li>
          <li>
            <button
              type="submit"
              className="font-bold bg-red-400 text-white mt-2 rounded-md w-60 h-10 mx-4 hover:bg-red-500 hover:scale-105 duration-300 flex items-center justify-center"
              onClick={invalidAd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-white"
              >
                <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
              <p className="px-6 py-2 text-center">Invalider l'annonce</p>
            </button>
          </li>
        </ul>
      ) : null}
      <section className="relative justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
        {userId === adInfo.user_id ? (
          <Link to={`/ads/${id}/edit`}>
            <button
              type="submit"
              className="font-bold bg-blue-400 text-white mt-2 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
            >
              <p className="px-6 py-2 text-center">Modifier</p>
            </button>
          </Link>
        ) : (
          <a href={`mailto:${adUser.email}`}>
            <button
              type="submit"
              className="font-bold bg-blue-400 text-white mt-2 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
            >
              <p className="px-6 py-2 text-center">Contacter le vendeur</p>
            </button>
          </a>
        )}
        {userId === adInfo.user_id ? (
          <button
            type="submit"
            className="font-bold bg-red-400 text-white mt-2 rounded-md w-60 h-10 mx-4 hover:bg-red-500 hover:scale-105 duration-300"
            onClick={onOpenModalDeleteAd}
          >
            <p className="px-6 py-2 text-center">Supprimer</p>
          </button>
        ) : null}
        {userId !== adInfo.user_id ? (
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
        ) : null}

        <figure className="flex flex-col mt-4">
          <h1 className="text-center mb-5 text-2xl">{adInfo.title}</h1>
          <div className="flex gap-5 justify-between mb-5">
            {adInfo.pictures[0].source ? (
              <Carousel infiniteLoop showStatus={false} className="w-1/2">
                {adInfo.pictures.map((picture) => (
                  <img
                    className="h-auto object-content"
                    src={`${import.meta.env.VITE_ASSETS_IMAGES_URL}/${
                      picture.source
                    }`}
                    alt={picture.source}
                    key={picture.source}
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
                <Link to={`/ads/${id}/edit-picture`}>
                  <button
                    type="button"
                    className="font-bold bg-red-400 text-white mt-2 rounded-md  mx-4 hover:bg-red-500 hover:scale-105 duration-300"
                  >
                    <p className="px-6 py-2 text-center">
                      Gérer les photos de mon annonce
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
        <Map adUser={adUser} userId={userId} />
        <Modal
          open={openInvalid}
          onClose={onCloseModalInvalid}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
          closeIcon={
            <Link to="/validate-ads">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-white"
              >
                <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </Link>
          }
        >
          <h1 className="text-white text-center">Annonce supprimée !</h1>

          <div className="flex justify-center mt-2 gap-6 ">
            <p
              className="text-white
            "
            >
              l'annonce a bien été supprimée et le propriétaire du bien a été
              informé par email
            </p>
          </div>
        </Modal>
        <Modal
          open={openValid}
          onClose={onCloseModalValid}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
          closeIcon={
            <Link to="/validate-ads">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-white"
              >
                <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </Link>
          }
        >
          <h1 className="text-white text-center">Annonce validée !</h1>

          <div className="flex justify-center mt-2 gap-6 ">
            <p
              className="text-white
            "
            >
              l'annonce a bien été validée et le propriétaire du bien a été
              informé par email
            </p>
          </div>
        </Modal>
        <Modal
          open={openDeleteAd}
          onClose={onCloseModalDeleteAd}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
          closeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              className="fill-white"
            >
              <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          }
        >
          <h1 className="text-white text-center">Suppression de l'annonce !</h1>

          <div className="flex justify-center mt-2 gap-6 ">
            <p
              className="text-white
            "
            >
              Etes-vous sûr(e) de vouloir supprimer définitivement votre annonce
              ?
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={deleteAd}
              className="border-2 rounded-lg w-3/12 hover:bg-white text-white hover:text-gray-600 hover:font-bold duration-300"
            >
              oui
            </button>
            <button
              type="button"
              onClick={onCloseModalDeleteAd}
              className="border-2 rounded-lg w-3/12 hover:bg-white text-white hover:text-gray-600 hover:font-bold duration-300"
            >
              non
            </button>
          </div>
        </Modal>
        <Modal
          open={openDeleteAdOk}
          onClose={onCloseModalDeleteAdOk}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
          closeIcon={
            <Link to="/my-ads">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-white"
              >
                <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </Link>
          }
        >
          <h1 className="text-white text-center">Suppression de l'annonce !</h1>

          <div className="flex justify-center mt-2 gap-6 ">
            <p
              className="text-white
            "
            >
              Votre annonce a bien été supprimée
            </p>
          </div>
        </Modal>
        <Modal
          open={openFavoriteOk}
          onClose={onCloseModalFavoriteOk}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
          closeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              className="fill-white"
            >
              <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          }
        >
          <h1 className="text-white text-center">Favoris !</h1>

          <div className="flex justify-center mt-2 gap-6 ">
            <p
              className="text-white
            "
            >
              L'annonce a bien été ajoutée à vos favoris.
            </p>
          </div>
        </Modal>
        <Modal
          open={openNotFavoriteOk}
          onClose={onCloseModalNotFavoriteOk}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
          closeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              className="fill-white"
            >
              <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          }
        >
          <h1 className="text-white text-center">Favoris !</h1>

          <div className="flex justify-center mt-2 gap-6 ">
            <p
              className="text-white
            "
            >
              L'annonce a bien été enlevée de vos favoris.
            </p>
          </div>
        </Modal>
      </section>
    </div>
  );
}
