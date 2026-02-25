import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const storedAdmin = localStorage.getItem("adminData");
    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (data) => {
    setAdminData(data);
    setIsLoggedIn(true);
    localStorage.setItem("adminData", JSON.stringify(data));
  };

  const logout = () => {
    setAdminData(null);
    setIsLoggedIn(false);
    localStorage.removeItem("adminData");
  };

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        adminData,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
