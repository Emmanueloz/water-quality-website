"use client";
import { getMaterias, addMateria } from "@/app/materias/actions";
import { createContext, useState } from "react";

const MateriaContext = createContext(
  {} as {
    listMaterias: IMateria[];
    getListMaterias: (id_usuario: number) => Promise<void>;
    createMateria: (materia: IMateria) => Promise<void>;
  }
);

const MateriaProvider = ({ children }: { children: any }) => {
  const [listMaterias, setListMaterias] = useState([] as IMateria[]);

  const getListMaterias = async (id_usuario: number) => {
    const materias = await getMaterias(id_usuario);
    setListMaterias(materias);
  };

  const createMateria = async (materia: IMateria) => {
    const newMateria = await addMateria(materia);
    getListMaterias(materia.id_usuario);
  };

  return (
    <MateriaContext.Provider
      value={{ listMaterias, getListMaterias, createMateria }}
    >
      {children}
    </MateriaContext.Provider>
  );
};

export { MateriaProvider, MateriaContext };
