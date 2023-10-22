/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Modal } from "react-responsive-modal";
import { useUserContext } from "../contexts/UserContext";
import HeaderMobile from "../components/HeaderMobile";

export default function CreateAd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useUserContext();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [state, setState] = useState();
  const [category, setCategory] = useState();
  const [verified, setVerified] = useState();
  const [adInfo, setAdInfo] = useState([]);
  const [errors, setErrors] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [openUpdateAdOk, setUpdateAdOk] = useState(false);
  const [openErrorForm, setOpenErrorForm] = useState(false);

  const onOpenModalErrorForm = () => setOpenErrorForm(true);
  const onCloseModalErrorForm = () => setOpenErrorForm(false);

  const onOpenModalUpdateAdOk = () => setUpdateAdOk(true);
  const onCloseModalUpdateAdOk = () => setUpdateAdOk(false);

  const onCloseModalError = () => setOpenError(false);

  const userSchema = Yup.object().shape({
    title: Yup.string()
      .required("Vous devez renseigner un titre pour votre annonce")
      .min(3, "votre titre doit contenir au moins 3 caractères")
      .max(255, "votre titre ne peut dépasser les 255 caractères"),
    price: Yup.number().required("Vous devez renseigner un nom"),
    description: Yup.string()
      .min(15, "votre description doit contenir au moins 15 caractères")
      .required("Vous devez renseigner un surnom"),
    category: Yup.string().required("Vous devez renseigner une categorie"),
    state: Yup.string().required("Vous devez renseigner un état"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId !== adInfo.user_id) {
      return setOpenError(true);
    }
    setErrors([]);
    setVerified(false);

    const data = {
      title,
      price,
      description,
      state,
      category,
      verified,
      user_id: userId,
    };

    userSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ads/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            return onOpenModalUpdateAdOk();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        err.inner.forEach((event) => {
          setErrors((current) => [...current, event.message]);
        });
        onOpenModalErrorForm();
      });
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
        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
        setState(data.state);
        setCategory(data.category);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <HeaderMobile />
      <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-6/12 p-5 mx-auto rounded-lg my-8">
        <h1 className="text-2xl mb-4">Modifier mon annonce</h1>
        <form onSubmit={handleSubmit} className="mt-5 px-4">
          <div className="md:flex justify-evenly w-full gap-4">
            <div className="form-group flex flex-col items-start w-full">
              <label htmlFor="category" className="text-base mb-2 text-black">
                Catégorie de l'article :
              </label>
              <select
                id="category"
                required
                name="category"
                value={category}
                className="px-4 py-1 text-black rounded-md w-full"
                onChange={(e) => setCategory(e.target.value)}
              >
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
            <div className="form-group flex flex-col items-start w-full">
              <label htmlFor="state" className="text-base mb-2 text-black">
                Etat de l'article :
              </label>
              <select
                id="state"
                name="state"
                value={state}
                className="px-4 py-1 text-black rounded-md w-full"
                onChange={(e) => setState(e.target.value)}
              >
                <option value="neuf">Neuf</option>
                <option value="très bon état">Très bon état</option>
                <option value="bon état">Bon état</option>
                <option value="état moyen">Etat moyen</option>
                <option value="mauvais état">Mauvais état</option>
                <option value="pour pièces">Pour pièces</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div className=" overflow-y-auto pb-5">
              <div className="form-group flex flex-col items-start">
                <label htmlFor="title" className="text-base mb-2 ">
                  Titre de l'annonce :
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  className="px-4 py-1  rounded-md w-full"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group flex flex-col items-start mt-5">
                <label htmlFor="description" className="text-base mb-2 ">
                  Description :
                </label>
                <textarea
                  placeholder="Décrivez votre article"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 p-3"
                />
              </div>
            </div>

            <div className="form-group flex flex-col items-center">
              <label htmlFor="price" className="text-base mb-2 ">
                Prix (en Euros):
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={price}
                className="px-4 py-1  rounded-md w-1/2 mx-auto"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="text-center ">
              <button
                type="submit"
                className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
              >
                <p className="px-6 py-2 text-center">Modifier</p>
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
      <Modal
        open={openError}
        onClose={onCloseModalError}
        center
        classNames={{ overlay: "customOverlay", modal: "customModal" }}
        closeIcon={
          <Link to="/">
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
        <h1 className="text-white text-center">Erreur !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Vous ne pouvez pas modifier cette annonce car vous n'en êtes pas le
            propriétaire.
          </p>
        </div>
      </Modal>
      <Modal
        open={openUpdateAdOk}
        onClose={onCloseModalUpdateAdOk}
        center
        classNames={{ overlay: "customOverlay", modal: "customModal" }}
        closeIcon={
          <Link to={`/ads/${id}`}>
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
        <h1 className="text-white text-center">Modification de l'annonce !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Votre annonce a bien été modifiée, elle est en attente de
            validation.
          </p>
        </div>
      </Modal>
      <Modal
        open={openErrorForm}
        onClose={onCloseModalErrorForm}
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
          <ul className="text-white">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
