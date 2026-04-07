import React, { createContext, useState, useContext } from "react";
import { authAPI } from "../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("veltorn_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("veltorn_user", JSON.stringify(userData));
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authAPI.login({ email, password });
      localStorage.setItem("veltorn_token", data.token);
      saveUser(data.user);
      return { success: true, role: data.user.role };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await authAPI.register({ name, email, password });
      localStorage.setItem("veltorn_token", data.token);
      saveUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("veltorn_token");
    localStorage.removeItem("veltorn_user");
    setUser(null);
  };

  // Update profile — saves to backend AND local state
  const updateProfile = async (profileData) => {
    try {
      const data = await authAPI.updateProfile(profileData);
      saveUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Refresh user from backend
  const refreshUser = async () => {
    try {
      const data = await authAPI.getMe();
      if (data.user) saveUser(data.user);
    } catch {
      // Token expired
      logout();
    }
  };

  const isAdmin = user?.role === "admin";
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, loading,
      isAdmin, isLoggedIn, updateProfile, refreshUser, saveUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);