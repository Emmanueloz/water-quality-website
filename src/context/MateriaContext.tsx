"use client";
import {
  getMaterias,
  addMateria,
  deleteMateria,
  updateMateria,
  updateUnidades,
  searchMateria,
} from "@/app/materias/actions";
import { createContext, useState } from "react";

const MateriaContext = createContext(
  {} as {
    listMaterias: IMateria[];
    listSearchMaterias: IMateria[];
    hasMore: boolean;
    setHasMore: (hasMore: boolean) => void;
    getListMaterias: (id_usuario: number) => Promise<void>;
    getListSearchMaterias: (search: ISearchMateria) => Promise<void>;
    createMateria: (materia: IMateria) => Promise<void>;
    delMateria: (materia: IMateria) => Promise<void>;
    editMateria: (
      materia: IMateria,
      oldMateria: IMateria,
      isEditUnidades: boolean
    ) => Promise<void>;
  }
);

const MateriaProvider = ({ children }: { children: any }) => {
  const [listMaterias, setListMaterias] = useState([] as IMateria[]);
  const [hasMore, setHasMore] = useState(true);

  const [listSearchMaterias, setListSearchMaterias] = useState(
    [] as IMateria[]
  );

  const getListMaterias = async (id_usuario: number) => {
    const materias = await getMaterias(id_usuario);
    setListMaterias(materias);
  };

  const getListSearchMaterias = async (search: ISearchMateria) => {
    const materias = await searchMateria(search);
    setListSearchMaterias(materias);
  };

  const createMateria = async (materia: IMateria) => {
    await addMateria(materia);
    getListMaterias(materia.id_usuario);
    setHasMore(true);
  };

  const delMateria = async (materia: IMateria) => {
    await deleteMateria(materia);
    getListMaterias(materia.id_usuario);
  };

  const editMateria = async (
    materia: IMateria,
    oldMateria: IMateria,
    isEditUnidades: boolean
  ) => {
    await updateMateria(materia);
    if (isEditUnidades) {
      console.log("Editar Materias");
      await updateUnidades(materia, oldMateria);
    }
    getListMaterias(materia.id_usuario);
  };

  return (
    <MateriaContext.Provider
      value={{
        listMaterias,
        listSearchMaterias,
        hasMore,
        setHasMore,
        getListMaterias,
        createMateria,
        delMateria,
        editMateria,
        getListSearchMaterias,
      }}
    >
      {children}
    </MateriaContext.Provider>
  );
};

export { MateriaProvider, MateriaContext };
