"use client";

import { AuthContext } from "@/context/AuthProvider";
import { MateriaContext } from "@/context/MateriaContext";
import { use, useContext, useEffect, useRef, useState } from "react";
import CardItem from "./CardItem";

export default function GridMaterias() {
  const { paginatedList, hasMore, isLoading, lastItemRef, setIsMounted,cleanState } =
    useContext(MateriaContext);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      cleanState();
    };
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
      {hasMore && <div ref={lastItemRef}></div>}

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}
