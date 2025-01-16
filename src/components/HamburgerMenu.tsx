"use client";
import { useState } from "react"; // import state

export default function HamburgerMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="relative md:bg-gray-50">
      <button
        className="absolute top-5 left-4 md:hidden z-50 "
        onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#4b5563"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </button>

      <aside
        className={`md:static md:w-40 lg:w-60 md:flex bg-gray-50 md:translate-x-0 md:shadow-none 
        fixed top-0 left-0 h-full md:h-auto w-3/4 max-w-xs  shadow-lg transform transition-transform duration-500 ease-in-out z-50 md:z-auto ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="md:hidden h-16 py-4 px-4 flex justify-end items-center bg-cyan-500">
          <button
            className="text-gray-600 text-2xl"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#4b5563"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <ul className="p-4 space-y-2">{children}</ul>
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
