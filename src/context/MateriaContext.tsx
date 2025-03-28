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
  setListMaterias: React.Dispatch<React.SetStateAction<IMateria[]>>;
  listSearchMaterias: IMateria[];
  paginatedList: IMateria[];
  setPaginatedList: React.Dispatch<React.SetStateAction<IMateria[]>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
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
  cleanState: () => void;
}

const MateriaContext = createContext<MateriaContextType>({
  listMaterias: [],
  setListMaterias: () => {},
  listSearchMaterias: [],
  paginatedList: [],
  setPaginatedList: () => {},
  hasMore: true,
  setHasMore: () => {},
  getListMaterias: async () => {},
  getListSearchMaterias: async () => {},
  createMateria: async () => {},
  delMateria: async () => {},
  editMateria: async () => {},
  isLoading: false,
  lastItemRef: null,
  isMounted: false,
  setIsMounted: () => {},
  cleanState: () => {},
});

const MateriaProvider = ({ children }: { children: any }) => {
  const [listMaterias, setListMaterias] = useState<IMateria[]>([]);
  //const [hasMore, setHasMore] = useState(true);
  //const [paginatedList, setPaginatedList] = useState<IMateria[]>([]);
  const [listSearchMaterias, setListSearchMaterias] = useState<IMateria[]>([]);

  const {
    items,
    isLoading,
    hasMore,
    lastItemRef,
    isMounted,
    cleanState,
    setHasMore,
    setItems,
    setIsMounted,
  } = useInfiniteScroll<IMateria>(async (page, userProfile) => {
    return await getMateriasPaginated(page, 6, userProfile?.id ?? 0);
  }, 1);

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
    setItems((prev) => prev.filter((m) => m.id !== materia.id));
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
    setItems((prev) => prev.map((m) => (m.id === oldMateria.id ? materia : m)));
    getListMaterias(materia.id_usuario);
  };

  return (
    <MateriaContext.Provider
      value={{
        listMaterias,
        setListMaterias,
        listSearchMaterias,
        paginatedList: items,
        setPaginatedList: setItems,
        hasMore,
        setHasMore,
        getListMaterias,
        createMateria,
        delMateria,
        editMateria,
        getListSearchMaterias,
        isLoading,
        lastItemRef,
        isMounted,
        setIsMounted,
        cleanState,
      }}
    >
      {children}
    </MateriaContext.Provider>
  );
};

export { MateriaProvider, MateriaContext };
