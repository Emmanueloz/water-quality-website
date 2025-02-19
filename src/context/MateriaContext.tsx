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

interface MateriaContextType {
  listMaterias: IMateria[];
  listSearchMaterias: IMateria[];
  paginatedList: IMateria[];
  setPaginatedList: React.Dispatch<React.SetStateAction<IMateria[]>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
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

const MateriaContext = createContext<MateriaContextType>({
  listMaterias: [],
  listSearchMaterias: [],
  paginatedList: [],
  setPaginatedList: () => {},
  hasMore: true,
  setHasMore: () => {},
  page: 1,
  setPage: () => {},
  getListMaterias: async () => {},
  getListSearchMaterias: async () => {},
  createMateria: async () => {},
  delMateria: async () => {},
  editMateria: async () => {},
});

const MateriaProvider = ({ children }: { children: any }) => {
  const [listMaterias, setListMaterias] = useState<IMateria[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [paginatedList, setPaginatedList] = useState<IMateria[]>([]);
  const [listSearchMaterias, setListSearchMaterias] = useState<IMateria[]>([]);
  const [page, setPage] = useState(1); // Mantener el estado de la página

  const getListMaterias = async (id_usuario: number) => {
    const materias = await getMaterias(id_usuario);
    setListMaterias(materias);
  };

  const getListSearchMaterias = async (search: ISearchMateria) => {
    const materias = await searchMateria(search);
    setListSearchMaterias(materias);
  };

  const createMateria = async (materia: IMateria) => {
    const newMateria = await addMateria(materia);
    getListMaterias(materia.id_usuario);
    if (!hasMore) {
      setPaginatedList((prev: IMateria[]) => [...prev, newMateria]);
    }
  };

  const delMateria = async (materia: IMateria) => {
    await deleteMateria(materia);
    getListMaterias(materia.id_usuario);
    setPaginatedList((prev) => prev.filter((m) => m.id !== materia.id));
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
    setPaginatedList((prev) =>
      prev.map((m) => (m.id === oldMateria.id ? materia : m))
    );
  };

  return (
    <MateriaContext.Provider
      value={{
        listMaterias,
        listSearchMaterias,
        paginatedList,
        setPaginatedList,
        hasMore,
        setHasMore,
        page,
        setPage,
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
