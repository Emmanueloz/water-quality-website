"use client";
import { useState } from "react"; // import state

export default function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <aside className="md:w-1/4 bg-gray-50 p-4 border-r">
      <button
        className="space-y-2 md:hidden"
        onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
      >
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      </button>
      <ul className="space-y-2 hidden md:block">
        <li>
          <a
            href="#"
            className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded">
            Configuración
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded">
            Ayuda
          </a>
        </li>
      </ul>
    </aside>
  );
}
