import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        register,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
