"use client";
import { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
