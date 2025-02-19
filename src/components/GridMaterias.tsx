"use client";

import { AuthContext } from "@/context/AuthProvider";
import { MateriaContext } from "@/context/MateriaContext";
import { useContext, useEffect, useRef, useState } from "react";
import CardItem from "./CardItem";
import { getMateriasPaginated } from "@/app/materias/actions";

export default function GridMaterias() {
  const limitData = 6;
  const { userProfile } = useContext(AuthContext);
  const {
    paginatedList,
    setPaginatedList,
    hasMore,
    setHasMore,
    page,
    setPage, // Ahora manejamos `page` desde el contexto
  } = useContext(MateriaContext);

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para cargar más datos
  async function loadMoreData() {
    if (!userProfile || isLoading || !hasMore) return;

    setIsLoading(true);
    const newData = await getMateriasPaginated(
      page,
      limitData,
      userProfile?.id ?? 0
    );

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setPaginatedList((prev: IMateria[]) => [...prev, ...newData]);
      setPage((prev) => prev + 1); 
    }

    setIsLoading(false);
  }

  // Se ejecuta solo cuando el usuario carga por primera vez o cambia de usuario
  useEffect(() => {
    let isMounted = false;

    if (!userProfile || paginatedList.length > 0 || !isMounted) return;
    loadMoreData();

    return () => {
      isMounted = true;
    };
  }, [userProfile]);

  // Configuración del observer
  useEffect(() => {
    if (!hasMore || isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => observer.current?.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:max-h-[500px] overflow-y-auto border border-1">
      {paginatedList.map((materia) => (
        <CardItem
          key={materia.id}
          nameModule="materias"
          id={materia.id ?? 0}
          title={materia.nombre}
          subtitle={materia.maestro}
        />
      ))}
      {hasMore && <div ref={loadMoreRef}></div>}

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}
