"use client";

import { IMateria } from "@/tipos/materia";
import { ButtonDialog } from "./ButtonDialog";

function ButtonDeleteMateria({ materia }: { materia: IMateria }) {
  const handledDelete = () => {
    console.log(`Eliminar ${materia.id}`);
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
