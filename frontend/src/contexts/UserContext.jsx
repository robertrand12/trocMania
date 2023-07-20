import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const UserContext = createContext();

export default UserContext;

const UserContextProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const userMemo = useMemo(() => ({
    userId,
    setUserId,
  }));

  useEffect(() => {
    if (
      location.pathname !== "/" ||
      location.pathname !== "/login" ||
      location.pathname !== "/creer-compte"
    ) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/refresh-token`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          navigate(location.pathname);
          setUserId(data.id);
        })
        .catch((err) => {
          console.error(err);
          alert("Error to login please try again !");
        });
    }
  }, []);

  return (
    <UserContext.Provider value={userMemo}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = { children: PropTypes.elementType.isRequired };

export { UserContextProvider, useUserContext };
