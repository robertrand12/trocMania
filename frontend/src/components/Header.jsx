import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function Header() {
  const [userInfo, setUserInfo] = useState();
  const { userId } = useUserContext();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserInfo(data);
      });
  }, [userId]);

  return (
    <section className="mb-8">
      <ul className="flex justify-between mx-5 mt-3 items-center">
        <li>
          <Link to="/">
            <h1 className="text-4xl text-orange-600">Troc-Mania</h1>
          </Link>
        </li>
        <li>
          <Link to="/deposer-une-annonce">
            <button
              type="button"
              className="flex items-center bg-orange-600 hover:bg-orange-500 duration-300 px-4 rounded-xl py-2"
            >
              <svg
                className="fill-white"
                xmlns="http://www.w3.org/2000/svg"
                height="36"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M450-280h60v-170h170v-60H510v-170h-60v170H280v60h170v170ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z" />
              </svg>
              <h3 className="text-white pl-2">Déposer une annonce</h3>
            </button>
          </Link>
        </li>
        <li>
          <ul className="flex justify-between">
            <li className="mx-2">
              <Link to="/mes-annonces">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36"
                  viewBox="0 -960 960 960"
                  width="36"
                  className="mx-auto"
                >
                  <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-503H180v503Z" />
                </svg>
                <p className="text-center">Mes annonces postées</p>
              </Link>
            </li>
            <li className="mx-2">
              <Link to="/mes-favoris">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36"
                  viewBox="0 -960 960 960"
                  width="36"
                  className="mx-auto"
                >
                  <path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z" />
                </svg>
                <p className="text-center">Mes favoris</p>
              </Link>
            </li>

            {!userId ? (
              <li className="mx-2">
                <Link to="/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="36"
                    viewBox="0 -960 960 960"
                    width="36"
                    className="mx-auto"
                  >
                    <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
                  </svg>
                  <p className="text-center">Me connecter</p>
                </Link>
              </li>
            ) : (
              <li className="mx-2">
                <Link to={`/mon-compte/${userId}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="36"
                    viewBox="0 -960 960 960"
                    width="36"
                    className="mx-auto"
                  >
                    <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z" />
                  </svg>
                  <p className="text-center">{userInfo.firstname}</p>
                </Link>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </section>
  );
}
