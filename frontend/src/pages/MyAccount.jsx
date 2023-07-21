import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function MyAccount() {
  const navigate = useNavigate();
  const { userId, setUserId } = useUserContext();
  const [userInfo, setUserInfo] = useState();

  const logout = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/logout`, {
      credentials: "include",
    })
      .then(() => {
        setUserId("");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        // eslint-disable-next-line no-alert
        alert("Erreur dans la création du compte, veuillez Essayer à nouveau");
      });
  };

  const deleteAccount = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        setUserId("");
        navigate("/");
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

  if (!userInfo) {
    return <p>en cours de chargement</p>;
  }

  return (
    <section className=" justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-9/12 p-3 mx-auto rounded-lg my-8">
      <figure className="flex flex-col">
        <h1 className="text-center mb-5 text-2xl">
          {userInfo.firstname} {userInfo.lastname}
        </h1>
        <div className="flex gap-5 justify-between mb-5 mx-auto">
          <div>
            <p>{userInfo.nickname}</p>
            <p>{userInfo.email}</p>
            <div className=" font-bold">
              <p>{userInfo.address}</p>
              <p>
                {userInfo.zip_code} {userInfo.city}
              </p>
            </div>
          </div>
        </div>
      </figure>
      <div className="flex justify-center gap-4">
        <Link to={`/mon-compte/${userId}/edit`}>
          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10"
            >
              <p className="px-6 py-2 text-center">Modifier mon Compte</p>
            </button>
          </div>
        </Link>

        <div className="flex justify-center">
          <button
            type="submit"
            className="font-bold bg-red-400 text-white mt-8 rounded-md w-60 h-10"
            onClick={deleteAccount}
          >
            <p className="px-6 py-2 text-center">Supprimer mon Compte</p>
          </button>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-bold bg-green-400 text-white mt-8 rounded-md w-60 h-10"
            onClick={logout}
          >
            <p className="px-6 py-2 text-center">Me déconnecter</p>
          </button>
        </div>
      </div>
    </section>
  );
}
