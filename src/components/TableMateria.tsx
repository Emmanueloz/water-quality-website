"use client";
import { MateriaContext } from "@/context/MateriaContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function TableMateria({ id_usuario }: { id_usuario: number }) {
  const { getListMaterias, listMaterias } = useContext(MateriaContext);

  useEffect(() => {
    getListMaterias(id_usuario);
  }, [id_usuario]);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Maestro</th>
          <th>Acciones</th>
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
            <td>{materia.nombre}</td>
            <td>{materia.maestro}</td>
            <td>
              <Link href={`/materias/${materia.id}`}>Detalles</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
