"use client";

import { AuthContext } from "@/context/AuthProvider";
import { MateriaContext } from "@/context/MateriaContext";
import { useContext, useEffect } from "react";

export default function GridMaterias() {
  const { userProfile } = useContext(AuthContext);
  const { paginatedList, getPaginatedList } = useContext(MateriaContext);

  useEffect(() => {
    if (userProfile) {
      console.log("Listar materias");
      getPaginatedList(1, 6, userProfile.id);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {paginatedList.map((materia) => (
        <div
          key={materia.id}
          className="rounded-lg border border-slate-300 bg-white p-4 shadow-md"
        >
          <h3 className="text-xl font-semibold">{materia.nombre}</h3>
          <p className="text-sm">{materia.maestro}</p>
        </div>
      ))}
    </div>
  );
}
