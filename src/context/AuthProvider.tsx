"use client";
import { createContext, useState, ReactNode } from "react";
import { UserProfile } from "@/tipos/tipos";

// Definir el tipo del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile | null) => void;
}

// Crear el contexto con un valor por defecto tipado
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userProfile: null,
  setUserProfile: () => {},
});

// Definir el tipo de las props del provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };