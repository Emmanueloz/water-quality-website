"use client";
import { useContext, useEffect, useState } from "react"; // import state
import Sidebar, { MenuItem } from "./Sidebar";
import { AuthContext } from "@/context/AuthProvider";
import { MateriaContext } from "@/context/MateriaContext";



export default function HamburgerMenu({}) {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
  const { isAuthenticated, projects, setProjects, userProfile } =
    useContext(AuthContext);

  const { listMaterias, getListMaterias } = useContext(MateriaContext);

  const getAllProjectsPerUser = async () => {
    const response = await fetch(`/api/proyectos?userId=${userProfile?.id}`);
    const data = await response.json();
    if (response.ok) {
      console.log("Proyectos obtenidos:", data);
      setProjects(data.data);
    } else {
      console.error("Error al obtener los proyectos:", data.message);
    }
  };

  useEffect(() => {
    if (userProfile?.id) {
      getAllProjectsPerUser();
      getListMaterias(userProfile.id);
    }
    console.log(userProfile)
  }, [userProfile]);

  const subItemsForProjects = projects.map((project) => ({
    name: project.name,
    link: `/proyectos/${project.id}`,
  }));

  const subItemsForMaterias = listMaterias.map((materia) => ({
    name: materia.nombre,
    link: `/materias/${materia.id}`,
  }));



  const menuItems = [
    {
      name: "Proyectos",
      link: "/proyectos",
      subItems: subItemsForProjects,
    },
    {
      name: "Materias",
      link: "/materias",
      subItems: subItemsForMaterias,
    },
    
  ];

  return (
    <div
      className={`relative md:static md:bg-gray-50 ${
        !isAuthenticated ? "hidden" : ""
      }`}
    >
      <button
        className="absolute top-5 left-4 z-50 md:hidden"
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
        className={`md:static md:w-60 md:translate-x-0 md:shadow-none  bg-gray-50 
        fixed top-0 left-0 h-full  w-3/4 max-w-xs  shadow-lg transform transition-transform duration-500 ease-in-out z-50  ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 py-4 px-4 flex justify-end items-center bg-cyan-500">
          <button
            className="text-gray-600 text-2xl md:hidden"
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
