"use client";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import WelcomeMessage from "./WelcomeMessage"; // Importamos el nuevo componente

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated, userProfile, setUserProfile } =
    useContext(AuthContext);

  const router = useRouter();

  const checkSession = async () => {
    try {
      const response = await fetch("/api/session");
      const data = await response.json();
      const user = data.user;
      setIsAuthenticated(data.isAuthenticated);
      setUserProfile({
        id: user?.id,
        userName: user?.userName,
        rol: user?.rol,
        exp: user?.exp,
        iat: user?.iat,
        modules: user?.modules,
        modulesPermissions: user?.modulesPermissions,
      });
    } catch (error) {
      console.error("Error verificando la sesión:", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Sesión cerrada exitosamente");
        setIsAuthenticated(false);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Error al cerrar sesión:", errorData.message);
        alert("No se pudo cerrar la sesión. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error. Inténtalo más tarde.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      checkSession();
    }
  }, []);

  return (
    <header className="bg-cyan-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold w-full text-center md:w-auto md:text-start">
          Mi Sitio
        </h1>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:underline">
            Inicio
          </a>
          <a href="#" className="hover:underline">
            Acerca de
          </a>
          <a href="#" className="hover:underline">
            Contacto
          </a>
          {isAuthenticated && <WelcomeMessage />}{" "}
          {/* Añadido el mensaje de bienvenida */}
          {isAuthenticated && <LogoutButton />}
        </nav>
      </div>
    </header>
  );
}
