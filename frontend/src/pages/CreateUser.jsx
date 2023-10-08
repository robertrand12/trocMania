import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile";

const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function CreateUser() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeZipCode = (e) => {
    setZipCode(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstname,
      lastname,
      nickname,
      image,
      address,
      zip_code: zipCode,
      city,
      email,
      password,
    };

    if (
      !firstname ||
      !lastname ||
      !nickname ||
      !address ||
      !zipCode ||
      !city ||
      !email ||
      !password
    ) {
      // eslint-disable-next-line no-alert
      alert("vous devee renseigner tous les champs requis");
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          navigate(`/login`);
        })
        .catch((err) => {
          console.error(err);
          // eslint-disable-next-line no-alert
          alert(
            "Erreur dans la création du compte, veuillez Essayer à nouveau"
          );
        });
    }
  };

  return (
    <div>
      <HeaderMobile />
      <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
        <form onSubmit={handleSubmit} className="mt-2 px-4">
          <div className="flex flex-col ">
            <div className="grid lg:grid-cols-2 gap-4 overflow-y-auto pb-5 ">
              <div className="flex flex-col items-start">
                <label htmlFor="firstname" className=" text-base mb-2 ">
                  Prénom *
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="text"
                  id="firstname"
                  required
                  value={firstname}
                  onChange={handleChangeFirstname}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="lastname" className="text-base mb-2 ">
                  Nom *
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="text"
                  id="lastname"
                  required
                  value={lastname}
                  onChange={handleChangeLastname}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="nickname" className=" text-base mb-2 ">
                  Pseudo *
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={handleChangeNickname}
                />
              </div>
              <div className="form-group flex flex-col items-start">
                <label htmlFor="image" className="text-base mb-2 ">
                  Ajouter une photo :
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept={imageTypes.join(",")}
                  onChange={handleChangeImage}
                  className="px-4 py-1 rounded-md w-full"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-start">
                  <label htmlFor="address" className=" text-base mb-2 ">
                    Adresse *
                  </label>
                  <input
                    className="px-4 py-1 text-black rounded-md w-full"
                    type="text"
                    id="address"
                    value={address}
                    onChange={handleChangeAddress}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="email" className="text-base mb-2 ">
                  Email *
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="text-base mb-2 ">
                  Mot de passe *
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={handleChangePassword}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="zip_code" className="text-base mb-2 ">
                  Code Postal *
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="number"
                  id="zip_code-code"
                  value={zipCode}
                  onChange={handleChangeZipCode}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="city" className="text-base mb-2 ">
                  Ville *
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="text"
                  id="city"
                  value={city}
                  onChange={handleChangeCity}
                />
              </div>
            </div>
          </div>
          <div className="text-center ">
            <button
              type="submit"
              className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
              onClick={handleSubmit}
            >
              <p className="px-6 py-2 text-center">M'inscrire</p>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
