"use client";
import { useState } from "react"; // import state
import Sidebar, { MenuItem } from "./Sidebar";

const menuItems: MenuItem[] = [
  {
    name: "Integrantes",
    subItems: [
      {
        name: "David",
        link: "/david",
      },
      {
        name: "Ángel",
        link: "/angel",
      },
      {
        name: "Raúl",
        link: "/raul",
      },
      {
        name: "Daniel",
        link: "/daniel",
      },
    ],
  },
  {
    name: "Materias",
    subItems: [
      {
        name: "Materia 1",
        link: "/materias",
      },
      {
        name: "Materia 2",
        link: "/materias",
      },
    ],
  },
  {
    name: "Juegos",
    subItems: [
      {
        name: "Halo Infinite",
        link: "/juegos",
      },
      {
        name: "Call of Duty",
        link: "/juegos",
      },
    ],
  },
  {
    name: "Proyectos",
    subItems: [
      {
        name: "Proyecto 1",
        link: "/proyectos",
      },
      {
        name: "Proyecto 2",
        link: "/proyectos",
      },
    ],
  },
];

export default function HamburgerMenu({}) {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="relative md:bg-gray-50">
      <button
        className="absolute top-5 left-4 z-50 "
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
        className={` bg-gray-50 
        fixed top-0 left-0 h-full  w-3/4 max-w-xs  shadow-lg transform transition-transform duration-500 ease-in-out z-50  ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 py-4 px-4 flex justify-end items-center bg-cyan-500">
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
        <Sidebar menuItems={menuItems} />
      </aside>

      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
    </div>
  );
}
