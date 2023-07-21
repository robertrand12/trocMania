/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function EditAdPictures() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const [pictures, setPictures] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

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
        alert("Votre contenu a bien été enregistré.");
        navigate(`/${id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Une erreur s'est produite lors de l'enregistrement du contenu.");
      });
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
  }, []);

  if (pictures.length === 0) {
    return (
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
                className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4"
              >
                <p className="px-6 py-2 text-center">Ajouter à l'annonce</p>
              </button>

              <Link to="/">
                <button
                  type="submit"
                  className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4"
                >
                  <p className="px-6 py-2 text-center">Retour</p>
                </button>
              </Link>
            </div>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-6/12 p-5 mx-auto rounded-lg my-8">
      <Carousel infiniteLoop showStatus={false} className="w-full">
        {pictures.map((picture) => (
          <img
            className="w-full h-auto overflow-hidden"
            src={`${import.meta.env.VITE_ASSETS_IMAGES_URL}/${picture.source}`}
            alt={picture.source}
          />
        ))}
      </Carousel>
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
              className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4"
            >
              <p className="px-6 py-2 text-center">Ajouter à l'annonce</p>
            </button>

            <Link to="/">
              <button
                type="submit"
                className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4"
              >
                <p className="px-6 py-2 text-center">Retour</p>
              </button>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
