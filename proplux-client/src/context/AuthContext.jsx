import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let savedUser = null;
  try {
    const raw = localStorage.getItem("user");
    savedUser = raw && raw !== "undefined" ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Invalid JSON in localStorage 'user'", err);
    localStorage.removeItem("user");
  }

  const [user, setUser] = useState(savedUser);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
