import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { useUserContext } from "../contexts/UserContext";
import HeaderMobile from "../components/HeaderMobile";

export default function EditUser() {
  const { userId } = useUserContext();
  // const [userInfo, setUserInfo] = useState();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openError, setOpenError] = useState(false);

  const onOpenModalError = () => setOpenError(true);
  const onCloseModalError = () => setOpenError(false);

  const onOpenModalUpdate = () => setOpenUpdate(true);
  const onCloseModalUpdate = () => setOpenUpdate(false);

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

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        onOpenModalUpdate();
      })
      .catch((err) => {
        console.error(err);
        onOpenModalError();
      });
  };

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
        credentials: "include",
      })
        .then((res) => {
          return res.json(res);
        })
        .then((data) => {
          setFirstname(data.firstname);
          setLastname(data.lastname);
          setNickname(data.nickname);
          setAddress(data.address);
          setCity(data.city);
          setZipCode(data.zip_code);
          setEmail(data.email);
          setPassword(data.password);
        })
        .catch((err) => {
          console.error(err);
          onOpenModalError();
        });
    }
  }, [userId]);

  return (
    <div>
      <HeaderMobile />
      <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
        <form onSubmit={handleSubmit} className="mt-2 px-4">
          <div className="flex flex-col ">
            <div className="grid lg:grid-cols-2 gap-4 overflow-y-auto pb-5 ">
              <div className="flex flex-col items-start">
                <label htmlFor="firstname" className=" text-base mb-2 ">
                  Prénom
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={handleChangeFirstname}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="lastname" className="text-base mb-2 ">
                  Nom
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={handleChangeLastname}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="nickname" className=" text-base mb-2 ">
                  Pseudo
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={handleChangeNickname}
                />
              </div>

              <div className="md:flex gap-4">
                <div className="flex grow flex-col items-start">
                  <label htmlFor="address" className=" text-base mb-2 ">
                    Adresse
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
                  Email
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="text-base mb-2 ">
                  Nouveau mot de passe ?
                </label>
                <input
                  className="px-4 py-1 text-black rounded-md w-full"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChangePassword}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="zip_code" className="text-base mb-2 ">
                  Code Postal
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
                  Ville
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
              <p className="px-6 py-2 text-center">Modifier mon Compte</p>
            </button>
          </div>
        </form>
      </section>
      <Modal
        open={openUpdate}
        onClose={onCloseModalUpdate}
        center
        classNames={{ overlay: "customOverlay", modal: "customModal" }}
        closeIcon={
          <Link to={`/my-account/${userId}`}>
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
        <h1 className="text-white text-center">Compte modifié !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Votre compte a bien été modifié.
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
            Une erreur s'est produite lors de la modification du compte.
          </p>
        </div>
      </Modal>
    </div>
  );
}
