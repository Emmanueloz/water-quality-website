"use client";

import { useContext, useEffect, useState } from "react";

import { MateriaContext } from "@/context/MateriaContext";
import { idGenerate } from "@/utils/idGenerate";
import { MateriaValidator } from "@/utils/materiasValidator";
import { date } from "zod";

export default function FormMaterias({
  id_usuario,
  materia,
}: {
  id_usuario: number;
  materia?: IMateria | null;
}) {
  const { createMateria } = useContext(MateriaContext);

  const [materiaForm, setMateriaForm] = useState<IMateria>(
    materia ?? {
      id: 0,
      nombre: "",
      maestro: "",
      id_usuario,
    }
  );

  const [isEditUnidades, setIsEditUnidades] = useState(false);

  const [listUnidades, setListUnidades] = useState([
    {
      id: idGenerate(),
      nombre: "",
      horas_totales: 10,
      id_materia: 1,
    },
  ] as IUnidades[]);

  const [formError, setFormError] = useState({
    nombre: "",
    maestro: "",
    unidades: [],
  } as {
    nombre: string;
    maestro: string;
    unidades: string[];
  });

  const formValidate = (data: IMateria) => {
    const materiaValidator = new MateriaValidator(data);

    console.log(materiaValidator.validate());

    setFormError({
      nombre: materiaValidator.getNameError(),
      maestro: materiaValidator.getTeacherError(),
      unidades: materiaValidator.getUnitsError(),
    });

    return materiaValidator.validate();
  };

  const handledNameMateria = (value: string) => {
    setMateriaForm({
      id: materiaForm.id,
      nombre: value,
      maestro: materiaForm.maestro,
      id_usuario: materiaForm.id_usuario,
    });
  };

  const handledMaestroMateria = (value: string) => {
    setMateriaForm({
      id: materiaForm.id,
      nombre: materiaForm.nombre,
      maestro: value,
      id_usuario: materiaForm.id_usuario,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IMateria = {
      nombre: materiaForm.nombre,
      maestro: materiaForm.maestro,
      unidades: listUnidades,
      id_usuario,
    };

    const isError = formValidate(data);

    console.log(isError);

    if (isError) {
      return;
    }

    if (materia) {
    } else {
      await createMateria(data);
    }
  };

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

  const handleFormReset = () => {
    setListUnidades([
      {
        id: idGenerate(),
        nombre: "",
        horas_totales: 10,
        id_materia: 1,
      },
    ]);
  };

  useEffect(() => {
    if (materia === undefined) {
      setIsEditUnidades(true);
    } else {
      setListUnidades(materia?.unidades || []);
    }
  }, []);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="nombre" className="flex flex-col ">
        <span className="font-semibold">Nombre</span>
        <input
          className="border-cyan-400 border rounded-lg p-1 outline-none"
          type="text"
          name="nombre"
          id="nombre"
          maxLength={80}
          value={materiaForm.nombre}
          onChange={(e) => handledNameMateria(e.target.value)}
        />
        {formError.nombre && (
          <span className="text-red-500 text-sm">{formError.nombre}</span>
        )}
      </label>
      <label htmlFor="maestro" className="flex flex-col ">
        <span className="font-semibold">Maestro</span>
        <input
          className="border-cyan-400 border rounded-lg p-1 outline-none"
          type="text"
          name="maestro"
          id="maestro"
          maxLength={80}
          value={materiaForm.maestro}
          onChange={(e) => handledMaestroMateria(e.target.value)}
        />
        {formError.maestro && (
          <span className="text-red-500 text-sm">{formError.maestro}</span>
        )}
      </label>

      {materia && (
        <label htmlFor="editUnidades" className="">
          <input
            type="checkbox"
            name="editUnidades"
            id="editUnidades"
            onChange={(e) => setIsEditUnidades(!isEditUnidades)}
          />
          <span>Editar unidades</span>
        </label>
      )}

      {isEditUnidades && (
        <label htmlFor="unidades" className="flex flex-col ">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Unidades</span>
            <button
              className="p-1 bg-cyan-400 w-10 text-white rounded-lg"
              type="button"
              onClick={handleAddUnidad}
            >
              +
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {listUnidades.map((u, i) => (
              <li key={i}>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="unidades"
                    id="unidades"
                    placeholder="Nombre de la unidad"
                    value={u.nombre}
                    maxLength={80}
                    className="border-cyan-400 border rounded-lg p-1 outline-none flex-grow "
                    onChange={(e) =>
                      handleNameUnidad(u.id ?? i, e.target.value)
                    }
                  />
                  <input
                    type="number"
                    name="horas_totales"
                    id="horas_totales"
                    placeholder="Horas de la unidad"
                    value={u.horas_totales}
                    min={1}
                    className="border-cyan-400 border rounded-lg p-1 outline-none w-20"
                    onChange={(e) =>
                      handleHorasUnidad(u.id ?? i, parseInt(e.target.value))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveUnidad(u.id ?? i)}
                    className={`${
                      listUnidades.length === 1
                        ? "disabled pointer-events-none  bg-red-200 "
                        : "bg-red-600"
                    }  p-1 w-10 text-white rounded-lg`}
                  >
                    -
                  </button>
                </div>
                {formError.unidades[i] && (
                  <span className="text-red-500 text-sm">
                    {formError.unidades[i]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </label>
      )}

      <div className="flex  gap-4">
        <button
          className="p-2 rounded-lg bg-gray-400 hover:bg-gray-300 "
          type="reset"
          onClick={handleFormReset}
        >
          Limpiar
        </button>
        <button
          className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-300"
          type="submit"
        >
          {materia ? "Editar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
