"use client";

import { useContext, useEffect, useState } from "react";

import { MateriaContext } from "@/context/MateriaContext";
import { idGenerate } from "@/utils/idGenerate";
import { MateriaValidator } from "@/utils/materiasValidator";
import { redirect } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";

export default function FormMaterias({
  id_usuario,
  materia,
  onCloseModal,
}: {
  id_usuario: number;
  materia?: IMateria | null;
  onCloseModal?: () => void;
}) {
  const { createMateria, editMateria } = useContext(MateriaContext);
  const { userProfile } = useContext(AuthContext);

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

    const data = {
      id: materiaForm.id,
      nombre: materiaForm.nombre,
      maestro: materiaForm.maestro,
      id_usuario: materiaForm.id_usuario,
      unidades: listUnidades,
    };

    const isError = formValidate(data);

    console.log(isError);

    if (isError) {
      return;
    }

    console.log(data);
    if (materia) {
      console.log("editar");
      await editMateria(data, materia, isEditUnidades);
      redirect(`/materias/${data.id}`);
    } else {
      console.log("crear");

      await createMateria(data);
      handleFormReset();
      onCloseModal?.();
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
    setMateriaForm({
      id: materiaForm.id ?? 0,
      nombre: "",
      maestro: "",
      id_usuario: id_usuario,
      unidades: [],
    });

    if (isEditUnidades || !materia) {
      setListUnidades([
        {
          id: idGenerate(),
          nombre: "",
          horas_totales: 10,
          id_materia: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    if (materia === undefined) {
      setIsEditUnidades(true);
    } else {
      setListUnidades(materia?.unidades || []);
    }
  }, [isEditUnidades]);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

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
        <div className="flex flex-col">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Unidades</span>
            <button
              className="p-1 bg-cyan-400 w-10 text-white rounded-lg"
              type="button"
              onClick={handleAddUnidad}
            >
              +
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-cyan-400">
              <thead>
                <tr>
                  <th className="border border-cyan-400 p-2 text-left">
                    Nombre
                  </th>
                  <th className="border border-cyan-400 p-2 text-left">
                    Horas Totales
                  </th>
                  <th className="border border-cyan-400 p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listUnidades.map((u, i) => (
                  <tr key={i} className="border border-cyan-400">
                    <td className="border border-cyan-400 p-2">
                      <input
                        type="text"
                        name="unidades"
                        placeholder="Nombre de la unidad"
                        value={u.nombre}
                        maxLength={80}
                        className="w-full border border-cyan-400 rounded-lg p-1 outline-none"
                        onChange={(e) =>
                          handleNameUnidad(u.id ?? i, e.target.value)
                        }
                      />
                      {formError.unidades[i] && (
                        <span className="text-red-500 text-sm block mt-1">
                          {formError.unidades[i]}
                        </span>
                      )}
                    </td>
                    <td className="border border-cyan-400 p-2">
                      <input
                        type="number"
                        name="horas_totales"
                        placeholder="Horas de la unidad"
                        value={u.horas_totales}
                        min={1}
                        className="w-full border border-cyan-400 rounded-lg p-1 outline-none"
                        onChange={(e) =>
                          handleHorasUnidad(u.id ?? i, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td className="border border-cyan-400 p-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveUnidad(u.id ?? i)}
                        className={`p-1 w-10 text-white rounded-lg ${
                          listUnidades.length === 1
                            ? "bg-red-200 cursor-not-allowed"
                            : "bg-red-600"
                        }`}
                        disabled={listUnidades.length === 1}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isEditUnidades && (
        <div className="flex flex-col">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Unidades</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-cyan-400">
              <thead>
                <tr className="border border-cyan-400">
                  <th className="border border-cyan-400 p-2 text-left">
                    Nombre
                  </th>
                  <th className="border border-cyan-400 p-2 text-left">
                    Horas Totales
                  </th>
                </tr>
              </thead>
              <tbody>
                {listUnidades.map((u, i) => (
                  <tr key={i} className="border border-cyan-400">
                    <td className="border border-cyan-400 p-2">{u.nombre}</td>
                    <td className="border border-cyan-400 p-2">
                      {u.horas_totales}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex  gap-4">
        <button
          className="p-2 rounded-lg bg-gray-400 hover:bg-gray-300 "
          type="button"
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
