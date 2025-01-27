"use client";
import { MateriaContext } from "@/context/MateriaContext";
import Link from "next/link";
import { useContext } from "react";

export default function TableMateria({ id_usuario }: { id_usuario: number }) {
  const { listMaterias } = useContext(MateriaContext);

  const classNames = {
    table: "items-center bg-transparent w-full border-collapse table-fixed",
    th: "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 uppercase border-l-0 border-r-0 whitespace-nowrap  text-left",
    td: "border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left text-blueGray-700 ",
  };

  return (
    <table className={classNames.table}>
      <thead>
        <tr>
          <th className={classNames.th}>Nombre</th>
          <th className={classNames.th}>Maestro</th>
          <th className={classNames.th}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {listMaterias.length === 0 && (
          <tr>
            <td colSpan={3}>No hay materias</td>
          </tr>
        )}

        {listMaterias.map((materia) => (
          <tr key={materia.id}>
            <td className={classNames.td}>{materia.nombre}</td>
            <td className={classNames.td}>{materia.maestro}</td>
            <td className={classNames.td}>
              <Link href={`/materias/${materia.id}`}>Detalles</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
