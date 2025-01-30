"use client";
import { createContext, useState, ReactNode } from "react";
import { Project, Game } from "@/tipos/tipos";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile | null) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userProfile: null,
  setUserProfile: () => {},
  projects: [],
  setProjects: () => {},
  games: [],
  setGames: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [games, setGames] = useState<Game[]>([]);


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
        projects,
        setProjects,
        games,
        setGames,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
