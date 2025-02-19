"use client";
import {
  getMaterias,
  addMateria,
  deleteMateria,
  updateMateria,
  updateUnidades,
  searchMateria,
  getMateriasPaginated,
} from "@/app/materias/actions";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { createContext, use, useEffect, useState } from "react";
import { set } from "zod";

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
  isLoading: boolean;
  lastItemRef: React.RefObject<HTMLDivElement | null> | null;
  isMounted: boolean;
  setIsMounted: React.Dispatch<React.SetStateAction<boolean>>;
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
  isLoading: false,
  lastItemRef: null,
  isMounted: false,
  setIsMounted: () => {},
});

const MateriaProvider = ({ children }: { children: any }) => {
  const [listMaterias, setListMaterias] = useState<IMateria[]>([]);
  //const [hasMore, setHasMore] = useState(true);
  //const [paginatedList, setPaginatedList] = useState<IMateria[]>([]);
  const [listSearchMaterias, setListSearchMaterias] = useState<IMateria[]>([]);
  const [page, setPage] = useState(1);

  const {
    items,
    isLoading,
    hasMore,
    lastItemRef,
    isMounted,
    setHasMore,
    setItems,
    setIsMounted,
  } = useInfiniteScroll<IMateria>(async (page, userProfile) => {
    return await getMateriasPaginated(page, 6, userProfile?.id ?? 0);
  }, page);

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
      setItems((prev: IMateria[]) => [...prev, newMateria]);
    }
  };

  const delMateria = async (materia: IMateria) => {
    await deleteMateria(materia);
    getListMaterias(materia.id_usuario);
    setItems((prev) => prev.filter((m) => m.id !== materia.id));
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
    setItems((prev) => prev.map((m) => (m.id === oldMateria.id ? materia : m)));
  };

  return (
    <MateriaContext.Provider
      value={{
        listMaterias,
        listSearchMaterias,
        paginatedList: items,
        setPaginatedList: setItems,
        hasMore,
        setHasMore,
        page,
        setPage,
        getListMaterias,
        createMateria,
        delMateria,
        editMateria,
        getListSearchMaterias,
        isLoading,
        lastItemRef,
        isMounted,
        setIsMounted,
      }}
    >
      {children}
    </MateriaContext.Provider>
  );
};

export { MateriaProvider, MateriaContext };
