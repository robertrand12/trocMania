import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import HeaderMobile from "../components/HeaderMobile";

export default function CreateUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openErrorForm, setOpenErrorForm] = useState(false);

  const onOpenModalErrorForm = () => setOpenErrorForm(true);
  const onCloseModalErrorForm = () => setOpenErrorForm(false);

  const onOpenModalError = () => setOpenError(true);
  const onCloseModalError = () => setOpenError(false);

  const onOpenModalCreate = () => setOpenCreate(true);
  const onCloseModalCreate = () => setOpenCreate(false);

  const userSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("Vous devez renseigner un prénom")
      .min(2, "votre prénom doit contenir au moins 2 caractères")
      .max(100, "votre prénom ne peut dépasser les 100 caractères"),
    lastname: Yup.string()
      .required("Vous devez renseigner un nom")
      .min(2, "votre nom doit contenir au moins 2 caractères")
      .max(100, "votre nom ne peut dépasser les 100 caractères"),
    nickname: Yup.string()
      .min(2, "votre surnom doit contenir au moins 2 caractères")
      .max(100, "votre surnom ne peut dépasser les 100 caractères")
      .required("Vous devez renseigner un surnom"),
    address: Yup.string()
      .required("Vous devez renseigner une adresse")
      .min(2, "votre adresse doit contenir au moins 2 caractères")
      .max(255, "votre adresse ne peut dépasser les 255 caractères"),
    zip_code: Yup.string()
      .matches(
        /^[0-9]+$/,
        "Votre code postal ne doit contenir que des chiffres"
      )
      .min(5, "Votre code postal ne doit contenir 5 chiffres")
      .max(5, "Votre code postal ne doit contenir 5 chiffres")
      .required("Vous devez renseigner un code postal"),
    city: Yup.string().required("Vous devez renseigner une ville"),
    email: Yup.string()
      .email()
      .required("Vous devez renseigner une adresse email valide"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial"
      ),
  });

  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
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
    setErrors([]);
    e.preventDefault();

    const data = {
      firstname,
      lastname,
      nickname,
      address,
      zip_code: zipCode,
      city,
      email,
      password,
    };

    userSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            onOpenModalCreate();
          })
          .catch((err) => {
            console.error(err);
            onOpenModalError();
          });
      })
      .catch((err) => {
        err.inner.forEach((event) => {
          setErrors((current) => [...current, event.message]);
        });
        onOpenModalErrorForm();
      });
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
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex grow flex-col items-start">
                  <label htmlFor="address" className=" text-base mb-2 ">
                    Adresse *
                  </label>
                  <input
                    className="px-4 py-1 text-black rounded-md w-full"
                    type="text"
                    id="address"
                    value={address}
                    onChange={handleChangeAddress}
                    required
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
                  required
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
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center ">
            <button
              type="submit"
              className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4 hover:bg-blue-500 hover:scale-105 duration-300"
            >
              <p className="px-6 py-2 text-center">M'inscrire</p>
            </button>
          </div>
        </form>
      </section>
      <Modal
        open={openCreate}
        onClose={onCloseModalCreate}
        center
        classNames={{ overlay: "customOverlay", modal: "customModal" }}
        closeIcon={
          <Link to="/login">
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
        <h1 className="text-white text-center">Annonce créée !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Votre compte a bien été enregistré.
          </p>
        </div>
      </Modal>
      <Modal
        open={openError}
        onClose={onCloseModalError}
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
            Une erreur s'est produite lors de l'enregistrement du compte.
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
