"use client";

import { ButtonDialog } from "./ButtonDialog";
import { MateriaContext } from "@/context/MateriaContext";
import { redirect } from "next/navigation";
import { useContext } from "react";

function ButtonDeleteMateria({ materia }: { materia: IMateria }) {
  const { delMateria } = useContext(MateriaContext);
  const handledDelete = async () => {
    console.log(`Eliminar ${materia.id}`);
    await delMateria(materia);
    redirect("/materias/");
  };

  return (
    <ButtonDialog
      title="Estas seguro de eliminar"
      label="Eliminar"
      message={`La materia ${materia.nombre} sera eliminado de forma permanente. ¿Estas seguro de eliminarlo?`}
      accentColor="red-500"
      handleAccept={handledDelete}
    />
  );
}

export { ButtonDeleteMateria };
