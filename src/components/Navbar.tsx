"use client";

import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated }: any = useContext(AuthContext);

  // Verificar la sesión al cargar la página
  const checkSession = async () => {
    try {
      const response = await fetch("/api/session");
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error("Error verificando la sesión:", error);
      setIsAuthenticated(false);
    }
  };

  // Llamar a la función de cierre de sesión
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Sesión cerrada exitosamente");
        setIsAuthenticated(false); // Actualizar estado local
        window.location.href = "/"; // Redirigir si es necesario
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
    checkSession(); // Verificar la sesión al cargar el componente
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
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold  px-2 rounded"
            >
              Cerrar Sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
