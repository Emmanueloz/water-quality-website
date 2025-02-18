"use client";

import { AuthContext } from "@/context/AuthProvider";
import { MateriaContext } from "@/context/MateriaContext";
import { useContext, useEffect } from "react";
import CardItem from "./CardItem";

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
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:max-h-[500px] overflow-y-auto border border-1">
      {paginatedList.map((materia) => (
        <CardItem
          
          key={materia.id}
          nameModule="materias"
          id={materia.id ?? 0}
          title={materia.nombre}
          subtitle={materia.maestro}
        />
      ))}
    </div>
  );
}
