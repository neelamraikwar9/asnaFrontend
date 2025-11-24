import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function Authprovider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // const login = (newToken) => {
  //   setToken(newToken);
  //   localStorage.setItem("token", newToken);
  // };

  // const logout = () => {
  //   setToken(null);
  //   localStorage.removeItem("token");
  // };


  const login = (t) => { setToken(t); localStorage.setItem('token', t); };
  const logout = () => { setToken(null); localStorage.removeItem('token'); };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
