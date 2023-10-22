/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { useUserContext } from "../contexts/UserContext";
import HeaderMobile from "../components/HeaderMobile";

const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function EditAdPictures() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const [pictures, setPictures] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openErrorDelete, setOpenErrorDelete] = useState(false);
  const [openErrorDownload, setOpenErrorDownload] = useState(false);

  const onOpenModalErrorDownload = () => setOpenErrorDownload(true);
  const onCloseModalErrorDownload = () => setOpenErrorDownload(false);

  const onOpenModalErrorDelete = () => setOpenErrorDelete(true);
  const onCloseModalErrorDelete = () => setOpenErrorDelete(false);

  const handleChangeSource = (e) => {
    const files = e.target.files[0];
    setSelectedFiles(files);
  };

  const handleSubmit = (e) => {
    if (!userId) {
      return navigate("/login");
    }
    e.preventDefault();
    if (selectedFiles.length === 0) {
      return navigate(`/${id}`);
    }
    const contentData = new FormData();
    contentData.append("source", selectedFiles);
    contentData.append("ad_id", id);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pictures`, {
      method: "POST",
      credentials: "include",
      body: contentData,
    })
      .then(() => {
        navigate(`/ads/${id}/edit-picture`);
      })
      .catch((err) => {
        console.error(err);
        onOpenModalErrorDownload();
      });
  };

  const deletePicture = (pictureId) => {
    if (pictures.length > 0) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/${pictureId}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then(() => {
          navigate(`/ads/${id}/edit-picture`);
        })
        .catch((err) => {
          console.error(err);
          onOpenModalErrorDelete();
        });
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPictures(data);
      })
      .catch((err) => console.error(err));
  }, [pictures]);

  if (pictures.length === 0) {
    return (
      <div>
        <HeaderMobile />
        <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-6/12 p-5 mx-auto rounded-lg my-8">
          <p className="text-center">Pas de photos pour cette annonce</p>
          <form onSubmit={handleSubmit} className="mt-5 px-4">
            <div className="flex flex-col mt-5">
              <div className="form-group flex flex-col items-start">
                <label htmlFor="source" className="text-base mb-2 ">
                  Ajouter une photo :
                </label>
                <input
                  type="file"
                  id="source"
                  name="source"
                  accept={imageTypes.join(",")}
                  onChange={handleChangeSource}
                  className="px-4 py-1 rounded-md w-full"
                />
              </div>

              <div className="text-center ">
                <button
                  type="submit"
                  className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
                >
                  <p className="px-6 py-2 text-center">Ajouter à l'annonce</p>
                </button>

                <Link to="/">
                  <button
                    type="submit"
                    className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
                  >
                    <p className="px-6 py-2 text-center">Retour</p>
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div>
      <HeaderMobile />
      <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-6/12 p-5 mx-auto rounded-lg my-8">
        <div className="flex flex-wrap gap-4">
          {pictures.map((picture) => (
            <figure className="w-3/12" key={picture.id}>
              <img
                className="h-auto max-h-36 overflow-hidden mb-2"
                src={`${import.meta.env.VITE_ASSETS_IMAGES_URL}/${
                  picture.source
                }`}
                alt={picture.source}
              />
              <button
                type="button"
                onClick={() => {
                  deletePicture(picture.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </figure>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-5 px-4">
          <div className="flex flex-col mt-5">
            <div className="form-group flex flex-col items-start">
              <label htmlFor="source" className="text-base mb-2 ">
                Ajouter une photo :
              </label>
              <input
                type="file"
                multiple
                id="source"
                name="source"
                accept={imageTypes.join(",")}
                onChange={handleChangeSource}
                className="px-4 py-1 rounded-md w-full"
              />
            </div>

            <div className="text-center ">
              <button
                type="submit"
                className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
              >
                <p className="px-6 py-2 text-center">Ajouter à l'annonce</p>
              </button>

              <Link to={`/ads/${id}`}>
                <button
                  type="submit"
                  className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
                >
                  <p className="px-6 py-2 text-center">Retour</p>
                </button>
              </Link>
            </div>
          </div>
        </form>
      </section>
      <Modal
        open={openErrorDownload}
        onClose={onCloseModalErrorDownload}
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
        <h1 className="text-white text-center">Erreur !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Une erreur s'est produite lors de l'enregistrement du contenu.
          </p>
        </div>
      </Modal>
      <Modal
        open={openErrorDelete}
        onClose={onCloseModalErrorDelete}
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
        <h1 className="text-white text-center">Erreur !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Une erreur s'est produite lors de la suppression du contenu.
          </p>
        </div>
      </Modal>
    </div>
  );
}
