import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { useUserContext } from "../contexts/UserContext";
import HeaderMobile from "../components/HeaderMobile";

export default function MyAccount() {
  const { userId, setUserId, setRole } = useUserContext();
  const [userInfo, setUserInfo] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openErrorLogout, setOpenErrorLogout] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [openDeleteAccountOk, setOpenDeleteAccountOk] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openLogoutOk, setOpenLogoutOk] = useState(false);

  const onOpenModalLogoutOk = () => setOpenLogoutOk(true);
  const onCloseModalLogoutOk = () => setOpenLogoutOk(false);

  const onOpenModalLogout = () => setOpenLogout(true);
  const onCloseModalLogout = () => setOpenLogout(false);

  const onOpenModalDeleteAccountOk = () => setOpenDeleteAccountOk(true);
  const onCloseModalDeleteAccountOk = () => setOpenDeleteAccountOk(false);

  const onOpenModalDeleteAccount = () => setOpenDeleteAccount(true);
  const onCloseModalDeleteAccount = () => setOpenDeleteAccount(false);

  const onOpenModalErrorLogout = () => setOpenErrorLogout(true);
  const onCloseModalErrorLogout = () => setOpenErrorLogout(false);

  const onOpenModalDelete = () => setOpenDelete(true);
  const onCloseModalDelete = () => setOpenDelete(false);

  const logout = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      credentials: "include",
    })
      .then(() => {
        setUserId("");
        setRole("");
        onOpenModalLogoutOk();
      })
      .catch((err) => {
        console.error(err);
        onOpenModalErrorLogout();
      });
  };

  const deleteAccount = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        setUserId("");
        setRole("");
        onOpenModalDeleteAccountOk();
      })
      .catch((err) => {
        console.error(err);
        onOpenModalDelete();
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
        });
    }
  }, [userId]);

  if (!userInfo) {
    return (
      <div>
        <HeaderMobile />
        <p>en cours de chargement</p>
      </div>
    );
  }

  return (
    <div>
      <HeaderMobile />
      <section className="w-11/12 justify-center items-center shadow-md shadow-gray-600 bg-gray-100 md:w-9/12 p-3 mx-auto rounded-lg my-8">
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
        <div className="md:flex justify-center flex-wrap gap-4">
          <Link to={`/my-account/${userId}/edit`}>
            <div className="flex justify-center">
              <button
                type="submit"
                className="font-bold bg-blue-400 text-white mt-8 rounded-md w-60 h-10 hover:bg-blue-500 hover:scale-105 duration-300"
              >
                <p className="px-6 py-2 text-center">Modifier mon Compte</p>
              </button>
            </div>
          </Link>

          <div className="flex justify-center">
            <button
              type="button"
              className="font-bold bg-red-400 text-white mt-8 rounded-md w-60 h-10 hover:bg-red-500 hover:scale-105 duration-300"
              onClick={onOpenModalDeleteAccount}
            >
              <p className="px-6 py-2 text-center">Supprimer mon Compte</p>
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="font-bold bg-green-400 text-white mt-8 rounded-md w-60 h-10 hover:bg-green-500 hover:scale-105 duration-300"
              onClick={onOpenModalLogout}
            >
              <p className="px-6 py-2 text-center">Me déconnecter</p>
            </button>
          </div>
        </div>
      </section>
      <Modal
        open={openDelete}
        onClose={onCloseModalDelete}
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
            Une erreur s'est produite lors de la suppression de votre compte.
          </p>
        </div>
      </Modal>
      <Modal
        open={openErrorLogout}
        onClose={onCloseModalErrorLogout}
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
            Une erreur s'est produite lors de la déconnexion du compte.
          </p>
        </div>
      </Modal>
      <Modal
        open={openDeleteAccount}
        onClose={onCloseModalDeleteAccount}
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
        <h1 className="text-white text-center">Suppression du compte !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Etes-vous sûr(e) de vouloir supprimer définitivement votre compte ?
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={deleteAccount}
            className="border-2 rounded-lg w-3/12 hover:bg-white text-white hover:text-gray-600 hover:font-bold duration-300"
          >
            oui
          </button>
          <button
            type="button"
            onClick={onCloseModalDeleteAccount}
            className="border-2 rounded-lg w-3/12 hover:bg-white text-white hover:text-gray-600 hover:font-bold duration-300"
          >
            non
          </button>
        </div>
      </Modal>
      <Modal
        open={openDeleteAccountOk}
        onClose={onCloseModalDeleteAccountOk}
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
        <h1 className="text-white text-center">Suppression du compte !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Votre compte a bien été supprimé
          </p>
          <p>A bientôt sur TrocMania</p>
        </div>
      </Modal>
      <Modal
        open={openLogout}
        onClose={onCloseModalLogout}
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
        <h1 className="text-white text-center">Déconnexion !</h1>

        <div className="flex justify-center mt-2 gap-6 ">
          <p
            className="text-white
            "
          >
            Etes-vous sûr(e) de vouloir vous déconnecter ?
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={logout}
            className="border-2 rounded-lg w-3/12 hover:bg-white text-white hover:text-gray-600 hover:font-bold duration-300"
          >
            oui
          </button>
          <button
            type="button"
            onClick={onCloseModalLogout}
            className="border-2 rounded-lg w-3/12 hover:bg-white text-white hover:text-gray-600 hover:font-bold duration-300"
          >
            non
          </button>
        </div>
      </Modal>
      <Modal
        open={openLogoutOk}
        onClose={onCloseModalLogoutOk}
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
        <div className="justify-center items-center">
          <h1 className="text-white text-center">A bientôt sur TrocMania !</h1>
        </div>
      </Modal>
    </div>
  );
}
