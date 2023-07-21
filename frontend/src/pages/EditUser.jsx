import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function EditUser() {
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const [userInfo, setUserInfo] = useState();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
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
      hashedPassword: userInfo.hashedPassword,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
      method: "POST",
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
        alert("Erreur dans la création du compte, veuillez Essayer à nouveau");
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
          setUserInfo(data);
        })
        .catch((err) => {
          console.error(err);
          // eslint-disable-next-line no-alert
          alert(
            "Erreur dans la création du compte, veuillez Essayer à nouveau"
          );
        });
    }
  }, [userId]);

  return (
    <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
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

            <div className="flex gap-4">
              <div className="flex flex-col items-start">
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
            className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 mx-4"
            onClick={handleSubmit}
          >
            <p className="px-6 py-2 text-center">Modifier mon Compte</p>
          </button>
        </div>
      </form>
    </section>
  );
}
