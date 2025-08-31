import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [validUser, setValidUser] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) {
      setAuthUser(user);
      setIsAuthenticated(true);
      setValidUser(true);
    }
  }, []);

  const login = (user) => {
    setAuthUser(user);
    setIsAuthenticated(true);
    setValidUser(true);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const logout = () => {
    setAuthUser(null);
    setIsAuthenticated(false);
    setValidUser(false);
    localStorage.removeItem("authUser");
  };

  return (
    <UserContext.Provider value={{ authUser, isAuthenticated, validUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
