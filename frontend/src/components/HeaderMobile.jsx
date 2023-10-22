import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function HeaderMobile() {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const { userId } = useUserContext();

  const handleVisibleMenu = () => {
    return setIsVisibleMenu(!isVisibleMenu);
  };

  return (
    <header
      className={`${
        isVisibleMenu ? " h-56" : " h-16"
      } duration-700 mb-8 bg-gray-100 md:hidden`}
    >
      <div className="flex justify-between gap-4 mx-4 mb-4 pt-4">
        <Link to="/">
          <h1 className="text-4xl text-orange-600 z-10">Troc-Mania</h1>
        </Link>
        <div className="z-30">
          <button
            type="button"
            className="w-7 h-7 py-5"
            onTouchEnd={handleVisibleMenu}
            onClick={handleVisibleMenu}
          >
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className="toggle">
              <div className="bar bar--top" />
              <div className="bar bar--middle" />
              <div className="bar bar--bottom" />
            </label>
          </button>
        </div>
      </div>
      <ul
        className={`flex flex-col justify-evenly items-center mt-4 relative duration-700 ease-in-out w-full rounded-b-lg bg-gray-100 z-30 ${
          isVisibleMenu ? "top-0 opacity-95 h-40" : "-top-56 h-0"
        }  `}
      >
        <NavLink
          to="/"
          onTouchEnd={handleVisibleMenu}
          onClick={handleVisibleMenu}
          className={({ isActive }) =>
            isActive ? "text-black" : "text-black/40"
          }
        >
          <li>Accueil</li>
        </NavLink>
        <div className="border-t-[0.5px] w-6/12 border-white" />
        <NavLink
          to="/ads/create"
          onTouchEnd={handleVisibleMenu}
          onClick={handleVisibleMenu}
          className={({ isActive }) =>
            isActive ? "text-black" : "text-black/40"
          }
        >
          <li>Déposer une annonce</li>
        </NavLink>
        <div className="border-t-[0.5px] w-6/12 border-white" />
        <NavLink
          to="/my-ads"
          onTouchEnd={handleVisibleMenu}
          onClick={handleVisibleMenu}
          className={({ isActive }) =>
            isActive ? "text-black" : "text-black/40"
          }
        >
          <li>Mes annonces postées</li>
        </NavLink>
        <div className="border-t-[0.5px] w-6/12 border-white" />
        <NavLink
          to="/validate-ads"
          onTouchEnd={handleVisibleMenu}
          onClick={handleVisibleMenu}
          className={({ isActive }) =>
            isActive ? "text-black" : "text-black/40"
          }
        >
          <li>Annonces en attente de validation</li>
        </NavLink>
        <div className="border-t-[0.5px] w-6/12 border-white" />
        <NavLink
          to="/my-favorite-ads"
          onTouchEnd={handleVisibleMenu}
          onClick={handleVisibleMenu}
          className={({ isActive }) =>
            isActive ? "text-black" : "text-black/40"
          }
        >
          <li>Mes favoris</li>
        </NavLink>
        <div className="border-t-[0.5px] w-6/12 border-white" />
        {userId ? (
          <NavLink
            to={`/my-account/${userId}`}
            onTouchEnd={handleVisibleMenu}
            onClick={handleVisibleMenu}
            className={({ isActive }) =>
              isActive ? "text-black" : "text-black/40"
            }
          >
            <li>Mon compte</li>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            onTouchEnd={handleVisibleMenu}
            onClick={handleVisibleMenu}
            className={({ isActive }) =>
              isActive ? "text-black" : "text-black/40"
            }
          >
            <li>Me connecter</li>
          </NavLink>
        )}
      </ul>
    </header>
  );
}
