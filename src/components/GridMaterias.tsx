"use client";

import { AuthContext } from "@/context/AuthProvider";
import { MateriaContext } from "@/context/MateriaContext";
import { useContext, useEffect } from "react";
import CardItem from "./CardItem";
import { redirect } from "next/navigation";
import { isHavePermission } from "@/utils/isHavePermission";

export default function GridMaterias() {
  const {
    paginatedList,
    hasMore,
    isLoading,
    lastItemRef,
    setIsMounted,
    cleanState,
    delMateria,
  } = useContext(MateriaContext);

  const { userProfile } = useContext(AuthContext);

  const isUpdatePermission = isHavePermission(1, "update", userProfile);
  const isDeletePermission = isHavePermission(1, "delete", userProfile);

  const handledDelete = async (materia: IMateria) => {
    if (global.confirm("¿Estas seguro de eliminar?")) {
      await delMateria(materia);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    return () => {
      cleanState();
    };
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4 lg:max-h-[500px] overflow-y-auto border border-1">
      {paginatedList.map((materia) => (
        <CardItem
          key={materia.id}
          nameModule="materias"
          id={materia.id ?? 0}
          title={materia.nombre}
          subtitle={materia.maestro}
          handleDelete={
            isDeletePermission ? () => handledDelete(materia) : undefined
          }
          openModal={
            isUpdatePermission
              ? () => {
                  redirect(`/materias/${materia.id}`);
                }
              : undefined
          }
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
