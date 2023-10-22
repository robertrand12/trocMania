/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();

export default UserContext;

const UserContextProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const userMemo = useMemo(() => ({
    userId,
    setUserId,
    role,
    setRole,
  }));

  useEffect(() => {
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
        setRole(data.role);
        setUserId(data.id);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <UserContext.Provider value={userMemo}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
