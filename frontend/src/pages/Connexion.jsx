import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

function Connexion() {
  const { setUserId } = useUserContext();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Vous devez renseigner un email et un mot de passe!");
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          navigate("/");
          setUserId(data.id);
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur de connexion, veuillez réessayer");
        });
    }
    // Réinitialiser les valeurs du formulaire
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center shadow-md shadow-gray-600 bg-gray-100 w-6/12 pb-10 mx-auto rounded-lg mt-14">
      <div className=" mb-16 mt-16">
        <h2 className=" font-bold text-black text-2xl h-16 flex justify-center">
          Bonjour
        </h2>
        <h2 className=" text-black text-lg h-0 flex justify-center p-5">
          Connectez-vous pour découvrir toutes nos fonctionnalités
        </h2>
      </div>
      <form
        className="flex flex-col items-start"
        name="connexion"
        onSubmit={handleSubmit}
      >
        <label className="font-bold text-black text-base" htmlFor="mail">
          Adresse Email
        </label>
        <input
          className="bg-blue-100 rounded-md text-black w-60 h-12 p-2 md:w-96"
          type="text"
          name="mail"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <label
          className="font-bold text-black text-base mt-6"
          htmlFor="password"
        >
          Mot de passe
        </label>
        <div className="flex">
          <input
            className=" bg-blue-100 rounded-md text-black w-60 h-12 p-2 md:w-96"
            type={passwordIsVisible ? "text" : "password"}
            name="password"
            required
            value={password}
            onChange={handleChangePassword}
          />
          <button
            className="relative"
            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
            type="button"
          >
            {!passwordIsVisible ? (
              <svg
                className="absolute right-2 bottom-3 fill-black"
                src="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
                <path d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2 2-.916 2-2-.916-2-2-2z" />
              </svg>
            ) : (
              <svg
                className="absolute right-2 bottom-3 fill-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.073 12.194 4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z" />
              </svg>
            )}
          </button>
        </div>
        <button
          className="mx-auto font-bold bg-blue-400 text-white mt-14 rounded-md w-60 h-10"
          type="submit"
        >
          Se connecter
        </button>
        <div className="mx-auto mt-2">
          <p className=" text-sm">
            Envie de nous rejoindre ?{" "}
            <a
              href="/creer-compte"
              className="text-blue-400 hover:text-blue-500"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Connexion;
