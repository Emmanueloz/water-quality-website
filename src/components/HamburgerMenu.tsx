"use client";
import { useState } from "react"; // import state

export default function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="relative">
      {/* Botón para abrir/cerrar el menú (oculto en pantallas md o más grandes) */}
      <button
        className="space-y-2 md:hidden z-50"
        onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
      >
        <span className="block h-0.5 w-8 bg-gray-600 transition-transform duration-300"></span>
        <span className="block h-0.5 w-8 bg-gray-600 transition-transform duration-300"></span>
        <span className="block h-0.5 w-8 bg-gray-600 transition-transform duration-300"></span>
      </button>

      {/* Menú lateral (comportamiento adaptable según el tamaño de pantalla) */}
      <aside
        className={`md:static md:w-auto md:flex md:translate-x-0 md:shadow-none 
        fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-50 shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 md:hidden"
          onClick={() => setIsNavOpen(false)}
        >
          ✕
        </button>
        <ul>
          <li>
            <a
              href="#"
              className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200 md:bg-transparent"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-200 rounded md:bg-transparent"
            >
              Configuración
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-gray-200 rounded md:bg-transparent"
            >
              Ayuda
            </a>
          </li>
        </ul>
      </aside>

      {/* Fondo oscuro detrás del menú (solo para pantallas pequeñas) */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
    </div>
  );
}
