"use client";

import { IMateria } from "@/tipos/materia";
import { ButtonDialog } from "./ButtonDialog";
import { deleteMateria } from "@/app/materias/actions";
import { redirect } from "next/navigation";

function ButtonDeleteMateria({ materia }: { materia: IMateria }) {
  const handledDelete = async () => {
    console.log(`Eliminar ${materia.id}`);
    await deleteMateria(materia);
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
