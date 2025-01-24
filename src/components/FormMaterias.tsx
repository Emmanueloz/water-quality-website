"use client";

import { useEffect, useState } from "react";
import { IUnidades } from "@/tipos/unidades";
import { IMateria } from "@/tipos/materia";

export default function FormMaterias({ id_usuario }: { id_usuario: number }) {
  console.log(id_usuario);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);

    const data: IMateria = {
      nombre: formData.get("nombre") as string,
      maestro: formData.get("maestro") as string,
      unidades: listUnidades,
      id_usuario,
    };

    console.log(data);
  };

  const idGenerate = () => Math.floor(Math.random() * 1000);

  const [listUnidades, setListUnidades] = useState([
    {
      id: idGenerate(),
      nombre: "",
      horas_totales: 10,
      id_materia: 1,
    },
  ] as IUnidades[]);

  const handleAddUnidad = () => {
    setListUnidades([
      ...listUnidades,
      {
        id: idGenerate(),
        nombre: "",
        horas_totales: 10,
        id_materia: 1,
      },
    ]);
  };

  const handleRemoveUnidad = (id: number) => {
    if (listUnidades.length === 1) {
      return;
    }

    setListUnidades(listUnidades.filter((u) => u.id !== id));
  };

  const handleNameUnidad = (id: number, value: string) => {
    setListUnidades(
      listUnidades.map((u) => {
        if (u.id === id) {
          return { ...u, nombre: value };
        }
        return u;
      })
    );
  };

  const handleHorasUnidad = (id: number, value: number) => {
    setListUnidades(
      listUnidades.map((u) => {
        if (u.id === id) {
          return { ...u, horas_totales: value };
        }
        return u;
      })
    );
  };

  useEffect(() => {
    console.log(listUnidades);
  }, [listUnidades]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="nombre">
          <span>Nombre</span>
          <input type="text" name="nombre" id="nombre" />
        </label>
        <label htmlFor="maestro">
          <span>Maestro</span>
          <input type="text" name="maestro" id="maestro" />
        </label>
        <label htmlFor="unidades">
          <span>Unidades</span>
          <button type="button" onClick={handleAddUnidad}>
            Agregar Unidad
          </button>

          {listUnidades.map((u, i) => (
            <div key={i}>
              <input
                type="text"
                name="unidades"
                id="unidades"
                placeholder="Nombre de la unidad"
                value={u.nombre}
                onChange={(e) => handleNameUnidad(u.id ?? i, e.target.value)}
              />
              <input
                type="number"
                name="horas_totales"
                id="horas_totales"
                placeholder="Horas de la unidad"
                value={u.horas_totales}
                onChange={(e) =>
                  handleHorasUnidad(u.id ?? i, parseInt(e.target.value))
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveUnidad(u.id ?? i)}
                className={`${
                  listUnidades.length === 1
                    ? "disabled pointer-events-none text-red-400"
                    : ""
                } text-red-600`}
              >
                Eliminar Unidad
              </button>
            </div>
          ))}
        </label>
        <button type="submit">Agregar</button>
      </form>
    </main>
  );
}
