import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function CreateAd() {
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [state, setState] = useState();
  const [category, setCategory] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChangeSource = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ads`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        description,
        state,
        category,
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        const contentData = new FormData();
        contentData.append("source", selectedFile);
        contentData.append("ad_id", responseData.insertId);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pictures`, {
          method: "POST",
          credentials: "include",
          body: contentData,
        })
          // .then((res) => res.json())
          .then(() => {
            alert("Votre contenu a bien été enregistré.");
            navigate("/mes-annonces");
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(
              "Une erreur s'est produite lors de l'enregistrement du contenu."
            );
          });
      });
  };

  return (
    <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-6/12 p-5 mx-auto rounded-lg my-8">
      <form onSubmit={handleSubmit} className="mt-5 px-4">
        <div className="flex justify-evenly w-full gap-4">
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
              <option value="">Sélectionnez une catégorie</option>
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
              <option value="">Sélectionnez un état</option>
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
              className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4"
            >
              <p className="px-6 py-2 text-center">Ajouter</p>
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
