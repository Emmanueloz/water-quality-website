"use client";
import { MateriaContext } from "@/context/MateriaContext";
import Link from "next/link";
import { useContext } from "react";

export default function TableMateria({ id_usuario }: { id_usuario: number }) {
  const { listMaterias } = useContext(MateriaContext);

  const classNames = {
    th: "p-4 text-sm font-normal leading-none text-slate-500 text-left",
    td: "p-4 py-5 border-b border-slate-200",
  };

  return (
    <div className="max-h-96 overflow-y-auto border rounded-md">
      <table className="items-center bg-transparent w-full border-collapse table-fixed">
        <thead className="border-b border-slate-300 bg-slate-50">
          <tr>
            <th className={classNames.th}>Nombre</th>
            <th className={classNames.th}>Maestro</th>
            <th className={classNames.th}>Acciones</th>
          </tr>
        </thead>
        <tbody className="max-h-16 overflow-auto">
          {listMaterias.length === 0 && (
            <tr>
              <td colSpan={3}>No hay materias</td>
            </tr>
          )}

          {listMaterias.map((materia) => (
            <tr key={materia.id} className="hover:bg-slate-50">
              <td className={classNames.td}>{materia.nombre}</td>
              <td className={classNames.td}>{materia.maestro}</td>
              <td className={classNames.td}>
                <Link href={`/materias/${materia.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                  </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
