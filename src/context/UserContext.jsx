import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    const storedToken = localStorage.getItem("authToken");
    if (user && storedToken) {
      setAuthUser(user);
      setIsAuthenticated(true);
      setValidUser(true);
      setToken(storedToken);
    }
  }, []);

  const login = (user, jwtToken) => {
    setAuthUser(user);
    setIsAuthenticated(true);
    setValidUser(true);
    setToken(jwtToken);
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", jwtToken);
  };

  const logout = () => {
    setAuthUser(null);
    setIsAuthenticated(false);
    setValidUser(false);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ authUser, isAuthenticated, validUser, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
