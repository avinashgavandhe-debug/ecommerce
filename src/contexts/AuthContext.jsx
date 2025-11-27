import React, { createContext, useContext, useState, useEffect } from "react";

// Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      }
      return { success: false, message: "Registration failed" };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (response.ok) {
        // Merge updated data with existing user data
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true, data: updatedUser };
      }
      return { success: false, message: "Update failed" };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register,updateUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
